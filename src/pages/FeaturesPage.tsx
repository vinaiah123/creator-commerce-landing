import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShoppingBag, Link, Palette, Ticket, CreditCard, Users, 
  Package, Tags, Store, Webhook, FileDigit, Filter, 
  Copy, MessageCircleQuestion, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  color: string;
}

const FeatureCard = ({ icon, title, description, delay, color }: FeatureCardProps) => {
  return (
    <div 
      className={`bg-white rounded-3xl p-6 kawaii-shadow kawaii-border border-${color}/30 hover:border-${color}/60 opacity-100 translate-y-0 transition-all duration-700 ease-out hover:translate-y-[-8px]`}
    >
      <div className={`w-14 h-14 bg-${color}/20 rounded-2xl flex items-center justify-center text-${color} mb-3 animate-bounce-small`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const FeaturesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'store', name: 'Store Features' },
    { id: 'payment', name: 'Payment' },
    { id: 'product', name: 'Products' },
    { id: 'team', name: 'Team & Management' }
  ];

  const allFeatures = [
    {
      icon: <ShoppingBag size={28} />,
      title: "Shop",
      description: "Create a beautiful online shop to showcase and sell your handmade creations with zero transaction fees. Set up your product catalog and start selling in minutes.",
      category: "store",
      color: "cartePink"
    },
    {
      icon: <Link size={28} />,
      title: "Link in Bio",
      description: "Centralize all your social media links and content in one beautiful, customizable page. Perfect for Instagram and TikTok creators looking to drive traffic.",
      category: "store",
      color: "carte"
    },
    {
      icon: <Palette size={28} />,
      title: "Theming",
      description: "Choose from beautiful themes or create your own to perfectly match your brand's aesthetic. Customize colors, fonts, and layouts without any coding.",
      category: "store",
      color: "carteBlue"
    },
    {
      icon: <Ticket size={28} />,
      title: "Coupons",
      description: "Create and manage discount codes to run promotions and reward your customers. Set up percentage or fixed amount discounts with expiration dates.",
      category: "payment",
      color: "cartePink"
    },
    {
      icon: <CreditCard size={28} />,
      title: "Payment Gateways",
      description: "Accept payments through multiple gateways including PayPal, Stripe, bank transfers, and COD. Offer your customers their preferred payment methods.",
      category: "payment",
      color: "carte"
    },
    {
      icon: <Users size={28} />,
      title: "Team Members",
      description: "Add team members with specific permissions to help manage your store efficiently. Perfect for growing businesses with multiple collaborators.",
      category: "team",
      color: "carteBlue"
    },
    {
      icon: <Package size={28} />,
      title: "Inventory Management",
      description: "Track stock levels, set low stock alerts, and manage product availability. Never oversell items or disappoint customers with out-of-stock products.",
      category: "product",
      color: "carte"
    },
    {
      icon: <Tags size={28} />,
      title: "Product Attributes/Tags",
      description: "Organize products with custom attributes and tags for better browsing experience. Help customers find exactly what they're looking for with smart categorization.",
      category: "product",
      color: "cartePink"
    },
    {
      icon: <Store size={28} />,
      title: "Multi-Store Functionality",
      description: "Run multiple storefronts from a single dashboard, each with its own branding and products. Perfect for creators with multiple brands or product lines.",
      category: "store",
      color: "carteBlue"
    },
    {
      icon: <Webhook size={28} />,
      title: "Webhooks",
      description: "Automate real-time communication with other services and apps for seamless integration. Connect your store with your favorite tools and automate workflows.",
      category: "team",
      color: "carte"
    },
    {
      icon: <FileDigit size={28} />,
      title: "Digital Products",
      description: "Sell ebooks, music, software, and other digital goods with secure delivery. Automated fulfillment lets you earn while you sleep with instant downloads.",
      category: "product",
      color: "cartePink"
    },
    {
      icon: <Filter size={28} />,
      title: "Product Filters & Attributes",
      description: "Help customers find exactly what they need with customizable filters. Create a smooth shopping experience with advanced search and filtering options.",
      category: "product",
      color: "carteBlue"
    },
    {
      icon: <Copy size={28} />,
      title: "Duplicate Orders",
      description: "Speed up repeat purchases with one-click order duplication for returning customers. Make it easy for loyal customers to reorder their favorite items.",
      category: "payment",
      color: "carte"
    },
    {
      icon: <MessageCircleQuestion size={28} />,
      title: "Product FAQ Plugin",
      description: "Add tailored FAQ sections for each product, answering customer questions directly. Reduce customer support inquiries by providing information upfront.",
      category: "product",
      color: "cartePink"
    }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? allFeatures 
    : allFeatures.filter(feature => feature.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-carteBackground-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-white text-cartePink px-4 py-1.5 rounded-full text-sm font-bold mb-4 kawaii-shadow animate-float">
              <Sparkles size={14} className="inline mr-1" />
              ALL OUR FEATURES
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Everything You Need to Create
              <br /> 
              <span className="text-carteYellow">Your Perfect Store</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
              Browse our comprehensive set of tools and features designed to help your handmade business thrive.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-carteYellow text-gray-900 kawaii-shadow'
                    : 'bg-white/70 text-gray-700 hover:bg-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={(index % 3) * 100}
                color={feature.color}
              />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button 
              variant="default" 
              className="bg-carteYellow hover:bg-carteYellow-600 text-gray-900 kawaii-shadow px-8 py-6 text-lg font-bold"
              onClick={() => navigate('/#start')}
            >
              Start Creating Your Shop
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;
