import { brand } from '@/lib/brand';

/**
 * Inner-page banner. Same full-bleed photographic treatment as the home
 * hero, cut to a third of the height so the page's own content starts
 * above the fold rather than below a second full screen of imagery.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  image = '/hero-headgear.jpg',
  position = 'center 40%',
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  image?: string;
  position?: string;
}) {
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: 'calc(var(--nav-h) + 96px)',
        paddingBottom: 96,
        background: brand.color.navy900,
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="kenburns"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background:
              'linear-gradient(100deg, rgba(6,24,43,0.94) 0%, rgba(6,24,43,0.74) 48%, rgba(6,24,43,0.46) 100%)',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p className="eyebrow eyebrow-light" style={{ marginBottom: 26 }}>{eyebrow}</p>
        <h1
          style={{
            fontSize: 'clamp(2.1rem, 4.4vw, 3.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: '#fff',
            maxWidth: 860,
          }}
        >
          {title}
        </h1>
        {lede && (
          <p className="lede-dark" style={{ maxWidth: 620, marginTop: 26 }}>
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
