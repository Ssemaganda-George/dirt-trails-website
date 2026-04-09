import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CertificationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
              Certifications & Awards
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">
              Our certificates and awards are built on trust, impact and quality.
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              These are the certifications and awards Dirt Trails has earned for our sustainability leadership, technology delivery and operational standards.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#certificates" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Our Certificates
              </a>
              <a href="#awards" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Our Awards
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="certificates" className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] items-start">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
              Our Certificates
            </span>
            <h2 className="text-3xl font-semibold text-slate-950">Verified quality and sustainability credentials</h2>
            <p className="text-base leading-8 text-slate-600">
              Dirt Trails is focused on building strong operational standards and sustainability-ready systems. We are actively preparing the practices and documentation needed to pursue formal certifications in the future.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Talk to our team
              </Link>
              <a href="#awards" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Jump to awards
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="h-[360px] rounded-[1.5rem] bg-slate-200 text-slate-500 grid place-items-center text-center px-6">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Certificate gallery</p>
                <p className="mt-4 text-base leading-7 text-slate-700">Images of certifications and compliance badges appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="awards" className="bg-slate-100 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_0.9fr] items-start">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="h-[360px] rounded-[1.5rem] bg-slate-200 text-slate-500 grid place-items-center text-center px-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Awards showcase</p>
                  <p className="mt-4 text-base leading-7 text-slate-700">Images of awards and recognition badges appear here.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
                Our Awards
              </span>
              <h2 className="text-3xl font-semibold text-slate-950">Award recognition for innovation and impact</h2>
              <p className="text-base leading-8 text-slate-600">
                We are focused on building a team, product and process that can be recognized by future awards. Our current priority is on delivering practical, responsible travel solutions for partners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificationsPage;
