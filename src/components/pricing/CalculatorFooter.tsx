
import React from 'react';
import { Button } from '@/components/ui/button';
import { PiggyBank } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { formatCurrency } from '@/utils/pricing-calculator';

interface CalculatorFooterProps {
  monthlySales: number;
  carteBestPlan: {
    title: string;
    totalCost: number;
  };
  breakEvenPoints: {
    starterToGrowth: number;
  };
  activeTab: 'carte' | 'competitors';
}

const CalculatorFooter = ({ 
  monthlySales, 
  carteBestPlan, 
  breakEvenPoints, 
  activeTab 
}: CalculatorFooterProps) => {
  
  const handleCalculateClick = () => {
    toast({
      title: `Recommended: Carte ${carteBestPlan.title}`,
      description: `Based on your monthly sales of ${formatCurrency(monthlySales)}, you'll pay only ${formatCurrency(carteBestPlan.totalCost)} per month with Carte!`,
      variant: "default",
    });
  };
  
  return (
    <>
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
    </>
  );
};

export default CalculatorFooter;
