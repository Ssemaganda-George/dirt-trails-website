import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Compass, Eye, Trees, ChevronDown } from 'lucide-react';

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

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 0.3,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-[30vh] min-h-[400px] flex flex-col overflow-hidden">
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
      
      {/* Responsive gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40 sm:from-black/60 sm:via-black/40 sm:to-black/30 z-10"></div>
      
      <div className="container relative z-20 text-white flex-grow flex items-center py-2 sm:py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center w-full gap-3 xl:gap-6">
          {/* Main content section - compact sizing */}
          <div className="flex-1 max-w-full xl:max-w-2xl">
            {/* Safari badge - compact */}
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full px-2.5 py-1 mb-2">
              <Compass className="text-amber-300" size={10} />
              <span className="text-amber-100 font-medium text-xs tracking-wide">
                <span className="hidden sm:inline">EXPERT-GUIDED SAFARIS</span>
                <span className="sm:hidden">EXPERT SAFARIS</span>
              </span>
            </div>
            
            {/* Main heading - compact */}
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-2 leading-tight">
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
            
            {/* Supporting text - compact */}
            <p className="text-xs sm:text-sm md:text-base xl:text-sm mb-3 sm:mb-4 text-gray-200 leading-relaxed max-w-full xl:max-w-xl">
              <span className="hidden sm:inline">
                Extraordinary safari adventures that connect you to Africa's wildlife while supporting conservation.
              </span>
              <span className="sm:hidden">
                Amazing safaris supporting conservation.
              </span>
            </p>
            
            {/* Call to action buttons - compact */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleLinkClick('tours')}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 border-0 flex items-center gap-2 text-xs sm:text-sm"
              >
                <Eye size={14} />
                Plan Safari
              </button>
              
              <button 
                onClick={() => handleLinkClick('conservation')}
                className="border-2 border-green-400/80 bg-green-500/20 backdrop-blur-sm text-green-200 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm"
              >
                <Trees size={14} />
                Conservation
              </button>
            </div>
          </div>
          
          {/* Desktop search box - compact */}
          <div className="hidden xl:block flex-shrink-0">
            <div className="w-72 bg-gradient-to-br from-amber-50/95 to-orange-50/95 backdrop-blur-lg rounded-xl shadow-xl border border-amber-200/30 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Search className="text-white" size={12} />
                </div>
                <h3 className="text-sm font-bold text-gray-800">Find Your Safari</h3>
              </div>
              
              <div className="flex flex-col gap-2.5">
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                    <MapPin size={10} className="text-green-600" />
                    Destination
                  </label>
                  <select 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full py-2 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-sm"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                      <Calendar size={10} className="text-blue-600" />
                      Duration
                    </label>
                    <select 
                      value={days} 
                      onChange={(e) => setDays(e.target.value)}
                      className="w-full py-2 px-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-xs"
                    >
                      <option value="Three">3 Days</option>
                      <option value="Five">5 Days</option>
                      <option value="Seven">7 Days</option>
                      <option value="Ten">10+ Days</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                      <Users size={10} className="text-orange-600" />
                      Group
                    </label>
                    <select 
                      value={guests} 
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full py-2 px-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-xs"
                    >
                      <option value="2 adults">2 Adults</option>
                      <option value="4 adults">4 Adults</option>
                      <option value="6 adults">6 Adults</option>
                      <option value="2 adults, 2 children">Family</option>
                    </select>
                  </div>
                </div>
                
                <button 
                  onClick={handleSearch} 
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2 px-4 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm mt-2"
                >
                  <Search size={14} />
                  Discover
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile/Tablet search box - compact */}
      <div className="xl:hidden relative z-20 container pb-2 px-4 sm:px-6">
        <div className="bg-gradient-to-r from-amber-50/95 to-orange-50/95 backdrop-blur-lg rounded-xl shadow-xl border border-amber-200/30 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <Search className="text-white" size={10} />
            </div>
            <h3 className="text-xs font-bold text-gray-800">Find Your Safari</h3>
          </div>
          
          {/* Compact grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="space-y-1 sm:col-span-2 lg:col-span-1">
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                <MapPin size={10} className="text-green-600" />
                Destination
              </label>
              <select 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                className="w-full py-2 px-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-xs"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                <Calendar size={10} className="text-blue-600" />
                Duration
              </label>
              <select 
                value={days} 
                onChange={(e) => setDays(e.target.value)}
                className="w-full py-2 px-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-xs"
              >
                <option value="Three">3 Days</option>
                <option value="Five">5 Days</option>
                <option value="Seven">7 Days</option>
                <option value="Ten">10+ Days</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                <Users size={10} className="text-orange-600" />
                Group
              </label>
              <select 
                value={guests} 
                onChange={(e) => setGuests(e.target.value)}
                className="w-full py-2 px-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-xs"
              >
                <option value="2 adults">2 Adults</option>
                <option value="4 adults">4 Adults</option>
                <option value="6 adults">6 Adults</option>
                <option value="2 adults, 2 children">Family</option>
              </select>
            </div>
            
            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <button 
                onClick={handleSearch} 
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2 px-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs"
              >
                <Search size={12} />
                Find
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Safari ambiance indicators - compact */}
      <div className="absolute bottom-2 left-4 z-20 flex gap-1">
        {safariImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-amber-400 scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll hint indicator - compact */}
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20">
        <button 
          onClick={scrollToNext}
          className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-1.5 sm:p-2 text-white hover:bg-white/30 transition-all duration-300 animate-bounce"
          aria-label="Scroll to explore more"
        >
          <ChevronDown size={14} className="sm:hidden" />
          <ChevronDown size={16} className="hidden sm:block" />
        </button>
      </div>
    </section>
  );
};

export default Hero;