import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, Compass, Eye, Trees, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // added
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { tours, Tour } from '../../data/tours'; // <-- new import

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

  // new search state
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Tour[]>([]);
  const [searchSummary, setSearchSummary] = useState<string>('');

  // Place the map as the second slide
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
    <section className="relative h-[90vh] flex flex-col overflow-hidden">
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
            <Link
              to="/tours"
              onClick={(e) => { e.preventDefault(); handleLinkClick('/tours', { from: 'hero-cta' }); }}
              state={{ from: 'hero', showBack: true, returnTo: currentPath }}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 flex items-center justify-center gap-2 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-green-400"
              aria-label="Plan your safari - navigate to tours page"
            >
              <Eye size={16} aria-hidden="true" />
              Plan My Safari
            </Link>
            
            <Link
              to="/environment/geotagging"
              onClick={(e) => { e.preventDefault(); handleLinkClick('/environment/geotagging', { from: 'hero-cta-conservation' }); }}
              state={{ from: 'hero', showBack: true, returnTo: currentPath }}
              className="border-2 border-green-400/80 bg-green-500/20 backdrop-blur-sm text-green-200 hover:bg-green-500 hover:text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-green-400"
              aria-label="Explore conservation initiatives - navigate to geotagging page"
            >
              <Trees size={16} aria-hidden="true" />
              Explore Conservation
            </Link>
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
              disabled={isSearching}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-green-400"
              aria-label="Search for safaris based on selected destination, duration, and group size"
            >
              <Search size={14} aria-hidden="true" />
              {isSearching ? 'Searching…' : 'Discover Safari'}
            </button>
          </div>

          {/* search results summary & list */}
          <div className="mt-3 hidden sm:block" aria-live="polite"> 
            {searchSummary && (
              <div className="text-xs sm:text-sm text-gray-700 bg-white/60 rounded-md p-2">
                <strong>Summary:</strong> {searchSummary}
              </div>
            )}

            {searchResults.length > 0 && (
              <ul className="mt-2 space-y-2 max-h-48 overflow-auto">
                {searchResults.slice(0, 5).map((t) => (
                  <li key={t.id} className="bg-white rounded-md p-2 border border-gray-100 flex items-start gap-2">
                    <img
                      src={t.coverImage || t.images?.[0]?.url || '/images/placeholder.jpg'}
                      alt={t.name}
                      className="w-14 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                      <div className="text-xs text-gray-600">{t.tagline}</div>
                      <div className="text-xs text-gray-600 mt-1">Duration: {t.duration}d • Location: {t.location} • Price: {t.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-800">{t.rating}★</div>
                      <Link
                        to={`/tours/${t.slug}`}
                        onClick={(e) => { e.preventDefault(); handleLinkClick(`/tours/${t.slug}`, { from: 'hero-search' }); }}
                        state={{ from: 'hero-search', showBack: true, returnTo: currentPath }}
                        className="text-xs text-green-700 hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </li>
                ))}
                {searchResults.length > 5 && (
                  <li className="text-xs text-gray-600">And {searchResults.length - 5} more result(s)...</li>
                )}
              </ul>
            )}

            {!isSearching && searchSummary && searchResults.length === 0 && (
              <div className="mt-2 text-xs text-gray-600 bg-white/60 rounded-md p-2">No tours matched your selections.</div>
            )}
          </div>

          {/* Mobile fixed overlay for results — appears above other UI and is dismissible */}
          <div className="sm:hidden">
            {(searchSummary || searchResults.length > 0) && (
              <div className="fixed left-3 right-3 bottom-16 z-50 bg-white/95 text-gray-800 rounded-lg shadow-xl p-3 max-h-[56vh] overflow-auto">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold">Search results</div>
                  <button
                    onClick={() => { setSearchResults([]); setSearchSummary(''); }}
                    className="text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
                    aria-label="Close results"
                  >
                    Close
                  </button>
                </div>

                {searchSummary && (
                  <div className="text-xs text-gray-700 mb-2">
                    <strong>Summary:</strong> {searchSummary}
                  </div>
                )}

                {searchResults.length > 0 ? (
                  <ul className="space-y-2">
                    {searchResults.map((t) => (
                      <li key={t.id} className="bg-white rounded-md p-2 border border-gray-100 flex items-start gap-2">
                        <img
                          src={t.coverImage || t.images?.[0]?.url || '/images/placeholder.jpg'}
                          alt={t.name}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                          <div className="text-xs text-gray-600">{t.tagline}</div>
                          <div className="text-xs text-gray-600 mt-1">Duration: {t.duration}d • {t.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-gray-800">{t.rating}★</div>
                          <Link
                            to={`/tours/${t.slug}`}
                            onClick={(e) => { e.preventDefault(); handleLinkClick(`/tours/${t.slug}`, { from: 'hero-search-mobile' }); }}
                            state={{ from: 'hero-search', showBack: true, returnTo: currentPath }}
                            className="text-xs text-green-700 hover:underline"
                          >
                            View
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-gray-600">No tours matched your selections.</div>
                )}
              </div>
            )}
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