import type { Metadata } from 'next';
import LegalShell from '@/components/LegalShell';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Cookie Notice | LKMD Construction',
  description:
    'How the LKMD Construction website uses cookies and how to manage your choices.',
};

export default function CookieNoticePage() {
  return (
    <LegalShell title="Cookie Notice" updated="23 November 2026">
      <p>
        This notice explains what this website stores in your browser and why.
      </p>

      <h2>What this site uses</h2>
      <p>
        The site needs no cookies to work. Analytics are loaded only if you
        accept them on the banner, and declining changes nothing about how the
        site behaves for you.
      </p>

      <h2>Analytics</h2>
      <p>
        If you accept, we load Google Analytics so we can see which pages people
        find useful and improve the site. It records how the site is used, not
        who you are. If you decline, it is never loaded.
      </p>

      <h2>Changing your mind</h2>
      <p>
        Clear this site&apos;s data in your browser and the banner will ask you
        again on your next visit. Every major browser also lets you block or
        delete cookies for a site outright.
      </p>

      <h2>Questions</h2>
      <p>
        The full notice is being finalised by our legal adviser alongside the
        Privacy Notice. In the meantime, email {brand.email} with any question
        about cookies on this site.
      </p>
    </LegalShell>
  );
}
