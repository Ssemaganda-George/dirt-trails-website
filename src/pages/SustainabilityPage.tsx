import PageTemplate from './PageTemplate';

const SustainabilityPage = () => (
  <PageTemplate
    title="Sustainability"
    subtitle="Responsible travel operations with measurable impact."
    heroBadge="Sustainability"
    heroText="Turn every booking into a verified sustainability story with carbon, community and supplier accountability built into your travel operations."
    imageNote="Dashboard-style impact overview or sustainability illustration."
    sections={[
      {
        title: 'Business outcomes',
        description:
          'Operators and partners demand more than promises. Our platform helps you quantify impact, reduce risk and win bookings with trusted sustainability credentials.',
        items: [
          'Carbon and community metrics tied to itineraries, accommodations and transport legs',
          'Verified reporting for corporate buyers, travel agents and eco-conscious guests',
          'Supplier standards and ethical sourcing controls embedded in product workflows',
        ],
      },
      {
        title: 'How it works',
        description:
          'Embed sustainability into the booking lifecycle so tracking, reporting and partner compliance happen automatically as part of every reservation.',
        items: [
          'Capture emissions factors and offset costs during booking',
          'Track community contributions by destination, program and supplier',
          'Maintain audit trails for supplier certifications, local partnerships and impact claims',
        ],
      },
    ]}
  />
);

export default SustainabilityPage;
