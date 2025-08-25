import { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  CreditCard, Check, AlertCircle, ArrowLeft, 
  MessageCircle, Smartphone, Building2, Calendar,
  DollarSign, Bitcoin, Globe, Users, HelpCircle,
  Clock, MapPin, Copy, ExternalLink, Wallet,
  QrCode, RefreshCw
} from 'lucide-react';
import { tours } from '@/data/tours'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { CustomizationOption } from '@/data/tours';

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [bookingMode, setBookingMode] = useState<'book' | 'inquiry'>('book');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  
  // Get booking parameters from URL - but allow for dynamic updates
  const urlNumberOfPeople = parseInt(searchParams.get('people') || '1');
  const urlPricePerPerson = parseFloat(searchParams.get('pricePerPerson') || '0');
  const urlTotalPrice = parseFloat(searchParams.get('totalPrice') || '0');
  const customizationsParam = searchParams.get('customizations');

  // State for dynamic number of people (can be different from URL)
  const [numberOfPeople, setNumberOfPeople] = useState(urlNumberOfPeople);
  
  // Parse customizations from URL
  const selectedCustomizations = customizationsParam 
    ? JSON.parse(customizationsParam) 
    : {};
  
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
  // Dynamic pricing structure - same as tour detail page
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
    bitcoin: 0.000023, // Example rate: 1 UGX = 0.000023 BTC
    ethereum: 0.00035, // Example rate: 1 UGX = 0.00035 ETH
    lightning: 0.000023 // Lightning Network BTC
  });

  // Mock Blue Wallet API integration
  const connectBlueWallet = async () => {
    setIsConnectingWallet(true);
    
    try {
      // In real implementation, this would connect to Blue Wallet API
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
      
      // Generate QR code URL (in real app, use actual QR code library)
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
    // You might want to show a toast notification here
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

  // Calculate total price including customizations - now uses current numberOfPeople
  const calculateTotalPrice = () => {
    let pricePerPersonCalc = getCurrentPricePerPerson();
    
    // Add customization prices per person
    Object.values(selectedCustomizations).forEach((option: any) => {
      if (option) {
        pricePerPersonCalc += option.priceAdjustment;
      }
    });
    
    // Apply discount if available
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

  const PaymentTypeSelector = () => (
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

  const handleSubmit = (e: FormEvent) => {
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
    
    setTimeout(() => {
      setIsProcessing(false);
      
      const bookingData = {
        userData,
        tour,
        numberOfPeople,
        pricePerPerson: getCurrentPricePerPerson(),
        totalPrice: calculateTotalPrice(),
        selectedCustomizations,
        paymentMethod: bookingMode === 'book' ? paymentMethod : undefined,
        paymentType: bookingMode === 'book' ? paymentType : undefined,
        paymentAmount: bookingMode === 'book' ? 
          (paymentType === 'deposit' ? calculatePaymentAmounts().depositAmount : calculatePaymentAmounts().totalPrice) 
          : undefined,
        cryptoDetails: paymentMethod === 'crypto' ? {
          currency: selectedCrypto,
          amount: cryptoAmount,
          address: cryptoPaymentAddress,
          walletType: 'BlueWallet'
        } : undefined
      };
      
      if (bookingMode === 'inquiry') {
        setInquirySubmitted(true);
        setTimeout(() => {
          navigate('/inquiry-confirmation', {
            state: bookingData
          });
        }, 2000);
      } else {
        setFormSubmitted(true);
        setTimeout(() => {
          navigate('/booking-confirmation', {
            state: bookingData
          });
        }, 2000);
      }
    }, 2000);
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
      
      case 'crypto':
        return (
          <div className="space-y-6">
            {/* Cryptocurrency Selection */}
            <div>
              <label className="block mb-2 font-medium">Select Cryptocurrency</label>
              <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                  <SelectItem value="lightning">Lightning Network (BTC)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Blue Wallet Connection */}
            <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wallet className="text-blue-600" size={20} />
                  <span className="font-medium">Blue Wallet Integration</span>
                </div>
                {blueWalletConnected && (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <Check size={16} />
                    Connected
                  </span>
                )}
              </div>

              {!blueWalletConnected ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Connect your Blue Wallet to make secure cryptocurrency payments
                  </p>
                  <Button 
                    type="button"
                    onClick={connectBlueWallet}
                    disabled={isConnectingWallet}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isConnectingWallet ? (
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Wallet size={16} className="mr-2" />
                    )}
                    {isConnectingWallet ? 'Connecting...' : 'Connect Blue Wallet'}
                  </Button>
                  
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-1">• Secure connection via Blue Wallet API</p>
                    <p className="mb-1">• Support for Bitcoin, Lightning & Ethereum</p>
                    <p>• No private keys shared</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Payment Details */}
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <QrCode size={16} />
                      Payment Details
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Payment Info */}
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Amount:</span>
                            <p className="font-mono text-lg">{cryptoAmount} {selectedCrypto.toUpperCase()}</p>
                          </div>
                          
                          <div className="text-sm">
                            <span className="font-medium">Address:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs break-all">
                                {cryptoPaymentAddress}
                              </code>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(cryptoPaymentAddress)}
                                className="p-1 h-auto"
                              >
                                <Copy size={14} />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            UGX {paymentType === 'deposit' 
                              ? calculatePaymentAmounts().depositAmount.toLocaleString() 
                              : calculatePaymentAmounts().totalPrice.toLocaleString()
                            } ≈ {cryptoAmount} {selectedCrypto.toUpperCase()}
                          </div>
                        </div>
                        
                        {/* QR Code */}
                        <div className="flex flex-col items-center">
                          <img 
                            src={paymentQRCode} 
                            alt="Payment QR Code" 
                            className="w-32 h-32 border rounded-lg"
                          />
                          <p className="text-xs text-center text-muted-foreground mt-2">
                            Scan with Blue Wallet
                          </p>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          type="button"
                          onClick={openInBlueWallet}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Open in Blue Wallet
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={disconnectWallet}
                          size="sm"
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Instructions */}
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <h5 className="font-medium text-amber-800 mb-2">Payment Instructions:</h5>
                    <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
                      <li>Click "Open in Blue Wallet" or scan the QR code</li>
                      <li>Verify the amount and address in Blue Wallet</li>
                      <li>Confirm the transaction</li>
                      <li>Wait for blockchain confirmation</li>
                      <li>You'll receive booking confirmation via email</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {formErrors.crypto && (
              <p className="text-red-500 text-sm">{formErrors.crypto}</p>
            )}
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
                      <Select 
                        name="travelers" 
                        value={numberOfPeople.toString()} 
                        onValueChange={handleTravelersChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3">3 People</SelectItem>
                          <SelectItem value="4">4 People</SelectItem>
                          <SelectItem value="5">5 People</SelectItem>
                          <SelectItem value="6">6 People</SelectItem>
                          <SelectItem value="7">7 People</SelectItem>
                          <SelectItem value="8">8 People</SelectItem>
                          <SelectItem value="9">9 People</SelectItem>
                          <SelectItem value="10">10+ People</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {/* Show selected number prominently with updated pricing */}
                      <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm font-medium text-green-800">
                          Selected: {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}
                        </p>
                        <p className="text-xs text-green-600">
                          Rate: UGx {getCurrentPricePerPerson().toLocaleString()} per person ({getCurrentTierLabel()})
                        </p>
                        <p className="text-xs font-semibold text-green-700 mt-1">
                          Subtotal: UGx {(getCurrentPricePerPerson() * numberOfPeople).toLocaleString()}
                        </p>
                      </div>
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
                          className="w-full border-border rounded-md p-3 border"
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
                          className="w-full border-border rounded-md p-3 border"
                          placeholder="Share any special requests, dietary needs, accessibility requirements, or preferences to help us personalize your experience..."
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Payment Type Selection - Only show for booking */}
                {bookingMode === 'book' && (
                  <PaymentTypeSelector />
                )}
                
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
                        
                        <div className="flex items-center space-x-2 p-3 border rounded-lg bg-gradient-to-r from-orange-50 to-blue-50">
                          <RadioGroupItem value="crypto" id="crypto" />
                          <Label htmlFor="crypto" className="flex items-center gap-2 cursor-pointer">
                            <Bitcoin size={20} />
                            <div className="flex flex-col">
                              <span>Cryptocurrency</span>
                              <span className="text-xs text-blue-600">via Blue Wallet</span>
                            </div>
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
          
          {/* Order Summary - Updated to show payment amounts */}
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
                  <p className="text-sm text-green-600 font-medium">
                    {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}
                  </p>
                </div>
              </div>
              
              {bookingMode === 'book' && (
                <>
                  <div className="py-4 border-b border-border">
                    <div className="flex justify-between mb-2">
                      <span>Base price ({getCurrentTierLabel()}):</span>
                      <span>UGx {(getCurrentPricePerPerson() * numberOfPeople).toLocaleString()}</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      UGx {getCurrentPricePerPerson().toLocaleString()} × {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}
                    </div>
                    
                    {/* Show customizations if any */}
                    {Object.entries(selectedCustomizations).map(([category, option]: [string, any]) => {
                      if (!option) return null;
                      const totalAdjustment = option.priceAdjustment * numberOfPeople;
                      return (
                        <div key={category} className="flex justify-between mb-2 text-sm">
                          <span>{option.name} ({numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}):</span>
                          <span className="text-orange-600">+UGx {totalAdjustment.toLocaleString()}</span>
                        </div>
                      );
                    })}
                    
                    {tour.discount && (
                      <div className="flex justify-between mb-2 text-orange-600">
                        <span>Discount ({tour.discount}%):</span>
                        <span>-UGx {((getCurrentPricePerPerson() * numberOfPeople) * tour.discount / 100).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg pt-4 mb-4">
                    <span>Total:</span>
                    <span>UGx {calculateTotalPrice().toLocaleString()}</span>
                  </div>
                  
                  {/* Payment Amount Summary */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-sm mb-3">Payment Summary</h4>
                    {paymentType === 'deposit' ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Due Today (20% Deposit):</span>
                          <span className="font-bold text-green-700">UGx {calculatePaymentAmounts().depositAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Balance Due Later:</span>
                          <span>UGx {calculatePaymentAmounts().remainingBalance.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-blue-600 mt-2">
                          Remaining balance due 30 days before departure
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Due Today (Full Payment):</span>
                          <span className="font-bold text-green-700">UGx {calculatePaymentAmounts().totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-green-600 mt-2">
                          Complete payment - booking fully confirmed
                        </div>
                      </div>
                    )}
                    
                    {/* Show crypto conversion if crypto payment selected */}
                    {paymentMethod === 'crypto' && cryptoAmount && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <div className="flex justify-between text-sm">
                          <span>Crypto Amount:</span>
                          <span className="font-mono text-blue-700">
                            {cryptoAmount} {selectedCrypto.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Rate updated in real-time via Blue Wallet
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {bookingMode === 'inquiry' && (
                <div className="py-4">
                  <div className="flex justify-between mb-2">
                    <span>Starting from:</span>
                    <span className="font-semibold">UGx {tour.price.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    For {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}
                  </div>
                  <div className="text-sm font-medium text-green-600 mb-2">
                    Estimated total: UGx {calculateTotalPrice().toLocaleString()}
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
                      <span>
                        {paymentType === 'deposit' 
                          ? 'Pay 20% deposit now, balance due 30 days before departure'
                          : 'Full payment secures your booking immediately'
                        }
                      </span>
                    </div>
                    <div className="flex items-start mb-2">
                      <Check size={16} className="mr-2 shrink-0 mt-0.5" />
                      <span>Free cancellation up to 30 days before your trip.</span>
                    </div>
                    {paymentMethod === 'crypto' && (
                      <div className="flex items-start">
                        <Bitcoin size={16} className="mr-2 shrink-0 mt-0.5" />
                        <span>Cryptocurrency payments via Blue Wallet are secure and instant.</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-start mb-2">
                      <MessageCircle size={16} className="mr-2 shrink-0 mt-0.5" />
                      <span>Get a personalized quote within 24 hours.</span>
                    </div>
                    <div className="flex items-start">
                      <Clock size={16} className="mr-2 shrink-0 mt-0.5" />
                      <span>No payment required for inquiries.</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Contact Information */}
              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MessageCircle size={16} className="mr-2" />
                    <span>WhatsApp: +256 700 000 000</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span>Kampala, Uganda</span>
                  </div>
                  {paymentMethod === 'crypto' && (
                    <div className="flex items-center">
                      <Wallet size={16} className="mr-2" />
                      <span>Crypto support available 24/7</span>
                    </div>
                  )}
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