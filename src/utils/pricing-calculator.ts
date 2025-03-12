
export type PlanInfo = {
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  feeThreshold: number;
  transactionFee: number;
  feeCap: number | null;
  features: string[];
  isRecommended?: boolean;
};

export const PRICING_PLANS: PlanInfo[] = [
  {
    title: 'Freemium',
    monthlyPrice: 0,
    yearlyPrice: 0,
    feeThreshold: 100,
    transactionFee: 5,
    feeCap: null,
    features: [
      'All core features',
      'Basic theming',
      'Link in bio',
      'Payment gateways',
      'Custom domain'
    ]
  },
  {
    title: 'Starter',
    monthlyPrice: 12,
    yearlyPrice: 120,
    feeThreshold: 1000,
    transactionFee: 2,
    feeCap: null,
    features: [
      'Essential eCommerce tools',
      'Fee-free up to $1,000/month',
      'Basic customization',
      'Scheduled releases',
      'Ideal for new & small sellers'
    ]
  },
  {
    title: 'Growth',
    monthlyPrice: 35,
    yearlyPrice: 350,
    feeThreshold: 2000,
    transactionFee: 1,
    feeCap: 50,
    features: [
      '3 team members',
      'Fee-free up to $2,000/month',
      'Priority support',
      'Automation tools',
      'Perfect for growing businesses'
    ],
    isRecommended: true
  },
  {
    title: 'Business',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    feeThreshold: Infinity,
    transactionFee: 0,
    feeCap: 0,
    features: [
      'Unlimited team members',
      'No transaction fees',
      'Multi-store functionality',
      'Advanced analytics & integrations',
      'Best for high-volume sellers'
    ]
  }
];

export const calculateFees = (sales: number, plan: PlanInfo): number => {
  if (sales <= plan.feeThreshold) {
    return 0;
  }
  
  const excessSales = sales - plan.feeThreshold;
  const fee = excessSales * (plan.transactionFee / 100);
  
  if (plan.feeCap !== null) {
    return Math.min(fee, plan.feeCap);
  }
  
  return fee;
};

export const getTotalCost = (sales: number, plan: PlanInfo, isAnnual: boolean = false): number => {
  const baseCost = isAnnual ? plan.yearlyPrice / 12 : plan.monthlyPrice;
  const feesCost = calculateFees(sales, plan);
  return baseCost + feesCost;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const getBestValuePlan = (sales: number, isAnnual: boolean = false): string => {
  let bestPlan = PRICING_PLANS[0].title;
  let lowestCost = getTotalCost(sales, PRICING_PLANS[0], isAnnual);

  for (let i = 1; i < PRICING_PLANS.length; i++) {
    const cost = getTotalCost(sales, PRICING_PLANS[i], isAnnual);
    if (cost < lowestCost) {
      lowestCost = cost;
      bestPlan = PRICING_PLANS[i].title;
    }
  }

  return bestPlan;
};
