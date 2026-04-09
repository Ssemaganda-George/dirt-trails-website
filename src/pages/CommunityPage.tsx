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
    title="Our Clients"
    subtitle="Travel operators, agencies and distribution partners that rely on Dirt Trails to move faster and sell smarter."
    heroText="Our clients use Dirt Trails to unify bookings, distribution and impact reporting so their teams and partners can focus on growth, quality and sustainability." 
    heroBadge="Our Clients"
    imageNote="Placeholder for client network or travel intelligence dashboard."
    beforeSections={
      <div className="rounded-[2rem] bg-white border border-slate-200 p-10 shadow-sm mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Our clients</p>
        <PartnerGrid items={clients} />
      </div>
    }
    sections={[
      {
        title: "Travel teams we serve",
        description: "We work with operators, agents, destination managers and local suppliers who need a reliable platform for distribution, revenue management and partner collaboration.",
        items: [
          "Tour operators and DMCs looking for smarter booking workflows",
          "Agents and resellers needing consistent partner connectivity",
          "Accommodation and supplier partners seeking transparent inventory sharing",
        ],
      },
      {
        title: "Client value",
        description: "Clients choose Dirt Trails because our travel intelligence platform simplifies operations, improves partner trust and helps them package premium experiences.",
        items: [
          "Faster confirmations with live availability and partner feeds",
          "Clear performance metrics for operations and distribution",
          "Integrated sustainability reporting for responsible products",
        ],
      },
      {
        title: "Operational confidence",
        description: "Our platform helps client teams reduce manual work, deliver consistent pricing and make better decisions across sales, operations and supplier management.",
        items: [
          "Automated inventory and rate distribution",
          "Partner scorecards and service quality tracking",
          "Real-time booking, commission and product performance insight",
        ],
      },
      {
        title: "Global growth",
        description: "We help clients scale from local operations to broader regional and international markets with better partner connectivity and trusted business intelligence.",
        items: [
          "Access to international agent and technology networks",
          "Product readiness for multi-market distribution",
          "Sustainable growth backed by partner transparency",
        ],
      },
    ]}
    ctaLabel="Talk with our client success team"
    ctaTo="/contact"
  />
);

export default CommunityPage;
