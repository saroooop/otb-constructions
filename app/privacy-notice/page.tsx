import type { Metadata } from 'next';
import LegalShell from '@/components/LegalShell';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Privacy Notice | LKMD Construction',
  description:
    'How LKMD Construction collects, uses and protects personal information under POPIA.',
};

/**
 * The brief states this text is supplied by LKMD's legal adviser before
 * launch, written for LKMD Construction and naming its own information
 * officer. Until it arrives the page says so plainly rather than carrying
 * a generic policy that would be wrong in substance and in law.
 */
export default function PrivacyNoticePage() {
  return (
    <LegalShell title="Privacy Notice" updated="23 November 2026">
      <p>
        This notice will set out how {brand.legal} collects, uses, shares and
        protects personal information, in line with the Protection of Personal
        Information Act (POPIA).
      </p>

      <h2>Status</h2>
      <p>
        The full notice is being prepared by our legal adviser and will be
        published here before the site goes live. It will name our information
        officer and give the address for any request or complaint.
      </p>

      <h2>What we do with enquiries in the meantime</h2>
      <p>
        If you send an enquiry through this website, we use the details you give
        us to answer it. We do not sell personal information and we do not pass
        it to third parties for marketing.
      </p>

      <h2>Asking us about your information</h2>
      <p>
        You can ask us what we hold about you, ask us to correct it, or ask us to
        delete it. Email {brand.email} and we will respond.
      </p>
    </LegalShell>
  );
}
