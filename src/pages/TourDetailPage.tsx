import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Star, Check, AlertCircle, ChevronDown, ChevronUp, Minus, Plus
} from 'lucide-react';
import { tours } from '@/data/tours';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { CustomizationOption } from '@/data/tours';
import ChatBot from '@/components/ChatBot';

const TourDetailPage = () => {
  const { tourSlug } = useParams<{ tourSlug: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
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
        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-4">Tour Not Found</h1>
          <p className="mb-8">Sorry, the tour you're looking for doesn't exist.</p>
          <Button asChild className="hover:scale-105 transition-transform duration-200">
            <Link to="/tours">Browse All Tours</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Dynamic pricing structure - this should come from tour data
  const getPricingTiers = () => {
    if (tour.pricingTiers) {
      return tour.pricingTiers;
    }
    
    // Default pricing structure (fallback)
    return [
      { min: 1, max: 1, price: tour.price, label: "1 person" },
      { min: 2, max: 4, price: tour.price * 0.975, label: "2-4 people" },
      { min: 5, max: 999, price: tour.price * 0.75, label: "5+ people" }
    ];
  };

  const getPricePerPerson = () => {
    const pricingTiers = getPricingTiers();
    const tier = pricingTiers.find(tier => 
      numberOfPeople >= tier.min && numberOfPeople <= tier.max
    );
    return tier ? tier.price : tour.price;
  };

  // Calculate total price including customizations
  const calculateTotalPrice = () => {
    let pricePerPerson = getPricePerPerson();
    
    // Add customization prices per person
    Object.values(selectedOptions).forEach(option => {
      if (option) {
        pricePerPerson += option.priceAdjustment;
      }
    });
    
    // Apply discount if available
    if (tour.discount) {
      pricePerPerson = pricePerPerson * (1 - tour.discount / 100);
    }
    
    return pricePerPerson * numberOfPeople;
  };
  
  // Handle customization selection
  const handleOptionSelect = (category: string, option: CustomizationOption | null) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: option
    }));
  };

  // Handle number of people change with increment/decrement
  const incrementPeople = () => {
    setNumberOfPeople(prev => prev + 1);
  };

  const decrementPeople = () => {
    setNumberOfPeople(prev => Math.max(1, prev - 1));
  };

  // Get group size options based on pricing tiers
  const getGroupSizeOptions = () => {
    const pricingTiers = getPricingTiers();
    return pricingTiers.map(tier => ({
      value: tier.min.toString(),
      label: tier.label,
      price: tier.price,
      min: tier.min,
      max: tier.max
    }));
  };

  // Get current pricing tier label
  const getCurrentTierLabel = () => {
    const pricingTiers = getPricingTiers();
    const tier = pricingTiers.find(tier => 
      numberOfPeople >= tier.min && numberOfPeople <= tier.max
    );
    return tier ? tier.label : "Custom";
  };

  // Get base price for the current tier
  const getBasePriceForTier = () => {
    return getPricePerPerson() * numberOfPeople;
  };

  // Generate booking URL with parameters
  const getBookingUrl = () => {
    const params = new URLSearchParams({
      people: numberOfPeople.toString(),
      pricePerPerson: getPricePerPerson().toString(),
      totalPrice: calculateTotalPrice().toString(),
      customizations: JSON.stringify(selectedOptions)
    });
    
    return `/checkout/${tour.slug}?${params.toString()}`;
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Tour Header - Enhanced with gradient and animations */}
      <section className="py-12 bg-gradient-to-br from-safari-brown/20 via-safari-orange/10 to-safari-green/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        <div className="container relative">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 animate-fade-in-up">
            <div className="flex-1">
              <div className="flex items-center text-safari-orange mb-3 group">
                <MapPin size={18} className="mr-2 group-hover:animate-bounce transition-transform" />
                <span className="text-sm font-medium hover:text-safari-green transition-colors duration-300">
                  {tour.location}, {tour.country}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent hover:from-safari-orange hover:via-safari-green hover:to-safari-orange transition-all duration-500">
                {tour.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6 animate-fade-in-up tour-detail-delay-200">
                {tour.tagline}
              </p>
              <div className="flex items-center flex-wrap gap-6 animate-fade-in-up tour-detail-delay-300">
                <div className="flex items-center group hover:scale-105 transition-transform duration-200">
                  <Star size={20} className="text-safari-orange fill-current mr-2 group-hover:animate-spin" />
                  <span className="font-medium">
                    {tour.rating} <span className="text-gray-500">({tour.reviews.length} reviews)</span>
                  </span>
                </div>
                <div className="flex items-center group hover:scale-105 transition-transform duration-200">
                  <Calendar size={20} className="text-safari-green mr-2 group-hover:animate-pulse" />
                  <span>{tour.duration} days</span>
                </div>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] animate-fade-in-up tour-detail-delay-400">
              <div className="text-center mb-6">
                <div className="text-gray-500 mb-2 text-sm font-medium">Starting from</div>
                <div className="text-4xl font-bold text-safari-green mb-2 animate-pulse">
                  ${tour.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">per person</div>
              </div>
              
              {tour.discount && (
                <div className="inline-block bg-gradient-to-r from-safari-orange to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce shadow-lg mb-4">
                  {tour.discount}% OFF - Limited Time!
                </div>
              )}
              
              <Button 
                className="w-full bg-gradient-to-r from-safari-orange to-safari-green hover:from-safari-green hover:to-safari-orange transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 transform mt-4"
                size="lg"
                asChild
              >
                <Link to={getBookingUrl()}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tour Images and Main Content - Enhanced with better animations */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tour Images - Enhanced with hover effects */}
            <div className="lg:col-span-2 animate-fade-in-up">
              <div className="rounded-xl overflow-hidden mb-6 shadow-2xl group relative">
                <img 
                  src={tour.images[activeImageIndex].url} 
                  alt={tour.images[activeImageIndex].alt}
                  className="w-full h-[450px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {tour.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      activeImageIndex === index 
                        ? 'ring-3 ring-safari-orange shadow-xl transform scale-105' 
                        : 'hover:ring-2 hover:ring-safari-green/50'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-24 object-cover transition-all duration-300 hover:brightness-110"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Booking Card - Enhanced with glassmorphism */}
            <div className="lg:row-span-2 animate-fade-in-up tour-detail-delay-200">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sticky top-24 border border-white/20 hover:shadow-3xl transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-safari-orange to-safari-green bg-clip-text text-transparent">
                  Customize Your Tour
                </h3>
                
                {/* Group Size Selector - Enhanced */}
                <div className="mb-8">
                  <Label className="text-lg font-medium mb-4 block">Number of People</Label>
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementPeople}
                      disabled={numberOfPeople <= 1}
                      className="h-12 w-12 p-0 hover:scale-110 transition-transform duration-200 hover:bg-safari-orange hover:text-white border-2 rounded-full"
                    >
                      <Minus size={20} />
                    </Button>
                    <div className="flex items-center justify-center min-w-[80px] bg-gradient-to-r from-safari-green/10 to-safari-orange/10 rounded-lg px-6 py-3">
                      <span className="text-2xl font-semibold animate-pulse">{numberOfPeople}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementPeople}
                      className="h-12 w-12 p-0 hover:scale-110 transition-transform duration-200 hover:bg-safari-green hover:text-white border-2 rounded-full"
                    >
                      <Plus size={20} />
                    </Button>
                  </div>
                  
                  {/* Quick select buttons for pricing tiers */}
                  <div className="space-y-3">
                    {getPricingTiers().map((tier, index) => (
                      <Button
                        key={index}
                        variant={numberOfPeople >= tier.min && numberOfPeople <= tier.max ? "default" : "outline"}
                        size="sm"
                        className={`w-full justify-between transition-all duration-300 hover:scale-[1.02] h-12 ${
                          numberOfPeople >= tier.min && numberOfPeople <= tier.max
                            ? 'bg-gradient-to-r from-safari-orange to-safari-green shadow-lg' 
                            : 'hover:bg-gradient-to-r hover:from-safari-orange/10 hover:to-safari-green/10'
                        }`}
                        onClick={() => setNumberOfPeople(tier.min)}
                      >
                        <span>{tier.label}</span>
                        <span className="font-semibold">
                          ${tier.price.toLocaleString()}
                        </span>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="text-center mt-4 p-3 bg-gradient-to-r from-safari-green/5 to-safari-orange/5 rounded-lg">
                    <span className="text-sm text-gray-600">
                      Current rate: <span className="font-semibold text-safari-green">${getPricePerPerson().toLocaleString()}</span> per person
                    </span>
                  </div>
                </div>
                
                {/* Customization Options */}
                <Accordion type="single" collapsible className="mb-8">
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
                
                {/* Price Summary - Enhanced with better styling */}
                <div className="border-t border-gradient-to-r from-safari-orange/20 to-safari-green/20 pt-6 mb-8 bg-gradient-to-br from-gray-50/50 to-white/50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4 text-safari-brown">Price Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between hover:bg-white/50 p-2 rounded transition-colors duration-200">
                      <span>Base price ({getCurrentTierLabel()}):</span>
                      <span className="font-medium">${getBasePriceForTier().toLocaleString()}</span>
                    </div>
                    
                    {Object.entries(selectedOptions).map(([category, option]) => {
                      if (!option) return null;
                      const totalAdjustment = option.priceAdjustment * numberOfPeople;
                      return (
                        <div key={category} className="flex justify-between hover:bg-white/50 p-2 rounded transition-colors duration-200">
                          <span>{option.name} ({numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}):</span>
                          <span className="font-medium text-safari-orange">+${totalAdjustment.toLocaleString()}</span>
                        </div>
                      );
                    })}
                    
                    {tour.discount && (
                      <div className="flex justify-between text-safari-orange hover:bg-white/50 p-2 rounded transition-colors duration-200">
                        <span>Discount ({tour.discount}%):</span>
                        <span>-${(calculateTotalPrice() * tour.discount / (100 - tour.discount)).toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t border-gray-200 bg-gradient-to-r from-safari-green/10 to-safari-orange/10 p-3 rounded-lg animate-pulse">
                      <span>Total:</span>
                      <span className="text-safari-green">${calculateTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Book Now Button - Enhanced with booking URL */}
                <Button 
                  className="w-full bg-gradient-to-r from-safari-orange to-safari-green hover:from-safari-green hover:to-safari-orange transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 transform h-14 text-lg" 
                  size="lg" 
                  asChild
                >
                  <Link to={getBookingUrl()}>
                    Book Now - Secure Your Spot
                  </Link>
                </Button>
                
                <div className="text-center mt-4 text-sm text-gray-500 flex items-center justify-center">
                  <Check size={16} className="mr-2 text-safari-green" />
                  <span>Free cancellation up to 24 hours before</span>
                </div>
              </div>
            </div>
            
            {/* Tour Content - Enhanced tabs */}
            <div className="lg:col-span-2 animate-fade-in-up tour-detail-delay-300">
              <Tabs defaultValue="overview" className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <TabsList className="grid grid-cols-4 mb-8 bg-gradient-to-r from-safari-brown/10 to-safari-green/10 rounded-lg p-1 h-14">
                  <TabsTrigger 
                    value="overview" 
                    className="hover:scale-105 transition-transform duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-safari-orange data-[state=active]:to-safari-green data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="itinerary" 
                    className="hover:scale-105 transition-transform duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-safari-orange data-[state=active]:to-safari-green data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    Itinerary
                  </TabsTrigger>
                  <TabsTrigger 
                    value="details" 
                    className="hover:scale-105 transition-transform duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-safari-orange data-[state=active]:to-safari-green data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="hover:scale-105 transition-transform duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-safari-orange data-[state=active]:to-safari-green data-[state=active]:text-white data-[state=active]:shadow-lg"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="animate-fade-in-up">
                  <div className="py-6">
                    <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-safari-orange to-safari-green bg-clip-text text-transparent">
                      Tour Overview
                    </h3>
                    <p className="mb-8 text-lg leading-relaxed text-gray-700">
                      {tour.description}
                    </p>
                    
                    <h4 className="text-2xl font-semibold mb-6 text-safari-brown">Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {tour.highlights.map((highlight, index) => (
                        <div 
                          key={index} 
                          className="flex items-start group hover:bg-gradient-to-r hover:from-safari-green/5 hover:to-safari-orange/5 p-4 rounded-xl transition-all duration-300 border border-gray-100 hover:border-safari-green/30"
                        >
                          <div className="bg-safari-green/10 p-2 rounded-full mr-4 group-hover:bg-safari-orange/10 transition-colors duration-300">
                            <Check size={20} className="text-safari-green group-hover:text-safari-orange transition-colors duration-300" />
                          </div>
                          <span className="text-lg group-hover:text-gray-800 transition-colors duration-200">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {tour.mapImage && (
                      <div className="mt-10">
                        <h4 className="text-2xl font-semibold mb-6 text-safari-brown">Tour Map</h4>
                        <div className="rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 group border-2 border-gray-200">
                          <img 
                            src={tour.mapImage} 
                            alt="Tour map"
                            className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {/* Itinerary Tab */}
                <TabsContent value="itinerary" className="animate-fade-in-up">
                  <div className="py-6">
                    <h3 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-safari-orange to-safari-green bg-clip-text text-transparent">
                      Tour Itinerary
                    </h3>
                    <div className="space-y-8">
                      {tour.itinerary.map((day, index) => (
                        <div 
                          key={day.day} 
                          className={`border-l-4 border-safari-orange pl-8 py-6 hover:bg-gradient-to-r hover:from-safari-orange/5 hover:to-safari-green/5 rounded-r-xl transition-all duration-300 group animate-fade-in-up tour-detail-staggered-${index} relative`}
                        >
                          <div className="absolute -left-4 top-6 w-8 h-8 rounded-full bg-safari-orange flex items-center justify-center text-white font-bold shadow-lg">
                            {day.day}
                          </div>
                          <h4 className="text-2xl font-medium mb-4 group-hover:text-safari-orange transition-colors duration-200">
                            {day.title}
                          </h4>
                          <p className="mb-6 text-gray-700 leading-relaxed">{day.description}</p>
                          <div className="flex items-center space-x-4 mb-4">
                            <span className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                              day.meals.breakfast ? 'bg-safari-green/20 text-safari-green' : 'bg-gray-200 text-gray-500 line-through'
                            }`}>
                              Breakfast
                            </span>
                            <span className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                              day.meals.lunch ? 'bg-safari-green/20 text-safari-green' : 'bg-gray-200 text-gray-500 line-through'
                            }`}>
                              Lunch
                            </span>
                            <span className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                              day.meals.dinner ? 'bg-safari-green/20 text-safari-green' : 'bg-gray-200 text-gray-500 line-through'
                            }`}>
                              Dinner
                            </span>
                          </div>
                          <div className="text-sm bg-safari-brown/10 p-3 rounded-lg border border-safari-brown/20">
                            <span className="font-medium text-safari-brown">Accommodation:</span> {day.accommodation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Details Tab */}
                <TabsContent value="details" className="animate-fade-in-up">
                  <div className="py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-safari-green/5 to-safari-green/10 p-8 rounded-xl border border-safari-green/20">
                        <h4 className="text-2xl font-semibold mb-6 text-safari-green">What's Included</h4>
                        <ul className="space-y-4">
                          {tour.inclusions.map((item, index) => (
                            <li 
                              key={index} 
                              className="flex items-start group hover:bg-white/50 p-3 rounded-lg transition-all duration-200"
                            >
                              <div className="bg-safari-green/20 p-1.5 rounded-full mr-4">
                                <Check size={18} className="text-safari-green" />
                              </div>
                              <span className="text-lg group-hover:text-gray-800 transition-colors duration-200">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-safari-orange/5 to-safari-orange/10 p-8 rounded-xl border border-safari-orange/20">
                        <h4 className="text-2xl font-semibold mb-6 text-safari-orange">What's Not Included</h4>
                        <ul className="space-y-4">
                          {tour.exclusions.map((item, index) => (
                            <li 
                              key={index} 
                              className="flex items-start group hover:bg-white/50 p-3 rounded-lg transition-all duration-200"
                            >
                              <div className="bg-safari-orange/20 p-1.5 rounded-full mr-4">
                                <AlertCircle size={18} className="text-safari-orange" />
                              </div>
                              <span className="text-lg group-hover:text-gray-800 transition-colors duration-200">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="animate-fade-in-up">
                  <div className="py-6">
                    <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-safari-orange/10 to-safari-green/10 rounded-xl border border-safari-orange/20">
                      <h4 className="text-2xl font-semibold text-safari-brown">Customer Reviews</h4>
                      <div className="flex items-center group hover:scale-105 transition-transform duration-200">
                        <Star size={24} className="text-safari-orange fill-current mr-2 group-hover:animate-spin" />
                        <span className="font-semibold text-xl">{tour.rating}</span>
                        <span className="text-gray-500 ml-2">({tour.reviews.length} reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-8">
                      {tour.reviews.map((review, index) => (
                        <div 
                          key={review.id} 
                          className={`border-b border-gray-200 pb-8 last:border-0 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-white/50 p-6 rounded-xl transition-all duration-300 group animate-fade-in-up tour-detail-staggered-${index}`}
                        >
                          <div className="flex justify-between mb-4">
                            <h5 className="text-xl font-semibold group-hover:text-safari-orange transition-colors duration-200">
                              {review.name}
                            </h5>
                            <span className="text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={20} 
                                className={`mr-1 transition-all duration-200 hover:scale-125 ${i < review.rating ? "text-safari-orange fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-200">
                            {review.comment}
                          </p>
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
      
      {/* Related Tours Section - Enhanced */}
      <section className="py-16 bg-gradient-to-br from-safari-brown/10 via-safari-orange/5 to-safari-green/10 relative overflow-hidden">
        <div className="container relative">
          <h3 className="text-3xl font-semibold mb-12 text-center bg-gradient-to-r from-safari-orange to-safari-green bg-clip-text text-transparent animate-fade-in-up">
            You May Also Like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.filter(t => t.id !== tour.id && t.country === tour.country).slice(0, 3).map((relatedTour, index) => (
              <Link 
                key={relatedTour.id} 
                to={`/tours/${relatedTour.slug}`}
                className={`group bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up border border-white/20 tour-detail-related-${index}`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={relatedTour.images[0].url} 
                    alt={relatedTour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {relatedTour.discount && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-safari-orange to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce shadow-lg">
                      {relatedTour.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-3 group-hover:text-safari-orange transition-colors duration-200">
                    {relatedTour.name}
                  </h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">{relatedTour.location}</span>
                    <div className="flex items-center">
                      <Star size={16} className="text-safari-orange fill-current mr-1" />
                      <span>{relatedTour.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{relatedTour.duration} days</span>
                    <span className="font-semibold text-lg text-safari-green">
                      ${relatedTour.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

// CustomizationSection Component - Enhanced with better animations
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
    <AccordionItem 
      value={title.toLowerCase()} 
      className="border border-gray-200 rounded-xl mb-4 overflow-hidden hover:border-safari-orange/50 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <AccordionTrigger className="px-6 py-4 hover:bg-gradient-to-r hover:from-safari-orange/5 hover:to-safari-green/5 hover:no-underline transition-all duration-300 group">
        <span className="flex items-center justify-between w-full">
          <span className="text-lg font-medium group-hover:text-safari-orange transition-colors duration-200">
            {title}
          </span>
          {selected && (
            <span className="text-sm bg-gradient-to-r from-safari-green/20 to-safari-orange/20 px-3 py-1 rounded-full mr-2 animate-pulse">
              {selected.priceAdjustment >= 0 ? '+' : ''}${selected.priceAdjustment}
            </span>
          )}
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 bg-gradient-to-br from-gray-50/50 to-white/50">
        <RadioGroup 
          value={selected?.id || ''} 
          onValueChange={(value) => {
            const option = options.find(opt => opt.id === value);
            onSelect(option || null);
          }}
          className="space-y-4 mt-4"
        >
          {options.map((option, index) => (
            <div 
              key={option.id} 
              className={`flex items-start space-x-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md group animate-fade-in-up tour-detail-option-${index} ${
                selected?.id === option.id 
                  ? 'border-safari-orange bg-gradient-to-r from-safari-orange/10 to-safari-green/10 shadow-lg' 
                  : 'border-gray-200 hover:border-safari-green/50 hover:bg-white/80'
              }`}
            >
              <RadioGroupItem 
                value={option.id} 
                id={option.id}
                className="mt-1 transition-all duration-200 hover:scale-110 h-5 w-5"
              />
              <div className="flex-1 min-w-0">
                <Label 
                  htmlFor={option.id} 
                  className="cursor-pointer block group-hover:text-safari-orange transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-lg">{option.name}</span>
                    <span className={`font-semibold text-sm px-3 py-1 rounded-full transition-all duration-200 ${
                      option.priceAdjustment >= 0 
                        ? 'text-safari-orange bg-safari-orange/10' 
                        : 'text-safari-green bg-safari-green/10'
                    }`}>
                      {option.priceAdjustment >= 0 ? '+' : ''}${option.priceAdjustment}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                    {option.description}
                  </p>
                </Label>
              </div>
            </div>
          ))}
          
          {/* None/Default option */}
          <div 
            className={`flex items-start space-x-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md group ${
              !selected 
                ? 'border-safari-green bg-gradient-to-r from-safari-green/10 to-safari-orange/10 shadow-lg' 
                : 'border-gray-200 hover:border-safari-orange/50 hover:bg-white/80'
            }`}
          >
            <RadioGroupItem 
              value="" 
              id={`${title.toLowerCase()}-none`}
              className="mt-1 transition-all duration-200 hover:scale-110 h-5 w-5"
            />
            <div className="flex-1">
              <Label 
                htmlFor={`${title.toLowerCase()}-none`} 
                className="cursor-pointer block group-hover:text-safari-green transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-lg">Standard</span>
                  <span className="font-semibold text-sm text-safari-green bg-safari-green/10 px-3 py-1 rounded-full">
                    Included
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                  Default option included in base price
                </p>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TourDetailPage;