
import { ArrowRight, Heart, Star, Sparkles, IceCream, Instagram } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../lib/animations';
import { useIsDesktop } from '../hooks/use-mobile';

// Instagram feed component - only shown on desktop
const InstagramFeed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1682687982093-4c2b21f72d4c?q=80&w=2670&auto=format&fit=crop',
      likes: 124,
      caption: 'Exciting new features coming to Carte!',
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1675351066828-6bbd440f8748?q=80&w=2574&auto=format&fit=crop',
      likes: 89,
      caption: 'Meet our talented community of makers',
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1666919643134-d97687c1826c?q=80&w=2487&auto=format&fit=crop',
      likes: 203,
      caption: 'Behind the scenes at Carte HQ',
    }
  ]);

  return (
    <div className="absolute right-8 top-32 w-72 bg-white/90 rounded-xl overflow-hidden shadow-xl animate-float" style={{ animationDelay: '0.2s', zIndex: 20 }}>
      <div className="p-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Instagram className="h-5 w-5 text-cartePink-500" />
          <span className="font-semibold text-sm">carteapp.io</span>
        </div>
        <a 
          href="https://www.instagram.com/carteapp.io?igsh=MWh5dTlqdnpoNHRvag%3D%3D&utm_source=qr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-carteBlue-600 hover:underline"
        >
          Follow
        </a>
      </div>
      <div className="max-h-[500px] overflow-y-auto hide-scrollbar">
        {posts.map(post => (
          <div key={post.id} className="border-b border-gray-100 last:border-b-0">
            <div className="aspect-square overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={`Instagram post ${post.id}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3">
              <div className="flex items-center gap-1 mb-2">
                <Heart className="h-4 w-4 text-cartePink-500" />
                <span className="text-xs text-gray-600">{post.likes} likes</span>
              </div>
              <p className="text-xs text-gray-800 line-clamp-2">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-carteYellow-50 flex items-center justify-center">
        <a 
          href="https://www.instagram.com/carteapp.io?igsh=MWh5dTlqdnpoNHRvag%3D%3D&utm_source=qr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-carteBlue-800 font-semibold hover:text-cartePink-500 transition-colors flex items-center gap-1"
        >
          View More on Instagram
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

const Hero = () => {
  const {
    elementRef,
    isVisible
  } = useIntersectionObserver();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const textContainer = textContainerRef.current;
    if (isVisible && textContainer) {
      textContainer.classList.add('animate-hero-content');
    }
  }, [isVisible]);

  return <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden" ref={elementRef as React.RefObject<HTMLDivElement>}>
      {/* Soft gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-carteBackground-dark via-carteYellow-50 to-carteBackground z-10"></div>
      </div>

      {/* Kawaii-style illustrations */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <Heart className="absolute top-[15%] right-[15%] w-16 h-16 text-carteYellow-600 animate-floatSlow" style={{
        animationDelay: "0.3s"
      }} />
        
        <Sparkles className="absolute bottom-[25%] left-[18%] w-14 h-14 text-carteYellow-500 animate-floatMedium" style={{
        animationDelay: "0.7s"
      }} />
        
        <Star className="absolute top-[30%] left-[12%] w-12 h-12 text-carteYellow-400 animate-float" style={{
        animationDelay: "1.2s"
      }} />
        
        <IceCream className="absolute bottom-[20%] right-[20%] w-16 h-16 text-carteBlue-300 animate-floatFast" style={{
        animationDelay: "0.5s"
      }} />

        {/* Kawaii bubble elements */}
        <div className="absolute top-[25%] right-[25%] w-32 h-32 bg-carteYellow-100/40 rounded-full blur-xl animate-floatSlow" style={{
        animationDelay: "0.3s"
      }}></div>
        <div className="absolute bottom-[35%] left-[20%] w-24 h-24 bg-carteBlue-50/40 rounded-full blur-xl animate-floatMedium" style={{
        animationDelay: "0.8s"
      }}></div>
        <div className="absolute top-[40%] left-[30%] w-16 h-16 bg-carteYellow-200/40 rounded-full rotate-12 blur-sm animate-float" style={{
        animationDelay: "1.5s"
      }}></div>
      </div>

      {/* Desktop-only Instagram feed */}
      {isDesktop && <InstagramFeed />}

      <div className="container mx-auto px-6 z-10 relative">
        <div ref={textContainerRef} className="max-w-3xl mx-auto text-center opacity-0">
          <span className="inline-block bg-white/90 text-carteBlue-800 px-4 py-1.5 rounded-full mb-6 hero-badge kawaii-shadow font-bold text-xs text-center">TINY SHOPS</span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-carteBlue-800 mb-6 leading-tight hero-title">
            Turn Your Craft Into<br className="hidden md:block" /> 
            A <span className="text-gradient bg-gradient-to-r from-carteBlue-600 to-carteYellow-500">Thriving Business</span>
          </h1>
          
          <p className="text-lg md:text-xl text-carteBlue-700 mb-10 max-w-2xl mx-auto hero-description">
            Build your brand, expand your audience, and sell your handmade creations with zero fees, unlimited customization, and built-in marketing tools.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-buttons">
            <a href="#start" className="px-8 py-4 bg-carteYellow-500 hover:bg-carteYellow-600 text-carteBlue-900 rounded-full transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2 hover:gap-3 w-full sm:w-auto hero-primary-btn kawaii-shadow">
              <span>Start Selling Now</span>
              <ArrowRight size={18} />
            </a>
            <a href="#features" className="px-8 py-4 bg-white/70 hover:bg-white/90 text-carteBlue-700 border border-carteBlue-100 rounded-full transition-all duration-300 font-medium text-lg w-full sm:w-auto hero-secondary-btn kawaii-shadow">
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </section>;
};

export default Hero;
