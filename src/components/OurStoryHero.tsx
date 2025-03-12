
import { useIntersectionObserver } from '@/lib/animations';
import { Heart } from 'lucide-react';

const OurStoryHero = () => {
  const {
    elementRef,
    isVisible
  } = useIntersectionObserver();

  return (
    <div className="relative overflow-hidden bg-carteBackground py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center" ref={elementRef as React.RefObject<HTMLDivElement>}>
          <div className={`inline-block mb-6 ${isVisible ? 'animate-float' : 'opacity-0'}`}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-cartePink font-bold text-sm kawaii-shadow">
              <Heart size={16} className="mr-2" fill="currentColor" />
              OUR STORY
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
            Empowering <span className="text-gradient">small businesses</span> to thrive online
          </h1>
          
          <p className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
            Carte was born during the COVID-19 pandemic when we saw home-based businesses struggling with order collection. We created a simple solution that takes minutes to set up, so you can focus on what matters - growing your business.
          </p>
          
          <div className={`mt-10 max-w-xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80"
                alt="Small business owner using Carte"
                className="rounded-2xl shadow-xl w-full object-cover kawaii-border"
              />
              <div className="absolute -bottom-4 -right-4 bg-carteYellow text-gray-900 px-6 py-3 rounded-xl font-bold kawaii-shadow">
                Est. 2020
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryHero;
