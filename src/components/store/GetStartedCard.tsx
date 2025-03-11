
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GetStartedCardProps {
  isVisible: boolean;
  delay: number;
}

const GetStartedCard = ({ isVisible, delay }: GetStartedCardProps) => {
  return (
    <div 
      className={cn(
        "w-[320px] bg-gradient-to-br from-muted/30 to-white rounded-xl border-2 border-dashed border-accent/30 overflow-hidden flex flex-col items-center justify-center p-8 group hover:border-accent/60 transition-all duration-300",
        isVisible 
          ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${delay}` 
          : 'opacity-0 translate-y-10'
      )}
    >
      {/* Creator image */}
      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-carteYellow/20 rounded-full blur-lg transform scale-110"></div>
        <img 
          src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=200&auto=format" 
          alt="Become a Creator" 
          className="w-20 h-20 rounded-full object-cover border-2 border-white"
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Start Your Store</h3>
      <p className="text-gray-600 text-center mb-6">Join thousands of successful creators</p>
      <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 flex items-center gap-2">
        <PlusCircle className="w-4 h-4" />
        Get Started
      </Button>
      
      {/* Mini creator faces */}
      <div className="mt-8 flex justify-center">
        <div className="flex -space-x-2">
          <img 
            src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=100&auto=format" 
            alt="Creator" 
            className="w-6 h-6 rounded-full border border-white"
          />
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format" 
            alt="Creator" 
            className="w-6 h-6 rounded-full border border-white"
          />
          <img 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format" 
            alt="Creator" 
            className="w-6 h-6 rounded-full border border-white"
          />
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format" 
            alt="Creator" 
            className="w-6 h-6 rounded-full border border-white"
          />
          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center border border-white">
            <span className="text-[10px] font-medium text-accent">+28</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedCard;
