
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar } from 'lucide-react';
import { Tour } from '@/data/tours';

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <Link 
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
          <span className="absolute top-4 right-4 bg-safari-green text-white px-2 py-1 rounded text-sm font-semibold">
            {tour.discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{tour.location}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-safari-green transition-colors line-clamp-2">
          {tour.name}
        </h3>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center text-safari-green">
            <Star size={16} className="fill-current" />
            <span className="ml-1 font-medium">{tour.rating}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar size={16} className="mr-1" />
            <span className="text-sm">{tour.duration} days</span>
          </div>
        </div>
        <div className="mt-2 text-safari-green font-semibold">
          ${tour.price.toLocaleString()}
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
