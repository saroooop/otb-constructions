import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Our People | LKMD Construction',
  description:
    'Meet the teams behind LKMD Construction, from project and site management to quality, safety, tenders and logistics.',
};

/** The seven departments, in the order and wording the brief gives. */
const departments = [
  { name: 'Project Management',            body: 'Architects, project managers and construction managers who plan and lead each project.' },
  { name: 'Site Management',               body: 'Site managers, site supervisors and foremen who run our sites day to day.' },
  { name: 'Safety, Health & Environment',  body: 'SHE officers, first aid officers and OHS trainers who keep every site safe.' },
  { name: 'Quality Control',               body: 'Quality control and quality assurance officers who check materials and workmanship at every stage.' },
  { name: 'Tender Administration',         body: 'Quantity surveyors, engineers and town planners who price, plan and prepare our tenders.' },
  { name: 'Logistics',                     body: 'Procurement officers, drivers and our marketing team, who keep materials, equipment and people moving.' },
  { name: 'Office Administration',         body: 'Human resources, secretarial support and a social facilitator who works with the communities around our projects.' },
];

const leadership = ['Board of Directors', 'Managing Director', 'Deputy Managing Director', 'Deputy Managing Director'];

export default function OurPeoplePage() {
  return (
    <>
      <PageHero
        eyebrow="Our people"
        title="The right expertise on every project"
        lede="Our people are our greatest resource. Each project team is put together from specialists across our departments, so the right knowledge and experience are in place from day one."
        image="/lkmd/turbines.jpg"
        video="/video/structure.mp4"
        poster="/posters/structure.jpg"
        position="center 50%"
      />

      {/* ── How we are organised ──────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>How we are organised</p>
            <h2 className="display-sm" style={{ maxWidth: 680, marginBottom: 20 }}>
              Led by a board, delivered by seven departments.
            </h2>
            <p className="lede" style={{ maxWidth: 640, marginBottom: 48 }}>
              LKMD is led by a Board of Directors and a Managing Director, supported
              by two Deputy Managing Directors. Our work is organised in seven
              departments.
            </p>
          </Reveal>

          {/* Leadership line */}
          <Reveal>
            <div
              className="lead-line"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 4 }}
            >
              {leadership.map((l, i) => (
                <div
                  key={`${l}-${i}`}
                  style={{
                    background: i === 0 ? brand.color.navy900 : brand.color.navy800,
                    color: '#fff', padding: '24px 22px', textAlign: 'center',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.35 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Departments */}
          <div
            className="dept-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {departments.map((d, i) => (
              <Reveal key={d.name} delay={(i % 4) * 80}>
                <div
                  style={{
                    background: brand.color.concrete, padding: '30px 26px 34px',
                    height: '100%', borderTop: '3px solid var(--line)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em',
                      color: brand.color.red, marginBottom: 14,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{ fontSize: '1rem', marginBottom: 12, lineHeight: 1.3 }}>{d.name}</h3>
                  <p style={{ fontSize: '0.86rem', color: '#5C6B7A', lineHeight: 1.8 }}>{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1100px) {
            .lead-line { grid-template-columns: 1fr 1fr !important; }
            .dept-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 600px) {
            .lead-line { grid-template-columns: 1fr !important; }
            .dept-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Interns ───────────────────────────────────────── */}
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
            backgroundImage: 'url(/lkmd/team-lineup.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center 30%',
            opacity: 0.18,
          }}
        />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal>
            <h2 className="display-sm" style={{ color: '#fff', marginBottom: 20 }}>
              Every department trains interns.
            </h2>
            <p className="lede-dark" style={{ maxWidth: 560, margin: '0 auto' }}>
              Building the next generation of construction professionals is part of
              how each of our seven departments works, not a separate programme.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Want to join the team?"
        body="We are always looking for skilled people who put safety and quality first."
        primary={{ label: 'See careers', href: '/careers' }}
        secondary={undefined}
      />
    </>
  );
}
