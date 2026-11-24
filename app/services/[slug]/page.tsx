import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
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
        video="/video/services.mp4"
        poster="/posters/services.jpg"
        position="center 42%"
      />

      {/* ── The content sections ──────────────────────────── */}
      <section className="section">
        <div className="container">
          {service.sections.map((sec, si) => (
            <div key={sec.heading} style={{ marginBottom: si === service.sections.length - 1 ? 0 : 72 }}>
              <Reveal>
                <p className="eyebrow" style={{ marginBottom: 22 }}>{sec.heading}</p>
              </Reveal>

              <div
                className="svc-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: sec.items.length >= 4 ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
                  gap: 4,
                }}
              >
                {sec.items.map((item, i) => (
                  <Reveal key={item.title} delay={(i % 3) * 90}>
                    <div
                      style={{
                        background: brand.color.concrete, padding: '32px 30px', height: '100%',
                        borderTop: `3px solid ${brand.color.red}`,
                      }}
                    >
                      <Check size={19} strokeWidth={2.5} color={brand.color.red} />
                      <h3 style={{ fontSize: '1.04rem', margin: '16px 0 10px', lineHeight: 1.35 }}>
                        {item.title}
                      </h3>
                      {item.body && (
                        <p style={{ fontSize: '0.88rem', color: '#5C6B7A', lineHeight: 1.85 }}>
                          {item.body}
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          {service.note && (
            <Reveal>
              <p
                className="rule-left"
                style={{ marginTop: 56, maxWidth: 760 }}
              >
                {service.note}
              </p>
            </Reveal>
          )}
        </div>

        <style>{`
          @media (max-width: 1024px) { .svc-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .svc-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── This discipline on site, when there are photographs ── */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
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
