
// Fee calculator function
export const calculateFees = (sales: number) => {
  return {
    carte: parseFloat((sales * 0.05).toFixed(2)),
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
