import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink, MapPin, Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { groupCompanies, groupChain, groupProjects } from '@/lib/group';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'The Group',
  description:
    'Three operating companies under one group: Wonga Holdings for mining, engineering and energy; Za-Eng Consulting for multidisciplinary design; Kontinental for construction delivery.',
};

export default function GroupPage() {
  return (
    <>
      <PageHero
        eyebrow="The group"
        title="Three companies. One chain, from evaluation to hand-over."
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
                    {c.company}
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

      {/* ── The companies ─────────────────────────────────── */}
      <section style={{ background: brand.color.concrete, padding: '112px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Operating companies</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 54 }}>
              Each one trades in its own right.
            </h2>
          </Reveal>

          {groupCompanies.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <article
                id={c.slug}
                className="co-row"
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 1.25fr',
                  background: '#fff', marginBottom: 4, scrollMarginTop: 110,
                }}
              >
                <div style={{ position: 'relative', minHeight: 340, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.name}
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
                    {c.role}
                  </p>

                  <h3 style={{ fontSize: 'clamp(1.4rem, 2.1vw, 1.9rem)', marginBottom: 10 }}>
                    {c.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.95rem', color: '#2A3B4C', fontWeight: 500,
                      lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic',
                    }}
                  >
                    {c.strapline}
                  </p>

                  <p style={{ fontSize: '0.93rem', color: '#5C6B7A', lineHeight: 1.85, marginBottom: 24 }}>
                    {c.summary}
                  </p>

                  <ul
                    className="cap-list"
                    style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', marginBottom: 24 }}
                  >
                    {c.capabilities.map(cap => (
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

                  {c.credentials && (
                    <div
                      style={{
                        display: 'flex', flexWrap: 'wrap', gap: 8,
                        paddingTop: 20, borderTop: '1px solid var(--line)', marginBottom: 20,
                      }}
                    >
                      {c.credentials.map(cr => (
                        <span
                          key={cr.label}
                          style={{
                            fontSize: '0.72rem', padding: '6px 12px',
                            background: brand.color.concrete,
                            border: '1px solid var(--line)',
                            color: '#44576A',
                          }}
                        >
                          <strong style={{ color: 'var(--ink)' }}>{cr.label}</strong>{' '}
                          {cr.value}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center',
                      paddingTop: c.credentials ? 0 : 20,
                      borderTop: c.credentials ? 'none' : '1px solid var(--line)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flex: 1, minWidth: 220 }}>
                      <MapPin size={14} strokeWidth={1.8} color="#8A99A8" style={{ marginTop: 3, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.8rem', color: '#8A99A8', lineHeight: 1.6 }}>
                        {c.offices.join(' · ')}
                      </span>
                    </div>
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.12em', color: brand.color.red, textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Visit site
                      <ExternalLink size={13} strokeWidth={2.2} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <style>{`
          @media (max-width: 960px) {
            .co-row { grid-template-columns: 1fr !important; }
            .co-row > div:first-child { min-height: 240px !important; }
            .co-row > div:last-child  { padding: 34px 28px 38px !important; }
            .cap-list { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Delivered work ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Delivered</p>
            <h2 className="display-sm" style={{ maxWidth: 600, marginBottom: 20 }}>
              Work already completed inside the group.
            </h2>
            <p className="lede" style={{ maxWidth: 600, marginBottom: 48 }}>
              A sample of references from Kontinental. Ask and we will arrange a
              reference conversation on any of them directly.
            </p>
          </Reveal>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {groupProjects.map((p, i) => (
              <Reveal key={p.name} delay={i * 70}>
                <div
                  className="gp-row"
                  style={{
                    display: 'grid', gridTemplateColumns: '1.3fr 1fr 0.9fr',
                    gap: 28, alignItems: 'center',
                    padding: '28px 0', borderBottom: '1px solid var(--line)',
                  }}
                >
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 700 }}>{p.name}</h3>
                  <p style={{ fontSize: '0.89rem', color: '#5C6B7A', lineHeight: 1.7 }}>{p.scope}</p>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.12em', color: '#fff',
                        background: brand.color.navy700, padding: '5px 10px',
                      }}
                    >
                      {p.company}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#8A99A8' }}>{p.discipline}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 44, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary">
                Request references
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
              <Link href="/services" className="btn btn-outline">
                What we do
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .gp-row { grid-template-columns: 1fr !important; gap: 10px !important; }
          }
        `}</style>
      </section>
    </>
  );
}
