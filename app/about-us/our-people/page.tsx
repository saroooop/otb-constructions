import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { orgDepartments, orgLeadership, headcount } from '@/lib/site';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Our People | LKMD Construction',
  description:
    'Meet the teams behind LKMD Construction, from project and site management to quality, safety, tenders and logistics.',
};


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

      {/* ── Headline numbers, derived from the organogram ── */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '84px 0' }}>
        <div className="container">
          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 36 }}>
            {[
              { v: String(headcount.total),       l: 'People',      s: 'Across the organisation' },
              { v: String(headcount.departments), l: 'Departments', s: 'Each with its own specialists' },
              { v: String(headcount.interns),     l: 'Interns',     s: 'Trained in every department' },
              { v: '5',                           l: 'Offices',     s: 'Four in South Africa, one in the UK' },
            ].map((x, i) => (
              <Reveal key={x.l} delay={i * 90}>
                <div style={{ borderTop: `2px solid ${brand.color.red}`, paddingTop: 22 }}>
                  <div className="stat-value">{x.v}</div>
                  <div className="stat-label">{x.l}</div>
                  <div className="stat-sub">{x.s}</div>
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
              {orgLeadership.map((l, i) => (
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
            {orgDepartments.map((d, i) => (
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
                  <div
                    style={{
                      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                      gap: 10, marginBottom: 12,
                    }}
                  >
                    <h3 style={{ fontSize: '1rem', lineHeight: 1.3 }}>{d.name}</h3>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading), system-ui, sans-serif',
                        fontSize: '1.1rem', fontWeight: 800, color: brand.color.red,
                      }}
                    >
                      {d.roles.reduce((t, r) => t + r.n, 0)}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#5C6B7A', lineHeight: 1.8, marginBottom: 16 }}>
                    {d.body}
                  </p>
                  {d.roles.map(r => (
                    <div
                      key={r.role}
                      style={{
                        display: 'flex', justifyContent: 'space-between', gap: 10,
                        fontSize: '0.82rem', color: '#5C6B7A',
                        padding: '6px 0', borderTop: '1px solid rgba(0,0,0,0.055)',
                      }}
                    >
                      <span>{r.role}</span>
                      <span style={{ color: '#2A3B4C', fontWeight: 600 }}>{r.n}</span>
                    </div>
                  ))}
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
