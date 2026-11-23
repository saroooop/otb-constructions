import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { ctaBand } from '@/lib/site';
import { brand } from '@/lib/brand';

/**
 * The standard call-to-action band: navy ground, white text, red button —
 * exactly as the brief specifies. It closes every service page and anywhere
 * the copy says "standard call-to-action band", so it is built once here.
 *
 * `heading` and `body` can be overridden where a page carries its own
 * closing words; the layout stays identical so the site reads as one.
 */
export default function CtaBand({
  heading = ctaBand.heading,
  body = ctaBand.body,
  primary = ctaBand.buttons[0],
  secondary = ctaBand.buttons[1] as { label: string; href: string } | undefined,
  image,
}: {
  heading?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Optional photograph behind the band, held well back. */
  image?: string;
}) {
  return (
    <section
      style={{
        position: 'relative', overflow: 'hidden',
        background: brand.color.navy800, color: '#fff', padding: '100px 0',
      }}
    >
      {image && (
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />
      )}

      <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Reveal>
          <h2 className="display-sm" style={{ color: '#fff', marginBottom: 20 }}>
            {heading}
          </h2>
          <p className="lede-dark" style={{ maxWidth: 560, margin: '0 auto 36px' }}>
            {body}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {primary && (
              <Link href={primary.href} className="btn btn-primary">
                {primary.label}
                <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            )}
            {secondary && (
              <Link href={secondary.href} className="btn btn-light">
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
