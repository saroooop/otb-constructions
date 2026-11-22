/**
 * The operating companies under OTB Constructions.
 *
 * ⚠ VERIFY BEFORE PUBLISHING. Everything here was read from each company's
 * own public website. Two things still need confirming by someone who knows
 * the corporate position:
 *
 *   1. The ownership claim itself. Stating that OTB owns these three is a
 *      claim about company structure, not a design decision.
 *   2. Using their accreditations as the group's. A B-BBEE level, a CIDB
 *      grading and an ISO certificate belong to the legal entity that holds
 *      them. Presenting Za-Eng's CIDB 9GB as OTB's own would be a serious
 *      misrepresentation if the structure does not actually support it —
 *      which is why each credential below is attributed to its holder on
 *      the page rather than claimed by the group.
 *
 * Sources: zaeng.co.za, kontinental.co.za, wongaholdings.com (Nov 2026).
 */

export type GroupCompany = {
  slug: string;
  name: string;
  role: string;
  strapline: string;
  summary: string;
  founded?: string;
  offices: string[];
  capabilities: string[];
  credentials?: { label: string; value: string }[];
  website: string;
  image: string;
};

export const groupCompanies: GroupCompany[] = [
  {
    slug: 'wonga-holdings',
    name: 'Wonga Holdings',
    role: 'Mining, engineering and energy',
    strapline: 'Technical services and contract mining, from small-scale to mid-tier operations.',
    summary:
      'A woman-owned South African business operating across mining, engineering and energy, with a footprint through the SADC region. Wonga carries the group’s mining technical capability — the work that happens before and around construction, from resource evaluation to closure and rehabilitation — together with an energy division delivering solar for mining and remote sites.',
    offices: ['South Africa', 'SADC region'],
    capabilities: [
      'Resource evaluation and geological modelling',
      'Mine planning and scheduling',
      'Contract mining',
      'Mine closure and rehabilitation',
      'Productivity improvement strategies',
      'Mechanical and civil engineering',
      'Solar for mining and remote energy systems',
      'Solar plant de-risking and maintenance',
    ],
    website: 'https://wongaholdings.com',
    image: '/disciplines/mining-infrastructure.jpg',
  },
  {
    slug: 'za-eng',
    name: 'Za-Eng Consulting',
    role: 'Multidisciplinary design and engineering',
    strapline: 'Helping build a better future.',
    summary:
      'Founded in 2018 and headquartered in Pretoria, Za-Eng is a multidisciplinary consulting and construction engineering firm covering eight disciplines under one roof — architecture through to quantity surveying. It is where a project is designed, costed and co-ordinated before anyone breaks ground, and it carries the group’s formal engineering accreditations.',
    founded: '2018',
    offices: ['267 West Avenue, Centurion 0157, Pretoria'],
    capabilities: [
      'Architecture',
      'Civil and structural engineering',
      'Electrical and electronics engineering',
      'Mechanical and fire engineering',
      'Town planning',
      'Project management',
      'Quantity surveying',
      'Construction',
    ],
    credentials: [
      { label: 'B-BBEE',  value: 'Level 1' },
      { label: 'Quality', value: 'ISO 9001 certified' },
      { label: 'CIDB',    value: '9GB, 9CE, 8ME, 8EP' },
      { label: 'NHBRC',   value: 'Registered' },
      { label: 'CESA',    value: 'Member' },
    ],
    website: 'https://www.zaeng.co.za',
    image: '/disciplines/building-civil-engineering.jpg',
  },
  {
    slug: 'kontinental',
    name: 'Kontinental',
    role: 'Construction delivery',
    strapline: 'One stop shop for planning, design and construction services.',
    summary:
      'A multi-disciplinary construction company working throughout South Africa for government, commercial, industrial and residential clients. Kontinental is where the group self-performs: housing, schools and hospitals, industrial and factory buildings, refurbishment, roads and highways, and the civil engineering that sits under all of it.',
    offices: [
      'Woodmead Country Club Estate, 21 Woodlands Drive, Building 2, Woodmead 2191',
      'East London',
    ],
    capabilities: [
      'Public and private housing',
      'Schools, clinics and hospitals',
      'Industrial and factory buildings',
      'Office and retail refurbishment',
      'Public buildings and transport facilities',
      'Civil engineering',
      'Roads, highways and maintenance programmes',
      'Construction management',
    ],
    website: 'https://www.kontinental.co.za',
    image: '/sectors/sector-building.jpg',
  },
];

/** How the three fit together — the argument for the group existing at all. */
export const groupChain = [
  {
    n: '01',
    stage: 'Evaluate',
    company: 'Wonga Holdings',
    desc: 'Resource evaluation, geological modelling, mine planning and scheduling. The work that decides whether a project is worth building, and in what sequence.',
  },
  {
    n: '02',
    stage: 'Design and cost',
    company: 'Za-Eng Consulting',
    desc: 'Architecture, civil and structural, electrical, mechanical and fire, town planning and quantity surveying. Eight disciplines co-ordinated under one appointment instead of eight.',
  },
  {
    n: '03',
    stage: 'Build',
    company: 'Kontinental',
    desc: 'Self-performed construction across buildings, civils and roads, for government, commercial, industrial and residential clients throughout South Africa.',
  },
  {
    n: '04',
    stage: 'Power and close out',
    company: 'Wonga Holdings',
    desc: 'Solar and remote energy systems for mining sites, then closure and rehabilitation when the operation reaches the end of its life.',
  },
];

/** Real references, delivered by Kontinental. Source: kontinental.co.za. */
export const groupProjects = [
  {
    name: 'All Saints 700 and Inkwenkwezi 300',
    company: 'Kontinental',
    discipline: 'Housing',
    scope: 'Public housing construction across two developments.',
    location: 'South Africa',
  },
  {
    name: 'Phola Park water reticulation, phases 1 and 2',
    company: 'Kontinental',
    discipline: 'Water & Bulk Services',
    scope: 'Water reticulation network across two phases.',
    location: 'South Africa',
  },
  {
    name: 'Paul Mosaka Primary School',
    company: 'Kontinental',
    discipline: 'Public & Social Infrastructure',
    scope: 'Refurbishment of an operating primary school.',
    location: 'South Africa',
  },
];
