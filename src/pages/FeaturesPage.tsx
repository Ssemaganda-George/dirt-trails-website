import PageTemplate from './PageTemplate';

const FeaturesPage = () => (
  <PageTemplate
    title="Features"
    subtitle="The platform capabilities that power modern travel operations."
    heroBadge="Features"
    heroText="Explore the core modules that make Dirt Trails a reliable system for bookings, partner distribution, sustainability and operations."
    imageNote="Placeholder for feature overview grid or product UI."
    sections={[
      {
        title: 'Commercial core',
        description:
          'A configurable booking engine and channel layer gives you control over product creation, pricing and distribution in one place.',
        items: [
          'Flexible product bundles for tours, lodges and transport',
          'Agent and OTA channel feeds with live availability and rate rules',
          'Secure payments, local settlement and commission handling',
        ],
      },
      {
        title: 'Operations & partner support',
        description:
          'Tools for supplier management, partner workflows and customer handoff keep your operations predictable and easier to scale.',
        items: [
          'Partner desk onboarding, configuration and performance tracking',
          'Automated confirmations, supplier notifications and booking validation',
          'Market intelligence dashboards for yield, occupancy and partner performance',
        ],
      },
      {
        title: 'Sustainability and reporting',
        description:
          'Impact measurement is part of the product, so you can offer responsible tourism packages with real data and trusted reporting.',
        items: [
          'Carbon, community and supplier metrics linked to every booking',
          'Verified impact dashboards and exportable stakeholder reports',
          'Supplier vetting and ethical sourcing workflows for better product transparency',
        ],
      },
    ]}
  />
);

export default FeaturesPage;
