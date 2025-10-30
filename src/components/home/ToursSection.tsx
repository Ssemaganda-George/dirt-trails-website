import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, Compass, Trees } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tours } from '@/data/tours';
import TourCard from './TourCard';


const ToursSection = () => {
  // Group tours by country
  const toursByCountry = tours.reduce((acc, tour) => {
    if (!acc[tour.country]) {
      acc[tour.country] = [];
    }
    acc[tour.country].push(tour);
    return acc;
  }, {} as Record<string, typeof tours>);

  // Sort countries with Uganda first, then others alphabetically
  const countries = Object.keys(toursByCountry).sort((a, b) => {
    if (a === 'Uganda') return -1;
    if (b === 'Uganda') return 1;
    return a.localeCompare(b);
  });

  const theme = {
    gradient: 'from-green-600 to-green-700', 
    lightGradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
    borderColor: 'border-green-200',
    icon: Trees,
    accent: 'text-green-600'
  };

  return (
    <section className="py-15 bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Simplified decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-15 left-8 w-24 h-24 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-30 right-15 w-18 h-18 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-15 left-1/4 w-21 h-21 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          {/* Safari badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-300/30 rounded-full px-3 py-1.5 mt-4 mb-4">
            <Compass className="text-green-600" size={16} />
            <span className="text-green-800 font-semibold text-xs tracking-wide">SMALL GROUPS OR PRIVATE OPTIONS?</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
              Explore All Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent">
              Safari Adventures
            </span>
          </h2>
          
          <p className="text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Discover our diverse range of authentic safari experiences across East Africa's most spectacular destinations. 
            From intimate wildlife encounters to breathtaking landscapes.
          </p>

          {/* Safari statistics */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-stone-600 font-medium">4 Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-stone-600 font-medium">Premium Experiences</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-stone-600 font-medium">Eco-Certified</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Country Sections */}
        {countries.map((country, countryIndex) => {
          const IconComponent = theme.icon;
          
          return (
            <div key={country} className="mb-15">
              {/* Country Header with Theme */}
              <div className={`bg-gradient-to-r ${theme.bgGradient} border ${theme.borderColor} rounded-xl p-4 mb-6 shadow-lg`}>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 bg-gradient-to-r ${theme.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-stone-800 flex items-center gap-2">
                        Safari Adventures in {country}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Country highlight badge */}
                  {countryIndex === 0 && (
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                      FEATURED DESTINATION
                    </div>
                  )}
                </div>
              </div>
            
              {/* Tours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {toursByCountry[country].map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            
              <div className="text-center">
                <Button 
                  variant="outline" 
                  asChild 
                  className={`bg-gradient-to-r ${theme.bgGradient} border-2 ${theme.borderColor} hover:bg-gradient-to-r hover:${theme.lightGradient} hover:text-white font-semibold px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  <Link to={`/tours?country=${encodeURIComponent(country)}`} className="flex items-center gap-2">
                    <MapPin size={16} />
                    Explore All {country} Safaris 
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
        
        {/* Call to Action Section */}
        <div className="text-center mt-15">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-18 h-18 bg-white/10 rounded-full translate-y-9 -translate-x-9"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Can't Find Your Perfect Safari?
              </h3>
              <p className="text-green-100 mb-4 max-w-xl mx-auto">
                Our safari experts will craft a personalized adventure tailored to your dreams, 
                budget, and schedule across all East African destinations.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <Button 
                  variant="secondary" 
                  className="bg-white text-green-700 hover:bg-green-50 font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    Talk to a Safari Expert
                  </Link> 
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;