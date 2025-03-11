
import { DollarSign, ArrowRight, Infinity, TrendingDown, Award, Check, Heart, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SubscriptionComparisonCard = () => {
  return (
    <div className="rounded-3xl p-8 lg:p-10 kawaii-shadow border-2 border-cartePink/40 bg-gradient-to-br from-white/95 to-cartePink/10 backdrop-blur-xl">
      <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-center text-carteBlue-700">
        <Sparkles className="inline-block text-cartePink mr-2" size={24} />
        Switch to Zero Fees with Our Subscription
        <Sparkles className="inline-block text-cartePink ml-2" size={24} />
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Carte Plan */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 lg:p-8 border-2 border-cartePink/30 kawaii-shadow animate-float">
            <h4 className="text-xl font-bold mb-4 flex items-center text-carteBlue-700">
              <Heart className="text-cartePink mr-2" size={24} /> 
              Carte Subscription
              <Star className="text-carteYellow ml-2" size={16} />
            </h4>
            
            <div className="space-y-4">
              {['All-in-one platform for creators', 'Complete feature set in one subscription', 'No additional costs as you scale', 'Unlimited products and digital assets', 'Customizable checkout experience', 'Advanced analytics and reporting', 'Priority customer support', 'Secure payment processing', 'API access for custom integrations', 'White-labeled experience'].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check size={18} className="text-cartePink mt-1 mr-2 flex-shrink-0" />
                  <span className="text-carteBlue-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-cartePink/10 rounded-xl p-4 border-2 border-cartePink/30">
              <div className="flex justify-between items-center text-cartePink">
                <span className="font-bold">Monthly Total</span>
                <span className="font-bold">$29/mo</span>
              </div>
              <div className="text-sm text-cartePink mt-1">No transaction fees on any sales</div>
            </div>
          </div>
        </div>
        
        {/* Alternative Services */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-4 flex items-center text-carteBlue-700">
            <DollarSign className="text-gray-400 mr-2" size={24} /> 
            Multiple Services Alternative
          </h4>
          
          {[{
            name: 'E-commerce Platform',
            price: '$29/mo'
          }, {
            name: 'Email Marketing Tool',
            price: '$25/mo'
          }, {
            name: 'Landing Page Builder',
            price: '$49/mo'
          }, {
            name: 'Analytics Solution',
            price: '$79/mo'
          }, {
            name: 'Customer Support Tool',
            price: '$39/mo'
          }].map((service, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl p-4 border-2 border-carteBlue-700/10 hover:-translate-y-1 transition-transform duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center text-carteBlue-700">
                <span className="font-medium">{service.name}</span>
                <span className="font-bold">{service.price}</span>
              </div>
            </div>
          ))}
          
          <div className="mt-6 bg-red-100 rounded-xl p-4 border-2 border-red-300">
            <div className="flex justify-between items-center text-red-600">
              <span className="font-bold">Monthly Total</span>
              <span className="font-bold">$221/mo</span>
            </div>
            <div className="text-sm text-red-500 mt-1">+ transaction fees on every sale</div>
          </div>
          
          <div className="mt-6 flex items-center justify-center text-lg">
            <TrendingDown size={24} className="text-cartePink mr-2" />
            <span className="font-bold text-cartePink">Save $192/month with Carte</span>
          </div>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <Button size="lg" className="bg-cartePink hover:bg-cartePink/90 text-white font-semibold px-8 py-6 h-auto rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-cartePink/30">
          <Sparkles size={16} className="mr-2" />
          Start with Our Subscription
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionComparisonCard;
