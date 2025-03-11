
import { useIntersectionObserver } from '../lib/animations';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  delay: number;
  isVisible: boolean;
}

const Testimonial = ({ quote, name, title, image, delay, isVisible }: TestimonialProps) => {
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
          <path d="M9.33333 18.6667C11.1778 18.6667 12.6667 20.1556 12.6667 22C12.6667 23.8444 11.1778 25.3333 9.33333 25.3333C7.48889 25.3333 6 23.8444 6 22C6 16.4778 10.4778 12 16 12V14.6667C13.5556 14.6667 11.2444 15.6444 9.58222 17.3067C9.82222 17.2 10.0756 17.1289 10.3422 17.0933C10.0089 17.1289 9.68444 17.2 9.38222 17.3067C9.36444 17.3156 9.34667 17.3244 9.32889 17.3333C9.34667 17.3244 9.36444 17.3156 9.38222 17.3067C9.36889 17.3156 9.35556 17.3244 9.34222 17.3333H9.33333ZM22.6667 18.6667C24.5111 18.6667 26 20.1556 26 22C26 23.8444 24.5111 25.3333 22.6667 25.3333C20.8222 25.3333 19.3333 23.8444 19.3333 22C19.3333 16.4778 23.8111 12 29.3333 12V14.6667C26.8889 14.6667 24.5778 15.6444 22.9156 17.3067C23.1556 17.2 23.4089 17.1289 23.6756 17.0933C23.3422 17.1289 23.0178 17.2 22.7156 17.3067C22.6978 17.3156 22.68 17.3244 22.6622 17.3333C22.68 17.3244 22.6978 17.3156 22.7156 17.3067C22.7022 17.3156 22.6889 17.3244 22.6756 17.3333H22.6667Z" fill="#006D6B"/>
        </svg>
      </div>
      <p className="text-gray-700 text-lg mb-6 flex-grow text-balance leading-relaxed">{quote}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
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
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format"
    },
    {
      quote: "I switched from Etsy and haven't looked back. The customization options allow me to create a shopping experience that truly reflects my brand identity and values.",
      name: "Michael Chen",
      title: "Handmade Jewelry",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format"
    },
    {
      quote: "Setting up my storefront took less than an hour, and I started making sales the same day. The customer support is responsive and genuinely helpful.",
      name: "Emma Rodriguez",
      title: "Print Artist",
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=200&auto=format"
    }
  ];

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-brown-400/10"
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span 
            className={`inline-block bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              image={testimonial.image}
              delay={(index + 1) * 100}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
