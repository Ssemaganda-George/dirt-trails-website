import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Calendar, Star, ArrowRight } from 'lucide-react';
import { tours } from '@/data/tours';
import { Button } from "@/components/ui/button";

const ToursPage = () => {
  const location = useLocation();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const theme = {
    gradient: 'from-green-600 to-green-700', 
    lightGradient: 'from-green-400 to-green-500',
    accent: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    hoverAccent: 'hover:text-green-700'
  };
  
  // Collect at least 2 images from each tour's gallery
  const tourImages = tours.flatMap(tour => 
    tour.images && tour.images.length > 0 
      ? tour.images.slice(0, Math.min(2, tour.images.length)).map(img => img.url) 
      : []
  );
  
  // Fallback images if no tour images
  const fallbackImages = [
    '/images/dt3.jpg',
    '/images/field-covered-greenery-surrounded-by-zebras-sunlight-blue-sky.jpg',
    '/images/dt6.jpg',
    '/images/dt2.JPG'
  ];
  
  const safariImages = tourImages.length > 0 ? tourImages : fallbackImages;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % safariImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [safariImages.length]);
  
  // Filter tours by selected country
  const filteredTours = selectedCountry 
    ? tours.filter(tour => tour.country === selectedCountry) 
    : tours;

  // Sort tours based on selected option
  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'duration-short') return a.duration - b.duration;
    if (sortBy === 'duration-long') return b.duration - a.duration;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const countries = Array.from(new Set(tours.map(tour => tour.country))).sort();

  console.log('Current filters:', { selectedCountry, sortBy });
  console.log('Filtered tours count:', filteredTours.length);
  console.log('Sorted tours count:', sortedTours.length);

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative py-20 bg-gradient-to-r ${theme.lightGradient} text-white overflow-hidden`}>
        {/* Animated background slideshow */}
        <div className="absolute inset-0" role="img" aria-label="Safari background slideshow featuring tour images">
          {safariImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-center bg-cover transition-opacity duration-[1800ms] ease-in-out ${
                index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Explore Our 
              <span className="block bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                Amazing Tours
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-50 max-w-3xl leading-relaxed">
              Discover our safe and expertly crafted East African safari experiences, each designed to showcase the region's incredible wildlife, landscapes, and cultures.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl z-20"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl z-20"></div>
        
        {/* Image navigation dots */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3 bg-black/30 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-full">
          {safariImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-amber-400 w-6 sm:w-8 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Tours List Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filter and Sort Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-semibold text-stone-700">Filter by country:</span>
                <button 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    !selectedCountry 
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg` 
                      : `${theme.bg} ${theme.accent} hover:shadow-md border ${theme.border}`
                  }`}
                  onClick={() => setSelectedCountry(null)}
                >
                  All Countries ({tours.length})
                </button>
                {countries.map(country => {
                  const countryCount = tours.filter(tour => tour.country === country).length;
                  return (
                    <button 
                      key={country}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedCountry === country 
                          ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg` 
                          : `${theme.bg} ${theme.accent} hover:shadow-md border ${theme.border}`
                      }`}
                      onClick={() => setSelectedCountry(country)}
                    >
                      {country} ({countryCount})
                    </button>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="font-semibold text-stone-700">Sort by:</label>
                <select 
                  id="sort" 
                  className={`border ${theme.border} rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 font-medium ${theme.accent}`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration-short">Duration: Shortest First</option>
                  <option value="duration-long">Duration: Longest First</option>
                  <option value="rating">Rating: Highest First</option>
                </select>
              </div>
            </div>
            
           
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedTours.map((tour) => (
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
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay */}
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
                        View : Customise : Book
                      </div>
                    </div>

                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${theme.lightGradient} opacity-5 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                  </div>

                  <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
                </div>
              </Link>
            ))}
          </div>

          {/* No results message */}
          {sortedTours.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${theme.lightGradient} opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <MapPin size={24} className={theme.accent} />
                </div>
                <h3 className="text-xl font-bold text-stone-700 mb-2">No Tours Found</h3>
                <p className="text-stone-600">
                  No tours found{selectedCountry ? ` in ${selectedCountry}` : ''} matching your filters. 
                  Please try different criteria.
                </p>
                <button 
                  className={`mt-4 px-6 py-2 bg-gradient-to-r ${theme.gradient} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                  onClick={() => {
                    setSelectedCountry(null);
                    setSortBy('default');
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ToursPage;