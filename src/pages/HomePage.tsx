
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Calendar, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tours } from '@/data/tours';

const HomePage = () => {
  const featuredTours = tours.filter(tour => tour.featured).slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-center bg-cover" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80')" 
          }}
        ></div>
        
        <div className="container relative z-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Experience the Magic of <br/>East Africa
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-in animate-delay-200">
              Embark on a journey through breathtaking landscapes, encounter magnificent wildlife and immerse yourself in diverse cultures.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in animate-delay-300">
              <Button size="lg" asChild>
                <Link to="/tours">Explore Our Tours</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-safari-brown" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Tours Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Tours</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Discover our most popular experiences showcasing the best of East Africa's wildlife, landscapes, and cultures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <Link 
                key={tour.id} 
                to={`/tours/${tour.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <img 
                    src={tour.coverImage} 
                    alt={tour.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  {tour.discount && (
                    <span className="absolute top-4 right-4 bg-safari-orange text-white px-2 py-1 rounded text-sm font-semibold">
                      {tour.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{tour.location}, {tour.country}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-safari-orange transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {tour.tagline}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center text-safari-orange">
                      <Star size={18} className="fill-current" />
                      <span className="ml-1 font-medium">{tour.rating}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar size={18} className="mr-1" />
                      <span className="text-sm">{tour.duration} days</span>
                    </div>
                    <div className="text-safari-green font-semibold">
                      ${tour.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/tours" className="flex items-center">
                View All Tours <ChevronRight size={18} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 bg-safari-brown/10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose East Africa Tours</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We are dedicated to providing exceptional travel experiences with a focus on sustainability, authenticity, and unforgettable memories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Expert Local Guides" 
              description="Our experienced guides have intimate knowledge of East Africa's wildlife, culture and hidden gems."
              iconUrl="https://images.unsplash.com/photo-1534531173927-aeb928d54385?auto=format&fit=crop&w=300&q=80"
            />
            <FeatureCard 
              title="Customizable Experiences" 
              description="Tailor your safari adventure to match your interests, preferences, and travel style."
              iconUrl="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80"
            />
            <FeatureCard 
              title="Conservation Commitment" 
              description="We contribute to wildlife conservation and community development with every booking."
              iconUrl="https://images.unsplash.com/photo-1581005148959-534d70cf3aa9?auto=format&fit=crop&w=300&q=80"
            />
          </div>
        </div>
      </section>
      
      {/* Conservation Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Supporting Conservation Across East Africa</h2>
              <p className="mb-6 text-muted-foreground">
                At East Africa Tours, we believe in responsible tourism that benefits local communities and protects wildlife habitats. Through our Environmental Conservation Program, $50 from each booking goes directly to important conservation initiatives.
              </p>
              <p className="mb-8 text-muted-foreground">
                When you add our Tree Planting Program to your booking, you'll receive a certificate and tracking link to monitor the growth and impact of your contribution to reforestation efforts.
              </p>
              <Button asChild>
                <Link to="/about">Learn More About Our Efforts</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80" 
                alt="Conservation efforts"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-safari-green/5 hero-pattern">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it - hear from travelers who have experienced the magic of East Africa with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah Johnson"
              location="United States"
              quote="The Masai Mara Safari exceeded all our expectations. Our guide was incredibly knowledgeable, and we saw all of the Big Five!"
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
            />
            <TestimonialCard 
              name="David Chen"
              location="Singapore"
              quote="Wonderful safari experience! We traveled in June and were lucky enough to see the beginning of the wildebeest migration."
              rating={4}
              imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
            />
            <TestimonialCard 
              name="Emma Brown"
              location="Australia"
              quote="This was our honeymoon trip and it couldn't have been more perfect. The attention to detail was impressive!"
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-safari-green text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your African Adventure?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Contact our team to start planning your perfect East African journey today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" className="bg-white text-safari-green border-white hover:bg-transparent hover:text-white" asChild>
              <Link to="/tours">Browse Tours</Link>
            </Button>
            <Button size="lg" className="bg-safari-orange hover:bg-safari-orange/90 text-white" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component for Feature Cards
const FeatureCard = ({ title, description, iconUrl }: { title: string; description: string; iconUrl: string }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 rounded-full overflow-hidden mb-6">
        <img src={iconUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

// Component for Testimonial Cards
const TestimonialCard = ({ name, location, quote, rating, imageSrc }: { name: string; location: string; quote: string; rating: number; imageSrc: string }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <img src={imageSrc} alt={name} className="w-12 h-12 object-cover rounded-full" />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <p className="mb-4">"{quote}"</p>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < rating ? "text-safari-orange fill-current" : "text-gray-300"}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
