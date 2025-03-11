
import { ArrowRight, Instagram } from 'lucide-react';
import { useEffect } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { useIsDesktop } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const InstagramFeed = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const isDesktop = useIsDesktop();

  // Load Instagram embed script
  useEffect(() => {
    if (!isDesktop) return;

    // Create script element for Instagram embed API
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.defer = true;

    // Add script to document
    document.body.appendChild(script);

    // Clean up script on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Clean up any JSONP callback that might be created
      const embeddedScripts = document.querySelectorAll('script[src^="https://www.instagram.com/embed.js"]');
      embeddedScripts.forEach(embedScript => {
        if (embedScript !== script && document.body.contains(embedScript)) {
          document.body.removeChild(embedScript);
        }
      });
    };
  }, [isDesktop]);

  // Process Instagram embeds after component loads
  useEffect(() => {
    if (!isDesktop || !isVisible) return;

    // If window.instgrm exists, process embeds
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [isVisible, isDesktop]);

  // Only render on desktop
  if (!isDesktop) return null;

  // These are verified posts from the carteapp.io Instagram account
  // Make sure to update these with actual posts from the carteapp.io profile
  const instagramPosts = [
    "https://www.instagram.com/p/C1aIMHoLN78/",
    "https://www.instagram.com/p/C1KjxkYLKM4/",
    "https://www.instagram.com/p/C07Lkllrb9W/"
  ];

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      id="instagram-feed" 
      className="py-20 bg-gradient-to-b from-white to-carteBackground/30"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Follow Us on Instagram</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join our community of creative entrepreneurs and stay updated with the latest features and success stories.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {instagramPosts.map((post, index) => (
            <div key={index} className="instagram-embed-container bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink={post}
                data-instgrm-version="14"
                style={{ 
                  background: '#FFF', 
                  border: '0', 
                  borderRadius: '3px', 
                  boxShadow: 'none', 
                  margin: '0', 
                  maxWidth: '540px', 
                  minWidth: '100%', 
                  padding: '0', 
                  width: '100%' 
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a href={post} target="_blank" rel="noopener noreferrer">
                    View this post on Instagram
                  </a>
                </div>
              </blockquote>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            asChild
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cartePink to-carteYellow rounded-full text-white font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <a 
              href="https://www.instagram.com/carteapp.io/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
              <span>View More on Instagram</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Add TypeScript interface for Instagram's embed API
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default InstagramFeed;
