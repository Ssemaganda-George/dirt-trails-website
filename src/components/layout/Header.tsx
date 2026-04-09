import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Leaf, Users, Plus, Minus } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isSustainabilityOpen, setIsSustainabilityOpen] = useState(false);
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  // Add mobile-specific collapse states
  const [isSolutionsExpanded, setIsSolutionsExpanded] = useState(false);
  const [isSustainabilityExpanded, setIsSustainabilityExpanded] = useState(false);
  const [isPartnersExpanded, setIsPartnersExpanded] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isResourcesExpanded, setIsResourcesExpanded] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSolutionsOpen(false);
    setIsSustainabilityOpen(false);
    setIsPartnersOpen(false);
    setIsAboutOpen(false);
    setIsResourcesOpen(false);
    setIsSolutionsExpanded(false);
    setIsSustainabilityExpanded(false);
    setIsPartnersExpanded(false);
    setIsAboutExpanded(false);
    setIsResourcesExpanded(false);
  };

  const isActive = (path: string) => location.pathname === path;
  const isSolutionsActive = () => location.pathname.startsWith('/solutions') || location.pathname.startsWith('/tours');
  const isSustainabilityActive = () => location.pathname.startsWith('/environment') || location.pathname.startsWith('/sustainability');
  const isPartnersActive = () => location.pathname === '/community';
  const isAboutActive = () => location.pathname.startsWith('/about');
  const isResourcesActive = () => location.pathname === '/contact' || location.pathname.startsWith('/resources');

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 h-20 max-w-7xl">
        <Link to="/" className="inline-flex flex-col items-start gap-0" onClick={closeMenu}>
          <span className="text-2xl font-bold tracking-tight text-slate-950">
            DirtTrails<span className="text-emerald-500 ml-0.5">.</span>
          </span>
          <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-slate-500 mt-1">
            Safari Intelligence
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            onClick={closeMenu}
            className={`px-2 py-2 text-sm font-normal transition ${
              isActive('/') ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Home
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <button
              className={`px-3 py-2 text-sm font-normal flex items-center transition ${
                isSolutionsActive() ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
              }`}
              onClick={() => setIsSolutionsOpen((v) => !v)}
              onFocus={() => setIsSolutionsOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                  setIsSolutionsOpen(false);
                }
              }}
              type="button"
              aria-haspopup="true"
              aria-expanded={isSolutionsOpen}
            >
              Solutions
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isSolutionsOpen && (
              <div
                className="absolute top-full left-0 z-50 mt-1 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <div className="grid gap-2 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Booking & Distribution</p>
                    <Link to="/solutions/booking-engine" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Booking Engine</Link>
                    <Link to="/solutions/global-connectivity" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Global Connectivity</Link>
                    <Link to="/solutions/api-integrations" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">API Integrations</Link>
                    <Link to="/solutions/channel-manager" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Digital Payments</Link>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Management & Operations</p>
                    <Link to="/solutions/inventory-management" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Inventory Management</Link>
                    <Link to="/solutions/dynamic-pricing" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Dynamic Pricing</Link>
                    <Link to="/solutions/crm" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">CRM</Link>
                    <Link to="/solutions/analytics-reporting" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Analytics & Reporting</Link>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Sustainability & Impact</p>
                    <Link to="/solutions/carbon-footprint" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Carbon Footprint Calculator</Link>
                    <Link to="/solutions/responsibility-suite" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Responsibility Suite</Link>
                    <Link to="/solutions/ethical-sourcing" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Ethical Sourcing</Link>
                    <Link to="/solutions/community-impact" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Community Impact Tracking</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative group"
            onMouseEnter={() => setIsSustainabilityOpen(true)}
            onMouseLeave={() => setIsSustainabilityOpen(false)}
          >
            <button
              className={`px-3 py-2 text-sm font-normal flex items-center transition relative ${
                isSustainabilityActive() ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
              }`}
              onClick={() => setIsSustainabilityOpen((v) => !v)}
              onFocus={() => setIsSustainabilityOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                  setIsSustainabilityOpen(false);
                }
              }}
              type="button"
              aria-haspopup="true"
              aria-expanded={isSustainabilityOpen}
            >
              Sustainability
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isSustainabilityOpen && (
              <div
                className="absolute top-full left-0 bg-white shadow-xl rounded-xl mt-1 w-72 z-50 border border-slate-200"
                onMouseEnter={() => setIsSustainabilityOpen(true)}
                onMouseLeave={() => setIsSustainabilityOpen(false)}
              >
                <div className="grid gap-2 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Features</p>
                    <Link to="/sustainability/carbon-offset-tracking" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Carbon Offset Tracking</Link>
                    <Link to="/sustainability/tree-tracking-geotagging" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Tree Tracking & Geotagging</Link>
                    <Link to="/sustainability/supplier-vetting" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Supplier Vetting</Link>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Impact Reports</p>
                    <Link to="/resources/case-studies" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Case Studies</Link>
                    <Link to="/resources/data-metrics" onClick={closeMenu} className="block mt-2 text-slate-700 hover:text-slate-900">Data & Metrics</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative group"
            onMouseEnter={() => setIsPartnersOpen(true)}
            onMouseLeave={() => setIsPartnersOpen(false)}
          >
            <button
              className={`px-3 py-2 text-sm font-normal flex items-center transition relative ${
                isPartnersActive() ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
              }`}
              onClick={() => setIsPartnersOpen((v) => !v)}
              onFocus={() => setIsPartnersOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                  setIsPartnersOpen(false);
                }
              }}
              type="button"
              aria-haspopup="true"
              aria-expanded={isPartnersOpen}
            >
              Partners
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isPartnersOpen && (
              <div
                className="absolute top-full left-0 bg-white shadow-xl rounded-xl mt-1 w-64 z-50 border border-slate-200"
                onMouseEnter={() => setIsPartnersOpen(true)}
                onMouseLeave={() => setIsPartnersOpen(false)}
              >
                <Link to="/partners" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Partners</Link>
                <Link to="/community" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Our Clients</Link>
                <Link to="/partners/technology" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Technology Partners</Link>
              </div>
            )}
          </div>

          <div
            className="relative group"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              className={`px-3 py-2 text-sm font-normal flex items-center transition relative ${
                isAboutActive() ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
              }`}
              onClick={() => setIsAboutOpen((v) => !v)}
              onFocus={() => setIsAboutOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                  setIsAboutOpen(false);
                }
              }}
              type="button"
              aria-haspopup="true"
              aria-expanded={isAboutOpen}
            >
              About Us
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isAboutOpen && (
              <div
                className="absolute top-full left-0 bg-white shadow-xl rounded-xl mt-1 w-52 z-50 border border-slate-200"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <div className="border-b border-slate-200">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Our Approach</p>
                  <Link to="/about" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Our Story</Link>
                  <Link to="/sustainability/vision-mission" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Vision, Mission & Core Values</Link>
                  <Link to="/about/team" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Our Team</Link>
                  <Link to="/sustainability/certifications" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Certifications & Awards</Link>
                </div>
                <Link to="/about/careers" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Careers</Link>
              </div>
            )}
          </div>

          <div
            className="relative group"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button
              className={`px-3 py-2 text-sm font-normal flex items-center transition relative ${
                isResourcesActive() ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900'
              }`}
              onClick={() => setIsResourcesOpen((v) => !v)}
              onFocus={() => setIsResourcesOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                  setIsResourcesOpen(false);
                }
              }}
              type="button"
              aria-haspopup="true"
              aria-expanded={isResourcesOpen}
            >
              Resources
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isResourcesOpen && (
              <div
                className="absolute top-full left-0 bg-white shadow-xl rounded-xl mt-1 w-64 z-50 border border-slate-200"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <Link to="/resources/blog" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Blog</Link>
                <Link to="/resources/case-studies" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Case Studies</Link>
                <Link to="/resources/success-stories" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Success Stories</Link>
                <Link to="/resources/faqs" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors border-b border-slate-200">FAQs</Link>
                <Link to="/resources/events" onClick={closeMenu} className="block w-full text-left px-6 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">Webinars & Events</Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="ml-4 inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 shadow-sm shadow-slate-950/15">
            Contact Us
          </Link>
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden rounded-full border border-slate-200 bg-white p-2 text-slate-900 shadow-sm hover:bg-slate-50"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 z-40 max-h-[90vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4 max-w-7xl">
            <div className="flex flex-col space-y-2 pl-4">
              <button
                onClick={() => setIsSolutionsExpanded(!isSolutionsExpanded)}
                className="flex items-center justify-between text-slate-900 py-2 hover:text-slate-700 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Solutions
                </div>
                {isSolutionsExpanded ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {isSolutionsExpanded && (
                <div className="space-y-2 pl-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1A2B3C]">Booking & Distribution</div>
                  <Link to="/solutions/booking-engine" className="block text-left text-slate-700 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Booking Engine</Link>
                  <Link to="/solutions/global-connectivity" className="block text-left text-slate-700 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Global Connectivity</Link>
                  <Link to="/solutions/api-integrations" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>API Integrations</Link>
                  <Link to="/solutions/channel-manager" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Digital Payments</Link>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#1A2B3C]">Management & Operations</div>
                  <Link to="/solutions/inventory-management" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Inventory Management</Link>
                  <Link to="/solutions/dynamic-pricing" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Dynamic Pricing</Link>
                  <Link to="/solutions/crm" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>CRM</Link>
                  <Link to="/solutions/analytics-reporting" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Analytics & Reporting</Link>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#1A2B3C]">Sustainability & Impact</div>
                  <Link to="/solutions/carbon-footprint" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Carbon Footprint Calculator</Link>
                  <Link to="/solutions/responsibility-suite" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Responsibility Suite</Link>
                  <Link to="/solutions/ethical-sourcing" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Ethical Sourcing</Link>
                  <Link to="/solutions/community-impact" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Community Impact Tracking</Link>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2 pl-4">
              <button
                onClick={() => setIsSustainabilityExpanded(!isSustainabilityExpanded)}
                className="flex items-center justify-between text-[#2ECC71] py-2 hover:text-[#2ECC71]/80 transition-colors"
              >
                <div className="flex items-center">
                  <Leaf className="mr-2 h-4 w-4" />
                  Sustainability
                </div>
                {isSustainabilityExpanded ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {isSustainabilityExpanded && (
                <div className="space-y-2 pl-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1A2B3C]">Our Approach</div>
                  <Link to="/sustainability/vision-mission" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Vision, Mission & Core Values</Link>
                  <Link to="/sustainability/certifications" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Certifications & Awards</Link>
                  <Link to="/sustainability/partnerships" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Partnerships</Link>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#1A2B3C]">Features</div>
                  <Link to="/sustainability/carbon-offset-tracking" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Carbon Offset Tracking</Link>
                  <Link to="/sustainability/tree-tracking-geotagging" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Tree Tracking & Geotagging</Link>
                  <Link to="/sustainability/supplier-vetting" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Supplier Vetting</Link>
                  <div className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#1A2B3C]">Impact Reports</div>
                  <Link to="/resources/case-studies" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Case Studies</Link>
                  <Link to="/resources/data-metrics" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Data & Metrics</Link>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2 pl-4">
              <button
                onClick={() => setIsPartnersExpanded(!isPartnersExpanded)}
                className="flex items-center justify-between text-[#2ECC71] py-2 hover:text-[#2ECC71]/80 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Partners
                </div>
                {isPartnersExpanded ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {isPartnersExpanded && (
                <div className="space-y-2 pl-6">
                  <Link to="/partners" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Partners</Link>
                  <Link to="/community" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Our Clients</Link>
                  <Link to="/partners/technology" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Technology Partners</Link>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2 pl-4">
              <button
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="flex items-center justify-between text-[#2ECC71] py-2 hover:text-[#2ECC71]/80 transition-colors"
              >
                <div className="flex items-center">
                  <ChevronDown className="mr-2 h-4 w-4" />
                  About Us
                </div>
                {isAboutExpanded ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {isAboutExpanded && (
                <div className="space-y-2 pl-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1A2B3C]">Our Approach</div>
                  <Link to="/about" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Our Story</Link>
                  <Link to="/sustainability/vision-mission" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Vision, Mission & Core Values</Link>
                  <Link to="/about/team" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Our Team</Link>
                  <Link to="/sustainability/certifications" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Certifications & Awards</Link>
                  <Link to="/about/careers" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Careers</Link>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2 pl-4">
              <button
                onClick={() => setIsResourcesExpanded(!isResourcesExpanded)}
                className="flex items-center justify-between text-[#2ECC71] py-2 hover:text-[#2ECC71]/80 transition-colors"
              >
                <div className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Resources
                </div>
                {isResourcesExpanded ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {isResourcesExpanded && (
                <div className="space-y-2 pl-6">
                  <Link to="/resources/blog" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Blog</Link>
                  <Link to="/resources/case-studies" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Case Studies</Link>
                  <Link to="/resources/faqs" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>FAQs</Link>
                  <Link to="/resources/events" className="block text-left text-slate-600 hover:text-slate-900 transition-colors py-2" onClick={closeMenu}>Webinars & Events</Link>
                </div>
              )}
            </div>

            <Link 
              to="/contact"
              className="w-full text-center px-6 py-3 bg-[#2ECC71] hover:bg-[#2ECC71]/90 text-white font-medium rounded-md transition-colors shadow-lg shadow-accent/20"
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
