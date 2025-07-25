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
      {/* Hero Section - Enhanced with gradient and modern styling */}
      <section className={`relative py-20 bg-gradient-to-r ${theme.lightGradient} text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-center bg-cover" 
          style={{ backgroundImage: `url('${destination.image}')` }}
        ></div>
        
        <div className="container relative z-20">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <div className={`${theme.bg} ${theme.accent} px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${theme.border} shadow-md`}>
                <MapPin size={16} className="mr-2 inline" />
                {destination.country}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {destination.name}
              <span className="block bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent text-3xl md:text-4xl mt-2">
                Awaits Your Discovery
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-50 max-w-3xl leading-relaxed">
              {destination.shortDescription}
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>
      
      {/* Destination Information */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                <h2 className={`text-3xl font-bold mb-6 ${theme.accent}`}>About {destination.name}</h2>
                <p className="mb-8 text-stone-600 whitespace-pre-line leading-relaxed">{destination.description}</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                <h3 className={`text-2xl font-semibold mb-6 ${theme.accent}`}>Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className={`${theme.bg} p-4 rounded-xl border ${theme.border} hover:shadow-md transition-all duration-300 transform hover:scale-105`}>
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${theme.gradient} mr-3 shadow-sm`}></div>
                        <span className="font-medium text-stone-700">{highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className={`text-2xl font-semibold mb-4 ${theme.accent}`}>Best Time to Visit</h3>
                <p className="text-stone-600 leading-relaxed">{destination.bestTimeToVisit}</p>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
                <h3 className={`text-xl font-semibold mb-6 ${theme.accent}`}>Quick Information</h3>
                
                <div className="space-y-4">
                  <InfoItem label="Country" value={destination.country} />
                  <InfoItem label="Weather" value="Varies by season (see best time to visit)" />
                  <InfoItem label="Languages" value="English, Swahili" />
                  <InfoItem label="Currency" value={getCurrency(destination.country)} />
                </div>
                
                <div className="mt-8">
                  <Button 
                    className={`w-full bg-gradient-to-r ${theme.gradient} hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg`} 
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
        <section className="py-12 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.accent}`}>
                Tours in {destination.name}
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
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
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100 relative h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={tour.coverImage} 
            alt={tour.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Discount Badge */}
          {tour.discount && (
            <div className={`absolute top-4 right-4 bg-gradient-to-r ${theme.gradient} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse`}>
              {tour.discount}% OFF
            </div>
          )}

          {/* Hover Arrow Icon */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div className={`w-10 h-10 bg-gradient-to-r ${theme.gradient} rounded-full flex items-center justify-center shadow-lg`}>
              <ArrowRight className="text-white" size={18} />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 relative flex-grow flex flex-col">
          {/* Location */}
          <div className="flex items-center text-stone-600 mb-3">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{tour.location}</span>
          </div>

          {/* Title */}
          <h3 
            className={`text-lg font-bold mb-3 ${theme.accent} ${theme.hoverAccent} transition-colors leading-tight`}
            title={tour.name}
          >
            <span className="line-clamp-2">
              {tour.name}
            </span>
          </h3>

          {/* Tagline */}
          <p className="text-stone-600 mb-4 line-clamp-2 flex-grow text-sm leading-relaxed">
            {tour.tagline}
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-green-400 text-green-400" />
              <span className="font-semibold text-stone-700">{tour.rating}</span>
            </div>
            
            <div className="flex items-center text-stone-600">
              <Calendar size={16} className="mr-1" />
              <span className="font-medium">{tour.duration} days</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-end justify-between pt-3 border-t border-gray-100 mt-auto">
            <div>
              <div className="text-xs text-stone-500 mb-1">Starting from</div>
              <div className={`text-xl font-bold ${theme.accent}`}>
                ${tour.price.toLocaleString()}
                <span className="text-sm text-stone-500 font-normal ml-1">per person</span>
              </div>
            </div>
            
            {/* View Details Button */}
            <div className={`opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-r ${theme.gradient} text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md`}>
              View Details
            </div>
          </div>

          {/* Decorative corner accent */}
          <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${theme.lightGradient} opacity-5 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
        </div>

        {/* Card Border Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
      </div>
    </Link>
  ))}
</div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                asChild
                className={`bg-gradient-to-r ${theme.gradient} hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg px-8 py-4`}
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