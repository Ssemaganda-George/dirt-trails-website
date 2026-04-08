import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BarChart3, Globe, Cpu, ShieldCheck, Leaf, Users, Sparkles, Award, MessageSquare } from 'lucide-react';

const solutionContent = {
  'booking-engine': {
    title: 'Booking Engine',
    subtitle: 'A premium commerce engine for packages, lodges and experiences.',
    description:
      'Drive more bookings with a modern, configurable engine that connects reservation inventory, product bundles and partner workflows in one place.',
    outcomes: [
      'Sell multi-day itineraries, lodge stays and local experiences through one workflow.',
      'Offer agent-specific pricing, corporate rates and direct consumer packages.',
      'Keep availability accurate with live inventory and booking controls.',
    ],
    benefits: [
      'Higher conversion from structured product packages',
      'Faster quoting and confirmation for agents and travel partners',
      'Reduced manual booking coordination across suppliers',
    ],
    icon: Globe,
  },
  'global-connectivity': {
    title: 'Global Connectivity',
    subtitle: 'Connect to international partners, OTAs and trade networks.',
    description:
      'Expand distribution with flexible partner feeds, white-label channels and APIs that make your inventory available to the right buyers worldwide.',
    outcomes: [
      'Reach global travel trade, premium agents and online marketplaces.',
      'Control partner access with customizable rate and availability rules.',
      'Keep channel performance visible with centralized dashboard data.',
    ],
    benefits: [
      'Stronger channel mix with local and international reach',
      'Simpler partner onboarding for new distribution paths',
      'More predictable bookings from trusted global partners',
    ],
    icon: Users,
  },
  'api-integrations': {
    title: 'API Integrations',
    subtitle: 'Secure connections for payments, channels and data.',
    description:
      'Use robust APIs to synchronize inventory, bookings, finance and sustainability data across your technology stack and partner ecosystem.',
    outcomes: [
      'Automated data exchange for bookings and availability updates.',
      'Seamless payment connectivity with local and international processors.',
      'Flexible system integration for CRM, accounting and marketplace partners.',
    ],
    benefits: [
      'Faster integrations with reliable developer-friendly APIs',
      'Reduced operational overhead from manual data entry',
      'Better control over partner workflows and system access',
    ],
    icon: Cpu,
  },
  'channel-manager': {
    title: 'Channel Manager',
    subtitle: 'Manage rates, inventory and partner availability in one place.',
    description:
      'Ensure consistent pricing and availability across OTAs, agents and direct sales channels with centralized rules and real-time syncing.',
    outcomes: [
      'Reduce overbookings with automated inventory distribution.',
      'Maintain margin through channel-specific rate controls.',
      'Update partner availability instantly from one dashboard.',
    ],
    benefits: [
      'More reliable multi-channel operations',
      'Improved revenue management across sales channels',
      'Clear insight into partner booking performance',
    ],
    icon: ShieldCheck,
  },
  'inventory-management': {
    title: 'Inventory Management',
    subtitle: 'A single source of truth for your product catalog.',
    description:
      'Control rooms, tour slots, supplier inventory and package availability with structured content and operational workflows.',
    outcomes: [
      'Reduce data silos between suppliers and sales teams.',
      'Publish products faster with standardized inventory definitions.',
      'Measure sell-through by product, supplier and channel.',
    ],
    benefits: [
      'Clearer product visibility for operations and partners',
      'Faster inventory refreshes as availability changes',
      'Better supplier collaboration on capacity planning',
    ],
    icon: Sparkles,
  },
  'dynamic-pricing': {
    title: 'Dynamic Pricing',
    subtitle: 'Price smarter with demand, occupancy and seasonality.',
    description:
      'Use rules and performance data to adjust pricing automatically, preserve margin and keep your products competitive across channels.',
    outcomes: [
      'Respond to demand spikes without manual repricing.',
      'Drive higher yield on premium inventory and packages.',
      'Use occupancy and trend signals to keep rates aligned with market demand.',
    ],
    benefits: [
      'Stronger revenue per available inventory',
      'Faster response to market changes',
      'More consistent pricing across partners',
    ],
    icon: Award,
  },
  crm: {
    title: 'CRM',
    subtitle: 'Customer and partner relationship workflows built for travel.',
    description:
      'Keep track of leads, group requests, supplier interactions and guest preferences in a travel-aware CRM that supports both operations and sales teams.',
    outcomes: [
      'Convert partner enquiries faster with structured follow-ups.',
      'Keep guest and supplier profiles in sync across bookings.',
      'Support repeat sales with notes, preferences and service history.',
    ],
    benefits: [
      'Stronger partner relationships across sales channels',
      'More personalized guest experiences from shared data',
      'Smoother handoff from sales into operations',
    ],
    icon: MessageSquare,
  },
  'analytics-reporting': {
    title: 'Analytics & Reporting',
    subtitle: 'Insights for revenue, performance and sustainability.',
    description:
      'Turn bookings, channel activity and impact metrics into dashboards that help stakeholders understand growth, risk and opportunity.',
    outcomes: [
      'Track revenue by channel, product and supplier.',
      'Measure sustainability outcomes alongside commercial performance.',
      'Create stakeholder-ready reports for partners and investors.',
    ],
    benefits: [
      'Better decisions from clear, actionable data',
      'Faster reporting cycles for leadership and partners',
      'More confidence in operational strategy',
    ],
    icon: BarChart3,
  },
  'carbon-footprint': {
    title: 'Carbon Footprint Calculator',
    subtitle: 'Measure emissions for itineraries and operations.',
    description:
      'Calculate the carbon cost of travel products and itineraries so operators can create transparent, compliant sustainability claims.',
    outcomes: [
      'Estimate emissions per package, accommodation and transport segment.',
      'Use footprint data to differentiate responsible inventory.',
      'Align sustainability reporting with partner expectations.',
    ],
    benefits: [
      'More credible sustainable product positioning',
      'Clear data for impact-conscious guests and partners',
      'Improved compliance for sustainability reporting',
    ],
    icon: Leaf,
  },
  'responsibility-suite': {
    title: 'Responsibility Suite',
    subtitle: 'A toolkit for ethical travel and community impact.',
    description:
      'Track the social and environmental contributions of bookings, partners and experiences with structured responsibility workflows.',
    outcomes: [
      'See community contributions tied to bookings and suppliers.',
      'Operationalize ethical sourcing and verification.',
      'Use impact metrics to support premium product positioning.',
    ],
    benefits: [
      'Better trust with partners and stakeholders',
      'Stronger storytelling for responsible travel offerings',
      'Easier auditing of impact and contribution data',
    ],
    icon: ShieldCheck,
  },
  'ethical-sourcing': {
    title: 'Ethical Sourcing',
    subtitle: 'Supplier standards for responsible experiences.',
    description:
      'Manage supplier qualifications, social standards and local sourcing requirements to ensure every product meets your responsible tourism expectations.',
    outcomes: [
      'Maintain verified supplier criteria across destinations.',
      'Showcase ethically sourced experiences to partners.',
      'Reduce reputational risk with consistent vetting.',
    ],
    benefits: [
      'Stronger supplier trust and partner confidence',
      'Higher quality responsible inventory',
      'Simpler compliance for impact-focused stakeholders',
    ],
    icon: Globe,
  },
  'community-impact': {
    title: 'Community Impact Tracking',
    subtitle: 'Measure local value creation from every booking.',
    description:
      'Capture community impact metrics for tours, accommodation and supplier spend so partners can see the social value behind every offering.',
    outcomes: [
      'Quantify local spend, training and conservation contributions.',
      'Publish impact data alongside product offerings.',
      'Report on community value for stakeholders and partners.',
    ],
    benefits: [
      'More compelling travel products for conscious buyers',
      'Better alignment with responsible tourism goals',
      'Stronger partner stories around local impact',
    ],
    icon: Users,
  },
};

const SolutionDetailPage = () => {
  const { solutionSlug } = useParams<{ solutionSlug: string }>();
  const page = useMemo(() => {
    if (!solutionSlug) return null;
    return solutionContent[solutionSlug as keyof typeof solutionContent] ?? null;
  }, [solutionSlug]);

  if (!page) {
    return <Navigate to="/solutions" replace />;
  }

  return (
    <div className="bg-[#F8F9FA] text-[#0F172A]">
      <section className="bg-white">
        <div className="container mx-auto px-4 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] items-start">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Solutions</p>
              <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">{page.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{page.subtitle}</p>
              <p className="mt-6 text-base leading-8 text-slate-600">{page.description}</p>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">What this delivers</p>
              <ul className="mt-6 space-y-4">
                {page.outcomes.map((item) => (
                  <li key={item} className="rounded-3xl bg-slate-900 p-4">
                    <p className="text-sm leading-6 text-slate-200">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-32 lg:px-8">
        <section className="mt-16 rounded-[2rem] bg-white p-12 shadow-xl border border-slate-200">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr] items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Stakeholder value</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">Why partners and stakeholders choose this solution.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                This page explains how the solution helps operators reduce risk, scale distribution and create clear value for customers and partners.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Key benefits</p>
              <ul className="mt-4 space-y-4 text-slate-600">
                {page.benefits.map((item) => (
                  <li key={item} className="rounded-3xl bg-white p-4 shadow-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-slate-50 p-12 shadow-sm border border-slate-200">
          <div className="grid gap-8 lg:grid-cols-3">
            {page.outcomes.map((item) => (
              <div key={item} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Outcome</p>
                <p className="mt-4 text-base leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] bg-white p-12 shadow-sm border border-slate-200">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Next step</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">Bring this solution to your business.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Speak with our partner desk to understand how this capability fits your operations, distribution and sustainability goals.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#2ECC71] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#28b765]"
              >
                Request a solution review
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-950 transition hover:bg-slate-50"
              >
                Speak to partner success
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SolutionDetailPage;
