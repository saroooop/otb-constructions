import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Site engineers, foremen, plant operators, quantity surveyors and HSE officers — open applications across Southern Africa and the UK.',
};

// TODO: replace with live vacancies before launch. See CONTENT-TODO.md.
const roles = [
  { title: 'Site Engineer — Civils',        location: 'Erongo Region, Namibia', type: 'Full time' },
  { title: 'Foreman — Bulk Earthworks',     location: 'Namibia',                type: 'Full time' },
  { title: 'Quantity Surveyor',             location: 'Windhoek / remote',      type: 'Full time' },
  { title: 'HSE Officer',                   location: 'Site based',             type: 'Full time' },
  { title: 'Plant Operator — Excavator',    location: 'Site based',             type: 'Contract' },
  { title: 'Graduate Engineer Programme',   location: 'Southern Africa',        type: 'Graduate' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="We would rather train someone local than fly someone in."
        lede="That is a commercial position as much as a social one. Crews that live near the site turn up, stay, and know the ground."
        image="/site-access-ppe-2.jpg"
        position="center 30%"
      />

      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start', marginBottom: 64 }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>Working here</p>
              <h2 className="display-sm">What you should expect.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 24 }}>
                Hard sites, proper kit, and a supervisor who will back you when you
                stop the job.
              </p>
              <p className="lede">
                Construction in this region is demanding work in difficult conditions.
                We do not pretend otherwise. What we commit to is competent
                supervision, maintained plant, PPE that fits, accommodation that is
                habitable, and a training route that takes people from general worker
                to ticketed operator to supervisor — on our payroll, not a promise.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <h3 style={{ fontSize: '1.25rem', marginBottom: 8 }}>Current openings</h3>
            <p style={{ fontSize: '0.88rem', color: '#8A99A8', marginBottom: 28 }}>
              Nothing listed that fits? Send a speculative application — we keep a live
              register for mobilisation.
            </p>
          </Reveal>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {roles.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <Link
                  href="/contact"
                  className="role-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.2fr 0.8fr 36px',
                    gap: 24, alignItems: 'center',
                    padding: '26px 0',
                    borderBottom: '1px solid var(--line)',
                    textDecoration: 'none',
                  }}
                >
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{r.title}</h4>
                  <span style={{ fontSize: '0.88rem', color: '#5C6B7A' }}>{r.location}</span>
                  <span
                    style={{
                      fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.12em', color: brand.color.red,
                    }}
                  >
                    {r.type}
                  </span>
                  <ArrowRight size={18} strokeWidth={1.8} color="#A8B6C3" />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 48 }}>
              <Link href="/contact" className="btn btn-primary">
                Apply or register interest
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          .role-row h4 { transition: color .25s var(--ease); }
          .role-row:hover h4 { color: var(--red); }
          @media (max-width: 900px) {
            .split { grid-template-columns: 1fr !important; gap: 36px !important; }
            .role-row { grid-template-columns: 1fr 28px !important; gap: 10px !important; }
            .role-row span { display: none; }
          }
        `}</style>
      </section>
    </>
  );
}
