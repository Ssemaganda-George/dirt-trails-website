import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Star, Check, AlertCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { tours } from '@/data/tours';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { CustomizationOption } from '@/data/tours';
import ChatBot from '@/components/ChatBot';

const TourDetailPage = () => {
  const { tourSlug } = useParams<{ tourSlug: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: CustomizationOption | null }>({
    accommodation: null,
    activities: null,
    transportation: null,
    duration: null
  });
  
  // Find the tour by slug
  const tour = tours.find(t => t.slug === tourSlug);
  
  if (!tour) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Tour Not Found</h1>
        <p className="mb-8">Sorry, the tour you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/tours">Browse All Tours</Link>
        </Button>
      </div>
    );
  }

  // Calculate total price including customizations
  const calculateTotalPrice = () => {
    let total = tour.price;
    
    // Add customization prices
    Object.values(selectedOptions).forEach(option => {
      if (option) {
        total += option.priceAdjustment;
      }
    });
    
    // Apply discount if available
    if (tour.discount) {
      total = total * (1 - tour.discount / 100);
    }
    
    return total;
  };
  
  // Handle customization selection
  const handleOptionSelect = (category: string, option: CustomizationOption | null) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: option
    }));
  };

  return (
    <div>
      {/* Tour Header */}
      <section className="py-8 bg-safari-brown/10">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center text-safari-orange mb-2">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{tour.location}, {tour.country}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{tour.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{tour.tagline}</p>
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center">
                  <Star size={18} className="text-safari-orange fill-current" />
                  <span className="ml-1 font-medium">{tour.rating} ({tour.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-safari-green mr-1" />
                  <span>{tour.duration} days</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md lg:text-right">
              <div className="flex items-center justify-between gap-4">
                <div className="text-muted-foreground">Starting from</div>
                <div className="text-2xl font-bold text-safari-green">
                  ${tour.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">per person</span>
                </div>
              </div>
              
              {tour.discount && (
                <div className="inline-block bg-safari-orange text-white px-2 py-1 rounded text-sm font-semibold mt-2">
                  {tour.discount}% OFF
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Tour Images and Main Content */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tour Images */}
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={tour.images[activeImageIndex].url} 
                  alt={tour.images[activeImageIndex].alt}
                  className="w-full h-[400px] object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {tour.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`rounded-lg overflow-hidden cursor-pointer ${activeImageIndex === index ? 'ring-2 ring-safari-orange' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Booking Card */}
            <div className="lg:row-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Customize Your Tour</h3>
                
                {/* Customization Options */}
                <Accordion type="single" collapsible className="mb-6">
                  <CustomizationSection 
                    title="Accommodation"
                    options={tour.customizationOptions.accommodation}
                    selected={selectedOptions.accommodation}
                    onSelect={(option) => handleOptionSelect('accommodation', option)}
                  />
                  <CustomizationSection 
                    title="Activities"
                    options={tour.customizationOptions.activities}
                    selected={selectedOptions.activities}
                    onSelect={(option) => handleOptionSelect('activities', option)}
                  />
                  <CustomizationSection 
                    title="Transportation"
                    options={tour.customizationOptions.transportation}
                    selected={selectedOptions.transportation}
                    onSelect={(option) => handleOptionSelect('transportation', option)}
                  />
                  <CustomizationSection 
                    title="Duration"
                    options={tour.customizationOptions.duration}
                    selected={selectedOptions.duration}
                    onSelect={(option) => handleOptionSelect('duration', option)}
                  />
                </Accordion>
                
                {/* Price Summary */}
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Base price:</span>
                    <span>${tour.price.toLocaleString()}</span>
                  </div>
                  
                  {Object.entries(selectedOptions).map(([category, option]) => {
                    if (!option) return null;
                    return (
                      <div key={category} className="flex justify-between mb-2">
                        <span>{option.name}:</span>
                        <span>${option.priceAdjustment.toLocaleString()}</span>
                      </div>
                    );
                  })}
                  
                  {tour.discount && (
                    <div className="flex justify-between mb-2 text-safari-orange">
                      <span>Discount ({tour.discount}%):</span>
                      <span>-${(calculateTotalPrice() * tour.discount / (100 - tour.discount)).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total:</span>
                    <span>${calculateTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Book Now Button */}
                <Button className="w-full" size="lg" asChild>
                  <Link to={`/checkout/${tour.slug}`}>
                    Book Now
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Tour Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview">
                  <div className="py-6">
                    <h3 className="text-2xl font-semibold mb-4">Tour Overview</h3>
                    <p className="mb-6 whitespace-pre-line">{tour.description}</p>
                    
                    <h4 className="text-xl font-semibold mb-4">Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {tour.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start">
                          <Check size={18} className="text-safari-green mr-2 mt-1 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {tour.mapImage && (
                      <div className="mt-8">
                        <h4 className="text-xl font-semibold mb-4">Tour Map</h4>
                        <div className="rounded-lg overflow-hidden">
                          <img 
                            src={tour.mapImage} 
                            alt="Tour map"
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {/* Itinerary Tab */}
                <TabsContent value="itinerary">
                  <div className="py-6">
                    <h3 className="text-2xl font-semibold mb-6">Tour Itinerary</h3>
                    <div className="space-y-6">
                      {tour.itinerary.map((day) => (
                        <div key={day.day} className="border-l-2 border-safari-orange pl-4 py-1">
                          <h4 className="text-xl font-medium mb-2">
                            Day {day.day}: {day.title}
                          </h4>
                          <p className="mb-3 text-muted-foreground">{day.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className={`${day.meals.breakfast ? 'text-safari-green' : 'text-muted-foreground line-through'}`}>
                              Breakfast
                            </span>
                            <span className={`${day.meals.lunch ? 'text-safari-green' : 'text-muted-foreground line-through'}`}>
                              Lunch
                            </span>
                            <span className={`${day.meals.dinner ? 'text-safari-green' : 'text-muted-foreground line-through'}`}>
                              Dinner
                            </span>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Accommodation:</span> {day.accommodation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Details Tab */}
                <TabsContent value="details">
                  <div className="py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-semibold mb-4">What's Included</h4>
                        <ul className="space-y-2">
                          {tour.inclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <Check size={18} className="text-safari-green mr-2 mt-1 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-4">What's Not Included</h4>
                        <ul className="space-y-2">
                          {tour.exclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <AlertCircle size={18} className="text-safari-orange mr-2 mt-1 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <div className="py-6">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xl font-semibold">Customer Reviews</h4>
                      <div className="flex items-center">
                        <Star size={20} className="text-safari-orange fill-current mr-2" />
                        <span className="font-semibold text-lg">{tour.rating}</span>
                        <span className="text-muted-foreground ml-2">({tour.reviews.length} reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {tour.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-6 last:border-0">
                          <div className="flex justify-between mb-2">
                            <h5 className="font-semibold">{review.name}</h5>
                            <span className="text-muted-foreground text-sm">{review.date}</span>
                          </div>
                          <div className="flex mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < review.rating ? "text-safari-orange fill-current" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Tours Section */}
      <section className="py-12 bg-safari-brown/10">
        <div className="container">
          <h3 className="text-2xl font-semibold mb-8">You May Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.filter(t => t.id !== tour.id && t.country === tour.country).slice(0, 3).map((relatedTour) => (
              <Link 
                key={relatedTour.id} 
                to={`/tours/${relatedTour.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img 
                    src={relatedTour.coverImage} 
                    alt={relatedTour.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold group-hover:text-safari-orange transition-colors">
                    {relatedTour.name}
                  </h4>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <Star size={16} className="text-safari-orange fill-current" />
                      <span className="ml-1 text-sm">{relatedTour.rating}</span>
                    </div>
                    <div className="text-safari-green font-medium">
                      ${relatedTour.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

// Component for customization options
const CustomizationSection = ({ 
  title, 
  options, 
  selected, 
  onSelect 
}: { 
  title: string; 
  options: CustomizationOption[]; 
  selected: CustomizationOption | null;
  onSelect: (option: CustomizationOption | null) => void;
}) => {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="text-lg font-medium">
        {title}
        {selected && (
          <span className="text-sm font-normal text-safari-green ml-2">
            ({selected.name})
          </span>
        )}
      </AccordionTrigger>
      <AccordionContent>
        <RadioGroup 
          value={selected?.id || ""} 
          onValueChange={(value) => {
            const option = options.find(opt => opt.id === value) || null;
            onSelect(option);
          }}
        >
          {options.map((option) => (
            <div key={option.id} className="flex items-start space-x-3 py-2">
              <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={option.id} className="font-medium cursor-pointer">
                  {option.name}
                  {option.priceAdjustment > 0 && (
                    <span className="text-safari-orange ml-2">
                      +${option.priceAdjustment.toLocaleString()}
                    </span>
                  )}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TourDetailPage;