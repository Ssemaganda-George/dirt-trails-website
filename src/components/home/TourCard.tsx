import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, ArrowRight, Users } from 'lucide-react';
import { Tour } from '@/data/tours';

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  // Country-specific color themes matching ToursSection
  const countryThemes = {
    'Uganda': { 
      gradient: 'from-green-600 to-emerald-600', 
      lightGradient: 'from-green-500 to-emerald-500',
      accent: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    'Kenya': { 
      gradient: 'from-orange-600 to-amber-600', 
      lightGradient: 'from-orange-500 to-amber-500',
      accent: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200'
    },
    'Tanzania': { 
      gradient: 'from-blue-600 to-teal-600', 
      lightGradient: 'from-blue-500 to-teal-500',
      accent: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    'Rwanda': { 
      gradient: 'from-purple-600 to-pink-600', 
      lightGradient: 'from-purple-500 to-pink-500',
      accent: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    }
  };

  // Get theme based on tour country, default to Uganda theme
  const theme = countryThemes[tour.country] || countryThemes['Uganda'];

  return (
    <Link 
      to={`/tours/${tour.slug}`}
      className="group block"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100 relative">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={tour.coverImage} 
            alt={tour.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Discount Badge */}
          {tour.discount && (
            <div className={`absolute top-4 right-4 bg-gradient-to-r ${theme.gradient} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse`}>
              {tour.discount}% OFF
            </div>
          )}

          {/* Country Badge */}
          <div className={`absolute top-4 left-4 ${theme.bg} ${theme.accent} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${theme.border} shadow-md`}>
            {tour.country}
          </div>

          {/* Hover Arrow Icon */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div className={`w-10 h-10 bg-gradient-to-r ${theme.gradient} rounded-full flex items-center justify-center shadow-lg`}>
              <ArrowRight className="text-white" size={18} />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 relative">
          {/* Location */}
          <div className="flex items-center text-gray-500 mb-3">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{tour.location}</span>
          </div>

          {/* Title */}
          <h3 
            className={`text-lg font-bold mb-3 ${theme.accent} group-hover:text-gray-800 transition-colors leading-tight min-h-[3.5rem] relative`}
            title={tour.name} // Shows full title on hover
          >
            <span className="line-clamp-2">
              {tour.name.length > 60 ? `${tour.name.substring(0, 60)}...` : tour.name}
            </span>
          </h3>

          {/* Stats Row */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-700">{tour.rating}</span>
            </div>
            
            <div className="flex items-center text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span className="font-medium">{tour.duration} days</span>
            </div>
          </div>


          {/* Price Section */}
          <div className="flex items-end justify-between pt-3 border-t border-gray-100">
            <div>
              <div className="text-xs text-gray-500 mb-1">Starting from</div>
              <div className={`text-xl font-bold ${theme.accent}`}>
                ${tour.price.toLocaleString()}
                <span className="text-sm text-gray-500 font-normal ml-1">per person</span>
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
  );
};

export default TourCard;