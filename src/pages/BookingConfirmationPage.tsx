
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Calendar, User, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookingConfirmationPage = () => {
  // Generate booking reference
  const bookingReference = `EAST${Math.floor(Math.random() * 9000) + 1000}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-12">
      <div className="container max-w-4xl mx-auto">
        {/* Confirmation Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-safari-green/10 mb-4">
            <CheckCircle size={32} className="text-safari-green" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Your East African safari adventure is booked and confirmed.
          </p>
        </div>
        
        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-safari-green p-6 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Booking Details</h2>
              <span className="text-sm bg-white text-safari-green px-3 py-1 rounded-full">Confirmed</span>
            </div>
            <p className="mt-2">Booking Reference: <span className="font-mono font-bold">{bookingReference}</span></p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-safari-orange mb-4">Tour Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-2 text-safari-green shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Masai Mara Safari Adventure</p>
                      <p className="text-sm text-muted-foreground">Kenya</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-safari-green shrink-0" />
                    <div>
                      <p className="font-medium">June 15, 2023 - June 21, 2023</p>
                      <p className="text-sm text-muted-foreground">6 days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-safari-green shrink-0" />
                    <p>2 Adults</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-safari-orange mb-4">Customer Information</h3>
                <p><span className="font-medium">Name:</span> John Doe</p>
                <div className="flex items-center mt-2">
                  <Mail className="w-4 h-4 mr-2 text-safari-green shrink-0" />
                  <p>john.doe@example.com</p>
                </div>
                <p className="mt-2"><span className="font-medium">Phone:</span> +1 123-456-7890</p>
              </div>
            </div>
            
            <div className="border-t border-border mt-6 pt-6">
              <h3 className="font-semibold text-safari-orange mb-4">Payment Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Base tour price:</span>
                <span>$2,499.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Environmental conservation fee:</span>
                <span>$50.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total paid:</span>
                <span>$2,549.00</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                A deposit of $509.80 has been charged. The remaining balance of $2,039.20 is due by May 15, 2023.
              </p>
            </div>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-safari-orange/10 rounded-full w-8 h-8 flex items-center justify-center text-safari-orange font-semibold shrink-0 mt-0.5">1</div>
              <div className="ml-4">
                <h3 className="font-semibold">Check Your Email</h3>
                <p className="text-muted-foreground">
                  We've sent a confirmation email to john.doe@example.com with all your booking details and a receipt for your payment.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-safari-orange/10 rounded-full w-8 h-8 flex items-center justify-center text-safari-orange font-semibold shrink-0 mt-0.5">2</div>
              <div className="ml-4">
                <h3 className="font-semibold">Complete Your Profile</h3>
                <p className="text-muted-foreground">
                  Please fill out the traveler information form, including passport details and emergency contacts, before your departure.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-safari-orange/10 rounded-full w-8 h-8 flex items-center justify-center text-safari-orange font-semibold shrink-0 mt-0.5">3</div>
              <div className="ml-4">
                <h3 className="font-semibold">Review Pre-Departure Information</h3>
                <p className="text-muted-foreground">
                  Read through the pre-departure information, including packing recommendations, visa requirements, and health advice.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Conservation Contribution */}
        {true && (
          <div className="bg-safari-green/10 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Conservation Contribution</h2>
            <p className="mb-4">
              Thank you for adding the Environmental Conservation Fee to your booking! Your $50 contribution will help plant indigenous trees in areas affected by deforestation.
            </p>
            <p className="mb-4">
              Within 7 days, you will receive a certificate and tracking link via email that allows you to monitor the growth and impact of your trees for years to come.
            </p>
            <div className="flex items-center text-safari-green">
              <Download size={18} className="mr-2" />
              <span className="font-medium">Download Conservation Initiative Details</span>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Us with Questions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
