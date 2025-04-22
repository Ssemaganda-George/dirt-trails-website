
import FeatureCard from './FeatureCard';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-safari-brown/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Dirt Trails Safaris</h2>
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
  );
};

export default WhyChooseUs;
