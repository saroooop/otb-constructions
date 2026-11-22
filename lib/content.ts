/**
 * Site content.
 *
 * TWO KINDS OF NUMBER LIVE HERE, AND THEY ARE KEPT APART ON PURPOSE:
 *
 *   marketStats  — sourced. Namibia Public-Private Forum, "Mining and
 *                  Adjacent Sectors", 23–24 October 2025 (the deck is
 *                  served at /namppf-mining-adjacent-sectors.pdf). These
 *                  are published figures and are cited on the page.
 *
 *   companyStats — PLACEHOLDER. Nobody has verified these. They are
 *   projects       marked so they are easy to find and replace before
 *                  the site goes anywhere near a client. See CONTENT-TODO.md.
 */

/* ── Sourced: NamPPF, Oct 2025 ─────────────────────────── */
export const marketStats = [
  { value: '13.3%',  label: 'Of Namibia’s GDP', sub: 'Large-scale mining, 2024' },
  { value: 'N$48B',  label: 'Foreign exchange',      sub: 'Over half the national total' },
  { value: 'US$2.8B', label: 'Capital pipeline',     sub: 'New and expansion projects to 2029' },
  { value: '18,148', label: 'Direct jobs in pipeline', sub: 'Across announced developments' },
];

export const marketSource =
  'Source: Namibia Public-Private Forum, “Mining and Adjacent Sectors”, 23–24 October 2025 — Chamber of Mines of Namibia and Women in Mining Association of Namibia.';

/* ── PLACEHOLDER: replace before any client sees this ──── */
export const companyStats = [
  { value: '40+',  label: 'Years combined experience', sub: 'Across the leadership team' },  // TODO: confirm
  { value: '2',    label: 'Operating regions',         sub: 'United Kingdom and Southern Africa' }, // TODO: confirm
  { value: '6',    label: 'Delivery disciplines',      sub: 'Civils through to commissioning' },
  { value: 'Zero', label: 'Harm target',               sub: 'Every site, every shift' },
];

/* ── What we do ─────────────────────────────────────────── */
export const services = [
  {
    slug: 'building-civil-engineering',
    title: 'Building & Civil Engineering',
    image: '/disciplines/building-civil-engineering.jpg',
    short: 'Structures, foundations and reinforced concrete, from headframes to industrial buildings.',
    body:
      'Reinforced concrete and structural steel delivered to specification and to programme. We work from the foundation up — piling, bulk concrete, headframes, workshops, process buildings and the commercial structures that sit alongside an operating site.',
    capabilities: [
      'Reinforced concrete structures',
      'Piling and deep foundations',
      'Structural steel erection',
      'Industrial and process buildings',
      'Commercial and institutional build',
      'Refurbishment and structural repair',
    ],
  },
  {
    slug: 'roads-earthworks',
    title: 'Roads & Earthworks',
    image: '/disciplines/roads-earthworks.jpg',
    short: 'Bulk earthworks, haul roads and surfaced highway, from clearing to final seal.',
    body:
      'Earthmoving at scale, with the survey control to prove it. Mine haul roads that carry ultra-class trucks, access roads into remote development, public highway, and the bulk cut-and-fill that precedes everything else on a greenfield site.',
    capabilities: [
      'Bulk earthworks and cut-to-fill',
      'Mine haul roads and ramps',
      'Surfaced and gravel roads',
      'Stormwater and drainage',
      'Terracing and platform preparation',
      'Rehabilitation and reinstatement',
    ],
  },
  {
    slug: 'mining-infrastructure',
    title: 'Mining Infrastructure',
    image: '/disciplines/mining-infrastructure.jpg',
    short: 'Shaft and decline infrastructure, headgear, conveyors and surface works.',
    body:
      'The fixed plant an operation is built around. Shaft collars and headgear, decline portals, conveyor galleries and transfer towers, stockpile and reclaim, workshops and change-houses — built to run for the life of the mine.',
    capabilities: [
      'Shaft collars and headgear',
      'Decline portals and boxcuts',
      'Conveyor galleries and transfer towers',
      'Stockpile, reclaim and load-out',
      'Workshops, stores and change-houses',
      'Tailings storage facilities',
    ],
  },
  {
    slug: 'processing-beneficiation',
    title: 'Processing & Beneficiation',
    image: '/disciplines/processing-beneficiation.jpg',
    short: 'Concentrator and refinery civils, plant erection and tie-ins for value addition on site.',
    body:
      'Namibia exports 46.6% of its minerals processed and has set a course for 57% by 2030. That target is built, not legislated. We deliver the civils, structural steel and plant erection behind concentrators, smelters, leach circuits and refineries — including the brownfield tie-ins that keep an existing plant running while the new one rises beside it.',
    capabilities: [
      'Concentrator and mill civils',
      'Leach, CIL and SX-EW circuits',
      'Smelter and refinery works',
      'Plant structural steel and platework',
      'Brownfield tie-ins and shutdowns',
      'Commissioning support',
    ],
  },
  {
    slug: 'water-bulk-services',
    title: 'Water & Bulk Services',
    image: '/disciplines/water-bulk-services.jpg',
    short: 'Pipelines, reservoirs, pump stations and desalination-supporting infrastructure.',
    body:
      'Water decides which projects proceed in this region. We build the pipelines, pump stations, reservoirs and treatment civils that move it — including the intake, outfall and distribution works that let a desalination plant serve a mine and a town from the same source.',
    capabilities: [
      'Bulk water pipelines',
      'Pump stations and rising mains',
      'Reservoirs and storage',
      'Desalination intake and outfall civils',
      'Water and effluent treatment works',
      'Site reticulation',
    ],
  },
  {
    slug: 'mechanical-electrical',
    title: 'Mechanical, Electrical & Instrumentation',
    image: '/disciplines/mechanical-electrical.jpg',
    short: 'Power reticulation, substations, instrumentation and the hand-over to operations.',
    body:
      'Power and control, delivered by the same contractor that poured the base. Substations and switchrooms, HV and MV reticulation, cable racking, instrumentation and the loop checks that close out a commissioning programme — one accountable interface instead of three.',
    capabilities: [
      'Substations and switchrooms',
      'HV / MV reticulation',
      'Cable racking and containment',
      'Instrumentation and loop checking',
      'Standby and solar generation',
      'Pre-commissioning and hand-over',
    ],
  },
];

/* ── Sectors ────────────────────────────────────────────── */
export const sectors = [
  {
    title: 'Mining & Minerals',
    image: '/disciplines/mining-infrastructure.jpg',
    short: 'Surface and underground infrastructure across gold, uranium, zinc, copper and industrial minerals.',
    detail:
      'The sector we were built for. Shaft and decline infrastructure, processing civils, haul roads, tailings facilities and the surface works that hold an operation together — delivered under the safety regime an operating mine demands.',
  },
  {
    title: 'Energy & Power',
    image: '/disciplines/mechanical-electrical.jpg',
    short: 'Generation, transmission and the reticulation that connects a remote site to a grid.',
    detail:
      'Power constraints are named in every serious assessment of the region as a brake on growth. We build substation civils, transmission foundations, solar platforms and the standby generation that keeps a plant running when the grid does not.',
  },
  {
    title: 'Water & Desalination',
    image: '/disciplines/water-bulk-services.jpg',
    short: 'Bulk water infrastructure for mines, municipalities and coastal desalination schemes.',
    detail:
      'Desalination capacity on the coast is the enabler behind several of the region’s largest expansions. We deliver intake and outfall civils, bulk pipelines, pump stations and reservoirs — the works that move treated water inland to where it is consumed.',
  },
  {
    title: 'Transport Infrastructure',
    image: '/disciplines/roads-earthworks.jpg',
    short: 'Roads, rail formation, bridges and port-adjacent works.',
    detail:
      'Rail connectivity is one of the clearest infrastructure gaps between a mine and an export market. We build road and rail formation, structures, culverts and the heavy-haul surfacing that carries concentrate to port.',
  },
  {
    title: 'Industrial & Commercial Building',
    image: '/disciplines/building-civil-engineering.jpg',
    short: 'Workshops, warehousing, offices and the built estate around an operation.',
    detail:
      'The buildings a site runs on: workshops, stores, laboratories, administration blocks, accommodation and the logistics warehousing that supplies them.',
  },
  {
    title: 'Public & Social Infrastructure',
    image: '/disciplines/processing-beneficiation.jpg',
    short: 'Schools, clinics and municipal works delivered with local labour and local suppliers.',
    detail:
      'Work that answers to a community rather than a balance sheet. Delivered to the same standard as our industrial projects, and used deliberately as the training ground where local crews build the record that qualifies them for the next mine contract.',
  },
];

/* ── PLACEHOLDER projects — illustrative, NOT delivered work ── */
export const projects = [
  {
    name: 'Shaft Collar & Headgear Infrastructure',          // TODO: replace with a real reference
    client: 'Confidential — uranium operation',
    location: 'Erongo Region, Namibia',
    value: 'Undisclosed',
    scope: 'Shaft collar, headgear foundations, surface civils and winder house.',
    discipline: 'Mining Infrastructure',
    image: '/disciplines/mining-infrastructure.jpg',
  },
  {
    name: 'Bulk Earthworks & Haul Road Network',             // TODO
    client: 'Confidential — gold development',
    location: 'Namibia',
    value: 'Undisclosed',
    scope: 'Platform preparation, 14 km of haul road, stormwater and terracing.',
    discipline: 'Roads & Earthworks',
    image: '/disciplines/roads-earthworks.jpg',
  },
  {
    name: 'Processing Plant Civils & Structural Steel',      // TODO
    client: 'Confidential — base metals',
    location: 'Southern Africa',
    value: 'Undisclosed',
    scope: 'Mill and thickener bases, structural steel erection, brownfield tie-ins.',
    discipline: 'Processing & Beneficiation',
    image: '/disciplines/processing-beneficiation.jpg',
  },
  {
    name: 'Bulk Water Pipeline & Pump Stations',             // TODO
    client: 'Confidential — industrial user',
    location: 'Coastal Namibia',
    value: 'Undisclosed',
    scope: 'Bulk pipeline, two pump stations, reservoir and site reticulation.',
    discipline: 'Water & Bulk Services',
    image: '/disciplines/water-bulk-services.jpg',
  },
];

/* ── Insights — grounded in the NamPPF material ─────────── */
export const insights = [
  {
    slug: 'beneficiation-is-a-construction-problem',
    title: 'Beneficiation is a construction problem before it is a policy one',
    date: '2026-11-18',
    read: '6 min',
    standfirst:
      'Namibia has set a target of lifting mineral beneficiation from under 10% to 25% by 2030. Targets of that kind are met in concrete and steel, on sites, by crews — or they are not met at all.',
  },
  {
    slug: 'water-decides-which-projects-proceed',
    title: 'Water, not ore, decides which projects proceed',
    date: '2026-11-04',
    read: '5 min',
    standfirst:
      'Desalination capacity and the pipelines running inland from it are the real constraint on expansion along the Erongo coast. The resource was never the hard part.',
  },
  {
    slug: 'local-content-that-survives-handover',
    title: 'Local content that survives hand-over',
    date: '2026-10-21',
    read: '7 min',
    standfirst:
      'A local-content percentage counted at contract award tells you almost nothing. What matters is how many of those crews are still trading two years after the site closes.',
  },
];

/* ── How we work ────────────────────────────────────────── */
export const approach = [
  {
    n: '01',
    title: 'Early contractor involvement',
    desc: 'We price and plan with you before the design is frozen, where buildability still changes the cost. The savings available at this stage are not available later.',
  },
  {
    n: '02',
    title: 'Survey and set out',
    desc: 'Control established and verified before the first machine moves. Every level, line and volume is measurable against a datum you can audit.',
  },
  {
    n: '03',
    title: 'Build to programme',
    desc: 'Self-performed where it matters, with our own plant and crews. Progress reported against a programme you hold us to, not one we reissue each month.',
  },
  {
    n: '04',
    title: 'Commission and hand over',
    desc: 'Pre-commissioning, loop checks, as-builts and an operations team that can run what we built. We close out properly, then stay reachable.',
  },
];
