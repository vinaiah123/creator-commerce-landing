
import { useIntersectionObserver } from '../lib/animations';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Link as LinkIcon, CreditCard, MessageSquare, Palette, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
  color: string;
  index: number;
  isMobile: boolean;
}

const FeatureCard = ({ icon, title, description, delay, isVisible, color, index, isMobile }: FeatureCardProps) => {
  return (
    <div 
      className={`bg-white rounded-3xl p-5 kawaii-shadow kawaii-border border-${color}/30 hover:border-${color}/60 ${
        isMobile 
          ? `feature-card-mobile-${index % 6}`
          : isVisible 
            ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${delay} hover:translate-y-[-8px]` 
            : 'opacity-0 translate-y-10'
      }`}
    >
      <div className={`w-10 h-10 bg-${color}/20 rounded-xl flex items-center justify-center text-${color} mb-2 animate-bounce-small`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-xs">{description}</p>
    </div>
  );
};

const Features = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const featureContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Reset animations when we scroll into view on mobile
  useEffect(() => {
    if (isVisible && isMobile && featureContainerRef.current) {
      const cards = featureContainerRef.current.querySelectorAll('.features-mobile-container > div');
      cards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.animation = 'none';
        htmlCard.offsetHeight; // Trigger reflow
        htmlCard.style.animation = '';
        htmlCard.classList.remove(`feature-card-mobile-${index % 6}`);
        setTimeout(() => {
          htmlCard.classList.add(`feature-card-mobile-${index % 6}`);
        }, 10);
      });
    }
  }, [isVisible, isMobile]);

  const features = [
    {
      icon: <ShoppingBag size={20} />,
      title: "Online Shop",
      description: "Create a beautiful online shop to showcase your products. No technical skills needed to get started quickly.",
      color: "cartePink"
    },
    {
      icon: <LinkIcon size={20} />,
      title: "Link in Bio",
      description: "Centralize all your social media links in one customizable page. Boost your conversion with a professional link hub.",
      color: "carte"
    },
    {
      icon: <CreditCard size={20} />,
      title: "Multiple Payments",
      description: "Accept payments through PayPal, Stripe and more. Give your customers flexibility with various payment options.",
      color: "carteBlue"
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Customer Reviews",
      description: "Let customers leave reviews to build trust with future shoppers. Showcase positive experiences to increase sales.",
      color: "cartePink"
    },
    {
      icon: <Palette size={20} />,
      title: "Custom Themes",
      description: "Choose from dozens of kawaii themes or create your own. Match your brand's unique style with customizable options.",
      color: "carte"
    },
    {
      icon: <Globe size={20} />,
      title: "Global Shipping",
      description: "Set up international shipping rates to sell worldwide. Expand your reach to customers across the globe easily.",
      color: "carteBlue"
    }
  ];

  const handleViewAllFeatures = () => {
    navigate('/features');
  };

  return (
    <section 
      id="features" 
      className="py-20 bg-carteBackground-dark"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span 
            className={`inline-block bg-white text-cartePink px-4 py-1.5 rounded-full text-sm font-bold mb-4 kawaii-shadow ${
              isVisible ? 'animate-float' : 'opacity-0'
            }`}
          >
            <Sparkles size={14} className="inline mr-1" />
            CUTE FEATURES
          </span>
          <h2 
            className={`text-2xl md:text-3xl font-bold text-gray-900 mb-4 ${
              isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'
            }`}
          >
            Everything You Need to Create
          </h2>
          <p 
            className={`text-base text-gray-600 max-w-xl mx-auto ${
              isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
            }`}
          >
            Our platform provides all the tools you need to grow your handmade business with a touch of magic.
          </p>
        </div>
        
        <div 
          ref={featureContainerRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
            isMobile ? 'features-mobile-container overflow-hidden' : ''
          }`}
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={(index % 3 + 1) * 100}
              isVisible={isVisible}
              color={feature.color}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button 
            variant="outline" 
            className="bg-white border-carteYellow text-carteYellow hover:bg-carteYellow hover:text-gray-900 transition-all duration-300 kawaii-shadow"
            onClick={handleViewAllFeatures}
          >
            View All Features
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
