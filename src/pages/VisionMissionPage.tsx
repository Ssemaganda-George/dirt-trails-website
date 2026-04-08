import PageTemplate from './PageTemplate';

const VisionMissionPage = () => (
  <PageTemplate
    title="Vision & Mission"
    subtitle="Build travel businesses that are profitable, responsible and future-ready."
    heroBadge="Vision & Mission"
    heroText="Our vision is to make travel technology accessible, intelligent and impactful for operators and partners. Our mission is to enable sustainable growth through better data, better systems and better support."
    imageNote="Conceptual image or data visualization for vision and mission."
    sections={[
      {
        title: 'Vision',
        description:
          'To be the trusted travel technology partner for operators who want to sell responsibly, grow profitably and partner globally.',
      },
      {
        title: 'Mission',
        description:
          'To provide a single platform that combines bookings, distribution, sustainability and research support into a high-value solution for travel teams.',
      },
    ]}
  />
);

export default VisionMissionPage;
