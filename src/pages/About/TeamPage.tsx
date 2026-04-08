import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Mail, X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const team = [
  {
    name: 'Ariho Gerald',
    title: 'Co-Founder & Conservation Lead',
    image: '/images/Gerald.jpg',
    bio: 'Gerald brings conservation leadership, field knowledge and community partnerships together to shape responsible travel offerings that protect wildlife and empower local stakeholders.',
    accordion: [
      { title: 'Expertise', content: 'Conservation strategy, community engagement and sustainable experience design.' },
      { title: 'Background', content: 'Bachelor of Science in Environmental Conservation from Makerere University.' },
    ],
    linkedin: 'https://www.linkedin.com/in/ariho-gerald-1a4714174/',
    twitter: 'https://twitter.com/geraldariho',
    instagram: 'https://instagram.com/geraldariho',
    email: 'gerald@dirttrails.com',
  },
  {
    name: 'Mariam Wambui',
    title: 'COO, Lead Technology & Growth',
    image: '/images/Mariam.jpg',
    bio: 'Mariam blends product leadership with travel operations to build digital systems that accelerate growth, improve performance and make partner workflows more efficient.',
    accordion: [
      { title: 'Expertise', content: 'Platform delivery, tech operations and go-to-market enablement.' },
      { title: 'Background', content: 'Bachelor of Science in Software Engineering from Makerere University.' },
    ],
    linkedin: 'https://www.linkedin.com/in/mariam-wambui-942458278/',
    twitter: 'https://twitter.com/mariamwambui',
    instagram: 'https://instagram.com/mariamwambui',
    email: 'mariam@dirttrails.com',
  },
  {
    name: 'Nantongo Joselyne',
    title: 'CMO & Logistics Manager',
    image: '/images/Joselyne.jpg',
    bio: 'Nantongo coordinates logistics, guest services and communications so every travel experience is smooth, memorable and reflects our operational standards.',
    accordion: [
      { title: 'Expertise', content: 'Guest services, logistics planning and partner communication.' },
      { title: 'Background', content: 'Bachelor of Science in Hospitality Management from Makerere University.' },
    ],
    linkedin: 'https://www.linkedin.com/in/nantongo-joselyn-6b395b294/',
    twitter: 'https://twitter.com/joselynenantongo',
    instagram: 'https://instagram.com/joselynenantongo',
    email: 'joselyne@dirttrails.com',
  },
  {
    name: 'Ssemaganda George',
    title: 'Co-Founder & CTO',
    image: '/images/George.jpg',
    bio: 'George leads our technology vision, making sure the platform is scalable, secure and easy for travel teams to adopt while supporting sustainability and distribution outcomes.',
    accordion: [
      { title: 'Expertise', content: 'Software architecture, product design and travel technology innovation.' },
      { title: 'Background', content: 'Bachelor of Science in Computer Science from Makerere University.' },
    ],
    linkedin: 'https://www.linkedin.com/in/ssemaganda-george-03bba8171/',
    twitter: 'https://twitter.com/ssemagandageorge',
    instagram: 'https://instagram.com/ssemagandageorge',
    email: 'george@dirttrails.com',
  },
];

const TeamPage = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selected]);

  const handlePrev = () => {
    setSelected((prev) => (prev === 0 ? team.length - 1 : prev! - 1));
    setOpenAccordion(null);
  };

  const handleNext = () => {
    setSelected((prev) => (prev === team.length - 1 ? 0 : prev! + 1));
    setOpenAccordion(null);
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-600">Our Team</p>
          <h1 className="mt-4 text-4xl font-semibold">Who builds the Dirt Trails platform</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Our team combines local travel expertise, sustainability leadership and software execution to support travel operators, distribution partners and impact-focused programs.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member, idx) => (
            <button
              key={member.name}
              type="button"
              onClick={() => setSelected(idx)}
              className="group rounded-3xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="overflow-hidden rounded-3xl bg-slate-100">
                <img src={member.image} alt={member.name} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-5">
                <h2 className="text-2xl font-semibold text-slate-900">{member.name}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-teal-600">{member.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selected !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <button
              className="absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700"
              onClick={() => setSelected(null)}
              aria-label="Close team member details"
            >
              <X size={24} />
            </button>
            <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden bg-slate-900 md:rounded-l-[2rem]">
                <img src={team[selected].image} alt={team[selected].name} className="h-full w-full object-cover" />
              </div>
              <div className="p-8 md:p-12">
                <h2 className="text-4xl font-semibold text-slate-900">{team[selected].name}</h2>
                <p className="mt-3 text-xl uppercase tracking-[0.24em] text-teal-600">{team[selected].title}</p>
                <p className="mt-6 text-base leading-8 text-slate-700">{team[selected].bio}</p>
                <div className="mt-8 space-y-4">
                  {team[selected].accordion.map((item, idx) => (
                    <div key={item.title}>
                      <button
                        type="button"
                        onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                        className="flex w-full items-center justify-between border-b border-slate-200 pb-3 text-left text-slate-900"
                      >
                        <span className="text-base font-semibold">{item.title}</span>
                        {openAccordion === idx ? <Minus size={18} /> : <Plus size={18} />}
                      </button>
                      {openAccordion === idx && (
                        <p className="mt-3 text-slate-600 leading-7">{item.content}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3 text-slate-700">
                    {team[selected].linkedin && (
                      <a href={team[selected].linkedin} target="_blank" rel="noreferrer" className="transition hover:text-slate-900">
                        <Linkedin size={24} />
                      </a>
                    )}
                    {team[selected].twitter && (
                      <a href={team[selected].twitter} target="_blank" rel="noreferrer" className="transition hover:text-slate-900">
                        <Twitter size={24} />
                      </a>
                    )}
                    {team[selected].instagram && (
                      <a href={team[selected].instagram} target="_blank" rel="noreferrer" className="transition hover:text-slate-900">
                        <Instagram size={24} />
                      </a>
                    )}
                    {team[selected].email && (
                      <a href={`mailto:${team[selected].email}`} className="transition hover:text-slate-900">
                        <Mail size={24} />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      <ChevronLeft size={18} /> Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Next <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-semibold">Careers with Purpose</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
            We are hiring across product, operations and partner success roles. Join a team that builds technology for travel operators and drives sustainable impact for communities.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/about/careers"
              className="inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-400"
            >
              View open roles
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Contact recruiting
            </Link>
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

export default TeamPage;
