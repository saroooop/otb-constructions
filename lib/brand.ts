/**
 * SINGLE SOURCE OF TRUTH FOR BRANDING.
 *
 * Values come from "LKMD Construction – Website Content & Site Map (Final)",
 * 22 November 2026. Colours are sampled from the supplied logo PNG rather
 * than eyeballed, which is why they are exact.
 */

/**
 * WHERE THIS SITE ACTUALLY LIVES — used for canonical URLs, the sitemap and
 * robots.txt, which must never advertise an address that does not resolve.
 *
 * `lkmd.co.za` is the intended home but is not registered yet, and a sitemap
 * naming an unreachable host asks Google to index nothing. So the address is
 * resolved at build time instead of hardcoded:
 *
 *   1. `NEXT_PUBLIC_SITE_URL` — set this the day lkmd.co.za goes live and
 *      every canonical, the sitemap and robots.txt follow it. One variable.
 *   2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel supplies the project's own
 *      production host, so a deploy always advertises itself correctly.
 *   3. localhost, for `next dev`.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '')
  || 'http://localhost:3000'
).replace(/\/+$/, '');

export const brand = {
  /* ── Identity ─────────────────────────────────────────── */
  name:      'LKMD',
  nameBold:  'CONSTRUCTION',
  full:      'LKMD Construction',
  legal:     'LKMD Construction',
  tagline:   '…Innovating Tomorrow, Engineering Today',
  motto:     '…Innovating Tomorrow, Engineering Today',
  strapline: 'Building and civil engineering construction across South Africa',
  /** Said wherever the UK branch is relevant. SA first, always. */
  reach:     'South Africa, with a branch in the United Kingdom',

  /* ── Contact ──────────────────────────────────────────── */
  email:        'info@lkmd.co.za',
  careersEmail: 'careers@lkmd.co.za',
  website:      'https://lkmd.co.za',
  // [To be supplied] — the brief says build the field and hide it until filled.
  phone:        '' as string,
  whatsapp:     '' as string,
  officeHours:  '08:00 to 17:00, Monday to Friday',

  /**
   * The four South African offices in the order the brief lists them, with
   * the United Kingdom branch after them. The business is South African;
   * the UK is a branch, and the ordering says so.
   */
  addresses: [
    {
      id: 'centurion',
      label: 'Centurion',
      lines: ['153 Panorama Road', 'Rooihuiskraal Ext 6', 'Centurion, 0157'],
    },
    {
      id: 'cape-town',
      label: 'Cape Town',
      lines: ['7th Floor, Mandela Rhodes Place', 'Cnr Wale & Burg Streets', 'Cape Town'],
    },
    {
      id: 'durban',
      label: 'Durban',
      lines: ['Durban Spaces, 2 Ncondo Place', 'Ridgeside, Umhlanga', 'Durban'],
    },
    {
      id: 'east-london',
      label: 'East London',
      lines: ['1–3 Cavendish Road', 'Vincent', 'East London'],
    },
    {
      id: 'united-kingdom',
      label: 'United Kingdom',
      lines: ['80 Baddow Road', 'Chelmsford, Essex CM2 7PJ', 'United Kingdom'],
      branch: true,
    },
  ],

  /**
   * Registrations. Every one is "[To be supplied]" in the brief, and the
   * brief is explicit that no placeholder text may appear on the live site —
   * so these render only once they hold a value.
   */
  registrations: {
    cidb:      '' as string,
    bbbee:     '' as string,
    nhbrc:     '' as string,
    companyNo: '' as string,
    vatNo:     '' as string,
  },

  /* ── Palette ──────────────────────────────────────────────
     Sampled from the supplied logo: navy #162B50 is the primary,
     red #E7191E is the accent, and #FF0000 appears in the mark
     only. The deeper navies are darkened from #162B50 so the
     dark sections stay in the same family.                      */
  color: {
    ink:      '#101C33',
    navy900:  '#0B1730',
    navy800:  '#162B50',   // the brand navy
    navy700:  '#22406F',
    navy500:  '#3A6098',
    red:      '#E7191E',   // the brand accent
    redSoft:  '#F2474B',
    redMark:  '#FF0000',   // logo mark only — never for UI
    amber:    '#F2A516',
    concrete: '#F3F5F7',
    surface:  '#FFFFFF',
    line:     '#DDE3E9',
    muted:    '#5C6B7A',
  },
} as const;

export type Brand = typeof brand;
