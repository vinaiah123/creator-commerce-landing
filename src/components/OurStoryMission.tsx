
import { useIntersectionObserver } from '@/lib/animations';
import { Sprout, Users, Zap } from 'lucide-react';

const OurStoryMission = () => {
  const {
    elementRef,
    isVisible
  } = useIntersectionObserver();

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto" ref={elementRef as React.RefObject<HTMLDivElement>}>
          <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              At Carte, we're on a mission to provide a sensible and reliable starting point for small businesses to thrive online through user-centric design.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`bg-carteBackground p-6 rounded-xl kawaii-border ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-carteYellow rounded-full flex items-center justify-center mb-4">
                <Zap size={24} className="text-gray-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Setup</h3>
              <p className="text-gray-600">
                We believe in removing technical barriers for small businesses, allowing them to set up their online shop in just minutes with no technical skills required.
              </p>
            </div>
            
            <div className={`bg-carteBackground p-6 rounded-xl kawaii-border ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-cartePink rounded-full flex items-center justify-center mb-4">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">User-Centric</h3>
              <p className="text-gray-600">
                We focus on the unique challenges of small businesses: customer engagement, product reviews, payments, and customizability that other platforms overlook.
              </p>
            </div>
            
            <div className={`bg-carteBackground p-6 rounded-xl kawaii-border ${isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-carteBlue rounded-full flex items-center justify-center mb-4">
                <Sprout size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Business Growth</h3>
              <p className="text-gray-600">
                We're committed to helping small businesses focus on what matters most - building and growing their business, not managing complicated technology.
              </p>
            </div>
          </div>
          
          <div className={`mt-12 p-6 bg-muted rounded-xl text-center ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
            <p className="text-lg italic">
              "It literally takes a few minutes to build a Carte shop, so you can focus on what's important - building your business."
            </p>
            <p className="mt-2 font-bold">— The Carte Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryMission;
