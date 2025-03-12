
import { useIntersectionObserver } from '@/lib/animations';
import { CheckCircle, Zap, Clock, CreditCard, Package, Users, Store, Webhook, FileText, Calendar, Boxes, Repeat, BarChart3, MessageCircle } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  isVisible, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  isVisible: boolean; 
  delay: number 
}) => (
  <div 
    className={`backdrop-blur-xl bg-white/50 rounded-2xl p-6 border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:bg-white/60 ${
      isVisible ? `animate-fade-in animation-delay-${delay}` : 'opacity-0'
    }`}
  >
    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const WhyCarteFeatures = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  const features = [
    {
      icon: <Zap className="text-accent" size={24} />,
      title: "Priority Payout Processing",
      description: "Get paid faster with 2-day fund processing on Growth plans and above, compared to 5 days on our free plan."
    },
    {
      icon: <CreditCard className="text-accent" size={24} />,
      title: "Multiple Payment Gateways",
      description: "Accept payments via PayPal, Stripe, Bank Transfer, and Cash on Delivery (subscription plans only)."
    },
    {
      icon: <Package className="text-accent" size={24} />,
      title: "Delivery Options",
      description: "Offer self-collection and delivery with scheduling on paid plans."
    },
    {
      icon: <FileText className="text-accent" size={24} />,
      title: "Custom Order Forms",
      description: "Create unique forms for each product to collect exactly the information you need."
    },
    {
      icon: <Calendar className="text-accent" size={24} />,
      title: "Scheduled Releases",
      description: "Plan and automate your product launches with our scheduling tool (Starter plan and above)."
    },
    {
      icon: <Boxes className="text-accent" size={24} />,
      title: "Advanced Inventory",
      description: "Manage complex inventory with attributes, variations, and bulk management tools."
    },
    {
      icon: <Repeat className="text-accent" size={24} />,
      title: "Automation Tools",
      description: "Save time with order duplication and workflow automation (Growth plan and above)."
    },
    {
      icon: <Users className="text-accent" size={24} />,
      title: "Team Management",
      description: "Add team members - 3 on Growth plan, up to 15 on Pro plan."
    },
    {
      icon: <Store className="text-accent" size={24} />,
      title: "Multi-Store Functionality",
      description: "Manage up to 5 stores under one account with our Pro plan."
    },
    {
      icon: <Webhook className="text-accent" size={24} />,
      title: "API Access",
      description: "Basic API access for all plans, with full custom integrations on Pro plan."
    },
    {
      icon: <BarChart3 className="text-accent" size={24} />,
      title: "Advanced Analytics",
      description: "Gain deeper insights with comprehensive reporting on Pro plan."
    },
    {
      icon: <MessageCircle className="text-accent" size={24} />,
      title: "Premium Support",
      description: "Get priority chat and email support with our Pro plan."
    }
  ];

  return (
    <section className="py-20 bg-carteBackground" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'}`}>
            Everything You Need to Succeed
          </h2>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
            From payment processing to team management, Carte provides all the tools you need to run your creative business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isVisible={isVisible}
              delay={300 + index * 50}
            />
          ))}
        </div>

        <div className={`mt-16 backdrop-blur-xl bg-white/50 rounded-2xl p-8 border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${isVisible ? 'animate-fade-in animation-delay-900' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <CheckCircle className="text-green-500 w-16 h-16" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">The Only Platform That Grows With You</h3>
              <p className="text-gray-600">
                Start for free and upgrade when it makes sense. Unlike other platforms with fixed high fees, 
                Carte offers flexible plans that adapt to your business growth. Our pricing is designed to help 
                you keep more of your earnings as you scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCarteFeatures;
