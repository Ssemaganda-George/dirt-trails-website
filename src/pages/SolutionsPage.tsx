import { Link } from 'react-router-dom';
import { BarChart3, Globe, Cpu, ShieldCheck, Users } from 'lucide-react';

const solutions = [
  {
    title: 'Booking & Distribution',
    description:
      'A commercial booking engine with agent workflows, package inventory and seamless distribution to partners, OTAs and direct channels.',
    points: [
      'Real-time availability for tours, lodges and experiences',
      'Package and add-on sales from a single inventory',
      'White-label distribution and partner channel management',
      'Integrated local and international payment routing',
    ],
    icon: Globe,
  },
  {
    title: 'Operations & Growth',
    description:
      'Manage inventory, pricing, CRM and analytics in one platform so operators can reduce manual work and increase revenue.',
    points: [
      'Inventory control across suppliers, units and packages',
      'Dynamic pricing rules based on demand and availability',
      'CRM workflows for bookings, requests and guest communications',
      'Advanced reporting for performance, revenue and yield management',
    ],
    icon: Cpu,
  },
  {
    title: 'Sustainability & Impact',
    description:
      'Embed responsible tourism into every booking with carbon tracking, community reporting and ethical sourcing features.',
    points: [
      'Carbon footprint calculation per itinerary and supplier',
      'Community impact tracking for premium experiences',
      'Geotagged conservation reporting and verification',
      'Compliance-ready sustainability dashboards',
    ],
    icon: ShieldCheck,
  },
  {
    title: 'Research & Support',
    description:
      'Data, intelligence and a partner desk that supports launch, growth and ongoing operations.',
    points: [
      'Quarterly trend reports for demand, pricing and seasonality',
      'Local market assessments for regional product launches',
      'Partner desk support for integrations and account success',
      'Training programs for operators, sales teams and suppliers',
    ],
    icon: BarChart3,
  },
];

const SolutionsPage = () => {
  return (
    <div className="bg-[#F8F9FA] text-[#0F172A]">
      <section className="bg-white">
        <div className="container mx-auto px-4 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr] items-center">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Solutions</p>
              <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">
                Platform solutions mapped to real travel operations and growth outcomes.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Dirt Trails turns every booking, supplier connection and sustainability metric into a connected business solution. Compare our product offerings with the outcomes they unlock for travel operators, distribution partners and sustainability teams.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Booking Engine', value: 'Integrated reservations + packages', to: '/solutions/booking-engine' },
                  { label: 'Global Connectivity', value: 'OTA, agent and partner channels', to: '/solutions/global-connectivity' },
                  { label: 'API Integrations', value: 'Secure payment and channel APIs', to: '/solutions/api-integrations' },
                  { label: 'Digital Payments', value: 'Secure payment routing and settlement for travel bookings', to: '/solutions/channel-manager' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-slate-100"
                  >
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                    <p className="mt-3 text-base font-semibold text-slate-950">{item.value}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#2ECC71] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#28b765]"
                >
                  Book a demo
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-950 transition hover:bg-slate-50"
                >
                  Talk to our partner team
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
              <div className="grid gap-6">
                <div className="rounded-[1.5rem] bg-slate-900 p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Operational scale</p>
                  <p className="mt-4 text-3xl font-semibold">1,200+</p>
                  <p className="mt-2 text-sm text-slate-300">Suppliers and travel partners connected across regional markets.</p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-900 p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bookings delivered</p>
                  <p className="mt-4 text-3xl font-semibold">3.5M</p>
                  <p className="mt-2 text-sm text-slate-300">Bookings processed annually through our integrated engine.</p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-900 p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Support response</p>
                  <p className="mt-4 text-3xl font-semibold">24/7</p>
                  <p className="mt-2 text-sm text-slate-300">Partner desk support for launches, integrations and growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-32 lg:px-8">
        <section id="booking-distribution" className="mt-16 rounded-[2rem] bg-white p-12 shadow-sm border border-slate-200">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr] items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Booking & Distribution</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">A commercial engine for bookings, partners and global distribution.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Operators use Dirt Trails to centralize reservations, package creation and partner channel workflows in one platform. The result is faster quoting, fewer manual handoffs and better visibility across every route, lodge and experience.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { title: 'Booking Engine', summary: 'Unified booking flows for packages, groups and direct sales.' },
                  { title: 'Global Connectivity', summary: 'OTA, partner and white-label distribution under one roof.' },
                  { title: 'API Integrations', summary: 'Secure data exchange for payments, inventory and partner feeds.' },
                  { title: 'Digital Payments', summary: 'Enable secure travel payments, gateway routing and settlement across channels.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.title}</p>
                    <p className="mt-3 text-base text-slate-700">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Systems we have built</p>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>Dirt Trails Booking Engine for package and inventory orchestration</li>
                <li>Partner Distribution Hub for OTA, trade and direct sales feeds</li>
                <li>Agent & OTA Channel Gateway for live connectivity and approvals</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="operations" className="mt-16 rounded-[2rem] bg-slate-50 p-12 shadow-sm border border-slate-200">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_0.9fr] items-start">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Management & Operations</p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">Streamline products, pricing and guest relationships.</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Bring inventory, pricing rules, CRM and reporting into one travel operations command center. Dirt Trails helps operators reduce manual updates, keep channels aligned and improve responsiveness as the market shifts.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                'Inventory Management for rooms, tours and supplier stock',
                'Dynamic Pricing driven by demand, occupancy and seasonality',
                'CRM workflows for agents, sales and guest service',
                'Analytics & Reporting for revenue, yield and partner performance',
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Systems we have built</p>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>Operations Control Center for inventory, booking and supplier workflows</li>
              <li>Yield Pricing Engine for rate automation and channel performance</li>
              <li>Travel CRM for partner enquiries, lead tracking and guest profiles</li>
              <li>Performance Intelligence Hub for commercial and operational reporting</li>
            </ul>
          </div>
        </section>

        <section id="sustainability" className="mt-16 rounded-[2rem] bg-white p-12 shadow-sm border border-slate-200">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr] items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Sustainability & Impact</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">Make responsible tourism part of every booking.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Track emissions, supplier impact and local value as part of your product workflow. This gives operators confidence to sell responsible experiences and build stronger partnerships with communities and stakeholders.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { title: 'Carbon Footprint Calculator', summary: 'Estimate emissions across routes, accommodation and transport.' },
                  { title: 'Responsibility Suite', summary: 'Capture social and environmental contributions from bookings.' },
                  { title: 'Ethical Sourcing', summary: 'Verify supplier standards and responsible procurement criteria.' },
                  { title: 'Community Impact Tracking', summary: 'Measure local benefit from supplier spend and experiences.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.title}</p>
                    <p className="mt-3 text-base text-slate-700">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Systems we have built</p>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>Impact Reporting Dashboard for carbon, community and supplier metrics</li>
                <li>Responsible Sourcing Manager for supplier qualification and compliance</li>
                <li>Community Benefit Tracker for local spend and conservation engagement</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="research" className="mt-16 rounded-[2rem] bg-slate-50 p-12 shadow-sm border border-slate-200">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_0.9fr] items-start">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Research & Support</p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">Research and launch support for travel operations.</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                We back the platform with demand intelligence, onboarding support and partner operations guidance so your systems launch quickly and stay aligned with market needs.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                'Quarterly destination and demand reports',
                'Pricing and competition intelligence',
                'Partner desk support for integrations and launch tasks',
                'Training for operations, sales and supplier teams',
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-white p-12 shadow-xl border border-slate-200">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Solution mapping</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">What each offering delivers for your business.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Every solution is designed to solve a real travel operations challenge — from booking complexity to global growth, sustainability reporting and partner support.
              </p>
            </div>
            <div className="grid gap-4">
              {solutions.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-3 text-slate-950">
                    <item.icon size={20} />
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SolutionsPage;
