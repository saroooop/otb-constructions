import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { safetyIntro, safetyAims, caresIntro, caresPoints } from '@/lib/lkmd';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Safety & LKMD Cares',
  description:
    'Health and safety standards that exceed UK legislative requirements, and a commitment to the communities we work in — training, local employment, partnerships and sustainable construction.',
};

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Safety & security"
        title="Our people are our greatest resource."
        lede="LKMD believes the human element is paramount in all projects we undertake."
        image="/lkmd/helmet.jpg"
        video="/video/safety.mp4"
        poster="/posters/safety.jpg"
        position="center 50%"
      />

      {/* ── Safety statement ──────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>Health &amp; safety</p>
              <h2 className="display-sm">
                Standards that
                <br />
                exceed what the
                <br />
                law requires.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 26 }}>{safetyIntro[0]}</p>
              <p className="lede">{safetyIntro[1]}</p>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
      </section>

      {/* ── The eight aims ────────────────────────────────── */}
      <section
        style={{
          position: 'relative', overflow: 'hidden',
          background: brand.color.navy900, color: '#fff', padding: '112px 0',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/lkmd/hivis.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.16,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>
              Our management system
            </p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 620, marginBottom: 52 }}>
              Eight things our health and safety system is built to do.
            </h2>
          </Reveal>

          <div
            className="aims-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {safetyAims.map((a, i) => (
              <Reveal key={a} delay={(i % 4) * 80}>
                <div
                  className="card-dark"
                  style={{ height: '100%', padding: '28px 26px', borderTop: `3px solid ${brand.color.red}` }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '1.2rem', fontWeight: 800,
                      color: 'transparent', WebkitTextStroke: `1.2px ${brand.color.redSoft}`,
                      marginBottom: 14,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p style={{ fontSize: '0.89rem', color: '#C7D6E4', lineHeight: 1.8 }}>{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1100px) { .aims-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 600px)  { .aims-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── LKMD Cares ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>LKMD Cares</p>
            <h2 className="display-sm" style={{ maxWidth: 640, marginBottom: 20 }}>
              Empowering communities and promoting sustainability.
            </h2>
            <p className="lede" style={{ maxWidth: 640, marginBottom: 52 }}>{caresIntro}</p>
          </Reveal>

          <div
            className="cares-grid"
            style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 4, alignItems: 'stretch' }}
          >
            <Reveal>
              <div style={{ position: 'relative', height: '100%', minHeight: 380, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  loading="lazy"
                  decoding="async"
                  src="/lkmd/community.jpg"
                  alt="Children in a community where LKMD works"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                  }}
                />
                <span
                  aria-hidden
                  style={{ position: 'absolute', left: 0, bottom: 0, width: 80, height: 5, background: brand.color.red }}
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div style={{ background: brand.color.concrete, padding: '44px 40px', height: '100%' }}>
                {caresPoints.map((c, i) => (
                  <div
                    key={c}
                    style={{
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                      padding: '20px 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                    }}
                  >
                    <Check size={18} strokeWidth={2.6} color={brand.color.red} style={{ marginTop: 3, flexShrink: 0 }} />
                    <p style={{ fontSize: '0.98rem', color: '#2A3B4C', lineHeight: 1.75 }}>{c}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .cares-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ background: brand.color.navy800, color: '#fff', padding: '96px 0' }}>
        <div className="container-tight" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="display-sm" style={{ color: '#fff', marginBottom: 22 }}>
              Need our health and safety pack?
            </h2>
            <p className="lede-dark" style={{ maxWidth: 520, margin: '0 auto 36px' }}>
              Policies, method statements, risk assessments and training records —
              ask and we will send the current pack.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Request the pack
              <ArrowRight size={14} strokeWidth={2.4} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
