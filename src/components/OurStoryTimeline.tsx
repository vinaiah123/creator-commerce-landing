import { useIntersectionObserver } from '@/lib/animations';
import { Calendar, Flag, Lightbulb, Users, Award, ArrowUpRight, Home, ShoppingBag, Rocket, Zap, Globe, MessageSquare, CreditCard } from 'lucide-react';
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
}) => <div className={`relative pl-10 pb-10 border-l-2 border-cartePink last:border-0 ${isVisible ? `animate-fade-in animation-delay-${delay}` : 'opacity-0'}`}>
    <div className="absolute left-[-8px] top-0 w-4 h-4 bg-carteYellow rounded-full border-2 border-cartePink" />
    <div className="flex items-center mb-2">
      <div className="mr-3 text-carteYellow font-bold">{year}</div>
      <div className="bg-carteYellow/20 p-1 rounded-full">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>;
const OurStoryTimeline = () => {
  const {
    elementRef,
    isVisible
  } = useIntersectionObserver();
  const timelineData = [{
    year: '2020',
    title: 'COVID-19 Insight',
    description: 'During the pandemic, we noticed a sharp increase in home-based businesses in Singapore struggling with manual order collection through Instagram DMs and Google Forms.',
    icon: <Home size={20} className="text-carteYellow" />
  }, {
    year: '2020',
    title: 'The Gap in the Market',
    description: 'We identified unique challenges for small businesses that were overlooked: customer engagement, product reviews, P2P payments, and customizability.',
    icon: <Lightbulb size={20} className="text-carteYellow" />
  }, {
    year: '2021',
    title: 'Carte Concept',
    description: 'We began developing Carte as a user-centric solution that would take just minutes to set up, allowing small businesses to focus on growth.',
    icon: <ShoppingBag size={20} className="text-carteYellow" />
  }, {
    year: '2021',
    title: 'Early Prototype',
    description: 'We built our first working prototype focused on simplicity and solving the pain points of small business owners.',
    icon: <Rocket size={20} className="text-carteYellow" />
  }, {
    year: '2022',
    title: 'Launch in Singapore',
    description: 'Carte officially launched in Singapore, offering local businesses a simple way to start selling online without technical barriers.',
    icon: <Calendar size={20} className="text-carteYellow" />
  }, {
    year: '2022',
    title: 'Customer Feedback Loop',
    description: 'We implemented a robust feedback system to continuously improve the platform based on real user experiences and needs.',
    icon: <MessageSquare size={20} className="text-carteYellow" />
  }, {
    year: '2022',
    title: 'Payment Integration',
    description: 'We expanded our payment options to better serve the needs of small businesses, making transactions seamless for both merchants and customers.',
    icon: <CreditCard size={20} className="text-carteYellow" />
  }, {
    year: '2023',
    title: 'International Expansion',
    description: 'Carte began serving businesses beyond Singapore, helping small entrepreneurs worldwide establish their online presence quickly.',
    icon: <Globe size={20} className="text-carteYellow" />
  }, {
    year: '2023',
    title: 'Feature Enhancement',
    description: 'We added robust analytics, marketing tools, and customization options to help our users grow their businesses effectively.',
    icon: <Zap size={20} className="text-carteYellow" />
  }, {
    year: '2023',
    title: 'Growing Community',
    description: 'Our creator community expanded rapidly as word spread about our business-friendly pricing and easy-to-use platform.',
    icon: <Users size={20} className="text-carteYellow" />
  }, {
    year: '2024',
    title: 'Major Milestones',
    description: 'We celebrated helping businesses earn millions in revenue while saving them thousands in fees and countless hours in setup time.',
    icon: <Flag size={20} className="text-carteYellow" />
  }, {
    year: 'Today',
    title: 'Continuing the Journey',
    description: 'With thousands of businesses trusting Carte, we remain focused on our mission to provide the most sensible starting point for small businesses to thrive online.',
    icon: <Award size={20} className="text-carteYellow" />
  }];
  return <div className="py-16 md:py-24 bg-carteBackground">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto" ref={elementRef as React.RefObject<HTMLDivElement>}>
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From identifying a gap in the market to creating a platform that helps small businesses thrive, here's how Carte has evolved.
            </p>
          </div>
          
          <div className="ml-4">
            {timelineData.map((item, index) => <TimelineItem key={index} year={item.year} title={item.title} description={item.description} icon={item.icon} isVisible={isVisible} delay={(index + 1) * 100} />)}
          </div>
          
          <div className={`mt-12 text-center ${isVisible ? 'animate-fade-in animation-delay-600' : 'opacity-0'}`}>
            
          </div>
        </div>
      </div>
    </div>;
};
export default OurStoryTimeline;