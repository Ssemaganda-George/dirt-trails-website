import { Link } from 'react-router-dom';

const events = [
  {
    title: 'Travel Tech Partner Webinar',
    date: 'May 14, 2026',
    description: 'A live session on partner connectivity, distribution automation and how to use travel intelligence to grow bookings.',
  },
  {
    title: 'Sustainability Reporting Workshop',
    date: 'June 2, 2026',
    description: 'Learn how to embed carbon, community and compliance metrics into your product operations and partner reporting.',
  },
  {
    title: 'Operator Roundtable: Distribution Growth',
    date: 'July 10, 2026',
    description: 'Join other operators and agents to discuss best practices for scaling partner sales and supplier collaboration.',
  },
];

const EventsPage = () => (
  <div className="bg-[#F8F9FA] text-[#0F172A]">
    <section className="bg-white">
      <div className="container mx-auto px-4 py-20 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
            Webinars & Events
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">Live events for travel operators, partners and technologists.</h1>
          <p className="text-lg leading-8 text-slate-600">Join our upcoming sessions to learn how to improve partner success, integrate systems and build better travel products with intelligence.</p>
          <Link to="/resources" className="inline-flex items-center justify-center rounded-full bg-[#2ECC71] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#28b765]">
            Explore resources
          </Link>
        </div>
      </div>
    </section>

    <main className="container mx-auto px-4 pb-32 lg:px-8">
      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.22em] text-teal-600">{event.date}</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{event.title}</h2>
            <p className="mt-4 text-slate-600 leading-7">{event.description}</p>
            <Link to="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Register interest
            </Link>
          </div>
        ))}
      </div>
    </main>
  </div>
);

export default EventsPage;
