import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { constraints, pipeline, localContent, marketStats, marketSource } from '@/lib/content';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'The Market',
  description:
    'Namibia’s published mining pipeline, the four constraints named as limits on it, and the construction capability each one calls for.',
};

/**
 * Built entirely from the NamPPF deck (Oct 2025). Every figure and every
 * named development on this page is sourced and linked, which is the whole
 * point of it: the rest of the site makes claims about us, this page makes
 * claims about the market and shows its working.
 */
export default function MarketPage() {
  return (
    <>
      <PageHero
        eyebrow="The market"
        title="The constraints are published. So is the pipeline."
        lede="Namibia has set out what is limiting its mining sector and what it intends to build in four years. Both documents describe construction work."
        image="/sectors/sector-mining.jpg"
        video="/video/cinematic.mp4"
        poster="/cinematic-poster.jpg"
        position="center 45%"
      />

      {/* ── Headline numbers ──────────────────────────────── */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '96px 0' }}>
        <div className="container">
          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 36 }}>
            {marketStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div style={{ borderTop: `2px solid ${brand.color.red}`, paddingTop: 22 }}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) { .stat-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px)  { .stat-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Constraints mapped to capability ──────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>What is in the way</p>
            <h2 className="display-sm" style={{ maxWidth: 680, marginBottom: 20 }}>
              Four constraints are named. Three of them are built out of the ground.
            </h2>
            <p className="lede" style={{ maxWidth: 620, marginBottom: 56 }}>
              The deck does not describe a financing problem or a geology problem. It
              describes water, power, rail, processing capacity and trained crews —
              which is a description of a contractor&apos;s order book.
            </p>
          </Reveal>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {constraints.map((c, i) => (
              <Reveal key={c.constraint} delay={i * 70}>
                <article
                  className="con-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '54px 1fr 1fr',
                    gap: 36,
                    padding: '38px 0',
                    borderBottom: '1px solid var(--line)',
                    alignItems: 'start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '0.82rem', fontWeight: 700,
                      color: brand.color.red, letterSpacing: '0.08em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: 14 }}>{c.constraint}</h3>
                    <p style={{ fontSize: '0.92rem', color: '#5C6B7A', lineHeight: 1.85 }}>
                      {c.finding}
                    </p>
                  </div>

                  <div style={{ borderLeft: `3px solid ${brand.color.navy700}`, paddingLeft: 22 }}>
                    <p
                      style={{
                        fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.14em', color: brand.color.navy700, marginBottom: 10,
                      }}
                    >
                      {c.response}
                    </p>
                    <p style={{ fontSize: '0.92rem', color: '#44576A', lineHeight: 1.85 }}>
                      {c.detail}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .con-row { grid-template-columns: 40px 1fr !important; gap: 20px !important; }
            .con-row > div:last-child { grid-column: 2; margin-top: 18px; }
          }
        `}</style>
      </section>

      {/* ── The named pipeline ────────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '112px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>The pipeline</p>
            <h2 className="display-sm" style={{ maxWidth: 620, marginBottom: 20 }}>
              Named developments, not a forecast.
            </h2>
            <p className="lede" style={{ maxWidth: 640, marginBottom: 48 }}>
              {pipeline.note}
            </p>
          </Reveal>

          <div
            className="pipe-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}
          >
            {pipeline.groups.map((g, i) => (
              <Reveal key={g.sector} delay={(i % 2) * 100}>
                <div
                  style={{
                    background: '#fff', padding: '36px 34px', height: '100%',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <h3 style={{ fontSize: '1.12rem', marginBottom: 20 }}>{g.sector}</h3>
                  <ul style={{ listStyle: 'none' }}>
                    {g.items.map(it => (
                      <li
                        key={it}
                        style={{
                          fontSize: '0.9rem', color: '#44576A', lineHeight: 1.7,
                          paddingLeft: 18, position: 'relative', marginBottom: 12,
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            position: 'absolute', left: 0, top: 10,
                            width: 7, height: 2, background: brand.color.red,
                          }}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`@media (max-width: 820px) { .pipe-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── Local content ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>Local content</p>
              <h2 className="display-sm" style={{ marginBottom: 22 }}>
                The supply chain is already there. It is under-financed, not absent.
              </h2>
              <p className="lede">
                Mining-linked small and medium enterprises supplied N$24 billion of
                goods and services in 2024. The barrier named is access to finance and
                skills — not willingness, and not capability.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="lc-grid"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}
              >
                {localContent.map(s => (
                  <div
                    key={s.label}
                    style={{ background: brand.color.navy900, color: '#fff', padding: '30px 26px' }}
                  >
                    <div className="stat-value" style={{ fontSize: 'clamp(1.7rem, 2.4vw, 2.2rem)' }}>
                      {s.value}
                    </div>
                    <div className="stat-label" style={{ marginTop: 10 }}>{s.label}</div>
                    <div className="stat-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div
              style={{
                marginTop: 56, padding: '34px 38px',
                border: `1px solid ${brand.color.line}`,
                borderLeft: `4px solid ${brand.color.navy700}`,
                display: 'flex', gap: 26, flexWrap: 'wrap',
                alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', maxWidth: 760 }}>
                <FileText size={18} strokeWidth={1.8} color={brand.color.navy700} style={{ marginTop: 3, flexShrink: 0 }} />
                <p style={{ fontSize: '0.86rem', color: '#5C6B7A', lineHeight: 1.8 }}>
                  {marketSource}
                </p>
              </div>
              <a
                href="/namppf-mining-adjacent-sectors.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                Read the deck
                <ArrowRight size={14} strokeWidth={2.4} />
              </a>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .split { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
          @media (max-width: 520px) { .lc-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ background: brand.color.navy800, color: '#fff', padding: '96px 0' }}>
        <div className="container-tight" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="display-sm" style={{ color: '#fff', marginBottom: 22 }}>
              If you are developing any of this, we should be talking early.
            </h2>
            <p className="lede-dark" style={{ maxWidth: 560, margin: '0 auto 36px' }}>
              The savings available at concept stage are not available once the design
              is frozen. That is the whole argument for early contractor involvement.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Start a conversation
              <ArrowRight size={14} strokeWidth={2.4} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
