'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A film inside the page, rather than behind a hero.
 *
 * It costs nothing until it is nearly on screen: `preload="none"` means the
 * browser fetches the poster and not a byte of the video, and the source is
 * only attached once an IntersectionObserver says the band is coming into
 * view. A visitor who never scrolls that far never downloads the film, so a
 * second film on a page does not slow the first paint.
 *
 * The poster carries the frame until the video can play, so the block never
 * renders as a black rectangle and nothing shifts when the film arrives.
 */
export default function InlineFilm({
  src,
  poster,
  caption,
}: {
  src: string;
  poster: string;
  caption?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // No observer (older browser, odd embed): load it rather than show nothing.
    if (!('IntersectionObserver' in window)) { setNear(true); return; }

    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) { setNear(true); io.disconnect(); }
      },
      { rootMargin: '400px' },   // start fetching just before it is reached
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    const el = videoRef.current;
    if (!el) return;
    // Autoplay can be refused — Low Power Mode, data saver, a site setting.
    // The poster stays up in that case, which is a reasonable still.
    el.play().catch(() => {});
  }, [near]);

  return (
    <div ref={wrapRef}>
      <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: '#0B1730' }}>
        <video
          ref={videoRef}
          src={near ? src : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={caption}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      {caption && (
        <p style={{ fontSize: '0.78rem', color: '#8A99A8', marginTop: 12, lineHeight: 1.7 }}>
          {caption}
        </p>
      )}
    </div>
  );
}
