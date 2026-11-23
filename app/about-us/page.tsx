import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { clientTypes } from '@/lib/site';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'About LKMD Construction | Who We Are',
  description:
    'LKMD Construction is a South African building and civil engineering company serving government, commercial, industrial and residential clients.',
};

const values = [
  { title: 'Integrity',      body: 'Transparency and ethical practice in all our business dealings.' },
  { title: 'Excellence',     body: 'Superior quality on every project.' },
  { title: 'Innovation',     body: 'Technology and creativity that deliver future-ready solutions.' },
  { title: 'Sustainability', body: 'Environmentally responsible practices and solutions.' },
  { title: 'Collaboration',  body: 'Strong partnerships with stakeholders, for shared success.' },
];

const more = [
  { title: 'Our People',      body: 'How our teams are organised.',                 href: '/about-us/our-people' },
  { title: 'Health & Safety', body: 'How we keep everyone on our sites safe.',      href: '/about-us/health-safety' },
  { title: 'LKMD Cares',      body: 'Our work with communities and for the environment.', href: '/about-us/lkmd-cares' },
];

/** Registrations publish only once a value exists — the brief forbids placeholders. */
const registrations = [
  { label: 'CIDB',  value: brand.registrations.cidb },
  { label: 'B-BBEE', value: brand.registrations.bbbee },
  { label: 'NHBRC', value: brand.registrations.nhbrc },
].filter(r => r.value);

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Who we are"
        lede="LKMD Construction is a professional, multi-disciplinary construction company, passionate about delivering high-quality building and civil engineering contracts on time and within budget."
        image="/lkmd/concrete.jpg"
        video="/video/lkmd.mp4"
        poster="/lkmd-poster.jpg"
        position="center 45%"
      />

      {/* ── Our company ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 26 }}>Our company</p>
              <h2 className="display-sm">
                A one-stop shop
                <br />
                for building and
                <br />
                civil engineering.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 26 }}>
                We work for clients in the government, commercial, industrial and
                residential markets across South Africa.
              </p>
              <p className="lede" style={{ marginBottom: 20 }}>
                Our range of skills makes us a one-stop shop for building and civil
                engineering construction, combining technical competence, local
                knowledge and excellent customer service.
              </p>
              <p className="lede" style={{ marginBottom: 30 }}>
                Our projects include schools, a police station, housing, the
                refurbishment of inner-city hostels and an industrial warehouse, in
                Gauteng and Mpumalanga. We have offices in Centurion, Cape Town,
                Durban and East London.
              </p>
              <Link href="/services" className="btn btn-outline">
                Explore our services
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </Reveal>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* ── Vision & mission ──────────────────────────────── */}
      <section
        style={{
          position: 'relative', overflow: 'hidden',
          background: brand.color.navy900, color: '#fff', padding: '110px 0',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/lkmd/crane-sunset.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center 55%',
            opacity: 0.2,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="vm-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {[
              { k: 'Our vision',  v: 'To be a recognised leader in engineering and construction, driving sustainable growth and innovation while empowering communities and creating impactful infrastructure.' },
              { k: 'Our mission', v: 'To provide world-class engineering, construction and management services that are efficient, reliable and environmentally conscious, fostering long-term partnerships built on trust and excellence.' },
            ].map((x, i) => (
              <Reveal key={x.k} delay={i * 120}>
                <div
                  className="card-dark"
                  style={{ height: '100%', padding: '44px 40px', borderTop: `3px solid ${brand.color.red}` }}
                >
                  <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>{x.k}</p>
                  <p style={{ fontSize: '1.06rem', color: '#DCE6F0', lineHeight: 1.85 }}>{x.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`@media (max-width: 820px) { .vm-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── Our approach ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>Our approach</p>
              <h2 className="display-sm">Lasting change, not just a handover.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede" style={{ marginBottom: 20 }}>
                We aim to bring lasting, positive change to the communities we serve
                through the work we do for our clients. We build long-term
                relationships with every client, and we manage reputational risk
                across everything we do, from environmental impact and customer care
                to health and safety.
              </p>
              <p className="lede">
                Team members are assigned to each project according to their knowledge
                and experience, so every project has the right specialists from the
                start.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Core values ───────────────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '104px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Our core values</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 46 }}>
              Five commitments, on every project.
            </h2>
          </Reveal>

          <div
            className="val-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}
          >
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div
                  style={{
                    background: '#fff', padding: '32px 26px', height: '100%',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '1.25rem', fontWeight: 800,
                      color: 'transparent', WebkitTextStroke: `1.2px ${brand.color.red}`,
                      marginBottom: 14,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{ fontSize: '1.02rem', marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#5C6B7A', lineHeight: 1.8 }}>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1100px) { .val-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 680px)  { .val-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Who we work for + registrations ───────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Who we work for</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: registrations.length ? 48 : 0 }}>
              {clientTypes.map(c => (
                <span
                  key={c}
                  style={{
                    fontSize: '0.86rem', padding: '10px 16px',
                    background: brand.color.concrete,
                    border: '1px solid var(--line)', color: '#44576A',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          {registrations.length > 0 && (
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>Registrations and memberships</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {registrations.map(r => (
                  <span
                    key={r.label}
                    style={{
                      fontSize: '0.84rem', padding: '10px 16px',
                      background: '#fff', border: '1px solid var(--line)', color: '#44576A',
                    }}
                  >
                    <strong style={{ color: 'var(--ink)' }}>{r.label}</strong> {r.value}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── More about LKMD ───────────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '96px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>More about LKMD</p>
          </Reveal>
          <div
            className="more-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {more.map((m, i) => (
              <Reveal key={m.href} delay={i * 90}>
                <Link href={m.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div
                    className="card"
                    style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}
                  >
                    <h3 style={{ fontSize: '1.1rem' }}>{m.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#5C6B7A', lineHeight: 1.8, flex: 1 }}>{m.body}</p>
                    <span
                      style={{
                        fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.12em', color: brand.color.red,
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                      }}
                    >
                      Read more <ArrowRight size={13} strokeWidth={2.4} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .more-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <CtaBand
        heading="Have a project in mind?"
        body="Tell us what you are planning and we will arrange a first discussion."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={undefined}
      />
    </>
  );
}
