import PageTemplate from "./PageTemplate";
import PartnerGrid from "../components/PartnerGrid";

const technologyPartners = [
  {
    name: 'Marz Pay',
    website: 'https://marzpay.com',
    initials: 'MP',
    color: '#F59E0B',
  },
];

const TechnologyPartnersPage = () => (
  <>
    <PageTemplate
      title="Technology Partners"
      subtitle="Connect your travel technology with Dirt Trails for more reliable distribution and partner workflows."
      heroText="Our platform is built for API-first travel integrations that help operators, suppliers and agents work from the same data and workflows." 
      heroBadge="Tech Partners"
      imageNote=""
      beforeSections={
        <div className="rounded-[2rem] bg-white border border-slate-200 p-10 shadow-sm mb-10">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Technology partner</p>
          <PartnerGrid items={technologyPartners} />
        </div>
      }
      sections={[
        {
          title: "What we offer",
          description:
            "Dirt Trails makes it easier for technology partners to integrate bookings, distribution and sustainability workflows with travel operators.",
          items: [
            "API integration for bookings, inventory and pricing",
            "Partner onboarding, documentation and support",
            "Connected data for reporting, reconciliation and partner trust",
          ],
        },
      ]}
      ctaLabel="Talk to our integration team"
      ctaTo="/contact"
    />
  </>
);

export default TechnologyPartnersPage;
