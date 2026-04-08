import PageTemplate from "./PageTemplate";

const TechnologyPartnersPage = () => (
  <PageTemplate
    title="Technology Partners"
    subtitle="Integrate with Dirt Trails to enable connected travel experiences and partner-ready systems." 
    heroText="Our API-first platform helps technology partners deliver real-time inventory, distribution connectivity and sustainability intelligence across the travel value chain." 
    heroBadge="Tech Partners"
    imageNote="Placeholder for technology integration or API ecosystem visual."
    sections={[
      {
        title: "Integration capabilities",
        description: "Work with a platform built for modern travel technology, supplier connectivity and partner ecosystems.",
        items: [
          "API integration for bookings, inventory and pricing",
          "Channel management and supplier connectivity",
          "Partner data exchange for offers, updates and reporting",
        ],
      },
      {
        title: "Partner enablement",
        description: "We support technology partners with onboarding, integration guides and commercial alignment.",
        items: [
          "Technical onboarding and API documentation",
          "Co-development support for product fit",
          "Shared go-to-market and partner success support",
        ],
      },
      {
        title: "Built for travel intelligence",
        description: "Our platform turns connected data into operational insights, so technology partners can deliver better booking flows and more reliable partner experiences.",
        items: [
          "Real-time performance and availability visibility",
          "Partner dashboards for reporting and reconciliation",
          "Integrated sustainability and compliance workflows",
        ],
      },
      {
        title: "Why collaborate",
        description: "Technology partnerships help travel businesses move faster, reduce friction and scale with confidence.",
        items: [
          "Expand your reach into new operator and agent networks",
          "Combine product intelligence with distribution workflows",
          "Build more resilient and trusted travel solutions",
        ],
      },
    ]}
    ctaLabel="Talk to our integration team"
    ctaTo="/contact"
  />
);

export default TechnologyPartnersPage;
