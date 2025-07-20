import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, Compass, Camera, Trees, Star } from 'lucide-react';
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

  // Country specific colors and icons
  const countryThemes = {
    'Uganda': { 
      gradient: 'from-green-600 to-emerald-600', 
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      icon: Trees,
      accent: 'text-green-600'
    },
    'Kenya': { 
      gradient: 'from-orange-600 to-amber-600', 
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      icon: Camera,
      accent: 'text-orange-600'
    },
    'Tanzania': { 
      gradient: 'from-blue-600 to-teal-600', 
      bgGradient: 'from-blue-50 to-teal-50',
      borderColor: 'border-blue-200',
      icon: Compass,
      accent: 'text-blue-600'
    },
    'Rwanda': { 
      gradient: 'from-purple-600 to-pink-600', 
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      icon: Star,
      accent: 'text-purple-600'
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          {/* Safari badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full px-4 py-2 mb-6">
            <Compass className="text-amber-600" size={18} />
            <span className="text-amber-800 font-semibold text-sm tracking-wide">CURATED SAFARI EXPERIENCES</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Explore Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Safari Adventures
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our diverse range of authentic safari experiences across East Africa's most spectacular destinations. 
            From intimate wildlife encounters to breathtaking landscapes.
          </p>

          {/* Safari statistics */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium">3 Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium">Premium Experiences</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium">Eco-Certified</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Country Sections */}
        {countries.map((country, countryIndex) => {
          const theme = countryThemes[country] || countryThemes['Uganda'];
          const IconComponent = theme.icon;
          
          return (
            <div key={country} className="mb-20">
              {/* Country Header with Theme */}
              <div className={`bg-gradient-to-r ${theme.bgGradient} border ${theme.borderColor} rounded-2xl p-6 mb-8 shadow-lg`}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${theme.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                        Safari Adventures in {country}
                      </h3>
                      
                    </div>
                  </div>
                  
                  {/* Country highlight badge */}
                  {countryIndex === 0 && (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      FEATURED DESTINATION
                    </div>
                  )}
                </div>
              </div>
            
              {/* Tours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {toursByCountry[country].map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            
              {/* Enhanced View All Button */}
              <div className="text-center">
                <Button 
                  variant="outline" 
                  asChild 
                  className={`bg-gradient-to-r ${theme.bgGradient} border-2 ${theme.borderColor} hover:bg-gradient-to-r hover:${theme.gradient.replace('600', '500')} hover:text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  <Link to={`/tours?country=${encodeURIComponent(country)}`} className="flex items-center gap-2">
                    <MapPin size={18} />
                    Explore All {country} Safaris 
                    <ChevronRight size={18} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
        
        {/* Call to Action Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Can't Find Your Perfect Safari?
              </h3>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Our safari experts will craft a personalized adventure tailored to your dreams, 
                budget, and schedule across all East African destinations.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Contact Safari Expert
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