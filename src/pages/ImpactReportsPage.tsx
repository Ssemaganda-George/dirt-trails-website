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
          'Create clear reports that combine bookings, revenue, carbon and community impact into a single narrative for partners and stakeholders.',
        items: [
          'Exportable dashboards for sustainability, sales and supplier performance',
          'Pre-built summaries for guests, corporate buyers and distribution partners',
          'Custom report filters for date range, destination and product type',
        ],
      },
      {
        title: 'Why it matters',
        description:
          'Impact reports help you demonstrate credibility, reduce partner friction and support responsible tourism claims with measurable data.',
        items: [
          'Stronger reporting for investors, agencies and impact programs',
          'Clear evidence for sustainability certifications and partner commitments',
          'Faster decision-making through aligned operational and commercial metrics',
        ],
      },
      {
        title: 'Reporting formats',
        description:
          'Use the platform to generate internal summaries, guest-facing impact statements and partner-ready briefing decks.',
        items: [
          'PDF and dashboard exports for stakeholder meetings',
          'Impact summaries that include carbon, community and supplier metrics',
          'Shared report links for sales, marketing and partner teams',
        ],
      },
    ]}
  />
);

export default ImpactReportsPage;
