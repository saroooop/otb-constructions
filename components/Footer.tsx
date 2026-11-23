import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { brand } from '@/lib/brand';

/**
 * Footer per the brief: strapline, the four offices (each linking to its
 * anchor on the Contact page), email, quick links, registration line and the
 * legal line.
 *
 * Anything the brief marks [To be supplied] — phone, CIDB grading, social
 * links — is hidden until it holds a value, because the brief is explicit
 * that no placeholder text may appear on the live site.
 */
const quickLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Careers',  href: '/careers' },
  { label: 'Contact',  href: '/contact' },
  { label: 'Market insight', href: '/market' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const registrationBits = [
    brand.registrations.companyNo && `Company registration ${brand.registrations.companyNo}`,
    brand.registrations.vatNo && `VAT ${brand.registrations.vatNo}`,
    brand.registrations.cidb && `CIDB grading ${brand.registrations.cidb}`,
  ].filter(Boolean) as string[];

  return (
    <footer style={{ background: brand.color.navy900, color: '#fff' }}>
      {/* ── Pre-footer call to action ─────────────────────── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div
          className="container"
          style={{
            padding: '68px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 40, flexWrap: 'wrap',
          }}
        >
          <div>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 18 }}>Start a conversation</p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 620 }}>
              Tell us what you need built, and where.
            </h2>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Start a project
            <ArrowRight size={14} strokeWidth={2.4} />
          </Link>
        </div>
      </div>

      {/* ── Main footer ───────────────────────────────────── */}
      <div
        className="container footer-grid"
        style={{
          padding: '68px 40px 44px',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 1.5fr) minmax(180px, 1fr) minmax(200px, 1.1fr)',
          gap: 56,
        }}
      >
        <div>
          <Logo tone="light" size={34} />
          <p
            style={{
              fontSize: '0.875rem', lineHeight: 1.85, color: '#8198AE',
              marginTop: 22, maxWidth: 320,
            }}
          >
            {brand.strapline}. {brand.tagline}
            <br />
            <span style={{ color: '#6E8399' }}>With a branch in the United Kingdom.</span>
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: '#fff', marginBottom: 18,
            }}
          >
            Quick links
          </p>
          {quickLinks.map(l => (
            <Link
              key={l.href}
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

        <div>
          <p
            style={{
              fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.16em', color: '#fff', marginBottom: 18,
            }}
          >
            Our offices
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 18px', marginBottom: 18 }}>
            {brand.addresses.map(a => (
              <Link
                key={a.id}
                href={`/contact#${a.id}`}
                prefetch={false}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: '0.85rem', color: '#8198AE',
                  textDecoration: 'none', marginBottom: 10,
                }}
              >
                <MapPin size={13} strokeWidth={1.9} />
                {a.label}
              </Link>
            ))}
          </div>

          <a
            href={`mailto:${brand.email}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: '0.85rem', color: '#8198AE', textDecoration: 'none', marginBottom: 10,
            }}
          >
            <Mail size={15} strokeWidth={1.8} style={{ flexShrink: 0 }} />
            <span style={{ wordBreak: 'break-word' }}>{brand.email}</span>
          </a>

          {/* Hidden until a number is supplied. */}
          {brand.phone && (
            <a
              href={`tel:${brand.phone.replace(/\s/g, '')}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: '0.85rem', color: '#8198AE', textDecoration: 'none',
              }}
            >
              <Phone size={15} strokeWidth={1.8} style={{ flexShrink: 0 }} />
              {brand.phone}
            </a>
          )}
        </div>
      </div>

      {/* ── Registration line, hidden until supplied ──────── */}
      {registrationBits.length > 0 && (
        <div className="container" style={{ padding: '0 40px 20px' }}>
          <p style={{ fontSize: '0.78rem', color: '#60788E' }}>
            {registrationBits.join(' · ')}
          </p>
        </div>
      )}

      {/* ── Legal strip ───────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div
          className="container"
          style={{
            padding: '22px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 20, flexWrap: 'wrap',
            fontSize: '0.78rem', color: '#60788E',
          }}
        >
          <span>© {year} {brand.legal}</span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              ['Privacy Notice', '/privacy-notice'],
              ['PAIA Manual',    '/paia-manual'],
              ['Cookie Notice',  '/cookie-notice'],
            ].map(([label, href]) => (
              <Link key={href} href={href} prefetch={false} style={{ color: '#60788E', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
