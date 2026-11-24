import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { disciplines } from '@/lib/content';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Mining Infrastructure | LKMD Construction',
  description:
    'LKMD builds the infrastructure a mine runs on: haul roads and earthworks, headgear and conveyors, processing plant, bulk water, power reticulation and the permanent buildings on site.',
};

/**
 * Mining has its own page because it is its own kind of work.
 *
 * The six building and civil services describe what LKMD does for schools,
 * housing and public buildings. A mine is a different programme: it is built
 * in stages, it is remote, and it needs bulk services and plant before it
 * produces anything. Folding that into a services page would have buried it.
 *
 * The film leads, because the work is easier to show than to describe. The
 * market evidence lives on /market and is linked rather than repeated.
 */
export default function MiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Mining infrastructure"
        title="A mine is a construction programme first"
        lede="Before a mine produces anything, someone builds the road in, the pad it stands on, the plant that treats the ore and the water and power that keep it running. That is the work we are built for."
        image="/disciplines/roads-earthworks.jpg"
        video="/video/mining.mp4"
        poster="/posters/mining.jpg"
        position="center 55%"
      />

      {/* ── The stages ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>What we build</p>
            <h2 className="display-sm" style={{ maxWidth: 700, marginBottom: 20 }}>
              Access, then plant, then everything that keeps it running.
            </h2>
            <p className="lede" style={{ maxWidth: 640, marginBottom: 48 }}>
              Mining work arrives in a fixed order. The haul road and the
              earthworks come first, because nothing else can be delivered
              until they exist. The headgear, conveyors and processing plant
              follow. Bulk water, power and the permanent buildings run
              alongside both, and carry on long after first production.
            </p>
          </Reveal>

          <div
            className="disc-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {disciplines.map((d, i) => (
              <Reveal key={d.name} delay={(i % 3) * 90}>
                <article style={{ background: brand.color.concrete, height: '100%' }}>
                  <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.image}
                      alt={d.name}
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
                    <h3 style={{ fontSize: '1.12rem', marginBottom: 10, lineHeight: 1.3 }}>{d.name}</h3>
                    <p style={{ fontSize: '0.86rem', color: '#5C6B7A', lineHeight: 1.8 }}>{d.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1000px) { .disc-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 620px)  { .disc-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Why this work suits us ─────────────────────────── */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '104px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Why this work</p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 720, marginBottom: 48 }}>
              Remote sites reward contractors who can do more than one thing.
            </h2>
          </Reveal>

          <div
            className="why-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 44 }}
          >
            {[
              {
                h: 'One contractor, several disciplines',
                b: 'Earthworks, structures, mechanical installation and bulk services under one appointment. On a site hours from the nearest town, every extra contractor is another mobilisation to pay for and another programme to coordinate.',
              },
              {
                h: 'Built for the conditions',
                b: 'Long hauls, limited power, water that has to be brought in or won on site, and weather that closes roads. These are planning problems before they are construction problems, and they are planned for from the start.',
              },
              {
                h: 'Local knowledge and local people',
                b: 'Our work in South Africa and the wider region means local relationships, local suppliers and local labour, which is what makes a remote programme deliverable and keeps its benefit in the area.',
              },
            ].map((x, i) => (
              <Reveal key={x.h} delay={i * 90}>
                <div style={{ borderTop: `2px solid ${brand.color.red}`, paddingTop: 24 }}>
                  <h3 style={{ fontSize: '1.08rem', color: '#fff', marginBottom: 14, lineHeight: 1.35 }}>
                    {x.h}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#9DB2C6', lineHeight: 1.85 }}>{x.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) { .why-grid { grid-template-columns: 1fr !important; gap: 34px !important; } }
        `}</style>
      </section>

      {/* ── Pointer to the market evidence ─────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 36, flexWrap: 'wrap',
                background: brand.color.concrete, padding: '44px 46px',
                borderLeft: `4px solid ${brand.color.red}`,
              }}
            >
              <div style={{ maxWidth: 680 }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: 10 }}>
                  Namibia has published what it intends to build.
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#5C6B7A', lineHeight: 1.8 }}>
                  The constraints on the sector and the four-year project
                  pipeline are both set out in the NamPPF deck. We have read it
                  as a description of construction work, and set out what it
                  asks for.
                </p>
              </div>
              <Link href="/market" className="btn btn-outline">
                Market insight
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading="Looking for an expert team to manage your construction requirements?"
        body="Get in touch with LKMD today. Tell us what you need built and where, and we will be delighted to help."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'See our projects', href: '/projects' }}
      />
    </>
  );
}
