import PageTemplate from './PageTemplate';

const ResourcesPage = () => (
  <PageTemplate
    title="Resources"
    subtitle="A single hub for insights, case studies, support and events that help travel teams make smarter decisions."
    heroText="Explore our resource library for articles, client stories, product guidance and live events designed for travel operators, partners and technology stakeholders."
    heroBadge="Resources"
    imageNote="Placeholder for resource hub illustration or navigation visual."
    sections={[
      {
        title: 'Insights & research',
        description: 'Learn how travel intelligence, distribution and sustainability shape stronger partnerships and better travel products.',
        items: ['Market analysis and product thinking', 'Travel technology guides and integration advice', 'Sustainability strategy for operators and partners'],
      },
      {
        title: 'Client stories',
        description: 'Read case studies that show how operators, agents and suppliers use Dirt Trails to scale faster with confidence.',
        items: ['Partner success stories', 'Performance improvements in booking operations', 'Verified sustainability impact outcomes'],
      },
      {
        title: 'Support & learning',
        description: 'Get answers, best practices and practical guidance through our FAQ library and live event calendar.',
        items: ['Frequently asked questions for operators and partners', 'Practical guides for integrations and workflows', 'Live webinars, demos and partner events'],
      },
      {
        title: 'Ready resources',
        description: 'Choose the content that matches your role and the stage of your partnership or implementation journey.',
        items: ['Browse blog articles for travel tech trends', 'Review case studies by use case', 'Register for upcoming webinars and events'],
      },
    ]}
    ctaLabel="View blog articles"
    ctaTo="/resources/blog"
  />
);

export default ResourcesPage;
