
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          className="font-inter font-bold text-2xl text-carte-300 transition-all duration-300"
        >
          Carte
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Features', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-outfit text-gray-800 hover:text-carte-400 transition-colors duration-300 text-base"
            >
              {item}
            </a>
          ))}
          <a 
            href="#start"
            className="px-6 py-2.5 bg-carte-300 text-white rounded-md hover:bg-carte-400 transition-colors duration-300 font-outfit font-medium text-sm"
          >
            Start Selling
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-carte-300 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          {['Features', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-outfit text-gray-800 hover:text-carte-400 transition-colors duration-300 py-2 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="#start"
            className="px-6 py-3 bg-carte-300 text-white rounded-md hover:bg-carte-400 transition-colors duration-300 font-outfit font-medium text-base text-center"
            onClick={() => setMenuOpen(false)}
          >
            Start Selling
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
