/**
 * The group's divisions and its board.
 *
 * Divisions are described by ROLE only. The operating companies behind them
 * are deliberately not named here or anywhere on the site — the group
 * presents as one capability, not as a holding company listing subsidiaries.
 * That also keeps us clear of claiming accreditations held by another legal
 * entity, which would be a misrepresentation in a tender.
 *
 * `directors` is a PLACEHOLDER. See CONTENT-TODO.md.
 */

export type Division = {
  slug: string;
  role: string;
  title: string;
  strapline: string;
  summary: string;
  capabilities: string[];
  image: string;
};

export const divisions: Division[] = [
  {
    slug: 'mining-energy',
    role: 'Division one',
    title: 'Mining, Engineering & Energy',
    strapline: 'The work that happens before and after construction.',
    summary:
      'Technical services and contract mining across a range of commodities, from small-scale operations through to mid-tier and developing mines — together with the energy capability that powers a remote site and the rehabilitation that closes it out. This is where a project is evaluated and sequenced before anyone commits capital to building it.',
    capabilities: [
      'Resource evaluation and geological modelling',
      'Mine planning and scheduling',
      'Contract mining',
      'Mine closure and rehabilitation',
      'Productivity improvement strategies',
      'Mechanical and civil engineering',
      'Solar and remote energy systems',
      'Solar plant de-risking and maintenance',
    ],
    image: '/disciplines/mining-infrastructure.jpg',
  },
  {
    slug: 'design-engineering',
    role: 'Division two',
    title: 'Design & Engineering',
    strapline: 'Eight disciplines under one appointment instead of eight.',
    summary:
      'A multidisciplinary consultancy covering architecture through to quantity surveying. A project is designed, costed, co-ordinated and planned here before it reaches site — which is the stage where buildability still changes the cost, and where most of the savings on a programme are actually available.',
    capabilities: [
      'Architecture',
      'Civil and structural engineering',
      'Electrical and electronics engineering',
      'Mechanical and fire engineering',
      'Town planning',
      'Project management',
      'Quantity surveying',
      'Cost control and reporting',
    ],
    image: '/disciplines/building-civil-engineering.jpg',
  },
  {
    slug: 'construction',
    role: 'Division three',
    title: 'Construction Delivery',
    strapline: 'Where the group self-performs.',
    summary:
      'Build capability across housing, schools, clinics and hospitals, industrial and factory buildings, refurbishment, roads and highways, and the civil engineering underneath all of it — for government, commercial, industrial and residential clients. The crews and the plant are ours, which is why the programme is ours to answer for.',
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
    image: '/sectors/sector-building.jpg',
  },
];

/** How the three fit together — the argument for the group existing at all. */
export const groupChain = [
  {
    n: '01',
    stage: 'Evaluate',
    division: 'Mining, Engineering & Energy',
    desc: 'Resource evaluation, geological modelling, mine planning and scheduling. The work that decides whether a project is worth building, and in what order.',
  },
  {
    n: '02',
    stage: 'Design and cost',
    division: 'Design & Engineering',
    desc: 'Architecture, civil and structural, electrical, mechanical and fire, town planning and quantity surveying — co-ordinated under one appointment.',
  },
  {
    n: '03',
    stage: 'Build',
    division: 'Construction Delivery',
    desc: 'Self-performed construction across buildings, civils and roads, with our own crews and our own plant on the critical path.',
  },
  {
    n: '04',
    stage: 'Power and close out',
    division: 'Mining, Engineering & Energy',
    desc: 'Solar and remote energy systems for the operating site, then closure and rehabilitation when it reaches the end of its life.',
  },
];

/**
 * PLACEHOLDER — the board.
 *
 * Nothing here is real. Names, roles and biographies all need replacing
 * before this page is shown to anyone, and the portraits are GENERATED
 * people — attaching a generated face to a real director's name would
 * misrepresent them, so swap both together.
 */
export type Director = {
  name: string;
  role: string;
  bio: string;
  /** Optional path to a real portrait. Falls back to a monogram. */
  photo?: string;
};

export const directors: Director[] = [
  {
    name: 'Director name',          // TODO
    role: 'Chairman', // TODO
    photo: '/people/dir-1.jpg',  // generated portrait — replace with the real person
    bio: 'Short biography — sector background, years in the industry, and the part of the group this director is accountable for.',
  },
  {
    name: 'Director name',          // TODO
    role: 'Chief Executive Officer', // TODO
    photo: '/people/dir-2.jpg',  // generated portrait — replace with the real person
    bio: 'Short biography — sector background, years in the industry, and the part of the group this director is accountable for.',
  },
  {
    name: 'Director name',          // TODO
    role: 'Managing Director, Construction', // TODO
    photo: '/people/dir-3.jpg',  // generated portrait — replace with the real person
    bio: 'Short biography — sector background, years in the industry, and the part of the group this director is accountable for.',
  },
  {
    name: 'Director name',          // TODO
    role: 'Director, Engineering', // TODO
    photo: '/people/dir-4.jpg',  // generated portrait — replace with the real person
    bio: 'Short biography — sector background, years in the industry, and the part of the group this director is accountable for.',
  },
];

/**
 * PLACEHOLDER — key staff.
 *
 * Portraits are generated, not photographs of real employees. Fine while
 * the names are placeholders; the moment a real person's name goes beside
 * one of these faces it must be replaced with that person's own photo.
 * Group by division so the page reads as a structure rather than a list.
 */
export type StaffMember = {
  name: string;
  role: string;
  division: string;
  photo?: string;
};

export const staff: StaffMember[] = [
  { name: 'Name', role: 'Mine Planning Manager',   division: 'Mining, Engineering & Energy', photo: '/people/staff-1.jpg' }, // TODO
  { name: 'Name', role: 'Energy Lead',             division: 'Mining, Engineering & Energy', photo: '/people/staff-2.jpg' }, // TODO
  { name: 'Name', role: 'Principal Engineer',      division: 'Design & Engineering', photo: '/people/staff-3.jpg' },         // TODO
  { name: 'Name', role: 'Senior Quantity Surveyor', division: 'Design & Engineering', photo: '/people/staff-4.jpg' },        // TODO
  { name: 'Name', role: 'Project Architect',       division: 'Design & Engineering', photo: '/people/staff-5.jpg' },         // TODO
  { name: 'Name', role: 'Contracts Manager',       division: 'Construction Delivery', photo: '/people/staff-6.jpg' },        // TODO
  { name: 'Name', role: 'Site Agent',              division: 'Construction Delivery', photo: '/people/staff-7.jpg' },        // TODO
  { name: 'Name', role: 'HSE Manager',             division: 'Construction Delivery', photo: '/people/staff-8.jpg' },        // TODO
];
