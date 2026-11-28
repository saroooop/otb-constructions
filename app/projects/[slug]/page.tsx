import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import ProjectGallery from '@/components/ProjectGallery';
import { services } from '@/lib/site';
import { getProjects, getProject } from '@/lib/db';
import { getProjectMedia } from '@/lib/media';
import { getProjectDetail } from '@/lib/projectDetail';
import { brand } from '@/lib/brand';

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getProjects();
  return all.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} – ${p.town} | LKMD Construction`,
    description: p.summary,
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const all = await getProjects();
  const project = all.find(p => p.slug === slug);
  if (!project) notFound();

  const service = services.find(s => s.slug === project.serviceSlug);
  const index = all.findIndex(p => p.slug === slug);
  const next = all[(index + 1) % all.length];

  /*
   * LKMD's own photographs of this project, where they have been supplied.
   * Where they have not, the page falls back to the generic plate and the
   * shared projects film exactly as it did before, so a project without
   * photography is unchanged rather than broken.
   */
  const media = getProjectMedia(slug);

  /*
   * The written detail LKMD supply per project — key facts, the account of the
   * work, the scope and the outcome. Absent for a project they have not yet
   * written up, which is the case for most of them.
   */
  const detail = getProjectDetail(slug);

  /*
   * Only the facts LKMD has supplied are rendered, in the order the brief
   * lists them. The brief is explicit that an empty field is hidden rather
   * than filled with placeholder text, so the filter is load bearing: a
   * project with no detail still shows location, sector and service and
   * nothing else.
   */
  const facts = ([
    { k: 'Client',   v: detail?.client ?? '' },
    {
      k: 'Location',
      // The brief's own location line where it is more precise than the town.
      v: detail?.location ?? [project.town, project.province].filter(Boolean).join(', '),
    },
    { k: 'Sector',   v: project.sector },
    { k: 'Services', v: detail?.services ?? project.service ?? service?.title ?? '' },
    { k: 'Our role', v: detail?.role ?? '' },
    { k: 'Year(s)',  v: detail?.years ?? '' },
    { k: 'Status',   v: detail?.status ?? '' },
  ] as { k: string; v: string }[]).filter(f => f.v);

  return (
    <>
      <PageHero
        eyebrow="Project"
        title={`${project.title} – ${project.town}`}
        lede={project.summary}
        image={media?.hero ?? project.image}
        video={media?.film?.src ?? '/video/projects.mp4'}
        poster={media?.film?.poster ?? '/posters/projects.jpg'}
        position="center 45%"
      />

      <section className="section">
        <div className="container">
          <div
            className="proj-split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 72, alignItems: 'start' }}
          >
            {/* Key facts */}
            <Reveal>
              <div
                style={{
                  background: brand.color.concrete, padding: '34px 32px',
                  borderTop: `3px solid ${brand.color.red}`, position: 'sticky', top: 120,
                }}
              >
                <p className="eyebrow" style={{ marginBottom: 24 }}>Key facts</p>
                {facts.map((f, i) => (
                  <div
                    key={f.k}
                    style={{
                      padding: '14px 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.13em', color: '#8A99A8', marginBottom: 6,
                      }}
                    >
                      {f.k}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#2A3B4C', fontWeight: 500 }}>{f.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Narrative */}
            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 30 }}>{project.summary}</p>

              <div
                style={{
                  display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
                  marginBottom: 34,
                }}
              >
                <MapPin size={16} strokeWidth={1.9} color={brand.color.red} />
                <span style={{ fontSize: '0.92rem', color: '#5C6B7A' }}>
                  {project.town}, {project.province}
                </span>
              </div>

              {detail?.about?.length || detail?.scope?.length || detail?.outcome ? (
                <>
                  {detail.about?.map(para => (
                    <p
                      key={para.slice(0, 40)}
                      style={{ fontSize: '0.98rem', color: '#3C4B5A', lineHeight: 1.9, marginBottom: 26 }}
                    >
                      {para}
                    </p>
                  ))}

                  {detail.scope && detail.scope.length > 0 && (
                    <>
                      <p className="eyebrow" style={{ marginBottom: 16 }}>Our scope</p>
                      <ul className="proj-scope">
                        {detail.scope.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </>
                  )}

                  {detail.outcome && (
                    <div
                      style={{
                        padding: '26px 30px',
                        background: brand.color.concrete,
                        borderLeft: `4px solid ${brand.color.red}`,
                      }}
                    >
                      <p className="eyebrow" style={{ marginBottom: 10 }}>The outcome</p>
                      <p style={{ fontSize: '0.98rem', color: '#2A3B4C', lineHeight: 1.8, margin: 0 }}>
                        {detail.outcome}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /*
                 * Scope, delivery narrative and outcome come once LKMD
                 * supplies them. Rather than print lorem, the page says
                 * plainly that more is coming and offers the route to ask.
                 */
                <div
                  style={{
                    padding: '30px 34px',
                    border: `1px solid ${brand.color.line}`,
                    borderLeft: `4px solid ${brand.color.navy700}`,
                  }}
                >
                  <h2 style={{ fontSize: '1.08rem', marginBottom: 12 }}>
                    More detail on this project
                  </h2>
                  <p style={{ fontSize: '0.92rem', color: '#5C6B7A', lineHeight: 1.85, marginBottom: 20 }}>
                    {media
                      /* Photographs are on the page now, so only the written
                         detail is still outstanding — claiming otherwise would
                         be contradicted by the gallery directly below. */
                      ? 'Scope, contract details and programme for this project are '
                        + 'being prepared for publication. If you are assessing us for '
                        + 'similar work, ask and we will talk you through it directly.'
                      : 'Scope, contract details and photographs of the finished work are '
                        + 'being prepared for publication. If you are assessing us for similar '
                        + 'work, ask and we will talk you through it directly.'}
                  </p>
                  <Link href="/contact" className="btn btn-outline">
                    Ask about this project
                    <ArrowRight size={14} strokeWidth={2.4} />
                  </Link>
                </div>
              )}

              {/* Footer links the brief asks for */}
              <div
                style={{
                  display: 'flex', gap: 28, flexWrap: 'wrap',
                  marginTop: 40, paddingTop: 26, borderTop: '1px solid var(--line)',
                }}
              >
                {service && (
                  <Link
                    href={`/services/${service.slug}`}
                    style={{
                      fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.11em', color: brand.color.red, textDecoration: 'none',
                    }}
                  >
                    {service.title} →
                  </Link>
                )}
                <Link
                  href={`/projects/${next.slug}`}
                  style={{
                    fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.11em', color: '#5C6B7A', textDecoration: 'none',
                  }}
                >
                  Next project →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          /* The scope list, in the same rule-and-square language as Key facts. */
          .proj-scope { list-style: none; margin: 0 0 32px; padding: 0; }
          .proj-scope li {
            position: relative;
            padding: 11px 0 11px 22px;
            font-size: 0.95rem;
            color: #2A3B4C;
            border-top: 1px solid var(--line);
          }
          .proj-scope li:first-child { border-top: none; }
          .proj-scope li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 1.25em;
            width: 9px;
            height: 2px;
            background: ${brand.color.red};
          }
          @media (max-width: 960px) {
            .proj-split { grid-template-columns: 1fr !important; gap: 40px !important; }
            .proj-split > div > div { position: static !important; }
          }
        `}</style>
      </section>

      {media && <ProjectGallery images={media.gallery} title={project.title} />}

      <CtaBand />
    </>
  );
}
