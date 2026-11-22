import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import Portrait from '@/components/Portrait';
import { orgDepartments, orgLeadership, headcount, approachPoints } from '@/lib/lkmd';
import { directors } from '@/lib/group';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Our Structure',
  description:
    'The departments, divisions and key personnel behind LKMD — a transparent organogram covering office administration, tender, quality control, logistics, project management, SHE and site management.',
};

export default function StructurePage() {
  return (
    <>
      <PageHero
        eyebrow="Our structure"
        title="A transparent organogram, not a mystery."
        lede="The departments and key personnel that collaborate to ensure seamless operations and successful project execution."
        image="/lkmd/turbines.jpg"
        video="/video/structure.mp4"
        poster="/posters/structure.jpg"
        position="center 50%"
      />

      {/* ── Headline numbers, derived from the chart itself ─ */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '88px 0' }}>
        <div className="container">
          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 36 }}>
            {[
              { v: String(headcount.total), l: 'People', s: 'Across the organisation' },
              { v: String(headcount.departments), l: 'Departments', s: 'Each with a named lead' },
              { v: String(headcount.interns), l: 'Interns', s: 'Training the next intake, not only hiring it' },
              { v: '2', l: 'Continents', s: 'United Kingdom and Africa' },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 90}>
                <div style={{ borderTop: `2px solid ${brand.color.red}`, paddingTop: 22 }}>
                  <div className="stat-value">{s.v}</div>
                  <div className="stat-label">{s.l}</div>
                  <div className="stat-sub">{s.s}</div>
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

      {/* ── Why we publish it ─────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal>
              <h2 className="display-sm">
                Teamwork and
                <br />
                efficient decisions.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 24 }}>
                Our transparent organogram reflects our commitment to effective
                communication, teamwork and efficient decision-making.
              </p>
              <p className="lede">
                Team members are assigned to projects based on the specific knowledge
                and expertise relevant to the task at hand, so functional expertise and
                extensive experience are leveraged for the best project outcome. If you
                want to know who will be making a decision on your job, it is on this
                page.
              </p>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
      </section>

      {/* ── Leadership line ───────────────────────────────── */}
      <section style={{ paddingBottom: 90 }}>
        <div className="container">
          <Reveal>
            <div
              className="lead-line"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 4 }}
            >
              {orgLeadership.map((l, i) => (
                <div
                  key={l}
                  style={{
                    background: i === 0 ? brand.color.navy800 : brand.color.navy700,
                    color: '#fff', padding: '26px 24px', textAlign: 'center',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.35 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Departments ─────────────────────────────── */}
          <div
            className="dept-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {orgDepartments.map((d, i) => {
              const total = d.roles.reduce((s, r) => s + r.n, 0);
              return (
                <Reveal key={d.name} delay={(i % 4) * 80}>
                  <div
                    style={{
                      background: brand.color.concrete, padding: '28px 24px 30px',
                      height: '100%', borderTop: '3px solid var(--line)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                        gap: 10, marginBottom: 18,
                      }}
                    >
                      <h3 style={{ fontSize: '0.98rem', lineHeight: 1.3 }}>{d.name}</h3>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading), system-ui, sans-serif',
                          fontSize: '1.15rem', fontWeight: 800, color: brand.color.red,
                        }}
                      >
                        {total}
                      </span>
                    </div>

                    {d.roles.map(r => (
                      <div
                        key={r.role}
                        style={{
                          display: 'flex', justifyContent: 'space-between', gap: 10,
                          fontSize: '0.84rem', color: '#5C6B7A',
                          padding: '7px 0', borderTop: '1px solid rgba(0,0,0,0.055)',
                        }}
                      >
                        <span>{r.role}</span>
                        <span style={{ color: '#2A3B4C', fontWeight: 600 }}>{r.n}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              );
            })}
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

      {/* ── Board ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: brand.color.concrete, padding: '104px 0' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/lkmd/team-lineup.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center 30%',
            opacity: 0.1,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Leadership</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 20 }}>
              The board.
            </h2>
            <p className="lede" style={{ maxWidth: 580, marginBottom: 48 }}>
              The people accountable for what the company commits to.
            </p>
          </Reveal>

          <div
            className="board-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {directors.map((d, i) => (
              <Reveal key={`${d.role}-${i}`} delay={(i % 4) * 90}>
                <article style={{ background: '#fff', height: '100%' }}>
                  <Portrait name={d.name} photo={d.photo} ratio="4 / 5" />
                  <div style={{ padding: '26px 24px 30px' }}>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: 4 }}>{d.name}</h3>
                    <p
                      style={{
                        fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.12em', color: brand.color.red, marginBottom: 14,
                      }}
                    >
                      {d.role}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#5C6B7A', lineHeight: 1.8 }}>{d.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .board-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px)  { .board-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── How we work ───────────────────────────────────── */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '104px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>How we work</p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 620, marginBottom: 52 }}>
              What the structure is for.
            </h2>
          </Reveal>

          <div
            className="work-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {approachPoints.map((a, i) => (
              <Reveal key={a.title} delay={i * 90}>
                <div className="card-dark" style={{ height: '100%', borderTop: `3px solid ${brand.color.red}` }}>
                  <h3 style={{ fontSize: '1.02rem', color: '#fff', marginBottom: 12 }}>{a.title}</h3>
                  <p style={{ fontSize: '0.86rem', color: '#8EA3B8', lineHeight: 1.8 }}>{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 52, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/careers" className="btn btn-primary">
                Join the team
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
              <Link href="/contact" className="btn btn-light">Get in touch</Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 1024px) { .work-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .work-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
