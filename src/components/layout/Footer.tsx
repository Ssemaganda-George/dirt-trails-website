import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Leaf, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-white via-green-50 to-green-100 pt-20 pb-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 via-green-500 to-amber-600"></div>
      <div className="absolute top-4 right-4 opacity-10">
        <Leaf className="h-32 w-32 text-green-600 rotate-12" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-5">
        <div className="h-24 w-24 rounded-full bg-amber-700"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center mr-3">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-xl text-green-800">Dirt Trails Safaris</h3>
            </div>
            <p className="text-green-700 mb-6 leading-relaxed">
              Embark on the adventure of a lifetime with our customized East African safari experiences, designed to showcase the region's incredible wildlife, landscapes, and cultures.
            </p>
            <div className="flex space-x-3">
              <SocialLink href="https://www.facebook.com/people/DirtTrails-Safaris/100081666093047/" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="https://x.com/DirtTrails_Ug" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="https://www.instagram.com/dirttrailssafaris/" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="https://www.linkedin.com/company/dirt-trails-safaris/" icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialLink href="#" icon={<Youtube size={18} />} label="YouTube" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-green-100">
            <h3 className="font-bold text-xl mb-6 text-green-800 flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-600 mr-3"></div>
              Quick Links
            </h3>
            <ul className="space-y-4">
              <FooterLink to="/tours">Tour Packages</FooterLink>
              <FooterLink to="/destinations">Destinations</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Top Destinations */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-green-100">
            <h3 className="font-bold text-xl mb-6 text-green-800 flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-600 mr-3"></div>
              Top Destinations
            </h3>
            <ul className="space-y-4">
              <FooterLink to="/destinations/kenya">Kenya</FooterLink>
              <FooterLink to="/destinations/tanzania">Tanzania</FooterLink>
              <FooterLink to="/destinations/uganda">Uganda</FooterLink>
              <FooterLink to="/destinations/rwanda">Rwanda</FooterLink>
            </ul>
          </div>

          {/* Environmental Initiatives & Contact */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
            <h3 className="font-bold text-xl mb-6 text-green-800">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center mr-3">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                Environmental Initiatives
              </div>
            </h3>
            <ul className="space-y-3 mb-8">
              <FooterLink to="/environment/carbon-offset">Carbon Offset Calculator</FooterLink>
              <FooterLink to="/environment/tree-planting">Tree Planting Initiative</FooterLink>
              <FooterLink to="/environment/geotagging">Tree Tracking & Geotagging</FooterLink>
            </ul>
            
            <div className="pt-6 border-t border-green-200">
              <h3 className="font-bold text-xl mb-4 text-green-800 flex items-center">
                <div className="h-2 w-2 rounded-full bg-amber-600 mr-3"></div>
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start group">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-green-700 text-sm leading-relaxed">MIICHub, Makerere University, Kampala, Uganda</span>
                </div>
                <div className="flex items-center group">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <a href="tel:+256759918649" className="text-green-700 hover:text-green-800 transition-colors">+256 759 918649</a>
                </div>
                <div className="flex items-center group">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <Mail className="h-4 w-4 text-green-600" />
                  </div>
                  <a href="mailto:safaris.dirttrails@gmail.com" className="text-green-700 hover:text-green-800 transition-colors">safaris.dirttrails@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-green-100">
          <div className="text-center md:flex md:justify-between md:items-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-amber-600 flex items-center justify-center mr-3">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <p className="text-green-800 font-medium">
                &copy; {currentYear} Dirt Trails Safaris and Travel. All rights reserved.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end space-x-6">
              <Link 
                to="/privacy" 
                className="text-sm text-green-700 hover:text-green-800 hover:underline transition-all duration-200 px-3 py-1 rounded-full hover:bg-green-50"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-green-700 hover:text-green-800 hover:underline transition-all duration-200 px-3 py-1 rounded-full hover:bg-green-50"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a 
    href={href} 
    aria-label={label}
    className="h-11 w-11 rounded-full bg-white border-2 border-green-100 flex items-center justify-center hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 hover:text-white hover:border-green-600 transition-all duration-300 text-green-600 shadow-sm hover:shadow-md transform hover:-translate-y-1"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={to} 
      className="text-green-700 hover:text-green-800 transition-all duration-200 flex items-center group text-sm"
    >
      <div className="h-1.5 w-1.5 rounded-full bg-amber-600 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <span className="group-hover:translate-x-1 transition-transform">{children}</span>
    </Link>
  </li>
);

export default Footer;