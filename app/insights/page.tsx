import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { insights, marketSource } from '@/lib/content';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Our reading of the regional construction market: beneficiation as a build programme, water as the real gate on expansion, and local content that outlasts hand-over.',
};

const dateFmt = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function InsightsPage() {
  const [lead, ...rest] = insights;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="How we read the market we are bidding into."
        lede="Short, specific pieces on where the regional programme actually gets built — and where it stalls. Each one is grounded in published assessment rather than opinion."
        image="/sectors/hero-insights.jpg"
        position="center 45%"
      />

      {/* ── Lead piece ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <article
              className="lead-article"
              style={{
                display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 0,
                background: brand.color.concrete, marginBottom: 72,
              }}
            >
              <div style={{ position: 'relative', minHeight: 420, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/disciplines/processing-beneficiation.jpg"
                  alt=""
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'saturate(0.85) contrast(1.04)',
                  }}
                />
              </div>

              <div style={{ padding: '52px 48px' }}>
                <div
                  style={{
                    display: 'flex', gap: 14, alignItems: 'center',
                    fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.13em', color: brand.color.red, marginBottom: 22,
                  }}
                >
                  <span>Latest</span>
                  <span style={{ width: 4, height: 4, background: '#B9C5D1' }} />
                  <time dateTime={lead.date} style={{ color: '#8A99A8' }}>{dateFmt(lead.date)}</time>
                  <span style={{ width: 4, height: 4, background: '#B9C5D1' }} />
                  <span style={{ color: '#8A99A8' }}>{lead.read}</span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', marginBottom: 20, lineHeight: 1.18 }}>
                  {lead.title}
                </h2>

                <p className="rule-left" style={{ marginBottom: 26 }}>{lead.standfirst}</p>

                {lead.body.map((para, i) => (
                  <p
                    key={i}
                    style={{ fontSize: '0.95rem', color: '#44576A', lineHeight: 1.9, marginBottom: 16 }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>

          {/* ── Remaining pieces, in full ───────────────────── */}
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <article
                id={p.slug}
                className="ins-row"
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 56,
                  padding: '56px 0',
                  borderTop: '1px solid var(--line)',
                  scrollMarginTop: 110,
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
                      fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.12em', color: '#8A99A8', marginBottom: 18,
                    }}
                  >
                    <time dateTime={p.date}>{dateFmt(p.date)}</time>
                    <span style={{ width: 4, height: 4, background: brand.color.red }} />
                    <span>{p.read}</span>
                  </div>
                  <h2
                    style={{
                      fontSize: 'clamp(1.3rem, 2vw, 1.75rem)',
                      lineHeight: 1.22,
                      position: 'sticky', top: 120,
                    }}
                  >
                    {p.title}
                  </h2>
                </div>

                <div>
                  <p className="rule-left" style={{ marginBottom: 24 }}>{p.standfirst}</p>
                  {p.body.map((para, j) => (
                    <p
                      key={j}
                      style={{ fontSize: '0.95rem', color: '#44576A', lineHeight: 1.9, marginBottom: 16 }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}

          {/* ── Source material ─────────────────────────────── */}
          <Reveal>
            <div
              style={{
                marginTop: 56, padding: '36px 40px',
                border: `1px solid ${brand.color.line}`,
                borderLeft: `4px solid ${brand.color.navy700}`,
              }}
            >
              <h3 style={{ fontSize: '1.05rem', marginBottom: 12 }}>Source material</h3>
              <p style={{ fontSize: '0.9rem', color: '#5C6B7A', lineHeight: 1.85, marginBottom: 18 }}>
                Every figure quoted above comes from this deck. We link it rather than
                paraphrasing it so you can check the numbers against the source.
              </p>
              <p style={{ fontSize: '0.85rem', color: '#8A99A8', lineHeight: 1.8, marginBottom: 20 }}>
                {marketSource}
              </p>
              <a
                href="/namppf-mining-adjacent-sectors.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                Open the deck
                <ArrowRight size={14} strokeWidth={2.4} />
              </a>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 960px) {
            .lead-article { grid-template-columns: 1fr !important; }
            .lead-article > div:first-child { min-height: 260px !important; }
            .lead-article > div:last-child  { padding: 36px 28px !important; }
            .ins-row { grid-template-columns: 1fr !important; gap: 24px !important; }
            .ins-row h2 { position: static !important; }
          }
        `}</style>
      </section>
    </>
  );
}
