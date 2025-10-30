import { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Check, AlertCircle, ArrowLeft, MessageCircle, CreditCard, Copy, ExternalLink, QrCode, RefreshCw, Wallet, Loader2, ChevronRight } from 'lucide-react';
import { tours } from '@/data/tours'; 
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { InquiryForm } from './InquiryForm';
import { Label } from '@radix-ui/react-label';
import { ContactInfoForm } from './ContactInfoForm';
import { TravelInfoForm } from './TravelInfoForm';
import { PaymentMethods } from './PaymentMethods';
import { BookingSummary } from './BookingSummary';
import { getStandardPricingTiers } from '@/utils/pricing'; // add near other imports

interface ContactFormData {
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
  const [currentStep, setCurrentStep] = useState(1);
  // quick inquiry action (used by BookingSummary)
  const handleQuickInquiry = () => {
    // Switch the flow into inquiry mode and show the inquiry step so the InquiryForm
    // (and the sendInquiry path) will include the current package/tour details.
    setBookingMode('inquiry');
    setCurrentStep(2);
    // Scroll to top/step so the user sees the inquiry form
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };
  
  const urlNumberOfPeople = parseInt(searchParams.get('people') || '1');
  const urlPricePerPerson = parseFloat(searchParams.get('pricePerPerson') || '0');
  const urlTotalPrice = parseFloat(searchParams.get('totalPrice') || '0');
  const customizationsParam = searchParams.get('customizations');

  const [numberOfPeople, setNumberOfPeople] = useState(urlNumberOfPeople);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [treePlantingSelected, setTreePlantingSelected] = useState(false);
  const [treePlantingAmount, setTreePlantingAmount] = useState(5);
  
  // Parse customizations from URL
  const selectedCustomizations = customizationsParam 
    ? JSON.parse(customizationsParam) 
    : {};
  
  const tour = tours.find(t => t.slug === tourSlug);
  
  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Tour Not Found</h1>
          <p className="mb-8 text-gray-600">Sorry, the tour you're looking for doesn't exist.</p>
          <Button asChild className="bg-safari-green hover:bg-safari-green/90">
            <Link to="/tours">Browse All Tours</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Validate and sync data from URL with tour data
  useEffect(() => {
    // Recalculate to ensure consistency
    const calculatedTotal = calculateTotalPrice();
    if (Math.abs(calculatedTotal - urlTotalPrice) > 0.01) {
      console.warn('Price mismatch detected, using calculated values');
    }
  }, [numberOfPeople, selectedCustomizations]);

  const getPricingTiers = () => {
    if (tour.pricingTiers) {
      return tour.pricingTiers;
    }
    
    // Use the shared standardized pricing tiers as a fallback
    return getStandardPricingTiers(tour.price);
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
    
    let total = pricePerPersonCalc * numberOfPeople;
    
    if (treePlantingSelected) {
      total += treePlantingAmount; // Add custom amount for tree planting
    }
    
    return total;
  };

  const calculatePaymentAmounts = () => {
    const totalPrice = calculateTotalPrice();
    const depositAmount = totalPrice * 0.4; // Changed from 0.2 to 0.4
    const remainingBalance = totalPrice - depositAmount;
    
    return {
      totalPrice,
      depositAmount,
      remainingBalance
    };
  };

  // Function to send inquiry via Formspree — accepts a full payload object
  const sendInquiry = async (payload: Record<string, any>) => {
    try {
      // enrich payload with consistent metadata
      const inquiryData = {
        ...payload,
        tourName: tour.name,
        tourSlug: tour.slug,
        numberOfTravelers: numberOfPeople,
        estimatedTotalPrice: calculateTotalPrice(),
        pricePerPerson: getCurrentPricePerPerson(),
        selectedCustomizations: JSON.stringify(selectedCustomizations),
        tourDuration: tour.duration,
        submissionType: 'Tour Inquiry',
        submissionDate: new Date().toISOString(),
        _subject: `New Tour Inquiry: ${tour.name} - ${payload.firstName || ''} ${payload.lastName || ''}`
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

  // New: send FormData to Formspree (multipart/form-data) so Formspree sends an email like Contact form
  const sendInquiryFormData = async (fd: FormData) => {
    try {
      // Ensure metadata for inbox clarity
      const first = (fd.get('firstName') as string) || '';
      const last = (fd.get('lastName') as string) || '';
      fd.append('_subject', `New Tour Inquiry: ${tour.name} - ${first} ${last}`);
      fd.append('tourName', tour.name);
      fd.append('tourSlug', tour.slug);
      fd.append('numberOfTravelers', String(numberOfPeople));
      fd.append('estimatedTotalPrice', String(calculateTotalPrice()));
      fd.append('pricePerPerson', String(getCurrentPricePerPerson()));
      fd.append('selectedCustomizations', JSON.stringify(selectedCustomizations || {}));

      const resp = await fetch('https://formspree.io/f/xpwjoknq', {
        method: 'POST',
        body: fd,
        headers: {
          Accept: 'application/json' // do not set Content-Type; browser will set multipart boundary
        }
      });

      if (!resp.ok) throw new Error('Failed to send inquiry via Formspree');
      return true;
    } catch (err) {
      console.error('sendInquiryFormData error', err);
      throw err;
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
          <span className="font-semibold">Pay 40% Deposit Now</span> {/* Changed from 20% */}
          <span className="text-sm text-muted-foreground">
            Secure your booking with ${calculatePaymentAmounts().depositAmount.toLocaleString()} deposit
          </span>
          <span className="text-xs text-blue-600 mt-1">
            Remaining ${calculatePaymentAmounts().remainingBalance.toLocaleString()} due 30 days before departure
          </span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-green-300 cursor-pointer">
        <RadioGroupItem value="full" id="full" />
        <Label htmlFor="full" className="flex flex-col cursor-pointer w-full">
          <span className="font-semibold">Pay in Full Now</span>
          <span className="text-sm text-muted-foreground">
            Complete payment of ${calculatePaymentAmounts().totalPrice.toLocaleString()} today
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
              ? `Your booking will be confirmed once the $${calculatePaymentAmounts().depositAmount.toLocaleString()} deposit is received.`
              : 'Your booking will be fully confirmed upon complete payment.'
            }
          </p>
        </div>
      </div>
    </div>
  </div>
);

  const steps = bookingMode === 'book' 
    ? [
        { id: 1, name: 'Contact Info', completed: false },
        { id: 2, name: 'Travel Details', completed: false },
        { id: 3, name: 'Payment', completed: false }
      ]
    : [
        { id: 1, name: 'Contact Info', completed: false },
        { id: 2, name: 'Inquiry Details', completed: false }
      ];

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  // Handle travelers change
  const handleTravelersChange = (value: string) => {
    const newNumberOfPeople = parseInt(value);
    setNumberOfPeople(newNumberOfPeople);
  };

  // Simple helper to call Flutterwave (if the site loads their widget) or simulate it for local/dev.
  const initiateFlutterwave = async (amount: number, currency = 'USD') => {
    // amount => numeric (total to charge)
    const txRef = `DTFW-${Date.now()}`;
    // If Flutterwave inline is available, use it (this is optional / progressive)
    const win = window as any;
    if (win && typeof win.getpaidSetup === 'function') {
      return new Promise((resolve, reject) => {
        try {
          win.getpaidSetup({
            PBFPubKey: process.env.REACT_APP_FLUTTERWAVE_PK || '',
            amount,
            currency,
            txref: txRef,
            onclose: () => reject(new Error('payment-closed')),
            callback: (resp: any) => {
              // the real widget returns a response we should verify on server-side
              resolve(resp);
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    }

    // Fallback: simulate a payment flow (useful for local dev / tests)
    await new Promise((r) => setTimeout(r, 1500)); // simulate user interaction
    return {
      status: 'successful',
      tx_ref: txRef,
      amount
    };
  };

  // Mocked notification sender — replace /api/sendBookingNotifications with your server endpoint
  const sendConfirmationNotifications = async (bookingPayload: any) => {
    try {
      // Best practice: send notifications from your server (do not rely on client-side only)
      await fetch('/api/sendBookingNotifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
    } catch (err) {
      // fail silently for now; log for debugging
      console.warn('Failed to trigger server-side notifications (this is a placeholder):', err);
    }
  };

  // Collect form values from the checkout form container (captures inputs even if nested forms exist)
  const collectFormData = (): FormData => {
    const fd = new FormData();
    const container = document.getElementById('checkout-form');
    if (!container) return fd;

    const controls = container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input[name], select[name], textarea[name]');
    controls.forEach((el) => {
      const name = el.getAttribute('name');
      if (!name) return;
      const type = (el as HTMLInputElement).type;

      if (type === 'checkbox') {
        const input = el as HTMLInputElement;
        if (input.checked) fd.append(name, input.value || 'on');
      } else if (type === 'radio') {
        const input = el as HTMLInputElement;
        if (input.checked) fd.append(name, input.value);
      } else {
        fd.append(name, (el as any).value ?? '');
      }
    });

    return fd;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors: {[key: string]: string} = {};
    
    // Common validation for both modes
    // collect form data from the checkout-form container (works even if InquiryForm renders nested form)
    const formData = collectFormData();

    const firstName = formData.get('firstName') as string || '';
    const lastName = formData.get('lastName') as string || '';
    const email = formData.get('email') as string || '';
    const phone = formData.get('phone') as string || '';
    
    if (!firstName.trim()) errors.firstName = "First name is required";
    if (!lastName.trim()) errors.lastName = "Last name is required";
    if (!email.trim() || !email.includes('@')) errors.email = "Valid email is required";
    if (!phone.trim()) errors.phone = "Phone number is required";
    
    if (bookingMode === 'book') {
      // Additional validation for booking
      if (paymentMethod === 'card') {
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
      
      if (paymentMethod === 'crypto' && !blueWalletConnected) {
        errors.crypto = "Please connect your Blue Wallet to proceed with crypto payment";
      }
    } else {
      // Validation for inquiry
      const travelDate = formData.get('travelDate') as string || '';
      if (!travelDate) errors.travelDate = "Preferred travel date is required";
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsProcessing(true);

    try {
      const userData: ContactFormData = {
        firstName,
        lastName,
        email,
        phone,
        travelers: formData.get('travelers') as string,
        travelDate: formData.get('travelDate') as string,
        specialRequests: formData.get('specialRequests') as string || ''
      };
      
      if (bookingMode === 'inquiry') {
        // We already collected all inputs into `formData` via collectFormData().
        // Send FormData (multipart) to Formspree so you receive a normal email notification.
        await sendInquiryFormData(formData);
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
        // Booking path
        // Calculate totals (use currency consistent with your tour data)
        const total = calculateTotalPrice();

        // If paying by card, integrate with Flutterwave (or simulation)
        if (paymentMethod === 'card') {
          // If user chose "full" payment, charge total; for deposit charge deposit amount
          const amountToCharge = paymentType === 'deposit' ? calculatePaymentAmounts().depositAmount : calculatePaymentAmounts().totalPrice;

          // Initiate payment (real widget if present or simulated)
          const fwResp: any = await initiateFlutterwave(amountToCharge, 'USD');

          // Basic success check (in production verify on server with Flutterwave's webhook)
          const successful = fwResp && (fwResp.status === 'successful' || fwResp.status === 'success' || fwResp.tx_ref);
          if (!successful) {
            throw new Error('Payment failed or cancelled');
          }

          // Build booking payload with the confirmed paid amount
          const bookingData = {
            userData,
            tour,
            numberOfPeople,
            pricePerPerson: getCurrentPricePerPerson(),
            totalPrice: calculateTotalPrice(),
            selectedCustomizations,
            paymentMethod: 'card',
            paymentType,
            paymentAmount: amountToCharge,
            paidAmount: amountToCharge,
            depositPercent: paymentType === 'deposit' ? (calculatePaymentAmounts().depositAmount / calculatePaymentAmounts().totalPrice) : 1,
            paymentReference: fwResp.tx_ref || fwResp.txRef || null
          };

          // Trigger server-side notifications (placeholder endpoint)
          sendConfirmationNotifications(bookingData).catch(() => { /* noop */ });

          setFormSubmitted(true);
          setTimeout(() => {
            navigate('/booking-confirmation', {
              state: bookingData
            });
          }, 1000);

        } else {
          // Existing flow for other payment methods (simulate)
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
            paidAmount: paymentType === 'deposit' ? calculatePaymentAmounts().depositAmount : calculatePaymentAmounts().totalPrice
          };

          // optional: server notifications
          sendConfirmationNotifications(bookingData).catch(() => { /* noop */ });

          setFormSubmitted(true);
          setTimeout(() => {
            navigate('/booking-confirmation', {
              state: bookingData
            });
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormErrors({ submit: 'Failed to submit. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={`/tours/${tour.slug}`} className="flex items-center text-safari-green hover:text-safari-green/80 transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Tour Details
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">{tour.name}</h1>
              <p className="text-sm text-gray-600">{tour.duration} days • {tour.location}</p>
            </div>
            <div className="w-24"></div> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-safari-green border-safari-green text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {step.id}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-safari-green' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight size={16} className="ml-4 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Mode Toggle */}
        <div className="mb-8 text-center">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={bookingMode === 'book' ? 'default' : 'ghost'}
              onClick={() => {
                setBookingMode('book');
                setCurrentStep(1);
              }}
              className={`px-6 py-2 rounded-md transition-all ${
                bookingMode === 'book' 
                  ? 'bg-safari-green text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CreditCard size={18} className="mr-2" />
              Book Now
            </Button>
            <Button
              variant={bookingMode === 'inquiry' ? 'default' : 'ghost'}
              onClick={() => {
                setBookingMode('inquiry');
                setCurrentStep(1);
              }}
              className={`px-6 py-2 rounded-md transition-all ${
                bookingMode === 'inquiry' 
                  ? 'bg-safari-green text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle size={18} className="mr-2" />
              Make Inquiry
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {bookingMode === 'book' 
              ? `Complete your booking for ${numberOfPeople} ${numberOfPeople === 1 ? 'person' : 'people'}`
              : `Get a custom quote or ask questions about ${tour.name}`
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-3 text-green-800">Payment Successful!</h2>
                <p className="mb-2 text-green-700">Your booking for {tour.name} has been confirmed.</p>
                {paymentMethod === 'crypto' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      Cryptocurrency payment received: {cryptoAmount} {selectedCrypto.toUpperCase()}
                    </p>
                  </div>
                )}
                <p className="mt-4 text-sm text-gray-600">Redirecting to your booking confirmation...</p>
              </div>
            ) : inquirySubmitted ? (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-3 text-blue-800">Inquiry Submitted!</h2>
                <p className="mb-2 text-blue-700">Thank you for your interest in {tour.name}.</p>
                <p className="mb-2 text-blue-700">Your inquiry has been sent to our team at safaris.dirttrails@gmail.com</p>
                <p className="text-sm text-gray-600">We'll respond within 24 hours with a personalized quote and detailed information.</p>
              </div>
            ) : (
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Error Display */}
                {formErrors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertCircle size={18} className="text-red-600 mr-2" />
                      <span className="text-red-800">{formErrors.submit}</span>
                    </div>
                  </div>
                )}

                {/* Step 1: Contact Info */}
                {currentStep === 1 && (
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Contact Information</h2>
                    <ContactInfoForm />
                    <div className="mt-6 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={() => setCurrentStep(2)}
                        className="bg-safari-green hover:bg-safari-green/90"
                      >
                        Next: {bookingMode === 'book' ? 'Travel Details' : 'Inquiry Details'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Travel Details or Inquiry Details */}
                {currentStep === 2 && (
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">
                      {bookingMode === 'book' ? 'Travel Details' : 'Inquiry Details'}
                    </h2>
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
                    <div className="mt-6 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                      >
                        Back
                      </Button>
                      {bookingMode === 'book' ? (
                        <Button 
                          type="button" 
                          onClick={() => setCurrentStep(3)}
                          className="bg-safari-green hover:bg-safari-green/90"
                        >
                          Next: Payment
                        </Button>
                      ) : (
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="bg-safari-green hover:bg-safari-green/90 flex items-center gap-2" 
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Processing...
                            </>
                          ) : "Submit Travel Proposal"}
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Payment - Only for booking */}
                {currentStep === 3 && bookingMode === 'book' && (
                  <div className="space-y-6">
                    {/* Payment Type Selection */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                      <h2 className="text-xl font-semibold mb-4 text-gray-900">Payment Options</h2>
                      <PaymentTypeSelector 
                        paymentType={paymentType}
                        setPaymentType={setPaymentType}
                        calculatePaymentAmounts={calculatePaymentAmounts}
                      />
                    </div>
                    
                    {/* Payment Methods */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                      <h2 className="text-xl font-semibold mb-4 text-gray-900">Payment Method</h2>
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
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep(2)}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="bg-safari-green hover:bg-safari-green/90 flex items-center gap-2" 
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : paymentMethod === 'crypto'
                          ? `Pay ${paymentType === 'deposit' ? 'Deposit' : 'Full Amount'} with Crypto`
                          : paymentType === 'deposit'
                            ? `Pay Deposit $${calculatePaymentAmounts().depositAmount.toLocaleString()}`
                            : `Pay Full Amount $${calculatePaymentAmounts().totalPrice.toLocaleString()}`
                        }
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
          
          {/* Booking Summary - Always visible */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
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
                treePlantingSelected={treePlantingSelected}
                treePlantingAmount={treePlantingAmount}
                onTreePlantingChange={setTreePlantingSelected}
                onTreePlantingAmountChange={setTreePlantingAmount}
                onQuickInquiry={handleQuickInquiry}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

