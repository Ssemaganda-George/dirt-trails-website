import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const TeamPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <section className="relative py-20 bg-safari-brown/5">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-5xl font-bold mb-4 text-safari-brown">Meet Our Team</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our experienced team is passionate about East Africa and committed to creating unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMemberCard 
              name="Mariam Wambui" 
              title="Software Engineer & CMO"
              imageSrc="/images/Mariam.jpg"
              linkedin="https://www.linkedin.com/in/mariam-wambui-942458278/"
              twitter="#"
            />
            <TeamMemberCard 
              name="Ariho Gerald" 
              title="Co-Founder & Conservation Lead"
              imageSrc="/images/Gerald.jpg"
              linkedin="https://www.linkedin.com/in/ariho-gerald-1a4714174/"
              twitter="#"
            />
            <TeamMemberCard 
              name="Nantongo Joselyne" 
              title="Operations & Logistics Manager"
              imageSrc="/images/Joselyne.jpg"
              linkedin="https://www.linkedin.com/in/nantongo-joselyn-6b395b294/"
              twitter="#"
            />
            <TeamMemberCard 
              name="Ssemaganda George" 
              title="Co-Founder & CTO"
              imageSrc="/images/George.jpg"
              linkedin="https://www.linkedin.com/in/ssemaganda-george-03bba8171/"
              twitter="#"
            />
          </div>
        </div>
      </section>

      <ChatBot />
    </div>
  );
};

const TeamMemberCard = ({ name, title, imageSrc, linkedin, twitter, instagram }: { name: string; title: string; imageSrc: string; linkedin?: string; twitter?: string; instagram?: string }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-safari-brown/10 group animate-fade-in-up">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-semibold mb-2 text-safari-brown group-hover:text-safari-green transition-colors duration-300">
          {name}
        </h3>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-4">
          {title}
        </p>
        <div className="flex justify-center space-x-4">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-safari-green hover:text-safari-orange transition-colors duration-300">
              <Linkedin size={20} />
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-safari-green hover:text-safari-orange transition-colors duration-300">
              <Twitter size={20} />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-safari-green hover:text-safari-orange transition-colors duration-300">
              <Instagram size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
