import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { companyStats } from '@/lib/content';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who we are, how we are structured, and the principles we hold on safety, local content and programme certainty.',
};

const principles = [
  {
    title: 'We self-perform what matters',
    body:
      'Earthworks, concrete and the critical-path civils are done by our own crews with our own plant. Subcontracting the critical path is subcontracting the promise.',
  },
  {
    title: 'We price what we can build',
    body:
      'A tender we cannot deliver at the number we wrote is not a win. We would rather lose a bid than hand a client a claim-driven programme six months in.',
  },
  {
    title: 'We build the local crew',
    body:
      'Local content measured at award is a procurement statistic. We train, certify and sub-contract to crews that are still working after we demobilise.',
  },
  {
    title: 'We report honestly',
    body:
      'Progress, incidents and cost are reported as they are. A client who finds out late has one problem; a client who finds out we knew has a different one.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built by people who have run the sites, not just priced them."
        lede="Our leadership came up through operating mines, live plants and public infrastructure. It shows in how we plan and in what we refuse to promise."
        image="/team-site-visit.jpg"
        position="center 35%"
      />

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="split"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}
          >
            <Reveal>
              <h2 className="display-sm">
                A contractor shaped
                <br />
                around the region it
                <br />
                works in.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="rule-left" style={{ marginBottom: 26 }}>
                The constraint on growth here was never the ore body. It is water,
                power, roads and the crews who can build them.
              </p>
              <p className="lede" style={{ marginBottom: 20 }}>
                {brand.full} was set up to take on that constraint directly: a
                contractor that can take a greenfield site from survey control through
                bulk earthworks, structures, plant erection and commissioning, with
                the same people accountable the whole way.
              </p>
              <p className="lede" style={{ marginBottom: 20 }}>
                We work across Southern Africa and the United Kingdom. The UK presence
                is not decorative — it is where a good deal of our standards,
                procurement discipline and technical governance come from, and it is
                how clients get an answer inside a European working day.
              </p>
              <p className="lede">
                What we take on is bounded deliberately. We would rather be the best
                option on six disciplines than a plausible option on twenty.
              </p>
            </Reveal>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .split { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </section>

      {/* ── Numbers ───────────────────────────────────────── */}
      <section style={{ background: brand.color.navy900, color: '#fff', padding: '96px 0' }}>
        <div className="container">
          <div
            className="stat-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 36 }}
          >
            {companyStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div style={{ borderTop: `2px solid ${brand.color.red}`, paddingTop: 22 }}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .stat-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px)  { .stat-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Principles ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>What we hold to</p>
            <h2 className="display-sm" style={{ maxWidth: 560, marginBottom: 54 }}>
              Four commitments we are happy to be measured against.
            </h2>
          </Reveal>

          <div
            className="prin-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}
          >
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 110}>
                <div
                  style={{
                    background: brand.color.concrete,
                    padding: '44px 40px',
                    height: '100%',
                    borderTop: `3px solid ${brand.color.red}`,
                  }}
                >
                  <h3 style={{ fontSize: '1.18rem', marginBottom: 14 }}>{p.title}</h3>
                  <p style={{ fontSize: '0.94rem', color: '#5C6B7A', lineHeight: 1.85 }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 48 }}>
              <Link href="/careers" className="btn btn-outline">
                Work with us
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>
        </div>

        <style>{`@media (max-width: 820px) { .prin-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  );
}
