
import { useState, useEffect } from "react";
import { ChevronRight, ExternalLink, Star, Sparkles, Images } from "lucide-react";
import { Store } from "@/types/store";

interface FeaturedStoreProps {
  store: Store;
}

const FeaturedStore = ({ store }: FeaturedStoreProps) => {
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) return;
    
    const featuredStore = store;
    if (!featuredStore?.additionalImages?.length) return;
    
    const imageCount = featuredStore.additionalImages.length + 1; // +1 for the main image
    
    const interval = setInterval(() => {
      setFeaturedImageIndex(prev => (prev + 1) % imageCount);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovering, store]);

  const handleNextImage = () => {
    if (!store?.additionalImages?.length) return;
    
    const imageCount = store.additionalImages.length + 1;
    setFeaturedImageIndex(prev => (prev + 1) % imageCount);
  };

  return (
    <div 
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
            {[store.image, ...(store.additionalImages || [])].map((_, idx) => (
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
            <ChevronRight className="w-5 h-5" />
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
  );
};

export default FeaturedStore;
