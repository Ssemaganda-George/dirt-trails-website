import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { tours } from '@/data/tours';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const [destination, setDestination] = useState('Uganda');
  const [days, setDays] = useState('Five');
  const [guests, setGuests] = useState('4 adults');
  const [tripType, setTripType] = useState('Average');
  
  const { isGoogleTranslateLoaded } = useLanguage();
  
  const countries = [...new Set(tours.map(tour => tour.country))];

  const handleSearch = () => {
    console.log({ destination, days, guests, tripType });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Background image - East African savanna from local images */}
      <div 
        className="absolute inset-0 bg-center bg-cover" 
        style={{ 
          backgroundImage: "url('/images/maasai-mara-national-reserve-safari.jpg')" 
        }}
      ></div>
      
      <div className="container relative z-20 text-white flex-grow flex-col justify-center py-20">
        <div className="max-w-2xl">
          {/* Main heading - Google Translate will handle this */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Explore. Connect. Sustain.
          </h1>
          
          {/* Supporting text - Google Translate will handle this */}
          <p className="text-xl mb-8">
            With Dirt Trails Safaris, your journey goes beyond sightseeing—enjoy meaningful travel that connects you to nature, empowers communities, and leaves a positive impact.
          </p>
          
          {/* Call to action buttons - Google Translate will handle the text */}
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-8"
              asChild
            >
              <Link to="/tours">Explore Our Tours</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white bg-white text-gray-800 hover:bg-white/20 hover:text-white transition-colors"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-safari-green bg-safari-green/20 text-white hover:bg-safari-green hover:text-white transition-colors"
              asChild
            >
              <Link to="/environment/tree-planting">Explore Conservation</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Filter section - Google Translate will handle the labels and options */}
      <div className="relative z-20 container -mt-10 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col md:flex-row items-center ml-0 mr-auto max-w-5xl">
          <div className="flex-1 w-full md:w-auto mb-3 md:mb-0">
            <label className="block text-xs font-medium text-gray-500 mb-1" id="destination-label">
              Destination
            </label>
            <select 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              className="w-full py-1 px-2 border-0 focus:ring-0 text-gray-800 font-medium text-sm"
              aria-labelledby="destination-label"
            >
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 w-full md:w-auto mb-3 md:mb-0 md:border-l border-gray-200 md:px-4">
            <label className="block text-xs font-medium text-gray-500 mb-1" id="days-label">
              Days
            </label>
            <select 
              value={days} 
              onChange={(e) => setDays(e.target.value)}
              className="w-full py-1 px-2 border-0 focus:ring-0 text-gray-800 font-medium text-sm"
              aria-labelledby="days-label"
            >
              <option value="Three">Three</option>
              <option value="Five">Five</option>
              <option value="Seven">Seven</option>
              <option value="Ten">Ten</option>
            </select>
          </div>
          
          <div className="flex-1 w-full md:w-auto mb-3 md:mb-0 md:border-l border-gray-200 md:px-4">
            <label className="block text-xs font-medium text-gray-500 mb-1" id="trip-type-label">
              Trip Type
            </label>
            <select 
              value={tripType} 
              onChange={(e) => setTripType(e.target.value)}
              className="w-full py-1 px-2 border-0 focus:ring-0 text-gray-800 font-medium text-sm"
              aria-labelledby="trip-type-label"
            >
              <option value="Budget">Budget</option>
              <option value="Average">Average</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
          
          <div className="flex-1 w-full md:w-auto mb-3 md:mb-0 md:border-l border-gray-200 md:px-4">
            <label className="block text-xs font-medium text-gray-500 mb-1" id="guests-label">
              Guests
            </label>
            <select 
              value={guests} 
              onChange={(e) => setGuests(e.target.value)}
              className="w-full py-1 px-2 border-0 focus:ring-0 text-gray-800 font-medium text-sm"
              aria-labelledby="guests-label"
            >
              <option value="2 adults">2 adults</option>
              <option value="4 adults">4 adults</option>
              <option value="6 adults">6 adults</option>
              <option value="2 adults, 2 children">2 adults, 2 children</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto mt-2 md:mt-0 md:ml-4">
            <Button 
              onClick={handleSearch} 
              size="sm" 
              className="w-full bg-green-500 hover:bg-green-600 h-8 text-sm px-4"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;