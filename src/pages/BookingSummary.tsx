import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tour } from '@/data/tours'; 
import { getDiscountPercentForGroupSize } from '@/utils/pricing'; // added

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
  treePlantingSelected?: boolean;
  treePlantingAmount?: number;
  onTreePlantingChange?: (selected: boolean) => void;
  onTreePlantingAmountChange?: (amount: number) => void;
  // optional quick inquiry callback (invoked when user wants to inquire from the summary)
  onQuickInquiry?: () => void;
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
  selectedCrypto,
  treePlantingSelected = false,
  treePlantingAmount = 5,
  onTreePlantingChange,
  onTreePlantingAmountChange,
  onQuickInquiry
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as any;
  const returnTo = typeof state.returnTo === 'string' ? state.returnTo : undefined;

  const handleBackClick = () => {
    if (returnTo) {
      try {
        navigate(returnTo);
        return;
      } catch {
        // fall back to history/back
      }
    }
    navigate(-1);
  };

  // conversion: UGX -> USD (adjust rate as needed)
  const UGX_PER_USD = 3700; // example rate
  const ugxToUsd = (ugx: number) => Math.round((ugx / UGX_PER_USD) * 100) / 100;

  // guard & typing helper for incoming customizations to avoid `unknown` errors
  const safeSelectedCustomizations = (selectedCustomizations ?? {}) as Record<string, any>;

  // compute per-person discounts based on group size:
  const basePrice = getCurrentPricePerPerson();
  const discountPercent = getDiscountPercentForGroupSize(numberOfPeople);

  // adjusted price per person after group discount (assumed in USD)
  const adjustedPricePerPerson = Math.round((basePrice * (1 - discountPercent)) * 100) / 100;
  
  // subtotal from base price (USD)
  const baseSubtotal = Math.round(adjustedPricePerPerson * Math.max(1, numberOfPeople) * 100) / 100;

  // customization totals: priceAdjustment is UGX per person => convert to USD and multiply by people
  const customizationTotalUgx = Object.values(safeSelectedCustomizations).reduce((sum: number, opt: any) => {
    if (!opt) return sum;
    const adj = Number((opt as any)?.priceAdjustment ?? 0);
    return sum + adj * numberOfPeople;
  }, 0);
  const customizationTotalUsd = ugxToUsd(customizationTotalUgx);

  // tree planting (already in USD)
  const treePlantingTotal = treePlantingSelected ? (treePlantingAmount || 0) : 0;

  // final total includes base subtotal + customizations + donation
  const finalTotal = Math.round((baseSubtotal + customizationTotalUsd + treePlantingTotal) * 100) / 100;

  // payment amounts: prefer provided calculatePaymentAmounts, otherwise fallback (40% deposit) — use finalTotal
  const paymentAmounts = calculatePaymentAmounts?.() ?? (
    paymentType === 'deposit'
      ? {
          totalPrice: finalTotal,
          depositAmount: Math.round(finalTotal * 0.4 * 100) / 100,
          remainingBalance: Math.round(finalTotal * 0.6 * 100) / 100,
        }
      : { totalPrice: finalTotal, depositAmount: 0, remainingBalance: 0 }
  );
  
  // Filter out null/undefined values from selectedCustomizations and cast result for safe use
  const validCustomizations = Object.entries(safeSelectedCustomizations).filter(([key, value]) => value != null) as [string, any][];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-fit sticky top-8">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <h2 className="text-xl font-bold text-gray-900">Booking Summary</h2>
        <button
          type="button"
          onClick={handleBackClick}
          className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1 rounded-md border border-gray-100 bg-gray-50"
          aria-label="Go back to previous page"
        >
          ← Back
        </button>
      </div>
      
      {/* Quick inquiry CTA — sends user to inquiry flow (or triggers quick inquiry) */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => onQuickInquiry?.()}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Inquire about this package
        </button>
      </div>
+
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
          <span className="font-semibold text-gray-900">
            ${adjustedPricePerPerson.toLocaleString()}
            {discountPercent > 0 && (
              <span className="text-xs text-gray-500 ml-2">({Math.round(discountPercent * 100)}% off from ${basePrice.toLocaleString()})</span>
            )}
          </span>
        </div>
        
        {validCustomizations.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <p className="font-semibold mb-3 text-gray-900">Customizations:</p>
            <div className="space-y-2">
              {validCustomizations.map(([key, value]: [string, any]) => {
                const perPersonUgx = Number((value as any)?.priceAdjustment ?? 0);
                const perPersonUsd = ugxToUsd(perPersonUgx);
                return (
                  <div key={key} className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-700">{value.name}:</span>
                    <span className="text-sm font-medium text-gray-900">+${perPersonUsd.toFixed(2)} / person</span>
                  </div>
                );
              })}
             <div className="flex justify-between items-center pt-2 border-t border-gray-100">
               <span className="text-sm text-gray-700 font-medium">Customizations total:</span>
               <span className="text-sm font-semibold text-gray-900">${customizationTotalUsd.toFixed(2)}</span>
             </div>
            </div>
          </div>
        )}
        
        {tourDiscount && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100 text-green-600">
            <span className="font-medium">Discount:</span>
            <span className="font-semibold">-{tourDiscount}%</span>
          </div>
        )}
        
        {/* Tree Planting Option */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between py-2">
            <button
              type="button"
              onClick={() => onTreePlantingChange?.(!treePlantingSelected)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                treePlantingSelected
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {treePlantingSelected ? 'Remove Conservation' : 'Add Conservation'}
            </button>
          </div>
          {treePlantingSelected && (
            <div className="mt-2">
              <label htmlFor="tree-planting-amount" className="text-xs text-gray-500">Donation Amount (min $5):</label>
              <div className="flex items-center mt-1">
                <button
                  type="button"
                  onClick={() => onTreePlantingAmountChange?.(Math.max(5, treePlantingAmount - 1))}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 focus:outline-none"
                >
                  -
                </button>
                <input
                  id="tree-planting-amount"
                  type="number"
                  min="5"
                  value={treePlantingAmount}
                  onChange={(e) => onTreePlantingAmountChange?.(Math.max(5, parseFloat(e.target.value) || 5))}
                  className="block w-full px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-center"
                  style={{ MozAppearance: 'textfield' }}
                />
                <button
                  type="button"
                  onClick={() => onTreePlantingAmountChange?.(treePlantingAmount + 1)}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Help reforest East Africa with every booking (minimum $5).
          </p>
        </div>
        
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4">
            <span className="font-bold text-lg text-gray-900">Total Price:</span>
            <span className="font-bold text-xl text-gray-900">${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                      <span className="font-medium text-blue-800">Deposit (40%):</span> {/* Changed from 20% */}
                      <span className="font-semibold text-blue-900">${paymentAmounts.depositAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-sm text-gray-600">
                      <span>Remaining balance:</span>
                      <span className="font-medium">${paymentAmounts.remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center py-2 bg-green-50 rounded px-3">
                    <span className="font-medium text-green-800">Full payment:</span>
                    <span className="font-semibold text-green-900">${paymentAmounts.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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