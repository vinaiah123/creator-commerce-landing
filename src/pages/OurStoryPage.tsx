
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRef, useEffect } from 'react';
import OurStoryHero from '@/components/OurStoryHero';
import OurStoryTimeline from '@/components/OurStoryTimeline';
import OurStoryValues from '@/components/OurStoryValues';
import OurStoryTeam from '@/components/OurStoryTeam';
import OurStoryMission from '@/components/OurStoryMission';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

const OurStoryPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      if (pageRef.current) {
        pageRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" ref={pageRef}>
      <Navbar />
      
      <main className="flex-grow pt-20 bg-carteBackground">
        <OurStoryHero />
        <OurStoryMission />
        <OurStoryTimeline />
        <OurStoryValues />
        <OurStoryTeam />
        
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 kawaii-border shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Us on Our Journey</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're building the future of creator commerce together. Start your Carte journey today and be part of our story.
            </p>
            <Button size="lg" className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900 px-8 py-6 h-auto rounded-xl font-bold transition-all duration-300 hover:-translate-y-1">
              Start Selling Today
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <div className="mt-6 flex items-center justify-center text-cartePink">
              <Heart size={16} className="mr-2 animate-float" fill="currentColor" />
              <span className="text-sm font-medium">Made with love for creators</span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OurStoryPage;
