import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Leaf, Users } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConservationOpen, setIsConservationOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsConservationOpen(false);
    setIsAboutOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;
  const isConservationActive = () => location.pathname.startsWith('/environment');
  const isAboutActive = () =>
    location.pathname === '/about' ||
    location.pathname.startsWith('/about/team') ||
    location.pathname.startsWith('/about/guides');

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center h-20 relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img 
            src="/images/logo.png" 
            alt="Dirt Trails Safaris Logo" 
            className="h-10 sm:h-12 w-auto" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            to="/"
            onClick={closeMenu}
            className={`px-6 py-2 text-white font-medium transition-all relative group ${
              isActive('/') ? 'text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            Home
            <span 
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 transition-all ${
                isActive('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
              }`}
            />
          </Link>
          <Link
            to="/tours"
            onClick={closeMenu}
            className={`px-6 py-2 text-white font-medium transition-all relative group ${
              isActive('/tours') ? 'text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            Safaris & Tours
            <span 
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 transition-all ${
                isActive('/tours') ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
              }`}
            />
          </Link>
          {/* About Dropdown */}
          <div className="relative group">
            <button
              className={`px-6 py-2 text-white font-medium flex items-center transition-all relative ${
                isAboutActive() ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsAboutOpen((v) => !v)}
              onFocus={() => setIsAboutOpen(true)}
              onBlur={(e) => {
                // Only close if focus moves outside the dropdown
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                  setIsAboutOpen(false);
                }
              }}
              type="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={isAboutOpen}
            >
              About
              <ChevronDown className="ml-1 h-4 w-4" />
              <span 
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 transition-all ${
                  isAboutActive() ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}
              />
            </button>
            {isAboutOpen && (
              <div
                className="absolute top-full left-0 bg-zinc-900/95 backdrop-blur-md shadow-xl rounded-md mt-2 w-52 z-50 border border-white/10"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
                tabIndex={-1}
              >
                <Link 
                  to="/about"
                  className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                  onClick={closeMenu}
                  tabIndex={0}
                >
                  About
                </Link>
                <Link 
                  to="/about/team"
                  className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                  onClick={closeMenu}
                  tabIndex={0}
                >
                  Our Team
                </Link>
                <Link 
                  to="/about/guides"
                  className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={closeMenu}
                  tabIndex={0}
                >
                  Our Guides
                </Link>
                <Link 
                  to="/community"
                  className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={closeMenu}
                  tabIndex={0}
                >
                  Community
                </Link>
              </div>
            )}
          </div>
          {/* Conservation Dropdown */}
          <div className="relative group">
            <button 
              className={`px-6 py-2 text-white font-medium flex items-center transition-all relative ${
                isConservationActive() ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsConservationOpen((v) => !v)}
              onFocus={() => setIsConservationOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                  setIsConservationOpen(false);
                }
              }}
              type="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={isConservationOpen}
            >
              Conservation
              <ChevronDown className="ml-1 h-4 w-4" />
              <span 
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 transition-all ${
                  isConservationActive() ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}
              />
            </button>
            {isConservationOpen && (
              <div
                className="absolute top-full left-0 bg-zinc-900/95 backdrop-blur-md shadow-xl rounded-md mt-2 w-64 z-50 border border-white/10"
                onMouseEnter={() => setIsConservationOpen(true)}
                onMouseLeave={() => setIsConservationOpen(false)}
                tabIndex={-1}
              >
                <Link 
                  to="/environment/carbon-offset"
                  className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                  onClick={closeMenu}
                  tabIndex={0}
                >
                  Calculate Carbon Offset
                </Link>
                <Link 
                  to="/environment/tree-planting"
                  className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                  onClick={closeMenu}
                  tabIndex={0}
                >
                  Tree Planting Initiatives
                </Link>
                <Link 
                  to="/environment/geotagging"
                  className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={closeMenu}
                  tabIndex={0}
                >
                  Geotagging & Monitoring
                </Link>
              </div>
            )}
          </div>
          <Link to="/contact" className="ml-4 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors shadow-lg shadow-emerald-500/20">
            Contact Us
          </Link>
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-white/10 z-40 max-h-[90vh] overflow-y-auto">
          <div className="container mx-auto px-2 py-6 flex flex-col space-y-4">
            <Link
              to="/"
              onClick={closeMenu}
              className={`text-left py-2 px-4 rounded-md transition-colors ${
                isActive('/')
                  ? 'text-white bg-white/10 border-l-2 border-amber-500' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link
              to="/tours"
              onClick={closeMenu}
              className={`text-left py-2 px-4 rounded-md transition-colors ${
                isActive('/tours')
                  ? 'text-white bg-white/10 border-l-2 border-amber-500' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Safaris & Tours
            </Link>
            {/* About Dropdown Mobile */}
            <div className="flex flex-col space-y-2 pl-4">
              <h3 className="font-semibold flex items-center text-emerald-400 py-2">
                <Users className="mr-2 h-4 w-4" />
                About
              </h3>
              <Link 
                to="/about"
                className="text-left text-white/70 hover:text-white transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/about/team"
                className="text-left text-white/70 hover:text-white transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Our Team
              </Link>
              <Link 
                to="/about/guides"
                className="text-left text-white/70 hover:text-white transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Our Guides
              </Link>
              <Link 
                to="/community"
                className="text-left text-white/70 hover:text-white transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Community
              </Link>
            </div>
            {/* Conservation Dropdown Mobile */}
            <div className="flex flex-col space-y-2 pl-4">
              <h3 className="font-semibold flex items-center text-emerald-400 py-2">
                <Leaf className="mr-2 h-4 w-4" />
                Conservation
              </h3>
              <Link 
                to="/environment/carbon-offset"
                className="text-left text-white/70 hover:text-white transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Calculate Carbon Offset
              </Link>
              <Link 
                to="/environment/tree-planting"
                className="text-left text-white/70 hover:text-white transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Tree Planting Initiative
              </Link>
              <Link 
                to="/environment/geotagging"
                className="text-left text-white/70 hover:text-white transition-colors pl-6 py-2"
                onClick={closeMenu}
              >
                Geotagging & Monitoring
              </Link>
            </div>
            <Link 
              to="/contact"
              className="w-full text-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors shadow-lg shadow-emerald-500/20"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
