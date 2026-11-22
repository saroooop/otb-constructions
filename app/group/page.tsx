import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import Portrait from '@/components/Portrait';
import { divisions, groupChain, directors, staff } from '@/lib/group';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'The Group',
  description:
    'Three divisions under one group — mining, engineering and energy; design and engineering; construction delivery — covering a project from evaluation through to hand-over.',
};

export default function GroupPage() {
  const byDivision = divisions.map(d => ({
    division: d.title,
    people: staff.filter(s => s.division === d.title),
  }));

  return (
    <>
      <PageHero
        eyebrow="The group"
        title="Three divisions. One chain, from evaluation to hand-over."
        lede="Most clients have to assemble this themselves — a technical consultant, a design team, a contractor, an energy supplier. Here they already work together."
        image="/sectors/hero-3-plant.jpg"
        video="/video/cinematic.mp4"
        poster="/cinematic-poster.jpg"
        position="center 50%"
      />

      {/* ── Why the group exists ──────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start', marginBottom: 72 }}
          >
            <Reveal>
              <h2 className="display-sm">
                The interfaces are
                <br />
                where projects fail.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 24 }}>
                A programme rarely fails inside a discipline. It fails between them.
              </p>
              <p className="lede">
                The design is late to the contractor. The quantity surveyor prices
                something the engineer has already changed. The power scope is let six
                months after the plant it feeds. Every one of those is an interface,
                and every interface is a commercial argument waiting to happen.
              </p>
            </Reveal>
          </div>

          <div
            className="chain-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {groupChain.map((c, i) => (
              <Reveal key={c.n} delay={i * 90}>
                <div
                  style={{
                    background: brand.color.concrete, padding: '34px 30px', height: '100%',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '1.5rem', fontWeight: 800,
                      color: 'transparent', WebkitTextStroke: `1.3px ${brand.color.red}`,
                      marginBottom: 16,
                    }}
                  >
                    {c.n}
                  </p>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: 6 }}>{c.stage}</h3>
                  <p
                    style={{
                      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.12em', color: brand.color.navy700, marginBottom: 12,
                    }}
                  >
                    {c.division}
                  </p>
                  <p style={{ fontSize: '0.87rem', color: '#5C6B7A', lineHeight: 1.8 }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .chain-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .chain-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 900px)  { .split { grid-template-columns: 1fr !important; gap: 36px !important; } }
        `}</style>
      </section>

      {/* ── The divisions ─────────────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '112px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Divisions</p>
            <h2 className="display-sm" style={{ maxWidth: 600, marginBottom: 54 }}>
              What each part of the group is accountable for.
            </h2>
          </Reveal>

          {divisions.map((d, i) => (
            <Reveal key={d.slug} delay={i * 70}>
              <article
                id={d.slug}
                className="co-row"
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1.25fr',
                  background: '#fff', marginBottom: 4, scrollMarginTop: 110,
                }}
              >
                <div style={{ position: 'relative', minHeight: 320, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.image}
                    alt={d.title}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%', objectFit: 'cover',
                      filter: 'saturate(0.82) contrast(1.05)',
                    }}
                  />
                  <span
                    aria-hidden
                    style={{ position: 'absolute', left: 0, top: 0, width: 5, height: 72, background: brand.color.red }}
                  />
                </div>

                <div style={{ padding: '46px 46px 50px' }}>
                  <p
                    style={{
                      fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.14em', color: brand.color.red, marginBottom: 14,
                    }}
                  >
                    {d.role}
                  </p>

                  <h3 style={{ fontSize: 'clamp(1.4rem, 2.1vw, 1.9rem)', marginBottom: 10 }}>
                    {d.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.95rem', color: '#2A3B4C', fontWeight: 500,
                      lineHeight: 1.7, marginBottom: 18,
                    }}
                  >
                    {d.strapline}
                  </p>

                  <p style={{ fontSize: '0.93rem', color: '#5C6B7A', lineHeight: 1.85, marginBottom: 24 }}>
                    {d.summary}
                  </p>

                  <ul
                    className="cap-list"
                    style={{
                      listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr',
                      gap: '8px 20px', paddingTop: 22, borderTop: '1px solid var(--line)',
                    }}
                  >
                    {d.capabilities.map(cap => (
                      <li
                        key={cap}
                        style={{
                          display: 'flex', gap: 9, alignItems: 'flex-start',
                          fontSize: '0.85rem', color: '#44576A', lineHeight: 1.55,
                        }}
                      >
                        <Check size={14} strokeWidth={2.6} color={brand.color.red} style={{ marginTop: 4, flexShrink: 0 }} />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <style>{`
          @media (max-width: 960px) {
            .co-row { grid-template-columns: 1fr !important; }
            .co-row > div:first-child { min-height: 230px !important; }
            .co-row > div:last-child  { padding: 34px 28px 38px !important; }
            .cap-list { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Board ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Leadership</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 20 }}>
              The board.
            </h2>
            <p className="lede" style={{ maxWidth: 580, marginBottom: 48 }}>
              The people accountable for what the group commits to.
            </p>
          </Reveal>

          <div
            className="board-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {directors.map((d, i) => (
              <Reveal key={`${d.role}-${i}`} delay={(i % 4) * 90}>
                <article style={{ background: brand.color.concrete, height: '100%' }}>
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

      {/* ── Staff ─────────────────────────────────────────── */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '104px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>Our people</p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 620, marginBottom: 20 }}>
              Who you will actually be working with.
            </h2>
            <p className="lede-dark" style={{ maxWidth: 580, marginBottom: 52 }}>
              The named people on a project, by division — not an org chart you
              never meet.
            </p>
          </Reveal>

          {byDivision.map((group, gi) => (
            <Reveal key={group.division} delay={gi * 80}>
              <div style={{ marginBottom: 44 }}>
                <p
                  style={{
                    fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.14em', color: brand.color.redSoft,
                    paddingBottom: 14, marginBottom: 22,
                    borderBottom: '1px solid rgba(255,255,255,0.14)',
                  }}
                >
                  {group.division}
                </p>

                <div
                  className="staff-grid"
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}
                >
                  {group.people.map((s, i) => (
                    <div key={`${s.role}-${i}`} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div style={{ width: 56, flexShrink: 0 }}>
                        <Portrait name={s.name} photo={s.photo} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>{s.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#8EA3B8', marginTop: 3, lineHeight: 1.5 }}>
                          {s.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div style={{ marginTop: 20, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/careers" className="btn btn-primary">
                Join the team
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
              <Link href="/contact" className="btn btn-light">
                Request references
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 1024px) { .staff-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px)  { .staff-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
