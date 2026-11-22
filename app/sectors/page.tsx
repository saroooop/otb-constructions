import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { sectors, marketStats, marketSource } from '@/lib/content';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Sectors',
  description:
    'Mining and minerals, energy and power, water and desalination, transport infrastructure, industrial building and public works across Southern Africa and the UK.',
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Six markets. One set of standards."
        lede="A school and a shaft collar are built to the same quality regime here. The difference is the permit, not the care."
        image="/sectors/hero-sectors.jpg"
        position="center 30%"
      />

      {/* ── Context ───────────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal>
              <h2 className="display-sm">Why these six.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 24 }}>
                They are the sectors where a mining programme actually lands.
              </p>
              <p className="lede">
                A new mine is never only a mine. It is a haul road, a power line, a
                water pipeline from the coast, a processing plant, a workshop, a
                clinic in the town that houses the workforce. We built the business
                around that whole chain, because splitting it between five contractors
                is where programmes go to die.
              </p>
            </Reveal>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
      </section>

      {/* ── Sector cards ──────────────────────────────────── */}
      <section style={{ paddingBottom: 120 }}>
        <div className="container">
          <div
            className="sector-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}
          >
            {sectors.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 110}>
                <article style={{ background: brand.color.concrete, height: '100%' }}>
                  <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      loading="lazy"
                      decoding="async"
                      src={s.image}
                      alt={s.title}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'saturate(0.8) contrast(1.05) brightness(0.95)',
                      }}
                    />
                    <span
                      aria-hidden
                      style={{ position: 'absolute', left: 0, top: 0, width: 5, height: 64, background: brand.color.red }}
                    />
                  </div>
                  <div style={{ padding: '34px 34px 40px' }}>
                    <h3 style={{ fontSize: '1.32rem', marginBottom: 14 }}>{s.title}</h3>
                    <p style={{ fontSize: '0.94rem', color: '#44576A', lineHeight: 1.8, marginBottom: 16, fontWeight: 500 }}>
                      {s.short}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#5C6B7A', lineHeight: 1.85 }}>
                      {s.detail}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`@media (max-width: 820px) { .sector-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── Market evidence ───────────────────────────────── */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '104px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>Market evidence</p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 680, marginBottom: 56 }}>
              The published case for building capacity here, not importing it.
            </h2>
          </Reveal>

          <div
            className="stat-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 36 }}
          >
            {marketStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div style={{ borderTop: `2px solid ${brand.color.red}`, paddingTop: 22 }}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p style={{ fontSize: '0.78rem', color: '#60788E', maxWidth: 760, marginTop: 48, lineHeight: 1.7 }}>
              {marketSource}
            </p>
            <div style={{ marginTop: 32 }}>
              <Link href="/contact" className="btn btn-primary">
                Discuss a project
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 1024px) { .stat-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px)  { .stat-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
