
import React from 'react';
import { DollarSign } from 'lucide-react';

const PricingInfo = () => {
  return (
    <div className="mt-12 backdrop-blur-xl bg-white/50 rounded-2xl p-8 border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
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
  );
};

export default PricingInfo;
