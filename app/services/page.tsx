import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { services, approach } from '@/lib/content';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'Civil engineering, roads and earthworks, mining infrastructure, processing and beneficiation, bulk water services and electrical and instrumentation delivery.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Six disciplines, self-performed, under one accountable contractor."
        lede="The people who price the work are the people who build it. That is the whole argument for self-performing the disciplines that decide a programme."
        image="/sectors/hero-services.jpg"
      />

      {/* ── Discipline detail ──────────────────────────────── */}
      <section className="section">
        <div className="container">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <article
                id={s.slug}
                className="svc-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 1.05fr' : '1.05fr 1fr',
                  gap: 64,
                  alignItems: 'center',
                  padding: '72px 0',
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                  scrollMarginTop: 110,
                }}
              >
                <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em',
                      color: brand.color.red, marginBottom: 18,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)', marginBottom: 20 }}>
                    {s.title}
                  </h2>
                  <p className="lede" style={{ marginBottom: 30 }}>{s.body}</p>

                  <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 22px' }}>
                    {s.capabilities.map(c => (
                      <li
                        key={c}
                        style={{
                          display: 'flex', gap: 10, alignItems: 'flex-start',
                          fontSize: '0.88rem', color: '#44576A', lineHeight: 1.6,
                        }}
                      >
                        <Check size={15} strokeWidth={2.6} color={brand.color.red} style={{ marginTop: 4, flexShrink: 0 }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', background: brand.color.navy900 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.title}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'saturate(0.85) contrast(1.04)',
                      }}
                    />
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute', left: 0, bottom: 0,
                        width: 72, height: 5, background: brand.color.red,
                      }}
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .svc-row { grid-template-columns: 1fr !important; gap: 36px !important; padding: 52px 0 !important; }
            .svc-row > div:first-child { order: 1 !important; }
            .svc-row > div:last-child  { order: 2 !important; }
            .svc-row ul { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Delivery model ────────────────────────────────── */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '110px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>Delivery model</p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 640, marginBottom: 56 }}>
              How a job runs from first conversation to hand-over.
            </h2>
          </Reveal>

          <div
            className="model-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {approach.map((a, i) => (
              <Reveal key={a.n} delay={i * 100}>
                <div className="card-dark" style={{ height: '100%', borderTop: `3px solid ${brand.color.red}` }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '1.6rem', fontWeight: 800, color: brand.color.redSoft, marginBottom: 16,
                    }}
                  >
                    {a.n}
                  </p>
                  <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: 12 }}>{a.title}</h3>
                  <p style={{ fontSize: '0.86rem', color: '#8EA3B8', lineHeight: 1.8 }}>{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 56 }}>
              <Link href="/contact" className="btn btn-primary">
                Start a conversation
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 1024px) { .model-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .model-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
