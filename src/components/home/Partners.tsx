import React, { useState } from 'react';
import { Compass, CheckCircle, Star, TreePine, Handshake, Award } from 'lucide-react';

const PartnerCard = ({ name, logo, description, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100/50 hover:border-green-200/50"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient background overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-600 to-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Logo container with gradient background */}
        <div className="w-full h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-105 transition-transform duration-300 border border-gray-200/50 group-hover:border-green-200/50">
          <img 
            src={logo} 
            alt={`${name} logo`}
            className="max-w-full max-h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        
        {/* Partner name with gradient text */}
        <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 text-center">
          {name}
        </h3>
        
        {/* Description */}
        {description && (
          <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300 text-center text-sm">
            {description}
          </p>
        )}
        
        {/* Partnership indicator */}
        <div className="flex items-center justify-center gap-2 text-sm font-semibold">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-600 to-green-500 animate-pulse"></div>
          <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Trusted Partner
          </span>
        </div>
      </div>
      
      {/* Decorative corner element */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
    </div>
  );
};

const Partners = () => {
  const partners = [
    
    {
      name: "MIICHub, Makerere University",
      logo: "/images/OFFICIAL-MIIC-LOGO.jpg", 
      description: "We offer tailored Incubation and innovation programs that offer, Structured Business Development support and clear deliverables at every phase of startup development.",
      delay: 200
    },
    {
      name: "Agrimate Farm",
      logo: "/api/placeholder/180/80",
      description: "Leading agricultural innovation partner supporting sustainable farming practices",
      delay: 0
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-300/20 to-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-200/20 to-green-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-100/10 to-green-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section with safari styling */}
        <div className="text-center mb-16">
          {/* Partnership badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-300/30 rounded-full px-4 py-2 mb-6">
            <Handshake className="text-green-600" size={16} />
            <span className="text-green-700 font-medium text-sm tracking-wide">OUR TRUSTED PARTNERS</span>
          </div>
          
          {/* Main heading with gradient text */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
              Partnerships That
            </span>
            <span className="block bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent">
              Drive Excellence
            </span>
          </h2>
          
          {/* Enhanced description */}
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We collaborate with leading conservation organizations, tourism boards, and industry associations 
            to ensure exceptional experiences while protecting Uganda's natural heritage and supporting local communities.
          </p>
          
          
        </div>
        
        {/* Partner cards grid - centered for 2 items */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            {partners.map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default Partners;