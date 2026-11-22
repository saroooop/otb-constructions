import type { Metadata } from 'next';
import LegalShell from '@/components/LegalShell';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we handle personal data submitted through this website.',
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="22 November 2026">
      <p>
        This policy explains what {brand.legal} does with personal data collected
        through this website. It is written to be read, not to be survived.
      </p>

      <h2>What we collect</h2>
      <p>
        Only what you type into the enquiry form: your name, company, email address,
        telephone number, the enquiry category you select and the message itself. We
        do not ask for anything else and the site does not attempt to identify you
        before you tell us who you are.
      </p>

      <h2>Why we hold it</h2>
      <p>
        To answer your enquiry, and where relevant to carry out the pre-contract
        discussions that follow from it. Our lawful basis is legitimate interest for
        business correspondence, or steps taken at your request prior to entering a
        contract.
      </p>

      <h2>Who sees it</h2>
      <p>
        Our own staff, and the email provider that carries the message. We do not sell
        personal data, and we do not pass it to third parties for marketing.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiry correspondence is retained for two years from last contact, then
        deleted. Where an enquiry becomes a contract, the records are kept for the
        period required by the contract and by law.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us for a copy of what we hold about you, ask us to correct it, or
        ask us to delete it. Email {brand.email} and we will respond within one month.
        If you are not satisfied with our response, you may complain to the relevant
        supervisory authority in your jurisdiction.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes materially we will update the date at the top of this
        page.
      </p>
    </LegalShell>
  );
}
