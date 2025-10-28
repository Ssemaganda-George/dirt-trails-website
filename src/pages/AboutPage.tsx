import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Users, Globe, TreePine } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Professional Color Scheme */}
      <section className="relative py-24 bg-safari-green text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative">
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              About Dirt Trails Safaris
            </h1>
            <p className="text-xl text-white max-w-3xl leading-relaxed">
              We're passionate about showcasing Africa's incredible wildlife, landscapes, and cultures while promoting sustainable and responsible tourism.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story - Professional */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold mb-8 text-safari-brown">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Dirt Trails Safaris was founded in 2022 by a team of a passionate local guide and a computer scientist with over 4 years of combined experience. What began as a small operation has grown into a leading tour provider, but our core values remain unchanged.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that travel should be transformative, educational, and responsible. Our intimate knowledge of East Africa's wildlife patterns, hidden gems, and local communities allows us to create authentic experiences that go beyond the typical tourist destinations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As a locally owned and operated company, we're committed to ensuring that tourism benefits the people, wildlife, and ecosystems of East Africa. We work closely with conservation organizations and community projects to ensure your visit has a positive impact.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <img 
                src="/images/dirt-trails.jpg" 
                alt="Safari guides"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values - Professional */}
      <section className="py-20 bg-safari-brown/5">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6 text-safari-brown">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our core values guide everything we do, from designing our tours to working with local communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<TreePine className="h-12 w-12 text-safari-green" />}
              title="Sustainability First" 
              description="We prioritize eco-friendly practices, ensuring every safari contributes to conservation and climate resilience."
            />
            <ValueCard 
              icon={<Globe className="h-12 w-12 text-safari-green" />}
              title="Community Empowerment" 
              description="We partner with local guides and communities, creating jobs and opportunities while celebrating cultural heritage."
            />
            <ValueCard 
              icon={<Heart className="h-12 w-12 text-safari-green" />}
              title="Safety & Comfort" 
              description="We guarantee safe, reliable, and comfortable travel experiences so guests can explore with peace of mind."
            />
            <ValueCard 
              icon={<Users className="h-12 w-12 text-safari-green" />}
              title="Innovation with Purpose" 
              description="Through our digital platform, we make planning, booking, and enjoying safaris seamless and impactful."
            />
          </div>
        </div>
      </section>

      {/* Conservation Efforts - Professional */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <img 
                src="images/PORTRAIT.jpg" 
                alt="Conservation efforts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl font-bold mb-8 text-safari-brown">
                Our Conservation Commitment
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that tourism can be a powerful force for conservation. That's why we've established our Environmental Conservation Program, which directs a portion of every booking to support vital conservation initiatives across East Africa.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through our Tree Planting Initiative, travelers can openly contribute to indigenous tree planting in areas affected by deforestation. With each contribution, you'll receive a certificate and tracking link that allows you to monitor the growth and impact of your trees for years to come.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We also partner with wildlife conservation organizations focused on protecting endangered species like elephants, rhinos, and mountain gorillas, ensuring that these magnificent creatures will be around for future generations to appreciate.
              </p>
              <Button size="lg" className="bg-safari-green hover:bg-safari-green/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" asChild>
                <Link to="/contact">Learn How You Can Contribute</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team - Professional */}
      <section className="py-20 bg-safari-brown/5">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6 text-safari-brown">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our experienced team is passionate about East Africa and committed to creating unforgettable experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <TeamMemberCard 
              name="Mariam Wambui" 
              title="Software Engineer & CMO"
              imageSrc="/images/Mariam.jpg"
            />
            <TeamMemberCard 
              name="Ariho Gerald" 
              title="Co-Founder & Conservation Lead"
              imageSrc="/images/Gerald.jpg"
            />
            <TeamMemberCard 
              name="Nantongo Joselyne" 
              title="Operations & Logistics Manager"
              imageSrc="/images/Joselyne.jpg"
            />
            <TeamMemberCard 
              name="Ssemaganda George" 
              title="Co-Founder & CTO"
              imageSrc="/images/George.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section - Professional */}
      <section className="py-20 bg-safari-green text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Explore East Africa with Us?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-white">
            Contact our team to start planning your perfect safari adventure today.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" variant="outline" className="bg-white text-safari-green hover:bg-safari-brown hover:text-white border-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" asChild>
              <Link to="/tours">Browse Tours</Link>
            </Button>
            <Button size="lg" className="bg-safari-orange hover:bg-safari-orange/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

// Value Card Component - Professional
const ValueCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-safari-brown/10 group animate-fade-in-up">
      <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-safari-brown group-hover:text-safari-green transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};

// Team Member Card Component - Professional
const TeamMemberCard = ({ name, title, imageSrc }: { name: string; title: string; imageSrc: string }) => {
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
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
          {title}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
