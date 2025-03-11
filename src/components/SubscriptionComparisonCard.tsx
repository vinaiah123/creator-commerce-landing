
import { DollarSign, ArrowRight, Infinity, TrendingDown, Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SubscriptionComparisonCard = () => {
  return (
    <div className="rounded-3xl p-8 lg:p-10 kawaii-shadow border-2 border-carteYellow/20 bg-zinc-900/95 backdrop-blur-xl">
      <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-center text-white">
        Switch to Zero Fees with Our Subscription
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Carte Plan */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-carteYellow/30 kawaii-shadow">
            <h4 className="text-xl font-bold mb-4 flex items-center text-white">
              <DollarSign className="text-carteYellow mr-2" size={24} /> 
              Carte Subscription
            </h4>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-white">$29/month</span>
              <div className="px-3 py-1.5 bg-carteYellow text-zinc-900 rounded-full text-sm font-bold">
                <Infinity size={14} className="inline mr-1" /> Zero Transaction Fees
              </div>
            </div>
            <div className="space-y-4">
              {[
                'All-in-one platform for creators',
                'Complete feature set in one subscription',
                'No additional costs as you scale',
                'Unlimited products and digital assets',
                'Customizable checkout experience',
                'Advanced analytics and reporting',
                'Priority customer support',
                'Secure payment processing',
                'API access for custom integrations',
                'White-labeled experience'
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check size={18} className="text-carteYellow mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-carteYellow/10 rounded-xl p-4 border border-carteYellow/30">
              <div className="flex justify-between items-center text-carteYellow">
                <span className="font-bold">Monthly Total</span>
                <span className="font-bold">$29/mo</span>
              </div>
              <div className="text-sm text-carteYellow/80 mt-1">No transaction fees on any sales</div>
            </div>
          </div>
        </div>
        
        {/* Alternative Services */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-4 flex items-center text-white">
            <DollarSign className="text-gray-400 mr-2" size={24} /> 
            Multiple Services Alternative
          </h4>
          
          {[
            { name: 'E-commerce Platform', price: '$29/mo' },
            { name: 'Email Marketing Tool', price: '$25/mo' },
            { name: 'Landing Page Builder', price: '$49/mo' },
            { name: 'Analytics Solution', price: '$79/mo' },
            { name: 'Customer Support Tool', price: '$39/mo' }
          ].map((service, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-center text-gray-200">
                <span className="font-medium">{service.name}</span>
                <span className="font-bold">{service.price}</span>
              </div>
            </div>
          ))}
          
          <div className="mt-6 bg-red-950/30 rounded-xl p-4 border-2 border-red-500/20">
            <div className="flex justify-between items-center text-red-400">
              <span className="font-bold">Monthly Total</span>
              <span className="font-bold">$221/mo</span>
            </div>
            <div className="text-sm text-red-400/80 mt-1">+ transaction fees on every sale</div>
          </div>
          
          <div className="mt-6 flex items-center justify-center text-lg">
            <TrendingDown size={24} className="text-carteYellow mr-2" />
            <span className="font-bold text-carteYellow">Save $192/month with Carte</span>
          </div>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <Button size="lg" className="bg-carteYellow hover:bg-carteYellow/90 text-zinc-900 font-semibold px-8 py-6 h-auto">
          Start with Our Subscription
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionComparisonCard;
