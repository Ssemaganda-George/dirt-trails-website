import PageTemplate from './PageTemplate';

const CarbonOffsetTrackingPage = () => (
  <PageTemplate
    title="Carbon Offset Tracking"
    subtitle="Calculate and communicate emissions for travel products."
    heroBadge="Carbon Offset Tracking"
    heroText="Provide transparent emissions insight for itineraries, accommodations and transportation so partners can sell with confidence."
    imageNote="Placeholder for carbon calculation dashboard or infographic."
    sections={[
      {
        title: 'What it does',
        description:
          'Our platform estimates carbon emissions for travel products and shows how offset contributions can be used to meet responsible tourism goals.',
        items: ['Itinerary-level footprint calculations', 'Supplier and transport emissions analysis', 'Offset reporting for partner communications'],
      },
      {
        title: 'Why it matters',
        description:
          'Partners and guests expect clear environmental transparency. This page helps operators demonstrate that responsible travel is real, measurable and achievable.',
        items: ['Trust through measurable reporting', 'Premium product differentiation', 'Simplified claims for sustainability partners'],
      },
    ]}
  />
);

export default CarbonOffsetTrackingPage;
