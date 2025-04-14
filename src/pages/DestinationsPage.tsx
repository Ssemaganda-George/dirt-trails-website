
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { destinations } from '@/data/destinations';

const DestinationsPage = () => {
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
          <div className="bg-white rounded-lg shadow-md p-6 mb-12 text-center">
            <h2 className="text-2xl font-semibold mb-6">East Africa Map</h2>
            <div className="relative aspect-[16/9] bg-safari-brown/5 rounded-lg overflow-hidden">
              {/* This would ideally be an interactive map, but for now using a placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe size={64} className="text-safari-green opacity-30" />
                <p className="absolute mt-20 text-muted-foreground">Interactive map would be displayed here</p>
              </div>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((destination) => (
              <Link 
                key={destination.id} 
                to={`/destinations/${destination.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="grid md:grid-cols-2">
                  <div className="h-full">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      style={{ minHeight: '200px' }}
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
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default DestinationsPage;
