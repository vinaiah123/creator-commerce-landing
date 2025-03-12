
import { useState } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { ArrowRight, Calculator, PiggyBank, DollarSign, Info } from 'lucide-react';
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
import { formatCurrency } from '@/utils/pricing';
import { PRICING_PLANS, calculateOverageFees } from '@/utils/pricing-calculator';

const calculatePlatformFees = (monthlySales: number, isAnnual: boolean) => {
  // Calculate Carte fees based on the updated pricing model
  const carteFree = monthlySales <= 100 ? 0 : (monthlySales - 100) * 0.05;
  
  // Starter plan - $12/mo, no fees up to $500, then $1.50 per $250 (capped at $12)
  const starterBase = isAnnual ? 120 / 12 : 12;
  const starterOverage = monthlySales <= 500 ? 0 : 
    Math.min(Math.ceil((monthlySales - 500) / 250) * 1.5, 12);
  const carteStarter = starterBase + starterOverage;
  
  // Growth plan - $29/mo, no fees up to $2000, then $2.50 per $500 (capped at $29)
  const growthBase = isAnnual ? 290 / 12 : 29;
  const growthOverage = monthlySales <= 2000 ? 0 : 
    Math.min(Math.ceil((monthlySales - 2000) / 500) * 2.5, 29);
  const carteGrowth = growthBase + growthOverage;
  
  // Pro plan - $199/mo with no transaction fees
  const proBase = isAnnual ? 1990 / 12 : 199;
  const cartePro = proBase;

  // Calculate competitor fees
  const etsy = monthlySales * 0.065 + Math.round(monthlySales / 25) * 0.20;
  const gumroad = monthlySales * 0.10 + Math.round(monthlySales / 25) * 0.30;
  const patreon = monthlySales * 0.10;

  // Determine recommended plan
  let recommendedPlan = "Freemium";
  let lowestFee = carteFree;

  if (carteStarter < lowestFee) {
    lowestFee = carteStarter;
    recommendedPlan = "Starter";
  }
  
  if (carteGrowth < lowestFee) {
    lowestFee = carteGrowth;
    recommendedPlan = "Growth";
  }
  
  if (cartePro < lowestFee) {
    lowestFee = cartePro;
    recommendedPlan = "Pro";
  }

  return {
    carteFree,
    carteStarter,
    carteGrowth,
    cartePro,
    etsy,
    gumroad,
    patreon,
    recommendedPlan
  };
};

interface PlanCardProps {
  title: string;
  fee: number;
  monthlySales: number;
  monthlyFee: number;
  feeThreshold: number;
  isRecommended: boolean;
  overageFee: { amount: number; per: number; cap: number } | null;
  isAnnual: boolean;
}

const PlanCard = ({ 
  title, 
  fee, 
  monthlySales,
  monthlyFee,
  feeThreshold,
  overageFee,
  isRecommended,
  isAnnual
}: PlanCardProps) => {
  const getEffectiveRate = () => {
    if (monthlySales === 0) return "0.0";
    return (fee / monthlySales * 100).toFixed(1);
  };
  
  const getOverageFeeText = () => {
    if (!overageFee) return "No transaction fees";
    
    if (monthlySales <= feeThreshold) {
      return `First $${feeThreshold} sales: Fee-free`;
    }
    
    return `$${overageFee.amount} per $${overageFee.per} over $${feeThreshold} (max $${overageFee.cap})`;
  };
  
  return (
    <div className={`backdrop-blur-xl ${isRecommended ? 'bg-carteYellow/10 border-carteYellow' : 'bg-white/50 border-white/30'} rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 relative`}>
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-carteYellow text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-md">
          Recommended
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-2 ${isRecommended ? 'text-carteYellow' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            {isAnnual ? "Annual Plan:" : "Monthly Fee:"}
          </span>
          <span className="font-semibold">
            {isAnnual 
              ? `${formatCurrency(monthlyFee * 12)}/year` 
              : `${formatCurrency(monthlyFee)}/mo`}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Fee Threshold:</span>
          <div className="flex items-center">
            <span className="font-semibold">${feeThreshold}</span>
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
          <span className="text-gray-600">Overage Fee:</span>
          <div className="flex items-center">
            <span className="font-semibold text-sm">{getOverageFeeText()}</span>
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
            <span className="text-2xl font-bold">{formatCurrency(fee)}</span>
          </div>
          <div className="text-right text-sm text-gray-500">
            (Effective rate: {getEffectiveRate()}%)
          </div>
        </div>
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
  carteFee,
  cartePlan
}: { 
  platform: string; 
  fee: number; 
  monthlySales: number;
  carteFee: number;
  cartePlan: string;
}) => {
  const savings = fee - carteFee;
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
            <span className="font-extrabold">MONTHLY COST</span> with Carte {cartePlan}
          </div>
          <div className="text-green-700 font-bold text-4xl mb-2">
            {formatCurrency(carteFee)}
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
  
  const fees = calculatePlatformFees(monthlySales, isAnnual);
  
  const handleSalesChange = (value: number[]) => {
    setMonthlySales(value[0]);
  };
  
  const handleCalculateClick = () => {
    const lowestFee = Math.min(fees.carteFree, fees.carteStarter, fees.carteGrowth, fees.cartePro);
    
    toast({
      title: `Recommended: Carte ${fees.recommendedPlan}`,
      description: `Based on your monthly sales of ${formatCurrency(monthlySales)}, you'll pay only ${formatCurrency(lowestFee)} per month with Carte!`,
      variant: "default",
    });
  };

  return (
    <section className="py-20 bg-carteBackground-dark" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className={`inline-block backdrop-blur-xl bg-white/50 text-carteYellow px-5 py-2 rounded-full text-sm font-bold mb-4 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-float' : 'opacity-0'}`}>
            <Calculator size={14} className="inline mr-1" />
            PRICING CALCULATOR
          </span>
          
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
            See How Much You Could Save
          </h2>
          
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
            Move the slider to see how Carte compares to other platforms at different sales volumes.
          </p>
        </div>

        <div className={`backdrop-blur-xl bg-white/50 rounded-3xl p-8 border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Monthly Sales</h3>
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
                Annual <span className="text-green-600">(Save 20%)</span>
              </span>
            </div>
          </div>
          
          {activeTab === 'carte' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRICING_PLANS.map((plan, index) => {
                const planFee = calculateOverageFees(monthlySales, plan);
                const baseCost = isAnnual ? plan.yearlyPrice / 12 : plan.monthlyPrice;
                const totalCost = baseCost + planFee;
                
                return (
                  <PlanCard 
                    key={index}
                    title={plan.title} 
                    fee={totalCost} 
                    monthlySales={monthlySales}
                    monthlyFee={plan.monthlyPrice}
                    feeThreshold={plan.feeThreshold}
                    overageFee={plan.overageFee}
                    isRecommended={fees.recommendedPlan === plan.title}
                    isAnnual={isAnnual}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CompetitorCard 
                platform="Etsy" 
                fee={fees.etsy} 
                monthlySales={monthlySales}
                carteFee={Math.min(fees.carteFree, fees.carteStarter, fees.carteGrowth, fees.cartePro)}
                cartePlan={fees.recommendedPlan}
              />
              <CompetitorCard 
                platform="Gumroad" 
                fee={fees.gumroad} 
                monthlySales={monthlySales}
                carteFee={Math.min(fees.carteFree, fees.carteStarter, fees.carteGrowth, fees.cartePro)}
                cartePlan={fees.recommendedPlan}
              />
              <CompetitorCard 
                platform="Patreon" 
                fee={fees.patreon} 
                monthlySales={monthlySales}
                carteFee={Math.min(fees.carteFree, fees.carteStarter, fees.carteGrowth, fees.cartePro)}
                cartePlan={fees.recommendedPlan}
              />
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
