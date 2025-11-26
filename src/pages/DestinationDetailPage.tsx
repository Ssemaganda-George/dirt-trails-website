import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations } from '@/data/destinations';
import { tours } from '@/data/tours';
import ChatBot from '@/components/ChatBot';

const DestinationDetailPage = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  
  const theme = {
    gradient: 'from-green-600 to-green-700', 
    lightGradient: 'from-green-400 to-green-500',
    accent: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    hoverAccent: 'hover:text-green-700'
  };
  
  // Find the destination by slug
  const destination = destinations.find(d => d.slug === destinationSlug);
  
  // Find tours for this destination
  const destinationTours = tours.filter(tour => 
    destination && (tour.location === destination.name || tour.country === destination.country)
  );
  
  if (!destination) {
    return (
      <div className="container py-20 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-gray-100">
          <div className={`w-16 h-16 bg-gradient-to-r ${theme.lightGradient} opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center`}>
            <MapPin size={24} className={theme.accent} />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-stone-700">Destination Not Found</h1>
          <p className="mb-8 text-stone-600">Sorry, the destination you're looking for doesn't exist.</p>
          <Button 
            asChild 
            className={`bg-gradient-to-r ${theme.gradient} hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg`}
          >
            <Link to="/destinations">Browse All Destinations</Link>
          </Button>
        </div>
        <ChatBot />
      </div>
    );
  }

  return (
    <div>
      <section className={`relative py-24 bg-cream text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-center bg-cover" 
          style={{ backgroundImage: `url('${destination.image}')` }}
        ></div>
        
        <div className="container relative z-20 max-w-7xl">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <div className={`${theme.bg} ${theme.accent} px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${theme.border} shadow-md`}>
                <MapPin size={16} className="mr-2 inline" />
                {destination.country}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white leading-tight">
              {destination.name}
              <span className="block text-3xl md:text-4xl mt-2">
                Awaits Your Discovery
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl leading-relaxed">
              {destination.shortDescription}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-cream rounded-2xl shadow-lg p-8 mb-8 border border-cream">
                <h2 className={`text-3xl font-serif mb-6 ${theme.accent}`}>About {destination.name}</h2>
                <p className="mb-8 text-brown-600 whitespace-pre-line leading-relaxed">{destination.description}</p>
              </div>
              
              <div className="bg-cream rounded-2xl shadow-lg p-8 mb-8 border border-cream">
                <h3 className={`text-2xl font-serif mb-6 ${theme.accent}`}>Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className={`${theme.bg} p-4 rounded-xl border ${theme.border} hover:shadow-md transition-all duration-300 transform hover:scale-105`}>
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full bg-accent mr-3 shadow-sm`}></div>
                        <span className="font-medium text-brown-700">{highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-cream rounded-2xl shadow-lg p-8 border border-cream">
                <h3 className={`text-2xl font-serif mb-4 ${theme.accent}`}>Best Time to Visit</h3>
                <p className="text-brown-600 leading-relaxed">{destination.bestTimeToVisit}</p>
              </div>
            </div>
            
            <div>
              <div className="bg-cream rounded-2xl shadow-lg p-6 sticky top-24 border border-cream">
                <h3 className={`text-xl font-serif mb-6 ${theme.accent}`}>Quick Information</h3>
                
                <div className="space-y-4">
                  <InfoItem label="Country" value={destination.country} />
                  <InfoItem label="Weather" value="Varies by season (see best time to visit)" />
                  <InfoItem label="Languages" value="English, Swahili" />
                  <InfoItem label="Currency" value={getCurrency(destination.country)} />
                </div>
                
                <div className="mt-8">
                  <Button 
                    className={`w-full bg-accent hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg`} 
                    asChild
                  >
                    <Link to="/contact" className="flex items-center justify-center">
                      Inquire About Travel
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {destinationTours.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="container max-w-7xl">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${theme.accent}`}>
                Tours in {destination.name}
              </h2>
              <p className="text-brown-600 max-w-2xl mx-auto">
                Discover our carefully curated safari experiences in this incredible destination
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinationTours.map((tour) => (
                <Link 
                  key={tour.id} 
                  to={`/tours/${tour.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-cream relative h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={tour.coverImage} 
                        alt={tour.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      <div className="absolute inset-0 bg-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {tour.discount && (
                        <div className={`absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse`}>
                          {tour.discount}% OFF
                        </div>
                      )}

                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <div className={`w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg`}>
                          <ArrowRight className="text-white" size={18} />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 relative flex-grow flex flex-col">
                      <div className="flex items-center text-brown-600 mb-3">
                        <MapPin size={16} className="mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">{tour.location}</span>
                      </div>

                      <h3 
                        className={`text-lg font-serif mb-3 ${theme.accent} ${theme.hoverAccent} transition-colors leading-tight`}
                        title={tour.name}
                      >
                        <span className="line-clamp-2">
                          {tour.name}
                        </span>
                      </h3>

                      <p className="text-brown-600 mb-4 line-clamp-2 flex-grow text-sm leading-relaxed">
                        {tour.tagline}
                      </p>

                      <div className="flex items-center justify-between mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="fill-accent text-accent" />
                          <span className="font-semibold text-brown-700">{tour.rating}</span>
                        </div>
                        
                        <div className="flex items-center text-brown-600">
                          <Calendar size={16} className="mr-1" />
                          <span className="font-medium">{tour.duration} days</span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between pt-3 border-t border-brown-200 mt-auto">
                        <div>
                          <div className="text-xs text-brown-500 mb-1">Starting from</div>
                          <div className={`text-xl font-serif ${theme.accent}`}>
                            ${tour.price.toLocaleString()}
                            <span className="text-sm text-brown-500 font-normal ml-1">per person</span>
                          </div>
                        </div>
                        
                        <div className={`opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-accent text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md`}>
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                asChild
                className={`bg-accent hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg px-8 py-4`}
              >
                <Link to="/tours" className="flex items-center">
                  View All Tours
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
      <ChatBot />
    </div>
  );
};

// Helper component for information items - Enhanced styling
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
    <span className="font-semibold text-stone-700">{label}:</span> 
    <span className="text-stone-600 text-right ml-4">{value}</span>
  </div>
);

// Helper function to get currency based on country
const getCurrency = (country: string): string => {
  switch (country) {
    case 'Kenya':
      return 'Kenyan Shilling (KES)';
    case 'Tanzania':
      return 'Tanzanian Shilling (TZS)';
    case 'Uganda':
      return 'Ugandan Shilling (UGX)';
    case 'Rwanda':
      return 'Rwandan Franc (RWF)';
    default:
      return 'Varies by country';
  }
};

export default DestinationDetailPage;