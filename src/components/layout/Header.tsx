import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Leaf } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConservationOpen, setIsConservationOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsConservationOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isConservationActive = () => {
    return location.pathname.startsWith('/environment');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Safaris & Tours', path: '/tours' },
    { name: 'About us', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 relative">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="container mx-auto px-4 flex justify-between items-center h-20 relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img 
            src="/images/logo.png" 
            alt="Dirt Trails Safaris Logo" 
            className="h-12" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={closeMenu}
              className={`px-6 py-2 text-white font-medium transition-all relative group ${
                isActive(item.path) ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.name}
              <span 
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 transition-all ${
                  isActive(item.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}
              />
            </Link>
          ))}
          
          {/* Conservation Dropdown */}
          <div className="relative group">
            <button 
              className={`px-6 py-2 text-white font-medium flex items-center transition-all relative ${
                isConservationActive() ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsConservationOpen(!isConservationOpen)}
            >
              Conservation
              <ChevronDown className="ml-1 h-4 w-4" />
              <span 
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 transition-all ${
                  isConservationActive() ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`}
              />
            </button>
            <div className={`absolute top-full left-0 bg-zinc-900/95 backdrop-blur-md shadow-xl rounded-md mt-2 w-64 z-50 border border-white/10 ${isConservationOpen ? 'block' : 'hidden'} group-hover:block`}>
              <Link 
                to="/environment/carbon-offset"
                className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                onClick={closeMenu}
              >
                Calculate Carbon Offset
              </Link>
              <Link 
                to="/environment/tree-planting"
                className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
                onClick={closeMenu}
              >
                Tree Planting Initiatives
              </Link>
              <Link 
                to="/environment/geotagging"
                className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                onClick={closeMenu}
              >
                Geotagging & Monitoring
              </Link>
            </div>
          </div>

          <Link to="/contact" className="ml-4 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors shadow-lg shadow-emerald-500/20">
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-white/10 z-40">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={`text-left py-2 px-4 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-white bg-white/10 border-l-2 border-amber-500' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
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