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
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-fit sticky top-8">
      <h2 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">Booking Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="font-medium text-gray-700">Tour:</span>
          <span className="font-semibold text-gray-900">{tour.name}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="font-medium text-gray-700">Travelers:</span>
          <span className="text-gray-900">{numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="font-medium text-gray-700">Price per person:</span>
          <span className="font-semibold text-gray-900">${getCurrentPricePerPerson().toLocaleString()}</span>
        </div>
        
        {validCustomizations.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <p className="font-semibold mb-3 text-gray-900">Customizations:</p>
            <div className="space-y-2">
              {validCustomizations.map(([key, value]: [string, any]) => (
                <div key={key} className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-700">{value.name}:</span>
                  <span className="text-sm font-medium text-gray-900">+${value.priceAdjustment.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {tourDiscount && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100 text-green-600">
            <span className="font-medium">Discount:</span>
            <span className="font-semibold">-{tourDiscount}%</span>
          </div>
        )}
        
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4">
            <span className="font-bold text-lg text-gray-900">Total Price:</span>
            <span className="font-bold text-xl text-gray-900">${totalPrice.toLocaleString()}</span>
          </div>
        </div>
        
        {bookingMode === 'book' && paymentAmounts && (
          <>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold mb-3 text-gray-900">Payment Details:</h3>
              <div className="space-y-3">
                {paymentType === 'deposit' ? (
                  <>
                    <div className="flex justify-between items-center py-2 bg-blue-50 rounded px-3">
                      <span className="font-medium text-blue-800">Deposit (20%):</span>
                      <span className="font-semibold text-blue-900">${paymentAmounts.depositAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-sm text-gray-600">
                      <span>Remaining balance:</span>
                      <span className="font-medium">${paymentAmounts.remainingBalance.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center py-2 bg-green-50 rounded px-3">
                    <span className="font-medium text-green-800">Full payment:</span>
                    <span className="font-semibold text-green-900">${paymentAmounts.totalPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
            
            {paymentMethod === 'crypto' && cryptoAmount && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-3 text-gray-900">Crypto Payment:</h3>
                <div className="flex justify-between items-center py-2 bg-purple-50 rounded px-3">
                  <span className="font-medium text-purple-800">Amount:</span>
                  <span className="font-semibold text-purple-900">{cryptoAmount} {selectedCrypto?.toUpperCase()}</span>
                </div>
              </div>
            )}
          </>
        )}
        
        {bookingMode === 'inquiry' && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
            <p className="text-sm text-blue-800 font-medium">
              This is an inquiry. No payment will be processed until you confirm the booking.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};