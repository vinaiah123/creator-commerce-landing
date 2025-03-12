import { useIntersectionObserver } from '@/lib/animations';
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
}) => <div className={`bg-white p-6 rounded-xl kawaii-border shadow-sm ${isVisible ? `animate-fade-in animation-delay-${delay}` : 'opacity-0'}`}>
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
  </div>;
const OurStoryTeam = () => {
  const {
    elementRef,
    isVisible
  } = useIntersectionObserver();
  const teamData: TeamMember[] = [{
    name: 'Alex Chen',
    role: 'Founder & CEO',
    bio: 'Passionate about empowering creators to turn their passion into profit without the high fees.',
    imgUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80'
  }, {
    name: 'Jamie Taylor',
    role: 'Chief Product Officer',
    bio: 'Obsessed with creating intuitive products that make e-commerce accessible to everyone.',
    imgUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=300&q=80'
  }, {
    name: 'Sam Rivera',
    role: 'Head of Creator Success',
    bio: 'Dedicated to helping creators navigate their online journey and achieve their goals.',
    imgUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80'
  }];
  return;
};
export default OurStoryTeam;