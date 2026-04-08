import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'How does Dirt Trails help travel operators scale distribution?',
    answer: 'Our platform centralizes bookings, inventory and partner connectivity so operators can distribute products through agents, OTAs and supplier networks without manual coordination.',
  },
  {
    question: 'Can partners integrate with our existing systems?',
    answer: 'Yes. Dirt Trails supports API integrations, channel management workflows and partner feeds to connect with your current booking and supplier systems.',
  },
  {
    question: 'How do you track sustainability and impact?',
    answer: 'Integrated workflows capture carbon, community and compliance metrics within every booking, making it easy to report on responsible travel outcomes and partner impact.',
  },
  {
    question: 'What support is available for onboarding?',
    answer: 'We provide onboarding guidance, technical enablement, training for partner teams and ongoing support to help you launch faster and maintain smooth operations.',
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#F8F9FA] text-[#0F172A]">
      <section className="bg-white">
        <div className="container mx-auto px-4 py-20 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
              FAQs
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">Frequently asked questions for partners and travel teams.</h1>
            <p className="text-lg leading-8 text-slate-600">Find quick answers about how Dirt Trails supports distribution, integrations, sustainability reporting and partner success.</p>
            <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-[#2ECC71] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#28b765]">
              Browse all resources
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-32 lg:px-8">
        <div className="mt-16 rounded-[2rem] bg-white p-8 shadow-sm border border-slate-200">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="rounded-3xl border border-slate-200 p-6">
                <button
                  className="flex w-full items-center justify-between text-left text-slate-900"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  type="button"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openIndex === index && (
                  <p className="mt-4 text-slate-600 leading-7">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
