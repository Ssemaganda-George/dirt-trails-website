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
          'Standardized supplier review processes help you verify credentials, manage risk and keep product quality consistent across every partner.',
        items: [
          'Supplier questionnaires, documents and certificates stored in one place',
          'Compliance checks for responsible tourism, safety and local regulations',
          'Performance scoring and review workflows for guides, lodges and activities',
        ],
      },
      {
        title: 'How it works',
        description:
          'Automate your vetting process with checklists, approval gates and review notes so partners only go live after meeting your standards.',
        items: [
          'Qualification status tracking for new and existing suppliers',
          'Risk flags and renewal reminders for certificates and agreements',
          'Supplier readiness workflows for new markets and partner launches',
        ],
      },
      {
        title: 'Stakeholder impact',
        description:
          'Partners and stakeholders can trust that the products you distribute are built with quality, ethical sourcing and accountability in mind.',
        items: [
          'More reliable partner relationships',
          'Clear expectations for local suppliers',
          'Safer scaling across new markets',
        ],
      },
    ]}
  />
);

export default SupplierVettingPage;
