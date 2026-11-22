import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Hammer } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { projects } from '@/lib/content';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Shaft and headgear infrastructure, bulk earthworks and haul roads, processing plant civils and bulk water schemes across Southern Africa.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work that had to run while the site stayed live."
        lede="Most of what we build sits inside an operating asset. The constraint is rarely the engineering — it is doing it without stopping production."
        image="/team-site-visit-2.jpg"
        position="center 32%"
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gap: 4 }}>
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <article
                  className="proj-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.15fr',
                    background: brand.color.concrete,
                  }}
                >
                  <div style={{ position: 'relative', minHeight: 320, overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%', objectFit: 'cover',
                        filter: 'saturate(0.8) contrast(1.05)',
                      }}
                    />
                  </div>

                  <div style={{ padding: '48px 48px 52px' }}>
                    <span
                      style={{
                        display: 'inline-block', marginBottom: 20,
                        fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.14em', color: '#fff',
                        background: brand.color.red, padding: '6px 12px',
                      }}
                    >
                      {p.discipline}
                    </span>

                    <h2 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.95rem)', marginBottom: 18 }}>
                      {p.name}
                    </h2>

                    <p style={{ fontSize: '0.96rem', color: '#44576A', lineHeight: 1.85, marginBottom: 28 }}>
                      {p.scope}
                    </p>

                    <dl
                      style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, auto)',
                        gap: '0 40px', justifyContent: 'start',
                        borderTop: '1px solid var(--line)', paddingTop: 22,
                      }}
                      className="proj-meta"
                    >
                      {[
                        { Icon: Hammer, k: 'Client',   v: p.client },
                        { Icon: MapPin, k: 'Location', v: p.location },
                        { Icon: null,   k: 'Value',    v: p.value },
                      ].map(m => (
                        <div key={m.k}>
                          <dt
                            style={{
                              fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                              letterSpacing: '0.13em', color: '#8A99A8', marginBottom: 7,
                            }}
                          >
                            {m.k}
                          </dt>
                          <dd style={{ fontSize: '0.88rem', color: '#2A3B4C', fontWeight: 500 }}>
                            {m.v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div
              style={{
                marginTop: 56, padding: '40px 44px',
                border: `1px solid ${brand.color.line}`,
                borderLeft: `4px solid ${brand.color.red}`,
                display: 'flex', gap: 32, flexWrap: 'wrap',
                alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              <div style={{ maxWidth: 620 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 10 }}>
                  Looking for a reference on something specific?
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#5C6B7A', lineHeight: 1.8 }}>
                  Several of our clients hold us to confidentiality on scope and value.
                  Tell us the discipline you are assessing and we will arrange a
                  reference conversation directly.
                </p>
              </div>
              <Link href="/contact" className="btn btn-primary">
                Request references
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .proj-row { grid-template-columns: 1fr !important; }
            .proj-row > div:first-child { min-height: 240px !important; }
            .proj-row > div:last-child  { padding: 34px 28px 38px !important; }
            .proj-meta { grid-template-columns: 1fr 1fr !important; gap: 20px 24px !important; }
          }
        `}</style>
      </section>
    </>
  );
}
