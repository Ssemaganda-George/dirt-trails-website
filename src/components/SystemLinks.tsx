export type SystemLink = {
  title: string;
  href: string;
  description?: string;
};

type SystemLinksProps = {
  items: SystemLink[];
};

const SystemLinks = ({ items }: SystemLinksProps) => (
  <div className="rounded-[2rem] bg-white border border-slate-200 p-10 shadow-sm mb-10">
    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Systems delivered</p>
    <h2 className="mt-4 text-3xl font-semibold text-slate-950">Systems we’ve deployed for this capability</h2>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          className="group block rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white"
        >
          <p className="text-lg font-semibold text-slate-950">{item.title}</p>
          {item.description && <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>}
          <p className="mt-4 text-sm font-semibold text-[#0F766E] group-hover:text-[#0F766E]">Visit system</p>
        </a>
      ))}
    </div>
  </div>
);

export default SystemLinks;
