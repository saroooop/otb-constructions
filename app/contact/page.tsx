import type { Metadata } from 'next';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tender enquiries, project discussions, subcontract and supply registration, and careers — UK and Southern Africa.',
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
                fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                maxWidth: 760,
                marginBottom: 24,
              }}
            >
              Tell us what you are building.
            </h1>
            <p className="lede" style={{ maxWidth: 560 }}>
              The earlier we see a scope, the more we can do about its cost. Even a
              sketch and a programme date is enough to start.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 56, paddingBottom: 120 }}>
        <div className="container">
          <div
            className="contact-grid"
            style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={120}>
              <aside style={{ background: brand.color.concrete, padding: '44px 40px' }}>
                <h2 style={{ fontSize: '1.15rem', marginBottom: 28 }}>Direct lines</h2>

                <ContactLine
                  Icon={Mail}
                  label="Email"
                  value={brand.email}
                  href={`mailto:${brand.email}`}
                />
                <ContactLine
                  Icon={Phone}
                  label="Telephone"
                  value={brand.phone}
                  href={`tel:${brand.phone.replace(/\s/g, '')}`}
                />
                <ContactLine
                  Icon={MessageCircle}
                  label="WhatsApp"
                  value="Message the team"
                  href={`https://wa.me/${brand.whatsapp}`}
                  external
                />

                <hr className="hairline" style={{ margin: '30px 0' }} />

                <h3
                  style={{
                    fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.14em', color: '#5C6B7A', marginBottom: 20,
                  }}
                >
                  Offices
                </h3>

                {brand.addresses.map(a => (
                  <div key={a.label} style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
                    <MapPin size={16} strokeWidth={1.8} color={brand.color.red} style={{ marginTop: 4, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{a.label}</div>
                      <div style={{ fontSize: '0.88rem', color: '#5C6B7A', lineHeight: 1.65 }}>
                        {a.lines.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}

                <hr className="hairline" style={{ margin: '30px 0' }} />

                <p style={{ fontSize: '0.86rem', color: '#5C6B7A', lineHeight: 1.85 }}>
                  <strong style={{ color: 'var(--ink)' }}>Pre-qualification packs.</strong>{' '}
                  If you need our HSE statistics, insurance certificates, plant
                  register or company registration documents, ask and we will send the
                  pack the same working day.
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
    </>
  );
}

function ContactLine({
  Icon, label, value, href, external,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      style={{
        display: 'flex', gap: 12, alignItems: 'flex-start',
        marginBottom: 20, textDecoration: 'none',
      }}
    >
      <Icon size={16} strokeWidth={1.8} color={brand.color.red} />
      <span>
        <span
          style={{
            display: 'block', fontSize: '0.68rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.13em',
            color: '#8A99A8', marginBottom: 4,
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500, wordBreak: 'break-word' }}>
          {value}
        </span>
      </span>
    </a>
  );
}
