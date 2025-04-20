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
    id: "tour-005",
    slug: "queen-elizabeth-safari",
    name: "Queen Elizabeth Wildlife Safari",
    tagline: "Discover Uganda's most diverse national park",
    description: "Experience the rich biodiversity of Queen Elizabeth National Park, home to tree-climbing lions, elephants, and over 600 bird species. This safari combines game drives, boat cruises on the Kazinga Channel, and chimpanzee tracking in Kyambura Gorge.",
    duration: 4,
    price: 1899,
    location: "Queen Elizabeth National Park",
    country: "Uganda",
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    images: [
      { url: "https://images.unsplash.com/photo-1516426122078-c23e76319801", alt: "Tree climbing lions" },
      { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b", alt: "Elephants by the channel" },
      { url: "https://images.unsplash.com/photo-1547970498-42d749186a1c", alt: "Safari lodge" },
      { url: "https://images.unsplash.com/photo-1504432842032-3361de7418e6", alt: "Birds on the channel" },
    ],
    mapImage: "https://images.unsplash.com/photo-1503221043305-f7498f8b7888",
    highlights: [
      "Game drives to spot tree-climbing lions",
      "Boat cruise on Kazinga Channel",
      "Chimpanzee tracking in Kyambura Gorge",
      "Bird watching opportunities",
      "Cultural village visits"
    ],
    inclusions: [
      "All accommodations",
      "Park entry fees",
      "Game drives",
      "Boat cruise",
      "Chimpanzee tracking permit",
      "Professional guide",
      "Meals as specified"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
      "Optional activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Entebbe",
        description: "Arrive at Entebbe International Airport and transfer to your hotel.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Protea Hotel Entebbe"
      },
      {
        day: 2,
        title: "Queen Elizabeth National Park",
        description: "Fly to Queen Elizabeth National Park and enjoy an afternoon game drive.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mweya Safari Lodge"
      },
      {
        day: 3,
        title: "Kazinga Channel and Kyambura Gorge",
        description: "Morning boat cruise on Kazinga Channel and afternoon chimpanzee tracking in Kyambura Gorge.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mweya Safari Lodge"
      },
      {
        day: 4,
        title: "Departure",
        description: "Morning game drive and transfer to the airstrip for your flight back to Entebbe.",
        meals: { breakfast: true, lunch: false, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Emily Clark",
        rating: 5,
        comment: "Amazing experience! Seeing the tree-climbing lions was incredible.",
        date: "2023-09-01"
      },
      {
        id: "review-002",
        name: "John Doe",
        rating: 4,
        comment: "The boat cruise was a highlight. Saw so many animals!",
        date: "2023-08-15"
      },
      {
        id: "review-003",
        name: "Alice Smith",
        rating: 5,
        comment: "Chimpanzee tracking was unforgettable.",
        date: "2023-07-22"
      }
    ],
    rating: 4.6,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Lodge",
          type: "accommodation",
          description: "Comfortable lodge accommodations.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Upgrade",
          type: "accommodation",
          description: "Upgraded luxury accommodations.",
          priceAdjustment: 500
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Hot Air Balloon",
          type: "activity",
          description: "Hot air balloon ride over the park.",
          priceAdjustment: 400
        },
        {
          id: "act-002",
          name: "Night Game Drive",
          type: "activity",
          description: "Night game drive to see nocturnal animals.",
          priceAdjustment: 200
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Standard Flights",
          type: "transportation",
          description: "Scheduled flights.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Private Charter",
          type: "transportation",
          description: "Private chartered flights.",
          priceAdjustment: 1000
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 4-Day",
          type: "duration",
          description: "Standard 4-day itinerary.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 5-Day",
          type: "duration",
          description: "Extended 5-day itinerary.",
          priceAdjustment: 600
        }
      ]
    },
    featured: true
  },
  {
    id: "tour-006",
    slug: "murchison-falls",
    name: "Murchison Falls Adventure",
    tagline: "Witness the world's most powerful waterfall",
    description: "Journey to Murchison Falls National Park to see the mighty Nile squeeze through a narrow gorge before plunging 43 meters. Enjoy game drives, boat safaris, and the chance to spot rare shoebill storks.",
    duration: 3,
    price: 1499,
    location: "Murchison Falls",
    country: "Uganda",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    images: [
      { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b", alt: "Murchison Falls" },
      { url: "https://images.unsplash.com/photo-1516426122078-c23e76319801", alt: "Wildlife viewing" },
      { url: "https://images.unsplash.com/photo-1547970498-42d749186a1c", alt: "Luxury lodge" },
      { url: "https://images.unsplash.com/photo-1504432842032-3361de7418e6", alt: "River cruise" }
    ],
    mapImage: "https://images.unsplash.com/photo-1503221043305-f7498f8b7888",
    highlights: [
      "Visit the powerful Murchison Falls",
      "Game drives in the savannah",
      "Nile River boat safari",
      "Shoebill stork habitat",
      "Traditional village visits"
    ],
    inclusions: [
      "All accommodations",
      "Park entry fees",
      "Game drives",
      "Boat safari",
      "Professional guide",
      "Meals as specified"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
      "Optional activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Entebbe",
        description: "Arrive at Entebbe International Airport and transfer to your hotel.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Protea Hotel Entebbe"
      },
      {
        day: 2,
        title: "Murchison Falls National Park",
        description: "Fly to Murchison Falls National Park and enjoy an afternoon game drive.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 3,
        title: "Boat Safari and Falls Hike",
        description: "Morning boat safari on the Nile and afternoon hike to the top of Murchison Falls.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
    ],
    reviews: [
      {
        id: "review-001",
        name: "Bob Johnson",
        rating: 5,
        comment: "The falls are breathtaking! A must-see.",
        date: "2023-09-05"
      },
      {
        id: "review-002",
        name: "Susan Lee",
        rating: 4,
        comment: "The boat safari was excellent. Saw lots of wildlife.",
        date: "2023-08-20"
      },
      {
        id: "review-003",
        name: "Tom Davis",
        rating: 5,
        comment: "Hiking to the top of the falls was a highlight.",
        date: "2023-07-28"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Lodge",
          type: "accommodation",
          description: "Comfortable lodge accommodations.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Upgrade",
          type: "accommodation",
          description: "Upgraded luxury accommodations.",
          priceAdjustment: 400
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Hot Air Balloon",
          type: "activity",
          description: "Hot air balloon ride over the park.",
          priceAdjustment: 500
        },
        {
          id: "act-002",
          name: "Shoebill Tracking",
          type: "activity",
          description: "Dedicated shoebill stork tracking excursion.",
          priceAdjustment: 300
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Standard Flights",
          type: "transportation",
          description: "Scheduled flights.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Private Charter",
          type: "transportation",
          description: "Private chartered flights.",
          priceAdjustment: 900
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 3-Day",
          type: "duration",
          description: "Standard 3-day itinerary.",
          priceAdjustment: 0
        }
      ]
    },
    featured: false
  },
  {
    id: "tour-007",
    slug: "kibale-primates",
    name: "Kibale Forest Primate Safari",
    tagline: "Track chimpanzees in the primate capital of the world",
    description: "Explore Kibale Forest National Park, home to 13 primate species including chimpanzees. Experience guided nature walks, bird watching, and cultural encounters with local communities.",
    duration: 4,
    price: 1699,
    location: "Kibale Forest",
    country: "Uganda",
    coverImage: "https://images.unsplash.com/photo-1547970498-42d749186a1c",
    images: [
      { url: "https://images.unsplash.com/photo-1547970498-42d749186a1c", alt: "Chimpanzee tracking" },
      { url: "https://images.unsplash.com/photo-1516426122078-c23e76319801", alt: "Forest walks" },
      { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b", alt: "Lodge exterior" },
      { url: "https://images.unsplash.com/photo-1504432842032-3361de7418e6", alt: "Local culture" }
    ],
    mapImage: "https://images.unsplash.com/photo-1503221043305-f7498f8b7888",
    highlights: [
      "Chimpanzee tracking experience",
      "13 different primate species",
      "Guided forest walks",
      "Bird watching opportunities",
      "Cultural community visits"
    ],
    inclusions: [
      "All accommodations",
      "Park entry fees",
      "Chimpanzee tracking permit",
      "Professional guide",
      "Meals as specified",
      "Guided nature walks"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
      "Optional activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Entebbe",
        description: "Arrive at Entebbe International Airport and transfer to your hotel.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Protea Hotel Entebbe"
      },
      {
        day: 2,
        title: "Kibale Forest National Park",
        description: "Drive to Kibale Forest National Park.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Primate Lodge Kibale"
      },
      {
        day: 3,
        title: "Chimpanzee Tracking",
        description: "Chimpanzee tracking in Kibale Forest.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Primate Lodge Kibale"
      },
      {
        day: 4,
        title: "Departure",
        description: "Drive back to Entebbe.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Karen White",
        rating: 5,
        comment: "Amazing chimpanzee tracking experience!",
        date: "2023-09-10"
      },
      {
        id: "review-002",
        name: "Peter Green",
        rating: 4,
        comment: "Saw so many primates!",
        date: "2023-08-25"
      },
      {
        id: "review-003",
        name: "Linda Brown",
        rating: 5,
        comment: "The forest walks were beautiful.",
        date: "2023-08-01"
      }
    ],
    rating: 4.5,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Lodge",
          type: "accommodation",
          description: "Comfortable lodge accommodations.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Upgrade",
          type: "accommodation",
          description: "Upgraded luxury accommodations.",
          priceAdjustment: 300
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Bird Watching",
          type: "activity",
          description: "Dedicated bird watching excursion.",
          priceAdjustment: 150
        },
        {
          id: "act-002",
          name: "Cultural Visit",
          type: "activity",
          description: "Visit to a local community.",
          priceAdjustment: 100
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Standard Transport",
          type: "transportation",
          description: "Standard transportation.",
          priceAdjustment: 0
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 4-Day",
          type: "duration",
          description: "Standard 4-day itinerary.",
          priceAdjustment: 0
        }
      ]
    },
    featured: true
  },
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
        title: "Hot Air Balloon Safari",
        description: "Optional pre-dawn hot air balloon safari over the Masai Mara, offering a spectacular aerial view of the landscape and wildlife below. After landing, enjoy a champagne breakfast in the bush. Return to camp for lunch and an afternoon game drive, focusing on finding any wildlife you may not have yet encountered.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Governors' Camp"
      },
      {
        day: 6,
        title: "Masai Mara to Nairobi",
        description: "Final early morning game drive, followed by breakfast at camp. Fly back to Nairobi and transfer to a day room. Optional visit to the Giraffe Center or Sheldrick Wildlife Trust before your evening departure flight.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: "Day room if required"
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Michael Johnson",
        rating: 5,
        comment: "Seeing the Great Migration was a dream come true. Our guide was exceptional at finding the best viewing spots. The camp was luxurious and the food amazing.",
        date: "2023-08-15"
      },
      {
        id: "review-002",
        name: "Sarah Williams",
        rating: 5,
        comment: "The hot air balloon ride over the Mara at sunrise was worth every penny. We saw so many animals and the landscapes were breathtaking.",
        date: "2023-07-22"
      },
      {
        id: "review-003",
        name: "David and Lisa Chen",
        rating: 4,
        comment: "Great safari experience. Saw the Big Five within two days! The camp was very comfortable though nights were chilly. The Maasai village visit was enlightening.",
        date: "2023-09-10"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Luxury Tented Camp",
          type: "accommodation",
          description: "Classic safari tented camp with all amenities.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Premium Lodge Upgrade",
          type: "accommodation",
          description: "Upgrade to a premium safari lodge.",
          priceAdjustment: 800
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Hot Air Balloon Safari",
          type: "activity",
          description: "Dawn hot air balloon ride with champagne breakfast.",
          priceAdjustment: 450
        },
        {
          id: "act-002",
          name: "Photography Workshop",
          type: "activity",
          description: "Wildlife photography workshop with a professional.",
          priceAdjustment: 300
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Scheduled Flights",
          type: "transportation",
          description: "Regular scheduled flights between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Private Charter",
          type: "transportation",
          description: "Private aircraft charter for your group.",
          priceAdjustment: 1200
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 6-Day Safari",
          type: "duration",
          description: "The classic 6-day Masai Mara experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 8-Day Safari",
          type: "duration",
          description: "Extended safari with more time in the Mara.",
          priceAdjustment: 1400
        }
      ]
    },
    featured: true
  }
];
