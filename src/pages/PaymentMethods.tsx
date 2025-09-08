import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Check, Copy, CreditCard, ExternalLink, QrCode, RefreshCw, Wallet } from 'lucide-react';

interface PaymentMethodsProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  formErrors: { [key: string]: string };
  blueWalletConnected: boolean;
  isConnectingWallet: boolean;
  connectBlueWallet: () => void;
  selectedCrypto: string;
  setSelectedCrypto: (crypto: string) => void;
  cryptoAmount: string;
  cryptoPaymentAddress: string;
  paymentQRCode: string;
  disconnectWallet: () => void;
  copyToClipboard: (text: string) => void;
  openInBlueWallet: () => void;
  paymentType: 'deposit' | 'full';
  calculatePaymentAmounts: () => { totalPrice: number; depositAmount: number; remainingBalance: number };
}

export const PaymentMethods = ({
  paymentMethod,
  setPaymentMethod,
  formErrors,
  blueWalletConnected,
  isConnectingWallet,
  connectBlueWallet,
  selectedCrypto,
  setSelectedCrypto,
  cryptoAmount,
  cryptoPaymentAddress,
  paymentQRCode,
  disconnectWallet,
  copyToClipboard,
  openInBlueWallet,
  paymentType,
  calculatePaymentAmounts
}: PaymentMethodsProps) => {
  const renderPaymentMethodFields = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardName" className="block mb-2 font-medium">Name on Card</Label>
              <Input id="cardName" name="cardName" required />
            </div>
            
            <div>
              <Label htmlFor="cardNumber" className="block mb-2 font-medium">Card Number</Label>
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
                <Label htmlFor="expiry" className="block mb-2 font-medium">Expiry Date</Label>
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
                <Label htmlFor="cvv" className="block mb-2 font-medium">CVV</Label>
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
              <Label className="block mb-2 font-medium">Select Cryptocurrency</Label>
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
      
      // ... other payment methods
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      
      <RadioGroup 
        value={paymentMethod} 
        onValueChange={setPaymentMethod}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-green-300 cursor-pointer">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center cursor-pointer w-full">
            <CreditCard size={20} className="mr-2" />
            Credit/Debit Card
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-green-300 cursor-pointer">
          <RadioGroupItem value="crypto" id="crypto" />
          <Label htmlFor="crypto" className="flex items-center cursor-pointer w-full">
            <Wallet size={20} className="mr-2" />
            Cryptocurrency
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-green-300 cursor-pointer">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
        </div>
        
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-green-300 cursor-pointer">
          <RadioGroupItem value="bank_transfer" id="bank_transfer" />
          <Label htmlFor="bank_transfer" className="cursor-pointer">Bank Transfer</Label>
        </div>
        
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-green-300 cursor-pointer">
          <RadioGroupItem value="mobile_money" id="mobile_money" />
          <Label htmlFor="mobile_money" className="cursor-pointer">Mobile Money</Label>
        </div>
      </RadioGroup>
      
      {renderPaymentMethodFields()}
    </div>
  );
};