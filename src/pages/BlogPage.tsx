import { Link } from 'react-router-dom';
import PageTemplate from './PageTemplate';

const BlogPage = () => (
  <div className="bg-[#F8F9FA] text-[#0F172A]">
    <section className="bg-white">
      <div className="container mx-auto px-4 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.7fr] items-start">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
              Blog
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">Travel technology insights for operators and partners.</h1>
            <p className="text-lg leading-8 text-slate-600">Explore the latest thinking on travel intelligence, partner distribution, sustainability workflows and digital operations for travel teams.</p>
            <Link to="/resources" className="inline-flex items-center justify-center rounded-full bg-[#2ECC71] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#28b765]">
              Back to Resources
            </Link>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="h-[320px] rounded-[1.5rem] bg-slate-200 text-slate-500 grid place-items-center text-center px-6">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Image placeholder</p>
                <p className="mt-4 text-base leading-7 text-slate-700">Featured blog visual or team insight image.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main className="container mx-auto px-4 pb-32 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3 mt-16">
        {blogPosts.map((post) => (
          <article key={post.title} className="rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200 hover:-translate-y-1 transition-transform duration-300">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">{post.category}</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{post.title}</h2>
            <p className="mt-4 text-slate-600 leading-7">{post.description}</p>
            <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500">
              <span>{post.date}</span>
              <Link to="/contact" className="font-semibold text-slate-900 hover:text-[#2ECC71]">
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  </div>
);

const blogPosts = [
  {
    title: 'Why travel intelligence matters for operators',
    category: 'Travel Tech',
    description: 'How data-driven systems help operators improve yield, partner coordination and guest satisfaction.',
    date: 'April 2026',
  },
  {
    title: 'Building stronger supplier networks with better connectivity',
    category: 'Distribution',
    description: 'The value of shared inventory, partner scorecards and API-ready supplier workflows.',
    date: 'March 2026',
  },
  {
    title: 'Sustainability reporting that partners can trust',
    category: 'Sustainability',
    description: 'Why measurable impact metrics are now table stakes for premium travel products.',
    date: 'February 2026',
  },
];

export default BlogPage;
