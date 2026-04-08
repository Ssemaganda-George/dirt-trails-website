import PageTemplate from './PageTemplate';

const FeaturesPage = () => (
  <PageTemplate
    title="Features"
    subtitle="The platform capabilities that power modern travel operations."
    heroBadge="Features"
    heroText="Explore the core capabilities that make Dirt Trails a powerful platform for bookings, distribution, sustainability and partner support."
    imageNote="Placeholder for feature overview grid or product UI."
    sections={[
      {
        title: 'Commercial features',
        description:
          'Booking engine, channel management and payment integration work together to keep operations efficient and scalable.',
        items: ['Package inventory and agent pricing', 'Channel connectivity for OTA and trade', 'Payments with local and international options'],
      },
      {
        title: 'Support features',
        description:
          'Research reports, partner support and impact dashboards help teams make smarter decisions and launch with confidence.',
        items: ['Partner desk onboarding and training', 'Market intelligence and analytics', 'Impact reporting and supplier vetting'],
      },
    ]}
  />
);

export default FeaturesPage;
