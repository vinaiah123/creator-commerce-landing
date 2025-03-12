
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
  return (
    <div 
      className={cn(
        "w-[320px] backdrop-blur-lg bg-white/70 rounded-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden group hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-all duration-500",
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
        <div className="absolute top-4 left-4 backdrop-blur-md bg-white/40 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
          {store.category}
        </div>
        <div className="absolute top-4 right-4 backdrop-blur-md bg-white/40 px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-carteYellow stroke-carteYellow" />
          <span className="text-xs font-semibold">{store.rating}</span>
        </div>
        
        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300`}>
          <a 
            href={store.url}
            className="backdrop-blur-md bg-white/70 text-gray-900 font-medium px-5 py-2.5 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-white/90"
          >
            Visit Store <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="p-6 backdrop-blur-lg bg-white/30">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">{store.name}</h3>
        
        <div className="mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/50">
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
  );
};

export default StoreCard;
