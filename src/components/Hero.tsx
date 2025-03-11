
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../lib/animations';

const Hero = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textContainer = textContainerRef.current;
    const shapes = shapesRef.current;
    
    if (isVisible && textContainer && shapes) {
      textContainer.classList.add('animate-hero-content');
      shapes.classList.add('animate-hero-shapes');
    }
  }, [isVisible]);

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-carteYellow/80 to-carteYellow-700/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=2000')",
            filter: "brightness(0.7)"
          }}
        ></div>
      </div>
      
      {/* Animated Floating Elements with Creator Images */}
      <div 
        ref={shapesRef}
        className="absolute inset-0 z-5 opacity-0"
      >
        {/* Floating creator images */}
        <div className="absolute top-[10%] right-[20%] w-24 h-24 rounded-full overflow-hidden animate-float shadow-xl border-2 border-white/30">
          <img 
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400" 
            alt="Creator" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-[25%] left-[15%] w-32 h-32 rounded-full overflow-hidden animate-floatSlow shadow-xl border-2 border-white/30" style={{animationDelay: "1s"}}>
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400" 
            alt="Creator" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-[30%] left-[10%] w-28 h-28 rounded-full overflow-hidden animate-floatMedium shadow-xl border-2 border-white/30" style={{animationDelay: "0.5s"}}>
          <img 
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400" 
            alt="Creator Team" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-[15%] right-[12%] w-36 h-36 rounded-full overflow-hidden animate-floatFast shadow-xl border-2 border-white/30" style={{animationDelay: "1.5s"}}>
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400" 
            alt="Creators Working" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-[50%] right-[30%] w-20 h-20 rounded-full overflow-hidden animate-float shadow-xl border-2 border-white/30" style={{animationDelay: "0.7s"}}>
          <img 
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400" 
            alt="Creator" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-[20%] right-[15%] w-32 h-32 bg-white/10 rounded-full blur-xl animate-floatSlow" style={{animationDelay: "0.3s"}}></div>
        <div className="absolute top-[30%] left-[10%] w-16 h-16 bg-cartePink/30 rounded-xl rotate-12 blur-sm animate-floatMedium" style={{animationDelay: "0.8s"}}></div>
        <div className="absolute bottom-[25%] right-[20%] w-24 h-24 bg-white/20 rounded-full blur-lg animate-floatFast" style={{animationDelay: "1.2s"}}></div>
        <div className="absolute top-[15%] left-[25%] w-20 h-20 bg-carteYellow-300/40 rounded-lg rotate-45 blur-sm animate-float" style={{animationDelay: "0.4s"}}></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div 
          ref={textContainerRef}
          className="max-w-3xl mx-auto text-center opacity-0"
        >
          <span className="inline-block bg-white/90 text-carteYellow px-4 py-1.5 rounded-full text-sm font-medium mb-6 hero-badge">
            The platform for indie creators
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight hero-title">
            Turn Your Craft Into<br className="hidden md:block"/> 
            A Thriving Business
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto hero-description">
            Build your brand, expand your audience, and sell your handmade creations with zero fees, unlimited customization, and built-in marketing tools.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-buttons">
            <a 
              href="#start" 
              className="px-8 py-4 bg-carte hover:bg-carte-600 text-white rounded-md transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2 hover:gap-3 w-full sm:w-auto hero-primary-btn"
            >
              <span>Start Selling Now</span>
              <ArrowRight size={18} />
            </a>
            <a 
              href="#features" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-md transition-all duration-300 font-medium text-lg w-full sm:w-auto hero-secondary-btn"
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
