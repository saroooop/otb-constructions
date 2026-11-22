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
    image: '/sectors/sector-mining.jpg',
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
    image: '/sectors/sector-water.jpg',
    short: 'Bulk water infrastructure for mines, municipalities and coastal desalination schemes.',
    detail:
      'Desalination capacity on the coast is the enabler behind several of the region’s largest expansions. We deliver intake and outfall civils, bulk pipelines, pump stations and reservoirs — the works that move treated water inland to where it is consumed.',
  },
  {
    title: 'Transport Infrastructure',
    image: '/sectors/sector-transport.jpg',
    short: 'Roads, rail formation, bridges and port-adjacent works.',
    detail:
      'Rail connectivity is one of the clearest infrastructure gaps between a mine and an export market. We build road and rail formation, structures, culverts and the heavy-haul surfacing that carries concentrate to port.',
  },
  {
    title: 'Industrial & Commercial Building',
    image: '/sectors/sector-building.jpg',
    short: 'Workshops, warehousing, offices and the built estate around an operation.',
    detail:
      'The buildings a site runs on: workshops, stores, laboratories, administration blocks, accommodation and the logistics warehousing that supplies them.',
  },
  {
    title: 'Public & Social Infrastructure',
    image: '/disciplines/building-civil-engineering.jpg',
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
    read: '4 min',
    standfirst:
      'Namibia has set a target of lifting mineral beneficiation from under 10% to 25% by 2030. Targets of that kind are met in concrete and steel, on sites, by crews — or they are not met at all.',
    body: [
      'The NamPPF assessment is blunt about where the country stands: exports are dominated by unprocessed ore, with less than 10% value addition. The stated ambition is 25% by 2030, with processed mineral exports rising from 46.6% to 57% over the same period.',
      'Read that as a construction programme and it becomes concrete, steel and commissioning. Every percentage point of beneficiation is a mill base, a leach circuit, a thickener, a transfer tower, a reagent store, a power feed and a water line — built, in most cases, alongside an operation that cannot stop producing while you build it.',
      'The deck’s own recommendations point the same way: make serviced and unserviced land available, accelerate the beneficiation strategy through special economic zone incentives, and address the infrastructure deficits. Two of those three are civils.',
      'The implication for anyone developing a project is timing. Brownfield tie-ins are the part of a plant programme most often underestimated, because they are priced as though the existing plant will be available when needed. It will not be. Sequencing that against a shutdown calendar is a conversation worth having before the design is frozen, not after.',
    ],
  },
  {
    slug: 'water-decides-which-projects-proceed',
    title: 'Water, not ore, decides which projects proceed',
    date: '2026-11-04',
    read: '4 min',
    standfirst:
      'Desalination capacity and the pipelines running inland from it are the real constraint on expansion along the Erongo coast. The resource was never the hard part.',
    body: [
      'Among the constraints named as limits on Namibian mining expansion, infrastructure comes first: water scarcity, power constraints and affordable electricity, and poor rail connectivity. The recommendations are specific — upgrade desalination capacity, address ageing water infrastructure and the delays in concluding water supply agreements, and fund rail.',
      'The Husab–NamWater desalination plant appears in the pipeline as critical water infrastructure enabling both mining growth and the Husab expansion. That is an unusually direct statement: a mine expansion is gated on a water project.',
      'What follows for contractors is that the water scope and the mine scope are one programme with two budgets. Intake and outfall civils, bulk pipeline inland, pump stations, reservoirs and site reticulation are not a supporting package to be let late. If the water lands six months after the plant, the plant is an expensive monument.',
      'The same logic applies to power. Substation civils and reticulation are routinely treated as a trailing package, and routinely become the thing everyone waits for. Both belong in the early contractor conversation, not the second procurement round.',
    ],
  },
  {
    slug: 'local-content-that-survives-handover',
    title: 'Local content that survives hand-over',
    date: '2026-10-21',
    read: '5 min',
    standfirst:
      'A local-content percentage counted at contract award tells you almost nothing. What matters is how many of those crews are still trading two years after the site closes.',
    body: [
      'The supply chain already exists and it is substantial. Mining-linked small and medium enterprises supplied over N$24 billion in goods and services to the Namibian sector in 2024 — logistics, catering, maintenance, construction. The barriers named are access to finance, shortages of technical and managerial talent, and low access to modern process technologies. Not willingness, and not appetite.',
      'Artisanal and small-scale mining supports around 10,000 miners and some 35,000 livelihoods, concentrated in Kunene, Erongo and //Karas. It remains largely informal, and the assessment is candid that formalisation is held back by centralised, costly licensing rather than by the miners themselves.',
      'On inclusion the numbers are stark. Women make up 18% of the mining workforce, and only 10% have held executive roles since 2009. Youth participation is described as minimal, with few structured pathways from education into employment.',
      'The recommendation we find most useful as a contractor is the phrase “local content with teeth”: reserve a share of service contracts for compliant local enterprises, and provide pre-bid training and supplier development so they can actually meet the standard. That second half is the part usually skipped, and it is the part that decides whether a local-content figure means anything.',
      'Our own position is simple enough to audit. We train and certify local crews rather than mobilising labour in and out, and the measure we hold ourselves to is not the percentage at award. It is how many of those crews and suppliers are still working two years after we demobilise.',
    ],
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

/* ═══════════════════════════════════════════════════════════
   Material drawn from the NamPPF deck (Oct 2025). All of this is
   sourced and attributable — see marketSource above. It is kept
   separate from the invented placeholders at the top of this file.
   ═══════════════════════════════════════════════════════════ */

/** The four constraints the deck names, each mapped to what we build. */
export const constraints = [
  {
    constraint: 'Infrastructure deficits',
    finding:
      'Water scarcity, power constraints and poor rail connectivity are named as direct limits on expansion. The recommendations are desalination capacity, replacing ageing water infrastructure, and funding rail.',
    response: 'Water & Bulk Services, Roads & Earthworks, Mechanical/Electrical',
    detail:
      'This is the bulk of what we do. Intake and outfall civils, bulk pipelines inland, pump stations and reservoirs; haul roads and rail formation; substations and reticulation.',
  },
  {
    constraint: 'Limited beneficiation',
    finding:
      'Exports are dominated by unprocessed ore — under 10% value addition. The target is 25% by 2030, with processed mineral exports rising from 46.6% to 57%.',
    response: 'Processing & Beneficiation',
    detail:
      'Concentrator and mill civils, leach and SX-EW circuits, smelter and refinery works, plant steel, and the brownfield tie-ins that let an existing plant keep running while the new one is built beside it.',
  },
  {
    constraint: 'Skills gaps',
    finding:
      'The standard of training at vocational training centres is flagged, alongside difficulty bringing in specialist skills. The recommendation is to strengthen VTCs.',
    response: 'How we staff a site',
    detail:
      'We train and certify local crews rather than mobilising labour in and out. The measure we hold ourselves to is how many are still working two years after we demobilise.',
  },
  {
    constraint: 'Policy and permitting delays',
    finding:
      'Delays in approvals, permits and licences, and unresolved legislation, are named as the leading source of uncertainty.',
    response: 'Early contractor involvement',
    detail:
      'We plan and price around permitting realities rather than assuming them away, and we sequence works so that the parts which can proceed are not held hostage to the parts that cannot.',
  },
];

/** Named developments in the published pipeline. NOT our projects. */
export const pipeline = {
  note:
    'These are the developments named in the NamPPF deck as Namibia’s four-year pipeline. They are listed here as the market we are built to serve — not as work we have been appointed to.',
  groups: [
    {
      sector: 'Gold',
      items: ['Osino Twin Hill — new mine entering production', 'Navachab underground expansion', 'B2Gold underground expansion'],
    },
    {
      sector: 'Uranium',
      items: ['Bannerman Etango', 'Reptile Mineral Resources expansion', 'Rössing Z20 life-of-mine extension', 'Husab Leach Project and mine expansion'],
    },
    {
      sector: 'Zinc & multi-metals',
      items: ['Skorpion Zinc refinery conversion', 'Sinomine Tsumeb smelter conversion for refined and recycled metals'],
    },
    {
      sector: 'Enabling infrastructure',
      items: ['Husab – NamWater desalination plant', 'Integrated marine phosphate sector — potential 50,000 jobs (5,000 direct)'],
    },
  ],
};

/** Local content and inclusion figures, all from the deck. */
export const localContent = [
  { value: 'N$24B', label: 'Supplied by mining-linked MSMEs', sub: 'Goods and services to the sector, 2024' },
  { value: '~10,000', label: 'Artisanal and small-scale miners', sub: 'Supporting over 35,000 livelihoods' },
  { value: '18%', label: 'Women in the mining workforce', sub: 'Only 10% have held executive roles since 2009' },
  { value: '25%', label: 'Beneficiation target by 2030', sub: 'From under 10% today' },
];

/** Accreditations. PLACEHOLDER — none of these are held yet. */
export const accreditations = [
  { label: 'CIDB grading',    value: 'TBC' },   // TODO: confirm or remove
  { label: 'B-BBEE level',    value: 'TBC' },   // TODO
  { label: 'ISO 9001',        value: 'TBC' },   // TODO
  { label: 'Safety standard', value: 'TBC' },   // TODO
];
