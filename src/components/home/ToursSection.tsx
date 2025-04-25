import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tours } from '@/data/tours';
import TourCard from './TourCard';

const ToursSection = () => {
  // Group tours by country
  const toursByCountry = tours.reduce((acc, tour) => {
    if (!acc[tour.country]) {
      acc[tour.country] = [];
    }
    acc[tour.country].push(tour);
    return acc;
  }, {} as Record<string, typeof tours>);

  // Sort countries with Uganda first, then others alphabetically
  const countries = Object.keys(toursByCountry).sort((a, b) => {
    if (a === 'Uganda') return -1;
    if (b === 'Uganda') return 1;
    return a.localeCompare(b);
  });

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Tours</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Discover our diverse range of tours across East Africa's most beautiful destinations.
          </p>
        </div>
        
        {countries.map((country) => (
          <div key={country} className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <MapPin className="mr-2 text-safari-green" />
              Tours in {country}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {toursByCountry[country].map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to={`/tours?country=${encodeURIComponent(country)}`} className="flex items-center">
                  View All {country} Tours <ChevronRight size={18} className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToursSection;
