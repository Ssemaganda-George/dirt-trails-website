import PageTemplate from './PageTemplate';

const CaseStudiesPage = () => (
  <PageTemplate
    title="Case Studies"
    subtitle="Real operator stories that demonstrate platform value."
    heroBadge="Case Studies"
    heroText="Review how travel operators have improved bookings, partner reach and sustainability outcomes with Dirt Trails."
    imageNote="Image Loading"
    sections={[
      {
        title: 'Recent results',
        description:
          'These examples show how operators and partners became more efficient, more transparent and more competitive with the platform.',
        items: [
          'A safari operator increased partner bookings by 28% through managed distribution feeds',
          'A lodge reduced manual supplier coordination time by 40% with automated confirmations',
          'A conservation tourism program delivered verified community impact reporting to funders',
        ],
      },
      {
        title: 'What stakeholders see',
        description:
          'Case studies help partners understand the value of the platform through measurable outcomes and clearer business stories.',
        items: [
          'Stronger sales performance from consistent product delivery',
          'Better sustainability credibility backed by data',
          'Faster expansion into new markets with partner-ready workflows',
        ],
      },
      {
        title: 'Platform value',
        description:
          'Operators use the platform to reduce risk, improve partner trust and make data-driven decisions across sales, operations and sustainability.',
        items: [
          'Improved partner coordination with reliable channel feeds',
          'More consistent pricing and commission workflows',
          'Verified reporting for guests, agencies and buyers',
        ],
      },
    ]}
  />
);

export default CaseStudiesPage;
