import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-50 text-slate-900 pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-slate-200">
          <div>
            <p className="text-lg font-semibold uppercase tracking-[0.18em] text-slate-950">Dirt Trails</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              A modular travel intelligence platform built to automate bookings, optimize inventory, surface business insights and connect operators, agents and suppliers through global distribution, while embedding sustainability across every workflow.
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.24em] text-slate-500">
              Travel intelligence that extends value across operators, distributors, suppliers and impact teams.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-950 mb-5 uppercase tracking-[0.16em] text-sm">Solutions</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <FooterLink to="/solutions/booking-engine">Booking Engine</FooterLink>
              <FooterLink to="/solutions/inventory-management">Inventory Management</FooterLink>
              <FooterLink to="/solutions/responsibility-suite">Sustainability Suite</FooterLink>
              <FooterLink to="/solutions/api-integrations">API Integrations</FooterLink>
              <FooterLink to="/solutions">Full Platform</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-950 mb-5 uppercase tracking-[0.16em] text-sm">Resources</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/resources/case-studies">Case Studies</FooterLink>
              <FooterLink to="/resources/success-stories">Success Stories</FooterLink>
              <FooterLink to="/resources/faqs">FAQs</FooterLink>
              <FooterLink to="/resources/events">Webinars & Events</FooterLink>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-4 uppercase tracking-[0.16em] text-sm">Support</h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                <FooterLink to="/contact">Help Center</FooterLink>
                <FooterLink to="/contact">Contact Support</FooterLink>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-950 mb-5 uppercase tracking-[0.16em] text-sm">Legal</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/privacy">Cookie Policy</FooterLink>
              <FooterLink to="/contact">Security & Compliance</FooterLink>
            </ul>
            <p className="mt-6 text-sm leading-6 text-slate-400">
              Global travel intelligence platform designed for operators, distribution partners and sustainability teams.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500 text-left">© {currentYear} Dirt Trails. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
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
    className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors duration-200 hover:bg-slate-200 hover:text-slate-900"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={to} 
      className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm block"
    >
      {children}
    </Link>
  </li>
);

export default Footer;