/**
 * LKMD's own content, taken verbatim or near-verbatim from the company
 * profile PDF (30pp). Unlike lib/content.ts, nothing in this file is
 * invented — it is the client's own wording, lightly edited for the web.
 *
 * Two things the profile itself leaves open, marked TODO below:
 *   - member affiliations and certifications (the PDF says "LKMD to list")
 *   - project references (the PDF page reads "TO BE INCLUDED ONCE PROVIDED")
 */

/* ── Who we are ───────────────────────────────────────────── */
export const whoWeAre = [
  'We are a professional, multi-disciplinary and leading construction company, passionate about delivering high-quality building and civil engineering contracts on time and within budget.',
  'We operate throughout the United Kingdom and the African continent, providing services to clients in the government, commercial, industrial and residential markets.',
  'Our extensive range of skills means we are a one-stop shop for building and civil engineering construction services — with a high level of technical competence, local knowledge and excellent customer service.',
];

export const coreValues = [
  { title: 'Integrity',      desc: 'Upholding transparency and ethical practices in all business dealings.' },
  { title: 'Excellence',     desc: 'Striving for superior quality in every project.' },
  { title: 'Innovation',     desc: 'Embracing technology and creativity to deliver future-ready solutions.' },
  { title: 'Sustainability', desc: 'Prioritising environmentally friendly practices and solutions.' },
  { title: 'Collaboration',  desc: 'Building strong partnerships with stakeholders to achieve mutual success.' },
];

export const vision =
  'To be a globally recognised leader in engineering and construction, driving sustainable growth and innovation while empowering communities and creating impactful infrastructure.';

export const mission =
  'To provide world-class engineering, construction and management services that are efficient, reliable and environmentally conscious, fostering long-term partnerships built on trust and excellence.';

/* ── Why choose us ────────────────────────────────────────── */
export const whyChooseUs = [
  {
    title: 'Experience and expertise',
    body: 'With years of operation in the UK, we possess significant depth and breadth of knowledge in construction matters and project management. Our engineering capabilities allow us to technically support projects of high complexity, ensuring delivery on time and within budget.',
  },
  {
    title: 'Global knowledge',
    body: 'Our experience across both public and private sectors in the UK and Africa has allowed us to build strong local knowledge and develop important relationships and networks. Understanding local markets and communities is a distinct advantage on our projects.',
  },
  {
    title: 'Managing complexity',
    body: 'Our client relationships are built on a deep understanding of diverse construction disciplines and expert project management. This lets us streamline activities effectively and deliver quality projects consistently.',
  },
  {
    title: 'Commitment to quality',
    body: 'We have a passion for delivering high-quality building and civil engineering contracts — and we measure ourselves on whether the finished work stands up, not on how the programme looked on paper.',
  },
];

/* ── What we do ───────────────────────────────────────────── */
export const whatWeDo = [
  { title: 'Private and public housing',            image: '/lkmd/site-team.jpg' },
  { title: 'Factories and industrial buildings',    image: '/lkmd/tower.jpg' },
  { title: 'Offices and retail units',              image: '/lkmd/skybridge.jpg' },
  { title: 'Schools and hospitals',                 image: '/lkmd/concrete.jpg' },
  { title: 'Public buildings',                      image: '/lkmd/highrise.jpg' },
  { title: 'Civil engineering infrastructure',      image: '/lkmd/crane-sunset.jpg' },
];

/* ── Three core categories ────────────────────────────────── */
export const coreServices = [
  {
    title: 'Construction',
    body: 'Projects continue to grow in complexity. We provide a full range of professional construction services, from simple refurbishments to major new building projects — highly experienced, with detailed local knowledge across the UK and Africa, and the skills to manage the most complicated projects expertly.',
    image: '/lkmd/site-team.jpg',
  },
  {
    title: 'Construction management',
    body: 'Professional construction management is vital to project success. We offer pre-construction planning and design, construction monitoring, site management, expert construction services and overall project management — a fully integrated approach from a responsive firm.',
    image: '/lkmd/engineer-white.jpg',
  },
  {
    title: 'Engineering',
    body: 'Our advanced technical competence allows us to expertly manage complex engineering projects. Our engineers work across a wide range of contracts and disciplines, on infrastructure and building projects for private and public clients across the UK and Africa.',
    image: '/lkmd/tower.jpg',
  },
];

/* ── Key service areas ────────────────────────────────────── */
export const serviceAreas = [
  {
    title: 'Property development support',
    body: 'Leveraging our consulting, engineering and construction expertise, we support residential and commercial property development — managing projects from inception to completion, including office buildings, retail complexes and residential structures.',
  },
  {
    title: 'Refurbishment',
    body: 'A wide range of refurbishment and decoration projects for commercial, domestic and public sector clients, from minor redecorations to full building refurbishments and maintenance contracts.',
  },
  {
    title: 'Renovation works',
    body: 'We support private and public sector landlords in renovating and managing properties — whether a single building investment or a large-scale residential programme.',
  },
  {
    title: 'Repairs and maintenance',
    body: 'Ongoing repair and maintenance for all property types, to keep them in excellent condition and prevent major issues. One-stop, from minor repairs through to major engineering works.',
  },
  {
    title: 'Civil and structural engineering',
    body: 'Detailed designs, engineering reports and technical calculations for construction works, ensuring projects are expertly planned and managed.',
  },
  {
    title: 'Design management and Design & Construct',
    body: 'Extensive experience in design management and Design & Construct. We can manage your building and engineering project from the design phase through to completion.',
  },
];

/* ── Our approach ─────────────────────────────────────────── */
export const approachPoints = [
  {
    title: 'Long-lasting change',
    body: 'Our operations aim to bring long-lasting positive change to the communities we serve through our clients. Our management strategies focus on transforming business practices for the better.',
  },
  {
    title: 'Relationships, not transactions',
    body: 'We strive to build long-term relationships with every client, aligning with our vision for sustainability and ensuring the long-term success of our organisation.',
  },
  {
    title: 'Reputational risk, managed',
    body: 'We are committed to managing reputational risk — from environmental impact and customer care through to health and safety procedures. It is an integral part of our internal controls.',
  },
  {
    title: 'The right people on the right job',
    body: 'Team members are assigned to projects based on the specific knowledge and expertise relevant to the task, so functional expertise and experience are leveraged for the best outcome.',
  },
];

/* ── Organisational structure (real headcount from the profile) ── */
export const orgDepartments = [
  {
    name: 'Office Administrative',
    roles: [
      { role: 'General Secretary', n: 3 },
      { role: 'Social Facilitator', n: 1 },
      { role: 'HR Officer', n: 1 },
      { role: 'Interns', n: 3 },
    ],
  },
  {
    name: 'Tender Administrative',
    roles: [
      { role: 'Quantity Surveyors', n: 8 },
      { role: 'Engineers', n: 3 },
      { role: 'Town Planners', n: 1 },
      { role: 'Interns', n: 4 },
    ],
  },
  {
    name: 'Quality Control',
    roles: [
      { role: 'QC Officers', n: 3 },
      { role: 'QA Officer', n: 1 },
      { role: 'QM Trainers', n: 1 },
      { role: 'Interns', n: 1 },
    ],
  },
  {
    name: 'Logistics',
    roles: [
      { role: 'Procurement Officers', n: 2 },
      { role: 'Drivers', n: 4 },
      { role: 'Marketers', n: 2 },
      { role: 'Interns', n: 1 },
    ],
  },
  {
    name: 'Project Management',
    roles: [
      { role: 'Architects', n: 3 },
      { role: 'Project Managers', n: 4 },
      { role: 'Construction Managers', n: 6 },
      { role: 'Interns', n: 8 },
    ],
  },
  {
    name: 'Safety, Health and Environment',
    roles: [
      { role: 'SHE Officers', n: 4 },
      { role: 'First Aid Officers', n: 3 },
      { role: 'OHS Trainers', n: 2 },
      { role: 'Interns', n: 3 },
    ],
  },
  {
    name: 'Site Management',
    roles: [
      { role: 'Site Managers', n: 4 },
      { role: 'Site Supervisors', n: 4 },
      { role: 'Foremen', n: 8 },
      { role: 'Interns', n: 7 },
    ],
  },
];

export const orgLeadership = ['Board of Directors', 'Managing Director', 'Deputy Managing Director 1', 'Deputy Managing Director 2'];

/** Derived from the org chart, so the figures cannot drift from it. */
export const headcount = {
  total:   orgDepartments.reduce((t, d) => t + d.roles.reduce((s, r) => s + r.n, 0), 0),
  interns: orgDepartments.reduce((t, d) => t + d.roles.filter(r => r.role === 'Interns').reduce((s, r) => s + r.n, 0), 0),
  departments: orgDepartments.length,
};

/* ── Safety ───────────────────────────────────────────────── */
export const safetyIntro = [
  'LKMD believes the human element is paramount in all projects we undertake. We are committed to upholding health and safety standards that exceed legislative requirements in the UK.',
  'We ensure awareness of health and safety precautions through regular training and site inductions for our staff and subcontractors. Safety is embedded in our company values, empowering our team to report any safety concern immediately.',
];

export const safetyAims = [
  'Provide a safe and healthy environment for everyone involved in our projects.',
  'Allocate expertise and resources to implement and maintain our health and safety policy.',
  'Continuously improve our systems through regular training and workshops.',
  'Implement robust health and safety management processes.',
  'Prevent accidents and incidents.',
  'Assess, manage, control and reduce risks.',
  'Implement hazard reduction strategies.',
  'Promote a culture of health and continual improvement.',
];

/* ── Clients ──────────────────────────────────────────────── */
export const clientTypes = [
  'Government agencies',
  'Local authorities',
  'Commercial developers',
  'Industrial businesses',
  'Private residential clients',
];

/* ── LKMD Cares ───────────────────────────────────────────── */
export const caresIntro =
  'LKMD is committed to making a positive impact beyond our construction projects. We believe in supporting the communities in which we work and operating in an environmentally responsible manner.';

export const caresPoints = [
  'Training and development opportunities.',
  'Supporting local employment and supply chains.',
  'Charitable contributions and partnerships.',
  'Sustainable construction practices and waste reduction.',
];

/* ── Accreditations ───────────────────────────────────────── */
// The profile says "LKMD to list their specific industry affiliations,
// memberships (e.g. CIOB, ICE) and certifications (e.g. ISO standards,
// CHAS, Constructionline)" — i.e. these are not yet confirmed.
export const affiliationsTodo = ['CIOB', 'ICE', 'ISO standards', 'CHAS', 'Constructionline']; // TODO: confirm which are actually held
