
import { useIntersectionObserver } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imgUrl: string;
};

const TeamMemberCard = ({
  member,
  isVisible,
  delay
}: {
  member: TeamMember;
  isVisible: boolean;
  delay: number;
}) => (
  <div className={`bg-white p-6 rounded-xl kawaii-border shadow-sm ${isVisible ? `animate-fade-in animation-delay-${delay}` : 'opacity-0'}`}>
    <div className="mb-4 relative">
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden kawaii-border">
        <img src={member.imgUrl} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-0 right-0 transform translate-x-1/4 w-8 h-8 bg-carteYellow rounded-full flex items-center justify-center kawaii-shadow">
        <span className="text-sm font-bold">✨</span>
      </div>
    </div>
    <h3 className="text-xl font-bold mb-1 text-center">{member.name}</h3>
    <p className="text-cartePink font-medium text-sm mb-4 text-center">{member.role}</p>
    <p className="text-gray-600 text-center">{member.bio}</p>
  </div>
);

const OurStoryTeam = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const navigate = useNavigate();
  
  const teamData: TeamMember[] = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Passionate about empowering creators to turn their passion into profit without the high fees.',
      imgUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80'
    }, 
    {
      name: 'Jamie Taylor',
      role: 'Chief Product Officer',
      bio: 'Obsessed with creating intuitive products that make e-commerce accessible to everyone.',
      imgUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=300&q=80'
    }, 
    {
      name: 'Sam Rivera',
      role: 'Head of Creator Success',
      bio: 'Dedicated to helping creators navigate their online journey and achieve their goals.',
      imgUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80'
    }
  ];
  
  const handleJoinUs = () => {
    navigate('/pricing');
  };

  return (
    <section className="py-20 bg-carteBackground" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Meet the Carte Team
          </h2>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
            We're a small team with a big mission: helping creators and small businesses thrive online.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamData.map((member, index) => (
            <TeamMemberCard 
              key={index} 
              member={member} 
              isVisible={isVisible} 
              delay={(index + 1) * 100} 
            />
          ))}
        </div>
        
        <div className={`text-center ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
          <h3 className="text-2xl font-bold mb-4">Join Us on Our Journey</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're just getting started. Help us build the future of e-commerce for independent creators.
          </p>
          <Button 
            onClick={handleJoinUs}
            size="lg" 
            className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900"
          >
            Start Selling Today
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurStoryTeam;
