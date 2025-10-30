import type { PricingTier } from '@/types/pricing';

/**
 * Standardized site-wide pricing tiers:
 * 1-2 => 0% discount
 * 3-5 => 12% discount
 * 6+  => 20% discount
 */
export const getStandardPricingTiers = (basePrice: number): PricingTier[] => {
  return [
    { min: 1, max: 2, price: basePrice, label: "1-2 people" },
    { min: 3, max: 5, price: Math.round(basePrice * 0.88 * 100) / 100, label: "3-5 people" },
    { min: 6, max: 999, price: Math.round(basePrice * 0.80 * 100) / 100, label: "6+ people" }
  ];
};

/**
 * Returns discount fraction for given group size (e.g. 0.12 for 12%).
 */
export const getDiscountPercentForGroupSize = (people: number): number => {
  if (people >= 6) return 0.20;
  if (people >= 3) return 0.12;
  return 0;
};

/**
 * Convenience: price per person after applying group discount to base price.
 */
export const getPricePerPersonAfterGroupDiscount = (basePrice: number, people: number): number => {
  const d = getDiscountPercentForGroupSize(people);
  return Math.round(basePrice * (1 - d) * 100) / 100;
};
