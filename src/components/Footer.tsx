
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">ArtisanMarket</h3>
            <p className="text-teal-100 mb-6">The premier platform for independent creators to sell their handmade products online.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-teal-200 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-teal-100 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-teal-100 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-teal-100 mb-4">Subscribe to our newsletter for the latest features and tips.</p>
            <NewsletterForm />
          </div>
        </div>
        
        <div className="border-t border-teal-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-teal-300 text-sm">© 2023 ArtisanMarket. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-8">
            <a href="#" className="text-teal-300 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-teal-300 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
