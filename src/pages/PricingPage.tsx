
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '../lib/animations';
import { useState, useEffect, useRef } from 'react';
import { DollarSign } from 'lucide-react';
import Testimonials from '@/components/Testimonials';
import PricingFAQ from '@/components/PricingFAQ';
import PricingComparison from '@/components/PricingComparison';
import SavingsCalculator from '@/components/SavingsCalculator';
import SubscriptionComparisonCard from '@/components/SubscriptionComparisonCard';

const PricingPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  // Force scroll to top when component mounts with a slight delay to ensure it works
  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0);

    // Also add a delayed scroll to ensure it works
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });

      // Also try scrolling the specific element if window scroll doesn't work
      if (pageRef.current) {
        pageRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const {
    elementRef,
    isVisible
  } = useIntersectionObserver();

  return <div className="min-h-screen flex flex-col" ref={pageRef}>
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
              Sell with zero upfront costs, scale as you grow, and keep more of your revenue. Choose a plan that fits your business.
            </p>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'} mb-20`}>
            <PricingComparison />
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in animation-delay-500' : 'opacity-0'} mb-20`}>
            <SavingsCalculator />
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
        </div>
      </main>
      
      <Footer />
    </div>;
};

export default PricingPage;
