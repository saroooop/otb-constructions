import { NextResponse } from 'next/server';

/**
 * KEEPS SUPABASE AWAKE.
 *
 * A free Supabase project pauses after seven days without activity. Nothing
 * breaks when it does — `lib/db.ts` falls back to the static content in
 * `lib/site.ts`, which is exactly what that fallback is for. But the site is
 * the *editable* one: once LKMD change a project in /admin and the database
 * later pauses, the page quietly serves the code version instead and their
 * edit looks like it was thrown away. It was not, and it returns when the
 * project wakes, but that is not what it looks like from their side.
 *
 * So a cron hits this once a day and the project never idles that far. One
 * query a day against a table of seven rows; the cost is nothing.
 *
 * This is a stopgap, not a substitute for a paid plan. Once the site has real
 * traffic and LKMD are editing content daily, the database should be on a plan
 * that does not pause at all.
 */

/* Never prerendered, never cached: a cached answer would reach Supabase once. */
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  /*
   * Vercel signs cron requests with CRON_SECRET when that variable is set.
   * Checked only when it exists, so the route keeps working if it is not
   * configured — an unauthenticated ping is harmless, it reads one slug.
   */
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { ok: false, error: 'supabase not configured' },
      { status: 503 },
    );
  }

  /*
   * Deliberately not `getProjects()`. That helper swallows a failure and
   * returns the static content, so it would report success while the database
   * was unreachable — the one thing this route exists to notice. `no-store`
   * for the same reason: the point is the round trip.
   */
  try {
    const res = await fetch(
      `${url.replace(/\/$/, '')}/rest/v1/projects?select=slug&limit=1`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: 'no-store',
      },
    );

    if (!res.ok) {
      console.warn('[keepalive] supabase returned', res.status);
      return NextResponse.json(
        { ok: false, status: res.status },
        { status: 502 },
      );
    }

    const rows = (await res.json()) as { slug: string }[];
    return NextResponse.json({
      ok: true,
      rows: rows.length,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('[keepalive] supabase unreachable', err);
    return NextResponse.json({ ok: false, error: 'unreachable' }, { status: 502 });
  }
}
