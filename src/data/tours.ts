
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TourDay {
  day: number;
  title: string;
  description: string;
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  accommodation: string;
}

export interface TourImage {
  url: string;
  alt: string;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'accommodation' | 'activity' | 'transportation' | 'duration';
  description: string;
  priceAdjustment: number;
}

export interface Tour {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: number;
  price: number;
  discount?: number;
  location: string;
  country: string;
  coverImage: string;
  images: TourImage[];
  mapImage?: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourDay[];
  reviews: Review[];
  rating: number;
  customizationOptions: {
    accommodation: CustomizationOption[];
    activities: CustomizationOption[];
    transportation: CustomizationOption[];
    duration: CustomizationOption[];
  };
  featured: boolean;
}

export const tours: Tour[] = [
  {
    id: "tour-001",
    slug: "masai-mara-safari",
    name: "Masai Mara Safari Adventure",
    tagline: "Witness the great migration in Kenya's iconic wildlife reserve",
    description: "Experience the ultimate African safari in Kenya's world-famous Masai Mara National Reserve. This adventure offers unparalleled wildlife viewing, including the opportunity to witness the Great Migration, one of nature's most spectacular events. Guided by experienced local experts, you'll explore diverse habitats, encounter the Big Five, and immerse yourself in authentic Maasai culture. Stay in comfortable tented camps or luxury lodges, perfectly positioned for optimal game viewing, while enjoying delicious meals featuring local and international cuisine.",
    duration: 6,
    price: 2499,
    location: "Masai Mara",
    country: "Kenya",
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e",
    images: [
      { url: "https://images.unsplash.com/photo-1516426122078-c23e76319801", alt: "Lions resting in Masai Mara" },
      { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b", alt: "Elephants at sunset" },
      { url: "https://images.unsplash.com/photo-1547970498-42d749186a1c", alt: "Safari camp" },
      { url: "https://images.unsplash.com/photo-1504432842032-3361de7418e6", alt: "Giraffe on the savanna" },
    ],
    mapImage: "https://images.unsplash.com/photo-1503221043305-f7498f8b7888",
    highlights: [
      "Witness the Great Migration (seasonal)",
      "Game drives in custom safari vehicles",
      "Visit a traditional Maasai village",
      "Sunrise hot air balloon flight (optional)",
      "Luxurious tented camp accommodations"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified in the itinerary",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Airport transfers",
      "Bottled water during game drives"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Optional activities",
      "Personal expenses",
      "Tips and gratuities",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        description: "Welcome to Kenya! Upon arrival at Jomo Kenyatta International Airport, you'll be greeted by our representative and transferred to your hotel in Nairobi. Depending on your arrival time, you may have the opportunity to explore the city or simply relax at the hotel. In the evening, join us for a welcome dinner where you'll meet your guide and fellow travelers.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Nairobi Serena Hotel"
      },
      {
        day: 2,
        title: "Nairobi to Masai Mara",
        description: "After breakfast, depart for the Masai Mara National Reserve. You'll fly from Wilson Airport to the Mara, where you'll be met by your safari guide. Enjoy a game drive en route to your camp, arriving in time for lunch. In the afternoon, set out on your first game drive in the Mara, known for its exceptional wildlife viewing opportunities.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Governors' Camp"
      },
      {
        day: 3,
        title: "Masai Mara Game Drives",
        description: "Spend the full day exploring the Masai Mara with early morning and late afternoon game drives when animals are most active. Between drives, relax at camp, enjoying delicious meals and the peaceful surroundings. The Mara is home to the 'Big Five' (lion, leopard, elephant, buffalo, and rhino) as well as numerous other species.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Governors' Camp"
      },
      {
        day: 4,
        title: "Masai Mara and Cultural Visit",
        description: "Begin the day with an early game drive, followed by breakfast at camp. Later, visit a traditional Maasai village to learn about their unique customs and way of life. Participate in traditional dances and browse locally-made crafts. Return to camp for lunch and relaxation before your afternoon game drive.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Governors' Camp"
      },
      {
        day: 5,
        title: "Optional Balloon Safari",
        description: "Optional early morning hot air balloon safari over the Mara (additional cost), followed by a champagne breakfast. Continue with game drives throughout the day, seeking out the incredible wildlife that makes the Mara famous. Enjoy a special bush dinner under the stars for your final night in the Mara.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Governors' Camp"
      },
      {
        day: 6,
        title: "Masai Mara to Nairobi and Departure",
        description: "After a final morning game drive and breakfast, transfer to the airstrip for your flight back to Nairobi. Upon arrival, you'll be met and transferred to a day room where you can relax before your international departure. Depending on your flight time, you might visit a local market for souvenirs or the Giraffe Centre. Transfer to the airport for your onward flight.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: "Day room at Nairobi Serena Hotel"
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Sarah Johnson",
        rating: 5,
        comment: "The Masai Mara Safari exceeded all our expectations. Our guide was incredibly knowledgeable, and we saw all of the Big Five! The accommodations were luxurious yet authentic, and the food was amazing. Watching the sunset over the savanna while sipping a sundowner was magical.",
        date: "2023-09-15"
      },
      {
        id: "review-002",
        name: "David Chen",
        rating: 4,
        comment: "Wonderful safari experience! We traveled in June and were lucky enough to see the beginning of the wildebeest migration. The camp was comfortable with excellent service. Only giving 4 stars because the optional balloon ride was canceled due to weather, but everything else was perfect.",
        date: "2023-06-22"
      },
      {
        id: "review-003",
        name: "Emma and Thomas Brown",
        rating: 5,
        comment: "This was our honeymoon trip and it couldn't have been more perfect. The attention to detail was impressive - from our welcome champagne to surprise private dinner under the stars. We saw incredible wildlife including a leopard with cubs and a cheetah hunt. Absolutely worth every penny!",
        date: "2023-08-07"
      }
    ],
    rating: 4.8,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Tented Camp",
          type: "accommodation",
          description: "Comfortable tented accommodations with ensuite bathrooms and essential amenities.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Lodge Upgrade",
          type: "accommodation",
          description: "Spacious rooms or luxury tents with premium amenities, private verandas, and enhanced views.",
          priceAdjustment: 750
        },
        {
          id: "acc-003",
          name: "Premium Safari Camp",
          type: "accommodation",
          description: "Exclusive high-end tented suites with private butler service, plunge pools, and gourmet dining.",
          priceAdjustment: 1200
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Hot Air Balloon Safari",
          type: "activity",
          description: "Early morning hot air balloon flight over the Masai Mara, followed by champagne breakfast.",
          priceAdjustment: 450
        },
        {
          id: "act-002",
          name: "Photography Safari Guide",
          type: "activity",
          description: "Specialized photography guide to help capture the perfect wildlife shots.",
          priceAdjustment: 300
        },
        {
          id: "act-003",
          name: "Extended Maasai Village Visit",
          type: "activity",
          description: "In-depth cultural experience with traditional meals and ceremonies.",
          priceAdjustment: 120
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Shared Safari Vehicle",
          type: "transportation",
          description: "Share your game drives with other travelers (up to 6 per vehicle).",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Private Safari Vehicle",
          type: "transportation",
          description: "Exclusive use of safari vehicle and guide for your party only.",
          priceAdjustment: 800
        },
        {
          id: "trans-003",
          name: "Private Aircraft Charter",
          type: "transportation",
          description: "Private flight transfers between destinations instead of scheduled flights.",
          priceAdjustment: 1500
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 6-Day Safari",
          type: "duration",
          description: "The classic Masai Mara experience as outlined in the itinerary.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 8-Day Safari",
          type: "duration",
          description: "Additional days in the Masai Mara for more game drives and relaxation.",
          priceAdjustment: 890
        },
        {
          id: "dur-003",
          name: "Comprehensive 10-Day Safari",
          type: "duration",
          description: "Extended itinerary including visits to other parks or conservancies.",
          priceAdjustment: 1680
        }
      ]
    },
    featured: true
  },
  {
    id: "tour-002",
    slug: "serengeti-migration",
    name: "Serengeti Migration Explorer",
    tagline: "Follow the wildebeest migration across Tanzania's vast plains",
    description: "Track the Great Migration through Tanzania's Serengeti National Park, witnessing one of nature's most awe-inspiring spectacles. This carefully crafted safari takes you to the heart of the action, following millions of wildebeest, zebra, and gazelle as they make their annual journey in search of fresh grazing. Led by expert guides with intimate knowledge of the migration patterns, you'll have front-row seats to dramatic river crossings, predator-prey interactions, and the raw beauty of the Serengeti ecosystem.",
    duration: 8,
    price: 3299,
    discount: 10,
    location: "Serengeti",
    country: "Tanzania",
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    images: [
      { url: "https://images.unsplash.com/photo-1516426122078-c23e76319801", alt: "Wildebeest crossing river" },
      { url: "https://images.unsplash.com/photo-1547970498-42d749186a1c", alt: "Luxury safari tent" },
      { url: "https://images.unsplash.com/photo-1549366021-9f761d450615", alt: "Serengeti landscape" },
      { url: "https://images.unsplash.com/photo-1591808216268-ce0b98caa1d1", alt: "Leopard in tree" },
    ],
    mapImage: "https://images.unsplash.com/photo-1503221043305-f7498f8b7888",
    highlights: [
      "Track the Great Migration through multiple locations",
      "Visit both Central Serengeti and Ngorongoro Crater",
      "Witness dramatic river crossings (seasonal)",
      "Stay in mobile camps that follow the migration",
      "Expert guide specializing in the migration"
    ],
    inclusions: [
      "All accommodations",
      "Expert migration guide",
      "All meals during safari",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Airport transfers",
      "Bottled water"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Optional activities",
      "Personal expenses",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro International Airport where you'll be met and transferred to your hotel in Arusha. Enjoy a welcome dinner and briefing about your upcoming migration adventure.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Arusha Coffee Lodge"
      },
      {
        day: 2,
        title: "Arusha to Northern Serengeti",
        description: "After breakfast, fly to the northern Serengeti, where your safari guide will meet you. Enjoy a game drive en route to your camp, strategically positioned near potential river crossing points of the migration (July-October). After lunch, set out on an afternoon game drive.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mara River Kogatende Camp"
      },
      {
        day: 3,
        title: "Northern Serengeti River Crossings",
        description: "Full day exploring the northern Serengeti, focusing on the Mara River area where dramatic wildebeest crossings occur. Your guide will position you at the best vantage points to witness these spectacular events, which often attract crocodiles and other predators.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mara River Kogatende Camp"
      },
      {
        day: 4,
        title: "Northern to Central Serengeti",
        description: "After breakfast, game drive south to the Central Serengeti, following the path of the migration. This region features iconic kopjes (rock formations) that serve as lookout points for predators. Arrive at your central Serengeti camp in time for lunch, followed by an afternoon game drive.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Dunia Camp"
      },
      {
        day: 5,
        title: "Central Serengeti",
        description: "Full day in the Central Serengeti, known for its high concentration of big cats. Morning and afternoon game drives with time to relax at camp during the midday heat. The Central Serengeti offers excellent year-round wildlife viewing, complementing the seasonal migration spectacle.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Dunia Camp"
      },
      {
        day: 6,
        title: "Serengeti to Ngorongoro Crater",
        description: "After a final Serengeti game drive, head to the Ngorongoro Conservation Area. Ascend the crater rim for spectacular views and check into your lodge. Enjoy the amenities and views of this UNESCO World Heritage site.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Ngorongoro Serena Lodge"
      },
      {
        day: 7,
        title: "Ngorongoro Crater",
        description: "Early descent into Ngorongoro Crater, a natural enclosure for approximately 25,000 animals. Spend the day exploring this unique ecosystem, home to dense populations of wildlife including rare black rhinos. Return to the lodge in the late afternoon for your farewell dinner.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Ngorongoro Serena Lodge"
      },
      {
        day: 8,
        title: "Ngorongoro to Arusha and Departure",
        description: "After breakfast, drive back to Arusha with a stop at a local market for souvenirs. Enjoy lunch in Arusha before transferring to Kilimanjaro International Airport for your departure flight.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: "Day room available if needed"
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Michael Rodriguez",
        rating: 5,
        comment: "Words cannot describe the experience of seeing the Great Migration in person. Our guide knew exactly where to position us for river crossings, and we witnessed thousands of wildebeest cross while crocodiles waited. The mobile camps were surprisingly comfortable and the staff exceptional.",
        date: "2023-08-20"
      },
      {
        id: "review-002",
        name: "Zoe Williams",
        rating: 5,
        comment: "This was the trip of a lifetime! We saw all of the Big Five plus incredible migration activity. The accommodations were perfect - authentic but comfortable. Our guide Francis was incredibly knowledgeable and spotted animals we would have never seen ourselves.",
        date: "2023-07-15"
      },
      {
        id: "review-003",
        name: "Akira Tanaka",
        rating: 4,
        comment: "Amazing migration safari. We traveled in December and while we didn't see river crossings (wrong season), we witnessed huge herds in the southern Serengeti. The Ngorongoro Crater was incredible - saw 9 lions and 3 rhinos! Only suggestion would be more time in each location.",
        date: "2022-12-03"
      }
    ],
    rating: 4.9,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Classic Safari Camps",
          type: "accommodation",
          description: "Comfortable tented camps with ensuite facilities in prime wildlife viewing locations.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Deluxe Safari Lodges",
          type: "accommodation",
          description: "Upgrade to permanent luxury lodges with enhanced amenities and views.",
          priceAdjustment: 1200
        },
        {
          id: "acc-003",
          name: "Ultra-Luxury Collection",
          type: "accommodation",
          description: "Exclusive high-end properties with exceptional service, gourmet dining, and premium locations.",
          priceAdjustment: 2500
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Walking Safari Addition",
          type: "activity",
          description: "Add guided walking safaris in permitted areas for a different perspective.",
          priceAdjustment: 350
        },
        {
          id: "act-002",
          name: "Maasai Cultural Visit",
          type: "activity",
          description: "Visit an authentic Maasai village to learn about traditional customs and lifestyle.",
          priceAdjustment: 120
        },
        {
          id: "act-003",
          name: "Scenic Helicopter Flight",
          type: "activity",
          description: "30-minute helicopter flight over the Serengeti for a breathtaking aerial perspective.",
          priceAdjustment: 595
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Shared Safari Vehicle",
          type: "transportation",
          description: "Share your safari vehicle with other travelers (maximum 6 per vehicle).",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Private Safari Vehicle",
          type: "transportation",
          description: "Exclusive use of safari vehicle with dedicated guide.",
          priceAdjustment: 1200
        },
        {
          id: "trans-003",
          name: "Luxury Safari Vehicle",
          type: "transportation",
          description: "Upgraded vehicle with enhanced features, refrigerator, and power outlets.",
          priceAdjustment: 800
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 8-Day Itinerary",
          type: "duration",
          description: "The classic migration expedition as described.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 10-Day Safari",
          type: "duration",
          description: "Additional time in key locations for enhanced wildlife viewing opportunities.",
          priceAdjustment: 1190
        },
        {
          id: "dur-003",
          name: "Comprehensive 12-Day Exploration",
          type: "duration",
          description: "Full immersion with added destinations like Tarangire or Lake Manyara.",
          priceAdjustment: 2380
        }
      ]
    },
    featured: true
  },
  {
    id: "tour-003",
    slug: "gorilla-trekking",
    name: "Mountain Gorilla Expedition",
    tagline: "Trek through misty forests to encounter endangered mountain gorillas",
    description: "Journey into the mist-covered forests of Bwindi Impenetrable National Park or Volcanoes National Park for an unforgettable encounter with endangered mountain gorillas. This specialized expedition offers a rare opportunity to observe these gentle giants in their natural habitat, led by experienced trackers and naturalist guides. Beyond gorilla trekking, explore the beautiful landscapes of Uganda or Rwanda, visit local communities, and enjoy comfortable accommodations in stunning settings. This transformative experience connects you with our closest wild relatives while supporting vital conservation efforts.",
    duration: 5,
    price: 3800,
    location: "Bwindi Impenetrable Forest",
    country: "Uganda",
    coverImage: "https://images.unsplash.com/photo-1590312597580-d20b6bf3b24f",
    images: [
      { url: "https://images.unsplash.com/photo-1590312597580-d20b6bf3b24f", alt: "Mountain gorilla" },
      { url: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0", alt: "Misty forest" },
      { url: "https://images.unsplash.com/photo-1553425300-8bd56360f8eb", alt: "Lodge view" },
      { url: "https://images.unsplash.com/photo-1598894559766-da7b133f58e9", alt: "Local dancers" },
    ],
    mapImage: "https://images.unsplash.com/photo-1503221043305-f7498f8b7888",
    highlights: [
      "Gorilla tracking permit included",
      "Small group sizes for intimate experience",
      "Stay at lodges that support conservation",
      "Visit local communities and cultural experiences",
      "Opportunity to see golden monkeys (optional)"
    ],
    inclusions: [
      "Gorilla tracking permit",
      "All accommodations",
      "Expert naturalist guide",
      "All meals as specified",
      "Airport transfers",
      "Community visits",
      "Park fees"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Optional activities",
      "Personal expenses",
      "Tips and gratuities",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Entebbe",
        description: "Arrive at Entebbe International Airport where our representative will meet and transfer you to your hotel. Relax after your journey or explore the shores of Lake Victoria if time permits. Join your guide and fellow travelers for a welcome dinner and briefing about your upcoming gorilla experience.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Hotel No. 5"
      },
      {
        day: 2,
        title: "Fly to Bwindi Impenetrable Forest",
        description: "After breakfast, transfer to Entebbe Airport for your scheduled flight to Kihihi Airstrip. Meet your driver-guide and transfer to your lodge near Bwindi Impenetrable National Park, enjoying the scenic landscapes of rural Uganda. After lunch at the lodge, take a guided community walk to learn about conservation efforts and local culture.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bwindi Lodge"
      },
      {
        day: 3,
        title: "Gorilla Tracking Experience",
        description: "Early breakfast before transferring to the park headquarters for a briefing by the rangers. Embark on your gorilla tracking experience, which can take between 2-6 hours depending on the gorillas' location. Spend a magical hour with a gorilla family, observing their behavior and interactions. Return to the lodge for a late lunch and time to relax and reflect on your experience.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bwindi Lodge"
      },
      {
        day: 4,
        title: "Forest Walk and Community Visit",
        description: "After breakfast, join a guided forest walk to discover the biodiversity of Bwindi, home to over 120 mammal species and 350 bird species. In the afternoon, visit a Batwa Pygmy community to learn about their traditional forest lifestyle and how they're adapting to life outside the forest. Enjoy a cultural performance before returning to your lodge.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bwindi Lodge"
      },
      {
        day: 5,
        title: "Return to Entebbe and Departure",
        description: "After breakfast, transfer to Kihihi Airstrip for your scheduled flight back to Entebbe. Depending on your international flight time, you may have the opportunity for lunch and some souvenir shopping before your transfer to Entebbe International Airport for your departure.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: "Day room if required"
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Jennifer Saunders",
        rating: 5,
        comment: "The gorilla experience was profoundly moving - being so close to these gentle giants in their natural habitat is something I'll never forget. Our guides were passionate and knowledgeable, and the lodge was spectacular with views over the forest. Worth every penny.",
        date: "2023-06-12"
      },
      {
        id: "review-002",
        name: "Marcus Wellington",
        rating: 5,
        comment: "Incredible trip! The trek was challenging but our guides made sure everyone was comfortable. When we found the gorilla family, time stood still - watching a silverback just meters away was humbling. The conservation work being done is impressive and our visit helps support it.",
        date: "2023-04-28"
      },
      {
        id: "review-003",
        name: "Laura and Tim Bennett",
        rating: 4,
        comment: "Amazing experience tracking gorillas. We had a fairly long trek (about 4 hours) but it was worth it. Lodge was beautiful though we would have preferred one closer to the park entrance. The community visit was educational and a highlight alongside the gorillas.",
        date: "2023-07-15"
      }
    ],
    rating: 4.8,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Comfort Lodges",
          type: "accommodation",
          description: "Comfortable lodges with authentic charm and essential amenities.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Premium Ecolodges",
          type: "accommodation",
          description: "Upgraded accommodations with enhanced amenities and prime locations.",
          priceAdjustment: 600
        },
        {
          id: "acc-003",
          name: "Luxury Wilderness Retreats",
          type: "accommodation",
          description: "Exclusive high-end properties with exceptional service and settings.",
          priceAdjustment: 1200
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Second Gorilla Trek",
          type: "activity",
          description: "Add an additional gorilla tracking experience to see a different family group.",
          priceAdjustment: 700
        },
        {
          id: "act-002",
          name: "Golden Monkey Tracking",
          type: "activity",
          description: "Add golden monkey tracking in Mgahinga Gorilla National Park.",
          priceAdjustment: 200
        },
        {
          id: "act-003",
          name: "Batwa Cultural Experience",
          type: "activity",
          description: "Extended cultural immersion with the Batwa indigenous people.",
          priceAdjustment: 150
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Scheduled Flights",
          type: "transportation",
          description: "Shared scheduled flights between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Private Vehicle Transfer",
          type: "transportation",
          description: "Exclusive use of vehicle instead of flights (longer but scenic).",
          priceAdjustment: -200
        },
        {
          id: "trans-003",
          name: "Helicopter Transfers",
          type: "transportation",
          description: "Spectacular helicopter flights between destinations.",
          priceAdjustment: 1500
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 5-Day Itinerary",
          type: "duration",
          description: "The classic gorilla experience as outlined.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 7-Day Experience",
          type: "duration",
          description: "Additional days to explore surrounding areas and wildlife.",
          priceAdjustment: 1200
        },
        {
          id: "dur-003",
          name: "Comprehensive 10-Day Journey",
          type: "duration",
          description: "Complete Ugandan safari including Queen Elizabeth National Park.",
          priceAdjustment: 2400
        }
      ]
    },
    featured: true
  },
  {
    id: "tour-004",
    slug: "safari-Zanzibar-combo",
    name: "Tanzania Safari & Zanzibar Beach",
    tagline: "Combine wildlife adventures with tropical beach relaxation",
    description: "Experience the perfect East African adventure combining thrilling wildlife safaris in Tanzania's northern circuit with relaxation on the tropical paradise of Zanzibar. Begin your journey exploring the wildlife-rich plains of Tarangire, Serengeti, and the Ngorongoro Crater, where you'll encounter abundant game including lions, elephants, wildebeest, and more. After your safari adventure, fly to the exotic spice island of Zanzibar for a beach extension featuring pristine white sand beaches, crystal-clear waters, historic Stone Town, and vibrant marine life.",
    duration: 12,
    price: 4299,
    location: "Tanzania & Zanzibar",
    country: "Tanzania",
    coverImage: "https://images.unsplash.com/photo-1523805009345-7448845a9e53",
    images: [
      { url: "https://images.unsplash.com/photo-1630621689917-748ada7a3574", alt: "Safari vehicle by elephants" },
      { url: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a", alt: "Zanzibar beach" },
      { url: "https://images.unsplash.com/photo-1547970498-42d749186a1c", alt: "Safari tent" },
      { url: "https://images.unsplash.com/photo-1548813370-dd506a30d1a8", alt: "Stone Town architecture" },
    ],
    mapImage: "https://images.unsplash.com/photo-1503221043305-f7498f8b7888",
    highlights: [
      "Safari in Tanzania's premier wildlife areas",
      "Experience the incredible Ngorongoro Crater",
      "Relax on Zanzibar's pristine beaches",
      "Explore historic Stone Town",
      "Snorkeling in coral reefs"
    ],
    inclusions: [
      "All accommodations",
      "Expert safari guide",
      "All meals during safari portion",
      "Breakfast and dinner in Zanzibar",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Domestic flights",
      "Airport transfers",
      "Stone Town tour"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Lunches in Zanzibar",
      "Optional activities",
      "Personal expenses",
      "Tips and gratuities",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro International Airport where you'll be met and transferred to your hotel in Arusha. Relax and recover from your journey in preparation for your safari adventure.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Arusha Coffee Lodge"
      },
      {
        day: 2,
        title: "Arusha to Tarangire National Park",
        description: "After breakfast, drive to Tarangire National Park, famous for its large elephant herds and iconic baobab trees. Enjoy a picnic lunch followed by an afternoon game drive exploring this beautiful park. Continue to your lodge for dinner and overnight.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Tarangire Sopa Lodge"
      },
      {
        day: 3,
        title: "Tarangire to Serengeti National Park",
        description: "After breakfast, drive to the world-famous Serengeti National Park, passing through the Ngorongoro Conservation Area en route. Stop for a picnic lunch and game viewing along the way, arriving at your Serengeti lodge for dinner.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Serengeti Serena Lodge"
      },
      {
        day: 4,
        title: "Full Day Serengeti",
        description: "Full day exploring the Serengeti ecosystem with morning and afternoon game drives. The Serengeti is home to the greatest concentration of plains game in Africa and offers excellent predator sightings throughout the year.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Serengeti Serena Lodge"
      },
      {
        day: 5,
        title: "Serengeti to Ngorongoro",
        description: "Morning game drive in the Serengeti before heading to the Ngorongoro Conservation Area. Ascend the crater rim to your lodge perched on the edge, offering spectacular views over this natural wonder.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Ngorongoro Serena Lodge"
      },
      {
        day: 6,
        title: "Ngorongoro Crater Tour",
        description: "Descend into the Ngorongoro Crater for a full-day tour. This 100-square-mile caldera is home to over 30,000 animals in a remarkably compact area, offering some of Africa's best wildlife viewing. Picnic lunch inside the crater before returning to your lodge.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Ngorongoro Serena Lodge"
      },
      {
        day: 7,
        title: "Ngorongoro to Zanzibar",
        description: "After breakfast, drive to Arusha for lunch. Transfer to Arusha Airport for your flight to Zanzibar. Upon arrival, you'll be met and transferred to your beach resort for check-in and relaxation.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Breezes Beach Club"
      },
      {
        day: 8,
        title: "Zanzibar Beach Relaxation",
        description: "Day at leisure to enjoy the pristine beaches and facilities of your resort. Optional activities include snorkeling, diving, sailing, or spa treatments (additional cost).",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Breezes Beach Club"
      },
      {
        day: 9,
        title: "Stone Town Tour",
        description: "After breakfast, enjoy a guided tour of historic Stone Town, a UNESCO World Heritage site. Explore narrow alleys, visit the House of Wonders, the Old Fort, and the Sultan's Palace. Lunch at a local restaurant before returning to your beach resort.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Breezes Beach Club"
      },
      {
        day: 10,
        title: "Spice Tour and Beach",
        description: "Morning spice tour to learn about Zanzibar's historic spice trade. Visit a spice farm to see, smell, and taste various spices and tropical fruits. Afternoon at leisure to enjoy beach activities.",
        meals: { breakfast: true, lunch: false, dinner: true },
        accommodation: "Breezes Beach Club"
      },
      {
        day: 11,
        title: "Beach Day or Optional Activities",
        description: "Full day at leisure to enjoy beach activities or optional excursions such as a dhow sunset cruise, Jozani Forest to see red colobus monkeys, or a snorkeling trip to Mnemba Atoll (additional cost).",
        meals: { breakfast: true, lunch: false, dinner: true },
        accommodation: "Breezes Beach Club"
      },
      {
        day: 12,
        title: "Departure",
        description: "After breakfast and depending on your flight time, transfer to Zanzibar Airport for your onward flight.",
        meals: { breakfast: true, lunch: false, dinner: false },
        accommodation: "None"
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Alexandra Peters",
        rating: 5,
        comment: "This trip perfectly combined adventure and relaxation! The safari portion was incredible - we saw all the Big Five including a rare black rhino in the crater. Zanzibar was the perfect place to unwind after early morning game drives. Our guide Joseph was exceptional at finding wildlife.",
        date: "2023-02-20"
      },
      {
        id: "review-002",
        name: "Richard and Emily Cooper",
        rating: 4,
        comment: "Excellent combination tour. The safari exceeded expectations with amazing wildlife sightings daily. The beach resort in Zanzibar was beautiful but we would have preferred a location closer to Stone Town for more dining options. Overall a wonderful trip with great guides.",
        date: "2023-05-11"
      },
      {
        id: "review-003",
        name: "The Williams Family",
        rating: 5,
        comment: "Perfect family vacation! Our kids (10 and 14) were mesmerized by the animals on safari and loved the beach activities in Zanzibar. The guides were patient with the children and very educational. Accommodations were family-friendly while still feeling luxurious. Highly recommend!",
        date: "2022-12-28"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Package",
          type: "accommodation",
          description: "4-star lodges and resorts with comfortable amenities.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Deluxe Package",
          type: "accommodation",
          description: "Upgraded 4-5 star properties with enhanced amenities and locations.",
          priceAdjustment: 1200
        },
        {
          id: "acc-003",
          name: "Luxury Package",
          type: "accommodation",
          description: "Exclusive 5-star luxury lodges and beach resorts with premium services.",
          priceAdjustment: 2500
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Hot Air Balloon Safari",
          type: "activity",
          description: "Sunrise hot air balloon flight over the Serengeti followed by champagne breakfast.",
          priceAdjustment: 550
        },
        {
          id: "act-002",
          name: "Scuba Diving Package",
          type: "activity",
          description: "Two-tank dive in Zanzibar's marine sanctuaries with equipment rental.",
          priceAdjustment: 250
        },
        {
          id: "act-003",
          name: "Private Sunset Dhow Cruise",
          type: "activity",
          description: "Private traditional dhow sailing experience with seafood dinner.",
          priceAdjustment: 180
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Shared Safari Vehicle",
          type: "transportation",
          description: "Shared game drives with other travelers (max 6 per vehicle).",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Private Safari Vehicle",
          type: "transportation",
          description: "Exclusive use of safari vehicle with your own guide throughout.",
          priceAdjustment: 1200
        },
        {
          id: "trans-003",
          name: "Flying Safari Option",
          type: "transportation",
          description: "Replace some road transfers with scenic flights between safari destinations.",
          priceAdjustment: 900
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 12-Day Package",
          type: "duration",
          description: "The classic safari and beach combination as described.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 14-Day Experience",
          type: "duration",
          description: "Additional time in both safari areas and beach for a more relaxed pace.",
          priceAdjustment: 1100
        },
        {
          id: "dur-003",
          name: "Brief 10-Day Highlights",
          type: "duration",
          description: "Shortened itinerary focusing on key highlights for time-constrained travelers.",
          priceAdjustment: -800
        }
      ]
    },
    featured: false
  }
];
