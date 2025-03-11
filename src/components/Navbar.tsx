
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const NavLink = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "font-worksans transition-colors duration-300 text-base",
        isActive ? "text-carteYellow" : "text-carteBlue-700 hover:text-carteYellow",
        className
      )}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="font-worksans font-bold text-xl md:text-2xl text-carteYellow transition-all duration-300 z-50"
          >
            Carte
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <Link 
              to="/#start"
              className="px-6 py-2.5 bg-carteYellow text-gray-900 rounded-md hover:bg-carteYellow-600 transition-colors duration-300 font-worksans font-medium text-sm"
            >
              Start Selling
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-carteYellow focus:outline-none z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Menu - Moved outside header to ensure proper positioning */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-300 md:hidden overflow-auto pt-20",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-10 flex flex-col space-y-6">
          <NavLink
            to="/"
            className="text-2xl py-2"
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            className="text-2xl py-2"
          >
            Features
          </NavLink>
          <NavLink
            to="/pricing"
            className="text-2xl py-2"
          >
            Pricing
          </NavLink>
          <Link 
            to="/#start"
            className="w-full px-6 py-3 bg-carteYellow text-gray-900 rounded-md hover:bg-carteYellow-600 transition-colors duration-300 font-worksans font-medium text-xl text-center mt-4"
          >
            Start Selling
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
