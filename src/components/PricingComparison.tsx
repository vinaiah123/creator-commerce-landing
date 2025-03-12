
import { useState } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS, getTotalCost } from '@/utils/pricing-calculator';
import { formatCurrency } from '@/utils/pricing';
import { Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const PricingComparison = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [isAnnual, setIsAnnual] = useState(false);
  
  // Sort plans to put recommended first
  const sortedPlans = [...PRICING_PLANS].sort((a, b) => {
    if (a.isRecommended) return -1;
    if (b.isRecommended) return 1;
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
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600">Start for free, upgrade as you grow. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedPlans.map((plan) => (
            <div
              key={plan.title}
              className={`relative bg-white rounded-xl p-6 shadow-lg border-2 ${
                plan.isRecommended ? 'border-carteYellow' : 'border-gray-100'
              }`}
            >
              {plan.isRecommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-carteYellow text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  Recommended
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? (plan.yearlyPrice / 12).toFixed(0) : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                {isAnnual && (
                  <div className="text-green-600 text-sm mt-1">
                    Billed ${plan.yearlyPrice}/year
                  </div>
                )}
                
                <div className="mt-4 flex items-center">
                  <span className="font-medium">Fee-free up to:</span>
                  <span className="ml-2 text-xl font-bold text-carteYellow">
                    {formatCurrency(plan.feeThreshold)}
                  </span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} className="ml-2 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {plan.overageFee 
                          ? `${formatCurrency(plan.overageFee.amount)} per ${formatCurrency(plan.overageFee.per)} in sales above threshold`
                          : 'No transaction fees'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
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

              <Button
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  plan.isRecommended
                    ? 'bg-carteYellow text-gray-900 hover:bg-carteYellow/90'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.monthlyPrice === 0 ? 'Start for Free' : 'Choose Plan'}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans include our core features. Upgrade or downgrade at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
