/**
 * SINGLE SOURCE OF TRUTH FOR BRANDING.
 *
 * The working name is "OTB Constructions". When the real brand lands,
 * change THIS FILE ONLY — name, colours, contact details and the logo mark
 * all resolve from here. No page hard-codes a brand string or a hex value.
 */

export const brand = {
  /* ── Identity ─────────────────────────────────────────── */
  name:      'OTB',
  nameBold:  'CONSTRUCTIONS',
  full:      'OTB Constructions',
  legal:     'OTB Constructions Ltd',
  tagline:   'Building the infrastructure that moves a continent',
  /** Sits under the wordmark, and is what the globe-and-Africa mark says. */
  motto:     'A World of Africa',
  strapline: 'Civil Engineering · Mining Infrastructure · Earthworks',

  /* ── Contact ──────────────────────────────────────────── */
  email:     'enquiries@otbconstructions.com',
  phone:     '+44 7405 746302',
  whatsapp:  '447405746302',
  addresses: [
    { label: 'United Kingdom',  lines: ['London', 'United Kingdom'] },
    { label: 'Southern Africa', lines: ['Windhoek', 'Namibia'] },
  ],

  /* ── Palette ──────────────────────────────────────────────
     WBHO's marine blue and signal red, deepened and cooled to
     sit alongside the restrained neutrals a UK tier-one
     contractor uses. Red is structural, never decorative.      */
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
