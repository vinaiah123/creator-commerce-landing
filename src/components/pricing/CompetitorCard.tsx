
import React from 'react';
import { formatCurrency } from '@/utils/pricing-calculator';

interface CompetitorCardProps { 
  platform: string; 
  fee: number; 
  monthlySales: number;
  cartePlan: {
    title: string;
    totalCost: number;
  };
}

const CompetitorCard = ({ 
  platform, 
  fee, 
  monthlySales,
  cartePlan
}: CompetitorCardProps) => {
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

export default CompetitorCard;
