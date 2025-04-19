
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
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
  );
};

export default Hero;
