/**
 * SINGLE SOURCE OF TRUTH FOR BRANDING.
 *
 * The working name is "OTB Constructions". When the real brand lands,
 * change THIS FILE ONLY — name, colours, contact details and the logo mark
 * all resolve from here. No page hard-codes a brand string or a hex value.
 */

export const brand = {
  /* ── Identity ─────────────────────────────────────────── */
  name:      'LKMD',
  nameBold:  'CONSTRUCTION',
  full:      'LKMD Construction',
  legal:     'LKMD Construction',
  companyNo: '10502352',
  tagline:   'Innovating Tomorrow, Engineering Today',
  /** Sits under the wordmark. */
  motto:     'Innovating Tomorrow, Engineering Today',
  strapline: 'Building · Civil Engineering · Construction Management',

  /* ── Contact ──────────────────────────────────────────── */
  email:     'info@lkmd.co.uk',
  phone:     '0800 046 0223',
  whatsapp:  '447405746302',          // TODO: confirm a WhatsApp number for LKMD
  website:   'https://www.lkmd.co.uk',
  addresses: [
    {
      label: 'Registered office',
      lines: ['80 Baddow Road', 'Chelmsford, Essex CM2 7PJ', 'United Kingdom'],
    },
  ],

  /* ── Palette ──────────────────────────────────────────────
     Unchanged. The marine blue and signal red already sit with
     LKMD's own brand photography, which runs blue-steel and
     hi-vis orange-red.                                          */
  color: {
    ink:      '#0A1724',
    navy900:  '#06182B',
    navy800:  '#0B2742',
    navy700:  '#103A61',
    navy500:  '#1E5F9E',
    red:      '#C8102E',
    redSoft:  '#E23A4E',
    amber:    '#F2A516',
    concrete: '#F3F5F7',
    surface:  '#FFFFFF',
    line:     '#DDE3E9',
    muted:    '#5C6B7A',
  },
} as const;

export type Brand = typeof brand;
