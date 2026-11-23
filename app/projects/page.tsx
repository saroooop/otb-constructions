import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { projects } from '@/lib/site';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Our Projects | LKMD Construction',
  description:
    'Schools, housing, public buildings, refurbishment and industrial projects delivered by LKMD Construction in Gauteng and Mpumalanga.',
};

export default function ProjectsPage() {
  // Grouped so a visitor can see at a glance what kind of work we do.
  const sectors = Array.from(new Set(projects.map(p => p.sector)));

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Our projects"
        lede="Schools, housing, a police station, inner-city hostels and an industrial warehouse: our projects show what we build and how we deliver."
        image="/lkmd/concrete.jpg"
        video="/video/projects.mp4"
        poster="/posters/projects.jpg"
        position="center 45%"
      />

      {/* ── Sector summary ────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {sectors.map(s => (
                <span
                  key={s}
                  style={{
                    fontSize: '0.78rem', padding: '8px 14px',
                    background: brand.color.concrete,
                    border: '1px solid var(--line)', color: '#44576A',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The seven projects ────────────────────────────── */}
      <section style={{ paddingBottom: 110 }}>
        <div className="container">
          <div
            className="proj-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <Link
                  href={`/projects/${p.slug}`}
                  style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                >
                  <article style={{ background: brand.color.concrete, height: '100%' }}>
                    <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={`${p.title} – ${p.town}`}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span
                        aria-hidden
                        style={{ position: 'absolute', left: 0, top: 0, width: 5, height: 64, background: brand.color.red }}
                      />
                    </div>

                    <div style={{ padding: '28px 26px 32px' }}>
                      <p
                        style={{
                          fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '0.13em', color: brand.color.red, marginBottom: 12,
                        }}
                      >
                        {p.sector}
                      </p>
                      <h2 style={{ fontSize: '1.12rem', marginBottom: 10, lineHeight: 1.3 }}>
                        {p.title} – {p.town}
                      </h2>
                      <p style={{ fontSize: '0.84rem', color: '#8A99A8' }}>
                        {p.province} · {p.service}
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .proj-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .proj-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <CtaBand />
    </>
  );
}
