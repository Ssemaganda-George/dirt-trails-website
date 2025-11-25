import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Mail, X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const team = [
	{
		name: 'Ariho Gerald',
		title: 'Co-Founder & Conservation Lead',
		image: '/images/Gerald.jpg',
		bio: 'Gerald is a conservationist and local guide with deep roots in East Africa. He oversees our conservation programs and works closely with communities to ensure sustainable tourism and positive impact.',
		accordion: [
			{ title: 'Education', content: 'Bachelor of Science in Environmental Conservation from Makerere University.' },
			{ title: 'Personal Haven', content: 'Enjoys hiking in the Maasai Mara and birdwatching.' }
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
		bio: 'Mariam is our Chief Operating Officer, bringing exceptional technical expertise and strategic business acumen to Dirt Trails. She oversees our digital operations, marketing initiatives, and technology infrastructure while ensuring seamless guest experiences. Her proactive leadership and innovative approach drive our growth and operational excellence across all departments.',
		accordion: [
			{ title: 'Education', content: 'Bachelor of Science in Software Engineering from Makerere University.' },
			{ title: 'Personal Haven', content: 'Loves reading tech blogs and exploring Kenyan coastlines.' }
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
		bio: 'Joselyne is the backbone of our operations, coordinating logistics, guest services, and on-the-ground support. Her attention to detail ensures every trip runs smoothly from start to finish.',
		accordion: [
			{ title: 'Education', content: 'Bachelor of Science in Hospitality Management from Makerere University.' },
			{ title: 'Personal Haven', content: 'Passionate about cooking Ugandan cuisine and community volunteering.' }
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
		bio: 'George is a passionate technologist and safari enthusiast with a background in computer science and eco-tourism. He leads our digital innovation and ensures every guest enjoys a seamless, safe, and memorable experience.',
		accordion: [
			{ title: 'Education', content: 'Bachelor of Science in Computer Science from Makerere University.' },
			{ title: 'Personal Haven', content: 'Enjoys coding open-source projects and safari photography.' }
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
		if (selected !== null) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
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

	const toggleAccordion = (index: number) => {
		setOpenAccordion(openAccordion === index ? null : index);
	};

	return (
		<div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
			<style>
				{`
					:root {
						--color-background-warm: #F8F5EE;
						--color-text-primary: #282828;
						--color-accent: #85A89E;
					}
					.team-grid {
						display: grid;
						grid-template-columns: 1fr;
						gap: 1.5rem;
					}
					@media (min-width: 768px) {
						.team-grid {
							grid-template-columns: repeat(2, 1fr);
							gap: 2rem;
						}
					}
					@media (min-width: 1024px) {
						.team-grid {
							grid-template-columns: repeat(4, 1fr);
							gap: 2.5rem;
						}
					}
					.team-member img {
						aspect-ratio: 3 / 4;
						object-fit: cover;
					}
					.modal-bg {
						background-color: #4CAF50; /* safari-green */
						transform: translateY(100%);
						transition: transform 0.5s ease-out;
					}
					.modal-bg.open {
						transform: translateY(0);
					}
					.accordion-title {
						border-bottom: 1px solid rgba(255, 255, 255, 0.3);
						cursor: pointer;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 1rem 0;
					}
					.accordion-content {
						padding: 1rem 0;
						color: white;
					}
				`}
			</style>
			<section className="relative py-20" style={{ backgroundColor: 'var(--color-background-warm)' }}>
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12 animate-fade-in-up">
						<h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
							Meet The Team
						</h2>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Our experienced team is passionate about East Africa and committed to
							creating unforgettable, sustainable safari experiences for every guest.
						</p>
					</div>

					<div className="team-grid">
						{team.map((member, idx) => (
							<div key={member.name} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
								<div
									className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-safari-brown/10 group cursor-pointer"
									onClick={() => setSelected(idx)}
									tabIndex={0}
									role="button"
									aria-label={`View bio for ${member.name}`}
									onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(idx); }}
								>
									<div className="relative overflow-hidden team-member">
										<img
											src={member.image}
											alt={member.name}
											className="w-full transition-transform duration-700 group-hover:scale-110"
											loading="lazy"
										/>
									</div>
								</div>
								<div className="text-center mt-4">
									<h3 className="text-2xl font-semibold mb-1 group-hover:text-safari-green transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>
										{member.name}
									</h3>
									<p className="font-medium mb-2" style={{ color: 'var(--color-accent)' }}>
										{member.title}
									</p>
									<div className="flex justify-center space-x-4">
										{member.linkedin && (
											<a
												href={member.linkedin}
												target="_blank"
												rel="noopener noreferrer"
												className="hover:text-safari-orange transition-colors duration-300"
												style={{ color: 'var(--color-accent)' }}
												aria-label={`${member.name} LinkedIn`}
												onClick={e => e.stopPropagation()}
											>
												<Linkedin size={20} />
											</a>
										)}
										{member.twitter && (
											<a
												href={member.twitter}
												target="_blank"
												rel="noopener noreferrer"
												className="hover:text-safari-orange transition-colors duration-300"
												style={{ color: 'var(--color-accent)' }}
												aria-label={`${member.name} Twitter`}
												onClick={e => e.stopPropagation()}
											>
												<Twitter size={20} />
											</a>
										)}
										{member.instagram && (
											<a
												href={member.instagram}
												target="_blank"
												rel="noopener noreferrer"
												className="hover:text-safari-orange transition-colors duration-300"
												style={{ color: 'var(--color-accent)' }}
												aria-label={`${member.name} Instagram`}
												onClick={e => e.stopPropagation()}
											>
												<Instagram size={20} />
											</a>
										)}
										{member.email && (
											<a
												href={`mailto:${member.email}`}
												className="hover:text-safari-orange transition-colors duration-300"
												style={{ color: 'var(--color-accent)' }}
												aria-label={`${member.name} Email`}
												onClick={e => e.stopPropagation()}
											>
												<Mail size={20} />
											</a>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
					{/* Full-Screen Modal */}
					{selected !== null && (
						<div className="fixed inset-0 z-50 modal-bg open flex">
							<button
								className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
								onClick={() => setSelected(null)}
								aria-label="Close modal"
							>
								<X size={32} />
							</button>
							<div className="flex flex-col md:flex-row w-full">
								{/* Left Column: Image */}
								<div className="w-full md:w-1/2 flex items-center justify-center bg-gray-200 h-full">
									<img
										src={team[selected].image}
										alt={team[selected].name}
										className="h-full w-full object-cover"
										loading="lazy"
									/>
								</div>
								{/* Right Column: Content */}
								<div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white overflow-y-auto">
									<h1 className="text-4xl md:text-6xl font-serif mb-2">{team[selected].name}</h1>
									<p className="text-xl md:text-2xl font-sans mb-6">{team[selected].title}</p>
									<p className="text-base md:text-lg leading-relaxed mb-8">{team[selected].bio}</p>
									{/* Accordion */}
									<div className="mb-8">
										{team[selected].accordion.map((item, idx) => (
											<div key={idx}>
												<div className="accordion-title" onClick={() => toggleAccordion(idx)}>
													<span className="text-lg uppercase">{item.title}</span>
													{openAccordion === idx ? <Minus size={20} /> : <Plus size={20} />}
												</div>
												{openAccordion === idx && (
													<div className="accordion-content">
														<p>{item.content}</p>
													</div>
												)}
											</div>
										))}
									</div>
									{/* Navigation */}
									<div className="flex justify-between mt-auto">
										<button onClick={handlePrev} className="flex items-center text-white hover:text-gray-300 transition-colors">
											<ChevronLeft size={20} />
											<span className="ml-2 uppercase">Previous</span>
										</button>
										<button onClick={handleNext} className="flex items-center text-white hover:text-gray-300 transition-colors">
											<span className="mr-2 uppercase">Next</span>
											<ChevronRight size={20} />
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
			<section className="py-16 bg-safari-green/5">
				<div className="max-w-3xl mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4 text-safari-green">
						Why Choose Us?
					</h2>
					<p className="text-lg text-gray-700 mb-6">
						Our team combines local expertise, conservation passion, and digital
						innovation to deliver safe, authentic, and impactful safaris. We are
						committed to sustainability, community empowerment, and guest
						satisfaction.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
						<Link
							to="/about"
							className="px-8 py-3 bg-safari-green text-white rounded-xl font-semibold shadow-lg hover:bg-safari-brown transition-all duration-300"
						>
							Learn More About Dirt Trails Safaris
						</Link>
						<Link
							to="/contact"
							className="px-8 py-3 bg-safari-orange text-white rounded-xl font-semibold shadow-lg hover:bg-safari-green transition-all duration-300"
						>
							Wish to Join Our Team?
						</Link>
					</div>
				</div>
			</section>
			<ChatBot />
		</div>
	);
};

export default TeamPage;
