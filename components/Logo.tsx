import { brand } from '@/lib/brand';

/**
 * The mark is a globe carrying the African continent, cut by a red line that
 * reads as both the equator and a surveyor's datum — the line everything is
 * set out from. "A world of Africa", drawn rather than imported, so a brand
 * change is a colour change in lib/brand.ts.
 *
 * The coastline is plotted from real lon/lat rather than sketched, which is
 * why the west bulge, the Gulf of Guinea and the Horn all read correctly at
 * 40px where a freehand silhouette turns into a blob.
 */
const AFRICA =
  'M12.1 7.7 L16.7 7.2 L20.5 7.1 L25.6 9.6 L30.8 10.0 L32.1 10.7 ' +
  'L34.6 15.8 L37.8 19.3 L42.0 19.7 L38.8 24.6 L35.9 27.6 L35.7 29.0 ' +
  'L34.4 34.6 L32.2 38.6 L31.3 40.6 L25.6 43.0 L24.8 42.6 L22.7 37.1 ' +
  'L22.0 30.0 L20.1 25.4 L20.2 23.6 L16.9 22.4 L15.0 22.9 L13.1 23.0 ' +
  'L9.5 22.5 L6.0 18.3 L6.8 16.6 L6.5 13.6 L10.1 10.4 Z';

// Small, but it is what makes the silhouette unmistakably Africa.
const MADAGASCAR = 'M40.9 31.6 L41.5 33.6 L38.8 38.4 L37.7 33.9 Z';

// Africa scaled about its own centre so it sits inside the globe ring.
const S = 0.78;
const TX = (24 * (1 - S)).toFixed(2);
const TY = (25.05 * (1 - S)).toFixed(2);

export default function Logo({
  tone = 'dark',
  size = 42,
}: {
  tone?: 'dark' | 'light';
  size?: number;
}) {
  const mark = tone === 'light' ? '#FFFFFF' : brand.color.navy800;
  const word = tone === 'light' ? '#FFFFFF' : brand.color.ink;
  const sub  = tone === 'light' ? 'rgba(255,255,255,0.62)' : brand.color.muted;

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        aria-hidden="true"
        style={{ display: 'block', flexShrink: 0 }}
      >
        <circle cx="24" cy="24" r="21" fill="none" stroke={mark} strokeWidth="2.2" />
        <g transform={`translate(${TX},${TY}) scale(${S})`}>
          <path d={AFRICA} fill={mark} />
          <path d={MADAGASCAR} fill={mark} />
        </g>
        {/* equator and datum, the same red that runs through the site */}
        <path d="M4.4 25.6 H43.6" stroke={brand.color.red} strokeWidth="2.8" />
      </svg>

      <span style={{ lineHeight: 1.05 }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-heading), system-ui, sans-serif',
            fontWeight: 800,
            fontSize: size * 0.46,
            letterSpacing: '-0.015em',
            color: word,
            whiteSpace: 'nowrap',
          }}
        >
          {brand.name}
          <span style={{ color: brand.color.red }}>·</span>
          {brand.nameBold}
        </span>
        <span
          style={{
            display: 'block',
            fontSize: size * 0.165,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: sub,
            marginTop: 4,
            whiteSpace: 'nowrap',
          }}
        >
          {brand.motto}
        </span>
      </span>
    </span>
  );
}
