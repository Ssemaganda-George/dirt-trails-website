import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Heart, Users, Globe, TreePine } from 'lucide-react';
import ChatBot from '../../components/ChatBot';

const AboutPage = () => (
  <div className="bg-slate-50 text-slate-900">
    <section className="bg-white py-20 text-slate-900">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm uppercase tracking-[0.24em] text-slate-700">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Global travel technology, built from local expertise.
          </h1>
          <p className="text-lg leading-8 text-slate-700">
            Dirt Trails combines intelligent booking, distribution and sustainability systems with hands-on travel experience to help operators and partners scale with confidence. Founded in 2022 and rooted in East Africa, we now serve travel teams and operators across international markets.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/about/team" className="inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-400">
              Meet Our Team
            </Link>
            <Link to="/about/careers" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              Careers at Dirt Trails
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Our Story</h2>
              <p className="text-base leading-8 text-slate-700">
                Dirt Trails began in 2022 when a local field guide and a technology entrepreneur joined forces to solve real problems for travel operators in East Africa. Today we build intelligence that helps operators, agents and suppliers work together with fewer systems and better outcomes.
              </p>
              <p className="text-base leading-8 text-slate-700">
                We believe travel should be profitable, responsible and easy to manage. Our platform connects bookings, distribution and sustainability workflows so operators can make faster decisions, strengthen partner relationships and deliver better guest experiences.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">What Sets Us Apart</h2>
              <p className="text-base leading-8 text-slate-700">
                Dirt Trails combines destination knowledge with technology delivery. That means the products we build are informed by real operations, regional market dynamics and the sustainability needs of modern travel teams.
              </p>
              <ul className="space-y-3 text-slate-600 list-disc list-inside">
                <li>One platform for bookings, supplier management, distribution and impact tracking.</li>
                <li>Built to support operators, agents and suppliers with local insight and global standards.</li>
                <li>Embedded sustainability workflows so impact tracking becomes part of daily operations.</li>
                <li>Rooted in East Africa and designed to scale across new markets with confidence.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Our Approach</h2>
              <p className="text-base leading-8 text-slate-700">
                We design technology around people and processes. Our goal is to make travel operations clearer, supplier relationships stronger and sustainability reporting easier for every partner.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold">Our Values</h3>
                <p className="mt-3 text-slate-600">Every decision is guided by people, performance and purpose.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <ValueCard
                  title="Authentic Leadership"
                  description="We combine local destination insight with modern product thinking to serve both travelers and operators."
                />
                <ValueCard
                  title="Sustainable Growth"
                  description="Our technology is designed to scale revenue while making measurable contributions to conservation and community impact."
                />
                <ValueCard
                  title="Partner Centric"
                  description="We collaborate with operators, agents and suppliers to improve distribution, simplify operations and grow trust."
                />
                <ValueCard
                  title="Transparent Results"
                  description="Data, reporting and accountability are built into every workflow, so teams can act faster and measure impact clearly."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-slate-100 text-slate-900">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Founded on trust</p>
            <h2 className="text-3xl font-semibold">From local beginnings to a global platform.</h2>
            <p className="text-base leading-8 text-slate-700">
              Our team brings first-hand travel operations knowledge, digital product experience and a passion for responsible tourism. That combination helps partners unlock revenue, build resilience and deliver next-level guest experiences.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Year founded" value="2022" />
            <StatCard label="Core markets" value="Travel tech, operations, sustainability" />
            <StatCard label="Global reach" value="Operators, agents and partners across international markets" />
            <StatCard label="Team focus" value="Technology, impact and premium travel" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-semibold">Join us in reimagining travel operations.</h2>
          <p className="text-base leading-8 text-slate-600">
            Whether you are a partner, operator or team member, Dirt Trails makes it easier to connect distribution, manage bookings and track sustainability across every part of the travel journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/solutions" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
              Explore Solutions
            </Link>
            <Link to="/about/careers" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              Careers & Culture
            </Link>
          </div>
        </div>
      </div>
    </section>

    <ChatBot />
  </div>
);

const ValueCard = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-3 text-slate-600 leading-7">{description}</p>
  </div>
);

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm">
    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{label}</p>
    <p className="mt-4 text-2xl font-semibold text-slate-900">{value}</p>
  </div>
);

export default AboutPage;
