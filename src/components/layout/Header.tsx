import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnvMenuOpen, setIsEnvMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsEnvMenuOpen(false);
  };
  const toggleEnvMenu = () => setIsEnvMenuOpen(!isEnvMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img 
            src="/images/logo.png" 
            alt="Dirt Trails Safaris Logo" 
            className="h-12" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks closeMenu={closeMenu} />
          <div className="relative group">
            <button 
              className="flex items-center text-foreground hover:text-primary transition-colors"
              onClick={toggleEnvMenu}
            >
              {/* <Leaf className="mr-1 h-4 w-4" /> */}
              Environment
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className={`absolute top-full left-0 bg-white shadow-md rounded-md p-2 w-56 ${isEnvMenuOpen ? 'block' : 'hidden'} group-hover:block`}>
              <Link 
                to="/environment/carbon-offset" 
                className="block px-4 py-2 hover:bg-muted rounded-md"
                onClick={closeMenu}
              >
                Calculate Carbon Offset
              </Link>
              <Link 
                to="/environment/tree-planting" 
                className="block px-4 py-2 hover:bg-muted rounded-md"
                onClick={closeMenu}
              >
                Tree Planting Initiative
              </Link>
              <Link 
                to="/environment/geotagging" 
                className="block px-4 py-2 hover:bg-muted rounded-md"
                onClick={closeMenu}
              >
                Geotagging & Monitoring
              </Link>
            </div>
          </div>
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
            <div className="flex flex-col space-y-2 pl-4">
              <h3 className="font-semibold flex items-center text-safari-green">
                <Leaf className="mr-2 h-4 w-4" />
                Environmental Initiatives
              </h3>
              <Link 
                to="/environment/carbon-offset" 
                className="text-foreground hover:text-primary transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Calculate Carbon Offset
              </Link>
              <Link 
                to="/environment/tree-planting" 
                className="text-foreground hover:text-primary transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Tree Planting Initiative
              </Link>
              <Link 
                to="/environment/geotagging" 
                className="text-foreground hover:text-primary transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Geotagging & Monitoring
              </Link>
            </div>
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
