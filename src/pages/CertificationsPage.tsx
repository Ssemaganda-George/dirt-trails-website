import PageTemplate from './PageTemplate';

const CertificationsPage = () => (
  <PageTemplate
    title="Certifications"
    subtitle="Standards and compliance for modern travel and sustainability operations."
    heroBadge="Certifications"
    heroText="Our platform supports travel operators in meeting global and regional certification standards, from sustainability to data protection and supplier accountability."
    imageNote="Placeholder for certification badges, seals or compliance dashboard."
    sections={[
      {
        title: 'Why certifications matter',
        description:
          'Certifications build trust with partners, guests and regulators by proving that your operations meet established standards.',
        items: ['Responsible tourism practices', 'Data security and privacy readiness', 'Verified supplier standards'],
      },
      {
        title: 'How we support it',
        description:
          'We provide workflows, accountability and reporting that make certification readiness more practical for travel operators.',
        items: ['Impact and carbon reporting for sustainability', 'Partner vetting and compliance tools', 'Documentation-ready dashboards'],
      },
    ]}
  />
);

export default CertificationsPage;
