import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { ArrowRight, Calculator, PiggyBank, DollarSign } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { formatCurrency } from '@/utils/pricing';

// Calculate fees for different platforms
const calculatePlatformFees = (monthlySales: number) => {
  // Carte plans
  const carteFree = monthlySales * 0.05;
  const carteStarter = 12 + (monthlySales > 200 ? (monthlySales - 200) * 0.025 : 0);
  const carteGrowth = 29 + (monthlySales > 2000 ? (monthlySales - 2000) * 0.01 : 0);
  const cartePro = 199; // No percentage fees

  // Other platforms
  const etsy = monthlySales * 0.065 + Math.round(monthlySales / 25) * 0.20;
  const gumroad = monthlySales * 0.10 + Math.round(monthlySales / 25) * 0.30;
  const patreon = monthlySales * 0.10;

  // Calculate the recommended plan based on lowest total cost
  let recommendedPlan = "Free";
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

const PlanCard = ({ 
  title, 
  fee, 
  monthlySales,
  monthlyFee,
  isRecommended 
}: { 
  title: string; 
  fee: number; 
  monthlySales: number;
  monthlyFee: number; 
  isRecommended: boolean;
}) => {
  const percentageFee = ((fee - monthlyFee) / monthlySales * 100).toFixed(1);
  const effectiveRate = (fee / monthlySales * 100).toFixed(1);
  
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
          <span className="text-gray-600">Monthly Fee:</span>
          <span className="font-semibold">{formatCurrency(monthlyFee)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Transaction Fee:</span>
          <span className="font-semibold">{percentageFee}%</span>
        </div>
        
        <div className="border-t border-dashed border-gray-200 my-3 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total Monthly Cost:</span>
            <span className="text-xl font-bold">{formatCurrency(fee)}</span>
          </div>
          <div className="text-right text-sm text-gray-500">
            (Effective rate: {effectiveRate}%)
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
  const savingsPercent = (savings / fee * 100).toFixed(0);
  const effectiveRate = (fee / monthlySales * 100).toFixed(1);
  
  return (
    <div className="backdrop-blur-xl bg-white/50 rounded-2xl p-6 border border-white/30 transition-all duration-300 hover:-translate-y-2">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{platform}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Monthly Cost:</span>
          <span className="font-semibold">{formatCurrency(fee)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Effective Rate:</span>
          <span className="font-semibold">{effectiveRate}%</span>
        </div>
      </div>
      
      <div className="bg-red-50 rounded-xl p-4 mb-4 border border-red-100">
        <div className="text-red-500 font-medium text-center">
          You're losing {formatCurrency(savings)} every month!
        </div>
      </div>
      
      <div className="bg-green-50 rounded-xl p-4 border border-green-100">
        <div className="text-center">
          <div className="text-green-600 font-medium">
            Save {savingsPercent}% with Carte {cartePlan}
          </div>
          <div className="text-green-700 font-bold text-xl">
            {formatCurrency(savings)}/month
          </div>
          <div className="text-green-600 text-sm mt-1">
            {formatCurrency(savings * 12)}/year
          </div>
          <div className="text-gray-800 font-semibold mt-3 border-t border-green-200 pt-2">
            You would pay only <span className="text-green-700">{formatCurrency(carteFee)}/month</span> with Carte
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
  
  const fees = calculatePlatformFees(monthlySales);
  
  const handleSalesChange = (value: number[]) => {
    setMonthlySales(value[0]);
  };
  
  const handleCalculateClick = () => {
    toast.success(`Based on your monthly sales of ${formatCurrency(monthlySales)}, we recommend our ${fees.recommendedPlan} plan!`);
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
          
          <div className="flex border-b border-gray-200 mb-6">
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
          
          {activeTab === 'carte' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PlanCard 
                title="Freemium (5%)" 
                fee={fees.carteFree} 
                monthlySales={monthlySales}
                monthlyFee={0}
                isRecommended={fees.recommendedPlan === 'Free'} 
              />
              <PlanCard 
                title="Starter ($12/mo, 2.5%)" 
                fee={fees.carteStarter} 
                monthlySales={monthlySales}
                monthlyFee={12}
                isRecommended={fees.recommendedPlan === 'Starter'} 
              />
              <PlanCard 
                title="Growth ($29/mo, 1%)" 
                fee={fees.carteGrowth} 
                monthlySales={monthlySales}
                monthlyFee={29}
                isRecommended={fees.recommendedPlan === 'Growth'} 
              />
              <PlanCard 
                title="Pro ($199/mo, 0%)" 
                fee={fees.cartePro} 
                monthlySales={monthlySales}
                monthlyFee={199}
                isRecommended={fees.recommendedPlan === 'Pro'} 
              />
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
