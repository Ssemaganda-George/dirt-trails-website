import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  return (
    <section className="relative py-24 bg-cream via-cream/30 to-cream overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cream/40 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cream/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/60 rounded-full blur-lg"></div>
      </div>
      
      <div className="container relative z-10 max-w-7xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-cream text-accent px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-cream">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd"/>
            </svg>
            Testimonials
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif mb-6 bg-gradient-to-r from-brown-900 via-accent to-brown-900 bg-clip-text text-transparent leading-tight">
            What Our Travelers Say
          </h2>
          
          <p className="text-brown-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Don't just take our word for it - hear from travelers who have experienced the magic of East Africa with us.
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-accent rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-32"></div>
          </div>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="transform hover:scale-105 transition-transform duration-300 md:mt-8">
              <TestimonialCard 
                name="Kobusingye Sharon"
                location="Uganda"
                quote="It was remarkable"
                rating={5}
                imageSrc="/images/Sharon.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;