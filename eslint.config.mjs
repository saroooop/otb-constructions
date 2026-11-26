import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * `npm run lint` called a linter that was never installed, so it had never
 * run once. Next's own configs are the useful ones here: they catch the
 * mistakes that actually break this site — <img> where next/image belongs,
 * bad next/link usage, and React hook rules.
 *
 * eslint-config-next ships native flat config from 16.x, so these are spread
 * directly; the FlatCompat wrapper the old docs show throws on this version.
 */
const config = [
  ...coreWebVitals,
  ...typescript,

  {
    rules: {
      /**
       * Advisory here, not an error.
       *
       * Every occurrence in this codebase is the same legitimate pattern:
       * read client-only state after mount, then set it — `localStorage` for
       * the cookie choice in CookieBanner and Analytics, feature detection of
       * IntersectionObserver in Reveal and InlineFilm, route changes in Nav.
       * None can be read during render without a hydration mismatch, so the
       * effect is the correct place for them and the rule cannot tell that
       * apart from a true cascading render.
       *
       * It stays on as a warning so a genuinely careless setState in an
       * effect still shows up in new code. It is NOT off: rewriting the
       * consent gating to satisfy it would put the one guarantee that matters
       * most here — GA4 loads only after a visitor accepts — at risk for a
       * style rule.
       */
      'react-hooks/set-state-in-effect': 'warn',
    },
  },

  // Build output and generated media; scripts/ is shell, not JS.
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'out/**'] },
];

export default config;
