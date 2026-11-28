/**
 * THE WRITTEN DETAIL OF A PROJECT, KEYED BY SLUG.
 *
 * Key facts, the account of the work, the scope list and the outcome — the
 * copy LKMD supply per project in the Website Content & Site Map. It is their
 * wording, published as written, exactly like the rest of the brief.
 *
 * WHY THIS LIVES HERE AND NOT IN THE DATABASE, FOR NOW
 * The same reason `lib/media.ts` does. `lib/db.ts` reads projects from
 * Supabase and falls back to `lib/site.ts` when the database is unreachable,
 * and that fallback is load bearing — the free tier pauses after seven days
 * idle. The Supabase `projects` select carries none of these columns, so a
 * project read from the database would render with its narrative missing
 * while the same project read from the fallback rendered in full. Keying the
 * detail off the slug in the codebase means both paths render identically.
 *
 * WHEN THE EDITOR PLATFORM ARRIVES these fields become columns on the
 * `projects` table and this file becomes the fallback, not the source. The
 * shape below is deliberately the shape those columns should take.
 *
 * A project with no entry here renders exactly as all seven did before: key
 * facts limited to location, sector and service, and the standing note that
 * written detail is being prepared.
 */

export type ProjectDetail = {
  /** Commissioning client, as LKMD name them. */
  client?: string;
  /**
   * Location as the brief writes it, where that is more precise than the town
   * the project is titled by — "Observatory, Johannesburg, Gauteng" against a
   * page titled "… – Johannesburg".
   */
  location?: string;
  /**
   * Services as one line. A project can run across more than one of them and
   * the brief writes them joined; the page still cross-links to the single
   * `serviceSlug` on the project itself.
   */
  services?: string;
  /**
   * How LKMD held the work — principal contractor, subcontractor, executing
   * contractor for another firm. Published because it is the honest answer and
   * because the public award record names the main contractor anyway.
   */
  role?: string;
  /** Years of the work, as written: "2023–2024". */
  years?: string;
  /** "Completed", "In progress", "On hold". */
  status?: string;
  /** One or two paragraphs on the project. Each string is a paragraph. */
  about?: string[];
  /** The scope of works, as a list. */
  scope?: string[];
  /** What was handed over. */
  outcome?: string;
};

export const projectDetail: Record<string, ProjectDetail> = {
  /*
   * Athlone Girls High School — from Website Content & Site Map V6, supplied
   * 28 November 2026. V6 corrects the earlier summary line: the work was a
   * refurbishment of the existing school AND new facilities, not a new-build
   * school. That matters because the photographs show an established heritage
   * campus with mature trees, which the old "built Athlone Girls High School"
   * line sat awkwardly against.
   *
   * The role line is also new and is the answer to a question this site had
   * open: the public SAPS award record for Ennerdale names Temi Construction
   * as main contractor, and LKMD's own copy here says they executed the works
   * on Temi's behalf. The two are consistent.
   */
  'athlone-girls-high-school-johannesburg': {
    client: 'Gauteng Department of Infrastructure Development',
    location: 'Observatory, Johannesburg, Gauteng',
    services: 'Building Construction · Refurbishment, Renovation & Maintenance',
    role: 'Executed the works on behalf of Temi Construction',
    years: '2023–2024',
    status: 'Completed',
    about: [
      'Athlone Girls High School is a public secondary school in Observatory, '
      + 'Johannesburg. The project, carried out for the Gauteng Department of '
      + 'Infrastructure Development, upgraded the school’s existing buildings '
      + 'and added new facilities for learners and staff.',
    ],
    scope: [
      'Refurbishment of the existing school buildings',
      'A new classroom block',
      'A school hall',
      'Administration offices',
      'A media centre and laboratories',
      'Toilet facilities',
      'Sports facilities',
    ],
    outcome: 'A fully functioning school was handed over in 2024.',
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetail[slug];
}
