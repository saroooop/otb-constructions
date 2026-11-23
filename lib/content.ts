/**
 * Namibian mining market data.
 *
 * Source: Namibia Public-Private Forum, "Mining and Adjacent Sectors",
 * 23-24 October 2025 (Chamber of Mines of Namibia and Women in Mining
 * Association of Namibia). The deck is served at
 * /namppf-mining-adjacent-sectors.pdf and every figure below is cited on the
 * page, because this is another organisation's published research.
 */

export const marketStats = [
  { value: '13.3%',  label: 'Of Namibia’s GDP', sub: 'Large-scale mining, 2024' },
  { value: 'N$48B',  label: 'Foreign exchange',      sub: 'Over half the national total' },
  { value: 'US$2.8B', label: 'Capital pipeline',     sub: 'New and expansion projects to 2029' },
  { value: '18,148', label: 'Direct jobs in pipeline', sub: 'Across announced developments' },
];

export const marketSource =
  'Source: Namibia Public-Private Forum, “Mining and Adjacent Sectors”, 23–24 October 2025 — Chamber of Mines of Namibia and Women in Mining Association of Namibia.';

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

export const localContent = [
  { value: 'N$24B', label: 'Supplied by mining-linked MSMEs', sub: 'Goods and services to the sector, 2024' },
  { value: '~10,000', label: 'Artisanal and small-scale miners', sub: 'Supporting over 35,000 livelihoods' },
  { value: '18%', label: 'Women in the mining workforce', sub: 'Only 10% have held executive roles since 2009' },
  { value: '25%', label: 'Beneficiation target by 2030', sub: 'From under 10% today' },
];
