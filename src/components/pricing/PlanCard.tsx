
import React from 'react';
import { Check, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateFees, formatCurrency } from '@/utils/pricing-calculator';
import type { PlanInfo } from '@/utils/pricing-calculator';

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

export default PlanCard;
