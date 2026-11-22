'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cinematic hero backdrop.
 *
 * Stills crossfade under a slow Ken Burns push, which is what gives a
 * static photo the feel of a locked-off film plate. If `video` is set,
 * the clip fades in over the stills once it can actually play — so a
 * missing, slow or blocked file degrades to the slideshow instead of a
 * black rectangle, and nothing shifts on the page.
 */
export default function HeroMedia({
  images,
  video,
  poster,
  interval = 6500,
  // Tuned against the hero film, which is already dusk/golden hour and dark of
  // its own accord. Heavy enough on the left to hold white display type, light
  // enough on the right that the pit and the sky still read as photography.
  overlay = 'linear-gradient(100deg, rgba(6,24,43,0.88) 0%, rgba(6,24,43,0.60) 38%, rgba(6,24,43,0.20) 100%)',
}: {
  images: { src: string; alt: string }[];
  video?: string;
  poster?: string;
  interval?: number;
  overlay?: string;
}) {
  const [index, setIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (images.length < 2 || videoReady) return;
    const id = window.setInterval(
      () => setIndex(i => (i + 1) % images.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [images.length, interval, videoReady]);

  // Autoplay is blocked on some devices even when muted; treat a rejected
  // play() the same as a missing file and stay on the stills.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => setVideoReady(false));
  }, [video]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#06182B' }}>
      {images.map((img, i) => (
        <div
          key={img.src}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === index && !videoReady ? 1 : 0,
            transition: 'opacity 1.8s var(--ease)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className="kenburns"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              animationDelay: `${i * -8}s`,
            }}
          />
        </div>
      ))}

      {video && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 1.6s var(--ease)',
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {/* Grade: a cool navy wash so white type holds contrast over any frame */}
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />

      {/* Foot vignette — keeps the capability strip legible over a bright plate */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '38%',
          background: 'linear-gradient(to top, rgba(6,24,43,0.62), rgba(6,24,43,0))',
          pointerEvents: 'none',
        }}
      />

      {/* Fine site-grid texture — a surveyor's gridlines, barely there */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />
    </div>
  );
}
