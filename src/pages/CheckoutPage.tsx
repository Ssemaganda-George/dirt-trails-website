
import { useState, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, Check, AlertCircle, TreePine, ArrowLeft
} from 'lucide-react';
import { tours } from '@/data/tours';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const CheckoutPage = () => {
  const { tourSlug } = useParams<{ tourSlug: string }>();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [environmentalFee, setEnvironmentalFee] = useState(true);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation (would be more comprehensive in a real app)
    const errors: {[key: string]: string} = {};
    const form = e.target as HTMLFormElement;
    const cardNumber = form.cardNumber.value;
    const expiry = form.expiry.value;
    const cvv = form.cvv.value;
    
    if (cardNumber.length < 16) {
      errors.cardNumber = "Please enter a valid card number";
    }
    
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      errors.expiry = "Please enter a valid expiry date (MM/YY)";
    }
    
    if (cvv.length < 3) {
      errors.cvv = "Please enter a valid CVV";
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setFormSubmitted(true);
      
      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        navigate('/booking-confirmation');
      }, 2000);
    }, 2000);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = tour.price;
    
    // Apply discount if available
    if (tour.discount) {
      total = total * (1 - tour.discount / 100);
    }
    
    // Add environmental fee
    if (environmentalFee) {
      total += 50;
    }
    
    return total;
  };

  return (
    <div className="py-12">
      <div className="container">
        <Link to={`/tours/${tour.slug}`} className="flex items-center text-safari-green mb-8 hover:underline">
          <ArrowLeft size={18} className="mr-2" />
          Back to Tour Details
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">Complete your booking for {tour.name}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-lg text-center">
                <Check size={48} className="mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Payment Successful!</h2>
                <p className="mb-2">Your booking for {tour.name} has been confirmed.</p>
                <p>Redirecting to your booking confirmation...</p>
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
                
                {/* Traveler Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Traveler Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="travelers" className="block mb-2 font-medium">Number of Travelers</label>
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
                      <label htmlFor="travelDate" className="block mb-2 font-medium">Preferred Travel Date</label>
                      <Input id="travelDate" name="travelDate" type="date" required />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="specialRequests" className="block mb-2 font-medium">Special Requests or Requirements</label>
                    <textarea 
                      id="specialRequests" 
                      name="specialRequests" 
                      rows={3} 
                      className="w-full border-border rounded-md p-2"
                    ></textarea>
                  </div>
                </div>
                
                {/* Environmental Fee Option */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start mb-4">
                    <div className="flex items-center h-5">
                      <Checkbox 
                        id="environmentalFee" 
                        checked={environmentalFee}
                        onCheckedChange={(checked) => setEnvironmentalFee(!!checked)}
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="environmentalFee" className="font-medium">Environmental Conservation Fee ($50)</label>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center">
                        <TreePine size={16} className="text-safari-green mr-1" />
                        Plant trees and support local conservation efforts
                      </p>
                    </div>
                  </div>
                  <div className="bg-safari-green/5 p-4 rounded-md">
                    <p className="text-sm">
                      Your contribution will help plant indigenous trees in areas affected by deforestation. You'll receive a certificate and tracking link via email to monitor the growth and impact of your trees.
                    </p>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  <div className="flex items-center mb-6">
                    <CreditCard className="text-safari-green mr-2" />
                    <span className="font-medium">Secure payment with SSL encryption</span>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block mb-2 font-medium">Name on Card</label>
                    <Input id="cardName" name="cardName" required />
                  </div>
                  
                  <div className="mb-4">
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
                
                {/* Terms and Conditions */}
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <Checkbox id="terms" required />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="terms" className="font-medium">
                      I agree to the <Link to="/terms" className="text-safari-green hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-safari-green hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                </div>
                
                <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Confirm Booking"}
                </Button>
              </form>
            )}
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                  <img 
                    src={tour.coverImage} 
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{tour.name}</h3>
                  <p className="text-sm text-muted-foreground">{tour.duration} days</p>
                </div>
              </div>
              
              <div className="py-4 border-b border-border">
                <div className="flex justify-between mb-2">
                  <span>Base price:</span>
                  <span>${tour.price.toLocaleString()}</span>
                </div>
                
                {tour.discount && (
                  <div className="flex justify-between mb-2 text-safari-orange">
                    <span>Discount ({tour.discount}%):</span>
                    <span>-${(tour.price * tour.discount / 100).toLocaleString()}</span>
                  </div>
                )}
                
                {environmentalFee && (
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <span>Environmental fee:</span>
                      <TreePine size={16} className="text-safari-green ml-1" />
                    </div>
                    <span>$50</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between font-bold text-lg pt-4">
                <span>Total:</span>
                <span>${calculateTotalPrice().toLocaleString()}</span>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <div className="flex items-start mb-2">
                  <AlertCircle size={16} className="mr-2 shrink-0 mt-0.5" />
                  <span>A deposit of 20% is required to secure your booking.</span>
                </div>
                <div className="flex items-start">
                  <Check size={16} className="mr-2 shrink-0 mt-0.5" />
                  <span>Free cancellation up to 30 days before your trip.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
