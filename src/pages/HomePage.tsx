import { Globe, ShieldCheck, ServerCog, Leaf, CheckCircle, MessageSquare, BarChart3, TrendingUp, LifeBuoy, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/home/Hero';

const HomePage = () => {
  return (
    <div className="bg-[#F8F9FA] text-[#0F172A]">
      <Hero />

      <main className="container mx-auto px-4 pb-32 lg:px-8">
        <section className="mt-16 rounded-[2rem] bg-white p-12 shadow-xl border border-slate-200">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Why Dirt Trails</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">A premium travel platform built for operators that want more than booking software.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Dirt Trails is the research-backed travel technology engine for local and global operators. We combine commercial booking systems, market intelligence and premium partner support so travel teams can scale with confidence.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                label: 'Platform clarity',
                description: 'One system for bookings, distribution and supplier workflows.',
              },
              {
                label: 'Intelligent growth',
                description: 'Market insight and demand signals that guide every decision.',
              },
              {
                label: 'Premium support',
                description: 'Onboarding, integrations and account guidance for every launch.',
              },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
                <p className="text-base font-semibold text-slate-950">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Operate with confidence</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">Connect sales, suppliers and operations in one workflow.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Scale with data</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">Move faster with a platform built around insight.</p>
            </div>
          </div>

          <div className="mt-10">
            <Link to="/about" className="inline-flex items-center rounded-full bg-[#2ECC71] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#28b765]">
              Discover the Dirt Trails difference
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl border border-slate-900">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Product</p>
            <h2 className="mt-4 text-3xl font-semibold">A refined commercial engine for bookings, distribution and operations.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Run reservations, inventory, payments and partner networks through a single platform designed for modern travel businesses.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Unified booking engine for packages, lodges and experiences',
                'Distribution across regional and international channels',
                'Local-friendly payments with multi-currency support',
                'Sustainability tools for premium product positioning',
                'Supplier and partner network for trusted delivery',
              ].map((item) => (
                <div key={item} className="rounded-3xl bg-slate-900 p-5">
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-10 shadow-xl border border-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Research & support</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Intelligence and partner support for scalable, sustainable growth.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Use market research, analytics and guided implementation to make better decisions and keep your team moving.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Market intelligence and trend reports',
                'Demand signals and pricing optimisation',
                'API integration support for partners and enterprise systems',
                'Onboarding, training and partner desk coordination',
                'Technical account management for growth and compliance',
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-slate-50 p-10 shadow-sm border border-slate-200">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">How it works</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">A modular platform with secure integrations and clear commercial impact.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Choose the services you need, connect partners and systems, then manage bookings and sustainability with one consistent workflow.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Modular systems',
                copy: 'Deploy the services your business needs and adapt as your market changes.',
                icon: ServerCog,
              },
              {
                title: 'API integrations',
                copy: 'Connect OTAs, payment providers and enterprise systems seamlessly.',
                icon: CheckCircle,
              },
              {
                title: 'Impact reporting',
                copy: 'Measure sustainability, compliance and premium product performance.',
                icon: Leaf,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#1D4ED8]">
                  <item.icon size={20} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-white p-10 shadow-xl border border-slate-200">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Proof points</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">Local operations and global workflows, together.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Support regional operations, accept mobile payments, sell in multiple currencies and connect to international distribution without losing local control.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: 'Local suppliers',
                    description: 'Regional inventory, accommodation and experiences managed in one platform.',
                  },
                  {
                    title: 'Mobile payments',
                    description: 'Local wallets and alternative payment methods supported easily.',
                  },
                  {
                    title: 'Multi-currency',
                    description: 'Pricing and settlement for local and international bookings.',
                  },
                  {
                    title: 'Global channels',
                    description: 'Partner-ready distribution and white-label connectivity.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-lg font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl border border-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Revenue & credibility</p>
              <h2 className="mt-4 text-3xl font-semibold">Sell more, optimise pricing and build trust with data.</h2>
              <div className="mt-8 space-y-4">
                {[
                  {
                    label: 'Operators can',
                    value: 'Sell safari, lodge and experiences from one engine; use local payments, mobile and regional sales channels.',
                  },
                  {
                    label: 'The platform also helps',
                    value: 'Identify opportunities with data, optimise pricing with research and build trust with compliance and support.',
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-900 p-6">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                    <p className="mt-3 text-base leading-7 font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="business-cta" className="mt-16 rounded-[2rem] bg-[#1F2937] p-12 text-white shadow-xl border border-slate-900 scroll-mt-28">
          <div className="max-w-3xl text-center mx-auto">
            <p className="text-sm uppercase tracking-[0.24em] text-[#93C5FD]">Start your next partnership</p>
            <h2 className="mt-4 text-4xl font-semibold">Work with a travel technology partner for local and global growth.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">Request a demo, get research support or speak to our partner desk about your next launch.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-[#FF6A3D] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#e85a2f]">
                Request a demo
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-slate-500 bg-transparent px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Research inquiry
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
