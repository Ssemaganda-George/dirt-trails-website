import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Compass, Eye, Trees } from 'lucide-react';

const Hero = () => {
  const [destination, setDestination] = useState('Uganda');
  const [days, setDays] = useState('Five');
  const [guests, setGuests] = useState('4 adults');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Safari background images slideshow
  const safariImages = [
    '/images/maasai-mara-national-reserve-safari.jpg',
    '/images/field-covered-greenery-surrounded-by-zebras-sunlight-blue-sky.jpg',
    '/images/crossroad-car-safari-scene.jpg',
    '/images/crossroad-car-safari-scene.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % safariImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const countries = ['Uganda', 'Kenya', 'Tanzania', 'Rwanda'];

  const handleSearch = () => {
    console.log({ destination, days, guests });
  };

  const handleLinkClick = (section) => {
    if (section === 'conservation') {
      window.location.href = '/environment/tree-planting';
    } 
     else if (section === 'tours') {
      window.location.href = '/tours';
    }
  };

  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Animated background slideshow */}
      <div className="absolute inset-0">
        {safariImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 z-10"></div>
      
      <div className="container relative z-20 text-white flex-grow flex items-center py-8 px-4">
        <div className="max-w-4xl">
          {/* Safari badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full px-3 py-1 mb-4">
            <Compass className="text-amber-300" size={16} />
            <span className="text-amber-100 font-medium text-xs tracking-wide">SAFE & EXPERT-GUIDED JOURNEYS</span>
          </div>
          
          {/* Main heading with safari styling - reduced size */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="block bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
              Explore.
            </span>
            <span className="block bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Connect.
            </span>
            <span className="block bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
              Sustain.
            </span>
          </h1>
          
          {/* Enhanced supporting text - reduced size */}
          <p className="text-lg md:text-xl mb-4 text-gray-200 leading-relaxed max-w-3xl">
            Embark on extraordinary safari adventures that connect you to Africa's wild heart. 
            From the Big Five to mountain gorillas, create memories while supporting conservation and local communities.
          </p>
          
          {/* Enhanced call to action buttons - reduced size */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleLinkClick('tours')}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 flex items-center gap-2"
            >
              <Eye size={18} />
              Plan My Safari
            </button>
            
            <button 
              onClick={() => handleLinkClick('conservation')}
              className="border-2 border-green-400/80 bg-green-500/20 backdrop-blur-sm text-green-200 hover:bg-green-500 hover:text-white px-6 py-2 rounded-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Trees size={18} />
              Explore Conservation
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative z-20 container pb-4 px-4">
        <div className="bg-gradient-to-r from-amber-50/95 to-orange-50/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-200/30 p-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <Search className="text-white" size={16} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Find Your Perfect Safari Adventure</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <MapPin size={14} className="text-green-600" />
                Destination
              </label>
              <select 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-sm"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Calendar size={14} className="text-blue-600" />
                Duration
              </label>
              <select 
                value={days} 
                onChange={(e) => setDays(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-sm"
              >
                <option value="Three">3 Days</option>
                <option value="Five">5 Days</option>
                <option value="Seven">7 Days</option>
                <option value="Ten">10+ Days</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Users size={14} className="text-orange-600" />
                Group Size
              </label>
              <select 
                value={guests} 
                onChange={(e) => setGuests(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-sm"
              >
                <option value="2 adults">2 Adults</option>
                <option value="4 adults">4 Adults</option>
                <option value="6 adults">6 Adults</option>
                <option value="2 adults, 2 children">Family (2+2)</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={handleSearch} 
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2 px-4 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                <Search size={16} />
                Discover Safari
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Safari ambiance indicators */}
      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
        {safariImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-amber-400 scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;