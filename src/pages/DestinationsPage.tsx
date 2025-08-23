import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { mapPoints } from '@/data/destinationMap';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  ZoomControl 
} from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for leaflet marker icon issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ChatBot from '@/components/ChatBot';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

const DestinationsPage = () => {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  
  // Consistent theme with tours page
  const theme = {
    gradient: 'from-green-600 to-green-700', 
    lightGradient: 'from-green-400 to-green-500',
    accent: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    hoverAccent: 'hover:text-green-700'
  };
  
  // Custom Safari icon
  const customIcon = L.icon({
    iconUrl: '/images/map-marker.svg',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -34]
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter map points by country
  const [selectedCountry, setSelectedCountry] = useState('all');
  
  const filteredMapPoints = selectedCountry === 'all' 
    ? mapPoints 
    : mapPoints.filter(point => point.country.toLowerCase() === selectedCountry.toLowerCase());

  return (
    <div>
      {/* Hero Section - Updated to match tours page */}
      <section className={`relative py-20 bg-gradient-to-r ${theme.lightGradient} text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover 
              <span className="block bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                East Africa
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-50 max-w-3xl leading-relaxed">
              Explore the diverse destinations of East Africa, from vast savannas teeming with wildlife to pristine beaches and misty forests.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Map Section - Updated styling */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-bold text-stone-700">East Africa Interactive Map</h2>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-stone-700">Filter by country:</span>
                  <select 
                    className={`border ${theme.border} rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 font-medium ${theme.accent}`}
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    aria-label="Filter destinations by country"
                  >
                    <option value="all">All Countries</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Tanzania">Tanzania</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={`relative aspect-[16/9] rounded-2xl overflow-hidden border ${theme.border} shadow-inner`}>
              {isClient ? (
                <MapContainer 
                  center={[0.3136, 32.5811]} // Center on Uganda
                  zoom={5} 
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ZoomControl position="bottomright" />
                  
                  {filteredMapPoints.map((point) => (
                    <Marker 
                      key={point.id}
                      position={point.position}
                      icon={customIcon}
                      eventHandlers={{
                        click: () => {
                          navigate(`/destinations/${point.slug}`);
                        }
                      }}
                    >
                      <Popup>
                        <div className="text-center">
                          <h3 className="font-semibold text-stone-700">{point.name}</h3>
                          <p className="text-xs text-stone-500 mb-2">{point.country}</p>
                          <Link 
                            to={`/destinations/${point.slug}`}
                            className={`text-xs font-medium ${theme.accent} ${theme.hoverAccent} transition-colors`}
                          >
                            View Details →
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${theme.lightGradient} opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center`}>
                      <MapPin size={32} className={theme.accent} />
                    </div>
                    <p className="text-stone-600 font-medium">Loading interactive map...</p>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-4 text-sm text-stone-500 text-center">Click on a destination marker to view details about safari options in that location</p>
          </div>

          {/* Destinations Grid - Updated styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Link 
                key={destination.id} 
                to={`/destinations/${destination.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100 relative h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Country Badge */}
                    <div className={`absolute top-4 left-4 ${theme.bg} ${theme.accent} px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${theme.border} shadow-md`}>
                      {destination.country}
                    </div>

                    {/* Hover Explore Icon */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <div className={`w-10 h-10 bg-gradient-to-r ${theme.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <MapPin className="text-white" size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 relative flex-grow flex flex-col">
                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-3 ${theme.accent} ${theme.hoverAccent} transition-colors leading-tight`}>
                      {destination.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-stone-600 text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
                      {destination.shortDescription}
                    </p>
                    
                    {/* Learn More Link */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <span className={`text-sm font-semibold ${theme.accent} ${theme.hoverAccent} transition-colors`}>
                        Learn more →
                      </span>
                      
                      {/* View Details Button */}
                      <div className={`opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-r ${theme.gradient} text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md`}>
                        Explore
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${theme.lightGradient} opacity-5 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
                  </div>

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit East Africa - Updated styling */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-700">
              Why Visit 
              <span className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                East Africa
              </span>
            </h2>
            <p className="text-stone-600 max-w-3xl mx-auto leading-relaxed">
              East Africa offers an unparalleled diversity of experiences, from thrilling wildlife encounters to immersive cultural interactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Incredible Wildlife" 
              description="Home to the Big Five and the Great Migration, East Africa offers some of the world's most spectacular wildlife viewing opportunities."
              theme={theme}
            />
            <FeatureCard 
              title="Diverse Landscapes" 
              description="From the vast plains of the Serengeti to the white-sand beaches of Zanzibar and the misty forests of Uganda, discover stunning natural diversity."
              theme={theme}
            />
            <FeatureCard 
              title="Rich Culture" 
              description="Experience the vibrant cultures of East Africa, with over 120 distinct tribes including the iconic Maasai warriors."
              theme={theme}
            />
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

// Feature Card Component - Updated with theme
const FeatureCard = ({ title, description, theme }) => {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
      {/* Icon background */}
      <div className={`w-12 h-12 bg-gradient-to-r ${theme.lightGradient} opacity-20 rounded-full mb-4 flex items-center justify-center group-hover:opacity-30 transition-opacity duration-300`}>
        <MapPin size={24} className={theme.accent} />
      </div>
      
      <h3 className={`text-xl font-bold mb-3 ${theme.accent} ${theme.hoverAccent} transition-colors`}>
        {title}
      </h3>
      <p className="text-stone-600 leading-relaxed">
        {description}
      </p>
      
      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
    </div>
  );
};

export default DestinationsPage;