
import { useState } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS, getTotalCost, formatCurrency } from '@/utils/pricing-calculator';
import { Info, Check, ArrowRight } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PricingComparison = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [isAnnual, setIsAnnual] = useState(false);
  
  // Sort plans to put recommended first
  const sortedPlans = [...PRICING_PLANS].slice(1).sort((a, b) => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">{plan.title}</h3>
              
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
              </div>
                
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span>Fee-free sales up to:</span>
                  <span className="font-bold text-xl text-carteYellow">
                    {formatCurrency(plan.feeThreshold)}/mo
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span>Transaction fee</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={16} className="ml-1 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Applied only to sales beyond the fee-free threshold</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="font-semibold">
                    {plan.transactionFee}%
                    {plan.feeCap !== null && plan.feeCap > 0 && ` (max $${plan.feeCap})`}
                  </span>
                </div>
                
                {plan.feeCap !== null && plan.feeCap > 0 && (
                  <div className="flex items-center justify-between">
                    <span>Max monthly cost:</span>
                    <span className="font-bold text-green-600">
                      ${plan.monthlyPrice + plan.feeCap}/mo
                    </span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
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
                Choose Plan
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="border-carteYellow text-carteYellow hover:bg-carteYellow/10">
            Try Carte for Free – Start Selling in Minutes!
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            All plans include our core features. Upgrade or downgrade at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
