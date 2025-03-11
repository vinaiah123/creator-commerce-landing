
import { ArrowRight, Heart, Star, Sparkles, IceCream } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../lib/animations';

const Hero = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textContainer = textContainerRef.current;
    
    if (isVisible && textContainer) {
      textContainer.classList.add('animate-hero-content');
    }
  }, [isVisible]);

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      {/* Soft pastel gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDE1D3] via-[#FFDEE2] to-[#F2FCE2] z-10"></div>
      </div>

      {/* Kawaii-style illustrations */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <Heart className="absolute top-[15%] right-[15%] w-16 h-16 text-[#FF7BAC] animate-floatSlow" 
               style={{animationDelay: "0.3s"}} />
        
        <Sparkles className="absolute bottom-[25%] left-[18%] w-14 h-14 text-[#FAC200] animate-floatMedium" 
                 style={{animationDelay: "0.7s"}} />
        
        <Star className="absolute top-[30%] left-[12%] w-12 h-12 text-[#FEC6A1] animate-float" 
               style={{animationDelay: "1.2s"}} />
        
        <IceCream className="absolute bottom-[20%] right-[20%] w-16 h-16 text-[#E5DEFF] animate-floatFast" 
                  style={{animationDelay: "0.5s"}} />

        {/* Kawaii bubble elements */}
        <div className="absolute top-[25%] right-[25%] w-32 h-32 bg-[#FFDEE2]/40 rounded-full blur-xl animate-floatSlow" 
             style={{animationDelay: "0.3s"}}></div>
        <div className="absolute bottom-[35%] left-[20%] w-24 h-24 bg-[#F2FCE2]/40 rounded-full blur-xl animate-floatMedium" 
             style={{animationDelay: "0.8s"}}></div>
        <div className="absolute top-[40%] left-[30%] w-16 h-16 bg-[#E5DEFF]/40 rounded-full rotate-12 blur-sm animate-float" 
             style={{animationDelay: "1.5s"}}></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div 
          ref={textContainerRef}
          className="max-w-3xl mx-auto text-center opacity-0"
        >
          <span className="inline-block bg-white/90 text-[#8E9196] px-4 py-1.5 rounded-full text-sm font-medium mb-6 hero-badge kawaii-shadow">
            The platform for indie creators
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#8E9196] mb-6 leading-tight hero-title">
            Turn Your Craft Into<br className="hidden md:block"/> 
            A <span className="text-gradient bg-gradient-to-r from-[#FF7BAC] to-[#FAC200]">Thriving Business</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#8E9196] mb-10 max-w-2xl mx-auto hero-description">
            Build your brand, expand your audience, and sell your handmade creations with zero fees, unlimited customization, and built-in marketing tools.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-buttons">
            <a 
              href="#start" 
              className="px-8 py-4 bg-[#FF7BAC] hover:bg-[#FF5E97] text-white rounded-full transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2 hover:gap-3 w-full sm:w-auto hero-primary-btn kawaii-shadow"
            >
              <span>Start Selling Now</span>
              <ArrowRight size={18} />
            </a>
            <a 
              href="#features" 
              className="px-8 py-4 bg-white/70 hover:bg-white/90 text-[#8E9196] border border-[#E5DEFF] rounded-full transition-all duration-300 font-medium text-lg w-full sm:w-auto hero-secondary-btn kawaii-shadow"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>
      
      {/* Wave Divider - softer colors */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="#ffffff">
          <path d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,234.7C672,235,768,213,864,192C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
