
import { useState } from 'react';
import { useIntersectionObserver } from '../lib/animations';
import { CreditCard, DollarSign, Infinity, Percent, ArrowRight, Check, Info, ArrowDown, TrendingDown, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';

// Fee calculator function
const calculateFees = (sales: number) => {
  return {
    carte: parseFloat((sales * 0.05).toFixed(2)),
    etsy: parseFloat((sales * 0.065 + Math.round(sales / 25) * 0.20).toFixed(2)),
    gumroad: parseFloat((sales * 0.10 + Math.round(sales / 25) * 0.30).toFixed(2)),
    patreon: parseFloat((sales * 0.10).toFixed(2)), // Using the middle of the 8-12% range
  };
};

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format percentage
const formatPercent = (amount: number, total: number) => {
  return `${(amount/total * 100).toFixed(1)}%`;
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
}: { 
  title: string;
  subtitle?: string;
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
        <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mb-3">{subtitle}</p>}
        <div className="text-3xl font-bold text-gray-900 mb-2">{price}</div>
      </div>
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check size={18} className="text-carteYellow mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-600" dangerouslySetInnerHTML={{ __html: feature }}></span>
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

const FeeComparisonCard = ({ 
  platform, 
  fee, 
  monthlySales,
  isLowest = false
}: { 
  platform: string;
  fee: number;
  monthlySales: number;
  isLowest?: boolean;
}) => {
  // Calculate percentage of sales
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
          style={{ width: `${Math.min(parseFloat(percentage) * 5, 100)}%` }} // Scale for better visualization
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

const SubscriptionComparisonCard = () => {
  return (
    <div className="bg-white rounded-3xl p-8 kawaii-shadow border-2 border-carteYellow/30">
      <h3 className="text-2xl font-bold mb-6 text-center">Switch to Zero Fees with Our Subscription</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-carteYellow/10 rounded-2xl p-6 border-2 border-carteYellow kawaii-shadow">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <DollarSign className="text-carteYellow mr-2" size={20} /> 
              Carte Subscription
            </h4>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">$29/month</span>
              <div className="px-3 py-1 bg-carteYellow text-gray-900 rounded-full text-sm font-bold kawaii-shadow">
                <Infinity size={14} className="inline mr-1" /> Zero Transaction Fees
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <Check size={18} className="text-carteYellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">All-in-one platform for creators</span>
              </div>
              <div className="flex items-start">
                <Check size={18} className="text-carteYellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Complete feature set in one subscription</span>
              </div>
              <div className="flex items-start">
                <Check size={18} className="text-carteYellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">No additional costs as you scale</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-2 flex items-center">
            <DollarSign className="text-gray-500 mr-2" size={20} /> 
            Multiple Services Alternative
          </h4>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">E-commerce Platform</span>
              <span className="font-bold">$29/mo</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">Email Marketing Tool</span>
              <span className="font-bold">$25/mo</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">Landing Page Builder</span>
              <span className="font-bold">$49/mo</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">Analytics Solution</span>
              <span className="font-bold">$79/mo</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium">Customer Support Tool</span>
              <span className="font-bold">$39/mo</span>
            </div>
          </div>
          
          <div className="mt-4 bg-gray-100 rounded-xl p-4 border-2 border-red-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-red-500">Monthly Total</span>
              <span className="font-bold text-red-500">$221/mo</span>
            </div>
            <div className="text-sm text-red-500 mt-1">+ transaction fees on every sale</div>
          </div>
          
          <div className="mt-4 flex items-center justify-center">
            <TrendingDown size={20} className="text-carteYellow mr-2" />
            <span className="font-bold text-carteYellow">Save $192/month with Carte</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900 kawaii-shadow"
        >
          Switch to Zero Fees Now
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [annualBilling, setAnnualBilling] = useState(false);
  const [comparisonStyle, setComparisonStyle] = useState<'standard' | 'visual'>('visual');
  const [monthlySales, setMonthlySales] = useState<number>(1000);
  const navigate = useNavigate();

  const fees = calculateFees(monthlySales);
  
  const handleSalesChange = (value: number[]) => {
    setMonthlySales(value[0]);
  };

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <PricingCard 
            title="Free"
            subtitle="Pay As You Go"
            price={
              <div className="flex items-center">
                <span className="text-lg text-gray-600">Start for free</span>
              </div>
            }
            features={[
              "<span class=\"font-bold text-carteYellow\">5% transaction costs</span>",
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

        <div className={`bg-carteBackground-dark rounded-3xl p-8 mb-12 kawaii-shadow ${
          isVisible ? 'animate-fade-in animation-delay-500' : 'opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">See How Much You'll Save</h3>
              <p className="text-gray-600 max-w-xl">
                Drag the slider to see how Carte's 5% transaction fee compares to other platforms at different sales volumes.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="px-4 py-1.5 bg-carteYellow text-gray-900 rounded-full text-sm font-bold kawaii-shadow">
                <span>Carte: Always the Lowest Fees</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-bold">Monthly Sales</h4>
                <p className="text-3xl font-bold text-carteYellow">
                  {formatCurrency(monthlySales)}
                </p>
              </div>
              
              <div className="w-full md:w-2/3 px-4">
                <Slider
                  defaultValue={[1000]}
                  min={100}
                  max={5000}
                  step={100}
                  onValueChange={handleSalesChange}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$100</span>
                  <span>$1,000</span>
                  <span>$2,500</span>
                  <span>$5,000</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FeeComparisonCard 
                platform="Carte" 
                fee={fees.carte}
                monthlySales={monthlySales}
                isLowest={true}
              />
              <FeeComparisonCard 
                platform="Etsy" 
                fee={fees.etsy}
                monthlySales={monthlySales}
              />
              <FeeComparisonCard 
                platform="Gumroad" 
                fee={fees.gumroad}
                monthlySales={monthlySales}
              />
              <FeeComparisonCard 
                platform="Patreon" 
                fee={fees.patreon}
                monthlySales={monthlySales}
              />
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm italic">
              *Estimates based on standard platform rates. Actual fees may vary by specific plan, transaction volume, and payment method.
            </p>
          </div>
        </div>

        <div className={`mb-12 ${isVisible ? 'animate-fade-in animation-delay-700' : 'opacity-0'}`}>
          <SubscriptionComparisonCard />
        </div>

        <div className={`bg-white rounded-3xl p-10 text-center kawaii-shadow border-2 border-carteYellow/30 ${
          isVisible ? 'animate-fade-in animation-delay-800' : 'opacity-0'
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
