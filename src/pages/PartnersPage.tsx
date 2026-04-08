import PageTemplate from "./PageTemplate";

const PartnersPage = () => (
  <PageTemplate
    title="Partners"
    subtitle="Strategic travel ecosystem collaboration for operators, distributors and technology providers."
    heroText="Dirt Trails brings together travel operators, agents, suppliers and sustainability stakeholders with one shared intelligence platform for bookings, distribution and partner performance."
    heroBadge="Partners"
    imageNote="Placeholder for partner ecosystem visual or network illustration."
    sections={[
      {
        title: "Network enablement",
        description: "Connect your product to regional agents, distribution channels and supplier systems with faster onboarding and live visibility.",
        items: [
          "Partner-ready distribution for OTA, retail and trade channels",
          "Shared inventory, availability and pricing transparency",
          "Supplier connection tools for quality, compliance and reliability",
        ],
      },
      {
        title: "Shared commercial value",
        description: "Create stronger business relationships with aligned incentives, revenue transparency and flexible packaging.",
        items: [
          "Co-branded product development and packaging",
          "Clear commercial terms, commission and payment workflows",
          "Performance dashboards for partner revenue and yield",
        ],
      },
      {
        title: "Data & trust",
        description: "Use data to build trust across your travel ecosystem, from sourcing to sustainability claims and partner reporting.",
        items: [
          "Real-time partner performance analytics",
          "Verified sustainability metrics for product stories",
          "Supplier scorecards and compliance monitoring",
        ],
      },
      {
        title: "Partner success support",
        description: "We help partners activate faster, scale responsibly and maintain high-quality service across every marketplace.",
        items: [
          "Partner onboarding and technical enablement",
          "Distribution strategy and commercial support",
          "Ongoing training and marketplace insights",
        ],
      },
    ]}
    ctaLabel="Talk to our partner team"
    ctaTo="/contact"
  />
);

export default PartnersPage;
