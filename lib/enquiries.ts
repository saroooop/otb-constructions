import { createHash } from 'node:crypto';

/**
 * Enquiry persistence and notification.
 *
 * Two independent sinks, both optional, both degrading quietly:
 *
 *   Supabase — the durable record. Written first, because an email that
 *              bounces loses the enquiry and nobody finds out.
 *   Resend   — the notification. Nice to have; not the system of record.
 *
 * Neither configured, the enquiry is logged and the caller still succeeds, so
 * the form works on a preview deploy before any account exists.
 *
 * PostgREST is called directly rather than through @supabase/supabase-js: this
 * is one insert, and the SDK would add a dependency and bundle weight for it.
 */

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  phone: string;
  type: string;
  message: string;
};

export type SinkResult = { stored: boolean; emailed: boolean };

/** SHA-256 of the IP with a server salt. The raw address is never persisted. */
export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || '';
  if (!salt) return null; // no salt configured — store nothing rather than a bare hash
  return createHash('sha256').update(salt + ip).digest('hex').slice(0, 32);
}

export function clientIp(req: Request): string | null {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip');
}

async function storeInSupabase(
  enquiry: Enquiry,
  meta: { userAgent: string | null; ipHash: string | null },
): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;

  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/enquiries`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: enquiry.name,
      email: enquiry.email,
      company: enquiry.company || null,
      phone: enquiry.phone || null,
      type: enquiry.type || null,
      message: enquiry.message,
      user_agent: meta.userAgent,
      ip_hash: meta.ipHash,
    }),
  });

  if (!res.ok) {
    console.error('[enquiries] supabase insert failed', res.status, await res.text().catch(() => ''));
    return false;
  }
  return true;
}

async function sendEmail(enquiry: Enquiry): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) return false;

  const from = process.env.CONTACT_FROM || 'enquiries@otbconstructions.com';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
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
    console.error('[enquiries] resend failed', res.status, await res.text().catch(() => ''));
    return false;
  }
  return true;
}

export async function deliver(
  enquiry: Enquiry,
  meta: { userAgent: string | null; ipHash: string | null },
): Promise<SinkResult> {
  // Run both, and let neither failure take the other down.
  const [storedR, emailedR] = await Promise.allSettled([
    storeInSupabase(enquiry, meta),
    sendEmail(enquiry),
  ]);

  const stored = storedR.status === 'fulfilled' && storedR.value;
  const emailed = emailedR.status === 'fulfilled' && emailedR.value;

  if (storedR.status === 'rejected') console.error('[enquiries] supabase threw', storedR.reason);
  if (emailedR.status === 'rejected') console.error('[enquiries] resend threw', emailedR.reason);

  if (!stored && !emailed) {
    // Nothing configured, or everything failed. Log it so it is at least in the
    // platform logs and recoverable by hand.
    console.info('[enquiries] no sink succeeded, logging enquiry', {
      ...enquiry,
      message: enquiry.message.slice(0, 200),
    });
  }

  return { stored, emailed };
}
