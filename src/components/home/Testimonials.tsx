
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  return (
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
  );
};

export default Testimonials;
