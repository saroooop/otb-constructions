import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { services } from '@/lib/site';
import { getProjects } from '@/lib/db';
import { brand } from '@/lib/brand';

/** One page per service, generated from lib/site.ts so the six stay in step. */
export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find(x => x.slug === slug);
  if (!s) return {};
  return { title: s.pageTitle, description: s.description };
}

export default async function ServicePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) notFound();

  const all = await getProjects();
  // Prefer what the database says this service is tagged with; fall back to
  // the launch list so a fresh install still shows related work.
  const tagged = all.filter(p => p.serviceSlug === service.slug);
  const related = tagged.length ? tagged : all.filter(p => service.relatedProjects.includes(p.slug));

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.heading}
        lede={service.intro}
        image={service.image}
        video={service.video ?? '/video/services.mp4'}
        poster={service.poster ?? '/posters/services.jpg'}
        position="center 42%"
      />

      {/* ── The content sections ──────────────────────────────
          Set as editorial rows rather than a card grid. A grid of five
          items in three columns leaves an orphan on the second row, which
          is what made these pages look unfinished; a list never does. The
          heading sticks alongside the rows on a wide screen, so you always
          know which part of the service you are reading.
      */}
      {service.sections.map((sec, si) => {
        const tinted = si % 2 === 1;
        return (
          <section
            key={sec.heading}
            style={{
              background: tinted ? brand.color.concrete : '#fff',
              padding: '104px 0',
              borderTop: tinted ? 'none' : '1px solid var(--line)',
            }}
          >
            <div className="container">
              <div
                className="svc-split"
                style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.6fr', gap: 72, alignItems: 'start' }}
              >
                <Reveal>
                  <div className="svc-stick" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 48px)' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-heading), system-ui, sans-serif',
                        fontSize: '2.6rem', fontWeight: 800, lineHeight: 1,
                        color: 'transparent', WebkitTextStroke: `1.4px ${brand.color.red}`,
                        marginBottom: 20,
                      }}
                    >
                      {String(si + 1).padStart(2, '0')}
                    </p>
                    <h2 className="display-sm" style={{ marginBottom: 18 }}>{sec.heading}</h2>
                    <span
                      aria-hidden
                      style={{ display: 'block', width: 56, height: 3, background: brand.color.red }}
                    />
                  </div>
                </Reveal>

                <div>
                  {sec.items.map((item, i) => (
                    <Reveal key={item.title} delay={Math.min(i, 4) * 70}>
                      <div
                        style={{
                          display: 'grid', gridTemplateColumns: '58px 1fr', gap: 10,
                          padding: '26px 0',
                          borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.085)',
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            fontFamily: 'var(--font-heading), system-ui, sans-serif',
                            fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em',
                            color: brand.color.red, paddingTop: 5,
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 style={{ fontSize: '1.22rem', marginBottom: 10, lineHeight: 1.3 }}>
                            {item.title}
                          </h3>
                          {item.body && (
                            <p style={{ fontSize: '0.98rem', color: '#4A5B6C', lineHeight: 1.85, maxWidth: 620 }}>
                              {item.body}
                            </p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}

                  {si === service.sections.length - 1 && service.note && (
                    <Reveal>
                      <p className="rule-left" style={{ marginTop: 40, maxWidth: 620 }}>
                        {service.note}
                      </p>
                    </Reveal>
                  )}
                </div>
              </div>
            </div>

            <style>{`
              @media (max-width: 1000px) {
                .svc-split { grid-template-columns: 1fr !important; gap: 40px !important; }
                .svc-stick { position: static !important; }
              }
            `}</style>
          </section>
        );
      })}

      {/* ── This discipline on site, when there are photographs ── */}
      {service.gallery && service.gallery.length > 0 && (
        <section style={{ background: '#fff', padding: '0 0 104px' }}>
          <div className="container">
            <div
              className="gal-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(service.gallery.length, 3)}, 1fr)`,
                gap: 4,
              }}
            >
              {service.gallery.map((g, i) => (
                <Reveal key={g.src} delay={(i % 3) * 90}>
                  <figure style={{ margin: 0, position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      aria-hidden
                      style={{ position: 'absolute', left: 0, top: 0, width: 5, height: 56, background: brand.color.red }}
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 860px) { .gal-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 560px) { .gal-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* ── Related projects, when there are any ──────────── */}
      {related.length > 0 && (
        <section style={{ background: brand.color.concrete, padding: '104px 0' }}>
          <div className="container">
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>Related projects</p>
              <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 46 }}>
                Work we have delivered.
              </h2>
            </Reveal>

            <div
              className="rel-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
            >
              {related.map((p, i) => (
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

            <Reveal>
              <div style={{ marginTop: 40 }}>
                <Link href="/projects" className="btn btn-outline">
                  See all projects
                  <ArrowRight size={14} strokeWidth={2.4} />
                </Link>
              </div>
            </Reveal>
          </div>

          <style>{`
            @media (max-width: 1024px) { .rel-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 620px)  { .rel-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      <CtaBand />
    </>
  );
}
