import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, Compass, Eye, Trees, ChevronDown } from 'lucide-react';

const CustomDropdown = ({ label, icon, value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-1" ref={dropdownRef}>
      <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600" id={`label-${label.replace(/\s+/g, '-').toLowerCase()}`}>
        {icon}
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={`label-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="w-full py-1.5 sm:py-2 px-2 sm:px-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-xs sm:text-sm flex items-center justify-between hover:border-green-300 transition-colors duration-200"
        >
          <span className={value ? 'text-gray-800' : 'text-gray-400'}>
            {value || placeholder}
          </span>
          <ChevronDown 
            size={16} 
            className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
        
        {isOpen && (
          <div 
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto"
            role="listbox"
            aria-labelledby={`label-${label.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={value === option.value}
                className="w-full px-2 sm:px-3 py-2 text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 text-xs sm:text-sm text-gray-800 font-medium transition-colors duration-150 first:rounded-t-lg first:sm:rounded-t-xl last:rounded-b-lg last:sm:rounded-b-xl border-b border-gray-100 last:border-b-0 focus:bg-green-100 focus:outline-none"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Hero = () => {
  const [destination, setDestination] = useState('Uganda');
  const [days, setDays] = useState('Five');
  const [guests, setGuests] = useState('4 adults');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Safari background images slideshow
  const safariImages = [
    '/images/dt3.jpg',
    '/images/field-covered-greenery-surrounded-by-zebras-sunlight-blue-sky.jpg',
    '/images/dt6.jpg',
    '/images/dt2.JPG',
    '/images/crossroad-car-safari-scene.jpg',
    '/images/dt5.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % safariImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const countries = [
    { label: 'Uganda - Pearl of Africa', value: 'Uganda' },
    { label: 'Kenya - Land of Safari', value: 'Kenya' },
    { label: 'Tanzania - Serengeti Plains', value: 'Tanzania' },
    { label: 'Rwanda - Land of a Thousand Hills', value: 'Rwanda' }
  ];

  const durations = [
    { label: '3 Days ', value: 'Three' },
    { label: '5 Days ', value: 'Five' },
    { label: '7 Days ', value: 'Seven' },
    { label: '10+ Days ', value: 'Ten' }
  ];

  const groupSizes = [
    { label: '2  ', value: '2 adults' },
    { label: '4  ', value: '4 adults' },
    { label: '6  ', value: '6 adults' },
    { label: '10+ ', value: '2 adults, 2 children' }
  ];

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
    <section className="relative h-[90vh] flex flex-col overflow-hidden">
      {/* Animated background slideshow */}
      <div className="absolute inset-0" role="img" aria-label="Safari background slideshow featuring African wildlife and landscapes">
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

      {/* Main content container */}
      <div className="container relative z-20 flex flex-col xl:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 xl:gap-10 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 text-white flex-grow max-w-7xl mx-auto">
        
        {/* Left side: text content */}
        <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl text-center xl:text-left">
          {/* Safari badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full px-2 sm:px-3 py-1 mb-3 sm:mb-4">
            <Compass className="text-amber-300" size={14} />
            <span className="text-amber-100 font-medium text-[10px] sm:text-xs tracking-wide">SAFE & EXPERT-GUIDED JOURNEYS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
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

          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 text-gray-200 leading-relaxed">
            Because the best journey begins from where the pavement ends . .
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center xl:justify-start">
            <button 
              onClick={() => handleLinkClick('tours')}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 flex items-center justify-center gap-2 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-green-400"
              aria-label="Plan your safari - navigate to tours page"
            >
              <Eye size={16} aria-hidden="true" />
              Plan My Safari
            </button>
            
            <button 
              onClick={() => handleLinkClick('conservation')}
              className="border-2 border-green-400/80 bg-green-500/20 backdrop-blur-sm text-green-200 hover:bg-green-500 hover:text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-green-400"
              aria-label="Explore conservation initiatives - navigate to tree planting page"
            >
              <Trees size={16} aria-hidden="true" />
              Explore Conservation
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50/95 to-orange-50/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl border border-amber-200/30 p-3 sm:p-4 lg:p-5 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-sm text-gray-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Search className="text-white" size={14} />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 leading-tight">Find Your Perfect Safari</h3>
            </div>

            <div className="space-y-3 sm:space-y-3.5">
              <CustomDropdown
                label="Destination"
                icon={<MapPin size={12} className="text-green-600" />}
                value={countries.find(c => c.value === destination)?.label}
                options={countries}
                onChange={setDestination}
                placeholder="Choose your destination"
              />

              <CustomDropdown
                label="Duration"
                icon={<Calendar size={12} className="text-blue-600" />}
                value={durations.find(d => d.value === days)?.label}
                options={durations}
                onChange={setDays}
                placeholder="Select safari duration"
              />

              <CustomDropdown
                label="Group Size"
                icon={<Users size={12} className="text-orange-600" />}
                value={groupSizes.find(g => g.value === guests)?.label}
                options={groupSizes}
                onChange={setGuests}
                placeholder="Choose group size"
              />
            </div>
          </div>

          {/* Search button */}
          <div className="mt-4 sm:mt-5">
            <button 
              onClick={handleSearch} 
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-green-400"
              aria-label="Search for safaris based on selected destination, duration, and group size"
            >
              <Search size={14} aria-hidden="true" />
              Discover Safari
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 z-20 flex gap-1.5 sm:gap-2">
        {safariImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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