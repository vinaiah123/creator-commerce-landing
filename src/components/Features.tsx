
import { useIntersectionObserver } from '../lib/animations';
import { useNavigate } from 'react-router-dom';
import { Palette, Globe, Coins, Sparkles, Heart, Star, ArrowRight, ShoppingBag, Link as LinkIcon, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
  color: string;
}

const FeatureCard = ({ icon, title, description, delay, isVisible, color }: FeatureCardProps) => {
  return (
    <div 
      className={`bg-white rounded-3xl p-8 kawaii-shadow kawaii-border border-${color}/30 hover:border-${color}/60 ${
        isVisible 
          ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${delay} hover:translate-y-[-8px]` 
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className={`w-16 h-16 bg-${color}/20 rounded-2xl flex items-center justify-center text-${color} mb-6 animate-bounce-small`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingBag size={32} />,
      title: "Online Shop",
      description: "Create a beautiful online shop to showcase and sell your handmade creations with zero transaction fees.",
      color: "cartePink"
    },
    {
      icon: <LinkIcon size={32} />,
      title: "Link in Bio",
      description: "Centralize all your social media links and content in one beautiful, customizable page.",
      color: "carte"
    },
    {
      icon: <CreditCard size={32} />,
      title: "Multiple Payment Options",
      description: "Accept payments through PayPal, Stripe, bank transfers, and more to make purchasing easy for your customers.",
      color: "carteBlue"
    }
  ];

  const handleViewAllFeatures = () => {
    navigate('/features');
  };

  return (
    <section 
      id="features" 
      className="py-24 bg-carteBackground-dark"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span 
            className={`inline-block bg-white text-cartePink px-4 py-1.5 rounded-full text-sm font-bold mb-4 kawaii-shadow ${
              isVisible ? 'animate-float' : 'opacity-0'
            }`}
          >
            <Sparkles size={14} className="inline mr-1" />
            CUTE FEATURES
          </span>
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${
              isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'
            }`}
          >
            Everything You Need to Create
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto ${
              isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
            }`}
          >
            Our platform is designed specifically for independent creators, providing all the tools you need to grow your handmade business with a touch of magic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={(index + 1) * 100}
              isVisible={isVisible}
              color={feature.color}
            />
          ))}
        </div>

        <div className="text-center mt-12">
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
