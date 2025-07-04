
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations } from '@/data/destinations';
import { tours } from '@/data/tours';
import ChatBot from '@/components/ChatBot';

const DestinationDetailPage = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  
  // Find the destination by slug
  const destination = destinations.find(d => d.slug === destinationSlug);
  
  // Find tours for this destination
  const destinationTours = tours.filter(tour => 
    destination && (tour.location === destination.name || tour.country === destination.country)
  );
  
  if (!destination) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
        <p className="mb-8">Sorry, the destination you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/destinations">Browse All Destinations</Link>
        </Button>
        <ChatBot />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-center bg-cover" 
          style={{ backgroundImage: `url('${destination.image}')` }}
        ></div>
        
        <div className="container relative z-20 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center mb-4">
              <MapPin size={18} className="mr-2" />
              <span>{destination.country}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              {destination.shortDescription}
            </p>
          </div>
        </div>
      </section>
      
      {/* Destination Information */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">About {destination.name}</h2>
              <p className="mb-8 text-muted-foreground whitespace-pre-line">{destination.description}</p>
              
              <h3 className="text-2xl font-semibold mb-4">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="bg-safari-brown/5 p-4 rounded-lg">
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-safari-orange mr-3"></span>
                      <span>{highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">Best Time to Visit</h3>
              <p className="mb-8 text-muted-foreground">{destination.bestTimeToVisit}</p>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Quick Information</h3>
                
                <div className="space-y-4">
                  <InfoItem label="Country" value={destination.country} />
                  <InfoItem label="Weather" value="Varies by season (see best time to visit)" />
                  <InfoItem label="Languages" value="English, Swahili" />
                  <InfoItem label="Currency" value={getCurrency(destination.country)} />
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" asChild>
                    <Link to="/contact">
                      Inquire About Travel
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Available Tours */}
      {destinationTours.length > 0 && (
        <section className="py-12 bg-safari-brown/10">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Tours in {destination.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationTours.map((tour) => (
                <Link 
                  key={tour.id} 
                  to={`/tours/${tour.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <img 
                      src={tour.coverImage} 
                      alt={tour.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    {tour.discount && (
                      <span className="absolute top-4 right-4 bg-safari-orange text-white px-2 py-1 rounded text-sm font-semibold">
                        {tour.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-safari-orange transition-colors">
                      {tour.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {tour.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar size={16} className="mr-1" />
                        <span className="text-sm">{tour.duration} days</span>
                      </div>
                      <div className="text-safari-green font-semibold">
                        ${tour.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" asChild>
                <Link to="/tours">View All Tours</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
      <ChatBot />
    </div>
  );
};

// Helper component for information items
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="font-medium">{label}:</span> {value}
  </div>
);

// Helper function to get currency based on country
const getCurrency = (country: string): string => {
  switch (country) {
    case 'Kenya':
      return 'Kenyan Shilling (KES)';
    case 'Tanzania':
      return 'Tanzanian Shilling (TZS)';
    case 'Uganda':
      return 'Ugandan Shilling (UGX)';
    case 'Rwanda':
      return 'Rwandan Franc (RWF)';
    default:
      return 'Varies by country';
  }
};

export default DestinationDetailPage;
