import PageTemplate from "./PageTemplate";

const BecomePartnerPage = () => (
  <PageTemplate
    title="Become a Partner"
    subtitle="Join the Dirt Trails travel intelligence network and grow distribution with smarter technology." 
    heroText="Partner with us to offer better experiences, faster confirmations and data-backed operations to agents, suppliers and guests." 
    heroBadge="Partner Program"
    imageNote="Placeholder for partnership growth or partner onboarding visual."
    sections={[
      {
        title: "Why partner with Dirt Trails",
        description: "Our platform makes it easy for partners to publish inventory, coordinate availability, and deliver transparent performance across markets.",
        items: [
          "Access global distribution with fewer manual handoffs",
          "Use our travel intelligence to optimize pricing and inventory",
          "Offer partners consistent product quality and sustainability insight",
        ],
      },
      {
        title: "How it works",
        description: "We connect you to operators, agents and suppliers through a secure, flexible technology layer that supports bookings, reporting and collaboration.",
        items: [
          "Integrate with APIs, channel management or partner feeds",
          "Publish ready-to-sell product content across partner networks",
          "Track performance and guest satisfaction in one dashboard",
        ],
      },
      {
        title: "Partner types",
        description: "We work with a wide range of travel ecosystem players to build deeper value and stronger distribution.",
        items: [
          "Inbound and outbound tour operators",
          "Regional travel agents and destination management companies",
          "Lodges, camps and supplier partners",
        ],
      },
      {
        title: "Next steps",
        description: "Start with a short conversation and our team will help you find the right integration and partner model.",
        items: [
          "Share your product and distribution goals",
          "Review technical and commercial readiness",
          "Launch with ongoing partner enablement and support",
        ],
      },
    ]}
    ctaLabel="Join the network"
    ctaTo="/contact"
  />
);

export default BecomePartnerPage;
