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

  /*
   * Veritas Warehouse. Unlike the two school projects, this set is of a
   * building going up rather than one finished: roof sheeting over half the
   * span with the portal frame still open over the rest, and interiors with
   * the trusses exposed. The gallery is ordered to read that way — the whole
   * building from the air, then its elevation, then inside.
   *
   * Three plates are cropped rather than used whole. Neighbouring businesses
   * on the industrial estate carry legible signage in the wider frames, and
   * the brief forbids another company's name appearing anywhere on this site,
   * so 01, 04 and the hero are cut to leave only distant roofs.
   */
  'veritas-warehouse-nelspruit': {
    hero: '/projects/veritas-warehouse-nelspruit/hero.jpg',
    card: '/projects/veritas-warehouse-nelspruit/card.jpg',
    film: {
      src: '/video/proj-veritas-warehouse.mp4',
      poster: '/posters/proj-veritas-warehouse.jpg',
      caption:
        'Film from inside the warehouse, moving across the open roof steel '
        + 'above the cast floors.',
    },
    gallery: [
      {
        src: '/projects/veritas-warehouse-nelspruit/01.jpg',
        alt: 'The warehouse from directly above, with roof sheeting laid over '
          + 'part of the span and the bare steel frame still open over the rest.',
      },
      {
        src: '/projects/veritas-warehouse-nelspruit/04.jpg',
        alt: 'The end elevation of the warehouse, its openings formed and the '
          + 'roof steel in place above, with the site compound alongside.',
      },
      {
        src: '/projects/veritas-warehouse-nelspruit/06.jpg',
        alt: 'Looking up at the lattice roof trusses spanning the warehouse '
          + 'before the sheeting was laid.',
      },
      {
        src: '/projects/veritas-warehouse-nelspruit/07.jpg',
        alt: 'Scaffold standing against the concrete walls inside the '
          + 'warehouse, under the open roof steel.',
      },
      {
        src: '/projects/veritas-warehouse-nelspruit/08.jpg',
        alt: 'The full width of the interior, with the roof steel overhead and '
          + 'the mezzanine floor cast.',
      },
      {
        src: '/projects/veritas-warehouse-nelspruit/13.jpg',
        alt: 'Ground level inside the warehouse, looking along the line of '
          + 'columns to the mezzanine above.',
      },
      {
        src: '/projects/veritas-warehouse-nelspruit/14.jpg',
        alt: 'The roof trusses carried over the two-level structure inside the '
          + 'building.',
      },
      {
        src: '/projects/veritas-warehouse-nelspruit/15.jpg',
        alt: 'A cast concrete stair flight inside the building, seen from the '
          + 'landing above.',
      },
    ],
  },

  /*
   * Western Mega-RDP. This is a live site, not a finished one: the drone
   * stills are dated 24 October 2026 and the ground photography 16 April
   * 2025, and what they show is earthworks, platform, foundations and surface
   * beds — civils rather than housing. The alt text says what is in the
   * frame and nothing about what LKMD's contract covers, because that has not
   * been confirmed.
   */
  'mega-city-housing-randfontein': {
    hero: '/projects/mega-city-housing-randfontein/hero.jpg',
    card: '/projects/mega-city-housing-randfontein/card.jpg',
    film: {
      src: '/video/proj-mega-city-housing.mp4',
      poster: '/posters/proj-mega-city-housing.jpg',
      caption:
        'Aerial film along the reinforced foundations laid out across the site.',
    },
    gallery: [
      {
        src: '/projects/mega-city-housing-randfontein/02.jpg',
        alt: 'Cast foundations and strip footings set out across the prepared '
          + 'platform, seen from the air.',
      },
      {
        src: '/projects/mega-city-housing-randfontein/04.jpg',
        alt: 'A large reinforcement raft being fixed, with the team working '
          + 'across it and the neighbouring township beyond.',
      },
      {
        src: '/projects/mega-city-housing-randfontein/06.jpg',
        alt: 'The team laying damp-proof sheeting and reinforcement over the '
          + 'foundation bays.',
      },
      {
        src: '/projects/mega-city-housing-randfontein/09.jpg',
        alt: 'Foundation bays lined with damp-proof membrane and reinforcement, '
          + 'ready for concrete.',
      },
      {
        src: '/projects/mega-city-housing-randfontein/10.jpg',
        alt: 'A long run of reinforced foundation bays laid out across the site.',
      },
      {
        src: '/projects/mega-city-housing-randfontein/11.jpg',
        alt: 'Cast surface beds on the prepared platform, with the open veld '
          + 'beyond.',
      },
      {
        src: '/projects/mega-city-housing-randfontein/14.jpg',
        alt: 'A roller compacting fill across the building platform.',
      },
      {
        src: '/projects/mega-city-housing-randfontein/15.jpg',
        alt: 'Damp-proof sheeting being laid over the foundation reinforcement.',
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
