
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <span className="font-montserrat font-bold text-2xl text-safari-orange">
            East Africa <span className="text-safari-green">Tours</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks closeMenu={closeMenu} />
          <Button asChild variant="default">
            <Link to="/contact">Book Now</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-t border-border z-40">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <NavLinks closeMenu={closeMenu} />
            <Button asChild variant="default" onClick={closeMenu}>
              <Link to="/contact">Book Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ closeMenu }: { closeMenu: () => void }) => (
  <>
    <Link 
      to="/" 
      className="text-foreground hover:text-primary transition-colors"
      onClick={closeMenu}
    >
      Home
    </Link>
    <Link 
      to="/tours" 
      className="text-foreground hover:text-primary transition-colors"
      onClick={closeMenu}
    >
      Tours
    </Link>
    <Link 
      to="/destinations" 
      className="text-foreground hover:text-primary transition-colors"
      onClick={closeMenu}
    >
      Destinations
    </Link>
    <Link 
      to="/about" 
      className="text-foreground hover:text-primary transition-colors"
      onClick={closeMenu}
    >
      About
    </Link>
  </>
);

export default Header;
