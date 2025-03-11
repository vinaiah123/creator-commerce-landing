
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../lib/animations';

const Hero = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-carte/80 to-carte-700/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=2000')] bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=2000')",
            filter: "brightness(0.7)"
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span 
            className={`inline-block bg-white/90 text-carte px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            The platform for indie creators
          </span>
          
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${
              isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'
            }`}
          >
            Turn Your Craft Into<br className="hidden md:block"/> 
            A Thriving Business
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto ${
              isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
            }`}
          >
            Build your brand, expand your audience, and sell your handmade creations with zero fees, unlimited customization, and built-in marketing tools.
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
            isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'
          }`}>
            <a 
              href="#start" 
              id="start"
              className="px-8 py-4 bg-carteYellow hover:bg-carteYellow-600 text-gray-900 rounded-md transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2 hover:gap-3 w-full sm:w-auto"
            >
              <span>Start Selling Now</span>
              <ArrowRight size={18} />
            </a>
            <a 
              href="#features" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-md transition-all duration-300 font-medium text-lg w-full sm:w-auto"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="#ffffff">
          <path d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,234.7C672,235,768,213,864,192C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
