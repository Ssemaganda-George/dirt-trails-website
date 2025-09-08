import React from 'react';
import { Tour } from '@/data/tours'; 

interface BookingSummaryProps {
  bookingMode: 'book' | 'inquiry';
  tour: Tour;
  numberOfPeople: number;
  getCurrentPricePerPerson: () => number;
  getCurrentTierLabel: () => string;
  selectedCustomizations: any;
  tourDiscount?: number;
  calculateTotalPrice: () => number;
  paymentType?: 'deposit' | 'full';
  calculatePaymentAmounts?: () => { totalPrice: number; depositAmount: number; remainingBalance: number };
  paymentMethod?: string;
  cryptoAmount?: string;
  selectedCrypto?: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookingMode,
  tour,
  numberOfPeople,
  getCurrentPricePerPerson,
  getCurrentTierLabel,
  selectedCustomizations,
  tourDiscount,
  calculateTotalPrice,
  paymentType,
  calculatePaymentAmounts,
  paymentMethod,
  cryptoAmount,
  selectedCrypto
}) => {
  const totalPrice = calculateTotalPrice();
  const paymentAmounts = calculatePaymentAmounts?.();
  
  // Filter out null/undefined values from selectedCustomizations
  const validCustomizations = Object.entries(selectedCustomizations).filter(([key, value]) => value != null);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-8">
      <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Tour:</span>
          <span className="font-medium">{tour.name}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Travelers:</span>
          <span>{numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Price per person:</span>
          <span>UGx {getCurrentPricePerPerson().toLocaleString()}</span>
        </div>
        
        {validCustomizations.length > 0 && (
          <div className="border-t pt-2">
            <p className="font-medium mb-2">Customizations:</p>
            {validCustomizations.map(([key, value]: [string, any]) => (
              <div key={key} className="flex justify-between text-sm">
                <span>{value.name}:</span>
                <span>+UGx {value.priceAdjustment.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
        
        {tourDiscount && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-{tourDiscount}%</span>
          </div>
        )}
        
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Price:</span>
            <span>UGx {totalPrice.toLocaleString()}</span>
          </div>
        </div>
        
        {bookingMode === 'book' && paymentAmounts && (
          <>
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Payment Details:</h3>
              {paymentType === 'deposit' ? (
                <>
                  <div className="flex justify-between">
                    <span>Deposit (20%):</span>
                    <span>UGx {paymentAmounts.depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Remaining balance:</span>
                    <span>UGx {paymentAmounts.remainingBalance.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  <span>Full payment:</span>
                  <span>UGx {paymentAmounts.totalPrice.toLocaleString()}</span>
                </div>
              )}
            </div>
            
            {paymentMethod === 'crypto' && cryptoAmount && (
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Crypto Payment:</h3>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>{cryptoAmount} {selectedCrypto?.toUpperCase()}</span>
                </div>
              </div>
            )}
          </>
        )}
        
        {bookingMode === 'inquiry' && (
          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
            <p>This is an inquiry. No payment will be processed until you confirm the booking.</p>
          </div>
        )}
      </div>
    </div>
  );
};