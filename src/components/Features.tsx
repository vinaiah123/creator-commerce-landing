
import { useIntersectionObserver } from '../lib/animations';
import { Palette, Globe, Coins } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
}

const FeatureCard = ({ icon, title, description, delay, isVisible }: FeatureCardProps) => {
  return (
    <div 
      className={`bg-carteBackground-dark rounded-2xl p-8 hover-lift ${
        isVisible 
          ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${delay}` 
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="w-16 h-16 bg-carte/10 rounded-xl flex items-center justify-center text-carte mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
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
      description: "Keep 100% of your sales. We never take a cut from your transactions, allowing you to maximize your profit margins."
    },
    {
      icon: <Globe size={32} />,
      title: "Easy Setup",
      description: "Launch your online store in minutes with our intuitive dashboard. No coding or design skills required."
    },
    {
      icon: <Palette size={32} />,
      title: "Customizable Storefronts",
      description: "Create a unique shopping experience that matches your brand with fully customizable templates and layouts."
    }
  ];

  return (
    <section 
      id="features" 
      className="py-24 bg-white"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span 
            className={`inline-block bg-carteBackground-dark text-carte px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            PLATFORM FEATURES
          </span>
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${
              isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'
            }`}
          >
            Everything You Need to Succeed
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto ${
              isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
            }`}
          >
            Our platform is designed specifically for independent creators, providing all the tools you need to grow your handmade business.
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
