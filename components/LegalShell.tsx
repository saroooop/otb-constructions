import type { ReactNode } from 'react';
import { brand } from '@/lib/brand';

/** Shared chrome for the three policy pages. */
export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section style={{ paddingTop: 'calc(var(--nav-h) + 72px)', paddingBottom: 110 }}>
      <div className="container-tight">
        <p className="eyebrow" style={{ marginBottom: 22 }}>Legal</p>
        <h1
          style={{
            fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 14,
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: '0.82rem', color: '#8A99A8', marginBottom: 40 }}>
          Last updated {updated}
        </p>
        <hr className="hairline" style={{ marginBottom: 40 }} />

        <div className="legal-body">{children}</div>

        <hr className="hairline" style={{ margin: '48px 0 24px' }} />
        <p style={{ fontSize: '0.86rem', color: '#5C6B7A', lineHeight: 1.85 }}>
          Questions about this policy? Email{' '}
          <a href={`mailto:${brand.email}`} style={{ color: brand.color.red, fontWeight: 600 }}>
            {brand.email}
          </a>
          .
        </p>
      </div>

      <style>{`
        .legal-body h2 {
          font-size: 1.18rem;
          margin: 36px 0 14px;
        }
        .legal-body h2:first-child { margin-top: 0; }
        .legal-body p,
        .legal-body li {
          font-size: 0.95rem;
          color: #44576A;
          line-height: 1.9;
        }
        .legal-body p { margin-bottom: 16px; }
        .legal-body ul { margin: 0 0 18px 20px; }
        .legal-body li { margin-bottom: 8px; }
      `}</style>
    </section>
  );
}
