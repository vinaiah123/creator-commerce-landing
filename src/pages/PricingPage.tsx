import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '../lib/animations';
import { useState } from 'react';
import { DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import SubscriptionComparisonCard from '@/components/SubscriptionComparisonCard';
import Testimonials from '@/components/Testimonials';
import PricingFAQ from '@/components/PricingFAQ';
import PricingCard from '@/components/PricingCard';
import FeeComparisonCard from '@/components/FeeComparisonCard';
import { calculateFees, formatCurrency } from '@/utils/pricing';

const PricingPage = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [monthlySales, setMonthlySales] = useState<number>(1000);
  const fees = calculateFees(monthlySales);
  
  const handleSalesChange = (value: number[]) => {
    setMonthlySales(value[0]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-carteBackground">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12" ref={elementRef as React.RefObject<HTMLDivElement>}>
            <span className={`inline-block bg-white text-cartePink px-4 py-1.5 rounded-full text-sm font-bold mb-4 kawaii-shadow ${isVisible ? 'animate-float' : 'opacity-0'}`}>
              <DollarSign size={14} className="inline mr-1" />
              CREATOR-FRIENDLY PRICING
            </span>
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
              Transparent Pricing for Creators
            </h1>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
              Start for free, pay only when you sell, or eliminate fees entirely with our subscription plans
            </p>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'} mb-20`}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PricingCard 
                title="Free" 
                subtitle="Pay As You Go" 
                price={
                  <div className="flex items-center">
                    <span className="text-lg text-gray-600">Start for free</span>
                  </div>
                } 
                features={[
                  <span key="transaction-fee" className="font-bold text-carteYellow">5% transaction costs</span>, 
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
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in animation-delay-500' : 'opacity-0'} mb-20 bg-carteBackground-dark rounded-3xl p-8 kawaii-shadow`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">See How Much You'll Save</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
              Drag the slider to see how Carte's 5% transaction fee compares to other platforms at different sales volumes.
            </p>
            
            <div className="bg-white p-6 rounded-xl">
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
                <FeeComparisonCard platform="Carte" fee={fees.carte} monthlySales={monthlySales} isLowest={true} />
                <FeeComparisonCard platform="Etsy" fee={fees.etsy} monthlySales={monthlySales} />
                <FeeComparisonCard platform="Gumroad" fee={fees.gumroad} monthlySales={monthlySales} />
                <FeeComparisonCard platform="Patreon" fee={fees.patreon} monthlySales={monthlySales} />
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm italic">
                *Estimates based on standard platform rates. Actual fees may vary by specific plan, transaction volume, and payment method.
              </p>
            </div>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in animation-delay-600' : 'opacity-0'} mb-20`}>
            <SubscriptionComparisonCard />
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in animation-delay-700' : 'opacity-0'} mb-20`}>
            <Testimonials />
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in animation-delay-800' : 'opacity-0'} mb-20`}>
            <PricingFAQ />
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in animation-delay-900' : 'opacity-0'} bg-white rounded-3xl p-10 text-center kawaii-shadow border-2 border-carteYellow/30`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Creative Business?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are building successful businesses with Carte.
            </p>
            <Button size="lg" className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900 kawaii-shadow">
              Get Started Now
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
