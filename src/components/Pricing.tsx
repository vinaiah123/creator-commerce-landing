
import { useState } from 'react';
import { useIntersectionObserver } from '../lib/animations';
import { CreditCard, DollarSign, Infinity, Percent, ArrowRight, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ 
  title, 
  price, 
  features, 
  cta, 
  isPopular = false, 
  delay, 
  isVisible 
}: { 
  title: string;
  price: React.ReactNode;
  features: string[];
  cta: string;
  isPopular?: boolean;
  delay: number;
  isVisible: boolean;
}) => {
  return (
    <div 
      className={`bg-white rounded-3xl p-8 kawaii-shadow border-2 ${
        isPopular ? 'border-carteYellow' : 'border-accent/20'
      } relative transition-all duration-700 ease-out ${
        isVisible 
          ? `opacity-100 translate-y-0 delay-${delay} hover:translate-y-[-8px]` 
          : 'opacity-0 translate-y-10'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-carteYellow text-gray-900 px-4 py-1 rounded-full text-sm font-bold kawaii-shadow">
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
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

// Comparison platform card
const ComparisonCard = ({ 
  platform, 
  fee, 
  isLowest = false, 
  delay, 
  isVisible 
}: { 
  platform: string;
  fee: string;
  isLowest?: boolean;
  delay: number;
  isVisible: boolean;
}) => {
  return (
    <div 
      className={`bg-white rounded-2xl p-5 kawaii-shadow border ${
        isLowest ? 'border-carteYellow' : 'border-gray-200'
      } transition-all duration-500 ease-out ${
        isVisible 
          ? `opacity-100 translate-y-0 delay-${delay}` 
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="text-lg font-semibold mb-1">{platform}</div>
      <div className={`text-xl font-bold ${isLowest ? 'text-carteYellow' : 'text-gray-700'}`}>
        {fee}
      </div>
    </div>
  );
};

const Pricing = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [annualBilling, setAnnualBilling] = useState(false);
  const navigate = useNavigate();

  const handleViewAllPlans = () => {
    navigate('/features#pricing');
  };

  return (
    <section 
      id="pricing" 
      className="py-24 bg-carteBackground"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span 
            className={`inline-block bg-white text-cartePink px-4 py-1.5 rounded-full text-sm font-bold mb-4 kawaii-shadow ${
              isVisible ? 'animate-float' : 'opacity-0'
            }`}
          >
            <DollarSign size={14} className="inline mr-1" />
            CREATOR-FRIENDLY PRICING
          </span>
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${
              isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'
            }`}
          >
            Start for Free, Pay Only When You Sell
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto ${
              isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
            }`}
          >
            Flexible pricing that grows with your creative business. No upfront costs or hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <PricingCard 
            title="Pay As You Go"
            price={
              <div className="flex items-center">
                <span className="text-4xl">4.9%</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} className="ml-2 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm">Only pay when you make a sale. No monthly fees.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            }
            features={[
              "No monthly fees",
              "Only pay when you sell",
              "All core features included",
              "Unlimited products",
              "Custom domain support"
            ]}
            cta="Start for Free"
            delay={200}
            isVisible={isVisible}
          />
          
          <PricingCard 
            title="Starter"
            price={
              <div className="flex items-center">
                <span className="text-2xl mr-1">$</span>
                <span className="text-4xl">12</span>
                <span className="text-xl ml-1 text-gray-500">/mo</span>
              </div>
            }
            features={[
              "0% transaction fees",
              "Priority support",
              "Premium themes",
              "Advanced analytics",
              "Custom checkout"
            ]}
            cta="Get Started"
            isPopular={true}
            delay={300}
            isVisible={isVisible}
          />
          
          <PricingCard 
            title="Professional"
            price={
              <div className="flex items-center">
                <span className="text-2xl mr-1">$</span>
                <span className="text-4xl">29</span>
                <span className="text-xl ml-1 text-gray-500">/mo</span>
              </div>
            }
            features={[
              "0% transaction fees",
              "Multiple team members",
              "API access",
              "Webhooks integration",
              "White-label experience"
            ]}
            cta="Go Pro"
            delay={400}
            isVisible={isVisible}
          />
        </div>

        {/* Competitor Comparison */}
        <div className={`bg-carteBackground-dark rounded-3xl p-8 mb-12 kawaii-shadow ${
          isVisible ? 'animate-fade-in animation-delay-500' : 'opacity-0'
        }`}>
          <h3 className="text-2xl font-bold text-center mb-6">Transaction Fee Comparison</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <ComparisonCard 
              platform="Carte" 
              fee="4.9%" 
              isLowest={true}
              delay={600}
              isVisible={isVisible}
            />
            <ComparisonCard 
              platform="Etsy" 
              fee="6.5% + $0.20" 
              delay={700}
              isVisible={isVisible}
            />
            <ComparisonCard 
              platform="Gumroad" 
              fee="10% + $0.30" 
              delay={800}
              isVisible={isVisible}
            />
            <ComparisonCard 
              platform="Patreon" 
              fee="8-12%" 
              delay={900}
              isVisible={isVisible}
            />
            <ComparisonCard 
              platform="Shopify" 
              fee="$29/mo + 2.9%" 
              delay={1000}
              isVisible={isVisible}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className={`bg-white rounded-3xl p-10 text-center kawaii-shadow border-2 border-carteYellow/30 ${
          isVisible ? 'animate-fade-in animation-delay-600' : 'opacity-0'
        }`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Flexible Pricing That Grows With You</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start with no upfront costs and switch to a subscription at any time to eliminate transaction fees completely.
          </p>
          <Button 
            size="lg"
            className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900 kawaii-shadow"
          >
            Start Creating For Free
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
