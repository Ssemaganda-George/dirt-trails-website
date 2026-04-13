import PageTemplate from './PageTemplate';

const VisionMissionPage = () => (
  <PageTemplate
    title="Vision, Mission & Core Values"
    subtitle="How Dirt Trails builds travel technology for operators, partners and impact programs."
    heroBadge="Vision, Mission & Core Values"
    heroText="Our vision is to make travel intelligence practical for every operator. Our mission is to unite bookings, distribution and sustainability into a single platform that helps travel teams grow with confidence."
    imageNote="Image Loading"
    sections={[
      {
        title: 'Vision',
        description:
          'To become the most trusted travel technology partner for operators and suppliers across East Africa and international markets, creating smarter, more sustainable journeys.',
      },
      {
        title: 'Mission',
        description:
          'To empower travel teams with one integrated platform for bookings, partner distribution, supplier accountability and impact tracking.',
      },
      {
        title: 'Core Values',
        description:
          'Our work is guided by local insight, practical delivery and measurable impact.',
        items: ['Local expertise, global ambition', 'Sustainability integrated into operations', 'Transparent data and responsible decisions', 'Partnerships built on trust and long-term value'],
      },
    ]}
  />
);

export default VisionMissionPage;
