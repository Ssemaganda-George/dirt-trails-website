import PageTemplate from './PageTemplate';

const SustainabilityPage = () => (
  <PageTemplate
    title="Sustainability"
    subtitle="Responsible travel operations with measurable impact."
    heroBadge="Sustainability"
    heroText="Deliver transparency and accountability across every booking, supplier and experience with platform tools for impact reporting, carbon tracking and responsible sourcing."
    imageNote="Dashboard-style impact overview or sustainability illustration."
    sections={[
      {
        title: 'Why it matters',
        description:
          'Sustainability is now a business requirement for partners, travelers and investors. Our platform helps you turn responsibility into a competitive advantage.',
        items: ['Clear metrics for carbon, community and compliance', 'Verified reporting for partners and stakeholders', 'Premium positioning for responsible travel products'],
      },
      {
        title: 'Platform capability',
        description:
          'Embedded sustainability workflows mean your team does not need a separate system for impact tracking — it is part of every booking and supplier connection.',
        items: ['Carbon offset calculation', 'Community impact tracking', 'Supplier vetting and ethical sourcing'],
      },
    ]}
  />
);

export default SustainabilityPage;
