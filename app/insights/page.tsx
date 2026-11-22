import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { insights, marketSource } from '@/lib/content';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Our reading of the regional construction market: beneficiation, water infrastructure and local content that survives hand-over.',
};

export default function InsightsPage() {
  const [lead, ...rest] = insights;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="How we read the market we are bidding into."
        lede="Short, specific pieces on where the regional programme actually gets built — and where it stalls."
        image="/sectors/hero-2-headgear.jpg"
        position="center 45%"
      />

      <section className="section">
        <div className="container">
          {/* Lead piece */}
          <Reveal>
            <article
              className="lead-article"
              style={{
                display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0,
                background: brand.color.concrete, marginBottom: 4,
              }}
            >
              <div style={{ position: 'relative', minHeight: 360, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/disciplines/processing-beneficiation.jpg"
                  alt=""
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'saturate(0.8) contrast(1.05)',
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
                  <time dateTime={lead.date} style={{ color: '#8A99A8' }}>
                    {new Date(lead.date).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </time>
                  <span style={{ width: 4, height: 4, background: '#B9C5D1' }} />
                  <span style={{ color: '#8A99A8' }}>{lead.read}</span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', marginBottom: 20, lineHeight: 1.18 }}>
                  {lead.title}
                </h2>
                <p className="lede" style={{ marginBottom: 30 }}>{lead.standfirst}</p>

                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.12em', color: brand.color.red,
                  }}
                >
                  Full piece in preparation
                  <ArrowRight size={13} strokeWidth={2.4} />
                </span>
              </div>
            </article>
          </Reveal>

          {/* Remaining pieces */}
          <div
            className="ins-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}
          >
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 110}>
                <article style={{ background: brand.color.concrete, padding: '44px 40px', height: '100%' }}>
                  <div
                    style={{
                      display: 'flex', gap: 14, alignItems: 'center',
                      fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.12em', color: '#8A99A8', marginBottom: 20,
                    }}
                  >
                    <time dateTime={p.date}>
                      {new Date(p.date).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </time>
                    <span style={{ width: 4, height: 4, background: brand.color.red }} />
                    <span>{p.read}</span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: 16, lineHeight: 1.25 }}>{p.title}</h3>
                  <p style={{ fontSize: '0.94rem', color: '#5C6B7A', lineHeight: 1.85 }}>{p.standfirst}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Source material */}
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
                {marketSource}
              </p>
              <a
                href="/namppf-mining-adjacent-sectors.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.12em', color: brand.color.red, textDecoration: 'none',
                }}
              >
                Open the deck
                <ArrowRight size={13} strokeWidth={2.4} />
              </a>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .lead-article { grid-template-columns: 1fr !important; }
            .lead-article > div:first-child { min-height: 240px !important; }
            .lead-article > div:last-child  { padding: 36px 28px !important; }
            .ins-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
