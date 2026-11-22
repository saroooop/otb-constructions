import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/brand';
import {
  whoWeAre, coreValues, vision, mission,
  whyChooseUs, approachPoints, clientTypes, headcount,
} from '@/lib/lkmd';

export const metadata: Metadata = {
  title: 'About',
  description:
    'A professional, multi-disciplinary construction company delivering building and civil engineering across the United Kingdom and the African continent.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="A one-stop shop for building and civil engineering."
        lede="Operating throughout the United Kingdom and the African continent, for clients in the government, commercial, industrial and residential markets."
        image="/lkmd/concrete.jpg"
        video="/video/lkmd.mp4"
        poster="/lkmd-poster.jpg"
        position="center 45%"
      />

      {/* ── Who we are ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 26 }}>About us</p>
              <h2 className="display-sm">
                High-quality work,
                <br />
                on time and
                <br />
                within budget.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 28 }}>{whoWeAre[0]}</p>
              {whoWeAre.slice(1).map(para => (
                <p key={para} className="lede" style={{ marginBottom: 20 }}>{para}</p>
              ))}

              <div
                style={{
                  display: 'flex', gap: 10, flexWrap: 'wrap',
                  paddingTop: 26, marginTop: 14, borderTop: '1px solid var(--line)',
                }}
              >
                {clientTypes.map(c => (
                  <span
                    key={c}
                    style={{
                      fontSize: '0.76rem', padding: '7px 13px',
                      background: brand.color.concrete,
                      border: '1px solid var(--line)', color: '#44576A',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* ── Vision & mission ──────────────────────────────── */}
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
            backgroundImage: 'url(/lkmd/crane-sunset.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center 55%',
            opacity: 0.22,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="vm-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}
          >
            {[
              { k: 'Vision', v: vision },
              { k: 'Mission', v: mission },
            ].map((x, i) => (
              <Reveal key={x.k} delay={i * 120}>
                <div
                  className="card-dark"
                  style={{ height: '100%', padding: '44px 40px', borderTop: `3px solid ${brand.color.red}` }}
                >
                  <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>{x.k}</p>
                  <p style={{ fontSize: '1.08rem', color: '#DCE6F0', lineHeight: 1.85 }}>{x.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`@media (max-width: 820px) { .vm-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ── Core values ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Core values</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 54 }}>
              Five commitments we are happy to be measured against.
            </h2>
          </Reveal>

          <div
            className="val-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}
          >
            {coreValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div
                  style={{
                    background: brand.color.concrete, padding: '34px 28px', height: '100%',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '1.3rem', fontWeight: 800,
                      color: 'transparent', WebkitTextStroke: `1.2px ${brand.color.red}`,
                      marginBottom: 16,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ fontSize: '0.86rem', color: '#5C6B7A', lineHeight: 1.8 }}>{v.desc}</p>
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

      {/* ── Why choose us ─────────────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '112px 0' }}>
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal>
              <div style={{ position: 'sticky', top: 120 }}>
                <p className="eyebrow" style={{ marginBottom: 22 }}>Why choose us</p>
                <h2 className="display-sm" style={{ marginBottom: 28 }}>
                  Years in the UK.
                  <br />
                  Networks in Africa.
                </h2>
                <div
                  style={{
                    position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden',
                    maxWidth: 320, background: brand.color.navy900,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/lkmd/engineer-white.jpg"
                    alt="LKMD engineer on site"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    aria-hidden
                    style={{ position: 'absolute', left: 0, bottom: 0, width: 64, height: 5, background: brand.color.red }}
                  />
                </div>
              </div>
            </Reveal>

            <div>
              {whyChooseUs.map((w, i) => (
                <Reveal key={w.title} delay={i * 80}>
                  <div
                    style={{
                      padding: '32px 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                    }}
                  >
                    <h3 style={{ fontSize: '1.18rem', marginBottom: 12 }}>{w.title}</h3>
                    <p style={{ fontSize: '0.94rem', color: '#5C6B7A', lineHeight: 1.85 }}>{w.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* ── Our approach ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Our approach</p>
            <h2 className="display-sm" style={{ maxWidth: 620, marginBottom: 20 }}>
              How we run a job.
            </h2>
            <p className="lede" style={{ maxWidth: 620, marginBottom: 52 }}>
              {headcount.total} people across {headcount.departments} departments, of
              whom {headcount.interns} are interns — which is the clearest statement
              we can make about training the next intake rather than only hiring it.
            </p>
          </Reveal>

          <div
            className="app-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {approachPoints.map((a, i) => (
              <Reveal key={a.title} delay={i * 90}>
                <div
                  style={{
                    background: brand.color.concrete, padding: '34px 30px', height: '100%',
                    borderTop: `3px solid ${brand.color.navy700}`,
                  }}
                >
                  <Check size={20} strokeWidth={2.4} color={brand.color.red} />
                  <h3 style={{ fontSize: '1.02rem', margin: '18px 0 12px' }}>{a.title}</h3>
                  <p style={{ fontSize: '0.86rem', color: '#5C6B7A', lineHeight: 1.8 }}>{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 48, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/group" className="btn btn-primary">
                Our structure
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
              <Link href="/contact" className="btn btn-outline">Get in touch</Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 1024px) { .app-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .app-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
