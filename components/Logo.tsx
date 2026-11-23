import { brand } from '@/lib/brand';

/**
 * The supplied LKMD mark — interlocking red and navy blocks with the
 * wordmark and tagline. Two renderings of the same artwork: navy on light
 * surfaces, white on dark, exactly as the brand brief specifies.
 *
 * The white version is recoloured from the same source PNG rather than being
 * a separate file, so the two can never drift apart in shape.
 */
export default function Logo({
  tone = 'dark',
  size = 42,
}: {
  /** 'dark' = navy artwork for light backgrounds; 'light' = white for dark. */
  tone?: 'dark' | 'light';
  /** Cap height in px. The lockup is ~3.6:1, so width follows from it. */
  size?: number;
}) {
  const src = tone === 'light'
    ? '/brand/lkmd-logo-white.png'
    : '/brand/lkmd-logo-navy.png';

  // Source artwork is 1231 x 339.
  const height = Math.round(size * 1.08);
  const width = Math.round(height * (1231 / 339));

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={`${brand.full} — ${brand.tagline}`}
      width={width}
      height={height}
      fetchPriority="high"
      style={{ display: 'block', height, width: 'auto', flexShrink: 0 }}
    />
  );
}
