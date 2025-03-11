
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '../lib/animations';
import { useState } from 'react';
import { DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Pricing from '@/components/Pricing';

const PricingPage = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" ref={elementRef as React.RefObject<HTMLDivElement>}>
            <span className={`inline-block bg-white text-cartePink px-4 py-1.5 rounded-full text-sm font-bold mb-4 kawaii-shadow ${isVisible ? 'animate-float' : 'opacity-0'}`}>
              <DollarSign size={14} className="inline mr-1" />
              CREATOR-FRIENDLY PRICING
            </span>
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
              Transparent Pricing for Creators
            </h1>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
              Choose the plan that works best for your creative business. Start for free and upgrade as you grow.
            </p>
          </div>
        </div>
        
        <Pricing />
        
        <div className="container mx-auto px-6 py-20">
          <div className={`bg-white rounded-3xl p-10 text-center kawaii-shadow border-2 border-carteYellow/30 ${isVisible ? 'animate-fade-in animation-delay-800' : 'opacity-0'}`}>
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
