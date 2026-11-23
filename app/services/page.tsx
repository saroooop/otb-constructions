import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { services, expertise } from '@/lib/site';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Construction & Engineering Services | LKMD Construction',
  description:
    'Building construction, civil and structural engineering, refurbishment and maintenance, construction management, design & construct and property development support from LKMD Construction.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Planning, design and construction under one roof"
        lede="From simple refurbishments to major new buildings and infrastructure, LKMD provides a full range of professional construction services. Choose a service below, or tell us about your project."
        image="/lkmd/site-team.jpg"
        video="/video/services.mp4"
        poster="/posters/services.jpg"
        position="center 40%"
      />

      {/* ── Three areas of expertise ──────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Three areas of expertise</p>
          </Reveal>

          <div
            className="exp-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {expertise.map((e, i) => (
              <Reveal key={e.title} delay={i * 100}>
                <div
                  style={{
                    background: brand.color.concrete, padding: '36px 32px', height: '100%',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '1.4rem', fontWeight: 800,
                      color: 'transparent', WebkitTextStroke: `1.2px ${brand.color.red}`,
                      marginBottom: 16,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 style={{ fontSize: '1.12rem', marginBottom: 12 }}>{e.title}</h2>
                  <p style={{ fontSize: '0.9rem', color: '#5C6B7A', lineHeight: 1.85 }}>{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .exp-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── The six service cards ─────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '104px 0' }}>
        <div className="container">
          <Reveal>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 46 }}>
              Six services, one accountable team.
            </h2>
          </Reveal>

          <div
            className="tile-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <Link href={`/services/${s.slug}`} className="tile" style={{ height: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.title} loading="lazy" decoding="async" />
                  <span className="tile-body">
                    <span className="tile-rule" style={{ display: 'block' }} />
                    <span className="tile-title" style={{ display: 'block' }}>{s.title}</span>
                    <span className="tile-sub" style={{ display: 'block' }}>{s.short}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 40 }}>
              <Link href="/projects" className="btn btn-outline">
                See the work
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 1024px) { .tile-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 620px)  { .tile-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <CtaBand />
    </>
  );
}
