
import { ArrowRight, Heart, Instagram } from 'lucide-react';
import { useState } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { useIsDesktop } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const InstagramFeed = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const isDesktop = useIsDesktop();
  const [posts] = useState([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1662036625997-069dd13e70ba?q=80&w=1974&auto=format&fit=crop',
      likes: 217,
      caption: 'Helping small businesses thrive with our all-in-one ecommerce platform. Start selling online today with Carte! #ecommerce #smallbusiness',
      date: '2024-05-15'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1661956602926-db6b25f75947?q=80&w=1942&auto=format&fit=crop',
      likes: 189,
      caption: 'New feature alert! 🚀 We\'ve just launched our advanced analytics dashboard to help you understand your customers better. #carteapp #digitalmarketing',
      date: '2024-05-01'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1664575599618-8f6bd76fc670?q=80&w=2070&auto=format&fit=crop',
      likes: 246,
      caption: 'Meet Sarah, who turned her handcrafted jewelry business into a six-figure success story with Carte! Read her full story in our latest blog post (link in bio).',
      date: '2024-04-22'
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
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <div className="aspect-square overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={`Instagram post ${post.id}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Heart className="h-4 w-4 text-cartePink-500" />
                  <span className="text-sm text-gray-600">{post.likes} likes</span>
                </div>
                <p className="text-sm text-gray-800 line-clamp-3 mb-3">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            asChild
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cartePink to-carteYellow rounded-full text-white font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <a 
              href="https://www.instagram.com/carteapp.io" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>View More on Instagram</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
