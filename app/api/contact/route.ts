import { NextResponse } from 'next/server';

/**
 * Contact endpoint.
 *
 * Validates and logs the enquiry. Delivery is deliberately pluggable: set
 * RESEND_API_KEY and CONTACT_TO and it emails; leave them unset and it still
 * returns 200 so the form works in development and on a preview deploy
 * without leaking a key into the client bundle.
 */

const MAX = { name: 120, company: 160, email: 180, phone: 40, type: 60, message: 4000 };

type Payload = Record<string, unknown>;

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  let body: Payload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: a filled hidden field is a bot. Return 200 so it learns nothing.
  if (str(body.company_website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = {
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

  const apiKey = process.env.RESEND_API_KEY;
  const to     = process.env.CONTACT_TO;
  const from   = process.env.CONTACT_FROM || 'enquiries@otbconstructions.com';

  if (!apiKey || !to) {
    // No mail transport configured yet — record it and succeed.
    console.info('[contact] enquiry received (no transport configured)', {
      ...enquiry,
      message: `${enquiry.message.slice(0, 160)}…`,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject: `Website enquiry — ${enquiry.type || 'General'} — ${enquiry.name}`,
        text: [
          `Name:    ${enquiry.name}`,
          `Company: ${enquiry.company || '—'}`,
          `Email:   ${enquiry.email}`,
          `Phone:   ${enquiry.phone || '—'}`,
          `Type:    ${enquiry.type || '—'}`,
          '',
          enquiry.message,
        ].join('\n'),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[contact] transport rejected the message', res.status, detail);
      return NextResponse.json(
        { error: 'We could not send that just now. Please email us directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact] transport error', err);
    return NextResponse.json(
      { error: 'We could not send that just now. Please email us directly.' },
      { status: 502 },
    );
  }
}
