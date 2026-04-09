import PageTemplate from "./PageTemplate";
import PartnerGrid from "../components/PartnerGrid";
import { partners } from "../data/partners";

const PartnersPage = () => (
  <>
    <PageTemplate
      title="Partners"
      subtitle="Partnerships, client relationships and distribution collaboration for travel businesses."
      heroText="Dirt Trails connects travel operators, suppliers, agents and technology partners so our network can deliver better distribution, clearer performance and shared value."
      heroBadge="Partners"
      imageNote="Placeholder for partner ecosystem visual or network illustration."
      beforeSections={
        <div className="rounded-[2rem] bg-white border border-slate-200 p-10 shadow-sm mb-10">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Our partners</p>
          <PartnerGrid items={partners} />
        </div>
      }
      sections={[
        {
          title: "Our partner network",
          description: "Connect your product to regional agents, distribution channels, suppliers and clients with faster onboarding and live visibility.",
          items: [
            "Travel operators and suppliers connected through shared inventory",
            "Agents and distribution channels with consistent product feeds",
            "Technology partners supporting payments, APIs and reconciliation",
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
          title: "Client and partner success",
          description: "We help our partners and clients launch faster, scale responsibly and maintain high-quality service across every marketplace.",
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
  </>
);

export default PartnersPage;
