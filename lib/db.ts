import { projects as staticProjects, type Project } from '@/lib/site';
import { getProjectMedia } from '@/lib/media';

/**
 * Reads editable content from Supabase, with the static launch content as a
 * fallback.
 *
 * The fallback is not belt-and-braces, it is load-bearing. A free Supabase
 * project pauses after seven days without traffic, and a construction site
 * that goes quiet over the festive period would otherwise come back with no
 * projects on it. So every read is wrapped: if the database is unreachable,
 * paused, or simply has nothing in it yet, the seven launch projects from
 * lib/site.ts render instead and nobody notices.
 *
 * Reads use the PUBLISHABLE key and go through row-level security, which
 * only returns published rows. The service role key never reaches this file.
 */

const URL_ = process.env.SUPABASE_URL;
const PUBLISHABLE = process.env.SUPABASE_PUBLISHABLE_KEY;

/** Re-fetch at most once a minute; editors see changes without a deploy. */
export const revalidate = 60;

async function query<T>(path: string): Promise<T[] | null> {
  if (!URL_ || !PUBLISHABLE) return null;
  try {
    const res = await fetch(`${URL_.replace(/\/$/, '')}/rest/v1/${path}`, {
      headers: { apikey: PUBLISHABLE, Authorization: `Bearer ${PUBLISHABLE}` },
      next: { revalidate },
    });
    if (!res.ok) {
      console.warn('[db] query failed', path, res.status);
      return null;
    }
    return (await res.json()) as T[];
  } catch (err) {
    // Paused project, network blip, DNS — all land here and all mean
    // "use the fallback", not "break the page".
    console.warn('[db] unreachable, using static content', err);
    return null;
  }
}

/* ── Projects ─────────────────────────────────────────────── */

type Row = {
  slug: string; title: string; town: string; summary: string;
  province: string | null; sector: string | null; service_slug: string | null;
  hero_image: string | null; on_home: boolean; sort_order: number;
};

function rowToProject(r: Row): Project {
  return {
    slug: r.slug,
    title: r.title,
    town: r.town,
    province: r.province ?? '',
    sector: r.sector ?? '',
    service: '',               // resolved from serviceSlug where it is shown
    serviceSlug: r.service_slug ?? '',
    onHome: r.on_home,
    summary: r.summary,
    image: r.hero_image || '/lkmd/concrete.jpg',
  };
}

/**
 * Where LKMD have supplied their own photography of a project, it replaces
 * the generic plate everywhere the project is shown — the index cards, the
 * home page selection and the detail hero.
 *
 * Applied to both the database rows and the static fallback, so a paused
 * database changes nothing about which picture a visitor sees.
 */
function withOwnPhotography(projects: Project[]): Project[] {
  return projects.map(p => {
    const media = getProjectMedia(p.slug);
    return media ? { ...p, image: media.hero } : p;
  });
}

export async function getProjects(): Promise<Project[]> {
  const rows = await query<Row>(
    'projects?select=slug,title,town,summary,province,sector,service_slug,hero_image,on_home,sort_order&order=sort_order.asc',
  );
  if (!rows || rows.length === 0) return withOwnPhotography(staticProjects);
  return withOwnPhotography(rows.map(rowToProject));
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find(p => p.slug === slug);
}

/* ── Vacancies ────────────────────────────────────────────── */

export type Vacancy = {
  id: string;
  title: string;
  location: string | null;
  employment_type: string | null;
  description: string | null;
};

/** No fallback: no vacancies simply means none are open, which is honest. */
export async function getVacancies(): Promise<Vacancy[]> {
  const rows = await query<Vacancy>(
    'vacancies?select=id,title,location,employment_type,description&order=sort_order.asc',
  );
  return rows ?? [];
}

/* ── Settings ─────────────────────────────────────────────── */

export type Settings = Record<string, string>;

/**
 * The "[To be supplied]" values. An empty map is the correct answer when the
 * database is unavailable — every consumer hides a field it cannot fill, so
 * the page degrades to exactly what it shows today.
 */
export async function getSettings(): Promise<Settings> {
  const rows = await query<{ key: string; value: string }>(
    'site_settings?select=key,value',
  );
  if (!rows) return {};
  return Object.fromEntries(
    rows.filter(r => r.value?.trim()).map(r => [r.key, r.value.trim()]),
  );
}
