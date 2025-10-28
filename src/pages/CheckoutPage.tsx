import { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Check, AlertCircle, ArrowLeft, MessageCircle, CreditCard, Copy, ExternalLink, QrCode, RefreshCw, Wallet, Loader2 } from 'lucide-react';
import { tours } from '@/data/tours'; 
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { InquiryForm } from './InquiryForm';
import { Label } from '@radix-ui/react-label';
import { ContactInfoForm } from './ContactInfoForm';
import { TravelInfoForm } from './TravelInfoForm';
import { PaymentMethods } from './PaymentMethods';
import { BookingSummary } from './BookingSummary';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelers: string;
  travelDate: string;
  specialRequests: string;
}

interface PaymentTypeSelectorProps {
  paymentType: 'deposit' | 'full';
  setPaymentType: React.Dispatch<React.SetStateAction<'deposit' | 'full'>>;
  calculatePaymentAmounts: () => { 
    totalPrice: number; 
    depositAmount: number; 
    remainingBalance: number; 
  };
}

const CheckoutPage = () => {
  const { tourSlug } = useParams<{ tourSlug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [bookingMode, setBookingMode] = useState<'book' | 'inquiry'>('book');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  
  const urlNumberOfPeople = parseInt(searchParams.get('people') || '1');
  const urlPricePerPerson = parseFloat(searchParams.get('pricePerPerson') || '0');
  const urlTotalPrice = parseFloat(searchParams.get('totalPrice') || '0');
  const customizationsParam = searchParams.get('customizations');

  const [numberOfPeople, setNumberOfPeople] = useState(urlNumberOfPeople);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Parse customizations from URL
  const selectedCustomizations = customizationsParam 
    ? JSON.parse(customizationsParam) 
    : {};
  
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
  const [blueWalletConnected, setBlueWalletConnected] = useState(false);
  const [blueWalletAddress, setBlueWalletAddress] = useState('');
  const [cryptoPaymentAddress, setCryptoPaymentAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [paymentQRCode, setPaymentQRCode] = useState('');
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [cryptoExchangeRates, setCryptoExchangeRates] = useState({
    bitcoin: 0.000023, //  1 UGX = 0.000023 BTC
    ethereum: 0.00035, // 1 UGX = 0.00035 ETH
    lightning: 0.000023 // Lightning Network BTC
  });

  // Mock Blue Wallet API integration
  const connectBlueWallet = async () => {
    setIsConnectingWallet(true);
    
    try {
      
      // For demo, we'll simulate the connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock wallet connection response
      const mockWalletAddress = selectedCrypto === 'bitcoin' 
        ? 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
        : selectedCrypto === 'ethereum'
        ? '0x742d35Cc6230252C4eF1D9E5F1a0c6eE4F2Bcd5A'
        : 'lnbc1500000n1pjg7mqzpp5w8hnvr0xqckg3k5j7j4xetwzq3y4g9w8r7x6c5v4b2n1m9s8z7qsp5x2q3';
      
      setBlueWalletAddress(mockWalletAddress);
      setBlueWalletConnected(true);
      
      // Generate payment details
      const amount = paymentType === 'deposit' 
        ? calculatePaymentAmounts().depositAmount 
        : calculatePaymentAmounts().totalPrice;
        
      const cryptoAmount = (amount * cryptoExchangeRates[selectedCrypto as keyof typeof cryptoExchangeRates]).toFixed(8);
      setCryptoAmount(cryptoAmount);
      setCryptoPaymentAddress(mockWalletAddress);
      
      const qrData = selectedCrypto === 'lightning' 
        ? mockWalletAddress 
        : `${selectedCrypto}:${mockWalletAddress}?amount=${cryptoAmount}`;
      setPaymentQRCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`);
      
    } catch (error) {
      console.error('Failed to connect Blue Wallet:', error);
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const disconnectWallet = () => {
    setBlueWalletConnected(false);
    setBlueWalletAddress('');
    setCryptoPaymentAddress('');
    setCryptoAmount('');
    setPaymentQRCode('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // we might want to show a toast notification here
  };

  const openInBlueWallet = () => {
    const blueWalletUrl = selectedCrypto === 'lightning'
      ? `bluewallet:lightning:${cryptoPaymentAddress}`
      : `bluewallet:${selectedCrypto}:${cryptoPaymentAddress}?amount=${cryptoAmount}`;
    
    window.open(blueWalletUrl, '_blank');
  };

  const getCurrentPricePerPerson = () => {
    // Always calculate based on current numberOfPeople state
    const pricingTiers = getPricingTiers();
    const tier = pricingTiers.find(tier => 
      numberOfPeople >= tier.min && numberOfPeople <= tier.max
    );
    return tier ? tier.price : tour.price;
  };

  const getCurrentTierLabel = () => {
    const pricingTiers = getPricingTiers();
    const tier = pricingTiers.find(tier => 
      numberOfPeople >= tier.min && numberOfPeople <= tier.max
    );
    return tier ? tier.label : "Custom";
  };

  const calculateTotalPrice = () => {
    let pricePerPersonCalc = getCurrentPricePerPerson();
    
    Object.values(selectedCustomizations).forEach((option: any) => {
      if (option) {
        pricePerPersonCalc += option.priceAdjustment;
      }
    });
    
    if (tour.discount) {
      pricePerPersonCalc = pricePerPersonCalc * (1 - tour.discount / 100);
    }
    
    return pricePerPersonCalc * numberOfPeople;
  };

  const calculatePaymentAmounts = () => {
    const totalPrice = calculateTotalPrice();
    const depositAmount = totalPrice * 0.2;
    const remainingBalance = totalPrice - depositAmount;
    
    return {
      totalPrice,
      depositAmount,
      remainingBalance
    };
  };

  // Function to send inquiry via Formspree
  const sendInquiry = async (formData: FormData) => {
    try {
      const inquiryData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        tourName: tour.name,
        tourSlug: tour.slug,
        numberOfTravelers: numberOfPeople,
        preferredTravelDate: formData.travelDate,
        specialRequests: formData.specialRequests,
        estimatedTotalPrice: calculateTotalPrice(),
        pricePerPerson: getCurrentPricePerPerson(),
        selectedCustomizations: JSON.stringify(selectedCustomizations),
        tourDuration: tour.duration,
        submissionType: 'Tour Inquiry',
        submissionDate: new Date().toISOString(),
        _subject: `New Tour Inquiry: ${tour.name} - ${formData.firstName} ${formData.lastName}`
      };

      const response = await fetch('https://formspree.io/f/xpwjoknq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData)
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      return true;
    } catch (error) {
      console.error('Error sending inquiry:', error);
      throw error;
    }
  };

  const PaymentTypeSelector: React.FC<PaymentTypeSelectorProps> = ({
  paymentType,
  setPaymentType,
  calculatePaymentAmounts
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
    
    <RadioGroup 
      value={paymentType} 
      onValueChange={(value: 'deposit' | 'full') => setPaymentType(value)}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-green-300 cursor-pointer">
        <RadioGroupItem value="deposit" id="deposit" />
        <Label htmlFor="deposit" className="flex flex-col cursor-pointer w-full">
          <span className="font-semibold">Pay 20% Deposit Now</span>
          <span className="text-sm text-muted-foreground">
            Secure your booking with UGx {calculatePaymentAmounts().depositAmount.toLocaleString()} deposit
          </span>
          <span className="text-xs text-blue-600 mt-1">
            Remaining UGx {calculatePaymentAmounts().remainingBalance.toLocaleString()} due 30 days before departure
          </span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-green-300 cursor-pointer">
        <RadioGroupItem value="full" id="full" />
        <Label htmlFor="full" className="flex flex-col cursor-pointer w-full">
          <span className="font-semibold">Pay in Full Now</span>
          <span className="text-sm text-muted-foreground">
            Complete payment of UGx {calculatePaymentAmounts().totalPrice.toLocaleString()} today
          </span>
        </Label>
      </div>
    </RadioGroup>
    
    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-start">
        <AlertCircle size={18} className="text-amber-600 mr-2 mt-0.5 shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-amber-800">Important:</p>
          <p className="text-amber-700">
            {paymentType === 'deposit' 
              ? `Your booking will be confirmed once the UGx ${calculatePaymentAmounts().depositAmount.toLocaleString()} deposit is received.`
              : 'Your booking will be fully confirmed upon complete payment.'
            }
          </p>
        </div>
      </div>
    </div>
  </div>
);

  // Handle travelers change
  const handleTravelersChange = (value: string) => {
    const newNumberOfPeople = parseInt(value);
    setNumberOfPeople(newNumberOfPeople);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
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
    
    // Crypto payment validation
    if (bookingMode === 'book' && paymentMethod === 'crypto' && !blueWalletConnected) {
      errors.crypto = "Please connect your Blue Wallet to proceed with crypto payment";
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsProcessing(true);
    
    try {
      if (bookingMode === 'inquiry') {
        // Send inquiry via Formspree
        await sendInquiry(userData);
        setInquirySubmitted(true);
        
        setTimeout(() => {
          navigate('/home', {
            state: {
              userData,
              tour,
              numberOfPeople,
              pricePerPerson: getCurrentPricePerPerson(),
              totalPrice: calculateTotalPrice(),
              selectedCustomizations
            }
          });
        }, 2000);
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const bookingData = {
          userData,
          tour,
          numberOfPeople,
          pricePerPerson: getCurrentPricePerPerson(),
          totalPrice: calculateTotalPrice(),
          selectedCustomizations,
          paymentMethod,
          paymentType,
          paymentAmount: paymentType === 'deposit' ? calculatePaymentAmounts().depositAmount : calculatePaymentAmounts().totalPrice,
          cryptoDetails: paymentMethod === 'crypto' ? {
            currency: selectedCrypto,
            amount: cryptoAmount,
            address: cryptoPaymentAddress,
            walletType: 'BlueWallet'
          } : undefined
        };
        
        setFormSubmitted(true);
        setTimeout(() => {
          navigate('/booking-confirmation', {
            state: bookingData
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormErrors({ submit: 'Failed to submit. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  
  

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
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
              ? `Complete your booking for ${tour.name} (${numberOfPeople} ${numberOfPeople === 1 ? 'person' : 'people'})`
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
                {paymentMethod === 'crypto' && (
                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Cryptocurrency payment received: {cryptoAmount} {selectedCrypto.toUpperCase()}
                    </p>
                  </div>
                )}
                <p>Redirecting to your booking confirmation...</p>
              </div>
            ) : inquirySubmitted ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 p-8 rounded-lg text-center">
                <MessageCircle size={48} className="mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Inquiry Submitted!</h2>
                <p className="mb-2">Thank you for your interest in {tour.name}.</p>
                <p className="mb-2">Your inquiry has been sent to our team at safaris.dirttrails@gmail.com</p>
                <p>We'll respond within 24 hours with a personalized quote and detailed information.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Show any submission errors */}
                {formErrors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle size={18} className="mr-2" />
                      <span>{formErrors.submit}</span>
                    </div>
                  </div>
                )}

                <ContactInfoForm />
                
                {bookingMode === 'inquiry' ? (
                  <InquiryForm />
                ) : (
                  <TravelInfoForm 
                    numberOfPeople={numberOfPeople}
                    handleTravelersChange={handleTravelersChange}
                    getCurrentPricePerPerson={getCurrentPricePerPerson}
                    getCurrentTierLabel={getCurrentTierLabel}
                    selectedCustomizations={selectedCustomizations}
                  />
                )}
                
                {/* Payment Type Selection - Only show for booking */}
                {bookingMode === 'book' && (
                  <PaymentTypeSelector 
                    paymentType={paymentType}
                    setPaymentType={setPaymentType}
                    calculatePaymentAmounts={calculatePaymentAmounts}
                  />
                )}
                
                {/* Payment Methods - Only show for booking */}
                {bookingMode === 'book' && (
                  <PaymentMethods 
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    formErrors={formErrors}
                    blueWalletConnected={blueWalletConnected}
                    isConnectingWallet={isConnectingWallet}
                    connectBlueWallet={connectBlueWallet}
                    selectedCrypto={selectedCrypto}
                    setSelectedCrypto={setSelectedCrypto}
                    cryptoAmount={cryptoAmount}
                    cryptoPaymentAddress={cryptoPaymentAddress}
                    paymentQRCode={paymentQRCode}
                    disconnectWallet={disconnectWallet}
                    copyToClipboard={copyToClipboard}
                    openInBlueWallet={openInBlueWallet}
                    paymentType={paymentType}
                    calculatePaymentAmounts={calculatePaymentAmounts}
                  />
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
                
                <Button type="submit" size="lg" className="w-full flex items-center justify-center gap-2" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : bookingMode === 'inquiry' 
                    ? "Submit Travel Proposal" 
                    : paymentMethod === 'crypto'
                      ? `Pay ${paymentType === 'deposit' ? 'Deposit' : 'Full Amount'} with Crypto`
                      : paymentType === 'deposit'
                        ? `Pay Deposit UGx ${calculatePaymentAmounts().depositAmount.toLocaleString()}`
                        : `Pay Full Amount UGx ${calculatePaymentAmounts().totalPrice.toLocaleString()}`
                  }
                </Button>
              </form>
            )}
          </div>
          
          <BookingSummary 
            bookingMode={bookingMode}
            tour={tour}
            numberOfPeople={numberOfPeople}
            getCurrentPricePerPerson={getCurrentPricePerPerson}
            getCurrentTierLabel={getCurrentTierLabel}
            selectedCustomizations={selectedCustomizations}
            tourDiscount={tour.discount}
            calculateTotalPrice={calculateTotalPrice}
            paymentType={paymentType}
            calculatePaymentAmounts={calculatePaymentAmounts}
            paymentMethod={paymentMethod}
            cryptoAmount={cryptoAmount}
            selectedCrypto={selectedCrypto}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;