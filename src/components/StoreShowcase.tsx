
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/lib/animations";
import { cn } from "@/lib/utils";

// Define the store data structure
interface Store {
  id: string;
  name: string;
  image: string;
  category: string;
  url: string;
  creator: {
    name: string;
    title: string;
    quote: string;
    avatar: string;
  };
  rating: number;
}

const StoreShowcase = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { elementRef, isVisible } = useIntersectionObserver();

  // Sample store data - replace with your actual data
  const stores: Store[] = [
    {
      id: "1",
      name: "Harmony Ceramics",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2070&auto=format&fit=crop",
      category: "Ceramics & Pottery",
      url: "#",
      creator: {
        name: "Emma Chen",
        title: "Ceramic Artist",
        quote: "Carte makes it so easy to showcase my handcrafted pieces beautifully. Sales increased 45% in the first month!",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format"
      },
      rating: 4.9
    },
    {
      id: "2",
      name: "Woodland Wonders",
      image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?q=80&w=2070&auto=format&fit=crop",
      category: "Handcrafted Wood Art",
      url: "#",
      creator: {
        name: "Marcus Taylor",
        title: "Woodworking Artist",
        quote: "The customizable storefront perfectly captures the essence of my brand. My customers love the shopping experience.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format"
      },
      rating: 4.8
    },
    {
      id: "3",
      name: "Whisper & Lace",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
      category: "Sustainable Fashion",
      url: "#",
      creator: {
        name: "Sofia Martinez",
        title: "Ethical Fashion Designer",
        quote: "Zero transaction fees meant I could lower my prices while maintaining quality. My customer base has tripled!",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format"
      },
      rating: 4.7
    },
    {
      id: "4",
      name: "Botanical Bliss",
      image: "https://images.unsplash.com/photo-1509223197845-458d87318791?q=80&w=2069&auto=format&fit=crop",
      category: "Artisanal Candles & Soaps",
      url: "#",
      creator: {
        name: "Olivia Johnson",
        title: "Botanical Artist",
        quote: "The analytics tools help me understand what's selling best. I've been able to focus my production more effectively.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format"
      },
      rating: 4.9
    },
    {
      id: "5",
      name: "Pixel Perfect",
      image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?q=80&w=2127&auto=format&fit=crop",
      category: "Digital Art Prints",
      url: "#",
      creator: {
        name: "Jason Kim",
        title: "Digital Artist",
        quote: "Managing digital product delivery used to be a nightmare. Carte has simplified everything about my business.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format"
      },
      rating: 4.8
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      // Check on initial load
      checkScrollButtons();
      // Check when window is resized
      window.addEventListener('resize', checkScrollButtons);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
      }
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  return (
    <section 
      id="stores" 
      className="py-24 bg-white"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span 
            className={`inline-block bg-cartePink/10 text-cartePink px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            SUCCESS STORIES
          </span>
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${
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

        <div className="relative">
          {/* Scroll controls */}
          <div className="flex justify-end gap-2 mb-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollLeft} 
              disabled={!canScrollLeft}
              className="rounded-full border-gray-200 hover:bg-gray-100 transition-all h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollRight} 
              disabled={!canScrollRight}
              className="rounded-full border-gray-200 hover:bg-gray-100 transition-all h-10 w-10"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>

          {/* Scrollable store showcase */}
          <div 
            className="overflow-x-auto hide-scrollbar pb-8"
            ref={scrollContainerRef}
          >
            <div className="flex gap-6 min-w-max">
              {stores.map((store, index) => (
                <div 
                  key={store.id}
                  className={`w-[340px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover-lift ${
                    isVisible 
                      ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${index * 100}` 
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  {/* Store Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={store.image} 
                      alt={store.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                      {store.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-carteYellow stroke-carteYellow" />
                      <span className="text-xs font-semibold">{store.rating}</span>
                    </div>
                  </div>
                  
                  {/* Store Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{store.name}</h3>
                    
                    {/* Creator testimonial */}
                    <div className="mb-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                          <img 
                            src={store.creator.avatar}
                            alt={store.creator.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{store.creator.name}</p>
                          <p className="text-xs text-gray-500">{store.creator.title}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm italic leading-relaxed">"{store.creator.quote}"</p>
                    </div>
                    
                    <a 
                      href={store.url}
                      className="flex items-center justify-center gap-1.5 w-full text-center text-sm font-medium text-carteBlue hover:text-carteBlue-400 transition-colors"
                    >
                      Visit Store 
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreShowcase;
