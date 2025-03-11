
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  const isHomePage = location.pathname === '/';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-inter font-bold text-2xl text-carteYellow transition-all duration-300"
        >
          Carte
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isHomePage ? (
            <>
              {['Features', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-outfit text-gray-800 hover:text-carteYellow transition-colors duration-300 text-base"
                >
                  {item}
                </a>
              ))}
            </>
          ) : (
            <>
              <Link
                to="/#features"
                className="font-outfit text-gray-800 hover:text-carteYellow transition-colors duration-300 text-base"
              >
                Home
              </Link>
              <Link
                to="/features"
                className={`font-outfit transition-colors duration-300 text-base ${
                  location.pathname === '/features' ? 'text-carteYellow' : 'text-gray-800 hover:text-carteYellow'
                }`}
              >
                Features
              </Link>
              <Link
                to="/#pricing"
                className="font-outfit text-gray-800 hover:text-carteYellow transition-colors duration-300 text-base"
              >
                Pricing
              </Link>
            </>
          )}
          <Link 
            to="/#start"
            className="px-6 py-2.5 bg-carteYellow text-gray-900 rounded-md hover:bg-carteYellow-600 transition-colors duration-300 font-outfit font-medium text-sm"
          >
            Start Selling
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-carteYellow focus:outline-none" 
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
          {isHomePage ? (
            <>
              {['Features', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-outfit text-gray-800 hover:text-carteYellow transition-colors duration-300 py-2 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </>
          ) : (
            <>
              <Link
                to="/"
                className="font-outfit text-gray-800 hover:text-carteYellow transition-colors duration-300 py-2 text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className={`font-outfit transition-colors duration-300 py-2 text-lg ${
                  location.pathname === '/features' ? 'text-carteYellow' : 'text-gray-800 hover:text-carteYellow'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/#pricing"
                className="font-outfit text-gray-800 hover:text-carteYellow transition-colors duration-300 py-2 text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>
            </>
          )}
          <Link 
            to="/#start"
            className="px-6 py-3 bg-carteYellow text-gray-900 rounded-md hover:bg-carteYellow-600 transition-colors duration-300 font-outfit font-medium text-base text-center"
            onClick={() => setMenuOpen(false)}
          >
            Start Selling
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
