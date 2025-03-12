
export type PlanInfo = {
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  feeThreshold: number;
  overageFee: {
    amount: number;
    per: number;
    cap: number;
  } | null;
  features: string[];
  isRecommended?: boolean;
};

export const PRICING_PLANS: PlanInfo[] = [
  {
    title: 'Freemium',
    monthlyPrice: 0,
    yearlyPrice: 0,
    feeThreshold: 100,
    overageFee: {
      amount: 5,
      per: 100,
      cap: Infinity
    },
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
    feeThreshold: 500,
    overageFee: {
      amount: 1.50,
      per: 250,
      cap: 12
    },
    features: [
      'Basic customization',
      'Scheduled releases',
      'Product FAQs',
      'Digital products (coming soon)',
      'Priority support'
    ]
  },
  {
    title: 'Growth',
    monthlyPrice: 29,
    yearlyPrice: 290,
    feeThreshold: 2000,
    overageFee: {
      amount: 2.50,
      per: 500,
      cap: 29
    },
    features: [
      '3 team members',
      'Affiliate tools',
      'Priority payouts',
      'Automation',
      'Advanced filters'
    ],
    isRecommended: true
  },
  {
    title: 'Pro',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    feeThreshold: 50000,
    overageFee: null,
    features: [
      'Unlimited team members',
      'Multi-store (up to 5)',
      'Full API access',
      'Premium support',
      'Advanced analytics'
    ]
  }
];

export const calculateOverageFees = (sales: number, plan: PlanInfo): number => {
  if (!plan.overageFee || sales <= plan.feeThreshold) {
    return 0;
  }

  const overage = sales - plan.feeThreshold;
  const units = Math.ceil(overage / plan.overageFee.per);
  const fees = units * plan.overageFee.amount;
  
  return Math.min(fees, plan.overageFee.cap);
};

export const getTotalCost = (sales: number, plan: PlanInfo, isAnnual: boolean = false): number => {
  const baseCost = isAnnual ? plan.yearlyPrice / 12 : plan.monthlyPrice;
  const overageFees = calculateOverageFees(sales, plan);
  return baseCost + overageFees;
};
