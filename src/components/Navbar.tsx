import React from 'react';
import { Link } from 'react-router-dom';
// ...existing imports...

const Navbar = () => {
  return (
    <nav className="...existing nav wrapper...">
      {/* ...existing brand / left items... */}
      <ul className="flex items-center space-x-6">
        {/* ...other nav items... */}

        {/* About dropdown */}
        <li className="relative group">
          <button className="flex items-center gap-2 text-sm font-medium focus:outline-none">
            About
            {/* optional caret icon */}
            <span className="ml-1">▾</span>
          </button>

          <ul className="absolute left-0 mt-2 w-44 rounded-md bg-white shadow-lg py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
            <li>
              <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-safari-brown/5">
                About
              </Link>
            </li>
            <li>
              <Link to="/about/team" className="block px-4 py-2 text-sm text-gray-700 hover:bg-safari-brown/5">
                Our Team
              </Link>
            </li>
            <li>
              <Link to="/about/guides" className="block px-4 py-2 text-sm text-gray-700 hover:bg-safari-brown/5">
                Our Guides
              </Link>
            </li>
          </ul>
        </li>

        {/* ...other nav items... */}
      </ul>
      {/* ...existing right items / mobile controls... */}
    </nav>
  );
};

export default Navbar;
