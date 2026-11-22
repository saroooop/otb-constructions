import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { whatWeDo, coreServices, serviceAreas, affiliationsTodo } from '@/lib/lkmd';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'Construction, construction management and engineering — plus property development support, refurbishment, renovation, repairs and maintenance, civil and structural engineering, and Design & Construct.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="A one-stop shop for planning, designing and construction."
        lede="We always provide specialist construction services and deliver superior work on time and within budget."
        image="/lkmd/site-team.jpg"
        video="/video/services.mp4"
        poster="/posters/services.jpg"
        position="center 40%"
      />

      {/* ── The six, as image tiles ───────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Our expertise encompasses</p>
            <h2 className="display-sm" style={{ maxWidth: 600, marginBottom: 54 }}>
              Six kinds of job, start to finish.
            </h2>
          </Reveal>

          <div
            className="tile-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {whatWeDo.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 100}>
                <div className="tile" style={{ height: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.image} alt={w.title} loading="lazy" decoding="async" />
                  <span className="tile-body">
                    <span className="tile-rule" style={{ display: 'block' }} />
                    <span className="tile-title" style={{ display: 'block' }}>{w.title}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .tile-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 620px)  { .tile-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Three core categories ─────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '112px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Services &amp; solutions</p>
            <h2 className="display-sm" style={{ maxWidth: 640, marginBottom: 20 }}>
              Our portfolio of core services falls under three categories.
            </h2>
          </Reveal>

          {coreServices.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <article
                className="svc-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                  background: '#fff', marginTop: i === 0 ? 34 : 4,
                }}
              >
                <div
                  style={{
                    position: 'relative', minHeight: 300, overflow: 'hidden',
                    order: i % 2 === 0 ? 1 : 2,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    loading="lazy"
                    decoding="async"
                    src={c.image}
                    alt={c.title}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%', objectFit: 'cover',
                    }}
                  />
                  <span
                    aria-hidden
                    style={{ position: 'absolute', left: 0, top: 0, width: 5, height: 72, background: brand.color.red }}
                  />
                </div>

                <div style={{ padding: '46px 46px 50px', order: i % 2 === 0 ? 2 : 1 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em',
                      color: brand.color.red, marginBottom: 16,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{ fontSize: 'clamp(1.4rem, 2.1vw, 1.9rem)', marginBottom: 18 }}>{c.title}</h3>
                  <p className="lede">{c.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .svc-row { grid-template-columns: 1fr !important; }
            .svc-row > div:first-child { order: 1 !important; min-height: 220px !important; }
            .svc-row > div:last-child  { order: 2 !important; padding: 34px 28px 38px !important; }
          }
        `}</style>
      </section>

      {/* ── CTA band, straight from the profile ───────────── */}
      <section
        style={{
          position: 'relative', overflow: 'hidden',
          background: brand.color.navy800, color: '#fff', padding: '104px 0',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/lkmd/bokeh.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.3,
          }}
        />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal>
            <h2 className="display-sm" style={{ color: '#fff', marginBottom: 22 }}>
              Looking for an expert team to manage your construction requirements?
            </h2>
            <p className="lede-dark" style={{ maxWidth: 520, margin: '0 auto 36px' }}>
              Get in touch with {brand.full} today. We will be delighted to help.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get in touch
              <ArrowRight size={14} strokeWidth={2.4} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Key service areas ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Key service areas</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 54 }}>
              What that means in practice.
            </h2>
          </Reveal>

          <div
            className="area-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {serviceAreas.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 90}>
                <div
                  style={{
                    background: brand.color.concrete, padding: '36px 32px', height: '100%',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <Check size={20} strokeWidth={2.4} color={brand.color.red} />
                  <h3 style={{ fontSize: '1.06rem', margin: '18px 0 12px', lineHeight: 1.35 }}>
                    {a.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#5C6B7A', lineHeight: 1.85 }}>{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Affiliations — declared outstanding rather than invented */}
          <Reveal>
            <div
              style={{
                marginTop: 56, padding: '34px 38px',
                border: `1px solid ${brand.color.line}`,
                borderLeft: `4px solid ${brand.color.navy700}`,
              }}
            >
              <h3 style={{ fontSize: '1.02rem', marginBottom: 10 }}>
                Affiliations and certifications
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#5C6B7A', lineHeight: 1.85 }}>
                Our industry memberships and certifications are being confirmed for
                publication. If you need them for pre-qualification —{' '}
                {affiliationsTodo.join(', ')} or otherwise — ask and we will send
                current certificates directly.
              </p>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 1024px) { .area-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .area-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
