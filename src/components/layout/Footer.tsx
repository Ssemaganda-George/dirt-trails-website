import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1A2B3C] text-slate-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 pb-10 border-b border-slate-700/50">
          <div>
            <div className="mb-4">
              <p className="text-lg font-bold tracking-[0.08em] uppercase">Dirt Trails</p>
              <p className="text-sm text-slate-300"></p>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              A modular travel intelligence platform built to automate bookings, optimize inventory, surface business insights, and connect operators, agents and suppliers with global distribution while embedding sustainability across every workflow.
            </p>
            <p className="text-sm text-slate-400">Travel intelligence that extends value across operators, distributors, suppliers and impact teams.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5">Travel Intelligence</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <FooterLink to="/solutions/booking-engine">Booking Engine</FooterLink>
              <FooterLink to="/solutions/inventory-management">Inventory Management</FooterLink>
              <FooterLink to="/solutions/responsibility-suite">Sustainability Suite</FooterLink>
              <FooterLink to="/solutions/api-integrations">API Integrations</FooterLink>
              <FooterLink to="/solutions">Full platform</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5">Resources & Support</h3>
            <ul className="space-y-3 text-slate-300 text-sm mb-6">
              <FooterLink to="/contact">Blog</FooterLink>
              <FooterLink to="/contact">Case Studies</FooterLink>
              <FooterLink to="/contact">FAQs</FooterLink>
              <FooterLink to="/contact">Webinars & Events</FooterLink>
            </ul>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-[0.18em]">Support</h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                <FooterLink to="/contact">Help Center</FooterLink>
                <FooterLink to="/contact">Contact Support</FooterLink>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5">Legal & Compliance</h3>
            <ul className="space-y-3 text-slate-300 text-sm mb-6">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/privacy">Cookie Policy</FooterLink>
              <FooterLink to="/contact">Security & Compliance</FooterLink>
            </ul>
            <div className="text-slate-400 text-sm leading-relaxed">
              <p>Global travel intelligence platform designed for operators, distribution partners and sustainability teams.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400">© {currentYear} Dirt Trails. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <SocialLink href="https://www.linkedin.com/company/dirt-trails-safaris/" icon={<Linkedin size={18} />} label="LinkedIn" />
            <SocialLink href="https://x.com/DirtTrails_Ug" icon={<Twitter size={18} />} label="Twitter" />
            <SocialLink href="https://www.facebook.com/people/DirtTrails-Safaris/100081666093047/" icon={<Facebook size={18} />} label="Facebook" />
            <SocialLink href="https://www.instagram.com/dirttrailssafaris/" icon={<Instagram size={18} />} label="Instagram" />
            <SocialLink href="#" icon={<Youtube size={18} />} label="YouTube" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: ReactNode; label: string }) => (
  <a 
    href={href} 
    aria-label={label}
    className="h-11 w-11 rounded-full bg-white border-2 border-green-100 flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 text-green-600 shadow-sm hover:shadow-md transform hover:-translate-y-1"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={to} 
      className="text-slate-300 hover:text-white transition-colors duration-200 text-sm block"
    >
      {children}
    </Link>
  </li>
);

export default Footer;