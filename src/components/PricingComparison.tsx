
import { useState } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const PricingComparison = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [isAnnual, setIsAnnual] = useState(false);

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      const annualPrice = monthlyPrice * 12 * 0.7; // 30% discount
      return Math.round(annualPrice / 12);
    }
    return monthlyPrice;
  };

  const billingPeriod = isAnnual ? 'year' : 'month';
  const plans = [
    {
      title: 'Free',
      price: 0,
      transactionFee: '5%',
      features: ['Unlimited products', 'Basic analytics', 'Custom domain'],
      recommended: false
    },
    {
      title: 'Starter',
      price: 12,
      transactionFee: '2.5%',
      features: ['Everything in Free', 'Priority support', 'Advanced analytics'],
      recommended: false
    },
    {
      title: 'Growth',
      price: 29,
      transactionFee: '1%',
      features: ['Everything in Starter', 'Multiple team members', 'API access'],
      recommended: true
    },
    {
      title: 'Pro',
      price: 199,
      transactionFee: '0%',
      features: ['Everything in Growth', 'White-label experience', '24/7 support'],
      recommended: false
    }
  ];

  // Sort plans to put recommended first
  const sortedPlans = [...plans].sort((a, b) => {
    if (a.recommended) return -1;
    if (b.recommended) return 1;
    return 0;
  });

  return (
    <section className="py-20" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle">Monthly billing</Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <div className="flex items-center gap-2">
              <Label htmlFor="billing-toggle">Annual billing</Label>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Save 30%
              </Badge>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-gray-600">Start with our free plan or upgrade for more features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedPlans.map((plan) => (
            <div
              key={plan.title}
              className={`relative bg-white rounded-xl p-6 shadow-lg border-2 ${
                plan.recommended ? 'border-carteYellow' : 'border-gray-100'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-carteYellow text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  Recommended
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <div className="mb-4">
                <div className="text-4xl font-bold text-gray-900">
                  ${calculatePrice(plan.price)}
                </div>
                <div className="text-gray-500">per {billingPeriod}</div>
                <div className="mt-2 font-semibold text-gray-700">
                  {plan.transactionFee} transaction fee
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  plan.recommended
                    ? 'bg-carteYellow text-gray-900 hover:bg-carteYellow/90'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.price === 0 ? 'Start for Free' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
