import PageTemplate from './PageTemplate';
import SystemLinks from '../components/SystemLinks';

const treeTrackingSystems = [
  {
    title: 'Tree map',
    href: 'https://bookings.dirt-trails.com/conservation/geotagging',
  },
];

const TreeTrackingPage = () => (
  <PageTemplate
    title="Tree Tracking & Geotagging"
    subtitle="Verify conservation impact with location-based tracking."
    heroBadge="Tree Tracking"
    heroText="Capture the environmental contribution of reforestation and community conservation projects with geotagged tracking and verified reporting."
    imageNote=""
    beforeSections={<SystemLinks items={treeTrackingSystems} />}
    sections={[
      {
        title: 'What is included',
        description:
          'Track plantings with precise location data, verify growth progress and share responsible tourism impact with partners and guests.',
        items: [
          'Geotagged tree planting records with site coordinates and species details',
          'Verification-ready project summaries for donors, guests and partners',
          'Integration with impact dashboards and responsible tourism packages',
        ],
      },
      {
        title: 'Why it matters',
        description:
          'This capability helps operators demonstrate authentic environmental action and build stronger sustainability stories for products and partners.',
        items: [
          'Stronger conservation storytelling with mapped project evidence',
          'Verified impact for responsible packages and guest communications',
          'Improved partner confidence through traceable project data',
        ],
      },
      {
        title: 'Partner value',
        description:
          'Use geotagged tracking to differentiate your programs, attract eco-minded guests and support local community initiatives.',
        items: [
          'Clear evidence of restoration and conservation investment',
          'Better transparency for sustainability claims and certifications',
          'Stronger collaboration with local planting and conservation partners',
        ],
      },
      {
        title: 'Systems delivered',
        description:
          'Systems we’ve deployed for this capability help operators run geotagging and conservation tracking through a connected platform.',
        items: [
          'Tree map',
        ],
      },
    ]}
  />
);

export default TreeTrackingPage;
