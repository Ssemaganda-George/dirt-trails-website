import PageTemplate from './PageTemplate';

const SuccessStoriesPage = () => (
  <PageTemplate
    title="Success Stories"
    subtitle="Review real project outcomes, client testimonials and video case studies."
    heroBadge="Success Stories"
    heroText="Explore how Dirt Trails has helped travel operators, partners and sustainability teams deliver better bookings, stronger partnerships and verified impact." 
    imageNote="Placeholder for success story visuals or customer video thumbnails."
    beforeSections={
      <div className="grid gap-6 sm:grid-cols-2 mt-10">
        {[
          'Testimonials from successful projects',
          'Reviews from clients and partners',
        ].map((title) => (
          <div key={title} className="rounded-[2rem] bg-white border border-slate-200 p-8 shadow-sm min-h-[220px]">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{title}</p>
            <div className="mt-10 h-32 rounded-[1.5rem] bg-slate-100/80 flex items-center justify-center text-sm text-slate-400">
              Content coming soon
            </div>
          </div>
        ))}
      </div>
    }
    sections={[]}
  />
);

export default SuccessStoriesPage;
