
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhyCarteHero from '@/components/WhyCarteHero';
import WhyCarteFeatures from '@/components/WhyCarteFeatures';
import PricingComparison from '@/components/PricingComparison';
import SavingsCalculator from '@/components/SavingsCalculator';
import SubscriptionComparisonCard from '@/components/SubscriptionComparisonCard';
import Testimonials from '@/components/Testimonials';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

const WhyCartePage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      if (pageRef.current) {
        pageRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" ref={pageRef}>
      <Navbar />
      
      <main className="flex-grow pt-20 bg-carteBackground">
        <WhyCarteHero />
        <WhyCarteFeatures />
        <PricingComparison />
        <SavingsCalculator />
        
        <div className="container mx-auto px-6 py-12">
          <SubscriptionComparisonCard />
          
          <div className="my-20">
            <Testimonials />
          </div>
          
          <div className="text-center mt-12 mb-16">
            <h3 className="text-2xl font-bold mb-6">Ready to Start Saving with Carte?</h3>
            <Button size="lg" className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900 px-8 py-6 h-auto rounded-xl transition-all duration-300 hover:-translate-y-1">
              Get Started Today
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WhyCartePage;
