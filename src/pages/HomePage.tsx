import { Globe, ShieldCheck, ServerCog, Leaf, CheckCircle, MessageSquare, BarChart3, TrendingUp, LifeBuoy, Cpu, PlayCircle, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/home/Hero';

const HomePage = () => {
  return (
    <div className="bg-[#F8F9FA] text-[#0F172A]">
      <Hero />

      <main className="container mx-auto px-4 pb-32 lg:px-8">
        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 px-6 py-10 shadow-sm">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Home index</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">Quick links to the key sections of the homepage.</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                Jump directly to the product story, research and support, proof points or business outcomes for a faster overview.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Why Dirt Trails', description: 'Discover our premium travel platform for operators and partners.', href: '#why-dirt-trails' },
                { title: 'Product', description: 'See the platform capabilities for bookings, distribution and operations.', href: '#product' },
                { title: 'How it works', description: 'Learn how our modular platform connects partners and systems.', href: '#how-it-works' },
                { title: 'Proof points', description: 'Understand the business value for operators and global workflows.', href: '#proof-points' },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 group-hover:text-slate-900">{item.title}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="why-dirt-trails" className="mt-16 rounded-[2rem] bg-white p-12 shadow-xl border border-slate-200">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Why Dirt Trails</p>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950">An innovative travel platform built for operators, partners and global distribution.</h2>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Dirt Trails combines commercial booking systems, market intelligence, partner enablement and sustainability controls into a single platform for international growth.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Platform clarity', detail: 'Single view for bookings, distribution and supplier operations.' },
                  { label: 'Intelligent growth', detail: 'Demand signals, pricing and launch guidance for better decisions.' },
                  { label: 'Premium support', detail: 'Hands-on onboarding, integrations and account coordination.' },
                  { label: 'Global readiness', detail: 'Multi-currency, multi-channel commerce for regional and international markets.' },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Operational confidence</p>
                <p className="mt-4 text-2xl font-semibold text-slate-950">Connect sales, suppliers and operations in a single workflow.</p>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Strategic scale</p>
                <p className="mt-4 text-2xl font-semibold text-slate-950">Move faster with a platform built around insight.</p>
              </div>
              <div className="mt-4">
                <Link to="/about" className="inline-flex items-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Discover the Dirt Trails difference
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="product" className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl border border-slate-900">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Product</p>
            <h2 className="mt-4 text-3xl font-semibold">A refined commercial engine for bookings, distribution and operations.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Run reservations, inventory, payments and partner networks through a single platform designed for modern travel businesses.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                'Unified booking engine for packages, lodges and experiences',
                'Distribution across regional and international channels',
                'Local-friendly payments with multi-currency support',
                'Sustainability tools for premium product positioning',
                'Supplier and partner network for trusted delivery',
              ].map((item) => (
                <div key={item} className="rounded-3xl bg-slate-900 p-4">
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
            <div className="mt-8 grid gap-4">
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

        <section id="how-it-works" className="mt-16 rounded-[2rem] bg-slate-50 p-10 shadow-sm border border-slate-200">
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

        <section id="implementation-flow" className="mt-16 rounded-[2rem] bg-white p-10 shadow-xl border border-slate-200">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Implementation flow</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Learn about the steps of our implementation flow</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              From demo request to commissioning, our team supports you with clear steps, expert handoffs, and a tailored launch plan.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Request a demo',
                description: 'Complete the form with information about your company.',
                icon: PlayCircle,
              },
              {
                title: 'Our experts will contact you',
                description: 'Once we receive the request, our travel distribution experts will reach out.',
                icon: Phone,
              },
              {
                title: 'We will offer the best solution',
                description: 'We analyze your business and recommend the modules you need to grow.',
                icon: Sparkles,
              },
              {
                title: 'Commissioning',
                description: "You're all set to get your project up and running with Dirt Trails.",
                icon: CheckCircle,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-emerald-400">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="proof-points" className="mt-16 rounded-[2rem] bg-white p-10 shadow-xl border border-slate-200">
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

        <section id="business-cta" className="mt-16 rounded-[2rem] bg-[#111827] p-12 text-white shadow-xl border border-slate-900 scroll-mt-28">
          <div className="max-w-3xl text-center mx-auto">
            <p className="text-sm uppercase tracking-[0.24em] text-[#93C5FD]">Partner with Dirt Trails</p>
            <h2 className="mt-4 text-4xl font-semibold">Build your next launch with travel intelligence and trusted partner support.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">Talk to our team about platform demos, market research or partner onboarding for your next product.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-[#2ECC71] px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#28b765]">
                Request a demo
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Partner desk inquiry
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
