
import { ExternalLink, Star } from "lucide-react";
import { Store } from "@/types/store";
import { cn } from "@/lib/utils";

interface StoreCardProps {
  store: Store;
  isVisible: boolean;
  index: number;
  activeStore: string | null;
  setActiveStore: (id: string | null) => void;
}

const StoreCard = ({ store, isVisible, index, activeStore, setActiveStore }: StoreCardProps) => {
  const isActive = activeStore === store.id;
  
  return (
    <div 
      className={cn(
        "w-[320px] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden group hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-all duration-500",
        isVisible 
          ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${300 + index * 150}` 
          : 'opacity-0 translate-y-10'
      )}
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
        
        {/* Creator floating image */}
        <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden z-10 transform transition-transform duration-300 group-hover:scale-110">
          <img 
            src={store.creator.avatar}
            alt={store.creator.name}
            className="w-full h-full object-cover"
          />
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
      
      <div className="p-6 pt-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent transition-colors">{store.name}</h3>
          
          {/* Creator badge */}
          <div className="bg-accent/10 text-accent text-xs rounded-full px-2 py-0.5">
            Creator
          </div>
        </div>
        
        <div className="mb-4 flex items-center gap-3">
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
        
        {/* Additional images preview */}
        {store.additionalImages && store.additionalImages.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-hidden">
            {store.additionalImages.slice(0, 2).map((img, i) => (
              <div key={i} className="w-16 h-16 rounded-md overflow-hidden">
                <img src={img} alt={`${store.name} additional ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {store.additionalImages.length > 2 && (
              <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-500">+{store.additionalImages.length - 2}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreCard;
