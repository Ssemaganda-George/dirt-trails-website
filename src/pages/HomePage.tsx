import { Link } from 'react-router-dom';
import Hero from '@/components/home/Hero';

const HomePage = () => {
  return (
    <div className="bg-[#F8F9FA] text-[#0F172A]">
      <Hero />

      <main className="container mx-auto px-4 pb-32 lg:px-8">
        <section id="why-dirt-trails" className="mt-16 rounded-[2rem] bg-white p-12 shadow-xl border border-slate-200">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Why Dirt Trails</p>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950">A single platform for bookings, partners and sustainability.</h2>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Dirt Trails brings commercial booking operations, distribution connectivity and impact reporting together so travel businesses can scale with confidence.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Integrated operations', detail: 'Bookings, supplier management and partner distribution in one system.' },
                  { label: 'Verified impact', detail: 'Carbon, community and supplier reporting built into every product.' },
                  { label: 'Partner-ready', detail: 'Support for agent, OTA and technology channels.' },
                  { label: 'Built for growth', detail: 'Local-friendly payments, multi-market pricing and intelligence.' },
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

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl border border-slate-900">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Core capability</p>
            <h2 className="mt-4 text-3xl font-semibold">Commercial systems for bookings, channels and payments.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Manage packages, inventory and distribution with a system designed for hybrid local and international travel operations.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                'Unified bookings for tours, lodges and activities',
                'Channel connectivity for agents, OTAs and direct sales',
                'Local-friendly payments with multi-currency support',
                'Live pricing and inventory controls for partners',
              ].map((item) => (
                <div key={item} className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-10 shadow-xl border border-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Support & insight</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Research, operations and partner support in one place.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Use data, onboarding guidance and technical support to reduce launch risk and keep your business moving.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                'Market intelligence for travel demand and pricing',
                'Partner desk support for integrations and launch',
                'Sustainability reporting and impact dashboards',
                'Operational guidance for supplier and channel workflows',
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Partners</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Our trusted partner network</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { name: 'MIIChub', initials: 'MII', color: 'bg-[#0F766E]' },
                { name: 'Marz Pay', initials: 'MP', color: 'bg-[#1D4ED8]' },
                { name: 'SafariIntel', initials: 'SI', color: 'bg-[#9333EA]' },
                { name: 'Dirt Trails Labs', initials: 'DT', color: 'bg-[#0EA5E9]' },
              ].map((partner) => (
                <div key={partner.name} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className={`${partner.color} flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold text-white`}>{partner.initials}</div>
                  <p className="text-sm font-semibold text-slate-950">{partner.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/partners"
                className="inline-flex items-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View partners
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Success stories</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Reviews and highlights.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">what our Clients Say..</p>
                <div className="mt-3 h-40 w-full overflow-hidden rounded-3xl bg-slate-900 text-white grid place-items-center">
                  <span className="text-xs">Video</span>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">What our Clients Say..</p>
                <div className="mt-3 rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm leading-6 text-slate-700">
                    “Dirt Trails helped us cut manual partner bookings and speed up confirmations.”
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.24em] text-slate-500">SafariIntel</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/resources/success-stories"
                className="inline-flex items-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View success stories
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-slate-50 p-10 shadow-sm border border-slate-200">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Resources</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Explore our solutions, stories and support resources.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Learn more through focused pages for Solutions, Sustainability, Resources and Community.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Solutions', href: '/solutions' },
              { title: 'Sustainability', href: '/sustainability' },
              { title: 'Resources', href: '/resources' },
              { title: 'Community', href: '/community' },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>

        <section id="business-cta" className="mt-16 rounded-[2rem] bg-[#111827] p-12 text-white shadow-xl border border-slate-900 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.24em] text-[#93C5FD]">Partner with Dirt Trails</p>
            <h2 className="mt-4 text-4xl font-semibold">Build your next launch with travel intelligence and trusted partner support.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">Talk to our team about demos, integrations and partner enablement for your next travel product.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-[#2ECC71] px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#28b765]">
                Request a demo
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Contact our team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
