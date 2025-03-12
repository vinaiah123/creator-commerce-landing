
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
        "w-[320px] backdrop-blur-lg bg-white/50 rounded-xl border border-white/30 overflow-hidden flex flex-col items-center justify-center p-8 group hover:bg-white/60 transition-all duration-300",
        isVisible 
          ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${delay}` 
          : 'opacity-0 translate-y-10'
      )}
    >
      <div className="w-16 h-16 rounded-full bg-accent/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <PlusCircle className="w-8 h-8 text-accent" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Start Your Store</h3>
      <p className="text-gray-600 text-center mb-6">Join thousands of successful creators</p>
      <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl px-6 py-6 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        Get Started
      </Button>
    </div>
  );
};

export default GetStartedCard;
