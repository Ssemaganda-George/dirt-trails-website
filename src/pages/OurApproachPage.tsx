import PageTemplate from './PageTemplate';

const OurApproachPage = () => (
  <PageTemplate
    title="Our Approach"
    subtitle="Practical, measurable sustainability and technology for travel businesses."
    heroBadge="Approach"
    heroText="We combine local market experience, platform automation and impact metrics so operators can deliver growth that is responsible and repeatable."
    imageNote="Illustration showing process flow, people, or impact journey."
    sections={[
      {
        title: 'How we work',
        description:
          'We focus on practical solutions that integrate operations, distribution and sustainability in a way travel partners can adopt quickly.',
        items: ['Modular workflows for supplier, channel and product management', 'Integrated impact tracking in booking flows', 'Partner desk support for launch and scale'],
      },
      {
        title: 'What makes it different',
        description:
          'Rather than separate tools, we deliver one platform where commerce and responsibility exist together — making it easier to sell premium travel while meeting stakeholder expectations.',
        items: ['Research-led product decisions', 'Clear data for partner confidence', 'Sustainability built into the core platform'],
      },
    ]}
  />
);

export default OurApproachPage;
