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
    title: 'Logistics Manager',
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
    bio: 'George leads our business-technology vision, making sure the platform is scalable, secure and easy for travel teams to adopt while supporting sustainability and distribution outcomes.',
    accordion: [
      { title: 'Expertise', content: 'Software architecture, product design and travel technology innovation.' },
      { title: 'Background', content: 'Bachelor of Science in Computer Science from Makerere University.' },
    ],
    linkedin: 'https://www.linkedin.com/in/ssemaganda-george-03bba8171/',
    twitter: 'https://twitter.com/ssemagandageor4',
    instagram: 'https://instagram.com/ssemagandageorge',
    email: 'george@dirttrails.com',
  },
  {
    name: 'Mukisa Vaniah Christian',
    title: 'Software Development Lead',
    image: '/images/Vaniah.jpg',
    bio: 'Vaniah leads the project tecnical departments, making sure every collaboration is executed smoothly  with our service delivery and standards matching client expectations.',
    accordion: [
      { title: 'Expertise', content: 'Intelligent software systems and innovative travel solutions.' },
      { title: 'Background', content: 'Bachelor of Software Engineering from Makerere University.' },
    ],
    email: 'vaniah@dirttrails.com',
  },
  {
    name: 'Nalwoga Winfred',
    title: 'Chief Marketing Officer',
    image: '/images/Winnie.jpg',
    bio: 'With hands-on experience in lodge operations and the safari industry, Winnie understands the end-to-end traveler experience. She specializes in identifying market gaps, crafting compelling travel offerings, and driving visibility through strategic marketing and partnerships with tour operators and travel agencies. Winnie is passionate about leveraging digital platforms and innovative thinking to create accessible, well-structured, and high-impact solutions.',
    accordion: [
      { title: 'Expertise', content: 'Guest services, logistics planning and partner communication.' },
      { title: 'Background', content: 'Bachelor of Business Administration from  Makerere University Business School.' },
    ],
    email: 'vaniah@dirttrails.com',
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
          <h1 className="mt-4 text-4xl font-semibold">Meet the team powering Dirt Trails</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Our team combines local travel expertise, sustainability leadership and software delivery to support travel operators, distribution partners and impact-driven programs.
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-200/80 p-4 sm:p-6">
          <div className="relative mx-auto w-full max-w-[95vw] sm:max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl sm:my-8 max-h-[calc(100vh-2rem)]">
            <button
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              onClick={() => setSelected(null)}
              aria-label="Close team member details"
            >
              <X size={22} />
            </button>
            <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] h-full min-h-0">
              <div className="overflow-hidden bg-slate-100 md:rounded-l-[2rem] max-h-72 md:max-h-none md:min-h-0">
                <img src={team[selected].image} alt={team[selected].name} className="h-64 w-full object-cover md:h-full" />
              </div>
              <div className="flex flex-col p-5 md:p-12 overflow-y-auto min-h-0 max-h-[calc(100vh-6rem)]">
                <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{team[selected].name}</h2>
                <p className="mt-3 text-base uppercase tracking-[0.24em] text-teal-600 md:text-xl">{team[selected].title}</p>
                <p className="mt-5 text-sm leading-7 text-slate-700 md:text-base md:leading-8">{team[selected].bio}</p>
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

      <section className="bg-white py-20 text-slate-900">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-semibold">Careers with Purpose</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            We are hiring across product, operations and partner success roles. Join a team that builds technology for travel operators and drives sustainable impact for communities.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/about/careers"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View open roles
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
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
