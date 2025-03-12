
import { PRICING_PLANS } from './pricing-calculator';

// Fee calculator function for comparing with other platforms
export const calculateFees = (sales: number) => {
  // Find Carte's best plan for this sales amount
  let carteFee = sales * 0.05; // Default to Freemium with 5% fee
  
  for (const plan of PRICING_PLANS) {
    if (plan.title === 'Freemium') continue; // Skip freemium plan
    
    const baseCost = plan.monthlyPrice;
    let overageFee = 0;
    
    if (sales > plan.feeThreshold) {
      overageFee = (sales - plan.feeThreshold) * (plan.transactionFee / 100);
      if (plan.feeCap !== null) {
        overageFee = Math.min(overageFee, plan.feeCap);
      }
    }
    
    const totalCost = baseCost + overageFee;
    
    if (totalCost < carteFee) {
      carteFee = totalCost;
    }
  }
  
  return {
    carte: parseFloat(carteFee.toFixed(2)),
    etsy: parseFloat((sales * 0.065 + Math.round(sales / 25) * 0.20).toFixed(2)),
    gumroad: parseFloat((sales * 0.10 + Math.round(sales / 25) * 0.30).toFixed(2)),
    patreon: parseFloat((sales * 0.10).toFixed(2)) // Using the middle of the 8-12% range
  };
};

// Helper to format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format percentage
export const formatPercent = (amount: number, total: number) => {
  return `${(amount / total * 100).toFixed(1)}%`;
};
