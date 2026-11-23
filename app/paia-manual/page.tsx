import type { Metadata } from 'next';
import LegalShell from '@/components/LegalShell';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'PAIA Manual | LKMD Construction',
  description:
    'The Promotion of Access to Information Act manual for LKMD Construction.',
};

/**
 * A PAIA manual is a statutory document under the Promotion of Access to
 * Information Act. It has to be drafted for the specific entity and name its
 * information officer, so it is supplied by LKMD's legal adviser rather than
 * written here.
 */
export default function PaiaManualPage() {
  return (
    <LegalShell title="PAIA Manual" updated="23 November 2026">
      <p>
        This page will carry the manual required of {brand.legal} under the
        Promotion of Access to Information Act, 2000 (PAIA).
      </p>

      <h2>Status</h2>
      <p>
        The manual is being prepared by our legal adviser and will be published
        here before the site goes live. It will set out the records we hold, how
        to request access to them, the applicable fees and the grounds on which
        a request may be refused, and it will name our information officer and
        their contact details.
      </p>

      <h2>Requests in the meantime</h2>
      <p>
        If you need to make a request for access to information before the manual
        is published, email {brand.email} and we will direct it to the right
        person.
      </p>
    </LegalShell>
  );
}
