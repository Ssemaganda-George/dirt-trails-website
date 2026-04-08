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
          'We capture booking, channel, revenue and sustainability metrics so you can compare performance with confidence.',
        items: ['Bookings by product and channel', 'Revenue and margin performance', 'Carbon and impact metrics'],
      },
      {
        title: 'How partners use it',
        description:
          'Data helps partners make better decisions around pricing, product design and sustainability programs.',
        items: ['Informed pricing strategy', 'Evidence for partner planning', 'Clear KPIs for stakeholder reporting'],
      },
    ]}
  />
);

export default DataMetricsPage;
