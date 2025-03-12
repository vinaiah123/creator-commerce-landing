
import { useIntersectionObserver } from '@/lib/animations';
import { Heart, ShieldCheck, Zap, Users, MessageSquare, HandHeart } from 'lucide-react';

const ValueCard = ({ 
  title, 
  description, 
  icon, 
  isVisible, 
  delay 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  isVisible: boolean; 
  delay: number;
}) => (
  <div className={`bg-white p-6 rounded-xl kawaii-border shadow-sm ${isVisible ? `animate-fade-in animation-delay-${delay}` : 'opacity-0'}`}>
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const OurStoryValues = () => {
  const {
    elementRef,
    isVisible
  } = useIntersectionObserver();

  const valuesData = [
    {
      title: 'Transparency',
      description: 'We believe in clear, straightforward pricing with no hidden fees or surprises.',
      icon: <ShieldCheck size={24} className="text-carteBlue" />
    },
    {
      title: 'Simplicity',
      description: 'We make selling online easy and accessible for everyone, regardless of technical expertise.',
      icon: <Zap size={24} className="text-carteYellow" />
    },
    {
      title: 'Community',
      description: 'We value our vibrant community of creators and prioritize their needs and feedback.',
      icon: <Users size={24} className="text-carteBlue" />
    },
    {
      title: 'Support',
      description: 'We provide responsive, human support to help creators succeed on our platform.',
      icon: <MessageSquare size={24} className="text-cartePink" />
    },
    {
      title: 'Fairness',
      description: 'We design our pricing to be fair for creators at all stages of their journey.',
      icon: <HandHeart size={24} className="text-carteYellow" />
    },
    {
      title: 'Passion',
      description: 'We genuinely care about creators and are passionate about helping them thrive.',
      icon: <Heart size={24} className="text-cartePink" />
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div ref={elementRef as React.RefObject<HTMLDivElement>}>
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at Carte.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesData.map((value, index) => (
              <ValueCard
                key={index}
                title={value.title}
                description={value.description}
                icon={value.icon}
                isVisible={isVisible}
                delay={(index + 1) * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryValues;
