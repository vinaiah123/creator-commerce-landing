
import { useIntersectionObserver } from '@/lib/animations';
import { Shield, DollarSign, Clock, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhyCarteHero = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-carteBackground" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className={`inline-block backdrop-blur-xl bg-white/50 text-cartePink px-5 py-2 rounded-full text-sm font-bold mb-4 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-float' : 'opacity-0'}`}>
            <Heart size={14} className="inline mr-1 text-cartePink" />
            CREATORS FIRST PLATFORM
          </span>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
            Why <span className="text-carteYellow">Carte</span> is the Smart Choice
          </h1>
          
          <p className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
            Higher profits, lower fees, and all the tools you need to grow your creative business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <DollarSign className="text-cartePink" size={32} />,
              title: "Keep More of Your Earnings",
              description: "With plans starting at just $12/month, save up to 5% on every sale compared to other platforms."
            },
            {
              icon: <Shield className="text-carteYellow" size={32} />,
              title: "All-in-One Platform",
              description: "Everything you need to run your business in one place - no juggling multiple services and fees."
            },
            {
              icon: <Clock className="text-accent" size={32} />,
              title: "Grow At Your Own Pace",
              description: "Start for free and upgrade when it makes financial sense for your business."
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

        <div className={`backdrop-blur-xl bg-white/50 rounded-3xl p-8 border border-white/30 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] mb-8 ${isVisible ? 'animate-fade-in animation-delay-600' : 'opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            <span className="text-carteYellow">85%</span> of our sellers save money by upgrading to Growth!
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Don't lose money on transaction fees. Our transparent pricing means you'll always know exactly what you're paying and how much you're saving.
          </p>
          <Button size="lg" className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900 px-8 py-6 h-auto rounded-xl transition-all duration-300 hover:-translate-y-1">
            See Your Potential Savings
          </Button>
        </div>
        
        <div className={`backdrop-blur-xl bg-white/50 rounded-3xl p-10 border border-white/30 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] mt-16 ${isVisible ? 'animate-fade-in animation-delay-700' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Growing Your Business?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of creators who are saving money and growing their business with our Growth plan.
          </p>
          <Button size="lg" className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900 px-8 py-6 h-auto rounded-xl transition-all duration-300 hover:-translate-y-1">
            Subscribe to Growth Plan
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyCarteHero;
