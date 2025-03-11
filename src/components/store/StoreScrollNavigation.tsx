
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoreScrollNavigationProps {
  scrollLeft: () => void;
  scrollRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

const StoreScrollNavigation = ({
  scrollLeft,
  scrollRight,
  canScrollLeft,
  canScrollRight
}: StoreScrollNavigationProps) => {
  return (
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
  );
};

export default StoreScrollNavigation;
