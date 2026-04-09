import type { Partner } from '../data/partners';

type PartnerGridProps = {
  items: Partner[];
};

const PartnerGrid = ({ items }: PartnerGridProps) => (
  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 mt-8">
    {items.map((partner) => (
      <a
        key={partner.name}
        href={partner.website}
        target="_blank"
        rel="noreferrer noopener"
        className="group block rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-3xl text-2xl font-semibold text-white"
          style={{ backgroundColor: partner.color }}
        >
          {partner.initials}
        </div>
        <div className="mt-6">
          <p className="text-lg font-semibold text-slate-950">{partner.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-500 group-hover:text-slate-700">
            Visit website
          </p>
        </div>
      </a>
    ))}
  </div>
);

export default PartnerGrid;
