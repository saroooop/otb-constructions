import type { Metadata } from 'next';
import LegalShell from '@/components/LegalShell';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'What this website stores in your browser, and why.',
};

export default function CookiePage() {
  return (
    <LegalShell title="Cookie Policy" updated="22 November 2026">
      <p>
        The short version: this site does not set tracking cookies, and there is no
        consent banner because there is nothing to consent to.
      </p>

      <h2>What we use</h2>
      <p>
        The site is served as static pages with a single form endpoint. It sets no
        advertising cookies, no analytics cookies and no third-party trackers. Your
        browser may cache page assets — that is ordinary browser behaviour, not a
        cookie we place.
      </p>

      <h2>Fonts</h2>
      <p>
        Typefaces are served from our own domain rather than a third-party font CDN,
        so loading a page does not disclose your visit to a font provider.
      </p>

      <h2>If this changes</h2>
      <p>
        If we ever add analytics or embedded media that sets cookies, we will list each
        one here — name, purpose and lifetime — and ask for consent before setting any
        that is not strictly necessary.
      </p>

      <h2>Controlling cookies</h2>
      <p>
        Every major browser lets you block or delete cookies for a site. Doing so will
        not affect anything on this one.
      </p>
    </LegalShell>
  );
}
