import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '../LanguageSelector';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnvMenuOpen, setIsEnvMenuOpen] = useState(false);
  const { isGoogleTranslateLoaded } = useLanguage();
  
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
          <NavLinks closeMenu={closeMenu} currentPath={location.pathname} />
          <div className="relative group">
            <button
              className="flex items-center text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              onClick={toggleEnvMenu}
              aria-haspopup="true"
              aria-expanded={isEnvMenuOpen}
              aria-controls="env-menu"
            >
              Conservation
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div
              id="env-menu"
              className={`absolute top-full left-0 bg-white shadow-md rounded-md p-2 w-56 z-50 border border-border ${isEnvMenuOpen ? 'block' : 'hidden'} group-hover:block`}
              role="menu"
            >
              <Link
                to="/environment/carbon-offset"
                className="block px-4 py-2 hover:bg-muted rounded-md focus:bg-muted focus:outline-none"
                onClick={closeMenu}
                role="menuitem"
              >
                Calculate Carbon Offset
              </Link>
              <Link
                to="/environment/tree-planting"
                className="block px-4 py-2 hover:bg-muted rounded-md focus:bg-muted focus:outline-none"
                onClick={closeMenu}
                role="menuitem"
              >
                Tree Planting Initiatives
              </Link>
              <Link
                to="/environment/geotagging"
                className="block px-4 py-2 hover:bg-muted rounded-md focus:bg-muted focus:outline-none"
                onClick={closeMenu}
                role="menuitem"
              >
                Geotagging & Monitoring
              </Link>
            </div>
          </div>
          {/* <LanguageSelector /> */}
          <Button asChild variant="default">
            <Link to="/contact">Contact Us</Link>
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
            <NavLinks closeMenu={closeMenu} currentPath={location.pathname} />
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
            <div className="px-4">
              {/* <LanguageSelector /> */}
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

const NavLinks = ({ closeMenu, currentPath }: { closeMenu: () => void; currentPath: string }) => {
  const linkClass = (path: string) =>
    `text-foreground hover:text-primary transition-colors px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 ${currentPath === path ? 'bg-green-100 font-bold text-green-800' : ''}`;
  return (
    <>
      <Link
        to="/"
        className={linkClass('/')}
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link
        to="/tours"
        className={linkClass('/tours')}
        onClick={closeMenu}
      >
        Safaris & Tours
      </Link>
      {/* <Link
        to="/destinations"
        className={linkClass('/destinations')}
        onClick={closeMenu}
      >
        Blogs
      </Link> */}
      <Link
        to="/about"
        className={linkClass('/about')}
        onClick={closeMenu}
      >
        About us
      </Link>
    </>
  );
};

export default Header;