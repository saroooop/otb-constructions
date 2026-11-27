import Reveal from '@/components/Reveal';
import { brand } from '@/lib/brand';
import type { GalleryImage } from '@/lib/media';

/**
 * Photographs of a finished project.
 *
 * Deliberately the same visual language as the projects index: a tight
 * three-column grid, 4px gutters, square corners and a staggered reveal.
 * Nothing new is introduced here.
 *
 * Landscape and portrait plates are grouped rather than mixed into one
 * grid. A portrait photograph forced into a landscape tile loses most of
 * its subject to the crop — the arcade and corridor shots are precisely
 * the ones that would suffer — so each orientation gets tiles of its own
 * shape and neither is cropped against itself.
 *
 * Images below the fold are lazy so a long gallery costs nothing on first
 * paint; the first row is eager so it is never blank when it scrolls in.
 */
export default function ProjectGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  if (images.length === 0) return null;

  const landscape = images.filter(i => !i.portrait);
  const portrait = images.filter(i => i.portrait);

  /*
   * Rows are laid out with flex rather than grid so that a row which does not
   * divide by three centres itself instead of leaving a hole on the right.
   * Five landscape plates, or a single portrait one, would otherwise read as
   * a missing image rather than a deliberate arrangement. The track width is
   * the same third-of-the-row the projects index uses, so the rhythm matches.
   */
  const tile = (img: GalleryImage, i: number, ratio: string) => (
    <Reveal key={img.src} delay={(i % 3) * 90}>
      <figure style={{ margin: 0, background: brand.color.concrete }}>
        <div style={{ position: 'relative', aspectRatio: ratio, overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            loading={i < 3 ? 'eager' : 'lazy'}
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </figure>
    </Reveal>
  );

  return (
    <section className="section-sm" aria-label={`Photographs of ${title}`}>
      <div className="container">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Photographs</p>
        </Reveal>

        {landscape.length > 0 && (
          <div className="proj-gal">
            {landscape.map((img, i) => tile(img, i, '4 / 3'))}
          </div>
        )}

        {portrait.length > 0 && (
          <div className="proj-gal" style={{ marginTop: landscape.length > 0 ? 4 : 0 }}>
            {portrait.map((img, i) => tile(img, i, '3 / 4'))}
          </div>
        )}
      </div>

      <style>{`
        .proj-gal {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 4px;
        }
        /* A third of the row, less its share of the two gutters. */
        .proj-gal > * { flex: 0 0 calc((100% - 8px) / 3); min-width: 0; }
        @media (max-width: 860px) {
          .proj-gal > * { flex-basis: calc((100% - 4px) / 2); }
        }
        @media (max-width: 520px) {
          .proj-gal > * { flex-basis: 100%; }
        }
      `}</style>
    </section>
  );
}
