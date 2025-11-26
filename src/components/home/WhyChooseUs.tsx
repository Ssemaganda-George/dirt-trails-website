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
  "/images/guides/Simeon/john-okello-20.jpg",
  "/images/guides/Simeon/john-okello-17.jpg",
];

// Import tourist planting images for sustainability card
const plantingImages = [
  "/images/Sharon1.png",
  "/images/angel.png",
  "/images/Sharon.png",
  "/images/uwa.png"
];

const FeatureCard = ({ title, stats, delay = 0, backgroundType }) => {
  const [bgIdx, setBgIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      className={`group relative ${bgImages.length > 0 ? 'bg-white/100' : 'bg-gray-200'} backdrop-blur-sm rounded-3xl p-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-green-200/50 hover:border-green-400/70 overflow-hidden min-h-[280px] sm:min-h-[320px] md:min-h-[350px] lg:min-h-[400px] xl:min-h-[420px] flex flex-col`}
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
      
      <div className="relative z-20 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-end flex-grow">
        {/* Title with improved responsive font sizes */}
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 drop-shadow-2xl uppercase tracking-tight leading-tight break-words">
          {title}
        </h3>
        {/* Stats with improved responsive font sizes */}
        <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg font-bold">
          <span className="bg-gradient-to-r from-brown-600 to-brown-500 bg-clip-text text-transparent drop-shadow-lg leading-relaxed break-words">
            {stats}
          </span>
        </div>
      </div>
      {/* Decorative corner element */}
      <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-green-600 to-green-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300 z-20"></div>
    </div>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      title: "Expert Local Guides",
      stats: "Our passionate guides deliver unparalleled value and expertise",
      delay: 0,
      backgroundType: "guides"
    },
    {
      title: "Customizable Journeys", 
      stats: "Get maximum value with fully tailored safaris",
      delay: 200,
      backgroundType: undefined
    },
    {
      title: "Sustainable Impact",
      stats: "Experience the true value of responsible travel",
      delay: 400,
      backgroundType: "planting"
    },
    {
      title: "Safety & Comfort",
      stats: "Travel with complete peace of mind",
      delay: 600,
      backgroundType: undefined
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-cream relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cream/40 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cream/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/60 rounded-full blur-lg"></div>
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-cream text-accent px-4 py-2 rounded-full text-sm font-medium mb-3 sm:mb-4 md:mb-6">
            <Compass className="text-accent w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-accent font-medium text-xs sm:text-sm tracking-wide">WHY DIRT TRAILS SAFARIS</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight px-2">
            <span className="block bg-gradient-to-r from-brown-600 via-brown-700 to-brown-800 bg-clip-text text-transparent break-words">
              Your Gateway to
            </span>
            <span className="block bg-gradient-to-r from-accent via-accent to-accent bg-clip-text text-transparent break-words">
              Eco-Adventure, Without the Stress.
            </span>
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-brown-600 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4">
            We are dedicated to providing exceptional travel experiences with a focus on sustainability,
            authenticity, and unforgettable memories. Every safari is crafted with care, passion, and deep respect for Africa's wildlife and communities.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-4 sm:mt-5 md:mt-6 lg:mt-8 text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2">
              <CheckCircle className="text-accent w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-brown-600">Licensed & Certified</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Star className="text-yellow-600 w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-brown-600">5-Star Rated</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <TreePine className="text-accent w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-brown-600">Eco-Friendly</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
        <div className="text-center bg-cream backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 border border-cream mx-2 sm:mx-0">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-accent to-accent bg-clip-text text-transparent">
            Ready to Go Wild?
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-brown-600 mb-3 sm:mb-4 md:mb-5 lg:mb-6 max-w-2xl mx-auto px-2">
            Join thousands of satisfied travelers globally who have experienced the magic of the Wild with us.
            Let's plan your perfect safari adventure today.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <Link to="/tours">
              <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap">
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