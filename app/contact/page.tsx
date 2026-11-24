import type { Metadata } from 'next';
import { Mail, MapPin, Clock, Briefcase } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Contact Us | LKMD Construction',
  description:
    'Contact LKMD Construction in Centurion, Cape Town, Durban or East London to discuss your construction or engineering project.',
};

export default function ContactPage() {
  return (
    <>
      <section style={{ paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: 24 }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 24 }}>Contact</p>
            <h1
              style={{
                fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)', fontWeight: 800,
                letterSpacing: '-0.035em', lineHeight: 1.05,
                maxWidth: 760, marginBottom: 24,
              }}
            >
              Get in touch
            </h1>
            <p className="lede" style={{ maxWidth: 600 }}>
              We welcome enquiries about your construction and engineering needs.
              Tell us what you are planning and where, and we will put you in touch
              with the right person.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 52, paddingBottom: 110 }}>
        <div className="container">
          <div
            className="contact-grid"
            style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal><ContactForm /></Reveal>

            <Reveal delay={120}>
              <aside style={{ background: brand.color.concrete, padding: '42px 38px' }}>
                <h2 style={{ fontSize: '1.12rem', marginBottom: 24 }}>All offices</h2>

                <a
                  href={`mailto:${brand.email}`}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'center',
                    fontSize: '0.95rem', color: 'var(--ink)',
                    textDecoration: 'none', marginBottom: 14, fontWeight: 500,
                  }}
                >
                  <Mail size={16} strokeWidth={1.8} color={brand.color.red} />
                  {brand.email}
                </a>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                  <Clock size={16} strokeWidth={1.8} color={brand.color.red} />
                  <span style={{ fontSize: '0.92rem', color: '#44576A' }}>{brand.officeHours}</span>
                </div>

                {/* Phone appears the moment a number is supplied. */}
                {brand.phone && (
                  <div style={{ fontSize: '0.92rem', color: '#44576A', marginBottom: 14 }}>
                    {brand.phone}
                  </div>
                )}

                <hr className="hairline" style={{ margin: '26px 0' }} />

                <h3
                  style={{
                    fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.14em', color: '#5C6B7A', marginBottom: 18,
                  }}
                >
                  Other enquiries
                </h3>

                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                  <Briefcase size={16} strokeWidth={1.8} color={brand.color.red} style={{ marginTop: 3, flexShrink: 0 }} />
                  <p style={{ fontSize: '0.88rem', color: '#5C6B7A', lineHeight: 1.75 }}>
                    <strong style={{ color: 'var(--ink)' }}>Careers:</strong>{' '}
                    <a href={`mailto:${brand.careersEmail}`} style={{ color: brand.color.red }}>
                      {brand.careersEmail}
                    </a>
                  </p>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#5C6B7A', lineHeight: 1.75, marginBottom: 12 }}>
                  <strong style={{ color: 'var(--ink)' }}>Suppliers and subcontractors:</strong>{' '}
                  choose &ldquo;Supplying or subcontracting&rdquo; on the form and tell us your
                  trade, CIDB grading and the areas you work in.
                </p>

                <p style={{ fontSize: '0.88rem', color: '#5C6B7A', lineHeight: 1.75 }}>
                  <strong style={{ color: 'var(--ink)' }}>Media:</strong>{' '}
                  <a href={`mailto:${brand.email}`} style={{ color: brand.color.red }}>{brand.email}</a>
                </p>
              </aside>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (max-width: 1000px) {
            .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>

      {/* ── Someone actually answers ───────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: brand.color.navy900, color: '#fff' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/lkmd/switchboard.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center 28%',
            opacity: 0.22,
          }}
        />
        <div
          className="container-tight"
          style={{ position: 'relative', zIndex: 1, padding: '88px 0', textAlign: 'center' }}
        >
          <Reveal>
            <h2 className="display-sm" style={{ color: '#fff', marginBottom: 18 }}>
              Every enquiry reaches a person.
            </h2>
            <p className="lede-dark" style={{ maxWidth: 560, margin: '0 auto' }}>
              Tell us what you need built and where. We will come back to you
              with the right people from the right office, not a generic reply.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The four offices ──────────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '96px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Our offices</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 44 }}>
              Four offices across South Africa.
            </h2>
          </Reveal>

          <div
            className="office-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {brand.addresses.map((a, i) => {
              const query = encodeURIComponent(`${a.lines.join(', ')}, South Africa`);
              return (
                <Reveal key={a.id} delay={i * 80}>
                  {/* id anchors the footer links: /contact#centurion etc. */}
                  <div
                    id={a.id}
                    style={{
                      background: '#fff', padding: '32px 28px', height: '100%',
                      borderTop: `3px solid ${brand.color.red}`, scrollMarginTop: 110,
                    }}
                  >
                    <MapPin size={18} strokeWidth={1.9} color={brand.color.red} />
                    <h3 style={{ fontSize: '1.08rem', margin: '16px 0 12px' }}>{a.label}</h3>
                    <address
                      style={{
                        fontStyle: 'normal', fontSize: '0.89rem',
                        color: '#5C6B7A', lineHeight: 1.75, marginBottom: 18,
                      }}
                    >
                      {a.lines.map(l => <span key={l} style={{ display: 'block' }}>{l}</span>)}
                    </address>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.12em', color: brand.color.red, textDecoration: 'none',
                      }}
                    >
                      Get directions →
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .office-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px)  { .office-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
