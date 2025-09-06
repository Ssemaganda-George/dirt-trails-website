
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Users, Globe, TreePine } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-safari-brown/10">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Dirt Trails Safaris</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            We're passionate about showcasing East Africa's incredible wildlife, landscapes, and cultures while promoting sustainable and responsible tourism.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4">
                Dirt Trails Safaris was founded in 2022 by a team of a passionate local guide and a computer scientist with over 4 years of combined experience. What began as a small operation has grown into a leading tour provider, but our core values remain unchanged.
              </p>
              <p className="mb-4">
                We believe that travel should be transformative, educational, and responsible. Our intimate knowledge of East Africa's wildlife patterns, hidden gems, and local communities allows us to create authentic experiences that go beyond the typical tourist destinations.
              </p>
              <p>
                As a locally owned and operated company, we're committed to ensuring that tourism benefits the people, wildlife, and ecosystems of East Africa. We work closely with conservation organizations and community projects to ensure your visit has a positive impact.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/images/dirt-trails.jpg" 
                alt="Safari guides"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-safari-brown/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our core values guide everything we do, from designing our tours to working with local communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<Users className="h-10 w-10 text-safari-orange" />}
              title="Local Expertise" 
              description="Our guides are all local experts with intimate knowledge of the terrain, wildlife, and culture."
            />
            <ValueCard 
              icon={<Heart className="h-10 w-10 text-safari-orange" />}
              title="Exceptional Service" 
              description="We pride ourselves on personalized service and attention to detail for unforgettable experiences."
            />
            <ValueCard 
              icon={<TreePine className="h-10 w-10 text-safari-orange" />}
              title="Sustainability" 
              description="Responsible tourism that respects wildlife, environments, and local communities."
            />
            <ValueCard 
              icon={<Globe className="h-10 w-10 text-safari-orange" />}
              title="Community Impact" 
              description="Supporting local communities through employment and development initiatives."
            />
          </div>
        </div>
      </section>

      {/* Conservation Efforts */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="images/PORTRAIT.jpg" 
                alt="Conservation efforts"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Conservation Commitment</h2>
              <p className="mb-4">
                We believe that tourism can be a powerful force for conservation. That's why we've established our Environmental Conservation Program, which directs a portion of every booking to support vital conservation initiatives across East Africa.
              </p>
              <p className="mb-4">
                Through our Tree Planting Initiative, travelers can contribute an additional $50 to plant indigenous trees in areas affected by deforestation. With each contribution, you'll receive a certificate and tracking link that allows you to monitor the growth and impact of your trees for years to come.
              </p>
              <p className="mb-6">
                We also partner with wildlife conservation organizations focused on protecting endangered species like elephants, rhinos, and mountain gorillas, ensuring that these magnificent creatures will be around for future generations to appreciate.
              </p>
              <Button asChild>
                <Link to="/contact">Learn How You Can Contribute</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-safari-brown/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our experienced team is passionate about East Africa and committed to creating unforgettable experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMemberCard 
              name="Ssemaganda George" 
              title="Co-Founder & Lead Guide"
              imageSrc="/images/George.jpg"
            />
            <TeamMemberCard 
              name="Ariho Gerald" 
              title="Co-Founder and conservation Lead"
              imageSrc="/images/Gerald.jpg"
            />
            <TeamMemberCard 
              name="Mariam Wambui" 
              title="Chief Marketing Officer"
              imageSrc="/images/Mariam.jpg"
            />
            <TeamMemberCard 
              name="Nantongo Joselyne" 
              title="Operations Manager"
              imageSrc="/images/Joselyne.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-safari-green text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore East Africa with Us?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact our team to start planning your perfect safari adventure today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" className="bg-white text-safari-green hover:bg-transparent hover:text-white" asChild>
              <Link to="/tours">Browse Tours</Link>
            </Button>
            <Button size="lg" className="bg-safari-orange hover:bg-safari-orange/90" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

// Value Card Component
const ValueCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ name, title, imageSrc }: { name: string; title: string; imageSrc: string }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md text-center">
      <div className="h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default AboutPage;
