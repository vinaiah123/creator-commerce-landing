import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/lib/animations";
import { stores } from "@/data/stores";
import FeaturedStore from "@/components/store/FeaturedStore";
import StoreCard from "@/components/store/StoreCard";
import GetStartedCard from "@/components/store/GetStartedCard";
import StoreScrollNavigation from "@/components/store/StoreScrollNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const StoreShowcase = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { elementRef, isVisible } = useIntersectionObserver();
  const [activeStore, setActiveStore] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const scrollLeft = () => {
    if (scrollContainerRef.current && !isMobile) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && !isMobile) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current && !isMobile) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && !isMobile) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
    }

    window.addEventListener('resize', checkScrollButtons);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
      }
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, [isMobile]);

  const featuredStore = stores.find(store => store.featured);
  const regularStores = stores.filter(store => !store.featured);

  return (
    <section 
      id="stores" 
      className="py-24 relative overflow-hidden"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-white -z-10" />
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-cartePink/10 blur-3xl -z-10" />
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-carteYellow/10 blur-3xl -z-10" />
      
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <span 
            className={`inline-block bg-cartePink/10 text-cartePink px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            SUCCESS STORIES
          </span>
          <h2 
            className={`text-3xl md:text-5xl font-bold text-gray-900 mb-6 ${
              isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'
            }`}
          >
            Stores Thriving with Carte
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto ${
              isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
            }`}
          >
            Join thousands of creative entrepreneurs who have launched successful online stores with zero transaction fees.
          </p>
        </div>

        <div 
          className={`mb-16 rounded-2xl overflow-hidden bg-white shadow-xl ${
            isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'
          }`}
        >
          {featuredStore && <FeaturedStore store={featuredStore} />}
        </div>

        <div className="relative">
          {!isMobile && (
            <StoreScrollNavigation 
              scrollLeft={scrollLeft}
              scrollRight={scrollRight}
              canScrollLeft={canScrollLeft}
              canScrollRight={canScrollRight}
            />
          )}

          {isMobile ? (
            <div className="grid grid-cols-1 gap-6">
              {regularStores.map((store, index) => (
                <StoreCard 
                  key={store.id}
                  store={store}
                  isVisible={isVisible}
                  index={index}
                  activeStore={activeStore}
                  setActiveStore={setActiveStore}
                />
              ))}
              
              <GetStartedCard 
                isVisible={isVisible}
                delay={300 + regularStores.length * 150}
              />
            </div>
          ) : (
            <div 
              className="overflow-x-auto hide-scrollbar pb-8"
              ref={scrollContainerRef}
            >
              <div className="flex gap-6 min-w-max">
                {regularStores.map((store, index) => (
                  <StoreCard 
                    key={store.id}
                    store={store}
                    isVisible={isVisible}
                    index={index}
                    activeStore={activeStore}
                    setActiveStore={setActiveStore}
                  />
                ))}
                
                <GetStartedCard 
                  isVisible={isVisible}
                  delay={300 + regularStores.length * 150}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoreShowcase;
