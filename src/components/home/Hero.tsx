import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Leaf, ShieldCheck, BarChart3, LifeBuoy, Cpu } from 'lucide-react';

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
    <section className="relative min-h-screen bg-[#F8F9FA] text-[#0F172A]">
      <div className="container mx-auto px-4 py-20 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="max-w-2xl">
            <div className="inline-flex flex-col gap-4">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm">
                Platform + travel intelligence
              </span>
              <h1 className="mt-6 text-5xl sm:text-6xl font-semibold leading-tight tracking-tight text-slate-950">
                A travel tech platform for local operators, with research-grade systems for global partners.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Build bookings, distribution and sustainability into one unified system — backed by market insights, partner support and enterprise-ready integrations.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
                Partner desk inquiry
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Trusted by</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">Travel operators, suppliers and international partners.</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Performance</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">Bookings, intelligence and support in one platform.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Travel intelligence</p>
              <h2 className="mt-4 text-3xl font-semibold">Research-backed growth for operators.</h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">Revenue channels</p>
                  <p className="mt-2 text-xl font-semibold">Packages, lodges and experiences</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">Market signals</p>
                  <p className="mt-2 text-xl font-semibold">Demand, pricing and distribution trends</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">Partner desk</p>
                  <p className="mt-2 text-xl font-semibold">Dedicated support for every launch</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Market insights</p>
                  <p className="mt-3 text-sm text-slate-700">Demand signals, trend reports and research for smarter pricing.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">API & integrations</p>
                  <p className="mt-3 text-sm text-slate-700">Connect payments, OTAs and enterprise systems with ease.</p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Support</p>
                  <p className="mt-3 text-sm text-slate-700">Onboarding, training and account management for every operator.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Sustainability</p>
                  <p className="mt-3 text-sm text-slate-700">Impact dashboards and compliance-ready reporting.</p>
                </div>
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
                index === activeIndex ? 'bg-[#2ECC71]' : 'bg-slate-300'
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
