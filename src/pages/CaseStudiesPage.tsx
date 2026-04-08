import PageTemplate from './PageTemplate';

const CaseStudiesPage = () => (
  <PageTemplate
    title="Case Studies"
    subtitle="Real operator stories that demonstrate platform value."
    heroBadge="Case Studies"
    heroText="Review how travel operators have improved bookings, partner reach and sustainability outcomes with Dirt Trails."
    imageNote="Placeholder for case study visuals or timeline."
    sections={[
      {
        title: 'Operator impact',
        description:
          'Case studies show how the platform supports real businesses with bookings, distribution and operational efficiency.',
        items: ['Increased partner bookings through managed channels', 'Streamlined supplier operations for growth', 'Verified impact data for premium product placement'],
      },
      {
        title: 'What stakeholders see',
        description:
          'These stories help partners understand the value of the platform through measurable results and clear outcomes.',
        items: ['Stronger sales performance', 'Improved sustainability credibility', 'Faster scaling across new markets'],
      },
    ]}
  />
);

export default CaseStudiesPage;
