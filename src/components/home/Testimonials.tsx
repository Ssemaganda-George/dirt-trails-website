import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-green-50/30 to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-100/40 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/60 rounded-full blur-lg"></div>
      </div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full">
          <defs>
            <pattern id="testimonial-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" className="text-green-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonial-pattern)"/>
        </svg>
      </div>

      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-green-100/80 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-green-200/50">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Testimonials
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent leading-tight">
            What Our Travelers Say
          </h2>
          
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Don't just take our word for it - hear from travelers who have experienced the magic of East Africa with us.
          </p>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-transparent w-32"></div>
          </div>
        </div>
        
        {/* Cards Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <TestimonialCard 
                name="Sarah Johnson"
                location="United States"
                quote="The Masai Mara Safari exceeded all our expectations. Our guide was incredibly knowledgeable, and we saw all of the Big Five!"
                rating={5}
                imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
              />
            </div>
            
            <div className="transform hover:scale-105 transition-transform duration-300 md:mt-8">
              <TestimonialCard 
                name="David Chen"
                location="Singapore"
                quote="Wonderful safari experience! We traveled in June and were lucky enough to see the beginning of the wildebeest migration."
                rating={4}
                imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              />
            </div>
            
            <div className="transform hover:scale-105 transition-transform duration-300">
              <TestimonialCard 
                name="Emma Brown"
                location="Australia"
                quote="This was our honeymoon trip and it couldn't have been more perfect. The attention to detail was impressive!"
                rating={5}
                imageSrc="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
              />
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Testimonials;