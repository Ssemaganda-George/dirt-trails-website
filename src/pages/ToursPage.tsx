
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star } from 'lucide-react';
import { tours } from '@/data/tours';

const ToursPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');
  
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
    // Default: no specific sorting
    return 0;
  });

  // Get unique countries for filter
  const countries = Array.from(new Set(tours.map(tour => tour.country)));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-safari-brown/10">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Tours</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Discover our expertly crafted East African safari experiences, each designed to showcase the region's incredible wildlife, landscapes, and cultures.
          </p>
        </div>
      </section>

      {/* Tours List Section */}
      <section className="py-12">
        <div className="container">
          {/* Filter and Sort Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium">Filter by country:</span>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${!selectedCountry ? 'bg-safari-orange text-white' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setSelectedCountry(null)}
              >
                All
              </button>
              {countries.map(country => (
                <button 
                  key={country}
                  className={`px-3 py-1 rounded-full text-sm ${selectedCountry === country ? 'bg-safari-orange text-white' : 'bg-muted hover:bg-muted/80'}`}
                  onClick={() => setSelectedCountry(country)}
                >
                  {country}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="font-medium">Sort by:</label>
              <select 
                id="sort" 
                className="border border-border rounded-md px-3 py-1 bg-background"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration-short">Duration: Shortest First</option>
                <option value="duration-long">Duration: Longest First</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((tour) => (
              <Link 
                key={tour.id} 
                to={`/tours/${tour.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col h-full"
              >
                <div className="relative h-64">
                  <img 
                    src={tour.coverImage} 
                    alt={tour.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  {tour.discount && (
                    <span className="absolute top-4 right-4 bg-safari-orange text-white px-2 py-1 rounded text-sm font-semibold">
                      {tour.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{tour.location}, {tour.country}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-safari-orange transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
                    {tour.tagline}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div className="flex items-center text-safari-orange">
                      <Star size={18} className="fill-current" />
                      <span className="ml-1 font-medium">{tour.rating}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar size={18} className="mr-1" />
                      <span className="text-sm">{tour.duration} days</span>
                    </div>
                    <div className="text-safari-green font-semibold">
                      ${tour.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {sortedTours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No tours found matching your filters. Please try different criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ToursPage;
