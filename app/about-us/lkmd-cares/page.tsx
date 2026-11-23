import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'LKMD Cares | Communities & Sustainability | LKMD Construction',
  description:
    'How LKMD Construction supports the communities where it works through training, local employment and suppliers, and sustainable construction.',
};

const pillars = [
  {
    title: 'Training and development',
    body: 'We create training and development opportunities on our projects, and every department at LKMD takes on interns who learn alongside experienced professionals.',
  },
  {
    title: 'Local employment and supply chains',
    body: 'Wherever we can, we employ people from the communities around our sites and buy from local suppliers and subcontractors. A social facilitator in our team works with communities from the start of each project.',
  },
  {
    title: 'Building sustainably',
    body: 'We use sustainable construction practices and work to reduce waste on our sites.',
  },
];

export default function LkmdCaresPage() {
  return (
    <>
      <PageHero
        eyebrow="LKMD Cares"
        title="Empowering communities and promoting sustainability"
        lede="We want our impact to reach beyond the buildings and infrastructure we deliver. We support the communities where we work, and we operate in an environmentally responsible way."
        image="/lkmd/children.jpg"
        video="/video/cares.mp4"
        poster="/posters/cares.jpg"
        position="center 40%"
      />

      {/* ── The three pillars, with the community film ────── */}
      <section className="section">
        <div className="container">
          <div
            className="cares-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 4, alignItems: 'stretch' }}
          >
            <Reveal>
              <div
                style={{
                  position: 'relative', height: '100%', minHeight: 460,
                  overflow: 'hidden', background: brand.color.navy900,
                }}
              >
                {/*
                  preload="none" — this sits below the fold and the poster
                  carries the first frame, so it costs nothing until seen.
                */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster="/posters/cares.jpg"
                  aria-label="LKMD in the communities where it works"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                  }}
                >
                  <source src="/video/cares.mp4" type="video/mp4" />
                </video>
                <span
                  aria-hidden
                  style={{ position: 'absolute', left: 0, bottom: 0, width: 80, height: 5, background: brand.color.red }}
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div style={{ background: brand.color.concrete, padding: '46px 42px', height: '100%' }}>
                {pillars.map((p, i) => (
                  <div
                    key={p.title}
                    style={{
                      padding: '26px 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                    }}
                  >
                    <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}>{p.title}</h2>
                    <p style={{ fontSize: '0.92rem', color: '#5C6B7A', lineHeight: 1.85 }}>{p.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .cares-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <CtaBand
        heading="Are you a local supplier or subcontractor?"
        body="Tell us about your business, your trade and the areas you work in."
        primary={{ label: 'Contact us', href: '/contact?enquiry=supplier' }}
        secondary={undefined}
        image="/lkmd/community-workshop.jpg"
      />
    </>
  );
}
