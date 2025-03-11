
import { ArrowRight, Heart, Instagram } from 'lucide-react';
import { useState } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { useIsDesktop } from '@/hooks/use-mobile';

const InstagramFeed = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const isDesktop = useIsDesktop();
  const [posts] = useState([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1682687982093-4c2b21f72d4c?q=80&w=2670&auto=format&fit=crop',
      likes: 124,
      caption: 'Exciting new features coming to Carte!',
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1675351066828-6bbd440f8748?q=80&w=2574&auto=format&fit=crop',
      likes: 89,
      caption: 'Meet our talented community of makers',
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1666919643134-d97687c1826c?q=80&w=2487&auto=format&fit=crop',
      likes: 203,
      caption: 'Behind the scenes at Carte HQ',
    }
  ]);

  // Only render on desktop
  if (!isDesktop) return null;

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
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-cartePink-500" />
                  <span className="font-semibold text-sm">carteapp.io</span>
                </div>
              </div>
              <div className="aspect-square overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={`Instagram post ${post.id}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Heart className="h-4 w-4 text-cartePink-500" />
                  <span className="text-sm text-gray-600">{post.likes} likes</span>
                </div>
                <p className="text-sm text-gray-800 line-clamp-2 mb-3">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a 
            href="https://www.instagram.com/carteapp.io?igsh=MWh5dTlqdnpoNHRvag%3D%3D&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cartePink to-carteYellow rounded-full text-white font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <span>View More on Instagram</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
