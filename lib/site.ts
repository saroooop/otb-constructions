/**
 * Final website copy.
 *
 * Source: "LKMD Construction – Website Content & Site Map (Final)",
 * 22 November 2026. The brief says "publish the copy exactly as written",
 * so this file holds it verbatim. Anything the brief marks [To be supplied]
 * is an empty string here, and every component that renders one of those
 * fields must hide the whole line when it is empty — the brief is explicit
 * that no placeholder text may appear on the live site.
 */

/* ── Navigation: six sections, 18 pages ───────────────────── */
export const mainNav = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about-us',
    children: [
      { label: 'Who We Are',     href: '/about-us' },
      { label: 'Our People',     href: '/about-us/our-people' },
      { label: 'Health & Safety', href: '/about-us/health-safety' },
      { label: 'LKMD Cares',     href: '/about-us/lkmd-cares' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services',                        href: '/services' },
      { label: 'Building Construction',               href: '/services/building-construction' },
      { label: 'Civil & Structural Engineering',      href: '/services/civil-structural-engineering' },
      { label: 'Refurbishment, Renovation & Maintenance', href: '/services/refurbishment-renovation-maintenance' },
      { label: 'Construction Management',             href: '/services/construction-management' },
      { label: 'Design & Construct',                  href: '/services/design-and-construct' },
      { label: 'Property Development Support',        href: '/services/property-development-support' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Careers',  href: '/careers' },
  { label: 'Contact',  href: '/contact' },
];

/* ── The standard call-to-action band ─────────────────────── */
export const ctaBand = {
  heading: 'Looking for an expert team to manage your construction requirements?',
  body: 'Get in touch with LKMD today. Tell us what you need built and where, and we will be delighted to help.',
  buttons: [
    { label: 'Start a project', href: '/contact' },
    { label: 'See our projects', href: '/projects' },
  ],
};

/* ── Home ─────────────────────────────────────────────────── */
export const home = {
  title: 'LKMD Construction | Building & Civil Engineering Contractor, South Africa',
  description:
    'LKMD Construction plans, designs and builds schools, housing, public buildings, industrial facilities and civil infrastructure for clients across South Africa.',
  heroHeadline: 'Quality building and civil engineering, delivered on time and within budget',
  heroBody:
    'LKMD Construction is a multi-disciplinary construction company. We plan, design and build for government, commercial, industrial and residential clients across South Africa, from offices in Centurion, Cape Town, Durban and East London.',
  introHeading: 'A one-stop shop for planning, design and construction',
  introBody:
    'Our range of skills means one company can take your project from early planning and design through to construction and handover. Clients get strong technical competence, local knowledge and a team that stays responsive from start to finish.',
  whyHeading: 'Why choose LKMD',
  why: [
    { title: 'Experience and expertise', body: 'Our engineers and construction managers support technically complex projects and keep them on time and within budget.' },
    { title: 'Local knowledge',          body: 'We work with public and private clients in several provinces, and we understand the communities and local markets where we build.' },
    { title: 'Managing complexity',      body: 'We understand the many disciplines on a construction site and coordinate them closely, so projects run smoothly.' },
    { title: 'Commitment to quality',    body: 'Quality control and quality assurance are a department of their own at LKMD, not an afterthought.' },
  ],
  caresLine: {
    heading: 'Building stronger communities',
    body: 'We create training opportunities, support local jobs and suppliers, and work to reduce waste on every site.',
  },
};

/** Clients. Logo files are still to come; names publish now. */
export const clients = [
  'Coega Development Corporation',
  'Development Bank of Southern Africa',
  'Eastern Cape Development Corporation',
  'Independent Development Trust',
  'KwaZulu-Natal Department of Health',
  'PURCO SA (Purchasing Consortium Southern Africa)',
  'The Mvula Trust',
];

export const clientTypes = [
  'Government agencies',
  'Local authorities',
  'Commercial developers',
  'Industrial businesses',
  'Private residential clients',
];

/* ── The six services ─────────────────────────────────────── */
export type Service = {
  slug: string;
  title: string;
  short: string;
  image: string;
  pageTitle: string;
  description: string;
  heading: string;
  intro: string;
  sections: { heading: string; items: { title: string; body: string }[] }[];
  note?: string;
  relatedProjects: string[];
};

export const services: Service[] = [
  {
    slug: 'building-construction',
    title: 'Building Construction',
    short: 'Housing, schools, hospitals, offices, retail, factories and public buildings, from new builds to major extensions.',
    image: '/lkmd/site-team.jpg',
    pageTitle: 'Building Construction Contractor | LKMD Construction',
    description:
      'LKMD Construction builds housing, schools, hospitals, offices, retail units, factories and public buildings for public and private clients in South Africa.',
    heading: 'New buildings, delivered complete and ready for use',
    intro:
      'We construct residential, commercial, industrial and public buildings for government and private clients, and deliver them on time and within budget.',
    sections: [
      {
        heading: 'What we build',
        items: [
          { title: 'Housing', body: 'Private and public housing, from individual homes to large residential developments.' },
          { title: 'Schools and hospitals', body: 'New education and healthcare facilities, and extensions to existing ones.' },
          { title: 'Offices and retail units', body: 'Commercial buildings for owners, developers and tenants.' },
          { title: 'Factories and industrial buildings', body: 'Warehouses, factories and industrial facilities.' },
          { title: 'Public buildings', body: 'Facilities for national, provincial and local government.' },
        ],
      },
      {
        heading: 'How we deliver',
        items: [
          { title: 'Planned from the start', body: 'Our project managers set the programme, resources and risks before work begins.' },
          { title: 'Run by experienced site teams', body: 'Site managers, supervisors and foremen manage the work every day.' },
          { title: 'Checked at every stage', body: 'Our Quality Control department checks materials and workmanship through to handover.' },
          { title: 'Safe by design', body: 'Every site has inductions, risk assessments and SHE officers.' },
        ],
      },
    ],
    relatedProjects: [
      'athlone-girls-high-school-johannesburg',
      'saps-ennerdale-police-station-ennerdale',
      'wk-duplesis-primary-school-boksburg',
      'new-montic-factory-primary-school-boksburg',
      'veritas-warehouse-nelspruit',
      'mega-city-housing-randfontein',
    ],
  },
  {
    slug: 'civil-structural-engineering',
    title: 'Civil & Structural Engineering',
    short: 'Roads, new routes and infrastructure, backed by in-house designs, engineering reports and calculations.',
    image: '/lkmd/tower.jpg',
    pageTitle: 'Civil & Structural Engineering | LKMD Construction',
    description:
      'Roads, highways, new routes and infrastructure projects, plus engineering designs, reports and calculations, from LKMD Construction.',
    heading: 'Infrastructure built on sound engineering',
    intro:
      'Our engineers work across a wide range of disciplines on infrastructure and building projects for public and private clients. As a specialist engineering and construction company, we can manage all of a client’s engineering requirements.',
    sections: [
      {
        heading: 'What we build',
        items: [
          { title: 'Roads and highways', body: 'New roads, highways and new routes.' },
          { title: 'Repairs and maintenance programmes', body: 'Planned repair and maintenance of existing infrastructure.' },
          { title: 'Civil works for building projects', body: 'The engineering and civil works that new buildings need.' },
        ],
      },
    ],
    note:
      'We provide detailed designs, engineering reports and technical calculations for construction works, so every project is properly planned before it starts and expertly managed as it is built.',
    relatedProjects: [],
  },
  {
    slug: 'refurbishment-renovation-maintenance',
    title: 'Refurbishment, Renovation & Maintenance',
    short: 'From minor repairs and redecoration to full refurbishments and planned maintenance contracts.',
    image: '/lkmd/concrete.jpg',
    pageTitle: 'Refurbishment, Renovation & Maintenance | LKMD Construction',
    description:
      'Refurbishment, renovation, repairs and maintenance for commercial, residential and public sector properties, from minor repairs to full refurbishments.',
    heading: 'Keeping buildings in excellent condition',
    intro:
      'From minor repairs and redecoration to full building refurbishments and long-term maintenance contracts, our team takes care of commercial, residential and public sector properties.',
    sections: [
      {
        heading: 'What we do',
        items: [
          { title: 'Refurbishment', body: 'Refurbishment and decoration projects for commercial, domestic and public sector clients, from minor redecoration to full building refurbishments.' },
          { title: 'Renovation works', body: 'We help private and public sector landlords renovate and manage their properties, from single buildings to large residential projects.' },
          { title: 'Repairs and maintenance', body: 'Ongoing repairs and maintenance for all types of property, to keep them in excellent condition and prevent major problems.' },
        ],
      },
    ],
    note:
      'We offer a one-stop solution, from minor repairs to major engineering works. Clients deal with one team, however large or small the job.',
    relatedProjects: ['five-inner-city-hostels-refurbishment-johannesburg'],
  },
  {
    slug: 'construction-management',
    title: 'Construction Management',
    short: 'Pre-construction planning, site management, construction monitoring and full project management.',
    image: '/lkmd/engineer-white.jpg',
    pageTitle: 'Construction & Project Management | LKMD Construction',
    description:
      'Pre-construction planning, construction monitoring, site management and project management services from LKMD Construction.',
    heading: 'Professional management from planning to handover',
    intro:
      'Professional construction management is vital to a project’s success. LKMD offers a comprehensive range of construction management services, with the scope and experience to provide a fully integrated approach.',
    sections: [
      {
        heading: 'Our construction management services',
        items: [
          { title: 'Pre-construction planning and design', body: 'Programme, budget, resources and risks agreed before work starts.' },
          { title: 'Construction monitoring', body: 'Progress, cost and quality tracked and reported throughout the build.' },
          { title: 'Site management', body: 'Experienced site managers and supervisors running the site every day.' },
          { title: 'Project management', body: 'One team coordinating design, construction and subcontractors to completion.' },
        ],
      },
    ],
    note:
      'Our Quality Control and Safety, Health & Environment departments support every project we manage, so standards are checked and kept from the first day on site to handover.',
    relatedProjects: [],
  },
  {
    slug: 'design-and-construct',
    title: 'Design & Construct',
    short: 'One team managing design and construction, from the first drawings to handover.',
    image: '/lkmd/crane-sunset.jpg',
    pageTitle: 'Design & Construct | LKMD Construction',
    description:
      'LKMD Construction manages building and engineering projects from the design phase through to completion under one design and construct contract.',
    heading: 'From the first drawing to the finished project',
    intro:
      'With extensive experience in design management and design and construct projects, our team can manage your building or engineering project from the design phase through to completion.',
    sections: [
      {
        heading: 'How it works',
        items: [
          { title: 'One point of responsibility', body: 'One team is accountable for both design and construction.' },
          { title: 'Design management', body: 'Our architects and engineers lead and coordinate the design, so it can be built efficiently.' },
          { title: 'Design informed by construction', body: 'The people who will build the project shape the design, which keeps cost and programme realistic.' },
          { title: 'Delivery to completion', body: 'The same team carries the project through construction to handover.' },
        ],
      },
    ],
    relatedProjects: [],
  },
  {
    slug: 'property-development-support',
    title: 'Property Development Support',
    short: 'Support for residential and commercial developers, from inception to completion.',
    image: '/lkmd/skybridge.jpg',
    pageTitle: 'Property Development Support | LKMD Construction',
    description:
      'Consulting, engineering and construction support for residential and commercial property developments, from inception to completion.',
    heading: 'Support for your development, from inception to completion',
    intro:
      'We bring our consulting, engineering and construction expertise to property developments for residential and commercial clients, and manage them from the first idea to the finished building.',
    sections: [
      {
        heading: 'What we support',
        items: [
          { title: 'Office buildings', body: '' },
          { title: 'Retail complexes', body: '' },
          { title: 'Residential developments', body: '' },
        ],
      },
      {
        heading: 'How we help',
        items: [
          { title: 'Early advice', body: 'Consulting and engineering input while the development is being planned.' },
          { title: 'Design and construction', body: 'Design management and construction delivered by one team.' },
          { title: 'Management to completion', body: 'Project management through to handover.' },
        ],
      },
    ],
    relatedProjects: [],
  },
];

/* ── The three areas of expertise (services overview) ─────── */
export const expertise = [
  { title: 'Construction', body: 'Construction projects keep growing in complexity. We have the skills and local knowledge to deliver them, from refurbishments to major new builds.' },
  { title: 'Construction management', body: 'Professional management is vital to a project’s success. We offer a fully integrated approach, from pre-construction planning to handover.' },
  { title: 'Engineering', body: 'Our engineers work across a wide range of disciplines on infrastructure and building projects for public and private clients.' },
];

/* ── The seven projects published at launch ───────────────── */
export type Project = {
  slug: string;
  title: string;
  town: string;
  province: string;
  sector: string;
  service: string;
  serviceSlug: string;
  onHome: boolean;
  summary: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: 'athlone-girls-high-school-johannesburg',
    title: 'Athlone Girls High School', town: 'Johannesburg', province: 'Gauteng',
    sector: 'Education', service: 'Building Construction', serviceSlug: 'building-construction',
    onHome: true,
    summary: 'LKMD Construction built Athlone Girls High School in Johannesburg, Gauteng.',
    image: '/lkmd/concrete.jpg',
  },
  {
    slug: 'five-inner-city-hostels-refurbishment-johannesburg',
    title: 'Five Inner City Hostels Refurbishment', town: 'Johannesburg', province: 'Gauteng',
    sector: 'Housing & Human Settlements', service: 'Refurbishment, Renovation & Maintenance',
    serviceSlug: 'refurbishment-renovation-maintenance', onHome: true,
    summary: 'LKMD Construction refurbished five inner-city hostels in Johannesburg, Gauteng.',
    image: '/lkmd/highrise.jpg',
  },
  {
    slug: 'saps-ennerdale-police-station-ennerdale',
    title: 'SAPS Ennerdale Police Station', town: 'Ennerdale', province: 'Gauteng',
    sector: 'Government & Public Buildings', service: 'Building Construction',
    serviceSlug: 'building-construction', onHome: true,
    summary: 'LKMD Construction built the South African Police Service station in Ennerdale, Gauteng.',
    image: '/lkmd/skybridge.jpg',
  },
  {
    slug: 'wk-duplesis-primary-school-boksburg',
    title: 'WK Duplesis Primary School', town: 'Boksburg', province: 'Gauteng',
    sector: 'Education', service: 'Building Construction', serviceSlug: 'building-construction',
    onHome: true,
    summary: 'LKMD Construction built WK Duplesis Primary School in Boksburg, Gauteng.',
    image: '/lkmd/site-team.jpg',
  },
  {
    slug: 'new-montic-factory-primary-school-boksburg',
    title: 'New Montic Factory Primary School', town: 'Boksburg', province: 'Gauteng',
    sector: 'Education', service: 'Building Construction', serviceSlug: 'building-construction',
    onHome: false,
    summary: 'LKMD Construction built New Montic Factory Primary School in Boksburg, Gauteng.',
    image: '/lkmd/engineers-laptop.jpg',
  },
  {
    slug: 'veritas-warehouse-nelspruit',
    title: 'Veritas Warehouse', town: 'Nelspruit', province: 'Mpumalanga',
    sector: 'Industrial & Commercial', service: 'Building Construction',
    serviceSlug: 'building-construction', onHome: true,
    summary: 'LKMD Construction built the Veritas warehouse in Nelspruit, Mpumalanga.',
    image: '/lkmd/tower.jpg',
  },
  {
    slug: 'mega-city-housing-randfontein',
    title: 'Mega City Housing', town: 'Randfontein', province: 'Gauteng',
    sector: 'Housing & Human Settlements', service: 'Building Construction',
    serviceSlug: 'building-construction', onHome: true,
    summary: 'LKMD Construction built housing for the Mega City housing project in Randfontein, Gauteng.',
    image: '/lkmd/crane-sunset.jpg',
  },
];

/* ── Enquiry form ─────────────────────────────────────────── */
export const enquiryTypes = [
  'A new construction project',
  'Refurbishment, repairs or maintenance',
  'Property development support',
  'Supplying or subcontracting',
  'Something else',
];

export const formMessages = {
  sent:    'Thank you. Your enquiry is with the LKMD team and we will reply as soon as we can.',
  error:   'Your enquiry could not be sent. Please try again, or email info@lkmd.co.za.',
  missing: 'This field is required.',
  consent: 'I agree that LKMD Construction may use these details to respond to my enquiry, as set out in the Privacy Notice.',
};

export const cookieBanner = {
  text: 'This website uses cookies to see how visitors use it, so we can improve it. You can accept or decline analytics cookies.',
  accept: 'Accept',
  decline: 'Decline',
  link: { label: 'Cookie Notice', href: '/cookie-notice' },
};

export const notFound = {
  heading: 'Page not found',
  body: 'We couldn’t find the page you were looking for. It may have moved, or the address may be mistyped.',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
  ],
};
