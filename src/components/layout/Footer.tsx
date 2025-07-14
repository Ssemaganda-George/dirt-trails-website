
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Leaf } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-safari-green/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-safari-green">Dirt Trails Safaris</h3>
            <p className="text-muted-foreground mb-6">
              Embark on the adventure of a lifetime with our customized East African safari experiences, designed to showcase the region's incredible wildlife, landscapes, and cultures.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://www.facebook.com/people/DirtTrails-Safaris/100081666093047/" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="https://x.com/DirtTrails_Ug" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="https://www.instagram.com/dirttrailssafaris/" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="#" icon={<Youtube size={18} />} label="YouTube" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-safari-green">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink to="/tours">Tour Packages</FooterLink>
              <FooterLink to="/destinations">Destinations</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-safari-green">Top Destinations</h3>
            <ul className="space-y-3">
              <FooterLink to="/destinations/kenya">Kenya</FooterLink>
              <FooterLink to="/destinations/tanzania">Tanzania</FooterLink>
              <FooterLink to="/destinations/uganda">Uganda</FooterLink>
              <FooterLink to="/destinations/rwanda">Rwanda</FooterLink>
            </ul>
          </div>
          
          {/* Environmental Initiatives */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-safari-green">
              <div className="flex items-center">
                <Leaf className="mr-2 h-5 w-5" />
                Environmental Initiatives
              </div>
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/environment/carbon-offset">Carbon Offset Calculator</FooterLink>
              <FooterLink to="/environment/tree-planting">Tree Planting Initiative</FooterLink>
              <FooterLink to="/environment/geotagging">Tree Tracking & Geotagging</FooterLink>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-bold text-xl mb-4 text-safari-green">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-safari-green shrink-0" />
                  <span>MIICHub, Makerere University, Kampala, Uganda</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-safari-green shrink-0" />
                  <span>+256 759 918649</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-safari-green shrink-0" />
                  <span>safaris.dirttrails@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8 text-center md:flex md:justify-between md:text-left">
          <p>&copy; {currentYear} Dirt Trails Safaris and Travel. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground mr-6">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms & Conditions
            </Link>
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
    className="h-10 w-10 rounded-full bg-safari-green/10 flex items-center justify-center hover:bg-safari-green hover:text-white transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link to={to} className="text-muted-foreground hover:text-safari-green transition-colors">
      {children}
    </Link>
  </li>
);

export default Footer;
