import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star, Sparkles, PlusCircle, Images, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/lib/animations";
import { cn } from "@/lib/utils";

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
  additionalImages?: string[];
  rating: number;
  featured?: boolean;
}

const StoreShowcase = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { elementRef, isVisible } = useIntersectionObserver();
  const [activeStore, setActiveStore] = useState<string | null>(null);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const stores: Store[] = [
    {
      id: "1",
      name: "Harmony Ceramics",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2070&auto=format&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576020799627-aeac74d58064?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525974160448-038dacadcc71?q=80&w=2070&auto=format&fit=crop"
      ],
      category: "Ceramics & Pottery",
      url: "#",
      creator: {
        name: "Emma Chen",
        title: "Ceramic Artist",
        quote: "Carte makes it so easy to showcase my handcrafted pieces beautifully. Sales increased 45% in the first month!",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format"
      },
      rating: 4.9,
      featured: true
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

  useEffect(() => {
    if (!isHovering) return;
    
    const featuredStore = stores.find(store => store.featured);
    if (!featuredStore?.additionalImages?.length) return;
    
    const imageCount = featuredStore.additionalImages.length + 1; // +1 for the main image
    
    const interval = setInterval(() => {
      setFeaturedImageIndex(prev => (prev + 1) % imageCount);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovering, stores]);

  const handleNextImage = () => {
    const featuredStore = stores.find(store => store.featured);
    if (!featuredStore?.additionalImages?.length) return;
    
    const imageCount = featuredStore.additionalImages.length + 1;
    setFeaturedImageIndex(prev => (prev + 1) % imageCount);
  };

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
          {stores.filter(store => store.featured).map(store => (
            <div 
              key={store.id} 
              className="grid md:grid-cols-2 gap-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                setFeaturedImageIndex(0);
              }}
            >
              <div 
                className="relative h-96 transform-gpu transition-all duration-700 perspective-1000 group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div 
                  className="h-full w-full relative overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                    style={{ 
                      transform: `translateX(-${featuredImageIndex * 100}%)`,
                    }}
                  >
                    <div className="h-full w-full flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-tr from-cartePink/20 via-transparent to-carteYellow/20 z-10" />
                      <img 
                        src={store.image} 
                        alt={store.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    {store.additionalImages?.map((img, idx) => (
                      <div key={idx} className="h-full w-full flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cartePink/20 via-transparent to-carteYellow/20 z-10" />
                        <img 
                          src={img} 
                          alt={`${store.name} product ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                    {[store.image, ...store.additionalImages].map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setFeaturedImageIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          featuredImageIndex === idx 
                            ? 'bg-white scale-110' 
                            : 'bg-white/50 scale-100'
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                  
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-cartePink/10 via-transparent to-carteYellow/10 z-10 
                    transform group-hover:rotate-y-3 group-hover:rotate-x-2 transition-transform duration-700" 
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
                  />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 flex items-center gap-1 z-20">
                    <Sparkles className="w-3.5 h-3.5 text-carteYellow" />
                    <span>FEATURED STORE</span>
                  </div>
                  
                  {store.additionalImages && store.additionalImages.length > 0 && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 flex items-center gap-1 z-20">
                      <Images className="w-3.5 h-3.5 text-accent" />
                      <span>GALLERY</span>
                    </div>
                  )}
                </div>
                
                <div 
                  className="p-8 md:p-12 flex flex-col justify-center transform-gpu transition-all duration-700 hover:bg-gray-50/50"
                >
                  <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {store.category}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-accent transition-colors">{store.name}</h3>
                  
                  <div className="mb-6 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(store.rating) ? 'fill-carteYellow stroke-carteYellow' : 'stroke-gray-300'}`} />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600">{store.rating}/5</span>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent/20 transform hover:scale-110 transition-transform duration-300">
                        <img 
                          src={store.creator.avatar}
                          alt={store.creator.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800">{store.creator.name}</p>
                        <p className="text-sm text-gray-600">{store.creator.title}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg italic leading-relaxed">"{store.creator.quote}"</p>
                  </div>
                  
                  <a 
                    href={store.url}
                    className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent/90 transition-all self-start group relative overflow-hidden"
                  >
                    <span className="relative z-10">Visit Store</span>
                    <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-accent via-cartePink to-accent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500"></div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="flex justify-end gap-3 mb-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollLeft} 
              disabled={!canScrollLeft}
              className="rounded-full border-gray-200 hover:bg-gray-100 transition-all h-12 w-12"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollRight} 
              disabled={!canScrollRight}
              className="rounded-full border-gray-200 hover:bg-gray-100 transition-all h-12 w-12"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>

          <div 
            className="overflow-x-auto hide-scrollbar pb-8"
            ref={scrollContainerRef}
          >
            <div className="flex gap-6 min-w-max">
              {stores.filter(store => !store.featured).map((store, index) => (
                <div 
                  key={store.id}
                  className={`w-[320px] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden group hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-all duration-500 ${
                    isVisible 
                      ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${300 + index * 150}` 
                      : 'opacity-0 translate-y-10'
                  }`}
                  onMouseEnter={() => setActiveStore(store.id)}
                  onMouseLeave={() => setActiveStore(null)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={store.image} 
                      alt={store.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                      {store.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-carteYellow stroke-carteYellow" />
                      <span className="text-xs font-semibold">{store.rating}</span>
                    </div>
                    
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                      <a 
                        href={store.url}
                        className="bg-white text-gray-900 font-medium px-5 py-2.5 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        Visit Store <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">{store.name}</h3>
                    
                    <div className="mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent/20">
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
                    
                    <div className="relative overflow-hidden">
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        "{store.creator.quote.length > 100 
                          ? `${store.creator.quote.substring(0, 100)}...` 
                          : store.creator.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div 
                className={`w-[320px] bg-gradient-to-br from-muted/30 to-white rounded-xl border-2 border-dashed border-accent/30 overflow-hidden flex flex-col items-center justify-center p-8 group hover:border-accent/60 transition-all duration-300 ${
                  isVisible 
                    ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${300 + stores.length * 150}` 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <PlusCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Start Your Store</h3>
                <p className="text-gray-600 text-center mb-6">Join thousands of successful creators</p>
                <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-6">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreShowcase;
