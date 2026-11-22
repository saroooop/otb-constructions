import type { Metadata } from 'next';
import Link from 'next/link';
import { WifiOff, ArrowRight } from 'lucide-react';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Offline',
  description: 'You are offline.',
  robots: { index: false, follow: false },
};

/**
 * Shown by the service worker when a navigation fails and nothing is cached.
 * Deliberately plain — it has to render from cache with no network at all, so
 * it carries no imagery and no film.
 */
export default function OfflinePage() {
  return (
    <section
      style={{
        minHeight: '78svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-h) + 48px)',
        paddingBottom: 80,
        background: brand.color.navy900,
        color: '#fff',
      }}
    >
      <div className="container-tight" style={{ textAlign: 'center' }}>
        <WifiOff size={38} strokeWidth={1.5} color={brand.color.redSoft} style={{ margin: '0 auto 28px' }} />

        <p className="eyebrow eyebrow-light" style={{ marginBottom: 24, justifyContent: 'center' }}>
          No connection
        </p>

        <h1 className="display-sm" style={{ color: '#fff', marginBottom: 22 }}>
          You are offline.
        </h1>

        <p className="lede-dark" style={{ maxWidth: 520, margin: '0 auto 36px' }}>
          Pages you have already visited will still open. Anything new needs a
          connection — and the enquiry form will not send until you have one,
          so it is worth waiting rather than retyping.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            Back to the home page
            <ArrowRight size={14} strokeWidth={2.4} />
          </Link>
          <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="btn btn-light">
            Call {brand.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
