import { useState } from 'react';
import { Users, Settings, Heart, Award, Compass, TreePine, Camera, Globe, Star, CheckCircle } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, stats, gradient, hoverColor, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100/50 hover:border-${hoverColor}-200/50`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient background overlay on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        {/* Icon with gradient background */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={28} className="text-white" />
        </div>
        
        {/* Title with gradient text */}
        <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${gradient.replace('to-br', 'to-r')} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center gap-2 text-sm font-semibold">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} animate-pulse`}></div>
          <span className={`bg-gradient-to-r ${gradient.replace('to-br', 'to-r')} bg-clip-text text-transparent`}>
            {stats}
          </span>
        </div>
      </div>
      
      {/* Decorative corner element */}
      <div className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
    </div>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Local Guides",
      description: "Our experienced guides have intimate knowledge of East Africa's wildlife, culture and hidden gems. They bring stories to life and ensure unforgettable encounters.",
      stats: "15+ Years Experience",
      gradient: "from-green-600 to-green-500",
      hoverColor: "green",
      delay: 0
    },
    {
      icon: Settings,
      title: "Customizable Experiences", 
      description: "Tailor your safari adventure to match your interests, preferences, and travel style. From luxury lodges to authentic camping under the stars.",
      stats: "100% Personalized",
      gradient: "from-amber-500 to-orange-500",
      hoverColor: "amber",
      delay: 200
    },
    
    
    {
      icon: Globe,
      title: "Responsible Tourism",
      description: "We practice ethical tourism that respects local cultures, supports communities, and minimizes environmental impact while maximizing your experience.",
      stats: "Certified Eco-Tourism",
      gradient: "from-blue-500 to-cyan-500",
      hoverColor: "blue",
      delay: 800
    },
    {
      icon: Camera,
      title: "Unforgettable Moments",
      description: "From witnessing the Great Migration to tracking mountain gorillas, we create once-in-a-lifetime experiences that will stay with you forever.",
      stats: "5000+ Wildlife Encounters",
      gradient: "from-purple-500 to-pink-500",
      hoverColor: "purple",
      delay: 1000
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-200/10 to-teal-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        {/* Header section with safari styling */}
        <div className="text-center mb-16">
          {/* Safari badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-300/30 rounded-full px-4 py-2 mb-6">
            <Compass className="text-green-600" size={16} />
            <span className="text-green-700 font-medium text-sm tracking-wide">WHY DIRT TRAILS SAFARIS</span>
          </div>
          
          {/* Main heading with gradient text */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Your Gateway to
            </span>
            <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Authentic Africa
            </span>
          </h2>
          
          {/* Enhanced description */}
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are dedicated to providing exceptional travel experiences with a focus on sustainability, 
            authenticity, and unforgettable memories. Every safari is crafted with care, passion, and deep respect for Africa's wildlife and communities.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={16} />
              <span className="text-gray-600">Licensed & Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-amber-500" size={16} />
              <span className="text-gray-600">5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine className="text-green-500" size={16} />
              <span className="text-gray-600">Eco-Friendly</span>
            </div>
          </div>
        </div>
        
        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
        {/* Call to action section */}
        <div className="text-center bg-gradient-to-r from-green-600/10 to-emerald-600/10 backdrop-blur-sm rounded-2xl p-8 border border-green-200/30">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Ready for Your Safari Adventure?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have experienced the magic of East Africa with us. 
            Let's plan your perfect safari adventure today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
           
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
              View Our Tours
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;