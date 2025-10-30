import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Check, Copy, CreditCard, ExternalLink, QrCode, RefreshCw, Wallet } from 'lucide-react';
import { useState } from 'react';

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
  // local state for terms checkbox and refund policy toggle
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);
  
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
      
      <div className="mb-6">
        <Label className="block mb-2 font-medium">Payment Method</Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="card">Credit/Debit Card</SelectItem>
            <SelectItem value="crypto">Cryptocurrency</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            <SelectItem value="mobile_money">Mobile Money</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Terms & Conditions / Refund Policy */}
      <div className="mb-6">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={() => setAgreedToTerms(prev => !prev)}
            aria-checked={agreedToTerms}
            className="mt-1 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-green-500"
          />
          <div className="text-sm">
            <div>
              I agree to the <button
                type="button"
                onClick={() => setShowRefundPolicy(true)}
                className="text-green-600 underline hover:text-green-700 ml-1"
                aria-expanded={showRefundPolicy}
              >
                Terms &amp; Conditions
              </button> (includes refund policy)
            </div>
            {formErrors.acceptTerms && (
              <p className="text-red-500 text-xs mt-1">{formErrors.acceptTerms}</p>
            )}
          </div>
        </label>

        {showRefundPolicy && (
          <div className="mt-3 p-4 bg-gray-50 border rounded text-sm text-gray-700">
            <div className="flex justify-between items-start">
              <strong className="text-gray-900">Refund Policy</strong>
              <button
                type="button"
                onClick={() => setShowRefundPolicy(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
                aria-label="Close refund policy"
              >
                Close
              </button>
            </div>
            <div className="mt-2 leading-relaxed">
              <p>
                - Full refund available up to 30 days before departure (less any non‑refundable third-party fees). 
              </p>
              <p className="mt-1">
                - 50% refund available between 29 and 14 days before departure. 
              </p>
              <p className="mt-1">
                - No refund within 14 days of departure. 
              </p>
              <p className="mt-2 text-xs text-gray-600">
                For cancellations due to government travel restrictions or force majeure events, special exceptions may apply — please contact support for case-by-case review.
              </p>
            </div>
          </div>
        )}
      </div>

      {renderPaymentMethodFields()}
    </div>
  );
};