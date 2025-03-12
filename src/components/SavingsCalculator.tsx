
import { useState } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { Calculator } from 'lucide-react';
import { 
  PRICING_PLANS, 
  getTotalCost, 
  formatCurrency,
  getBestValuePlan
} from '@/utils/pricing-calculator';

// Import our new componentized pieces
import RevenueSlider from './pricing/RevenueSlider';
import PlanTabs from './pricing/PlanTabs';
import PlanCard from './pricing/PlanCard';
import CompetitorCard from './pricing/CompetitorCard';
import CalculatorFooter from './pricing/CalculatorFooter';
import PricingInfo from './pricing/PricingInfo';

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
          <RevenueSlider monthlySales={monthlySales} onValueChange={handleSalesChange} />
          
          <PlanTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isAnnual={isAnnual} 
            setIsAnnual={setIsAnnual} 
          />
          
          {activeTab === 'carte' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRICING_PLANS.map((plan, index) => (
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
              ))}
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
          
          <CalculatorFooter 
            monthlySales={monthlySales} 
            carteBestPlan={carteBestPlan} 
            breakEvenPoints={breakEvenPoints}
            activeTab={activeTab}
          />
        </div>
        
        <div className={`${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
          <PricingInfo />
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
