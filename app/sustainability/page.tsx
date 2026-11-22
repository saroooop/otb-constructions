import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HardHat, Leaf, Users, GraduationCap, Droplets, Recycle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Safety & Sustainability',
  description:
    'Zero-harm safety practice, local content and skills transfer, water stewardship and rehabilitation across our construction operations.',
};

const safety = [
  {
    Icon: HardHat,
    title: 'Induction before access',
    body: 'Nobody passes the gate without a site-specific induction, current medicals and the PPE the hazard assessment calls for. No exceptions for visitors, clients or directors.',
  },
  {
    Icon: Users,
    title: 'Stop-work authority',
    body: 'Every person on site can stop work they believe is unsafe, and nothing happens to them for using it. A stop-work that turns out to be unnecessary is still a good outcome.',
  },
  {
    Icon: GraduationCap,
    title: 'Competence, not attendance',
    body: 'Lifting, confined space, working at height and energised work are task-authorised against assessed competence — not against a certificate someone once sat.',
  },
];

const sustainability = [
  {
    Icon: Users,
    title: 'Local content that outlasts us',
    body: 'We target local hire and local supply on every contract, and we measure it where it counts: how many crews and suppliers are still trading two years after demobilisation.',
  },
  {
    Icon: Droplets,
    title: 'Water stewardship',
    body: 'In an arid region, construction water is a shared resource. We plan dust suppression, concrete curing and testing around measured abstraction limits, and report usage against them.',
  },
  {
    Icon: Leaf,
    title: 'Rehabilitation as scope, not afterthought',
    body: 'Borrow pits, laydowns and haul routes are rehabilitated to an agreed standard as part of the works programme, priced at tender rather than negotiated at close-out.',
  },
  {
    Icon: Recycle,
    title: 'Material reuse',
    body: 'Cut material, demolition arisings and surplus aggregate are re-profiled on site wherever specification allows. Hauling spoil off a remote site is cost and carbon doing the same damage twice.',
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Safety & sustainability"
        title="Everybody goes home. Everything gets put back."
        lede="Two commitments that cost money at tender stage and save it everywhere else."
        image="/site-access-ppe.jpg"
        position="center 26%"
      />

      {/* ── Safety ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div
              className="split"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start', marginBottom: 60 }}
            >
              <div>
                <p className="eyebrow" style={{ marginBottom: 22 }}>Safety</p>
                <h2 className="display-sm">Zero harm, stated plainly.</h2>
              </div>
              <div>
                <p className="rule-left" style={{ marginBottom: 24 }}>
                  No programme, no margin and no client is worth an injury.
                </p>
                <p className="lede">
                  Zero harm is not a slogan here because we do not report it like one.
                  We publish our incident data to clients in full, including near
                  misses, because a number people are afraid to report is a number
                  that cannot be managed.
                </p>
              </div>
            </div>
          </Reveal>

          <div
            className="three-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}
          >
            {safety.map((s, i) => (
              <Reveal key={s.title} delay={i * 110}>
                <div style={{ background: brand.color.concrete, padding: '40px 34px', height: '100%' }}>
                  <s.Icon size={26} strokeWidth={1.6} color={brand.color.red} />
                  <h3 style={{ fontSize: '1.1rem', margin: '20px 0 12px' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.92rem', color: '#5C6B7A', lineHeight: 1.85 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .split      { grid-template-columns: 1fr !important; gap: 36px !important; }
            .three-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Sustainability ────────────────────────────────── */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '110px 0' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow eyebrow-light" style={{ marginBottom: 22 }}>Sustainability</p>
            <h2 className="display-sm" style={{ color: '#fff', maxWidth: 660, marginBottom: 20 }}>
              The part of the contract that is still there in ten years.
            </h2>
            <p className="lede-dark" style={{ maxWidth: 620, marginBottom: 56 }}>
              National policy across the region now sets explicit targets for local
              equity, local content and beneficiation. We treat those as scope, not
              compliance paperwork.
            </p>
          </Reveal>

          <div
            className="sus-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}
          >
            {sustainability.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 110}>
                <div className="card-dark" style={{ height: '100%', padding: '36px 34px' }}>
                  <s.Icon size={24} strokeWidth={1.6} color={brand.color.redSoft} />
                  <h3 style={{ fontSize: '1.08rem', color: '#fff', margin: '18px 0 12px' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.89rem', color: '#8EA3B8', lineHeight: 1.85 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 52 }}>
              <Link href="/contact" className="btn btn-primary">
                Ask for our HSE pack
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`@media (max-width: 820px) { .sus-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  );
}
