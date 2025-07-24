import { useState, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, Check, AlertCircle, ArrowLeft, 
  MessageCircle, Smartphone, Building2, Calendar,
  DollarSign, Bitcoin, Globe, Users, HelpCircle,
  Clock, MapPin
} from 'lucide-react';
import { tours } from '@/data/tours'; // Import the same data source
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelers: string;
  travelDate: string;
  specialRequests: string;
}

const CheckoutPage = () => {
  const { tourSlug } = useParams<{ tourSlug: string }>();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [bookingMode, setBookingMode] = useState<'book' | 'inquiry'>('book');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Find the tour by slug using the same data source as tour detail page
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const userData: FormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      travelers: formData.get('travelers') as string,
      travelDate: formData.get('travelDate') as string,
      specialRequests: formData.get('specialRequests') as string || ''
    };
    
    // Validation logic
    const errors: {[key: string]: string} = {};
    
    if (bookingMode === 'book' && paymentMethod === 'card') {
      const cardNumber = formData.get('cardNumber') as string || '';
      const expiry = formData.get('expiry') as string || '';
      const cvv = formData.get('cvv') as string || '';
      
      if (cardNumber.length < 16) {
        errors.cardNumber = "Please enter a valid card number";
      }
      
      if (!expiry.match(/^\d{2}\/\d{2}$/)) {
        errors.expiry = "Please enter a valid expiry date (MM/YY)";
      }
      
      if (cvv.length < 3) {
        errors.cvv = "Please enter a valid CVV";
      }
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsProcessing(true);
    
    // Calculate total price
    let totalPrice = tour.price;
    if (tour.discount) {
      totalPrice = totalPrice * (1 - tour.discount / 100);
    }
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      
      if (bookingMode === 'inquiry') {
        setInquirySubmitted(true);
        setTimeout(() => {
          navigate('/inquiry-confirmation', {
            state: {
              userData,
              tour,
              totalPrice
            }
          });
        }, 2000);
      } else {
        setFormSubmitted(true);
        setTimeout(() => {
          // Pass the actual user data to the booking confirmation page
          navigate('/booking-confirmation', {
            state: {
              userData,
              tour,
              totalPrice,
              paymentMethod
            }
          });
        }, 2000);
      }
    }, 2000);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = tour.price;
    
    if (tour.discount) {
      total = total * (1 - tour.discount / 100);
    }
    
    return total;
  };

  const renderPaymentMethodFields = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardName" className="block mb-2 font-medium">Name on Card</label>
              <Input id="cardName" name="cardName" required />
            </div>
            
            <div>
              <label htmlFor="cardNumber" className="block mb-2 font-medium">Card Number</label>
              <Input 
                id="cardNumber" 
                name="cardNumber" 
                placeholder="1234 5678 9012 3456" 
                required 
                className={formErrors.cardNumber ? "border-red-500" : ""}
              />
              {formErrors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block mb-2 font-medium">Expiry Date</label>
                <Input 
                  id="expiry" 
                  name="expiry" 
                  placeholder="MM/YY" 
                  required 
                  className={formErrors.expiry ? "border-red-500" : ""}
                />
                {formErrors.expiry && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.expiry}</p>
                )}
              </div>
              <div>
                <label htmlFor="cvv" className="block mb-2 font-medium">CVV</label>
                <Input 
                  id="cvv" 
                  name="cvv" 
                  placeholder="123" 
                  required 
                  className={formErrors.cvv ? "border-red-500" : ""}
                />
                {formErrors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'paypal':
        return (
          <div className="bg-blue-50 p-4 rounded-md text-center">
            <p className="mb-2">You will be redirected to PayPal to complete your payment.</p>
            <p className="text-sm text-muted-foreground">Secure payment with PayPal buyer protection.</p>
          </div>
        );
      
      case 'bank_transfer':
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-md">
              <p className="text-sm font-medium mb-2">Bank Transfer Instructions:</p>
              <p className="text-sm">After booking confirmation, you'll receive bank details via email. Payment must be completed within 24 hours to secure your booking.</p>
            </div>
          </div>
        );
      
      case 'mobile_money':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="mobileNumber" className="block mb-2 font-medium">Mobile Number</label>
              <Input id="mobileNumber" name="mobileNumber" placeholder="+256 700 000 000" required />
            </div>
            <div>
              <label htmlFor="mobileProvider" className="block mb-2 font-medium">Mobile Money Provider</label>
              <Select name="mobileProvider">
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                  <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <p className="text-sm">You will be redirected to complete your payment securely.</p>
          </div>
        );
    }
  };

  return (
    <div className="py-12">
      <div className="container">
        <Link to={`/tours/${tour.slug}`} className="flex items-center text-green-600 mb-8 hover:underline">
          <ArrowLeft size={18} className="mr-2" />
          Back to Tour Details
        </Link>
        
        {/* Booking Mode Toggle */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {bookingMode === 'book' ? 'Checkout' : 'Make an Inquiry'}
          </h1>
          
          <div className="flex gap-4 mb-6">
            <Button
              variant={bookingMode === 'book' ? 'default' : 'outline'}
              onClick={() => setBookingMode('book')}
              className="flex items-center gap-2"
            >
              <CreditCard size={18} />
              Book Now
            </Button>
            <Button
              variant={bookingMode === 'inquiry' ? 'default' : 'outline'}
              onClick={() => setBookingMode('inquiry')}
              className="flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Make Inquiry
            </Button>
          </div>
          
          <p className="text-muted-foreground">
            {bookingMode === 'book' 
              ? `Complete your booking for ${tour.name}`
              : `Get a custom quote or ask questions about ${tour.name}`
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-lg text-center">
                <Check size={48} className="mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Payment Successful!</h2>
                <p className="mb-2">Your booking for {tour.name} has been confirmed.</p>
                <p>Redirecting to your booking confirmation...</p>
              </div>
            ) : inquirySubmitted ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 p-8 rounded-lg text-center">
                <MessageCircle size={48} className="mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Inquiry Submitted!</h2>
                <p className="mb-2">Thank you for your interest in {tour.name}.</p>
                <p>Our team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block mb-2 font-medium">First Name</label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-2 font-medium">Last Name</label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 font-medium">Phone Number</label>
                      <Input id="phone" name="phone" required />
                    </div>
                  </div>
                </div>
                
                {/* Travel Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Travel Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="travelers" className="flex items-center gap-2 mb-2 font-medium">
                        <Users size={18} />
                        Number of Travelers
                      </label>
                      <Select name="travelers" defaultValue="2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3">3 People</SelectItem>
                          <SelectItem value="4">4 People</SelectItem>
                          <SelectItem value="5">5 People</SelectItem>
                          <SelectItem value="6">6+ People</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="travelDate" className="flex items-center gap-2 mb-2 font-medium">
                        <Calendar size={18} />
                        {bookingMode === 'inquiry' ? 'Preferred Travel Date' : 'Travel Date'}
                      </label>
                      <Input id="travelDate" name="travelDate" type="date" required />
                    </div>
                  </div>
                  
                  {/* Enhanced Special Requests */}
                  <div className="mt-6">
                    <label htmlFor="specialRequests" className="flex items-center gap-2 mb-3 font-medium">
                      <HelpCircle size={18} />
                      {bookingMode === 'inquiry' ? 'Questions & Requirements' : 'Special Requests & Preferences'}
                    </label>
                    
                    {bookingMode === 'inquiry' ? (
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm font-medium mb-2">Tell us about:</p>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Your ideal travel dates and flexibility</li>
                            <li>• Budget range and what's included</li>
                            <li>• Group composition (ages, interests)</li>
                            <li>• Accommodation preferences</li>
                            <li>• Activity levels and interests</li>
                            <li>• Any questions about the itinerary</li>
                          </ul>
                        </div>
                        <textarea 
                          id="specialRequests" 
                          name="specialRequests" 
                          rows={6} 
                          className="w-full border-border rounded-md p-3"
                          placeholder="We'd love to customize this experience for you! Please share your travel preferences, questions, or any specific requirements..."
                        ></textarea>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm font-medium mb-2">Let us know if you have:</p>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Dietary restrictions or food allergies</li>
                            <li>• Accessibility or mobility needs</li>
                            <li>• Special occasions (anniversary, birthday, etc.)</li>
                            <li>• Photography or activity preferences</li>
                            <li>• Room/accommodation requests</li>
                          </ul>
                        </div>
                        <textarea 
                          id="specialRequests" 
                          name="specialRequests" 
                          rows={4} 
                          className="w-full border-border rounded-md p-3"
                          placeholder="Share any special requests, dietary needs, accessibility requirements, or preferences to help us personalize your experience..."
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Payment Methods - Only show for booking */}
                {bookingMode === 'book' && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard size={20} />
                            Credit/Debit Card
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                            <Globe size={20} />
                            PayPal
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                          <Label htmlFor="bank_transfer" className="flex items-center gap-2 cursor-pointer">
                            <Building2 size={20} />
                            Bank Transfer
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="mobile_money" id="mobile_money" />
                          <Label htmlFor="mobile_money" className="flex items-center gap-2 cursor-pointer">
                            <Smartphone size={20} />
                            Mobile Money
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="crypto" id="crypto" />
                          <Label htmlFor="crypto" className="flex items-center gap-2 cursor-pointer">
                            <Bitcoin size={20} />
                            Cryptocurrency
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    {/* Payment Method Fields */}
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <Check className="text-green-600 mr-2" size={16} />
                        <span className="text-sm">Secure payment with SSL encryption</span>
                      </div>
                      {renderPaymentMethodFields()}
                    </div>
                  </div>
                )}
                
                {/* Terms and Conditions */}
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <Checkbox id="terms" required />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="terms" className="font-medium">
                      I agree to the <Link to="/terms" className="text-green-600 hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                </div>
                
                <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                  {isProcessing 
                    ? "Processing..." 
                    : bookingMode === 'inquiry' 
                      ? "Submit Inquiry" 
                      : "Confirm Booking"
                  }
                </Button>
              </form>
            )}
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-semibold mb-4">
                {bookingMode === 'inquiry' ? 'Tour Summary' : 'Booking Summary'}
              </h2>
              
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                  <img 
                    src={tour.images[0].url} 
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{tour.name}</h3>
                  <p className="text-sm text-muted-foreground">{tour.duration} days</p>
                </div>
              </div>
              
              {bookingMode === 'book' && (
                <>
                  <div className="py-4 border-b border-border">
                    <div className="flex justify-between mb-2">
                      <span>Base price:</span>
                      <span>${tour.price.toLocaleString()}</span>
                    </div>
                    
                    {tour.discount && (
                      <div className="flex justify-between mb-2 text-orange-600">
                        <span>Discount ({tour.discount}%):</span>
                        <span>-${(tour.price * tour.discount / 100).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg pt-4">
                    <span>Total:</span>
                    <span>${calculateTotalPrice().toLocaleString()}</span>
                  </div>
                </>
              )}
              
              {bookingMode === 'inquiry' && (
                <div className="py-4">
                  <div className="flex justify-between mb-2">
                    <span>Starting from:</span>
                    <span className="font-semibold">${tour.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Final price will be provided based on your specific requirements and travel dates.
                  </p>
                </div>
              )}
              
              <div className="mt-6 text-sm text-muted-foreground">
                {bookingMode === 'book' ? (
                  <>
                    <div className="flex items-start mb-2">
                      <AlertCircle size={16} className="mr-2 shrink-0 mt-0.5" />
                      <span>A deposit of 20% is required to secure your booking.</span>
                    </div>
                    <div className="flex items-start">
                      <Check size={16} className="mr-2 shrink-0 mt-0.5" />
                      <span>Free cancellation up to 30 days before your trip.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start mb-2">
                      <MessageCircle size={16} className="mr-2 shrink-0 mt-0.5" />
                      <span>Our travel experts will respond within 24 hours.</span>
                    </div>
                    <div className="flex items-start">
                      <Check size={16} className="mr-2 shrink-0 mt-0.5" />
                      <span>No obligation - completely free consultation.</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;