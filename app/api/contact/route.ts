import { NextResponse } from 'next/server';
import { deliver, hashIp, clientIp, type Enquiry } from '@/lib/enquiries';

/**
 * Contact endpoint.
 *
 * Validates, drops bots on a honeypot, then hands the enquiry to lib/enquiries
 * which writes it to Supabase and emails it via Resend. Both sinks are optional
 * — with neither configured the enquiry is logged and this still returns 200,
 * so the form works on a preview deploy before any account exists.
 */

const MAX = { name: 120, company: 160, email: 180, phone: 40, type: 60, message: 4000 };

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: a filled hidden field is a bot. Return 200 so it learns nothing.
  if (str(body.company_website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const enquiry: Enquiry = {
    name:    str(body.name, MAX.name),
    company: str(body.company, MAX.company),
    email:   str(body.email, MAX.email),
    phone:   str(body.phone, MAX.phone),
    type:    str(body.type, MAX.type),
    message: str(body.message, MAX.message),
  };

  if (!enquiry.name || !enquiry.email || !enquiry.message) {
    return NextResponse.json(
      { error: 'Please complete your name, email and message.' },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 });
  }

  try {
    const result = await deliver(enquiry, {
      userAgent: req.headers.get('user-agent'),
      ipHash: hashIp(clientIp(req)),
    });

    // Supabase is the system of record. If it is configured but rejected the
    // write, and email did not get through either, the enquiry only exists in
    // a log line — tell the sender to reach us another way rather than letting
    // them believe it landed.
    const supabaseConfigured =
      Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
    const emailConfigured =
      Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO);

    if ((supabaseConfigured || emailConfigured) && !result.stored && !result.emailed) {
      return NextResponse.json(
        { error: 'We could not send that just now. Please email us directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error('[contact] unexpected failure', err);
    return NextResponse.json(
      { error: 'We could not send that just now. Please email us directly.' },
      { status: 502 },
    );
  }
}
