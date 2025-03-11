
import { useIntersectionObserver } from '../lib/animations';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  delay: number;
  isVisible: boolean;
  shape?: 'circle' | 'hexagon' | 'squircle';
}

const Testimonial = ({ quote, name, title, image, delay, isVisible, shape = 'circle' }: TestimonialProps) => {
  const getShapeClass = () => {
    switch(shape) {
      case 'hexagon':
        return 'clip-path-hexagon';
      case 'squircle':
        return 'rounded-[30%]';
      default:
        return 'rounded-full';
    }
  };

  return (
    <div 
      className={`bg-white rounded-2xl p-8 shadow-sm flex flex-col h-full ${
        isVisible 
          ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${delay}` 
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="mb-6">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.33333 18.6667C11.1778 18.6667 12.6667 20.1556 12.6667 22C12.6667 23.8444 11.1778 25.3333 9.33333 25.3333C7.48889 25.3333 6 23.8444 6 22C6 16.4778 10.4778 12 16 12V14.6667C13.5556 14.6667 11.2444 15.6444 9.58222 17.3067C9.82222 17.2 10.0756 17.1289 10.3422 17.0933C10.0089 17.1289 9.68444 17.2 9.38222 17.3067C9.36444 17.3156 9.34667 17.3244 9.32889 17.3333C9.34667 17.3244 9.36444 17.3156 9.38222 17.3067C9.36889 17.3156 9.35556 17.3244 9.34222 17.3333H9.33333ZM22.6667 18.6667C24.5111 18.6667 26 20.1556 26 22C26 23.8444 24.5111 25.3333 22.6667 25.3333C20.8222 25.3333 19.3333 23.8444 19.3333 22C19.3333 16.4778 23.8111 12 29.3333 12V14.6667C26.8889 14.6667 24.5778 15.6444 22.9156 17.3067C23.1556 17.2 23.4089 17.1289 23.6756 17.0933C23.3422 17.1289 23.0178 17.2 22.7156 17.3067C22.6978 17.3156 22.68 17.3244 22.6622 17.3333C22.68 17.3244 22.6978 17.3156 22.7156 17.3067C22.7022 17.3156 22.6889 17.3244 22.6756 17.3333H22.6667Z" fill="#0D4E6F"/>
        </svg>
      </div>
      <p className="text-gray-700 text-lg mb-6 flex-grow text-balance leading-relaxed">{quote}</p>
      <div className="flex items-center">
        <div className={`w-16 h-16 overflow-hidden mr-4 border-2 border-carteYellow/30 ${getShapeClass()}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-gray-900 font-semibold">{name}</h4>
          <p className="text-gray-500 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  const testimonials = [
    {
      quote: "This platform transformed my side hustle into a full-time business. The zero fees policy and seamless checkout experience have increased my conversion rate by over 30%.",
      name: "Sarah Johnson",
      title: "Ceramic Artist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format",
      shape: "circle" as const
    },
    {
      quote: "I switched from Etsy and haven't looked back. The customization options allow me to create a shopping experience that truly reflects my brand identity and values.",
      name: "Maya Wilson",
      title: "Handmade Jewelry",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format",
      shape: "hexagon" as const
    },
    {
      quote: "Setting up my storefront took less than an hour, and I started making sales the same day. The customer support is responsive and genuinely helpful.",
      name: "Emma Rodriguez",
      title: "Print Artist",
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=200&auto=format",
      shape: "squircle" as const
    },
    {
      quote: "I love how Carte lets me tell my story alongside my products. It's helped me build a loyal customer base who connects with my creative journey.",
      name: "Zoe Thompson",
      title: "Knitwear Designer",
      image: "https://images.unsplash.com/photo-1581583813443-3ceca5cea1ee?q=80&w=200&auto=format",
      shape: "hexagon" as const
    },
    {
      quote: "Managing inventory and shipping used to be my biggest stressors. Now I can focus on creating while the platform handles the business side.",
      name: "Aisha Patel", 
      title: "Mixed Media Artist",
      image: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?q=80&w=200&auto=format",
      shape: "circle" as const
    },
    {
      quote: "The built-in marketing tools have helped me reach customers I never would have found otherwise. My social media following has doubled since I started using Carte.",
      name: "Jasmine Kim",
      title: "Digital Illustrator",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format",
      shape: "squircle" as const
    }
  ];

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-carteBackground relative overflow-hidden"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-cartePink/5 filter blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-carteYellow/5 filter blur-xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span 
            className={`inline-block bg-white text-carte px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            TESTIMONIALS
          </span>
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${
              isVisible ? 'animate-fade-in animation-delay-100' : 'opacity-0'
            }`}
          >
            Creator Success Stories
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-2xl mx-auto ${
              isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'
            }`}
          >
            Hear from independent artists and creators who have grown their businesses on our platform.
          </p>
        </div>
        
        {/* Featured creator image */}
        <div className={`flex justify-center mb-12 ${isVisible ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cartePink/20 to-carteYellow/20 rounded-full blur-lg transform scale-110"></div>
            <img 
              src="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&auto=format" 
              alt="Featured Creator" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              image={testimonial.image}
              shape={testimonial.shape}
              delay={(index + 1) * 100}
              isVisible={isVisible}
            />
          ))}
        </div>
        
        {/* Creator collage */}
        <div className={`mt-16 flex justify-center ${isVisible ? 'animate-fade-in animation-delay-700' : 'opacity-0'}`}>
          <div className="relative w-full max-w-3xl h-32 md:h-40">
            <img 
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&auto=format" 
              alt="Creator" 
              className="absolute top-0 left-[10%] w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1592621385612-4d7129426394?q=80&w=200&auto=format" 
              alt="Creator" 
              className="absolute top-[60%] left-[30%] w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1631680400152-3993fa10d4b4?q=80&w=200&auto=format" 
              alt="Creator" 
              className="absolute top-[20%] left-[45%] w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=200&auto=format" 
              alt="Creator" 
              className="absolute top-[40%] left-[70%] w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format" 
              alt="Creator" 
              className="absolute top-[10%] left-[85%] w-14 h-14 md:w-18 md:h-18 rounded-full object-cover border-2 border-white shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
