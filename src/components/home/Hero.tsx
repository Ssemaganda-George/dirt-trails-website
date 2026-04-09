import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, CheckCircle, PlayCircle, Phone, Sparkles } from 'lucide-react';

const slides = [
  {
    label: 'Local-first operations with global distribution',
    description: 'Built for travel teams and trusted by international partners.',
  },
  {
    label: 'Research-led product decisions for smarter tourism growth',
    description: 'Market insights, pricing signals and partner desk support in one platform.',
  },
  {
    label: 'API-ready connectivity for suppliers and distribution partners',
    description: 'Secure integrations for payments, OTAs and global travel networks.',
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white text-slate-950">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-slate-950 via-slate-900 to-transparent opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 py-24 sm:py-28 lg:px-8">
        <div className="grid gap-16 xl:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200 shadow-sm">
              Global travel intelligence
            </span>
            <h1 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              Intelligent travel technology.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              A platform designed to connect bookings, distribution and supplier workflows with premium business research and partner support.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-10 py-3 text-base font-semibold text-white shadow-xl shadow-slate-950/10 transition hover:bg-slate-800"
              >
                Schedule a demo
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-10 py-3 text-base font-semibold text-slate-950 transition hover:bg-slate-50"
              >
                Explore solutions
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Premier partners</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">Operators, OTAs and suppliers across markets.</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Built for scale</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">Flexible modules for local launches and global growth.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Travel intelligence</p>
              <h2 className="mt-4 text-3xl font-semibold">Research-backed growth for operators</h2>
              <div className="mt-6 grid gap-4">
                {[
                  {
                    label: 'Revenue channels',
                    detail: 'Packages, lodges and experiences',
                  },
                  {
                    label: 'Market signals',
                    detail: 'Demand, pricing and distribution trends',
                  },
                  {
                    label: 'Partner desk',
                    detail: 'Dedicated support for every launch',
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-900 p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-xl font-semibold">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Market insights',
                    description: 'Demand signals, trend reports and research for smarter pricing.',
                  },
                  {
                    title: 'API & integrations',
                    description: 'Connect payments, OTAs and enterprise systems with ease.',
                  },
                  {
                    title: 'Support',
                    description: 'Onboarding, training and account management for every operator.',
                  },
                  {
                    title: 'Sustainability',
                    description: 'Impact dashboards and compliance-ready reporting.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.title}</p>
                    <p className="mt-3 text-sm text-slate-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                index === activeIndex ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
