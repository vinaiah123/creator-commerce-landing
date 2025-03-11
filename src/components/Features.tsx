
import { useIntersectionObserver } from '../lib/animations';
import { Palette, Globe, Coins, Sparkles, Heart, Star } from 'lucide-react';

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

  const features = [
    {
      icon: <Coins size={32} />,
      title: "Zero Fees",
      description: "Keep 100% of your sales. We never take a cut from your transactions, allowing you to maximize your profit margins.",
      color: "cartePink"
    },
    {
      icon: <Star size={32} />,
      title: "Easy Setup",
      description: "Launch your online store in minutes with our intuitive dashboard. No coding or design skills required.",
      color: "carte"
    },
    {
      icon: <Heart size={32} />,
      title: "Customizable Storefronts",
      description: "Create a unique shopping experience that matches your brand with fully customizable templates and layouts.",
      color: "carteBlue"
    }
  ];

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
      </div>
    </section>
  );
};

export default Features;
