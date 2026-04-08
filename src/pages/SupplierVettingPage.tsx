import PageTemplate from './PageTemplate';

const SupplierVettingPage = () => (
  <PageTemplate
    title="Supplier Vetting"
    subtitle="Ensure every partner meets your responsible tourism standards."
    heroBadge="Supplier Vetting"
    heroText="Create a trusted supplier ecosystem by managing qualifications, compliance and partner performance from one centralized platform."
    imageNote="Placeholder for supplier profile or vetting workflow visual."
    sections={[
      {
        title: 'What it enables',
        description:
          'Keep supplier standards consistent, verify credentials and ensure that every offering aligns with your operational and sustainability goals.',
        items: ['Supplier qualification tracking', 'Compliance checks for responsible tourism', 'Performance assessments and reviews'],
      },
      {
        title: 'Stakeholder impact',
        description:
          'Partners and stakeholders can trust that the products you distribute are built with quality, ethical sourcing and accountability in mind.',
        items: ['More reliable partner relationships', 'Clear expectations for local suppliers', 'Safer scaling across new markets'],
      },
    ]}
  />
);

export default SupplierVettingPage;
