import PageTemplate from './PageTemplate';

const VisionMissionPage = () => (
  <PageTemplate
    title="Vision, Mission & Core Values"
    subtitle="How Dirt Trails builds travel technology for operators, partners and impact programs."
    heroBadge="Vision, Mission & Core Values"
    heroText="Our vision is to make travel intelligence practical for every travel business."
    imageNote="Image Loading"
    sections={[
      {
        title: 'Vision',
        description:
          'To build Africas Safari technology infrastructure for operators and suppliers across Africa and international markets.',
      },
      {
        title: 'Mission',
        description:
          'To empower the travel eco system with responsible, digital and innovative solutions for bookings, partner distribution, supplier accountability and impact tracking.',
      },
      {
        title: 'Core Values',
        description:
          '',
        items: ['Sustainability', 'Innovation', 'Integrity', 'Professionalism'],
      },
    ]}
  />
);

export default VisionMissionPage;
