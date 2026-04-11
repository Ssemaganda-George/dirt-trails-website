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
          title: "Trusted partnerships",
          description:
            "We work with technology, payments and operator partners that help safari businesses launch faster, sell more reliably and report impact with confidence.",
          items: [
            "Partner-ready distribution for operators, agents and suppliers",
            "Payments, API and onboarding support for travel technology",
            "Sustainability-aligned collaboration for verified impact claims",
          ],
        },
      ]}
      ctaLabel="Talk to our partner team"
      ctaTo="/contact"
    />
  </>
);

export default PartnersPage;
