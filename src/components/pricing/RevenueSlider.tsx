
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/utils/pricing-calculator';

interface RevenueSliderProps {
  monthlySales: number;
  onValueChange: (value: number[]) => void;
}

const RevenueSlider = ({ monthlySales, onValueChange }: RevenueSliderProps) => {
  return (
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
          onValueChange={onValueChange} 
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
  );
};

export default RevenueSlider;
