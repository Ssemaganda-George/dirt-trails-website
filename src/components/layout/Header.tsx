import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '../LanguageSelector';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnvMenuOpen, setIsEnvMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const { isGoogleTranslateLoaded } = useLanguage();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsEnvMenuOpen(false);
    setIsAboutMenuOpen(false);
  };
  const toggleEnvMenu = () => setIsEnvMenuOpen(!isEnvMenuOpen);
  const toggleAboutMenu = () => setIsAboutMenuOpen(!isAboutMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
  {/* Logo */}
  <Link to="/index" className="flex items-center" onClick={closeMenu}>
          <img 
            src="/images/logo.png" 
            alt="Dirt Trails Safaris Logo" 
            className="h-12" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks closeMenu={closeMenu} currentPath={location.pathname} />

          {/* About dropdown (desktop) */}
          <div className="relative group">
            <button
              className="flex items-center text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              onClick={toggleAboutMenu}
              aria-haspopup="true"
              aria-expanded={isAboutMenuOpen}
              aria-controls="about-menu"
            >
              About
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div
              id="about-menu"
              className={`absolute top-full left-0 bg-white shadow-md rounded-md p-2 w-56 z-50 border border-border ${isAboutMenuOpen ? 'block' : 'hidden'} group-hover:block`}
              role="menu"
            >
              <NavLink
                to="/about"
                className={({ isActive }) => `block px-4 py-2 rounded-md focus:outline-none ${isActive ? 'bg-green-50 font-semibold text-green-800' : 'hover:bg-muted'}`}
                onClick={closeMenu}
                role="menuitem"
              >
                About Us
              </NavLink>
              <NavLink
                to="/about/team"
                className={({ isActive }) => `block px-4 py-2 rounded-md focus:outline-none ${isActive ? 'bg-green-50 font-semibold text-green-800' : 'hover:bg-muted'}`}
                onClick={closeMenu}
                role="menuitem"
              >
                Our Team
              </NavLink>
             </div>
           </div>

          {/* Conservation dropdown (desktop) */}
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
              <NavLink
                to="/environment/geotagging"
                className={({ isActive }) => `block px-4 py-2 rounded-md focus:outline-none ${isActive ? 'bg-green-50 font-semibold text-green-800' : 'hover:bg-muted'}`}
                onClick={closeMenu}
                role="menuitem"
              >
                Geotagging & Monitoring
              </NavLink>
              <NavLink
                to="/environment/tree-planting"
                className={({ isActive }) => `block px-4 py-2 rounded-md focus:outline-none ${isActive ? 'bg-green-50 font-semibold text-green-800' : 'hover:bg-muted'}`}
                onClick={closeMenu}
                role="menuitem"
              >
                Tree Planting Initiatives
              </NavLink>
              <NavLink
                to="/environment/carbon-offset"
                className={({ isActive }) => `block px-4 py-2 rounded-md focus:outline-none ${isActive ? 'bg-green-50 font-semibold text-green-800' : 'hover:bg-muted'}`}
                onClick={closeMenu}
                role="menuitem"
              >
                Calculate Carbon Offset
              </NavLink>
              <NavLink
                to="/community"
                className={({ isActive }) => `block px-4 py-2 rounded-md focus:outline-none ${isActive ? 'bg-green-50 font-semibold text-green-800' : 'hover:bg-muted'}`}
                onClick={closeMenu}
                role="menuitem"
              >
                Community
              </NavLink>
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
              <h3 className="font-semibold">About</h3>
              <NavLink 
                to="/about" 
                className="text-foreground hover:text-primary transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                About Us
              </NavLink>
              <NavLink 
                to="/about/team" 
                className="text-foreground hover:text-primary transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Our Team
              </NavLink>
            </div>
            <div className="flex flex-col space-y-2 pl-4">
              <h3 className="font-semibold flex items-center text-safari-green">
                <Leaf className="mr-2 h-4 w-4" />
                Environmental Initiatives
              </h3>
              <NavLink 
                to="/environment/geotagging" 
                className="text-foreground hover:text-primary transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Geotagging & Monitoring
              </NavLink>
              <NavLink 
                to="/environment/tree-planting" 
                className="text-foreground hover:text-primary transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Tree Planting Initiative
              </NavLink>
              <NavLink 
                to="/environment/carbon-offset" 
                className="text-foreground hover:text-primary transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Calculate Carbon Offset
              </NavLink>
              <NavLink 
                to="/community" 
                className="text-foreground hover:text-primary transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Community
              </NavLink>
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
      <NavLink
        to="/index"
        className={({ isActive }) => linkClass('/index') + (isActive ? ' bg-green-100 font-bold text-green-800' : '')}
        onClick={closeMenu}
      >
        Home
      </NavLink>
      <NavLink
        to="/tours"
        className={({ isActive }) => linkClass('/tours') + (isActive ? ' bg-green-100 font-bold text-green-800' : '')}
        onClick={closeMenu}
      >
        Safaris & Tours
      </NavLink>
      {/* <Link
        to="/destinations"
        className={linkClass('/destinations')}
        onClick={closeMenu}
      >
        Blogs
      </Link> */}
      {/* About handled via dropdown in desktop and explicit links in mobile */}
    </>
  );
};

export default Header;