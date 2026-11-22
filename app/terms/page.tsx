import type { Metadata } from 'next';
import LegalShell from '@/components/LegalShell';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms on which this website is made available.',
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Use" updated="22 November 2026">
      <p>
        These terms govern your use of this website. By using it you accept them.
      </p>

      <h2>About this site</h2>
      <p>
        This website is operated by {brand.legal}. It describes our capabilities and
        is intended for general information.
      </p>

      <h2>No offer, no warranty</h2>
      <p>
        Nothing on this site is an offer capable of acceptance, a tender, or a
        warranty of any kind. Capabilities, project descriptions and figures are
        indicative. Any work we undertake is governed solely by the executed contract
        for that work, which prevails over anything stated here.
      </p>

      <h2>Third-party figures</h2>
      <p>
        Where we cite market data, we name the source and link to it. Those figures
        belong to their publishers, are reproduced for commentary, and we do not
        warrant their accuracy.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, design, photography and marks on this site belong to {brand.legal}{' '}
        or are used with permission. You may read, print and share pages for your own
        business purposes. You may not reproduce the site or substantial parts of it
        commercially without our written consent.
      </p>

      <h2>Links out</h2>
      <p>
        We link to external material we consider useful. We do not control it and are
        not responsible for it.
      </p>

      <h2>Liability</h2>
      <p>
        We take reasonable care over the content of this site but do not guarantee it
        is complete or current. To the extent permitted by law we exclude liability
        for loss arising from reliance on it. Nothing here limits liability for death
        or personal injury caused by negligence, or for fraud.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of England and Wales, and the courts of
        England and Wales have exclusive jurisdiction.
      </p>
    </LegalShell>
  );
}
