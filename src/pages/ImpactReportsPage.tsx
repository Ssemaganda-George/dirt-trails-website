import PageTemplate from './PageTemplate';

const ImpactReportsPage = () => (
  <PageTemplate
    title="Impact Reports"
    subtitle="Turn data into stakeholder-ready sustainability and performance reports."
    heroBadge="Impact Reports"
    heroText="Build reports that compare operational performance with environmental and social metrics so partners can see the full value of your travel products."
    imageNote="Placeholder for report page, charts or PDF preview."
    sections={[
      {
        title: 'What you can do',
        description:
          'Generate concise, credible reports that show revenue, sustainability and partner impact in a single view.',
        items: ['Operational performance dashboards', 'Carbon and community impact summaries', 'Partner-ready presentation materials'],
      },
      {
        title: 'Why it matters',
        description:
          'Impact reports make it easier for stakeholders to measure success, spot opportunities and support responsible growth.',
        items: ['Stronger reporting for investors and partners', 'Clear evidence for responsible tourism claims', 'Faster decision-making with aligned metrics'],
      },
    ]}
  />
);

export default ImpactReportsPage;
