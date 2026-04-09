import PageTemplate from './PageTemplate';
import PartnerGrid from '../components/PartnerGrid';
import { partners } from '../data/partners';

const PartnershipsPage = () => (
  <>
    <PageTemplate
      title="Partnerships"
      subtitle="Collaboration with suppliers, travel partners and sustainability stakeholders."
      heroBadge="Partnerships"
      heroText="We help operators connect with the right partners, build verified supplier relationships and deliver shared value across the travel ecosystem."
      imageNote="Placeholder for partnership network visualization or partner logos."
      sections={[
        {
          title: 'Partner network',
          description:
            'Grow your reach with partners who value trust, quality and responsible product delivery.',
          items: ['Supplier relationships with verified standards', 'OTA and agent connectivity', 'Dedicated partner success support'],
        },
        {
          title: 'Shared outcomes',
          description:
            'Our partnerships are built to help travel businesses scale while making positive economic and environmental contributions.',
          items: ['Improved product consistency', 'Shared impact metrics', 'Stronger commercial trust'],
        },
      ]}
    />

    <section className="bg-[#F8F9FA]">
      <div className="container mx-auto px-4 pb-32 lg:px-8">
        <div className="rounded-[2rem] bg-white border border-slate-200 p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Our partners</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">Featured partners in our network</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Explore the partner websites that help us deliver better service, distribution and sustainability outcomes for travel operators.
          </p>
          <PartnerGrid items={partners} />
        </div>
      </div>
    </section>
  </>
);

export default PartnershipsPage;
