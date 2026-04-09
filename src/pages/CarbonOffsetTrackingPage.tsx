import PageTemplate from './PageTemplate';
import SystemLinks from '../components/SystemLinks';

const carbonSystems = [
  {
    title: 'Carbon calculator',
    href: 'https://bookings.dirt-trails.com/conservation/carbon',
  },
];

const CarbonOffsetTrackingPage = () => (
  <PageTemplate
    title="Carbon Offset Tracking"
    subtitle="Calculate and communicate emissions for travel products."
    heroBadge="Carbon Offset Tracking"
    heroText="Provide transparent emissions insight for itineraries, accommodations and transportation so partners can sell with confidence."
    imageNote="Placeholder for carbon calculation dashboard or infographic."
    beforeSections={<SystemLinks items={carbonSystems} />}
    sections={[
      {
        title: 'What it does',
        description:
          'The platform calculates emissions for every itinerary component and maps offset contributions to products, suppliers and guest communications.',
        items: [
          'Itinerary-level footprint calculations for accommodations, transport and activities',
          'Automated offset recommendations and cost allocation per booking',
          'Supplier emissions factors and transport mode differentiation',
        ],
      },
      {
        title: 'Operational benefit',
        description:
          'Use emissions data to create premium responsible packages, support partner compliance and simplify sustainability reporting.',
        items: [
          'Offset commitments mapped to each reservation and supplier partner',
          'Guest-facing disclosure with carbon breakdown and project transparency',
          'Partner-ready reporting for CSR, agency and distribution channels',
        ],
      },
      {
        title: 'Reporting and transparency',
        description:
          'Make carbon tracking easy to share with stakeholders and use the data to demonstrate responsible tourism performance.',
        items: [
          'Exportable carbon summaries for partners and corporate buyers',
          'Dashboard views for offset, emissions and project allocations',
          'Clear environmental claims backed by documented calculation methods',
        ],
      },
      {
        title: 'Systems delivered',
        description:
          'Systems we’ve deployed for this capability help operators run carbon tracking through a connected platform.',
        items: [
          'Carbon calculator',
        ],
      },
    ]}
  />
);

export default CarbonOffsetTrackingPage;
