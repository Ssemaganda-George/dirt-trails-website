import PageTemplate from './PageTemplate';

const PartnershipsPage = () => (
  <PageTemplate
    title="Partnerships"
    subtitle="Collaboration with suppliers, travel partners and sustainability stakeholders."
    heroBadge="Partnerships"
    heroText="We help operators connect with the right partners, build verified supplier relationships and deliver shared value across the travel ecosystem."
    imageNote="Placeholder for partnership network visualization or partner logos."
    sections={[
      {
        title: 'Partner network',
        description:
          'Grow your reach with partners who value trust, quality and responsible product delivery.',
        items: ['Supplier relationships with verified standards', 'OTA and agent connectivity', 'Dedicated partner success support'],
      },
      {
        title: 'Shared outcomes',
        description:
          'Our partnerships are built to help travel businesses scale while making positive economic and environmental contributions.',
        items: ['Improved product consistency', 'Shared impact metrics', 'Stronger commercial trust'],
      },
    ]}
  />
);

export default PartnershipsPage;
