import PageTemplate from './PageTemplate';

const TreeTrackingPage = () => (
  <PageTemplate
    title="Tree Tracking & Geotagging"
    subtitle="Verify conservation impact with location-based tracking."
    heroBadge="Tree Tracking"
    heroText="Capture the environmental contribution of reforestation and community conservation projects with geotagged tracking and verified reporting."
    imageNote="Placeholder for geotagging map or tree tracking visual."
    sections={[
      {
        title: 'What is included',
        description:
          'Track plantings with location data, verify growth progress and share responsible tourism impact with partners and guests.',
        items: ['Geotagged tree planting records', 'Verification-ready project summaries', 'Integration with impact dashboards'],
      },
      {
        title: 'Operational value',
        description:
          'This capability helps operators demonstrate authentic environmental action and build stronger stories for sustainability-minded partners.',
        items: ['Stronger sustainability storytelling', 'Verified impact for responsible products', 'Improved partner and guest confidence'],
      },
    ]}
  />
);

export default TreeTrackingPage;
