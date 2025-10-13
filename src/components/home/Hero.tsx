import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, Compass, Eye, Trees, ChevronDown, Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';

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
      <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600">
        {icon}
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-1.5 sm:py-2 px-2 sm:px-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 font-medium shadow-sm text-xs sm:text-sm flex items-center justify-between hover:border-green-300 transition-colors duration-200"
        >
          <span className={value ? 'text-gray-800' : 'text-gray-400'}>
            {value || placeholder}
          </span>
          <ChevronDown 
            size={16} 
            className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full px-2 sm:px-3 py-2 text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 text-xs sm:text-sm text-gray-800 font-medium transition-colors duration-150 first:rounded-t-lg first:sm:rounded-t-xl last:rounded-b-lg last:sm:rounded-b-xl border-b border-gray-100 last:border-b-0"
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
  const [weather, setWeather] = useState(null);
  const [weatherCity, setWeatherCity] = useState('Kampala');
  const [showWeatherDropdown, setShowWeatherDropdown] = useState(false);
  const weatherDropdownRef = useRef(null);
  
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

  // Weather dropdown click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (weatherDropdownRef.current && !weatherDropdownRef.current.contains(event.target)) {
        setShowWeatherDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Safari destination cities with coordinates
  const safariCities = [
    { name: 'Kampala', country: 'Uganda', lat: 0.3476, lon: 32.5825 },
    { name: 'Entebbe', country: 'Uganda', lat: 0.0563, lon: 32.4797 },
    { name: 'Nairobi', country: 'Kenya', lat: -1.2864, lon: 36.8172 },
    { name: 'Mombasa', country: 'Kenya', lat: -4.0435, lon: 39.6682 },
    { name: 'Arusha', country: 'Tanzania', lat: -3.3869, lon: 36.6830 },
    { name: 'Dar es Salaam', country: 'Tanzania', lat: -6.7924, lon: 39.2083 },
    { name: 'Kigali', country: 'Rwanda', lat: -1.9536, lon: 30.0606 }
  ];

  const getCityCoordinates = (cityName) => {
    const city = safariCities.find(c => c.name === cityName);
    return city || safariCities[0];
  };

  const getWeatherCondition = (code) => {
    if (code === 0) return 'Clear';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 67) return 'Rainy';
    if (code <= 77) return 'Snowy';
    return 'Cloudy';
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <Sun size={18} className="text-yellow-400" />;
      case 'Partly Cloudy':
        return <Cloud size={18} className="text-gray-300" />;
      case 'Rainy':
        return <CloudRain size={18} className="text-blue-300" />;
      case 'Snowy':
        return <CloudSnow size={18} className="text-blue-200" />;
      default:
        return <Cloud size={18} className="text-gray-300" />;
    }
  };

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const coords = getCityCoordinates(weatherCity);
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,weather_code,precipitation,relative_humidity_2m,wind_speed_10m&timezone=auto`
        );
        const data = await response.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: getWeatherCondition(data.current.weather_code),
          precipitation: data.current.precipitation || 0,
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m)
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); 
    return () => clearInterval(interval);
  }, [weatherCity]);

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
    <section className="relative min-h-screen flex flex-col overflow-hidden">
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

      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>



      {/* Main content container */}
      <div className="container relative z-20 flex flex-col xl:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12 xl:gap-16 py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8 text-white flex-grow max-w-7xl mx-auto">
        
        {/* Left side: text content */}
        <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl text-center xl:text-left space-y-6 sm:space-y-8">
          {/* Safari badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/30 to-orange-500/30 backdrop-blur-md border-2 border-amber-300/40 rounded-full px-4 py-2 shadow-lg animate-pulse">
            <Compass className="text-amber-200" size={18} />
            <span className="text-amber-100 font-bold text-xs sm:text-sm tracking-wider">SAFE & EXPERT-GUIDED JOURNEYS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight space-y-2">
            <span className="block bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
              Explore.
            </span>
            <span className="block bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
              Connect.
            </span>
            <span className="block bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
              Sustain.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed font-light max-w-2xl mx-auto xl:mx-0">
            Because the best journey begins from where the pavement ends . .
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start pt-4">
            <button 
              onClick={() => handleLinkClick('tours')}
              className="group bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-base sm:text-lg"
            >
              <Eye size={20} className="group-hover:scale-110 transition-transform" />
              Plan My Safari
            </button>
            
            <button 
              onClick={() => handleLinkClick('conservation')}
              className="group border-2 border-green-400/90 bg-green-500/25 backdrop-blur-md text-green-100 hover:bg-green-500 hover:text-white hover:border-green-500 px-8 py-4 rounded-xl font-bold shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-base sm:text-lg"
            >
              <Trees size={20} className="group-hover:scale-110 transition-transform" />
              Explore Conservation
            </button>
          </div>
        </div>

        {/* Right side: Cards container */}
        <div className="flex flex-col xl:flex-row gap-6 w-full max-w-2xl">
          {/* Search form */}
          <div className="bg-gradient-to-br from-white/98 to-amber-50/98 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-amber-200/50 p-6 sm:p-8 text-gray-800 transform hover:scale-[1.02] transition-all duration-300 xl:flex-3">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Search className="text-white" size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">Find Your Perfect Safari</h3>
              </div>

              <div className="space-y-5">
                <CustomDropdown
                  label="Destination"
                  icon={<MapPin size={14} className="text-green-600" />}
                  value={countries.find(c => c.value === destination)?.label}
                  options={countries}
                  onChange={setDestination}
                  placeholder="Choose your destination"
                />

                <CustomDropdown
                  label="Duration"
                  icon={<Calendar size={14} className="text-blue-600" />}
                  value={durations.find(d => d.value === days)?.label}
                  options={durations}
                  onChange={setDays}
                  placeholder="Select safari duration"
                />

                <CustomDropdown
                  label="Group Size"
                  icon={<Users size={14} className="text-orange-600" />}
                  value={groupSizes.find(g => g.value === guests)?.label}
                  options={groupSizes}
                  onChange={setGuests}
                  placeholder="Choose group size"
                />
              </div>
            </div>

            {/* Search button */}
            <div className="mt-6">
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-4 px-6 rounded-xl font-bold shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-base sm:text-lg"
              >
                <Search size={18} />
                Discover Safari
              </button>
            </div>
          </div>

          {/* Weather Card - Reduced height to 50% */}
          {weather && (
            <div className="bg-gradient-to-br from-orange-500/95 to-amber-600/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-3 text-white transform hover:scale-[1.02] transition-all duration-300 xl:w-52 h-1/2 relative" ref={weatherDropdownRef}>
              <button
                onClick={() => setShowWeatherDropdown(!showWeatherDropdown)}
                className="w-full text-left h-full flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Weather</span>
                  <ChevronDown
                    size={14}
                    className={`text-white transition-transform duration-200 ${showWeatherDropdown ? 'rotate-180' : ''}`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1 rounded-lg">
                    {getWeatherIcon(weather.condition)}
                  </div>
                  <span className="text-xl font-bold tracking-tight">{weather.temp}°</span>
                  <span className="text-xs font-medium ml-auto">{weather.condition}</span>
                </div>

                {/* Additional weather details - more compact */}
                <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-[10px] text-white/70">Rain</div>
                    <div className="text-xs font-semibold">{weather.precipitation}%</div>
                  </div>
                  <div className="text-center border-l border-r border-white/20">
                    <div className="text-[10px] text-white/70">Humid</div>
                    <div className="text-xs font-semibold">{weather.humidity}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-white/70">Wind</div>
                    <div className="text-xs font-semibold">{weather.windSpeed}</div>
                  </div>
                </div>

                <div className="text-white/70 text-[10px] text-center pt-1 border-t border-white/20">{weatherCity}</div>
              </button>

              {/* City Dropdown */}
              {showWeatherDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 max-h-64 overflow-y-auto z-50">
                  {safariCities.map((city, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setWeatherCity(city.name);
                        setShowWeatherDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                        weatherCity === city.name ? 'bg-orange-50' : ''
                      }`}
                    >
                      <div className="font-semibold text-gray-800 text-sm">{city.name}</div>
                      <div className="text-gray-500 text-xs">{city.country}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Image navigation dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3 bg-black/30 backdrop-blur-md px-4 py-3 rounded-full">
        {safariImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-amber-400 w-8 shadow-lg' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;