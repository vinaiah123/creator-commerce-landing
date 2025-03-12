
import { useIntersectionObserver } from '@/lib/animations';
import { Shield, DollarSign, Clock, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhyCarteHero = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-b from-white to-carteBackground" 
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className={`inline-block backdrop-blur-xl bg-white/50 text-cartePink px-5 py-2 rounded-full text-sm font-bold mb-4 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-float' : 'opacity-0'}`}>
            <Heart size={14} className="inline mr-1 text-cartePink" />
            CREATORS FIRST PLATFORM
          </span>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
            Keep More of What You Earn with <span className="text-carteYellow">Carte</span>
          </h1>
          
          <p className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
            Sell with zero upfront costs, scale as you grow, and keep more of your revenue. Choose a plan that fits your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <DollarSign className="text-cartePink" size={32} />,
              title: "Fee-Free Thresholds",
              description: "Each plan includes fee-free sales up to a set amount. Starter gives you $1,000/month fee-free, Growth offers $2,000/month."
            },
            {
              icon: <Shield className="text-carteYellow" size={32} />,
              title: "Transparent Pricing",
              description: "Clear transaction fees and pricing tiers mean you'll always know exactly what you're paying as you scale."
            },
            {
              icon: <Clock className="text-accent" size={32} />,
              title: "Capped Fees on Growth",
              description: "Our Growth plan's transaction fees are capped at $50/month, making it ideal for businesses with monthly sales over $5,000."
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`backdrop-blur-xl bg-white/50 rounded-2xl p-8 border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:bg-white/60 ${
                isVisible ? `animate-fade-in animation-delay-${300 + index * 100}` : 'opacity-0'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className={`backdrop-blur-xl bg-carteYellow/10 rounded-3xl p-8 border-2 border-carteYellow text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] mb-8 ${isVisible ? 'animate-fade-in animation-delay-600' : 'opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to eliminate transaction fees?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Our Pro plan gives you zero transaction fees. Perfect for high-volume sellers who want predictable costs and advanced features.
          </p>
          <Button 
            size="lg" 
            className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900 px-8 py-6 h-auto rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            Try Carte for Free – Start Selling in Minutes!
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyCarteHero;
