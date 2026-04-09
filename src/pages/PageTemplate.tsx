import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type PageSection = {
  title: string;
  description?: string;
  items?: string[];
  badge?: string;
};

type PageTemplateProps = {
  title: string;
  subtitle: string;
  heroText: string;
  heroBadge?: string;
  sections: PageSection[];
  ctaLabel?: string;
  ctaTo?: string;
  imageNote?: string;
  beforeSections?: ReactNode;
};

const PageTemplate = ({
  title,
  subtitle,
  heroText,
  heroBadge,
  sections,
  ctaLabel,
  ctaTo,
  imageNote,
  beforeSections,
}: PageTemplateProps) => {
  return (
    <div className="bg-[#F8F9FA] text-[#0F172A]">
      <section className="bg-white">
        <div className="container mx-auto px-4 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.7fr] items-start">
            <div className="max-w-2xl space-y-6">
              {heroBadge && (
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
                  {heroBadge}
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">{title}</h1>
              <p className="text-lg leading-8 text-slate-600">{subtitle}</p>
              <p className="text-base leading-8 text-slate-600">{heroText}</p>
              {ctaLabel && ctaTo && (
                <Link
                  to={ctaTo}
                  className="inline-flex items-center justify-center rounded-full bg-[#2ECC71] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#28b765]"
                >
                  {ctaLabel}
                </Link>
              )}
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className="h-[320px] rounded-[1.5rem] bg-slate-200 text-slate-500 grid place-items-center text-center px-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Image placeholder</p>
                  <p className="mt-4 text-base leading-7 text-slate-700">{imageNote ?? 'Professional visual or dashboard will appear here.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-32 lg:px-8">
        {beforeSections}
        <div className="grid gap-8 lg:grid-cols-2 mt-16">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[2rem] bg-white p-10 shadow-sm border border-slate-200">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{section.title}</p>
              {section.description && (
                <p className="mt-4 text-base leading-8 text-slate-600">{section.description}</p>
              )}
              {section.items && (
                <ul className="mt-6 space-y-3 list-disc pl-5 text-slate-600">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PageTemplate;
