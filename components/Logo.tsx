import { brand } from '@/lib/brand';

/**
 * The mark is a headgear A-frame sitting on a red datum line inside a
 * square plot — mining and civils in one shape. It is drawn, not
 * imported, so a brand change is a colour change in lib/brand.ts.
 */
export default function Logo({
  tone = 'dark',
  size = 42,
}: {
  tone?: 'dark' | 'light';
  size?: number;
}) {
  const stroke = tone === 'light' ? '#FFFFFF' : brand.color.navy800;
  const word   = tone === 'light' ? '#FFFFFF' : brand.color.ink;
  const sub    = tone === 'light' ? 'rgba(255,255,255,0.62)' : brand.color.muted;

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
        <rect x="1.4" y="1.4" width="45.2" height="45.2" stroke={stroke} strokeWidth="2.4" />
        {/* winding tower: two legs, a tie, and the inclined back brace */}
        <path d="M18.5 37V15.5M29.5 37V15.5M18.5 26.5h11" stroke={stroke} strokeWidth="2.3" strokeLinecap="square" />
        <path d="M29.5 18.5L39 37" stroke={stroke} strokeWidth="2.3" strokeLinecap="square" />
        {/* sheave wheel at the headframe apex */}
        <circle cx="24" cy="12.4" r="3.4" stroke={stroke} strokeWidth="2.3" />
        {/* red datum — the line everything is set out from */}
        <path d="M7 38.6h34" stroke={brand.color.red} strokeWidth="3.4" strokeLinecap="square" />
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
            letterSpacing: '0.2em',
            color: sub,
            marginTop: 3,
            whiteSpace: 'nowrap',
          }}
        >
          Civils &amp; Mining
        </span>
      </span>
    </span>
  );
}
