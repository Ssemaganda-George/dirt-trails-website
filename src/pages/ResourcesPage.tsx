import PageTemplate from './PageTemplate';

const ResourcesPage = () => (
  <PageTemplate
    title="Resources"
    subtitle="A single hub for insights, case studies, support and events that help travel teams move faster with confidence."
    heroText="Explore our resources for practical guidance, partner stories and tools that help travel operators, suppliers and sustainability teams make better decisions."
    heroBadge="Resources"
    imageNote="Placeholder for resource hub illustration or navigation visual."
    sections={[
      {
        title: 'Insights & research',
        description: 'Stay informed on travel distribution, platform operations and impact measurement with research built for travel teams.',
        items: ['Market analysis for East African and international travel markets', 'Integration best practices for booking and supplier systems', 'Sustainability workflows that support operator goals'],
      },
      {
        title: 'Client stories',
        description: 'See how travel operators, agents and suppliers have used Dirt Trails to improve performance, reporting and partner collaboration.',
        items: ['Examples of booking process improvements', 'Sustainability outcomes from impact tracking', 'Supplier success stories and quality management'],
      },
      {
        title: 'Support & learning',
        description: 'Find practical guides, FAQs and event resources to help your team adopt technology and run operations more smoothly.',
        items: ['Partner enablement and onboarding guidance', 'Frequently asked questions for operators and suppliers', 'Webinars, demos and implementation workshops'],
      },
      {
        title: 'Ready resources',
        description: 'Access content tailored to your role, whether you are launching a new product, managing distribution or reporting on impact.',
        items: ['Travel tech trends and platform strategy', 'Case studies by operation type', 'Event and webinar invites for partners'],
      },
    ]}
    ctaLabel="View blog articles"
    ctaTo="/resources/blog"
  />
);

export default ResourcesPage;
