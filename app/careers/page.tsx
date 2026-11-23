import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Careers & Internships | LKMD Construction',
  description:
    'Build a career in construction and engineering with LKMD Construction. See current vacancies and internships, and how to apply.',
};

const why = [
  { title: 'Varied projects',               body: 'Schools, housing, public buildings, industrial facilities and infrastructure.' },
  { title: 'Learn from experienced people', body: 'Work alongside our architects, engineers, quantity surveyors and construction managers.' },
  { title: 'Safety first',                  body: 'Inductions, regular training and dedicated SHE officers on every site.' },
  { title: 'Room to grow',                  body: 'Internships in every department, and on-the-job training as your career develops.' },
];

/**
 * The brief lists the roles LKMD recruits but gives no live vacancies, and is
 * explicit that no placeholder content may appear on the live site. So this
 * is the roles list — not an invented vacancy table.
 */
const roles = [
  'Project and construction managers',
  'Architects',
  'Engineers',
  'Quantity surveyors',
  'Town planners',
  'Site managers, supervisors and foremen',
  'SHE officers and OHS trainers',
  'Quality control and assurance officers',
  'Procurement and logistics',
  'Human resources and administration',
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career with LKMD"
        lede="We are a multi-disciplinary construction company with projects and offices across South Africa. We are always interested in skilled people who take pride in their work and put safety first."
        image="/lkmd/engineer-orange.jpg"
        video="/video/careers.mp4"
        poster="/posters/careers.jpg"
        position="center 30%"
      />

      {/* ── Why work with us ──────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Why work with us</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 46 }}>
              What you can expect here.
            </h2>
          </Reveal>

          <div
            className="why-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {why.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <div
                  style={{
                    background: brand.color.concrete, padding: '32px 28px', height: '100%',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <Check size={19} strokeWidth={2.5} color={brand.color.red} />
                  <h3 style={{ fontSize: '1.02rem', margin: '16px 0 10px' }}>{w.title}</h3>
                  <p style={{ fontSize: '0.87rem', color: '#5C6B7A', lineHeight: 1.8 }}>{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .why-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .why-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── The roles we recruit ──────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '96px 0' }}>
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>The roles we recruit</p>
              <h2 className="display-sm">Across every department.</h2>
            </Reveal>

            <Reveal delay={120}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {roles.map(r => (
                  <span
                    key={r}
                    style={{
                      fontSize: '0.86rem', padding: '10px 16px',
                      background: '#fff', border: '1px solid var(--line)', color: '#44576A',
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
      </section>

      {/* ── Internships ───────────────────────────────────── */}
      <section
        style={{
          position: 'relative', overflow: 'hidden',
          background: brand.color.navy900, color: '#fff', padding: '96px 0',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/lkmd/engineers-laptop.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center 35%',
            opacity: 0.16,
          }}
        />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22, justifyContent: 'center' }}>
              Internships
            </p>
            <h2 className="display-sm" style={{ color: '#fff', marginBottom: 20 }}>
              Every department at LKMD takes on interns.
            </h2>
            <p className="lede-dark" style={{ maxWidth: 580, margin: '0 auto' }}>
              Giving young people practical experience in construction, engineering,
              safety, quality and administration.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── How to apply ──────────────────────────────────── */}
      <section className="section">
        <div className="container-tight">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>How to apply</p>
            <h2 className="display-sm" style={{ marginBottom: 26 }}>Send us your CV.</h2>

            <p className="lede" style={{ marginBottom: 20 }}>
              LKMD is routinely looking for new talent. Please email your CV and a
              short covering letter to{' '}
              <a href={`mailto:${brand.careersEmail}`} style={{ color: brand.color.red, fontWeight: 600 }}>
                {brand.careersEmail}
              </a>
              , with the job title in the subject line.
            </p>
            <p className="lede" style={{ marginBottom: 34 }}>
              We use CVs only for recruitment and keep them for no longer than 12
              months. Only shortlisted candidates will be contacted.
            </p>

            <a href={`mailto:${brand.careersEmail}`} className="btn btn-primary">
              Email your CV
              <ArrowRight size={14} strokeWidth={2.4} />
            </a>

            {/* A warning that deserves prominence rather than burying. */}
            <div
              style={{
                marginTop: 44, padding: '26px 30px',
                border: `1px solid ${brand.color.line}`,
                borderLeft: `4px solid ${brand.color.red}`,
                background: brand.color.concrete,
              }}
            >
              <p style={{ fontSize: '0.92rem', color: '#2A3B4C', lineHeight: 1.8 }}>
                <strong>LKMD Construction never asks job applicants for money.</strong>{' '}
                Please report any request for payment made in our name to{' '}
                <a href={`mailto:${brand.email}`} style={{ color: brand.color.red, fontWeight: 600 }}>
                  {brand.email}
                </a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
