import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is the Vision Map and who is it for?',
    answer: 'The Vision Map is a strategic planning tool for travel operators, partners and destination teams. It combines market intelligence, partner workflows and sustainable product positioning into a clear growth roadmap.',
  },
  {
    question: 'How does the Vision Map support distribution and partner strategy?',
    answer: 'It surfaces the right channels, partner roles and commercial workflows so your packages, tours and premium products move through local and international networks with confidence.',
  },
  {
    question: 'Can the Vision Map include sustainability and impact planning?',
    answer: 'Yes. Sustainability is built into the Vision Map, with responsible travel positioning, impact reporting and compliance guidance layered into your product and partner strategy.',
  },
  {
    question: 'How do you turn the Vision Map into action?',
    answer: 'Our team translates the Vision Map into practical recommendations, onboarding support and integration steps that help your operation move from strategy to delivery.',
  },
  {
    question: 'What insights are included in the Vision Map?',
    answer: 'We include market demand signals, pricing guidance, partner performance indicators and operational gaps so you can make better decisions and grow more sustainably.',
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
              Vision Map FAQs
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950">Frequently asked questions about the Vision Map.</h1>
            <p className="text-lg leading-8 text-slate-600">Explore how the Vision Map aligns market intelligence, partner strategy and sustainable travel operations for travel teams and collaborators.</p>
            <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-[#2ECC71] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#28b765]">
              Start your Vision Map inquiry
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
