import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/brand';
import { headcount } from '@/lib/lkmd';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Quantity surveyors, engineers, architects, project and construction managers, SHE officers, site managers and foremen — plus an intern intake, across the UK and Africa.',
};

// Role titles taken from the company organogram, so the careers page and the
// structure page describe the same organisation.
// TODO: confirm which are actually open, and add locations.
const roles = [
  { title: 'Quantity Surveyor',            location: 'United Kingdom', type: 'Full time' },
  { title: 'Civil / Structural Engineer',  location: 'UK / Africa',    type: 'Full time' },
  { title: 'Architect',                    location: 'United Kingdom', type: 'Full time' },
  { title: 'Project Manager',              location: 'UK / Africa',    type: 'Full time' },
  { title: 'Construction Manager',         location: 'Site based',     type: 'Full time' },
  { title: 'Site Manager / Site Supervisor', location: 'Site based',   type: 'Full time' },
  { title: 'SHE Officer',                  location: 'Site based',     type: 'Full time' },
  { title: 'Intern Programme',             location: 'UK / Africa',    type: 'Internship' },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="We train the next intake rather than only hiring it."
        lede="Of the people in this company, a quarter are interns. That is not a gesture — it is how the trades and professions get replaced."
        image="/lkmd/engineer-orange.jpg"
        video="/video/careers.mp4"
        poster="/posters/careers.jpg"
        position="center 30%"
      />

      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/lkmd/community.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center 40%',
            opacity: 0.06,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
              <p className="lede" style={{ marginBottom: 20 }}>
                Construction is demanding work, often in difficult conditions. We do not
                pretend otherwise. What we commit to is competent supervision,
                maintained plant, PPE that fits, and health and safety standards that
                exceed what UK legislation requires.
              </p>
              <p className="lede">
                We employ {headcount.total} people across {headcount.departments} 
                departments, {headcount.interns} of them interns. Team members are
                assigned to projects on the specific expertise the task needs, so you
                work on what you are good at and learn the rest alongside someone who
                already is.
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
