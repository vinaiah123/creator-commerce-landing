
import { useState } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { ArrowRight, Calculator, PiggyBank, DollarSign, Info, Check } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from "@/components/ui/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  PRICING_PLANS, 
  calculateFees, 
  getTotalCost, 
  formatCurrency,
  getBestValuePlan
} from '@/utils/pricing-calculator';

interface PlanCardProps {
  title: string;
  monthlySales: number;
  monthlyPrice: number;
  yearlyPrice: number;
  feeThreshold: number;
  transactionFee: number;
  feeCap: number | null;
  features: string[];
  isRecommended: boolean;
  isAnnual: boolean;
  isBestValue: boolean;
}

const PlanCard = ({ 
  title, 
  monthlySales,
  monthlyPrice,
  yearlyPrice,
  feeThreshold,
  transactionFee,
  feeCap,
  features,
  isRecommended,
  isAnnual,
  isBestValue
}: PlanCardProps) => {
  const basePrice = isAnnual ? yearlyPrice / 12 : monthlyPrice;
  const fees = calculateFees(monthlySales, {
    title,
    monthlyPrice,
    yearlyPrice,
    feeThreshold,
    transactionFee,
    feeCap,
    features
  });
  const totalCost = basePrice + fees;
  
  const getEffectiveRate = () => {
    if (monthlySales === 0) return "0.0";
    return (totalCost / monthlySales * 100).toFixed(1);
  };
  
  const getTransactionFeeText = () => {
    if (transactionFee === 0) return "No transaction fees";
    if (feeCap !== null) {
      return `${transactionFee}% on sales beyond ${formatCurrency(feeThreshold)} (capped at ${formatCurrency(feeCap)})`;
    }
    return `${transactionFee}% on sales beyond ${formatCurrency(feeThreshold)}`;
  };
  
  return (
    <div className={`backdrop-blur-xl ${isRecommended ? 'bg-carteYellow/10 border-carteYellow' : 'bg-white/50 border-white/30'} rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 relative ${isBestValue ? 'ring-2 ring-green-500' : ''}`}>
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-carteYellow text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-md">
          Recommended
        </div>
      )}
      
      {isBestValue && !isRecommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
          Best Value
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-2 ${isRecommended ? 'text-carteYellow' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Base Price:</span>
          <span className="font-semibold text-xl">
            {formatCurrency(basePrice)}/mo
          </span>
        </div>
        
        {isAnnual && (
          <div className="text-right text-sm text-green-600">
            Billed annually: {formatCurrency(yearlyPrice)}/year
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Fee-Free Threshold:</span>
          <div className="flex items-center">
            <span className="font-semibold">{formatCurrency(feeThreshold)}/mo</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="ml-1 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]">
                  <p>Sales up to this amount each month are fee-free</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Transaction Fee:</span>
          <div className="flex items-center">
            <span className="font-semibold text-sm">{getTransactionFeeText()}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="ml-1 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px]">
                  <p>Fees only apply to sales beyond your monthly threshold</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="border-t border-dashed border-gray-200 my-3 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total Monthly Cost:</span>
            <span className="text-2xl font-bold">{formatCurrency(totalCost)}</span>
          </div>
          <div className="text-right text-sm text-gray-500">
            (Effective rate: {getEffectiveRate()}%)
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check size={18} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button variant={isRecommended ? "default" : "outline"} className={`w-full justify-center ${isRecommended ? 'bg-carteYellow hover:bg-carteYellow/90 text-gray-900' : 'border-carteYellow text-carteYellow hover:bg-carteYellow/10'}`}>
        Choose Plan
        <ArrowRight size={16} className="ml-2" />
      </Button>
    </div>
  );
};

const CompetitorCard = ({ 
  platform, 
  fee, 
  monthlySales,
  cartePlan
}: { 
  platform: string; 
  fee: number; 
  monthlySales: number;
  cartePlan: {
    title: string;
    totalCost: number;
  };
}) => {
  const savings = fee - cartePlan.totalCost;
  const savingsPercent = fee > 0 ? (savings / fee * 100).toFixed(0) : "0";
  const effectiveRate = monthlySales > 0 ? (fee / monthlySales * 100).toFixed(1) : "0.0";
  
  return (
    <div className="backdrop-blur-xl bg-white/50 rounded-2xl p-6 border border-white/30 transition-all duration-300 hover:-translate-y-2">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{platform}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Their Monthly Cost:</span>
          <span className="font-semibold">{formatCurrency(fee)}</span>
        </div>
        <div className="text-right text-sm text-gray-500">
          (Effective rate: {effectiveRate}%)
        </div>
      </div>
      
      <div className="bg-green-50 rounded-xl p-6 border border-green-100">
        <div className="text-center">
          <div className="text-gray-800 font-bold text-lg mb-2">
            <span className="font-extrabold">MONTHLY COST</span> with Carte {cartePlan.title}
          </div>
          <div className="text-green-700 font-bold text-4xl mb-2">
            {formatCurrency(cartePlan.totalCost)}
          </div>
          <div className="text-green-600 font-medium">
            Save {formatCurrency(savings)} per month ({savingsPercent}%)
          </div>
        </div>
      </div>
    </div>
  );
};

const SavingsCalculator = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [monthlySales, setMonthlySales] = useState<number>(1000);
  const [activeTab, setActiveTab] = useState<'carte' | 'competitors'>('carte');
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  
  const bestValuePlan = getBestValuePlan(monthlySales, isAnnual);
  
  const calculateCompetitorFees = (monthlySales: number) => {
    return {
      etsy: monthlySales * 0.065 + Math.round(monthlySales / 25) * 0.20,
      gumroad: monthlySales * 0.10 + Math.round(monthlySales / 25) * 0.30,
      patreon: monthlySales * 0.10
    };
  };
  
  const competitorFees = calculateCompetitorFees(monthlySales);
  
  const handleSalesChange = (value: number[]) => {
    setMonthlySales(value[0]);
  };
  
  const getBestCartePlan = () => {
    let bestPlan = PRICING_PLANS[0];
    let lowestCost = getTotalCost(monthlySales, bestPlan, isAnnual);
    
    for (let i = 1; i < PRICING_PLANS.length; i++) {
      const cost = getTotalCost(monthlySales, PRICING_PLANS[i], isAnnual);
      if (cost < lowestCost) {
        lowestCost = cost;
        bestPlan = PRICING_PLANS[i];
      }
    }
    
    return {
      title: bestPlan.title,
      totalCost: lowestCost
    };
  };
  
  const carteBestPlan = getBestCartePlan();
  
  const handleCalculateClick = () => {
    toast({
      title: `Recommended: Carte ${carteBestPlan.title}`,
      description: `Based on your monthly sales of ${formatCurrency(monthlySales)}, you'll pay only ${formatCurrency(carteBestPlan.totalCost)} per month with Carte!`,
      variant: "default",
    });
  };

  const getBreakEvenPoints = () => {
    // Calculate where Growth becomes better than Starter
    let breakEvenPoint = 0;
    const starterPlan = PRICING_PLANS.find(p => p.title === 'Starter')!;
    const growthPlan = PRICING_PLANS.find(p => p.title === 'Growth')!;
    
    for (let sales = 1000; sales <= 10000; sales += 100) {
      const starterCost = getTotalCost(sales, starterPlan, isAnnual);
      const growthCost = getTotalCost(sales, growthPlan, isAnnual);
      
      if (growthCost <= starterCost) {
        breakEvenPoint = sales;
        break;
      }
    }
    
    return { starterToGrowth: breakEvenPoint };
  };
  
  const breakEvenPoints = getBreakEvenPoints();

  return (
    <section className="py-20 bg-carteBackground-dark" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className={`inline-block backdrop-blur-xl bg-white/50 text-carteYellow px-5 py-2 rounded-full text-sm font-bold mb-4 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-float' : 'opacity-0'}`}>
            <Calculator size={14} className="inline mr-1" />
            PRICING CALCULATOR
          </span>
          
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
            Sell with Zero Upfront Costs, Scale as You Grow
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
            Choose a plan that fits your business and keep more of your revenue.
          </p>
        </div>

        <div className={`backdrop-blur-xl bg-white/50 rounded-3xl p-8 border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-carteYellow">
                {formatCurrency(monthlySales)}
              </p>
            </div>
            
            <div className="w-full md:w-2/3 px-4">
              <Slider 
                defaultValue={[1000]} 
                value={[monthlySales]}
                min={100} 
                max={10000} 
                step={100} 
                onValueChange={handleSalesChange} 
                className="my-4" 
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$100</span>
                <span>$2,500</span>
                <span>$5,000</span>
                <span>$10,000</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === 'carte' ? 'border-carteYellow text-carteYellow' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('carte')}
              >
                Carte Plans
              </button>
              <button
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === 'competitors' ? 'border-carteYellow text-carteYellow' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('competitors')}
              >
                Competitor Comparison
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-sm ${!isAnnual ? 'font-bold' : 'text-gray-500'}`}>Monthly</span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <span className={`text-sm ${isAnnual ? 'font-bold' : 'text-gray-500'}`}>
                Annual <span className="text-green-600">(Save 30%)</span>
              </span>
            </div>
          </div>
          
          {activeTab === 'carte' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRICING_PLANS.slice(1).map((plan, index) => {
                return (
                  <PlanCard 
                    key={index}
                    title={plan.title} 
                    monthlySales={monthlySales}
                    monthlyPrice={plan.monthlyPrice}
                    yearlyPrice={plan.yearlyPrice}
                    feeThreshold={plan.feeThreshold}
                    transactionFee={plan.transactionFee}
                    feeCap={plan.feeCap}
                    features={plan.features}
                    isRecommended={plan.isRecommended || false}
                    isAnnual={isAnnual}
                    isBestValue={bestValuePlan === plan.title}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CompetitorCard 
                platform="Etsy" 
                fee={competitorFees.etsy} 
                monthlySales={monthlySales}
                cartePlan={carteBestPlan}
              />
              <CompetitorCard 
                platform="Gumroad" 
                fee={competitorFees.gumroad} 
                monthlySales={monthlySales}
                cartePlan={carteBestPlan}
              />
              <CompetitorCard 
                platform="Patreon" 
                fee={competitorFees.patreon} 
                monthlySales={monthlySales}
                cartePlan={carteBestPlan}
              />
            </div>
          )}
          
          {monthlySales >= breakEvenPoints.starterToGrowth && activeTab === 'carte' && (
            <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100 text-center">
              <p className="text-green-800 font-medium">
                Break-even point reached! At {formatCurrency(breakEvenPoints.starterToGrowth)} in monthly sales, Growth becomes more cost-effective than Starter.
              </p>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Button 
              onClick={handleCalculateClick}
              size="lg" 
              className="bg-carteYellow hover:bg-carteYellow/90 text-gray-900 px-8 py-6 h-auto rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              <PiggyBank className="mr-2" size={20} />
              Calculate My Savings
            </Button>
            
            <div className="mt-6 flex flex-col gap-4 items-center">
              <Button variant="outline" size="lg" className="border-carteYellow text-carteYellow hover:bg-carteYellow/10">
                Try Carte for Free – Start Selling in Minutes!
              </Button>
              
              <p className="text-gray-600">
                Upgrade Anytime & Keep More of Your Profits!
              </p>
            </div>
            
            <p className="mt-4 text-gray-500 text-sm italic">
              *Calculations are estimates. Actual savings may vary based on specific transaction details and payment processor fees.
            </p>
          </div>
        </div>
        
        <div className={`mt-12 backdrop-blur-xl bg-white/50 rounded-2xl p-8 border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <DollarSign className="text-carteYellow w-16 h-16" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Stop Losing Money on Transaction Fees</h3>
              <p className="text-gray-600">
                Every sale you make on other platforms is costing you extra money in fees. With Carte's subscription options, 
                you can eliminate or significantly reduce transaction fees, putting more money back in your pocket. 
                The more you sell, the more you save.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-100">
            <div className="text-center">
              <div className="text-green-700 font-bold text-xl mb-2">
                85% of our sellers save money by upgrading to Growth!
              </div>
              <div className="text-green-600">
                Join thousands of creators who are keeping more of their hard-earned money with Carte.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
