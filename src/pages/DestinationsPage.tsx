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
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  
  const filteredMapPoints = selectedCountry === 'all' 
    ? mapPoints 
    : mapPoints.filter(point => point.country.toLowerCase() === selectedCountry.toLowerCase());

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-safari-brown/10">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover East Africa</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore the diverse destinations of East Africa, from vast savannas teeming with wildlife to pristine beaches and misty forests.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container">
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">East Africa Interactive Map</h2>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Filter by country:</span>
                  <select 
                    className="border rounded-md py-1 px-3 text-sm"
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

            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-safari-brown/20">
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
                          <h3 className="font-semibold">{point.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{point.country}</p>
                          <Link 
                            to={`/destinations/${point.slug}`}
                            className="text-xs text-safari-green font-medium hover:underline"
                          >
                            View Details
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin size={64} className="text-safari-green opacity-30" />
                  <p className="absolute mt-20 text-muted-foreground">Loading interactive map...</p>
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-gray-500 text-center">Click on a destination marker to view details about safari options in that location</p>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Link 
                key={destination.id} 
                to={`/destinations/${destination.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-safari-orange mb-2">
                    <span className="text-sm font-medium">{destination.country}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-safari-orange transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {destination.shortDescription}
                  </p>
                  <span className="text-safari-green text-sm font-medium group-hover:underline">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit East Africa */}
      <section className="py-12 bg-safari-brown/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Visit East Africa</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              East Africa offers an unparalleled diversity of experiences, from thrilling wildlife encounters to immersive cultural interactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Incredible Wildlife" 
              description="Home to the Big Five and the Great Migration, East Africa offers some of the world's most spectacular wildlife viewing opportunities."
            />
            <FeatureCard 
              title="Diverse Landscapes" 
              description="From the vast plains of the Serengeti to the white-sand beaches of Zanzibar and the misty forests of Uganda, discover stunning natural diversity."
            />
            <FeatureCard 
              title="Rich Culture" 
              description="Experience the vibrant cultures of East Africa, with over 120 distinct tribes including the iconic Maasai warriors."
            />
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default DestinationsPage;
