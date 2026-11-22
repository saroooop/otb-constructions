import { brand } from '@/lib/brand';

/**
 * A person's portrait, or a monogram where no real photograph exists.
 *
 * Deliberately not a stock photo: a bought portrait attached to a named
 * director reads as a real person who is not, and that is a worse failure
 * than an obviously abstract placeholder. The monogram also makes it
 * immediately visible which entries still need real photography.
 */
export default function Portrait({
  name,
  photo,
  ratio = '1 / 1',
}: {
  name: string;
  photo?: string;
  ratio?: string;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');

  if (photo) {
    return (
      <div style={{ aspectRatio: ratio, overflow: 'hidden', background: brand.color.navy900 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          decoding="async"
          src={photo}
          alt={name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'saturate(0.88) contrast(1.04)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${name} — portrait to follow`}
      style={{
        aspectRatio: ratio,
        background: brand.color.navy900,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* the same surveyor's grid used behind the hero */}
      <span
        aria-hidden
        style={{
          position: 'absolute', inset: 0, opacity: 0.6,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <span
        aria-hidden
        style={{
          fontFamily: 'var(--font-heading), system-ui, sans-serif',
          fontSize: '2rem', fontWeight: 800, letterSpacing: '0.02em',
          color: 'transparent',
          WebkitTextStroke: `1.4px rgba(255,255,255,0.5)`,
        }}
      >
        {initials || '—'}
      </span>
      <span
        aria-hidden
        style={{ position: 'absolute', left: 0, bottom: 0, width: 40, height: 4, background: brand.color.red }}
      />
    </div>
  );
}
