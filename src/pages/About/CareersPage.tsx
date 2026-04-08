import { Link } from 'react-router-dom';
import ChatBot from '../../components/ChatBot';

const CareersPage = () => (
  <div className="bg-slate-50 text-slate-900">
    <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-600 py-20 text-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-200">Careers</p>
          <h1 className="text-4xl font-semibold leading-tight">Build the future of travel technology with us.</h1>
          <p className="text-lg leading-8 text-slate-200">
            Dirt Trails is hiring talented people who care about travel, technology and sustainable impact. Join a team that supports operators, partners and communities through intelligent product design and thoughtful operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Contact recruiting
            </Link>
            <Link
              to="/about/team"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="container mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-3xl font-semibold">Why join Dirt Trails?</h2>
          <ul className="mt-8 space-y-4 text-slate-700">
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <strong className="block text-slate-900">Impactful work</strong>
              <span className="text-sm text-slate-600">Build technology that helps travel operators grow while supporting sustainability and community development.</span>
            </li>
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <strong className="block text-slate-900">Collaborative culture</strong>
              <span className="text-sm text-slate-600">Work with local experts, product builders and global partners in a team that values curiosity and clear communication.</span>
            </li>
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <strong className="block text-slate-900">Learning and growth</strong>
              <span className="text-sm text-slate-600">Gain exposure to travel operations, sustainability reporting and digital product delivery in a fast-moving market.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-10 text-white shadow-sm">
          <h2 className="text-3xl font-semibold text-white">Open opportunities</h2>
          <p className="mt-4 text-slate-300">
            We are currently recruiting for roles in product, operations, partner success and sustainability. If you don’t see an exact match, we still want to hear from you.
          </p>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-teal-300">Featured role</p>
              <p className="mt-3 text-xl font-semibold">Product Operations Lead</p>
              <p className="mt-2 text-slate-400">Help operators adopt our platform, improve supply coordination and strengthen commercial distribution.</p>
            </div>
            <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-teal-300">Featured role</p>
              <p className="mt-3 text-xl font-semibold">Sustainability & Impact Analyst</p>
              <p className="mt-2 text-slate-400">Support impact reporting, carbon tracking and the delivery of sustainability workflows across partner operations.</p>
            </div>
            <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-teal-300">Featured role</p>
              <p className="mt-3 text-xl font-semibold">Partner Success Coordinator</p>
              <p className="mt-2 text-slate-400">Work directly with agents, suppliers and operators to improve engagement and operational reliability.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-slate-100 py-16">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-semibold">Ready to start?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600 leading-8">
          Send us your resume or reach out with a short note about your experience. We are looking for people who want to help change how travel technology supports operators and impact programs.
        </p>
        <div className="mt-10">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Contact recruiting
          </Link>
        </div>
      </div>
    </section>

    <ChatBot />
  </div>
);

export default CareersPage;
