
import { useIntersectionObserver } from '@/lib/animations';
import { Calendar, Flag, Lightbulb, Users, Award, ArrowUpRight } from 'lucide-react';

const TimelineItem = ({ 
  year, 
  title, 
  description, 
  icon, 
  isVisible, 
  delay 
}: { 
  year: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  isVisible: boolean; 
  delay: number;
}) => (
  <div className={`relative pl-10 pb-10 border-l-2 border-cartePink last:border-0 ${isVisible ? `animate-fade-in animation-delay-${delay}` : 'opacity-0'}`}>
    <div className="absolute left-[-8px] top-0 w-4 h-4 bg-carteYellow rounded-full border-2 border-cartePink" />
    <div className="flex items-center mb-2">
      <div className="mr-3 text-carteYellow font-bold">{year}</div>
      <div className="bg-carteYellow/20 p-1 rounded-full">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const OurStoryTimeline = () => {
  const {
    elementRef,
    isVisible
  } = useIntersectionObserver();

  const timelineData = [
    {
      year: '2021',
      title: 'The Idea',
      description: 'Frustrated by high fees and complicated platforms, we envisioned a simpler, more affordable way for creators to sell online.',
      icon: <Lightbulb size={20} className="text-carteYellow" />
    },
    {
      year: '2022',
      title: 'Carte is Born',
      description: 'We launched our beta with a small group of creators who helped shape our platform with valuable feedback.',
      icon: <Calendar size={20} className="text-carteYellow" />
    },
    {
      year: '2022',
      title: 'Growing Community',
      description: 'Our creator community expanded rapidly as word spread about our creator-friendly pricing and easy-to-use platform.',
      icon: <Users size={20} className="text-carteYellow" />
    },
    {
      year: '2023',
      title: 'Major Milestones',
      description: 'We celebrated helping creators earn millions in revenue while saving them thousands in fees.',
      icon: <Flag size={20} className="text-carteYellow" />
    },
    {
      year: 'Today',
      title: 'Continuing the Journey',
      description: 'With thousands of creators and growing, we continue to innovate and improve the platform every day.',
      icon: <Award size={20} className="text-carteYellow" />
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-carteBackground">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto" ref={elementRef as React.RefObject<HTMLDivElement>}>
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a simple idea to a thriving platform, here's how Carte has evolved.
            </p>
          </div>
          
          <div className="ml-4">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                year={item.year}
                title={item.title}
                description={item.description}
                icon={item.icon}
                isVisible={isVisible}
                delay={(index + 1) * 100}
              />
            ))}
          </div>
          
          <div className={`mt-12 text-center ${isVisible ? 'animate-fade-in animation-delay-600' : 'opacity-0'}`}>
            <a 
              href="#join-us" 
              className="inline-flex items-center text-carteBlue font-bold hover:text-cartePink transition-colors"
            >
              Join us on our next chapter
              <ArrowUpRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryTimeline;
