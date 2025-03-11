
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PricingCardProps = {
  title: string;
  subtitle?: string;
  price: React.ReactNode;
  features: React.ReactNode[];
  cta: string;
  isPopular?: boolean;
  delay: number;
  isVisible: boolean;
};

const PricingCard = ({
  title,
  subtitle,
  price,
  features,
  cta,
  isPopular = false,
  delay,
  isVisible
}: PricingCardProps) => {
  return (
    <div className={`bg-white rounded-3xl p-8 kawaii-shadow border-2 ${isPopular ? 'border-carteYellow' : 'border-accent/20'} relative transition-all duration-700 ease-out ${isVisible ? `opacity-100 translate-y-0 delay-${delay} hover:translate-y-[-8px]` : 'opacity-0 translate-y-10'}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-carteYellow text-gray-900 px-4 py-1 rounded-full text-sm font-bold kawaii-shadow">
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mb-3">{subtitle}</p>}
        <div className="text-3xl font-bold text-gray-900 mb-2">{price}</div>
      </div>
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check size={18} className="text-carteYellow mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
      <Button 
        variant={isPopular ? "default" : "outline"} 
        className={`w-full justify-center ${isPopular ? 'bg-carteYellow hover:bg-carteYellow-600 text-gray-900' : 'border-carteYellow text-carteYellow hover:bg-carteYellow/10'}`}
      >
        {cta}
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

export default PricingCard;
