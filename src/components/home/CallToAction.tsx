import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="relative py-16 bg-accent text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      <div 
        className="absolute inset-0 bg-center bg-cover" 
        style={{ backgroundImage: `url('/images/safari-cta.jpg')` }}
      ></div>
      
      <div className="container relative z-10 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Start Your Journey
            </div>

            <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
              Ready for Your
              <span className="block text-white">
                African Adventure?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-white font-light">
              Contact our team to start planning your perfect East African journey today.
              <span className="block mt-1 text-base text-white">
                ✨ Personalized itineraries • Expert guides • Unforgettable memories
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="group bg-white text-accent hover:bg-cream hover:text-brown-900 transition-all duration-300 px-6 py-3 text-base font-semibold shadow-xl hover:shadow-2xl border-0" 
              asChild
            >
              <Link to="/tours" className="flex items-center gap-3">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Browse Tours
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-accent hover:scale-105 transition-all duration-300 px-6 py-3 text-base font-semibold backdrop-blur-sm" 
              asChild
            >
              <Link to="/contact" className="flex items-center gap-3">
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 fill-cream">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" opacity="0.1"/>
          <path d="M0,80 C300,40 900,120 1200,80 L1200,120 L0,120 Z" opacity="0.05"/>
        </svg>
      </div>
    </section>
  );
};

export default CallToAction;