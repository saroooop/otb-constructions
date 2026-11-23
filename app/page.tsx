import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowDown, HardHat, ShieldCheck, Users, Building2 } from 'lucide-react';
import HeroMedia from '@/components/HeroMedia';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { home, services, clients } from '@/lib/site';
import { getProjects } from '@/lib/db';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
};

/** Stills that stand in if the film cannot play — the film's own plates. */
const heroImages = [
  { src: '/lkmd/concrete.jpg',     alt: 'Concrete structure on an LKMD site' },
  { src: '/lkmd/site-team.jpg',    alt: 'LKMD site team reviewing works in progress' },
  { src: '/lkmd/crane-sunset.jpg', alt: 'Tower crane over an LKMD site at sunset' },
];

export const revalidate = 60;

export default async function HomePage() {
  const all = await getProjects();
  const featured = all.filter(p => p.onHome);
  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative', minHeight: '100svh',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          color: '#fff', overflow: 'hidden',
        }}
      >
        <HeroMedia images={heroImages} video="/video/lkmd.mp4" poster="/lkmd-poster.jpg" />

        <div
          className="container"
          style={{ position: 'relative', zIndex: 2, paddingTop: 200 }}
        >
          <div className="fade-in" style={{ maxWidth: 960 }}>
            <h1 className="display" style={{ color: '#fff', marginBottom: 18 }}>
              Quality building and
              <br />
              civil engineering,
              <br />
              <span style={{ borderBottom: `6px solid ${brand.color.red}`, paddingBottom: 4 }}>
                delivered on time and within budget
              </span>
            </h1>

            {/* The brief places the tagline under the headline. */}
            <p
              style={{
                fontSize: '0.92rem', fontWeight: 600, letterSpacing: '0.06em',
                color: brand.color.redSoft, marginBottom: 26,
              }}
            >
              {brand.tagline}
            </p>

            <p
              className="lede-dark"
              style={{ maxWidth: 620, marginBottom: 40, color: '#C2D2E1', fontSize: '1.1rem' }}
            >
              {home.heroBody}
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/projects" className="btn btn-primary">
                See our projects
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
              <Link href="/contact" className="btn btn-light">Start a project</Link>
            </div>
          </div>
        </div>

        {/* Trust bar. Only facts we actually hold — CIDB and B-BBEE join
            this strip the moment lib/brand.ts carries them. */}
        <div
          style={{
            position: 'relative', zIndex: 2, marginTop: 84,
            borderTop: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(11,23,48,0.46)', backdropFilter: 'blur(6px)',
          }}
        >
          <div
            className="container hero-strip"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            {[
              { Icon: HardHat,     label: 'One-stop shop',     sub: 'Planning, design and construction' },
              { Icon: Building2,   label: 'Five offices',      sub: 'Four in South Africa, one in the UK' },
              { Icon: Users,       label: 'Seven departments', sub: 'Every one of them trains interns' },
              { Icon: ShieldCheck, label: 'Safety first',      sub: 'Beyond what the law requires' },
            ].map((c, i) => (
              <div
                key={c.label}
                style={{
                  padding: '24px 26px',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.14)',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}
              >
                <c.Icon size={22} strokeWidth={1.6} color={brand.color.redSoft} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: '0.73rem', color: '#9DB2C6', marginTop: 3 }}>{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="scroll-cue"
          style={{
            position: 'absolute', right: 40, bottom: 150, zIndex: 2,
            display: 'flex', alignItems: 'center', gap: 10,
            writingMode: 'vertical-rl',
            fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          Scroll
          <ArrowDown size={14} strokeWidth={2} />
        </div>

        <style>{`
          @media (max-width: 1080px) {
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

      {/* ══ INTRODUCTION ═══════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 80, alignItems: 'start' }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 26 }}>Who we are</p>
              <h2 className="display-sm">{home.introHeading}</h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 28 }}>{home.introBody}</p>
              <Link href="/about-us" className="btn btn-outline">
                Who we are
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* ══ WHAT WE DO ═════════════════════════════════════ */}
      <section style={{ background: brand.color.concrete, padding: '110px 0' }}>
        <div className="container">
          <Reveal>
            <div
              style={{
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                gap: 40, flexWrap: 'wrap', marginBottom: 48,
              }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: 22 }}>What we do</p>
                <h2 className="display-sm" style={{ maxWidth: 520 }}>
                  Six services, one accountable team.
                </h2>
              </div>
              <Link href="/services" className="btn btn-outline">
                All services
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
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
        </div>

        <style>{`
          @media (max-width: 1024px) { .tile-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 620px)  { .tile-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ FEATURED PROJECTS ══════════════════════════════ */}
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
                <p className="eyebrow" style={{ marginBottom: 22 }}>Featured projects</p>
                <h2 className="display-sm" style={{ maxWidth: 520 }}>
                  Schools, housing, public buildings.
                </h2>
              </div>
              <Link href="/projects" className="btn btn-outline">
                See all projects
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>

          <div
            className="feat-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <Link href={`/projects/${p.slug}`} className="tile" style={{ height: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`${p.title} – ${p.town}`} loading="lazy" decoding="async" />
                  <span className="tile-body">
                    <span className="tile-rule" style={{ display: 'block' }} />
                    <span className="tile-title" style={{ display: 'block' }}>
                      {p.title} – {p.town}
                    </span>
                    <span className="tile-sub" style={{ display: 'block' }}>
                      {p.province} · {p.sector}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .feat-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .feat-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ WHY CHOOSE LKMD ════════════════════════════════ */}
      <section
        style={{
          position: 'relative', overflow: 'hidden',
          background: brand.color.navy900, color: '#fff', padding: '110px 0',
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
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>{home.whyHeading}</p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 620, marginBottom: 50 }}>
              Four reasons clients come back.
            </h2>
          </Reveal>

          <div
            className="why-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {home.why.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <div
                  className="card-dark"
                  style={{ height: '100%', padding: '30px 28px', borderTop: `3px solid ${brand.color.red}` }}
                >
                  <h3 style={{ fontSize: '1.02rem', color: '#fff', marginBottom: 12 }}>{w.title}</h3>
                  <p style={{ fontSize: '0.87rem', color: '#8EA3B8', lineHeight: 1.8 }}>{w.body}</p>
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

      {/* ══ OUR CLIENTS ════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Our clients</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 44 }}>
              Who we build for.
            </h2>
          </Reveal>

          {/* Names publish now; logo files follow and drop into this grid. */}
          <div
            className="client-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {clients.map((c, i) => (
              <Reveal key={c} delay={(i % 4) * 70}>
                <div
                  style={{
                    background: brand.color.concrete, padding: '28px 24px',
                    height: '100%', display: 'flex', alignItems: 'center',
                    borderTop: `3px solid ${brand.color.line}`,
                  }}
                >
                  <span style={{ fontSize: '0.9rem', color: '#2A3B4C', fontWeight: 500, lineHeight: 1.5 }}>
                    {c}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .client-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px)  { .client-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ LKMD CARES LINE ════════════════════════════════ */}
      <section style={{ background: brand.color.concrete, padding: '84px 0' }}>
        <div className="container">
          <Reveal>
            <div
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 36, flexWrap: 'wrap',
                background: '#fff', padding: '40px 44px',
                borderLeft: `4px solid ${brand.color.red}`,
              }}
            >
              <div style={{ maxWidth: 680 }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: 10 }}>{home.caresLine.heading}</h2>
                <p style={{ fontSize: '0.95rem', color: '#5C6B7A', lineHeight: 1.8 }}>
                  {home.caresLine.body}
                </p>
              </div>
              <Link href="/about-us/lkmd-cares" className="btn btn-outline">
                LKMD Cares
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
