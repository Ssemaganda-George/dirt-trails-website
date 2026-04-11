import PageTemplate from "./PageTemplate";
import PartnerGrid from "../components/PartnerGrid";

const clients = [
  {
    name: 'SafariIntel',
    website: 'https://bookings.dirt-trails.com',
    initials: 'SI',
    color: '#1D4ED8',
  },
];

const CommunityPage = () => (
  <PageTemplate
    title="Community"
    subtitle="Travel teams and partners using Dirt Trails to simplify bookings, distribution and impact reporting."
    heroText="Dirt Trails gives safari operators, agents and suppliers a single platform for bookings, partner workflows and verified sustainability." 
    heroBadge="Community"
    imageNote="Placeholder for client network or travel intelligence dashboard."
    beforeSections={
      <div className="rounded-[2rem] bg-white border border-slate-200 p-10 shadow-sm mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Our clients</p>
        <PartnerGrid items={clients} />
      </div>
    }
    sections={[
      {
        title: "What we deliver",
        description:
          "A streamlined platform for travel teams that need reliable bookings, partner distribution and sustainability data in one place.",
        items: [
          "Unified booking workflows for operators and partners",
          "Live partner connectivity and distribution visibility",
          "Built-in sustainability reporting for trust and compliance",
        ],
      },
    ]}
    ctaLabel="Talk with our client success team"
    ctaTo="/contact"
  />
);

export default CommunityPage;
