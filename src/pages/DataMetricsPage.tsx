import PageTemplate from './PageTemplate';

const DataMetricsPage = () => (
  <PageTemplate
    title="Data & Metrics"
    subtitle="Performance data that drives smarter travel decisions."
    heroBadge="Data & Metrics"
    heroText="Use operational, commercial and sustainability metrics to guide growth, improve partner performance and highlight the business case for responsible travel."
    imageNote="Placeholder for metrics dashboard or KPI cards."
    sections={[
      {
        title: 'What is tracked',
        description:
          'We capture bookings, channel performance, revenue and sustainability metrics so you can measure product performance across the whole travel value chain.',
        items: [
          'Bookings and occupancy by product, date and channel',
          'Revenue, margin and commission performance',
          'Carbon, community and supplier impact metrics',
        ],
      },
      {
        title: 'How partners use it',
        description:
          'Partners use data to make smarter pricing, marketing and operational decisions with confidence.',
        items: [
          'Informed pricing strategies based on channel performance',
          'Evidence for partner planning and product development',
          'Clear KPIs for sustainability, sales and supplier teams',
        ],
      },
      {
        title: 'Decision support',
        description:
          'Bring stakeholders together with common metrics and reporting so your team can act faster on what matters most.',
        items: [
          'Dashboard views for bookings, revenue and impact',
          'Trend analysis for seasonality and partner performance',
          'Shared reports for operations, sales and sustainability teams',
        ],
      },
    ]}
  />
);

export default DataMetricsPage;
