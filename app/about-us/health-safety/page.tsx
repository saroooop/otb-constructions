import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Health & Safety | LKMD Construction',
  description:
    'How LKMD Construction keeps its people, subcontractors and the public safe on every site, through training, inductions and a robust safety management system.',
};

const aims = [
  'Provide a safe and healthy environment for everyone involved in our projects',
  'Give our health and safety policy the expertise and resources it needs',
  'Improve continuously through regular training and workshops',
  'Run robust health and safety management processes',
  'Prevent accidents and incidents',
  'Assess, manage, control and reduce risks',
  'Put hazard reduction strategies in place',
  'Promote a culture of health and continual improvement',
];

export default function HealthSafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Health & safety"
        title="Our people are our greatest resource"
        lede="The human element comes first on every project we undertake. We are committed to health and safety standards that go beyond what the law requires, and to the utmost care of everyone on our sites."
        image="/lkmd/team-lineup.jpg"
        video="/video/safety.mp4"
        poster="/posters/safety.jpg"
        position="center 40%"
      />

      {/* ── Safety on every site ──────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start' }}
          >
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 22 }}>Safety on every site</p>
              <h2 className="display-sm">
                Beyond what
                <br />
                the law requires.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 26 }}>
                Every member of staff and every subcontractor receives site inductions
                and regular health and safety training.
              </p>
              <p className="lede" style={{ marginBottom: 20 }}>
                Safety is part of our company values, and everyone on site is
                empowered to report a safety concern immediately.
              </p>
              <p className="lede">
                Our dedicated Safety, Health &amp; Environment department includes SHE
                officers, first aid officers and OHS trainers.
              </p>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
      </section>

      {/* ── The eight aims ────────────────────────────────── */}
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
            backgroundImage: 'url(/lkmd/hivis.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.15,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>
              Our health and safety management system
            </p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 620, marginBottom: 50 }}>
              Our system is designed to:
            </h2>
          </Reveal>

          <div
            className="aims-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}
          >
            {aims.map((a, i) => (
              <Reveal key={a} delay={(i % 4) * 80}>
                <div
                  className="card-dark"
                  style={{ height: '100%', padding: '26px 24px', borderTop: `3px solid ${brand.color.red}` }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-heading), system-ui, sans-serif',
                      fontSize: '1.15rem', fontWeight: 800,
                      color: 'transparent', WebkitTextStroke: `1.2px ${brand.color.redSoft}`,
                      marginBottom: 14,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p style={{ fontSize: '0.88rem', color: '#C7D6E4', lineHeight: 1.8 }}>{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1100px) { .aims-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 600px)  { .aims-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <CtaBand />
    </>
  );
}
