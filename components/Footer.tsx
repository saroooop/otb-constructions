import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { brand } from '@/lib/brand';
import { services } from '@/lib/content';

const columns = [
  {
    heading: 'What We Do',
    links: services.map(s => ({ label: s.title, href: '/services' })),
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',                   href: '/about' },
      { label: 'Our Structure',           href: '/group' },
      { label: 'Sectors',                 href: '/sectors' },
      { label: 'The Market',              href: '/market' },
      { label: 'Projects',                href: '/projects' },
      { label: 'Safety & Sustainability', href: '/sustainability' },
      { label: 'Careers',                 href: '/careers' },
      { label: 'Insights',                href: '/insights' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: brand.color.navy900, color: '#fff' }}>
      {/* ── Pre-footer call to action ─────────────────────── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div
          className="container"
          style={{
            padding: '72px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 40, flexWrap: 'wrap',
          }}
        >
          <div>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 18 }}>
              Start a conversation
            </p>
            <h2
              className="display-sm"
              style={{ color: '#fff', maxWidth: 640 }}
            >
              Tell us what you are building. We will tell you how we would build it.
            </h2>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Enquire
            <ArrowRight size={14} strokeWidth={2.4} />
          </Link>
        </div>
      </div>

      {/* ── Main footer ───────────────────────────────────── */}
      <div
        className="container"
        style={{
          padding: '72px 40px 48px',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 1.4fr) repeat(2, minmax(160px, 1fr)) minmax(220px, 1.1fr)',
          gap: 56,
        }}
      >
        <div>
          <Logo tone="light" size={42} />
          <p
            style={{
              fontSize: '0.875rem', lineHeight: 1.85, color: '#8198AE',
              marginTop: 24, maxWidth: 300,
            }}
          >
            {brand.strapline}. Delivering civil and mining infrastructure across
            Southern Africa and the United Kingdom.
          </p>
        </div>

        {columns.map(col => (
          <div key={col.heading}>
            <p
              style={{
                fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.16em', color: '#fff', marginBottom: 20,
              }}
            >
              {col.heading}
            </p>
            {col.links.map(l => (
              <Link
                key={l.label}
                href={l.href}
                prefetch={false}
                style={{
                  display: 'block', fontSize: '0.85rem', color: '#8198AE',
                  textDecoration: 'none', marginBottom: 11, lineHeight: 1.5,
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        ))}

        <div>
          <p
            style={{
              fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: '#fff', marginBottom: 20,
            }}
          >
            Contact
          </p>

          <a
            href={`mailto:${brand.email}`}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              fontSize: '0.85rem', color: '#8198AE', textDecoration: 'none', marginBottom: 14,
            }}
          >
            <Mail size={15} strokeWidth={1.8} style={{ marginTop: 4, flexShrink: 0 }} />
            <span style={{ wordBreak: 'break-word' }}>{brand.email}</span>
          </a>

          <a
            href={`tel:${brand.phone.replace(/\s/g, '')}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: '0.85rem', color: '#8198AE', textDecoration: 'none', marginBottom: 20,
            }}
          >
            <Phone size={15} strokeWidth={1.8} style={{ flexShrink: 0 }} />
            {brand.phone}
          </a>

          {brand.addresses.map(a => (
            <div
              key={a.label}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}
            >
              <MapPin size={15} strokeWidth={1.8} color="#8198AE" style={{ marginTop: 4, flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: '#8198AE', lineHeight: 1.6 }}>
                <span style={{ color: '#C3D2E0', fontWeight: 600 }}>{a.label}</span>
                <br />
                {a.lines.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Legal strip ───────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div
          className="container"
          style={{
            padding: '24px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 20, flexWrap: 'wrap',
            fontSize: '0.78rem', color: '#60788E',
          }}
        >
          <span>
            © {year} {brand.legal}. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap' }}>
            {[
              ['Privacy Policy', '/privacy-policy'],
              ['Terms of Use',   '/terms'],
              ['Cookie Policy',  '/cookie-policy'],
            ].map(([label, href]) => (
              <Link key={href} href={href} prefetch={false} style={{ color: '#60788E', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          footer .container[style*="grid"] { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          footer .container[style*="grid"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
