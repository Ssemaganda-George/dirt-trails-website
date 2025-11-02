import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Mail, X } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const team = [
	{
		name: 'Ariho Gerald',
		title: 'Co-Founder & Conservation Lead',
		image: '/images/Gerald.jpg',
		bio: 'Gerald is a conservationist and local guide with deep roots in East Africa. He oversees our conservation programs and works closely with communities to ensure sustainable tourism and positive impact.',
		linkedin: 'https://www.linkedin.com/in/ariho-gerald-1a4714174/',
		twitter: 'https://twitter.com/geraldariho',
		instagram: 'https://instagram.com/geraldariho',
		email: 'gerald@dirttrails.com',
	},
	{
		name: 'Mariam Wambui',
		title: 'Software Engineer & CMO',
		image: '/images/Mariam.jpg',
		bio: 'Mariam brings a unique blend of software engineering and marketing expertise. She manages our digital presence and guest communications, ensuring our message of sustainability reaches a global audience.',
		linkedin: 'https://www.linkedin.com/in/mariam-wambui-942458278/',
		twitter: 'https://twitter.com/mariamwambui',
		instagram: 'https://instagram.com/mariamwambui',
		email: 'mariam@dirttrails.com',
	},
	{
		name: 'Nantongo Joselyne',
		title: 'Operations & Logistics Manager',
		image: '/images/Joselyne.jpg',
		bio: 'Joselyne is the backbone of our operations, coordinating logistics, guest services, and on-the-ground support. Her attention to detail ensures every trip runs smoothly from start to finish.',
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
		linkedin: 'https://www.linkedin.com/in/ssemaganda-george-03bba8171/',
		twitter: 'https://twitter.com/ssemagandageorge',
		instagram: 'https://instagram.com/ssemagandageorge',
		email: 'george@dirttrails.com',
	},
];

const TeamPage = () => {
	const [selected, setSelected] = useState<number | null>(null);

	return (
		<div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
			<section className="relative py-20 bg-safari-brown/5">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12 animate-fade-in-up">
						<h1 className="text-5xl md:text-6xl font-bold mb-4 text-safari-brown">
							Meet Our Team
						</h1>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Our experienced team is passionate about East Africa and committed to
							creating unforgettable, sustainable safari experiences for every guest.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
						{team.map((member, idx) => (
							<div
								key={member.name}
								className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-safari-brown/10 group animate-fade-in-up cursor-pointer"
								style={{ animationDelay: `${idx * 100}ms` }}
								onClick={() => setSelected(idx)}
								tabIndex={0}
								role="button"
								aria-label={`View bio for ${member.name}`}
								onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(idx); }}
							>
								<div className="relative h-64 overflow-hidden">
									<img
										src={member.image}
										alt={member.name}
										className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-safari-green/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>
								<div className="p-6 text-center flex flex-col h-full">
									<h3 className="text-2xl font-semibold mb-1 text-safari-brown group-hover:text-safari-green transition-colors duration-300">
										{member.name}
									</h3>
									<p className="text-safari-green font-medium mb-2">
										{member.title}
									</p>
									<div className="flex justify-center space-x-4 mt-2">
										{member.linkedin && (
											<a
												href={member.linkedin}
												target="_blank"
												rel="noopener noreferrer"
												className="text-safari-green hover:text-safari-orange transition-colors duration-300"
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
												className="text-safari-green hover:text-safari-orange transition-colors duration-300"
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
												className="text-safari-green hover:text-safari-orange transition-colors duration-300"
												aria-label={`${member.name} Instagram`}
												onClick={e => e.stopPropagation()}
											>
												<Instagram size={20} />
											</a>
										)}
										{member.email && (
											<a
												href={`mailto:${member.email}`}
												className="text-safari-green hover:text-safari-orange transition-colors duration-300"
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
					{/* Modal for bio */}
					{selected !== null && (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2">
							<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-4 sm:p-8 relative animate-fade-in-up">
								<button
									className="absolute top-4 right-4 text-gray-400 hover:text-safari-green transition-colors"
									onClick={() => setSelected(null)}
									aria-label="Close bio"
								>
									<X size={24} />
								</button>
								<div className="flex flex-col items-center">
									<img
										src={team[selected].image}
										alt={team[selected].name}
										className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-safari-green/20 shadow"
									/>
									<h3 className="text-2xl font-bold mb-1 text-safari-brown">{team[selected].name}</h3>
									<p className="text-safari-green font-medium mb-2">{team[selected].title}</p>
									<div className="flex justify-center space-x-4 mb-4">
										{team[selected].linkedin && (
											<a
												href={team[selected].linkedin}
												target="_blank"
												rel="noopener noreferrer"
												className="text-safari-green hover:text-safari-orange transition-colors duration-300"
												aria-label={`${team[selected].name} LinkedIn`}
											>
												<Linkedin size={20} />
											</a>
										)}
										{team[selected].twitter && (
											<a
												href={team[selected].twitter}
												target="_blank"
												rel="noopener noreferrer"
												className="text-safari-green hover:text-safari-orange transition-colors duration-300"
												aria-label={`${team[selected].name} Twitter`}
											>
												<Twitter size={20} />
											</a>
										)}
										{team[selected].instagram && (
											<a
												href={team[selected].instagram}
												target="_blank"
												rel="noopener noreferrer"
												className="text-safari-green hover:text-safari-orange transition-colors duration-300"
												aria-label={`${team[selected].name} Instagram`}
											>
												<Instagram size={20} />
											</a>
										)}
										{team[selected].email && (
											<a
												href={`mailto:${team[selected].email}`}
												className="text-safari-green hover:text-safari-orange transition-colors duration-300"
												aria-label={`${team[selected].name} Email`}
											>
												<Mail size={20} />
											</a>
										)}
									</div>
									<p className="text-gray-700 text-base leading-relaxed">{team[selected].bio}</p>
								</div>
							</div>
							<div
								className="fixed inset-0 z-40"
								onClick={() => setSelected(null)}
								aria-label="Close bio overlay"
							/>
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
