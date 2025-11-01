import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, Compass, Eye, Trees, ChevronDown, Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { tours, Tour } from '../../data/tours';

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
      <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-600" id={`label-${label.replace(/\s+/g, '-').toLowerCase()}`}>
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

const treeIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const treeDataList = [
  {
    id: "TREE-004",
    species: 'Markhamia lutea',
    latitude: 0.34760,
    longitude: 32.58250,
    planted_by: 'DirtTrails Community',
    planted_on: '2025-09-25',
  },
  {
    id: "TREE-003",
    species: 'Markhamia lutea',
    latitude: 0.34760,
    longitude: 32.58250,
    planted_by: 'DirtTrails Community',
    planted_on: '2025-09-25',
  },
  {
    id: "TREE-002",
    species: 'Ficus natalensis',
    latitude: 0.55800,
    longitude: 32.45970,
    planted_by: 'MIICHub',
    planted_on: '2025-09-25',
  },
  {
    id: "TREE-001",
    species: 'Prunus africana',
    latitude: 1.37330,
    longitude: 32.29030,
    planted_by: 'Uganda Wildlife Authority',
    planted_on: '2025-09-25',
  },
  {
    id: "TREE-000",
    species: 'Ashoka',
    latitude: 0.32032,
    longitude: 32.47574,
    planted_by: 'George, Angel, Sharon, Twine',
    planted_on: '2025-09-25',
  }
];

const Hero = () => {
  const [destination, setDestination] = useState('Uganda');
  const [days, setDays] = useState('Five');
  const [guests, setGuests] = useState('4 adults');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [weather, setWeather] = useState(null);
  const [weatherCity, setWeatherCity] = useState('Kampala');
  const [showWeatherDropdown, setShowWeatherDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchSummary, setSearchSummary] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // Start collapsed on mobile
  const weatherDropdownRef = useRef(null);
  
  // Safari background images slideshow
  const safariImages = [
    '/images/dt3.jpg',
    'TREE_MAP_SLIDE', // map is now the second slide
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
  }, [safariImages.length]);

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

  const durationMap: Record<string, number> = {
    Three: 3,
    Five: 5,
    Seven: 7,
    Ten: 10
  };

  const parseGroupNumber = (g: string): number | null => {
    if (!g) return null;
    const match = g.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const handleSearch = async () => {
    // set searching state
    setIsSearching(true);
    setSearchResults([]);
    setSearchSummary('');

    // small artificial delay to show the "Searching..." state (can be removed)
    await new Promise((r) => setTimeout(r, 400));

    const qDestination = (destination || '').trim().toLowerCase();
    const maxDuration = durationMap[days] ?? undefined;
    const groupNumber = parseGroupNumber(guests);

    const matches = tours.filter((t) => {
      // destination match on country OR location (case-insensitive)
      const destMatch = !qDestination || (
        (t.country && t.country.toLowerCase().includes(qDestination)) ||
        (t.location && t.location.toLowerCase().includes(qDestination)) ||
        (t.name && t.name.toLowerCase().includes(qDestination))
      );

      // duration match: treat selected value as maximum allowed days
      const durationMatch = typeof maxDuration === 'number' ? (t.duration <= maxDuration) : true;

      // group match: if pricingTiers exist, check any tier covers the groupNumber
      let groupMatch = true;
      if (groupNumber && Array.isArray(t.pricingTiers) && t.pricingTiers.length > 0) {
        groupMatch = t.pricingTiers.some((pt) => groupNumber >= pt.min && groupNumber <= pt.max);
      }

      return destMatch && durationMatch && groupMatch;
    });

    // summary text
    const summaryParts = [];
    summaryParts.push(`${matches.length} result${matches.length === 1 ? '' : 's'}`);
    if (qDestination) summaryParts.push(`for "${destination}"`);
    if (maxDuration) summaryParts.push(`up to ${maxDuration} day${maxDuration === 1 ? '' : 's'}`);
    if (groupNumber) summaryParts.push(`group size ${groupNumber}`);
    const summaryText = summaryParts.join(' • ');

    setSearchResults(matches);
    setSearchSummary(summaryText);
    setIsSearching(false);
  };

  // routing helpers to ensure consistent back navigation
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = `${location.pathname || '/'}${location.search || ''}${location.hash || ''}`;

  const handleLinkClick = (path, extraState = {}) => {
    const state = {
      from: 'hero',
      showBack: true,
      returnTo: currentPath,
      ...extraState
    };

    try {
      // client-side navigation (preferred)
      navigate(path, { state });
      return;
    } catch (e) {
      // fallback to history pushState and hash fallback
    }

    if (typeof window !== 'undefined') {
      try {
        if (window.history && typeof window.history.pushState === 'function') {
          window.history.pushState(state, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          return;
        }
      } catch (e) {
        // ignore and fallback
      }
      const origin = window.location.origin || '';
      window.location.href = `${origin}/#${path}`;
    }
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-screen flex flex-col overflow-hidden">
      {/* Animated background slideshow */}
      <div className="absolute inset-0" role="img" aria-label="Safari background slideshow featuring African wildlife and landscapes">
        {safariImages.map((image, index) => (
          image === 'TREE_MAP_SLIDE' ? (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
                index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <MapContainer
                center={[0.34760, 32.58250]}
                zoom={7}
                scrollWheelZoom={true}
                dragging={true}
                doubleClickZoom={true}
                zoomControl={true}
                attributionControl={true}
                className="w-full h-full"
                style={{ width: "100%", height: "100%", borderRadius: 0 }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {treeDataList.map(tree => (
                  <Marker key={tree.id} position={[tree.latitude, tree.longitude]} icon={treeIcon}>
                    <Popup>
                      <div>
                        <div className="font-semibold text-green-700">{tree.species}</div>
                        <div className="text-xs">Planted By: {tree.planted_by}</div>
                        <div className="text-xs">Date: {tree.planted_on}</div>
                        <div className="text-xs">ID: {tree.id}</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 z-10 pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 z-20 text-white text-lg font-bold bg-green-700/70 px-4 py-2 rounded-lg shadow">
                Our Tree Planting Map
              </div>
            </div>
          ) : (
            <div
              key={index}
              className={`absolute inset-0 bg-center bg-cover transition-opacity duration-[1800ms] ease-in-out ${
                index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          )
        ))}
      </div>

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>

      {/* Main content container */}
      <div className="container relative z-20 flex flex-col xl:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12 xl:gap-16 py-4 sm:py-8 lg:py-12 xl:py-16 px-2 sm:px-4 md:px-6 lg:px-8 text-white flex-grow max-w-7xl mx-auto">
        
        {/* Left side: text content */}
        <div className="w-full xl:w-1/2 max-w-xl lg:max-w-2xl xl:max-w-3xl text-center xl:text-left space-y-6 sm:space-y-8">
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center xl:justify-start pt-2 sm:pt-4 w-full">
            <button 
              onClick={() => handleLinkClick('tours')}
              className="group w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
            >
              <Eye size={20} className="group-hover:scale-110 transition-transform" />
              Plan My Safari
            </button>
            
            <button 
              onClick={() => handleLinkClick('environment/geotagging')}
              className="group w-full sm:w-auto border-2 border-green-400/90 bg-green-500/25 backdrop-blur-md text-green-100 hover:bg-green-500 hover:text-white hover:border-green-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
            >
              <Trees size={20} className="group-hover:scale-110 transition-transform" />
              Explore Conservation
            </button>
          </div>
        </div>

        {/* Right side: Cards container */}
        <div className="w-full xl:w-1/2 flex flex-col xl:flex-row gap-6 max-w-2xl mt-8 xl:mt-0">
          {/* Search form */}
          <div className="w-full xl:w-3/5 bg-black/20 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 text-white transform hover:scale-[1.02] transition-all duration-300">
            {/* Mobile toggle button */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden w-full text-left flex items-center justify-between mb-4"
              aria-expanded={isSearchExpanded}
              aria-label="Toggle search form"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Search className="text-white" size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">Find Your Perfect Safari</h3>
              </div>
              <ChevronDown 
                className={`text-white transition-transform duration-200 ${isSearchExpanded ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>

            {/* Desktop header */}
            <div className="hidden md:flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Search className="text-white" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">Find Your Perfect Safari</h3>
            </div>

            {/* Form fields - hidden on mobile unless expanded */}
            <div className={`${isSearchExpanded ? 'block' : 'hidden'} md:block`}>
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

              {/* Search Results */}
              {(isSearching || searchResults.length > 0 || (searchSummary && searchResults.length === 0)) && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-2 sm:px-0 pt-24 sm:pt-32">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto p-4 sm:p-6 border border-green-100 relative animate-fade-in-up">
                    {/* Close button */}
                    <button
                      onClick={() => {
                        setSearchResults([]);
                        setSearchSummary('');
                        setIsSearching(false);
                      }}
                      className="absolute top-3 right-3 text-gray-400 hover:text-green-600 rounded-full p-2 transition"
                      aria-label="Close search results"
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l8 8M14 6l-8 8"/>
                      </svg>
                    </button>
                    <div className="mb-4 flex items-center gap-2">
                      <Search size={18} className="text-green-600" />
                      <span className="font-bold text-green-700 text-lg">Safari Search Results</span>
                    </div>
                    {isSearching && (
                      <div className="text-center text-green-700 font-semibold animate-pulse py-8">
                        Searching
                      </div>
                    )}
                    {!isSearching && searchResults.length > 0 && (
                      <>
                        <div className="mb-2 text-sm text-gray-700 font-semibold">{searchSummary}</div>
                        <ul className="space-y-4 max-h-72 overflow-y-auto">
                          {searchResults.map((tour) => (
                            <li key={tour.id} className="bg-green-50 rounded-xl shadow border border-green-100 p-3 flex items-center gap-3 hover:bg-green-100 transition">
                              <img
                                src={tour.coverImage || (tour.images && tour.images[0]?.url) || "/images/placeholder.jpg"}
                                alt={tour.name}
                                className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <Link
                                  to={`/tours/${tour.slug}`}
                                  className="font-semibold text-green-700 hover:underline truncate block"
                                  onClick={() => {
                                    setSearchResults([]);
                                    setSearchSummary('');
                                  }}
                                >
                                  {tour.name}
                                </Link>
                                <div className="text-xs text-gray-500 truncate">{tour.tagline}</div>
                                <div className="flex gap-2 text-xs text-gray-600 mt-1">
                                  <span>{tour.location}</span>
                                  <span>• {tour.duration} days</span>
                                  <span>• ${tour.price}</span>
                                </div>
                              </div>
                              <Link
                                to={`/tours/${tour.slug}`}
                                className="ml-2 px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition"
                                onClick={() => {
                                  setSearchResults([]);
                                  setSearchSummary('');
                                }}
                              >
                                View
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {!isSearching && searchResults.length === 0 && searchSummary && (
                      <div className="text-center text-red-600 font-semibold py-8">
                        No safaris found matching your search.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Weather Card */}
          {weather && (
            <div className="w-full xl:w-2/5 bg-gradient-to-br from-orange-500/95 to-amber-600/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-3 text-white transform hover:scale-[1.02] transition-all duration-300 h-fit relative mt-4 xl:mt-0" ref={weatherDropdownRef}>
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
                  <span className="text-xl font-bold tracking-tight">{weather.temp}° {weather.condition}</span>
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 max-h-64 overflow-y-auto z-[100] pointer-events-auto">
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
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3 bg-black/30 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-full">
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
  );
};

export default Hero;