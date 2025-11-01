import { useState, useEffect, useRef } from 'react';
import { Compass, TreePine, Star, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

// Add team images to the guides images array
const teamImages = [
  "/images/Gerald.jpg",
  "/images/Mariam.jpg",
  "/images/Joselyne.jpg",
  "/images/George.jpg"
];

const guideImages = [
  ...teamImages,
  "/images/guides/Simeon/john-okello-1.jpg",
  "/images/guides/grace-nambasa.jpg",
  "/images/guides/peter-kamau.jpg"
];

// Import tourist planting images for sustainability card
const plantingImages = [
  "/images/Sharon1.png",
  "/images/angel.png",
  "/images/Sharon.png",
  "/images/uwa.png"
];

const FeatureCard = ({ title, stats, delay = 0, backgroundType }) => {
  // For background slideshows
  const [bgIdx, setBgIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Determine which images to use for the background
  let bgImages: string[] = [];
  if (backgroundType === "guides") bgImages = guideImages;
  if (backgroundType === "planting") bgImages = plantingImages;

  useEffect(() => {
    if (bgImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setBgIdx((prev) => (prev + 1) % bgImages.length);
      }, 3500);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [bgImages.length]);

  return (
    <div 
      className={`group relative ${bgImages.length > 0 ? 'bg-white/100' : 'bg-gray-200'} backdrop-blur-sm rounded-3xl p-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-green-200/50 hover:border-green-400/70 overflow-hidden min-h-[420px] flex flex-col justify-end`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Dynamic background slideshow for specific cards */}
      {bgImages.length > 0 && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImages[bgIdx]}
            alt=""
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700"
            style={{ transition: 'opacity 0.7s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-white/0"></div>
        </div>
      )}
      {/* Gradient background overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-600 to-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10"></div>
      
      <div className="relative z-20 p-8 flex flex-col justify-end h-full min-h-[420px]">
        {/* Title with heavy font and shadow for readability */}
        <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 drop-shadow-2xl uppercase tracking-tight">
          {title}
        </h3>
        {/* Stats with heavy font */}
        <div className="flex items-center gap-2 text-lg font-bold">
          <span className="bg-gradient-to-r from-brown-600 to-brown-500 bg-clip-text text-transparent drop-shadow-lg">
            {stats}
          </span>
        </div>
      </div>
      {/* Decorative corner element */}
      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300 z-20"></div>
    </div>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      title: "Expert Local Guides",
      // description: "Journey with passionate local guides who know East Africa’s wildlife, cultures, and hidden trails. They turn safaris into meaningful, story-filled adventures.",
      stats: "3+ Years Combined Experience",
      delay: 0,
      backgroundType: "guides"
    },
    {
      title: "Customizable Journeys", 
      // description: "Every traveler is unique. Choose from curated safari packages or design your own adventure from gorilla trekking to cultural immersions or camping under the stars.",
      stats: "100% Tailored Safaris",
      delay: 200,
      backgroundType: undefined
    },
    {
      title: "Sustainable Impact",
      // description: "Your travels give back. Each booking supports tree planting, empowers local communities, and promotes conservation ensuring safaris protect what makes Africa special.",
      stats: "1+ Trees Planted Per Safari",
      delay: 400,
      backgroundType: "planting"
    },
    {
      title: "Safety & Comfort",
      // description: "Travel with peace of mind. From secure transport to handpicked eco-lodges, we prioritize your comfort and safety while keeping adventures exciting and authentic.",
      stats: "Trusted by 30+ Travelers",
      delay: 600,
      backgroundType: undefined
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-300/20 to-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-200/20 to-green-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-100/10 to-green-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        {/* Header section with safari styling */}
        <div className="text-center mb-16">
          {/* Safari badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-300/30 rounded-full px-4 py-2 mb-6">
            <Compass className="text-green-600" size={16} />
            <span className="text-green-700 font-medium text-sm tracking-wide">WHY DIRT TRAILS SAFARIS</span>
          </div>
          
          {/* Main heading with gradient text */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
              Your Gateway to
            </span>
            <span className="block bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent">
              Eco-Adventure, Without the Stress.
            </span>
          </h2>
          
          {/* Enhanced description */}
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are dedicated to providing exceptional travel experiences with a focus on sustainability, 
            authenticity, and unforgettable memories. Every safari is crafted with care, passion, and deep respect for Africa's wildlife and communities.
          </p>
          
          {/* Trust indicators with subtle brown accent */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={16} />
              <span className="text-gray-600">Licensed & Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-600" size={16} />
              <span className="text-gray-600">5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine className="text-green-500" size={16} />
              <span className="text-gray-600">Eco-Friendly</span>
            </div>
          </div>
        </div>
        
        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
        {/* Call to action section */}
        <div className="text-center bg-gradient-to-r from-green-600/10 to-green-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-200/30">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Ready to Go Wild? 
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied travelers globally who have experienced the magic of the Wild with us. 
            Let's plan your perfect safari adventure today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tours">
              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
                View Our Tours and Let's Chat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;