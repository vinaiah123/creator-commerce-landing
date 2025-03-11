
import React from 'react';
import { Award } from 'lucide-react';

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

type FeeComparisonCardProps = {
  platform: string;
  fee: number;
  monthlySales: number;
  isLowest?: boolean;
};

const FeeComparisonCard = ({
  platform,
  fee,
  monthlySales,
  isLowest = false
}: FeeComparisonCardProps) => {
  const percentage = (fee / monthlySales * 100).toFixed(1);
  const cardColor = isLowest ? 'border-carteYellow bg-carteYellow/5' : 'border-gray-200';
  const textColor = isLowest ? 'text-carteYellow' : 'text-gray-700';
  
  return (
    <div className={`bg-white rounded-2xl p-5 kawaii-shadow border-2 ${cardColor} transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex justify-between items-center mb-1">
        <div className="text-lg font-semibold">{platform}</div>
        <div className={`text-lg font-bold ${textColor}`}>
          {formatCurrency(fee)}
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mb-3">
        {percentage}% of sales
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div 
          className={`${isLowest ? 'bg-carteYellow' : 'bg-gray-400'} h-3 rounded-full`} 
          style={{ width: `${Math.min(parseFloat(percentage) * 5, 100)}%` }}
        />
      </div>
      
      {isLowest && (
        <div className="flex items-center mt-3 text-carteYellow">
          <Award size={14} className="mr-1" />
          <span className="text-sm font-medium">Save up to 50% on fees</span>
        </div>
      )}
    </div>
  );
};

export default FeeComparisonCard;
