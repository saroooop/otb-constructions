import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { services } from '@/lib/site';
import { getProjects, getProject } from '@/lib/db';
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
   * Only the facts LKMD has supplied are rendered. Client, our role, contract
   * value, year and status are all still to come, and the brief is explicit
   * that an empty field is hidden rather than filled with placeholder text.
   */
  const facts = ([
    { k: 'Location', v: [project.town, project.province].filter(Boolean).join(', ') },
    { k: 'Sector',   v: project.sector },
    { k: 'Service',  v: project.service || service?.title || '' },
  ] as { k: string; v: string }[]).filter(f => f.v);

  return (
    <>
      <PageHero
        eyebrow="Project"
        title={`${project.title} – ${project.town}`}
        lede={project.summary}
        image={project.image}
        video="/video/projects.mp4"
        poster="/posters/projects.jpg"
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

              {/*
                Scope, delivery narrative, outcome and gallery come once LKMD
                supplies them. Rather than print lorem, the page says plainly
                that more is coming and offers the route to ask.
              */}
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
                  Scope, contract details and photographs of the finished work are
                  being prepared for publication. If you are assessing us for similar
                  work, ask and we will talk you through it directly.
                </p>
                <Link href="/contact" className="btn btn-outline">
                  Ask about this project
                  <ArrowRight size={14} strokeWidth={2.4} />
                </Link>
              </div>

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
          @media (max-width: 960px) {
            .proj-split { grid-template-columns: 1fr !important; gap: 40px !important; }
            .proj-split > div > div { position: static !important; }
          }
        `}</style>
      </section>

      <CtaBand />
    </>
  );
}
