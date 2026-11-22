import Link from 'next/link';
import { ArrowRight, ArrowDown, HardHat, ShieldCheck, Users, FileText } from 'lucide-react';
import HeroMedia from '@/components/HeroMedia';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/brand';
import {
  services, sectors, projects, insights, approach,
  marketStats, marketSource,
} from '@/lib/content';

// The stills that carry the hero if the film cannot play. They are the same
// three frames the film was built from, so the fallback is the film's own
// opening composition rather than an unrelated photograph.
const heroImages = [
  { src: '/hero-headgear.jpg',   alt: 'Shaft headgear on an operating mine site' },
  { src: '/team-site-visit.jpg', alt: 'Site team in full PPE at the shaft collar' },
  { src: '/site-access-ppe.jpg', alt: 'Crew at site access control before shift' },
];

export default function HomePage() {
  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        <HeroMedia
          images={heroImages}
          // Cut from the site photography — see scripts/make-hero-video.sh.
          // If it fails to load the stills below carry the hero on their own.
          video="/video/hero.mp4"
          poster="/hero-poster.jpg"
        />

        <div
          className="container"
          style={{ position: 'relative', zIndex: 2, paddingTop: 200, paddingBottom: 0 }}
        >
          <div className="fade-in" style={{ maxWidth: 940 }}>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 30 }}>
              {brand.strapline}
            </p>

            <h1 className="display" style={{ color: '#fff', marginBottom: 32 }}>
              We build the
              <br />
              infrastructure that
              <br />
              <span style={{ color: '#fff', borderBottom: `6px solid ${brand.color.red}`, paddingBottom: 4 }}>
                moves a continent
              </span>
            </h1>

            <p
              className="lede-dark"
              style={{ maxWidth: 580, marginBottom: 42, color: '#C2D2E1', fontSize: '1.125rem' }}
            >
              Civil engineering, mining infrastructure and earthworks delivered to
              international standard — from the shaft collar and the haul road to the
              processing plant and the water that feeds it.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/services" className="btn btn-primary">
                What we do
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
              <Link href="/projects" className="btn btn-light">
                View projects
              </Link>
            </div>
          </div>
        </div>

        {/* Hero foot: capability strip over the image, WBHO-style */}
        <div
          style={{
            position: 'relative', zIndex: 2, marginTop: 88,
            borderTop: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(6,24,43,0.44)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div
            className="container hero-strip"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 0,
            }}
          >
            {[
              { Icon: HardHat,     label: 'Civils & earthworks',   sub: 'Self-performed' },
              { Icon: ShieldCheck, label: 'Zero-harm safety',      sub: 'Every site, every shift' },
              { Icon: Users,       label: 'Local content',         sub: 'Crews trained, not hired in' },
              { Icon: FileText,    label: 'Programme certainty',   sub: 'Measured against a fixed baseline' },
            ].map((c, i) => (
              <div
                key={c.label}
                style={{
                  padding: '26px 28px',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.14)',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}
              >
                <c.Icon size={22} strokeWidth={1.6} color={brand.color.redSoft} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#9DB2C6', marginTop: 3 }}>{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          style={{
            position: 'absolute', right: 40, bottom: 150, zIndex: 2,
            display: 'flex', alignItems: 'center', gap: 10,
            writingMode: 'vertical-rl',
            fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}
          className="scroll-cue"
        >
          Scroll
          <ArrowDown size={14} strokeWidth={2} />
        </div>

        <style>{`
          @media (max-width: 980px) {
            .hero-strip { grid-template-columns: 1fr 1fr !important; }
            .hero-strip > div:nth-child(3) { border-left: none !important; }
            .hero-strip > div:nth-child(n+3) { border-top: 1px solid rgba(255,255,255,0.14); }
            .scroll-cue { display: none !important; }
          }
          @media (max-width: 560px) {
            .hero-strip { grid-template-columns: 1fr !important; }
            .hero-strip > div { border-left: none !important; }
            .hero-strip > div + div { border-top: 1px solid rgba(255,255,255,0.14); }
          }
        `}</style>
      </section>

      {/* ══ POSITION STATEMENT ═════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 26 }}>Who we are</p>
              <h2 className="display-sm" style={{ marginBottom: 0 }}>
                A contractor built for
                <br />
                the work that does not
                <br />
                forgive a shortcut.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 28 }}>
                Our job is to make any construction project work for you, whatever the
                size — from first survey peg to final hand-over.
              </p>
              <p className="lede" style={{ marginBottom: 20 }}>
                {brand.full} delivers civil engineering, mining infrastructure and
                earthworks across Southern Africa and the United Kingdom. We
                self-perform the disciplines that decide a programme, which means the
                people who priced the work are the people who build it.
              </p>
              <p className="lede" style={{ marginBottom: 34 }}>
                The sites we work on are live industrial environments. The standard we
                hold is the one those sites already demand: planned, permitted,
                measured, and safe enough that everybody goes home.
              </p>
              <Link href="/about" className="btn btn-outline">
                About us
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO — tile grid ═════════════════════════ */}
      <section style={{ background: brand.color.concrete, padding: '120px 0' }}>
        <div className="container">
          <Reveal>
            <div
              style={{
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                gap: 40, flexWrap: 'wrap', marginBottom: 54,
              }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: 22 }}>What we do</p>
                <h2 className="display-sm" style={{ maxWidth: 560 }}>
                  Six disciplines. One accountable contractor.
                </h2>
              </div>
              <Link href="/services" className="btn btn-outline">
                All capabilities
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>

          <div
            className="tile-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 110}>
                <Link href="/services" className="tile" style={{ height: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.title} />
                  <span className="tile-body">
                    <span className="tile-rule" style={{ display: 'block' }} />
                    <span className="tile-title" style={{ display: 'block' }}>{s.title}</span>
                    <span className="tile-sub" style={{ display: 'block' }}>{s.short}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .tile-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 620px)  { .tile-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ MARKET NUMBERS — sourced ═══════════════════════ */}
      <section style={{ background: brand.color.navy900, padding: '112px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>
              The market we build for
            </p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 720, marginBottom: 20 }}>
              Namibian mining is not a story about potential. It is a construction
              programme with a date on it.
            </h2>
            <p className="lede-dark" style={{ maxWidth: 620, marginBottom: 64 }}>
              The published numbers describe a pipeline that has to be built — shafts,
              plants, roads, pipelines and power — inside four years.
            </p>
          </Reveal>

          <div
            className="stat-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}
          >
            {marketStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 110}>
                <div
                  style={{
                    padding: '8px 36px 8px 0',
                    borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                    paddingLeft: i === 0 ? 0 : 36,
                    height: '100%',
                  }}
                >
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div
              style={{
                marginTop: 56, paddingTop: 26,
                borderTop: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', gap: 24, flexWrap: 'wrap',
                alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              <p style={{ fontSize: '0.78rem', color: '#60788E', maxWidth: 720, lineHeight: 1.7 }}>
                {marketSource}
              </p>
              <a
                href="/namppf-mining-adjacent-sectors.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.12em', color: brand.color.redSoft,
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                  whiteSpace: 'nowrap',
                }}
              >
                Read the source deck
                <ArrowRight size={13} strokeWidth={2.4} />
              </a>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .stat-grid { grid-template-columns: 1fr 1fr !important; row-gap: 44px !important; }
            .stat-grid > div:nth-child(3) > div { border-left: none !important; padding-left: 0 !important; }
          }
          @media (max-width: 560px) {
            .stat-grid { grid-template-columns: 1fr !important; }
            .stat-grid > div > div { border-left: none !important; padding-left: 0 !important; }
          }
        `}</style>
      </section>

      {/* ══ SECTORS — editorial list ═══════════════════════ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Sectors</p>
            <h2 className="display-sm" style={{ maxWidth: 640, marginBottom: 54 }}>
              Where our work lands.
            </h2>
          </Reveal>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {sectors.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <Link
                  href="/sectors"
                  className="sector-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '64px minmax(220px, 1fr) 2fr 40px',
                    gap: 28, alignItems: 'center',
                    padding: '30px 0',
                    borderBottom: '1px solid var(--line)',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '0.82rem', fontWeight: 700,
                      color: brand.color.red, letterSpacing: '0.08em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{s.title}</h3>
                  <p style={{ fontSize: '0.92rem', color: '#5C6B7A', lineHeight: 1.75 }}>
                    {s.short}
                  </p>
                  <ArrowRight size={20} strokeWidth={1.8} color="#A8B6C3" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          .sector-row:hover h3 { color: var(--red); }
          .sector-row h3 { transition: color .25s var(--ease); }
          @media (max-width: 860px) {
            .sector-row { grid-template-columns: 44px 1fr 28px !important; gap: 18px !important; }
            .sector-row p { display: none; }
          }
        `}</style>
      </section>

      {/* ══ FEATURED PROJECTS ══════════════════════════════ */}
      <section style={{ background: brand.color.concrete, padding: '120px 0' }}>
        <div className="container">
          <Reveal>
            <div
              style={{
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                gap: 40, flexWrap: 'wrap', marginBottom: 54,
              }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: 22 }}>Projects</p>
                <h2 className="display-sm" style={{ maxWidth: 520 }}>
                  Delivered on live industrial sites.
                </h2>
              </div>
              <Link href="/projects" className="btn btn-outline">
                All projects
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>

          <div
            className="proj-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}
          >
            {projects.slice(0, 2).map((p, i) => (
              <Reveal key={p.name} delay={i * 130}>
                <Link href="/projects" className="tile" style={{ aspectRatio: '16 / 11' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} />
                  <span className="tile-body">
                    <span
                      style={{
                        display: 'inline-block', marginBottom: 14,
                        fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.14em', color: '#fff',
                        background: brand.color.red, padding: '5px 11px',
                      }}
                    >
                      {p.discipline}
                    </span>
                    <span className="tile-title" style={{ display: 'block', fontSize: '1.5rem' }}>
                      {p.name}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.82rem', color: '#A9BDD0', marginTop: 10 }}>
                      {p.location}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) { .proj-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ APPROACH ═══════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 80, alignItems: 'start' }}
          >
            <Reveal>
              <div style={{ position: 'sticky', top: 120 }}>
                <p className="eyebrow" style={{ marginBottom: 22 }}>How we work</p>
                <h2 className="display-sm" style={{ marginBottom: 24 }}>
                  Four stages.
                  <br />
                  No surprises in any of them.
                </h2>
                <p className="lede" style={{ marginBottom: 34, maxWidth: 420 }}>
                  Most cost overruns are decided long before anyone breaks ground. We
                  work to remove them while they are still cheap to remove.
                </p>
                <Link href="/contact" className="btn btn-primary">
                  Talk to us early
                  <ArrowRight size={14} strokeWidth={2.4} />
                </Link>
              </div>
            </Reveal>

            <div>
              {approach.map((a, i) => (
                <Reveal key={a.n} delay={i * 90}>
                  <div
                    style={{
                      display: 'grid', gridTemplateColumns: '78px 1fr', gap: 24,
                      padding: '34px 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading), system-ui, sans-serif',
                        fontSize: '2.1rem', fontWeight: 800, lineHeight: 1,
                        color: 'transparent',
                        WebkitTextStroke: `1.4px ${brand.color.red}`,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {a.n}
                    </span>
                    <div>
                      <h3 style={{ fontSize: '1.18rem', fontWeight: 700, marginBottom: 12 }}>
                        {a.title}
                      </h3>
                      <p style={{ fontSize: '0.94rem', color: '#5C6B7A', lineHeight: 1.85 }}>
                        {a.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SAFETY BAND ════════════════════════════════════ */}
      <section
        style={{
          position: 'relative', overflow: 'hidden',
          background: brand.color.navy800, color: '#fff', padding: '110px 0',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/site-access-ppe.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center 28%',
            opacity: 0.16, filter: 'grayscale(1)',
          }}
        />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 26, justifyContent: 'center' }}>
              Safety
            </p>
            <h2 className="display-sm" style={{ color: '#fff', marginBottom: 26 }}>
              No programme, no margin and no client is worth an injury.
            </h2>
            <p className="lede-dark" style={{ maxWidth: 620, margin: '0 auto 38px' }}>
              Induction before access. Permit before work. Stop-work authority for every
              person on site, with no consequence for using it. We report our incidents
              honestly because a number you can trust is the only one worth managing.
            </p>
            <Link href="/sustainability" className="btn btn-light">
              Safety &amp; sustainability
              <ArrowRight size={14} strokeWidth={2.4} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ INSIGHTS ═══════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div
              style={{
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                gap: 40, flexWrap: 'wrap', marginBottom: 48,
              }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: 22 }}>Insights</p>
                <h2 className="display-sm">What we are reading the market as.</h2>
              </div>
              <Link href="/insights" className="btn btn-outline">
                All insights
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>

          <div
            className="insight-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {insights.map((p, i) => (
              <Reveal key={p.slug} delay={i * 110}>
                <Link href="/insights" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <article className="card" style={{ height: '100%' }}>
                    <div
                      style={{
                        display: 'flex', gap: 14, alignItems: 'center',
                        fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase',
                        letterSpacing: '0.12em', color: '#8A99A8', marginBottom: 20,
                      }}
                    >
                      <time dateTime={p.date}>
                        {new Date(p.date).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </time>
                      <span style={{ width: 4, height: 4, background: brand.color.red }} />
                      <span>{p.read}</span>
                    </div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 700, marginBottom: 14, lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#5C6B7A', lineHeight: 1.8 }}>
                      {p.standfirst}
                    </p>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .insight-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 680px)  { .insight-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 900px)  { .split { grid-template-columns: 1fr !important; gap: 48px !important; } }
        `}</style>
      </section>
    </>
  );
}
