/**
 * PROJECT PHOTOGRAPHY AND FILM, KEYED BY PROJECT SLUG.
 *
 * These are LKMD's own photographs of their own work — drone stills, drone
 * film and site photography supplied November 2026 — conformed to the same
 * house spec as everything else in `public/`: stills at 1800 px on the long
 * edge, films at 1600x900 / 25 fps / silent.
 *
 * WHY THIS LIVES HERE AND NOT IN THE DATABASE
 * `lib/db.ts` reads projects from Supabase and falls back to `lib/site.ts`
 * when the database is unreachable, and that fallback is load bearing. A
 * gallery column would exist on one path and not the other, so a paused
 * database would silently empty every gallery. Keying the media off the slug
 * in the codebase means both paths render identically, and a gallery can
 * never point at a file that is not in `public/`.
 *
 * A project with no entry here simply renders without a gallery or film,
 * exactly as all seven did before.
 */

export type GalleryImage = {
  src: string;
  alt: string;
  /** Portrait plates are given their own tile so they are never cropped to a letterbox. */
  portrait?: boolean;
};

export type ProjectMedia = {
  /** Full-size plate behind the project page title. */
  hero: string;
  /**
   * The same picture at card size, for the projects index and the home page
   * selection. Those cards render about 400 px wide, so sending the 1800 px
   * hero to them wastes roughly 350 KB per card for pixels nobody sees.
   */
  card: string;
  film?: { src: string; poster: string; caption: string };
  gallery: GalleryImage[];
};

export const projectMedia: Record<string, ProjectMedia> = {
  'athlone-girls-high-school-johannesburg': {
    hero: '/projects/athlone-girls-high-school-johannesburg/hero.jpg',
    card: '/projects/athlone-girls-high-school-johannesburg/card.jpg',
    film: {
      src: '/video/proj-athlone-girls.mp4',
      poster: '/posters/proj-athlone-girls.jpg',
      caption:
        'Aerial film of Athlone Girls High School, rising from the entrance '
        + 'to the full campus.',
    },
    gallery: [
      {
        src: '/projects/athlone-girls-high-school-johannesburg/02.jpg',
        alt: 'Aerial view of Athlone Girls High School showing the classroom '
          + 'wings, sports courts and playing field, with jacarandas in flower.',
      },
      {
        src: '/projects/athlone-girls-high-school-johannesburg/01.jpg',
        alt: 'Overhead view of the school’s tiled roofs around the planted '
          + 'central quadrangle.',
      },
      {
        src: '/projects/athlone-girls-high-school-johannesburg/06.jpg',
        alt: 'Overhead view of the quadrangle enclosed by the school’s '
          + 'pitched tile roofs.',
      },
      {
        src: '/projects/athlone-girls-high-school-johannesburg/14.jpg',
        alt: 'The quadrangle at ground level, showing the face brick arcade, '
          + 'the roof cupola and the planted courtyard.',
      },
      {
        src: '/projects/athlone-girls-high-school-johannesburg/09.jpg',
        alt: 'The courtyard looking along the arched colonnades that enclose '
          + 'it on all sides.',
      },
      {
        /*
         * Cropped in below the wall notices. The full frame carries a
         * provincial department coat of arms and the school's own crest,
         * and the brief does not allow another party's marks on the site —
         * so the crop keeps the refurbished sanitaryware, which is the
         * only picture here of work LKMD actually carried out, and leaves
         * the signage out of shot.
         */
        src: '/projects/athlone-girls-high-school-johannesburg/12.jpg',
        alt: 'Refurbished washroom with new basins, mixers, mirrors and tiling '
          + 'against the retained face brick.',
      },
      {
        src: '/projects/athlone-girls-high-school-johannesburg/15.jpg',
        alt: 'The covered walkway running beside the quadrangle, with brick '
          + 'piers, arched openings and a quarry tile floor.',
        portrait: true,
      },
      {
        src: '/projects/athlone-girls-high-school-johannesburg/08.jpg',
        alt: 'Face brick elevation with the louvred roof cupola above the '
          + 'tiled roof.',
        portrait: true,
      },
    ],
  },

  'saps-ennerdale-police-station-ennerdale': {
    hero: '/projects/saps-ennerdale-police-station-ennerdale/hero.jpg',
    card: '/projects/saps-ennerdale-police-station-ennerdale/card.jpg',
    film: {
      src: '/video/proj-saps-ennerdale.mp4',
      poster: '/posters/proj-saps-ennerdale.jpg',
      caption:
        'Aerial film of the South African Police Service station at Ennerdale '
        + 'during construction.',
    },
    gallery: [
      {
        src: '/projects/saps-ennerdale-police-station-ennerdale/01.jpg',
        alt: 'Aerial view of the Ennerdale police station site, showing the '
          + 'completed roofs, the surfaced yard and the site establishment.',
      },
      {
        src: '/projects/saps-ennerdale-police-station-ennerdale/02.jpg',
        alt: 'Overhead view of the station buildings, the paved yard and the '
          + 'steel shade structures along the boundary.',
      },
      {
        src: '/projects/saps-ennerdale-police-station-ennerdale/03.jpg',
        alt: 'A completed U-shaped block in face brick under a new sheeted '
          + 'roof, enclosing an unsurfaced courtyard.',
      },
      {
        src: '/projects/saps-ennerdale-police-station-ennerdale/04.jpg',
        alt: 'The main station buildings from above, showing the hipped roofs, '
          + 'internal courtyard and vehicle bays.',
      },
      {
        src: '/projects/saps-ennerdale-police-station-ennerdale/05.jpg',
        alt: 'Structural steel shade frames erected on site ahead of sheeting.',
      },
      {
        src: '/projects/saps-ennerdale-police-station-ennerdale/14.jpg',
        alt: 'Completed internal walkway with a glazed screen and face brick '
          + 'dado.',
      },
      {
        src: '/projects/saps-ennerdale-police-station-ennerdale/12.jpg',
        alt: 'A finished internal corridor with a suspended ceiling and '
          + 'full-height glazing to one side.',
        portrait: true,
      },
    ],
  },
};

export function getProjectMedia(slug: string): ProjectMedia | undefined {
  return projectMedia[slug];
}

/**
 * The stock plates that have an 800 px twin in `/lkmd/cards/`.
 *
 * Project cards render about 400 px wide, so the 1800 px originals cost a
 * visitor roughly 1.1 MB of pixels they never see — and on a phone the grid
 * is one column, so every card loads. The named list is deliberate: a
 * project's picture can come from Supabase, and rewriting an arbitrary path
 * into `/cards/` would turn an unknown image into a 404 rather than a
 * smaller file.
 */
const PLATES_WITH_CARDS = new Set([
  'concrete', 'highrise', 'skybridge', 'site-team',
  'engineers-laptop', 'tower', 'crane-sunset',
]);

/** The card-sized twin of a plate, or the plate itself if it has none. */
export function cardVariant(src: string): string {
  const m = /^\/lkmd\/([a-z0-9-]+)\.jpg$/.exec(src);
  return m && PLATES_WITH_CARDS.has(m[1]) ? `/lkmd/cards/${m[1]}.jpg` : src;
}
