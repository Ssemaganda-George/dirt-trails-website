import type { PricingTier } from '@/types/pricing';

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
  // Optional pricing tiers (min/max people, price per person, label)
  pricingTiers?: PricingTier[];
}

export const tours: Tour[] = [
  {
    id: "tour-005",
    slug: "queen-elizabeth-safari",
    name: "3 Days Lifetime Wildlife Safari-Queen Elizabeth National Park",
    tagline: "Discover Uganda's most diverse national park",
    description: "You are welcome to this adventure that takes you to Queen Elizabeth national park, Uganda's second largest national park that covers an area of 1978 square km. This trip to the medley of wonders will offer you an opportunity to experience and encounter the most outstanding moment, as you will be able to see animals like Lions, Elephants, Leopards, Buffaloes and many others.During your game drive, you will be able to see animals like Lions, Elephants, Leopards, Buffaloes and many others. And the boat cruise that will be done along Kazinga channel will offer you a chance to see hippos, crocodiles, water birds and others.",
    duration: 3,
    price: 1900,
    location: "Queen Elizabeth National Park",
    country: "Uganda",
    coverImage: "/images/queen-Elizabeth.jpeg",
    images: [
      { url: "/images/queen-Elizabeth.jpeg", alt: "Tree climbing lions" },
      { url: "/images/murchison-falls-view.jpg", alt: "Elephants by the channel" },
      { url: "/images/kibaale.jpeg", alt: "Safari lodge" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Birds on the channel" },
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Game drives to spot tree-climbing lions in Ishasha sector",
      "Boat cruise on Kazinga Channel",
      "Chimpanzee tracking in Kyambura Gorge",
      "Bird watching with over 600 species",
      "Cultural encounters with local communities",
      "Visit to Maramagambo Forest",
      "Crater lakes exploration"
    ],
    inclusions: [
      "Private 4WD safari vehicle with pop-up roof",
      "Professional English-speaking driver-guide",
      "Park entrance fees",
      "Accommodation as per itinerary",
      "All meals (breakfast, lunch, dinner)",
      "Kazinga Channel boat cruise",
      "Game drives",
      "Bottled water during activities",
      "Government taxes"
    ],
    exclusions: [
      "International flights",
      "Uganda entry visa (USD 50)",
      "Travel and medical insurance",
      "Personal expenses and souvenirs",
      "Tips and gratuities for guides and staff",
      "Alcoholic beverages",
      "Laundry services",
      "Optional activities not mentioned in itinerary"
    ],
    itinerary: [
      {
        day: 1,
        title: "Transfer from Kampala to Queen Elizabeth National Park",
        description: "You will begin your trip from Kampala to Queen Elizabeth national park with a morning briefing by your guide upon pick up, and then begin your trip to Queen Elizabeth national park, with a number of stopovers for photography, snacks, and relaxing.You will take a stopover at the equator along masaka road, and lunch at a selected restaurant. Then after your lunch, you will embark on your journey, to the park, check in from the hotel and relax as you wait for the next day.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Hotel No. 5"
      },
      {
        day: 2,
        title: "Morning Game Drive and Afternoon Kazinga Channel Boat Cruise",
        description: "You will wake early in the morning with the early grazers, have your breakfast, and then head to the jungle, in search for the wild residents. During this game drive, you will have an opportunity to see a number wildlife, including the elephants, buffaloes, lions, leopards, beautiful birds and many others. Then then after, head to the lodge for your lunch, as your prepare for the afternoon boat cruise.Afternoon boat cruise  You will get set for the 2-3 hours boat cruise along Kazinga channel, that connects Lakes Edward and George, with over 40kn long. You will be able to see a number of animals more especially the water life, like Hippos, crocodiles, water birds like kingfishers and many others.You will after, head back to the lodge for dinner and overnight. ",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bwindi Lodge"
      },
      {
        day: 3,
        title: "Transfer To Kampala",
        description: "After your morning breakfast, you will exit the park with many memories, you will exit the park as you embark on the most engaging moments and memories and drive back to Kampala,You will drive and have your lunch enroute from a selected restaurant. You will reach in Kampala in the evening, and be dropped to your hotel or to the airport or Kampala, or at your respective homes.End of The Tour.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: "End of tour"
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Emily Clark",
        rating: 5,
        comment: "Amazing experience! Seeing the tree-climbing lions in Ishasha was incredible. Our guide was very knowledgeable about Ugandan wildlife.",
        date: "2023-09-01"
      },
      {
        id: "review-002",
        name: "John Serugo",
        rating: 4,
        comment: "The Kazinga Channel boat cruise was a highlight. Saw so many hippos and birds! The lodge was comfortable.",
        date: "2023-08-15"
      },
      {
        id: "review-003",
        name: "Alice Smith",
        rating: 5,
        comment: "Chimpanzee tracking in Kyambura Gorge was unforgettable. Great value for money!",
        date: "2023-07-22"
      }
    ],
    rating: 4.6,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Budget Camping",
          type: "accommodation",
          description: "Basic camping with shared facilities at Uganda Wildlife Authority bandas or community campsites. Includes sleeping bags and basic meals.",
          priceAdjustment: -41
        },
        {
          id: "acc-002",
          name: "Mid-range Lodge",
          type: "accommodation",
          description: "Comfortable mid-range lodges like Bush Lodge or Simba Safari Camp with en-suite rooms and restaurant facilities.",
          priceAdjustment: 0
        },
        {
          id: "acc-003",
          name: "Luxury Safari Lodge",
          type: "accommodation",
          description: "Upmarket lodges like Mweya Safari Lodge or Katara Lodge with premium amenities, spa services, and stunning views.",
          priceAdjustment: 95
        },
        {
          id: "acc-004",
          name: "Community Homestay",
          type: "accommodation",
          description: "Authentic cultural experience staying with local families in nearby communities. Includes traditional meals and cultural activities.",
          priceAdjustment: -27
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Chimpanzee Tracking - Kyambura Gorge",
          type: "activity",
          description: "Track chimpanzees in the 'Valley of Apes' - Kyambura Gorge. 2-4 hour guided trek to observe our closest relatives in their natural habitat.",
          priceAdjustment: 41
        },
        {
          id: "act-002",
          name: "Night Game Drive",
          type: "activity",
          description: "Guided night game drive to spot nocturnal animals like leopards, hyenas, bush babies, and nightjars. Unique opportunity to see different animal behavior.",
          priceAdjustment: 22
        },
        {
          id: "act-003",
          name: "Crater Lakes Exploration",
          type: "activity",
          description: "Visit the beautiful crater lakes around Queen Elizabeth NP including Lake Katwe (salt mining), Lake Munyanyange, and other scenic crater lakes.",
          priceAdjustment: 16
        },
        {
          id: "act-004",
          name: "Cultural Village Visit",
          type: "activity",
          description: "Visit local communities around the park to learn about traditional lifestyle, crafts, and cultural practices. Includes traditional dance performances.",
          priceAdjustment: 11
        },
        {
          id: "act-005",
          name: "Maramagambo Forest Walk",
          type: "activity",
          description: "Guided nature walk through Maramagambo Forest to see primates, birds, and visit the bat cave and python cave.",
          priceAdjustment: 14
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Shared Safari Vehicle",
          type: "transportation",
          description: "Shared 4WD safari vehicle with pop-up roof, accommodating 6-7 passengers. Cost-effective option for budget travelers.",
          priceAdjustment: -32
        },
        {
          id: "trans-002",
          name: "Private Safari Vehicle",
          type: "transportation",
          description: "Private 4WD safari vehicle with pop-up roof and professional driver-guide. Maximum comfort and flexibility.",
          priceAdjustment: 0
        },
        {
          id: "trans-003",
          name: "Luxury Safari Vehicle",
          type: "transportation",
          description: "Premium 4WD vehicle with air conditioning, mini-fridge, and enhanced comfort features. Ideal for luxury travelers.",
          priceAdjustment: 54
        },
        {
          id: "trans-004",
          name: "Fly-in Safari",
          type: "transportation",
          description: "Chartered flight from Entebbe to Mweya or Kasese airstrip, significantly reducing travel time. Ground transfers included.",
          priceAdjustment: 216
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "2 Days Express Safari",
          type: "duration",
          description: "Quick 2-day safari focusing on game drives and Kazinga Channel boat cruise. Perfect for short visits to Uganda.",
          priceAdjustment: -49
        },
        {
          id: "dur-002",
          name: "3 Days Standard Safari",
          type: "duration",
          description: "Standard 3-day itinerary covering main attractions including Ishasha tree-climbing lions and Kazinga Channel.",
          priceAdjustment: 0
        },
        {
          id: "dur-003",
          name: "4 Days Extended Safari",
          type: "duration",
          description: "Extended safari including chimpanzee tracking, cultural visits, and more game drives. More relaxed pace with extra activities.",
          priceAdjustment: 68
        },
        {
          id: "dur-004",
          name: "5 Days Comprehensive Safari",
          type: "duration",
          description: "Comprehensive experience with all major activities, rest days, and optional visits to nearby attractions like Kibale Forest.",
          priceAdjustment: 122
        }
      ]
    },
    featured: true
},
  {
    id: "tour-006",
    slug: "murchison-falls",
    name: "3 Days Wildlife Encounter- Murchison Falls NP",
    tagline: "Witness the world's most powerful waterfall",
    description: "The park is located in west Nile and have a number of activities that reward you with the great connection to the nature.  You will enjoy the great and stunning view of the falls standing on the top. The park is home for a number of wildlife including the lions, elephants, buffaloes, giraffes, warthogs, leopards, hippos, and many others.While on your boat cruise, you will be able to encounter the number of animals, like hippos, crocodiles, elephants, and others. The boat cruise starts from the lower side of the river Nile, and cruise as you head towards the bottom of the falls. This will be very interesting and engaging moment",
    duration: 3,
    price: 1500,
    location: "Murchison Falls",
    country: "Uganda",
    coverImage: "/images/murchison-falls-view.jpg",
    images: [
      { url: "/images/murchison-falls-view.jpg", alt: "Murchison Falls" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Wildlife viewing" },
      { url: "/images/kibaale.jpeg", alt: "Luxury lodge" },
      { url: "/images/murchison-falls-view.jpg", alt: "River cruise" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Visit the powerful Murchison Falls",
      "Game drives in the savannah",
      "Nile River boat safari",
      "Shoebill stork habitat",
      "Traditional village visits"
    ],
    inclusions: [
      "Transportation",
"Park entrance",
"Accommodation",
"Boat cruise",
"Game drive",
"Safari guide",

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
   description: "Pick Up And Transfer From Kampala To Murchison Falls National Park. You will be picked up by our driver guide smart and in our uniform who will welcome you, and brief you about this amazing and fascinating safari in Uganda. You will start the journey and drive through kampala, one of Africa's 24/7 busy cities. You drive then to Murchison falls national park as you will drive along kampala-gulu highway, as you drive a near the most fascinating, rewarding and beautiful nature of Uganda. You will proceed to Kabalega dinners for your lunch, and the after lunch, you will proceed to Murchison falls national park. You will enter the park through kicumbanyobo gate, check in from the park entrance and as you enter the park, you will be welcomed by the sturbon baboons, singing birds, and the beautiful scent of nature. You reach the hotel, check in and then drive to the top of the falls, where you will view the falls, that is one of world's powerful where over 300 cubic meters volume of water forces itself into a narrow rock. You will have your dinner and overnight as you wait for the next day.",
   meals: { breakfast: false, lunch: false, dinner: true },
   accommodation: "Protea Hotel Entebbe"
 },
      {
        day: 2,
        title: "Morning Game Drive And Afternoon Boat Cruise.",
        description: "You will be welcomed to a new day with a beautiful and delicious African made breakfast, and then you start a new day by driving into the jungle.You will go in for a morning game drive where you will be able to meet and encounter the wild residents including the lions, leopards, elephants,  bufalloes and many others.These wild resident will potray a clear reason for you being in this fascinating and touristic destination. Enjoy the more than a rewarding moments with these wild animals.You will then return to the lodge for your lunch and thereafter, you will go in for an afternoon boat cruise along the river nile, that takes approximately 3 hours. Within the boat cruise, you will be able to meet a number of animals like the hippos, crocodiles, and water birds. You will also be able to see more other animals that come to drink waters on the river nile.You will then return to the hotel and relax, have your dinner and overnight.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 3,
        title: "Transfer To Kampala",
        description: "After your morning breakfast, you will exit the park with a lot of memories, you will exit the park as you embark on the most engaging moments and memories and drive back to kampala,You will drive and have your lunch enroute from a selected restaurant. You will reach in kampala in the evening, and be dropped to your hotel or to the airport for your flight.End Of The Tour.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "End of tour"
      }
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
        name: "Budget Camping",
        type: "accommodation",
        description: "Basic camping at Red Chilli Rest Camp or UWA bandas with shared facilities and camping gear provided.",
        priceAdjustment: -49
      },
      {
        id: "acc-002",
        name: "Mid-range Lodge",
        type: "accommodation",
        description: "Comfortable lodges like Pakuba Safari Lodge or Fort Murchison Lodge with en-suite facilities.",
        priceAdjustment: 0
      },
      {
        id: "acc-003",
        name: "Luxury Safari Lodge",
        type: "accommodation",
        description: "Premium lodges like Chobe Safari Lodge or Nile Safari Lodge with luxury amenities and Nile views.",
        priceAdjustment: 270
      },
      {
        id: "acc-004",
        name: "Community Homestay",
        type: "accommodation",
        description: "Stay with local communities near the park, experiencing traditional lifestyle and local cuisine.",
        priceAdjustment: -32
      }
    ],
      activities: [
      {
        id: "act-001",
        name: "Nile Delta Boat Cruise",
        type: "activity",
        description: "Extended boat cruise to Nile Delta where the Nile enters Lake Albert. Excellent for bird watching and wildlife.",
        priceAdjustment: 32
      },
      {
        id: "act-002",
        name: "Ziwa Rhino Sanctuary Visit",
        type: "activity",
        description: "Visit Ziwa Rhino Sanctuary en route to track white rhinos on foot. Uganda's only place to see rhinos.",
        priceAdjustment: 54
      },
      {
        id: "act-003",
        name: "Top of the Falls Hike",
        type: "activity",
        description: "Hike to the top of Murchison Falls for spectacular views and photo opportunities of the world's most powerful waterfall.",
        priceAdjustment: 11
      },
      {
        id: "act-004",
        name: "Night Game Drive",
        type: "activity",
        description: "Guided night game drive to spot nocturnal animals like leopards, hyenas, and bush babies.",
        priceAdjustment: 27
      },
      {
        id: "act-005",
        name: "Sport Fishing on the Nile",
        type: "activity",
        description: "Catch and release fishing for the famous Nile perch and other fish species on the Victoria Nile.",
        priceAdjustment: 54
      }
    ],
      transportation: [
      {
        id: "trans-001",
        name: "Shared Safari Vehicle",
        type: "transportation",
        description: "Shared 4WD vehicle for transfers between Ziwa and Jinja. Budget-friendly option.",
        priceAdjustment: -22
      },
      {
        id: "trans-002",
        name: "Private Safari Vehicle",
        type: "transportation",
        description: "Private 4WD vehicle with professional driver-guide for flexible transfers.",
        priceAdjustment: 0
      },
      {
        id: "trans-003",
        name: "Luxury Safari Vehicle",
        type: "transportation",
        description: "Premium 4WD with air conditioning and comfort features for smooth transfers.",
        priceAdjustment: 32
      },
      {
        id: "trans-004",
        name: "Helicopter Transfer",
        type: "transportation",
        description: "Helicopter transfer from Entebbe to Jinja with scenic aerial views of the Nile.",
        priceAdjustment: 811
      }
    ],
      duration: [
      {
        id: "dur-001",
        name: "2 Days Express Safari",
        type: "duration",
        description: "Quick 2-day safari with game drive and boat cruise to Murchison Falls. Fly-in recommended due to 6–8-hour drive.",
        priceAdjustment: -54
      },
      {
        id: "dur-002",
        name: "3 Days Standard Safari",
        type: "duration",
        description: "Standard 3-day itinerary with game drives, boat cruise, and top of falls hike.",
        priceAdjustment: 0
      },
      {
        id: "dur-003",
        name: "4 Days Extended Safari",
        type: "duration",
        description: "Extended safari including Ziwa Rhino Sanctuary and additional game drives.",
        priceAdjustment: 81
      },
      {
        id: "dur-004",
        name: "5 Days Comprehensive Safari",
        type: "duration",
        description: "Comprehensive experience with all activities, rest days, and Nile Delta exploration.",
        priceAdjustment: 135
      }
    ]
    },
    featured: false
  },
  {
    id: "tour-003",
    slug: "gorilla-trekking",
    name: "Mountain Gorilla Expedition",
    tagline: "Trek through misty forests to encounter endangered mountain gorillas",
    description: "This trip gives you an opportunity to experience and explore the medley of wonders in this most visited wildlife safari park in Uganda, start the day the way nature intended at the crack of dawn to see the wild residents emerge for a drink from the bushy waterholes as the sun begins to rise over the iconic bush veld scenery. This trip engages all your senses when you combine it with Ultimate Gorilla Tracking experience in Bwindi as a Highlight for the Best of Uganda Ultimate Primate safari.",
    duration: 5,
    price: 3800,
    location: "Queen Elizabeth & Bwindi Forest National Park",
    country: "Uganda",
    coverImage: "/images/gorilla-uganda-primate-trekking-eating.jpeg",

    images: [
      { url: "/images/gorilla-uganda-primate-trekking-eating.jpeg", alt: "Mountain gorilla" },
      { url: "/images/kibaale.jpeg", alt: "Misty forest" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Lodge view" },
      { url: "/images/murchison-falls-view.jpg", alt: "Local scenery" },
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Gorilla tracking permit included",
      "Visit local communities and cultural experiences",
      "Opportunity to see golden monkeys (optional)"
    ],
    inclusions: [
      "Meals",
      "Accommodation",
      "Transportation",
      "Soft drinks",
      "Part entrance fees",
      "Gorilla tracking permit",
      "Boat cruise",
      "Game drives",
      "Safari guide"
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
        title: "Transfer from Kampala to Queen Elizabeth NP with stopover at Equator and Igongo Cultural Center For Lunch",
        description: "Pick up from Kampala or Entebbe international Airport and drive to Queen Elizabeth National park, with stopover at Equator crossing point at kayabwe and then proceed to Igongo cultural center in Mbarara for Lunch later after Lunch drive through Bushenyi and enjoy beautiful view of Tea plantations of south western Uganda to Queen Elizabeth National Park and check in at the Lodge in the evening.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Hotel No. 5"
      },
      {
        day: 2,
        title: "Morning Game Drive and Afternoon Boat Cruise",
        description: "After early morning Breakfast drive to Kasenyi plains for morning game drive which gives you the best African classic safari experience which engages all your senses with such a beautiful scenery of Rwenzori ranges and crater lakes animals expected to be sighted includes; Buffaloes, elephants, Uganda Kobs, Warthogs, Water bucks, Lions and baboons and varieties of Birds such as grey crown cranes, Southern Red bishop.Drive back to the lodge for warm Lunch, after lunch drive to mweya for the afternoon Boat cruise along the Kazinga channel for best of this un-forgettable and memorable experience while on the boat for two hours cruise to lake Edward where you will see local fishermen, this trip highlights are elephants which come down to the banks to drink and swim, several school of Hippopotamuses, Crocodiles basking at the banks and other animals like Buffaloes, water bucks with varieties of water birds such as, Great cormorant, pied kingfisher, African fish eagle etc.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bwindi Lodge"
      },
      {
        day: 3,
        title: "Transfer to Bwindi Impenetrable Forest National Park",
        description: "You will then drive to Bwindi Impenetrable National Park with stop over for lunch en-route at selected Restaurant, Driving on these snake roads of kigezi region it is another great experience and check in at the Lodge in the evening as you relax after this long drive",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bwindi Lodge"
      },
      {
        day: 4,
        title: "Gorilla Tracking in Bwindi Impenetrable National Park",
        description: "After Early Morning Breakfast drive to Gorilla tracking Briefing Point along with your packed lunch after briefing set off to meet the Beautiful giants in the forest enjoy the time with these closest giants to human.After tracking drive back to the lodge and have your time and relax as you enjoy the perfect view of Bwindi impenetrable forest, enjoy the balcony view of the forest from your room or on your private patio just outside at the shade besides the restaurant and the Bar.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bwindi Lodge"
      },
      {
        day: 5,
        title: "Transfer Back to Kampala",
        description: "After early morning, breakfast Drive, back to Kampala with stop over for lunch at selected Restaurant enroute. ",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: "End of tour"
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
        name: "Budget Camping",
        type: "accommodation",
        description: "Basic camping at UWA bandas or community campsites near Bwindi. Shared facilities with sleeping bags and basic meals.",
        priceAdjustment: -54
      },
      {
        id: "acc-002",
        name: "Mid-range Lodge",
        type: "accommodation",
        description: "Comfortable lodges like Buhoma Haven Lodge or Engagi Lodge with en-suite rooms and restaurant facilities.",
        priceAdjustment: 0
      },
      {
        id: "acc-003",
        name: "Luxury Safari Lodge",
        type: "accommodation",
        description: "Premium lodges like Sanctuary Gorilla Forest Camp or Clouds Mountain Gorilla Lodge with luxury amenities.",
        priceAdjustment: 405
      },
      {
        id: "acc-004",
        name: "Community Homestay",
        type: "accommodation",
        description: "Authentic cultural experience with Batwa or local families. Includes traditional meals and cultural activities.",
        priceAdjustment: -41
      }
    ],
      activities: [
      {
        id: "act-001",
        name: "Gorilla Habituation Experience",
        type: "activity",
        description: "Full day gorilla habituation in Rushaga sector. Spend 4+ hours with gorillas and researchers learning about their behavior. Permit included.",
        priceAdjustment: 1081
      },
      {
        id: "act-002",
        name: "Batwa Cultural Trail",
        type: "activity",
        description: "Learn about the indigenous Batwa people's traditional forest lifestyle, hunting techniques, and cultural practices.",
        priceAdjustment: 27
      },
      {
        id: "act-003",
        name: "Bwindi Forest Bird Watching",
        type: "activity",
        description: "Guided bird watching tour in Bwindi Forest with chances to see 23 endemic Albertine Rift species.",
        priceAdjustment: 22
      },
      {
        id: "act-004",
        name: "Nature Forest Walk",
        type: "activity",
        description: "Guided nature walk through Bwindi Forest to see primates, butterflies, and medicinal plants.",
        priceAdjustment: 16
      },
      {
        id: "act-005",
        name: "Community Village Visit",
        type: "activity",
        description: "Visit local communities around Bwindi for traditional crafts, farming practices, and cultural performances.",
        priceAdjustment: 14
      }
    ],
      transportation: [
      {
        id: "trans-001",
        name: "Shared Safari Vehicle",
        type: "transportation",
        description: "Shared 4WD vehicle for transfers and game drives. Budget-friendly option.",
        priceAdjustment: -22
      },
      {
        id: "trans-002",
        name: "Private Safari Vehicle",
        type: "transportation",
        description: "Private 4WD vehicle with professional driver-guide for personalized experience.",
        priceAdjustment: 0
      },
      {
        id: "trans-003",
        name: "Luxury Safari Vehicle",
        type: "transportation",
        description: "Premium 4WD with air conditioning and enhanced comfort features.",
        priceAdjustment: 32
      },
      {
        id: "trans-004",
        name: "Helicopter Safari",
        type: "transportation",
        description: "Helicopter scenic flight over Lake Mburo with aerial wildlife viewing opportunities.",
        priceAdjustment: 541
      }
    ],
      duration: [
      {
        id: "dur-001",
        name: "2 Days Express Safari",
        type: "duration",
        description: "Quick 2-day safari with horseback riding and game drives. Perfect for short visits.",
        priceAdjustment: -41
      },
      {
        id: "dur-002",
        name: "3 Days Standard Safari",
        type: "duration",
        description: "Standard 3-day itinerary with horseback safari, boat cruise, and walking safari.",
        priceAdjustment: 0
      },
      {
        id: "dur-003",
        name: "4 Days Extended Safari",
        type: "duration",
        description: "Extended safari with additional activities and cultural visits for comprehensive experience.",
        priceAdjustment: 54
      },
      {
        id: "dur-004",
        name: "5 Days Comprehensive Safari",
        type: "duration",
        description: "Most comprehensive Lake Mburo experience with all activities and relaxed pace.",
        priceAdjustment: 95
      }
    ]
    },
    featured: false
  },
  {
    id: "tour-021",
    slug: "rwenzori-mountains-trek",
    name: "Rwenzori Mountains Trekking Adventure",
    tagline: "Hike through the legendary Mountains of the Moon with its unique alpine flora",
    description: "Embark on an extraordinary trekking adventure through the Rwenzori Mountains National Park, a UNESCO World Heritage site known as the legendary 'Mountains of the Moon'. This challenging but rewarding expedition takes you through one of Africa's most beautiful alpine areas with its unique vegetation zones including the otherworldly giant lobelias and groundsels. Trek through montane forest, bamboo, heather and afro-alpine moorland zones as you ascend toward snow-capped peaks. With expert guides, porters and comfortable mountain huts, this trek offers a perfect balance of adventure and support in one of Africa's most spectacular yet least-visited mountain ranges.",
    duration: 8,
    price: 2750,
    location: "Rwenzori Mountains National Park",
    country: "Uganda",
    coverImage: "/images/Mountain-Rwenzori-National-Park.jpg",
    images: [
      { url: "/images/gorilla-uganda-primate-trekking-eating.jpeg", alt: "Rwenzori Mountains" },
      { url: "/images/kibaale.jpeg", alt: "Giant lobelias" },
      { url: "/images/murchison-falls-view.jpg", alt: "Mountain trekking" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Mountain hut" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Trek through multiple unique vegetation zones",
      "Otherworldly landscapes with giant lobelias and groundsels",
      "Spectacular views of glaciers and snow-capped peaks",
      "Diverse bird life and occasional wildlife sightings",
      "Experienced guides and porters from local communities"
    ],
    inclusions: [
      "Park entry and conservation fees",
      "Professional mountain guide",
      "Porters for equipment and personal items",
      "All meals during the trek",
      "Mountain hut accommodations",
      "Pre/post trek hotel stays",
      "Trekking permits",
      "Safety and evacuation services"
    ],
    exclusions: [
      "International flights",
      "Personal trekking gear and clothing",
      "Travel insurance (mandatory)",
      "Alcoholic beverages",
      "Personal expenses",
      "Tips for guides and porters",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Entebbe/Kampala",
        description: "Arrive at Entebbe International Airport and transfer to your hotel in Kampala. Attend a detailed briefing about the trek and equipment check with your guide. Rest and prepare for the adventure ahead.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Kampala Serena Hotel"
      },
      {
        day: 2,
        title: "Kampala to Kasese",
        description: "Morning departure by road to Kasese near the Rwenzori Mountains (approximately 6-7 hours). Check in at your hotel with views of the mountains. Final preparations and briefing for the trek.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Hotel Margherita"
      },
      {
        day: 3,
        title: "Trek Day 1: Trekking Center to Sine Hut",
        description: "Transfer to the Rwenzori Mountains National Park headquarters for registration and meeting your team of guides and porters. Begin trekking through montane forest and bamboo zones. Look out for colorful forest birds and occasional monkeys. Reach Sine Hut (2,596m) in the afternoon. Distance: 9km, hiking time: 5-6 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Sine Hut"
      },
      {
        day: 4,
        title: "Trek Day 2: Sine Hut to Mutinda Camp",
        description: "Continue ascending through bamboo forest into the heather-rapanea zone with its mossy forests and beautiful valley views. Cross several small streams before reaching Mutinda Camp (3,590m). Optional short climb to Mutinda Lookout for panoramic views. Distance: 7km, hiking time: 6-7 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mutinda Camp"
      },
      {
        day: 5,
        title: "Trek Day 3: Mutinda to Bugata Camp",
        description: "Trek through the Alpine vegetation zone with giant lobelias, everlasting flowers, and interesting flora. Cross the Bugata wetland then climb to Bugata Camp (4,100m). Enjoy stunning views across valleys and surrounding peaks. Distance: 6km, hiking time: 5-6 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bugata Camp"
      },
      {
        day: 6,
        title: "Trek Day 4: Bugata to Hunwick's Camp",
        description: "An acclimatization day with a shorter trek over steep sections to Hunwick's Camp (3,974m). Spectacular views of the Rwenzori peaks, glaciers, and surrounding landscape. In the afternoon, relax at camp or take a short acclimatization walk to prepare for higher elevations. Distance: 5km, hiking time: 4-5 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Hunwick's Camp"
      },
      {
        day: 7,
        title: "Trek Day 5: Descent to Kiharo Camp",
        description: "Begin descending through different vegetation zones, with changing flora and increasing oxygen levels. Reach Kiharo Camp (3,460m) in the bamboo forest. Enjoy a celebratory dinner with your trekking team. Distance: 10km, hiking time: 6-7 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Kiharo Camp"
      },
      {
        day: 8,
        title: "Trek Day 6 & Return to Kampala",
        description: "Final descent to the park gate through lush forest. Bid farewell to your trekking team and transfer back to Kampala, arriving in the evening. Distance: 12km, hiking time: 5-6 hours.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "James Henderson",
        rating: 5,
        comment: "One of Africa's hidden treasures. The landscapes are otherworldly - like walking on another planet when you get among the giant lobelias. Our guides were fantastic and the huts more comfortable than expected. Challenging but absolutely worth it!",
        date: "2024-07-15"
      },
      {
        id: "review-002",
        name: "Sylvia Walters",
        rating: 4,
        comment: "A truly unique trekking experience unlike any other in Africa. The vegetation zones are fascinating and the mountain views spectacular. Be prepared for mud and rain, but the experience is unforgettable. The local guides share wonderful insights about the mountains.",
        date: "2024-09-22"
      },
      {
        id: "review-003",
        name: "Michael Trudeau",
        rating: 5,
        comment: "For experienced trekkers looking for something different, the Rwenzoris are perfect. Less crowded than Kilimanjaro with equally spectacular scenery. The giant lobelias and groundsels create an almost prehistoric landscape. Physically demanding but well-organized support.",
        date: "2025-01-05"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
      {
        id: "acc-001",
        name: "Basic Mountain Huts",
        type: "accommodation",
        description: "Basic mountain huts along the trekking route with shared facilities and sleeping bags provided.",
        priceAdjustment: -81
      },
      {
        id: "acc-002",
        name: "Standard Mountain Lodges",
        type: "accommodation",
        description: "Standard mountain lodges with better facilities and meals included throughout the trek.",
        priceAdjustment: 0
      },
      {
        id: "acc-003",
        name: "Premium Mountain Lodges",
        type: "accommodation",
        description: "Premium mountain lodges with enhanced comfort, better food, and additional services.",
        priceAdjustment: 216
      },
      {
        id: "acc-004",
        name: "Camping Experience",
        type: "accommodation",
        description: "Camping experience with high-quality tents and camping equipment for adventurous trekkers.",
        priceAdjustment: -54
      }
    ],
      activities: [
      {
        id: "act-001",
        name: "Margherita Peak Summit",
        type: "activity",
        description: "Summit attempt to Margherita Peak (5,109m), the highest peak in the Rwenzori Mountains. Includes specialized gear and guides.",
        priceAdjustment: 135
      },
      {
        id: "act-002",
        name: "Cultural Community Visit",
        type: "activity",
        description: "Visit Bakonzo communities around Rwenzori to learn about mountain culture and traditions.",
        priceAdjustment: 22
      },
      {
        id: "act-003",
        name: "Nature Photography Workshop",
        type: "activity",
        description: "Professional photography workshop focusing on mountain landscapes and endemic flora.",
        priceAdjustment: 41
      },
      {
        id: "act-004",
        name: "Botanical Tour",
        type: "activity",
        description: "Specialized botanical tour focusing on unique Rwenzori flora including giant lobelias.",
        priceAdjustment: 27
      },
      {
        id: "act-005",
        name: "Rock Climbing Experience",
        type: "activity",
        description: "Rock climbing sessions on Rwenzori rock faces with professional climbing guides.",
        priceAdjustment: 54
      }
    ],
      transportation: [
      {
        id: "trans-001",
        name: "Shared Transfer Vehicle",
        type: "transportation",
        description: "Shared vehicle transfer from Kampala to Kasese and return. Budget option for trekkers.",
        priceAdjustment: -27
      },
      {
        id: "trans-002",
        name: "Private Transfer Vehicle",
        type: "transportation",
        description: "Private vehicle transfer with professional driver for comfortable journey to trek starting point.",
        priceAdjustment: 0
      },
      {
        id: "trans-003",
        name: "Luxury Transfer Vehicle",
        type: "transportation",
        description: "Premium vehicle with air conditioning and comfort features for transfers to and from Rwenzori.",
        priceAdjustment: 41
      },
      {
        id: "trans-004",
        name: "Helicopter Access",
        type: "transportation",
        description: "Helicopter transfer to higher camps to reduce trekking time and physical demands.",
        priceAdjustment: 1081
      }
    ],
      duration: [
      {
        id: "dur-001",
        name: "5 Days Central Circuit",
        type: "duration",
        description: "5-day central circuit trek to Guy Yeoman Hut without summit attempt.",
        priceAdjustment: -108
      },
      {
        id: "dur-002",
        name: "7 Days Standard Trek",
        type: "duration",
        description: "Standard 7-day trek to Margherita Peak with acclimatization days.",
        priceAdjustment: 0
      },
      {
        id: "dur-003",
        name: "9 Days Extended Trek",
        type: "duration",
        description: "Extended 9-day trek with multiple peak attempts and comprehensive exploration.",
        priceAdjustment: 135
      },
      {
        id: "dur-004",
        name: "12 Days Comprehensive Adventure",
        type: "duration",
        description: "Most comprehensive Rwenzori experience with all peaks and cultural activities.",
        priceAdjustment: 216
      }
    ]
    },
    featured: false
  },
  {
    id: "tour-020",
    slug: "ziwa-rhino-sanctuary-murchison-combo",
    name: "Rhinos & Rapids Safari",
    tagline: "Track rhinos on foot and witness the mighty Murchison Falls",
    description: "Experience a unique combination of endangered rhino tracking at Ziwa Rhino Sanctuary followed by the wildlife and scenic wonders of Murchison Falls National Park. This tour begins with the thrilling experience of approaching white rhinos on foot in the company of trained rangers at Ziwa, the only place to see rhinos in the wild in Uganda. Then continue to Murchison Falls National Park to witness the spectacular waterfall, enjoy game drives teeming with wildlife, and cruise along the Nile River. This safari offers a perfect blend of adventure, wildlife viewing, and natural beauty.",
    duration: 5,
    price: 2950,
    location: "Murchison Falls National Park",
    country: "Uganda",
    coverImage: "/images/murchison-falls-view.jpg",
    images: [
      { url: "/images/murchison-falls-view.jpg", alt: "Murchison Falls" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Wildlife viewing" },
      { url: "/images/kibaale.jpeg", alt: "Luxury lodge" },
      { url: "/images/murchison-falls-view.jpg", alt: "River cruise" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "On-foot tracking of white rhinos with expert rangers",
      "Thundering spectacle of Murchison Falls",
      "Game drives with diverse wildlife including lions and elephants",
      "Nile River boat safari to the base of the falls",
      "Opportunity to spot rare shoebill storks"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
      "Rhino tracking fees",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Boat cruise on the Nile",
      "Airport transfers"
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
        title: "Entebbe to Ziwa Rhino Sanctuary",
        description: "Morning departure from Entebbe, driving north to Ziwa Rhino Sanctuary (approximately 3 hours). After lunch, enjoy your first rhino tracking experience on foot with trained rangers, approaching these magnificent endangered animals safely in their natural habitat. Evening presentation about rhino conservation efforts in Uganda.",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Amuka Lodge"
      },
      {
        day: 2,
        title: "Ziwa to Murchison Falls National Park",
        description: "Optional early morning rhino tracking before breakfast. Continue your journey to Murchison Falls National Park (approximately 2 hours). After crossing by ferry, check in at your lodge. Afternoon game drive in the northern section of the park, known for its abundant wildlife.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 3,
        title: "Murchison Falls Game Drives",
        description: "Full day of game viewing in Murchison Falls National Park. Early morning game drive when animals are most active, searching for lions, elephants, giraffes, and numerous antelope species. Afternoon game drive in a different sector of the park focusing on buffalo herds and leopard habitat.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 4,
        title: "Nile Delta Boat Safari & Falls",
        description: "Morning boat safari to the Nile Delta where the river enters Lake Albert, a prime area for spotting the rare shoebill stork and numerous water birds. Afternoon boat cruise upstream to the base of Murchison Falls for spectacular views of the world's most powerful waterfall. Optional hike to the top of the falls (moderate difficulty).",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 5,
        title: "Murchison Falls to Entebbe",
        description: "Final morning game drive before breakfast. Depart Murchison Falls, returning to Entebbe with a stop for lunch en route. Arrive in the late afternoon for your onward journey.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Charles Wilson",
        rating: 5,
        comment: "Approaching rhinos on foot was an incredible experience - heart-pounding but completely safe with the excellent rangers. Murchison Falls was spectacular and we saw so much wildlife including 3 tree-climbing lions!",
        date: "2024-08-28"
      },
      {
        id: "review-002",
        name: "Sophia Lin",
        rating: 4,
        comment: "Great combination of unique experiences. The rhino tracking was special and more intimate than we expected. The boat safari was my highlight - we saw countless hippos, crocs, and birds, plus the falls are impressive up close.",
        date: "2024-12-10"
      },
      {
        id: "review-003",
        name: "Trevor and Amelia Jackson",
        rating: 5,
        comment: "Perfect 5-day safari with good variety. Getting close to rhinos on foot was thrilling but felt completely safe. In Murchison we saw all the big game including elephants crossing the Nile. Highly recommended for those short on time.",
        date: "2025-01-22"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
      {
        id: "acc-001",
        name: "Budget Camping",
        type: "accommodation",
        description: "Basic camping at Ziwa Rhino Sanctuary and budget accommodation in Jinja with shared facilities.",
        priceAdjustment: -41
      },
      {
        id: "acc-002",
        name: "Mid-range Lodge",
        type: "accommodation",
        description: "Comfortable lodges like Amuka Lodge at Ziwa and mid-range hotels in Jinja with en-suite facilities.",
        priceAdjustment: 0
      },
      {
        id: "acc-003",
        name: "Luxury Safari Lodge",
        type: "accommodation",
        description: "Premium accommodation at Ziwa Guest House and luxury resorts in Jinja with Nile views.",
        priceAdjustment: 216
      },
      {
        id: "acc-004",
        name: "Adventure Camp",
        type: "accommodation",
        description: "Specialized adventure camps near Jinja focusing on water sports and outdoor activities.",
        priceAdjustment: 27
      }
    ],
      activities: [
      {
        id: "act-001",
        name: "Grade 5 White Water Rafting",
        type: "activity",
        description: "Full-day extreme white water rafting on the Nile with grade 5 rapids and professional guides.",
        priceAdjustment: 54
      },
      {
        id: "act-002",
        name: "Bungee Jumping",
        type: "activity",
        description: "Adrenaline-pumping bungee jump from 44 meters above the Nile River at Jinja.",
        priceAdjustment: 49
      },
      {
        id: "act-003",
        name: "Kayaking on the Nile",
        type: "activity",
        description: "Multi-day kayaking adventure on the Nile River with camping and professional instruction.",
        priceAdjustment: 68
      },
      {
        id: "act-004",
        name: "Horseback Rhino Tracking",
        type: "activity",
        description: "Unique horseback riding experience while tracking rhinos at Ziwa Rhino Sanctuary.",
        priceAdjustment: 54
      },
      {
        id: "act-005",
        name: "Quad Biking Adventure",
        type: "activity",
        description: "Quad biking adventure through rural Uganda countryside and along the Nile banks.",
        priceAdjustment: 32
      }
    ],
      transportation: [
      {
        id: "trans-001",
        name: "Shared Safari Vehicle",
        type: "transportation",
        description: "Shared 4WD vehicle for transfers between Ziwa and Jinja. Budget-friendly option.",
        priceAdjustment: -22
      },
      {
        id: "trans-002",
        name: "Private Safari Vehicle",
        type: "transportation",
        description: "Private 4WD vehicle with professional driver-guide for flexible transfers.",
        priceAdjustment: 0
      },
      {
        id: "trans-003",
        name: "Luxury Safari Vehicle",
        type: "transportation",
        description: "Premium 4WD with air conditioning and comfort features for smooth transfers.",
        priceAdjustment: 32
      },
      {
        id: "trans-004",
        name: "Helicopter Transfer",
        type: "transportation",
        description: "Helicopter transfer from Entebbe to Jinja with scenic aerial views of the Nile.",
        priceAdjustment: 811
      }
    ],
      duration: [
      {
        id: "dur-001",
        name: "2 Days Express Rhinos & Rapids",
        type: "duration",
        description: "Quick 2-day adventure focusing on rhino tracking and one major water activity.",
        priceAdjustment: -54
      },
      {
        id: "dur-002",
        name: "3 Days Standard Adventure",
        type: "duration",
        description: "Standard 3-day itinerary with rhino tracking, white water rafting, and source of Nile visit.",
        priceAdjustment: 0
      },
      {
        id: "dur-003",
        name: "4 Days Extended Adventure",
        type: "duration",
        description: "Extended adventure with multiple water activities and extended time at Ziwa.",
        priceAdjustment: 68
      },
      {
        id: "dur-004",
        name: "5 Days Comprehensive Adventure",
        type: "duration",
        description: "Most comprehensive adventure experience with all activities and cultural visits.",
        priceAdjustment: 122
      }
    ]
    },
    featured: true
  },
  {
    id: "tour-021",
    slug: "rwenzori-mountains-trek",
    name: "Rwenzori Mountains Trekking Adventure",
    tagline: "Hike through the legendary Mountains of the Moon with its unique alpine flora",
    description: "Embark on an extraordinary trekking adventure through the Rwenzori Mountains National Park, a UNESCO World Heritage site known as the legendary 'Mountains of the Moon'. This challenging but rewarding expedition takes you through one of Africa's most beautiful alpine areas with its unique vegetation zones including the otherworldly giant lobelias and groundsels. Trek through montane forest, bamboo, heather and afro-alpine moorland zones as you ascend toward snow-capped peaks. With expert guides, porters and comfortable mountain huts, this trek offers a perfect balance of adventure and support in one of Africa's most spectacular yet least-visited mountain ranges.",
    duration: 8,
    price: 2750,
    location: "Rwenzori Mountains National Park",
    country: "Uganda",
    coverImage: "/images/Mountain-Rwenzori-National-Park.jpg",
    images: [
      { url: "/images/gorilla-uganda-primate-trekking-eating.jpeg", alt: "Rwenzori Mountains" },
      { url: "/images/kibaale.jpeg", alt: "Giant lobelias" },
      { url: "/images/murchison-falls-view.jpg", alt: "Mountain trekking" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Mountain hut" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Trek through multiple unique vegetation zones",
      "Otherworldly landscapes with giant lobelias and groundsels",
      "Spectacular views of glaciers and snow-capped peaks",
      "Diverse bird life and occasional wildlife sightings",
      "Experienced guides and porters from local communities"
    ],
    inclusions: [
      "Park entry and conservation fees",
      "Professional mountain guide",
      "Porters for equipment and personal items",
      "All meals during the trek",
      "Mountain hut accommodations",
      "Pre/post trek hotel stays",
      "Trekking permits",
      "Safety and evacuation services"
    ],
    exclusions: [
      "International flights",
      "Personal trekking gear and clothing",
      "Travel insurance (mandatory)",
      "Alcoholic beverages",
      "Personal expenses",
      "Tips for guides and porters",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Entebbe/Kampala",
        description: "Arrive at Entebbe International Airport and transfer to your hotel in Kampala. Attend a detailed briefing about the trek and equipment check with your guide. Rest and prepare for the adventure ahead.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Kampala Serena Hotel"
      },
      {
        day: 2,
        title: "Kampala to Kasese",
        description: "Morning departure by road to Kasese near the Rwenzori Mountains (approximately 6-7 hours). Check in at your hotel with views of the mountains. Final preparations and briefing for the trek.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Hotel Margherita"
      },
      {
        day: 3,
        title: "Trek Day 1: Trekking Center to Sine Hut",
        description: "Transfer to the Rwenzori Mountains National Park headquarters for registration and meeting your team of guides and porters. Begin trekking through montane forest and bamboo zones. Look out for colorful forest birds and occasional monkeys. Reach Sine Hut (2,596m) in the afternoon. Distance: 9km, hiking time: 5-6 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Sine Hut"
      },
      {
        day: 4,
        title: "Trek Day 2: Sine Hut to Mutinda Camp",
        description: "Continue ascending through bamboo forest into the heather-rapanea zone with its mossy forests and beautiful valley views. Cross several small streams before reaching Mutinda Camp (3,590m). Optional short climb to Mutinda Lookout for panoramic views. Distance: 7km, hiking time: 6-7 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mutinda Camp"
      },
      {
        day: 5,
        title: "Trek Day 3: Mutinda to Bugata Camp",
        description: "Trek through the Alpine vegetation zone with giant lobelias, everlasting flowers, and interesting flora. Cross the Bugata wetland then climb to Bugata Camp (4,100m). Enjoy stunning views across valleys and surrounding peaks. Distance: 6km, hiking time: 5-6 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bugata Camp"
      },
      {
        day: 6,
        title: "Trek Day 4: Bugata to Hunwick's Camp",
        description: "An acclimatization day with a shorter trek over steep sections to Hunwick's Camp (3,974m). Spectacular views of the Rwenzori peaks, glaciers, and surrounding landscape. In the afternoon, relax at camp or take a short acclimatization walk to prepare for higher elevations. Distance: 5km, hiking time: 4-5 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Hunwick's Camp"
      },
      {
        day: 7,
        title: "Trek Day 5: Descent to Kiharo Camp",
        description: "Begin descending through different vegetation zones, with changing flora and increasing oxygen levels. Reach Kiharo Camp (3,460m) in the bamboo forest. Enjoy a celebratory dinner with your trekking team. Distance: 10km, hiking time: 6-7 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Kiharo Camp"
      },
      {
        day: 8,
        title: "Trek Day 6 & Return to Kampala",
        description: "Final descent to the park gate through lush forest. Bid farewell to your trekking team and transfer back to Kampala, arriving in the evening. Distance: 12km, hiking time: 5-6 hours.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "James Henderson",
        rating: 5,
        comment: "One of Africa's hidden treasures. The landscapes are otherworldly - like walking on another planet when you get among the giant lobelias. Our guides were fantastic and the huts more comfortable than expected. Challenging but absolutely worth it!",
        date: "2024-07-15"
      },
      {
        id: "review-002",
        name: "Sylvia Walters",
        rating: 4,
        comment: "A truly unique trekking experience unlike any other in Africa. The vegetation zones are fascinating and the mountain views spectacular. Be prepared for mud and rain, but the experience is unforgettable. The local guides share wonderful insights about the mountains.",
        date: "2024-09-22"
      },
      {
        id: "review-003",
        name: "Michael Trudeau",
        rating: 5,
        comment: "For experienced trekkers looking for something different, the Rwenzoris are perfect. Less crowded than Kilimanjaro with equally spectacular scenery. The giant lobelias and groundsels create an almost prehistoric landscape. Physically demanding but well-organized support.",
        date: "2025-01-05"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
      {
        id: "acc-001",
        name: "Basic Mountain Huts",
        type: "accommodation",
        description: "Basic mountain huts along the trekking route with shared facilities and sleeping bags provided.",
        priceAdjustment: -81
      },
      {
        id: "acc-002",
        name: "Standard Mountain Lodges",
        type: "accommodation",
        description: "Standard mountain lodges with better facilities and meals included throughout the trek.",
        priceAdjustment: 0
      },
      {
        id: "acc-003",
        name: "Premium Mountain Lodges",
        type: "accommodation",
        description: "Premium mountain lodges with enhanced comfort, better food, and additional services.",
        priceAdjustment: 216
      },
      {
        id: "acc-004",
        name: "Camping Experience",
        type: "accommodation",
        description: "Camping experience with high-quality tents and camping equipment for adventurous trekkers.",
        priceAdjustment: -54
      }
    ],
      activities: [
      {
        id: "act-001",
        name: "Margherita Peak Summit",
        type: "activity",
        description: "Summit attempt to Margherita Peak (5,109m), the highest peak in the Rwenzori Mountains. Includes specialized gear and guides.",
        priceAdjustment: 135
      },
      {
        id: "act-002",
        name: "Cultural Community Visit",
        type: "activity",
        description: "Visit Bakonzo communities around Rwenzori to learn about mountain culture and traditions.",
        priceAdjustment: 22
      },
      {
        id: "act-003",
        name: "Nature Photography Workshop",
        type: "activity",
        description: "Professional photography workshop focusing on mountain landscapes and endemic flora.",
        priceAdjustment: 41
      },
      {
        id: "act-004",
        name: "Botanical Tour",
        type: "activity",
        description: "Specialized botanical tour focusing on unique Rwenzori flora including giant lobelias.",
        priceAdjustment: 27
      },
      {
        id: "act-005",
        name: "Rock Climbing Experience",
        type: "activity",
        description: "Rock climbing sessions on Rwenzori rock faces with professional climbing guides.",
        priceAdjustment: 54
      }
    ],
      transportation: [
      {
        id: "trans-001",
        name: "Shared Transfer Vehicle",
        type: "transportation",
        description: "Shared vehicle transfer from Kampala to Kasese and return. Budget option for trekkers.",
        priceAdjustment: -27
      },
      {
        id: "trans-002",
        name: "Private Transfer Vehicle",
        type: "transportation",
        description: "Private vehicle transfer with professional driver for comfortable journey to trek starting point.",
        priceAdjustment: 0
      },
      {
        id: "trans-003",
        name: "Luxury Transfer Vehicle",
        type: "transportation",
        description: "Premium vehicle with air conditioning and comfort features for transfers to and from Rwenzori.",
        priceAdjustment: 41
      },
      {
        id: "trans-004",
        name: "Helicopter Access",
        type: "transportation",
        description: "Helicopter transfer to higher camps to reduce trekking time and physical demands.",
        priceAdjustment: 1081
      }
    ],
      duration: [
      {
        id: "dur-001",
        name: "5 Days Central Circuit",
        type: "duration",
        description: "5-day central circuit trek to Guy Yeoman Hut without summit attempt.",
        priceAdjustment: -108
      },
      {
        id: "dur-002",
        name: "7 Days Standard Trek",
        type: "duration",
        description: "Standard 7-day trek to Margherita Peak with acclimatization days.",
        priceAdjustment: 0
      },
      {
        id: "dur-003",
        name: "9 Days Extended Trek",
        type: "duration",
        description: "Extended 9-day trek with multiple peak attempts and comprehensive exploration.",
        priceAdjustment: 135
      },
      {
        id: "dur-004",
        name: "12 Days Comprehensive Adventure",
        type: "duration",
        description: "Most comprehensive Rwenzori experience with all peaks and cultural activities.",
        priceAdjustment: 216
      }
    ]
    },
    featured: false
  },
  {
    id: "tour-020",
    slug: "ziwa-rhino-sanctuary-murchison-combo",
    name: "Rhinos & Rapids Safari",
    tagline: "Track rhinos on foot and witness the mighty Murchison Falls",
    description: "Experience a unique combination of endangered rhino tracking at Ziwa Rhino Sanctuary followed by the wildlife and scenic wonders of Murchison Falls National Park. This tour begins with the thrilling experience of approaching white rhinos on foot in the company of trained rangers at Ziwa, the only place to see rhinos in the wild in Uganda. Then continue to Murchison Falls National Park to witness the spectacular waterfall, enjoy game drives teeming with wildlife, and cruise along the Nile River. This safari offers a perfect blend of adventure, wildlife viewing, and natural beauty.",
    duration: 5,
    price: 2950,
    location: "Murchison Falls National Park",
    country: "Uganda",
    coverImage: "/images/murchison-falls-view.jpg",
    images: [
      { url: "/images/murchison-falls-view.jpg", alt: "Murchison Falls" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Wildlife viewing" },
      { url: "/images/kibaale.jpeg", alt: "Luxury lodge" },
      { url: "/images/murchison-falls-view.jpg", alt: "River cruise" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "On-foot tracking of white rhinos with expert rangers",
      "Thundering spectacle of Murchison Falls",
      "Game drives with diverse wildlife including lions and elephants",
      "Nile River boat safari to the base of the falls",
      "Opportunity to spot rare shoebill storks"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
      "Rhino tracking fees",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Boat cruise on the Nile",
      "Airport transfers"
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
        title: "Entebbe to Ziwa Rhino Sanctuary",
        description: "Morning departure from Entebbe, driving north to Ziwa Rhino Sanctuary (approximately 3 hours). After lunch, enjoy your first rhino tracking experience on foot with trained rangers, approaching these magnificent endangered animals safely in their natural habitat. Evening presentation about rhino conservation efforts in Uganda.",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Amuka Lodge"
      },
      {
        day: 2,
        title: "Ziwa to Murchison Falls National Park",
        description: "Optional early morning rhino tracking before breakfast. Continue your journey to Murchison Falls National Park (approximately 2 hours). After crossing by ferry, check in at your lodge. Afternoon game drive in the northern section of the park, known for its abundant wildlife.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 3,
        title: "Murchison Falls Game Drives",
        description: "Full day of game viewing in Murchison Falls National Park. Early morning game drive when animals are most active, searching for lions, elephants, giraffes, and numerous antelope species. Afternoon game drive in a different sector of the park focusing on buffalo herds and leopard habitat.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 4,
        title: "Nile Delta Boat Safari & Falls",
        description: "Morning boat safari to the Nile Delta where the river enters Lake Albert, a prime area for spotting the rare shoebill stork and numerous water birds. Afternoon boat cruise upstream to the base of Murchison Falls for spectacular views of the world's most powerful waterfall. Optional hike to the top of the falls (moderate difficulty).",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 5,
        title: "Murchison Falls to Entebbe",
        description: "Final morning game drive before breakfast. Depart Murchison Falls, returning to Entebbe with a stop for lunch en route. Arrive in the late afternoon for your onward journey.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Charles Wilson",
        rating: 5,
        comment: "Approaching rhinos on foot was an incredible experience - heart-pounding but completely safe with the excellent rangers. Murchison Falls was spectacular and we saw so much wildlife including 3 tree-climbing lions!",
        date: "2024-08-28"
      },
      {
        id: "review-002",
        name: "Sophia Lin",
        rating: 4,
        comment: "Great combination of unique experiences. The rhino tracking was special and more intimate than we expected. The boat safari was my highlight - we saw countless hippos, crocs, and birds, plus the falls are impressive up close.",
        date: "2024-12-10"
      },
      {
        id: "review-003",
        name: "Trevor and Amelia Jackson",
        rating: 5,
        comment: "Perfect 5-day safari with good variety. Getting close to rhinos on foot was thrilling but felt completely safe. In Murchison we saw all the big game including elephants crossing the Nile. Highly recommended for those short on time.",
        date: "2025-01-22"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
      {
        id: "acc-001",
        name: "Budget Camping",
        type: "accommodation",
        description: "Basic camping at Ziwa Rhino Sanctuary and budget accommodation in Jinja with shared facilities.",
        priceAdjustment: -41
      },
      {
        id: "acc-002",
        name: "Mid-range Lodge",
        type: "accommodation",
        description: "Comfortable lodges like Amuka Lodge at Ziwa and mid-range hotels in Jinja with en-suite facilities.",
        priceAdjustment: 0
      },
      {
        id: "acc-003",
        name: "Luxury Safari Lodge",
        type: "accommodation",
        description: "Premium accommodation at Ziwa Guest House and luxury resorts in Jinja with Nile views.",
        priceAdjustment: 216
      },
      {
        id: "acc-004",
        name: "Adventure Camp",
        type: "accommodation",
        description: "Specialized adventure camps near Jinja focusing on water sports and outdoor activities.",
        priceAdjustment: 27
      }
    ],
      activities: [
      {
        id: "act-001",
        name: "Grade 5 White Water Rafting",
        type: "activity",
        description: "Full-day extreme white water rafting on the Nile with grade 5 rapids and professional guides.",
        priceAdjustment: 54
      },
      {
        id: "act-002",
        name: "Bungee Jumping",
        type: "activity",
        description: "Adrenaline-pumping bungee jump from 44 meters above the Nile River at Jinja.",
        priceAdjustment: 49
      },
      {
        id: "act-003",
        name: "Kayaking on the Nile",
        type: "activity",
        description: "Multi-day kayaking adventure on the Nile River with camping and professional instruction.",
        priceAdjustment: 68
      },
      {
        id: "act-004",
        name: "Horseback Rhino Tracking",
        type: "activity",
        description: "Unique horseback riding experience while tracking rhinos at Ziwa Rhino Sanctuary.",
        priceAdjustment: 54
      },
      {
        id: "act-005",
        name: "Quad Biking Adventure",
        type: "activity",
        description: "Quad biking adventure through rural Uganda countryside and along the Nile banks.",
        priceAdjustment: 32
      }
    ],
      transportation: [
      {
        id: "trans-001",
        name: "Shared Safari Vehicle",
        type: "transportation",
        description: "Shared 4WD vehicle for transfers between Ziwa and Jinja. Budget-friendly option.",
        priceAdjustment: -22
      },
      {
        id: "trans-002",
        name: "Private Safari Vehicle",
        type: "transportation",
        description: "Private 4WD vehicle with professional driver-guide for flexible transfers.",
        priceAdjustment: 0
      },
      {
        id: "trans-003",
        name: "Luxury Safari Vehicle",
        type: "transportation",
        description: "Premium 4WD with air conditioning and comfort features for smooth transfers.",
        priceAdjustment: 32
      },
      {
        id: "trans-004",
        name: "Helicopter Transfer",
        type: "transportation",
        description: "Helicopter transfer from Entebbe to Jinja with scenic aerial views of the Nile.",
        priceAdjustment: 811
      }
    ],
      duration: [
      {
        id: "dur-001",
        name: "2 Days Express Rhinos & Rapids",
        type: "duration",
        description: "Quick 2-day adventure focusing on rhino tracking and one major water activity.",
        priceAdjustment: -54
      },
      {
        id: "dur-002",
        name: "3 Days Standard Adventure",
        type: "duration",
        description: "Standard 3-day itinerary with rhino tracking, white water rafting, and source of Nile visit.",
        priceAdjustment: 0
      },
      {
        id: "dur-003",
        name: "4 Days Extended Adventure",
        type: "duration",
        description: "Extended adventure with multiple water activities and extended time at Ziwa.",
        priceAdjustment: 68
      },
      {
        id: "dur-004",
        name: "5 Days Comprehensive Adventure",
        type: "duration",
        description: "Most comprehensive adventure experience with all activities and cultural visits.",
        priceAdjustment: 122
      }
    ]
    },
    featured: true
  },
  {
    id: "tour-021",
    slug: "rwenzori-mountains-trek",
    name: "Rwenzori Mountains Trekking Adventure",
    tagline: "Hike through the legendary Mountains of the Moon with its unique alpine flora",
    description: "Embark on an extraordinary trekking adventure through the Rwenzori Mountains National Park, a UNESCO World Heritage site known as the legendary 'Mountains of the Moon'. This challenging but rewarding expedition takes you through one of Africa's most beautiful alpine areas with its unique vegetation zones including the otherworldly giant lobelias and groundsels. Trek through montane forest, bamboo, heather and afro-alpine moorland zones as you ascend toward snow-capped peaks. With expert guides, porters and comfortable mountain huts, this trek offers a perfect balance of adventure and support in one of Africa's most spectacular yet least-visited mountain ranges.",
    duration: 8,
    price: 2750,
    location: "Rwenzori Mountains National Park",
    country: "Uganda",
    coverImage: "/images/Mountain-Rwenzori-National-Park.jpg",
    images: [
      { url: "/images/gorilla-uganda-primate-trekking-eating.jpeg", alt: "Rwenzori Mountains" },
      { url: "/images/kibaale.jpeg", alt: "Giant lobelias" },
      { url: "/images/murchison-falls-view.jpg", alt: "Mountain trekking" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Mountain hut" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Trek through multiple unique vegetation zones",
      "Otherworldly landscapes with giant lobelias and groundsels",
      "Spectacular views of glaciers and snow-capped peaks",
      "Diverse bird life and occasional wildlife sightings",
      "Experienced guides and porters from local communities"
    ],
    inclusions: [
      "Park entry and conservation fees",
      "Professional mountain guide",
      "Porters for equipment and personal items",
      "All meals during the trek",
      "Mountain hut accommodations",
      "Pre/post trek hotel stays",
      "Trekking permits",
      "Safety and evacuation services"
    ],
    exclusions: [
      "International flights",
      "Personal trekking gear and clothing",
      "Travel insurance (mandatory)",
      "Alcoholic beverages",
      "Personal expenses",
      "Tips for guides and porters",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Entebbe/Kampala",
        description: "Arrive at Entebbe International Airport and transfer to your hotel in Kampala. Attend a detailed briefing about the trek and equipment check with your guide. Rest and prepare for the adventure ahead.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Kampala Serena Hotel"
      },
      {
        day: 2,
        title: "Kampala to Kasese",
        description: "Morning departure by road to Kasese near the Rwenzori Mountains (approximately 6-7 hours). Check in at your hotel with views of the mountains. Final preparations and briefing for the trek.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Hotel Margherita"
      },
      {
        day: 3,
        title: "Trek Day 1: Trekking Center to Sine Hut",
        description: "Transfer to the Rwenzori Mountains National Park headquarters for registration and meeting your team of guides and porters. Begin trekking through montane forest and bamboo zones. Look out for colorful forest birds and occasional monkeys. Reach Sine Hut (2,596m) in the afternoon. Distance: 9km, hiking time: 5-6 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Sine Hut"
      },
      {
        day: 4,
        title: "Trek Day 2: Sine Hut to Mutinda Camp",
        description: "Continue ascending through bamboo forest into the heather-rapanea zone with its mossy forests and beautiful valley views. Cross several small streams before reaching Mutinda Camp (3,590m). Optional short climb to Mutinda Lookout for panoramic views. Distance: 7km, hiking time: 6-7 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mutinda Camp"
      },
      {
        day: 5,
        title: "Trek Day 3: Mutinda to Bugata Camp",
        description: "Trek through the Alpine vegetation zone with giant lobelias, everlasting flowers, and interesting flora. Cross the Bugata wetland then climb to Bugata Camp (4,100m). Enjoy stunning views across valleys and surrounding peaks. Distance: 6km, hiking time: 5-6 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Bugata Camp"
      },
      {
        day: 6,
        title: "Trek Day 4: Bugata to Hunwick's Camp",
        description: "An acclimatization day with a shorter trek over steep sections to Hunwick's Camp (3,974m). Spectacular views of the Rwenzori peaks, glaciers, and surrounding landscape. In the afternoon, relax at camp or take a short acclimatization walk to prepare for higher elevations. Distance: 5km, hiking time: 4-5 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Hunwick's Camp"
      },
      {
        day: 7,
        title: "Trek Day 5: Descent to Kiharo Camp",
        description: "Begin descending through different vegetation zones, with changing flora and increasing oxygen levels. Reach Kiharo Camp (3,460m) in the bamboo forest. Enjoy a celebratory dinner with your trekking team. Distance: 10km, hiking time: 6-7 hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Kiharo Camp"
      },
      {
        day: 8,
        title: "Trek Day 6 & Return to Kampala",
        description: "Final descent to the park gate through lush forest. Bid farewell to your trekking team and transfer back to Kampala, arriving in the evening. Distance: 12km, hiking time: 5-6 hours.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "James Henderson",
        rating: 5,
        comment: "One of Africa's hidden treasures. The landscapes are otherworldly - like walking on another planet when you get among the giant lobelias. Our guides were fantastic and the huts more comfortable than expected. Challenging but absolutely worth it!",
        date: "2024-07-15"
      },
      {
        id: "review-002",
        name: "Sylvia Walters",
        rating: 4,
        comment: "A truly unique trekking experience unlike any other in Africa. The vegetation zones are fascinating and the mountain views spectacular. Be prepared for mud and rain, but the experience is unforgettable. The local guides share wonderful insights about the mountains.",
        date: "2024-09-22"
      },
      {
        id: "review-003",
        name: "Michael Trudeau",
        rating: 5,
        comment: "For experienced trekkers looking for something different, the Rwenzoris are perfect. Less crowded than Kilimanjaro with equally spectacular scenery. The giant lobelias and groundsels create an almost prehistoric landscape. Physically demanding but well-organized support.",
        date: "2025-01-05"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
      {
        id: "acc-001",
        name: "Basic Mountain Huts",
        type: "accommodation",
        description: "Basic mountain huts along the trekking route with shared facilities and sleeping bags provided.",
        priceAdjustment: -81
      },
      {
        id: "acc-002",
        name: "Standard Mountain Lodges",
        type: "accommodation",
        description: "Standard mountain lodges with better facilities and meals included throughout the trek.",
        priceAdjustment: 0
      },
      {
        id: "acc-003",
        name: "Premium Mountain Lodges",
        type: "accommodation",
        description: "Premium mountain lodges with enhanced comfort, better food, and additional services.",
        priceAdjustment: 216
      },
      {
        id: "acc-004",
        name: "Camping Experience",
        type: "accommodation",
        description: "Camping experience with high-quality tents and camping equipment for adventurous trekkers.",
        priceAdjustment: -54
      }
    ],
      activities: [
      {
        id: "act-001",
        name: "Margherita Peak Summit",
        type: "activity",
        description: "Summit attempt to Margherita Peak (5,109m), the highest peak in the Rwenzori Mountains. Includes specialized gear and guides.",
        priceAdjustment: 135
      },
      {
        id: "act-002",
        name: "Cultural Community Visit",
        type: "activity",
        description: "Visit Bakonzo communities around Rwenzori to learn about mountain culture and traditions.",
        priceAdjustment: 22
      },
      {
        id: "act-003",
        name: "Nature Photography Workshop",
        type: "activity",
        description: "Professional photography workshop focusing on mountain landscapes and endemic flora.",
        priceAdjustment: 41
      },
      {
        id: "act-004",
        name: "Botanical Tour",
        type: "activity",
        description: "Specialized botanical tour focusing on unique Rwenzori flora including giant lobelias.",
        priceAdjustment: 27
      },
      {
        id: "act-005",
        name: "Rock Climbing Experience",
        type: "activity",
        description: "Rock climbing sessions on Rwenzori rock faces with professional climbing guides.",
        priceAdjustment: 54
      }
    ],
      transportation: [
      {
        id: "trans-001",
        name: "Shared Transfer Vehicle",
        type: "transportation",
        description: "Shared vehicle transfer from Kampala to Kasese and return. Budget option for trekkers.",
        priceAdjustment: -27
      },
      {
        id: "trans-002",
        name: "Private Transfer Vehicle",
        type: "transportation",
        description: "Private vehicle transfer with professional driver for comfortable journey to trek starting point.",
        priceAdjustment: 0
      },
      {
        id: "trans-003",
        name: "Luxury Transfer Vehicle",
        type: "transportation",
        description: "Premium vehicle with air conditioning and comfort features for transfers to and from Rwenzori.",
        priceAdjustment: 41
      },
      {
        id: "trans-004",
        name: "Helicopter Access",
        type: "transportation",
        description: "Helicopter transfer to higher camps to reduce trekking time and physical demands.",
        priceAdjustment: 1081
      }
    ],
      duration: [
      {
        id: "dur-001",
        name: "5 Days Central Circuit",
        type: "duration",
        description: "5-day central circuit trek to Guy Yeoman Hut without summit attempt.",
        priceAdjustment: -108
      },
      {
        id: "dur-002",
        name: "7 Days Standard Trek",
        type: "duration",
        description: "Standard 7-day trek to Margherita Peak with acclimatization days.",
        priceAdjustment: 0
      },
      {
        id: "dur-003",
        name: "9 Days Extended Trek",
        type: "duration",
        description: "Extended 9-day trek with multiple peak attempts and comprehensive exploration.",
        priceAdjustment: 135
      },
      {
        id: "dur-004",
        name: "12 Days Comprehensive Adventure",
        type: "duration",
        description: "Most comprehensive Rwenzori experience with all peaks and cultural activities.",
        priceAdjustment: 216
      }
    ]
    },
    featured: false
  },
  {
    id: "tour-020",
    slug: "ziwa-rhino-sanctuary-murchison-combo",
    name: "Rhinos & Rapids Safari",
    tagline: "Track rhinos on foot and witness the mighty Murchison Falls",
    description: "Experience a unique combination of endangered rhino tracking at Ziwa Rhino Sanctuary followed by the wildlife and scenic wonders of Murchison Falls National Park. This tour begins with the thrilling experience of approaching white rhinos on foot in the company of trained rangers at Ziwa, the only place to see rhinos in the wild in Uganda. Then continue to Murchison Falls National Park to witness the spectacular waterfall, enjoy game drives teeming with wildlife, and cruise along the Nile River. This safari offers a perfect blend of adventure, wildlife viewing, and natural beauty.",
    duration: 5,
    price: 2950,
    location: "Murchison Falls National Park",
    country: "Uganda",
    coverImage: "/images/murchison-falls-view.jpg",
    images: [
      { url: "/images/murchison-falls-view.jpg", alt: "Murchison Falls" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Wildlife viewing" },
      { url: "/images/kibaale.jpeg", alt: "Luxury lodge" },
      { url: "/images/murchison-falls-view.jpg", alt: "River cruise" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "On-foot tracking of white rhinos with expert rangers",
      "Thundering spectacle of Murchison Falls",
      "Game drives with diverse wildlife including lions and elephants",
      "Nile River boat safari to the base of the falls",
      "Opportunity to spot rare shoebill storks"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
      "Rhino tracking fees",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Boat cruise on the Nile",
      "Airport transfers"
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
        title: "Entebbe to Ziwa Rhino Sanctuary",
        description: "Morning departure from Entebbe, driving north to Ziwa Rhino Sanctuary (approximately 3 hours). After lunch, enjoy your first rhino tracking experience on foot with trained rangers, approaching these magnificent endangered animals safely in their natural habitat. Evening presentation about rhino conservation efforts in Uganda.",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Amuka Lodge"
      },
      {
        day: 2,
        title: "Ziwa to Murchison Falls National Park",
        description: "Optional early morning rhino tracking before breakfast. Continue your journey to Murchison Falls National Park (approximately 2 hours). After crossing by ferry, check in at your lodge. Afternoon game drive in the northern section of the park, known for its abundant wildlife.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 3,
        title: "Murchison Falls Game Drives",
        description: "Full day of game viewing in Murchison Falls National Park. Early morning game drive when animals are most active, searching for lions, elephants, giraffes, and numerous antelope species. Afternoon game drive in a different sector of the park focusing on buffalo herds and leopard habitat.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 4,
        title: "Nile Delta Boat Safari & Falls",
        description: "Morning boat safari to the Nile Delta where the river enters Lake Albert, a prime area for spotting the rare shoebill stork and numerous water birds. Afternoon boat cruise upstream to the base of Murchison Falls for spectacular views of the world's most powerful waterfall. Optional hike to the top of the falls (moderate difficulty).",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 5,
        title: "Murchison Falls to Entebbe",
        description: "Final morning game drive before breakfast. Depart Murchison Falls, returning to Entebbe with a stop for lunch en route. Arrive in the late afternoon for your onward journey.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Charles Wilson",
        rating: 5,
        comment: "Approaching rhinos on foot was an incredible experience - heart-pounding but completely safe with the excellent rangers. Murchison Falls was spectacular and we saw so much wildlife including 3 tree-climbing lions!",
        date: "2024-08-28"
      },
      {
        id: "review-002",
        name: "Sophia Lin",
        rating: 4,
        comment: "Great combination of unique experiences. The rhino tracking was special and more intimate than we expected. The boat safari was my highlight - we saw countless hippos, crocs, and birds, plus the falls are impressive up close.",
        date: "2024-12-10"
      },
      {
        id: "review-003",
        name: "Trevor and Amelia Jackson",
        rating: 5,
        comment: "Perfect 5-day safari with good variety. Getting close to rhinos on foot was thrilling but felt completely safe. In Murchison we saw all the big game including elephants crossing the Nile. Highly recommended for those short on time.",
        date: "2025-01-22"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
      {
        id: "acc-001",
        name: "Budget Camping",
        type: "accommodation",
        description: "Basic camping at Ziwa Rhino Sanctuary and budget accommodation in Jinja with shared facilities.",
        priceAdjustment: -41
      },
      {
        id: "acc-002",
        name: "Mid-range Lodge",
        type: "accommodation",
        description: "Comfortable lodges like Amuka Lodge at Ziwa and mid-range hotels in Jinja with en-suite facilities.",
        priceAdjustment: 0
      },
      {
        id: "acc-003",
        name: "Luxury Safari Lodge",
        type: "accommodation",
        description: "Premium accommodation at Ziwa Guest House and luxury resorts in Jinja with Nile views.",
        priceAdjustment: 216
      },
      {
        id: "acc-004",
        name: "Adventure Camp",
        type: "accommodation",
        description: "Specialized adventure camps near Jinja focusing on water sports and outdoor activities.",
        priceAdjustment: 27
      }
    ],
      activities: [
      {
        id: "act-001",
        name: "Grade 5 White Water Rafting",
        type: "activity",
        description: "Full-day extreme white water rafting on the Nile with grade 5 rapids and professional guides.",
        priceAdjustment: 54
      },
      {
        id: "act-002",
        name: "Bungee Jumping",
        type: "activity",
        description: "Adrenaline-pumping bungee jump from 44 meters above the Nile River at Jinja.",
        priceAdjustment: 49
      },
      {
        id: "act-003",
        name: "Kayaking on the Nile",
        type: "activity",
        description: "Multi-day kayaking adventure on the Nile River with camping and professional instruction.",
        priceAdjustment: 68
      },
      {
        id: "act-004",
        name: "Horseback Rhino Tracking",
        type: "activity",
        description: "Unique horseback riding experience while tracking rhinos at Ziwa Rhino Sanctuary.",
        priceAdjustment: 54
      },
      {
        id: "act-005",
        name: "Quad Biking Adventure",
        type: "activity",
        description: "Quad biking adventure through rural Uganda countryside and along the Nile banks.",
        priceAdjustment: 32
      }
    ],
      transportation: [
      {
        id: "trans-001",
        name: "Shared Safari Vehicle",
        type: "transportation",
        description: "Shared 4WD vehicle for transfers between Ziwa and Jinja. Budget-friendly option.",
        priceAdjustment: -22
      },
      {
        id: "trans-002",
        name: "Private Safari Vehicle",
        type: "transportation",
        description: "Private 4WD vehicle with professional driver-guide for flexible transfers.",
        priceAdjustment: 0
      },
      {
        id: "trans-003",
        name: "Luxury Safari Vehicle",
        type: "transportation",
        description: "Premium 4WD with air conditioning and comfort features for smooth transfers.",
        priceAdjustment: 32
      },
      {
        id: "trans-004",
        name: "Helicopter Transfer",
        type: "transportation",
        description: "Helicopter transfer from Entebbe to Jinja with scenic aerial views of the Nile.",
        priceAdjustment: 811
      }
    ],
      duration: [
      {
        id: "dur-001",
        name: "2 Days Express Rhinos & Rapids",
        type: "duration",
        description: "Quick 2-day adventure focusing on rhino tracking and one major water activity.",
        priceAdjustment: -54
      },
      {
        id: "dur-002",
        name: "3 Days Standard Adventure",
        type: "duration",
        description: "Standard 3-day itinerary with rhino tracking, white water rafting, and source of Nile visit.",
        priceAdjustment: 0
      },
      {
        id: "dur-003",
        name: "4 Days Extended Adventure",
        type: "duration",
        description: "Extended adventure with multiple water activities and extended time at Ziwa.",
        priceAdjustment: 68
      },
      {
        id: "dur-004",
        name: "5 Days Comprehensive Adventure",
        type: "duration",
        description: "Most comprehensive adventure experience with all activities and cultural visits.",
        priceAdjustment: 122
      }
    ]
    },
    featured: false
  },
  {
    id: "tour-022",
    slug: "lake-mburo-uganda-safari",
    name: "Lake Mburo Wildlife & Horseback Safari",
    tagline: "Experience the pearl of Uganda's savanna parks on horseback and by vehicle",
    description: "Discover the compact yet beautiful Lake Mburo National Park, a hidden gem in western Uganda offering unique safari experiences. This tour combines traditional game drives with the rare opportunity to explore African savanna on horseback - one of the few parks in East Africa allowing horseback safaris. Encounter zebras, giraffes, antelopes and numerous bird species in this picturesque landscape of acacia woodlands, savanna, lakes, and rocky hills. With boat trips on Lake Mburo, guided nature walks, and optional mountain biking, this safari provides diverse wildlife viewing opportunities in a less visited national park that's perfect for those seeking authentic experiences away from crowds.",
    duration: 3,
    price: 1250,
    location: "Lake Mburo National Park",
    country: "Uganda",
    coverImage: "/images/Lake-Mburo-National-Park-750x450-1.jpg",
    images: [
      { url: "/images/queen-Elizabeth.jpeg", alt: "Lake Mburo landscape" },
      { url: "/images/murchison-falls-view.jpg", alt: "Horseback safari" },
      { url: "/images/kibaale.jpeg", alt: "Zebra herd" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Lakeside lodge" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Horseback safari among zebras and antelopes",
      "Boat trip on Lake Mburo for water birds and hippos",
      "Guided walking safari with ranger",
      "Night game drive for nocturnal species",
      "Perfect stopover when traveling between Kampala and southwest Uganda"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
      "Park entry fees",
      "Horseback safari with experienced guides",
      "Game drives in 4x4 vehicles",
      "Boat safari on Lake Mburo",
      "Walking safari",
      "Night game drive"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Optional mountain biking",
      "Personal expenses",
      "Tips and gratuities",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kampala to Lake Mburo",
        description: "Morning departure from Kampala driving west to Lake Mburo National Park (approximately 4 hours). Stop at the equator for photos and demonstrations. After entering the park, enjoy a game drive en route to your lodge overlooking Lake Mburo. Late afternoon horseback safari through the savanna woodlands among zebras and antelopes (approximately 2 hours, suitable for beginners and experienced riders).",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Mihingo Lodge"
      },
      {
        day: 2,
        title: "Lake Mburo Explorations",
        description: "Early morning game drive when animals are most active, searching for buffaloes, zebras, impalas, topis, and the elusive leopard. Return for breakfast and some relaxation time. Afternoon boat trip on Lake Mburo spotting hippos, crocodiles and numerous waterbirds. After dinner, enjoy a night game drive searching for nocturnal species like genets, serval cats, and bushbabies.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mihingo Lodge"
      },
      {
        day: 3,
        title: "Walking Safari & Departure",
        description: "Early morning guided walking safari with a ranger, offering a different perspective of the park and the opportunity to approach certain animals on foot. After breakfast, depart Lake Mburo with a final game drive on the way out of the park. Return to Kampala, arriving in the late afternoon.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Linda Morris",
        rating: 5,
        comment: "The horseback safari was magical - cantering alongside zebras was a once-in-a-lifetime experience! Lake Mburo may be small but it packs so much in. The lodge was stunning with great views over the lake.",
        date: "2024-10-12"
      },
      {
        id: "review-002",
        name: "Jason Brewer",
        rating: 4,
        comment: "Perfect short safari that offered diverse experiences. Horseback riding was fantastic and we saw tons of wildlife despite the park's smaller size. Nice to visit a less crowded national park for a change.",
        date: "2024-12-05"
      },
      {
        id: "review-003",
        name: "Abigail Winters",
        rating: 5,
        comment: "Lake Mburo was the surprise highlight of our Uganda trip! Approaching zebras on horseback was incredible, and the night drive showed us serval cats and bushbabies we'd never have seen otherwise. Mihingo Lodge is absolutely gorgeous too.",
        date: "2025-02-18"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
      {
        id: "acc-001",
        name: "Budget Camping",
        type: "accommodation",
        description: "Basic camping at Rwonyo Rest Camp or community campsites with shared facilities.",
        priceAdjustment: -32
      },
      {
        id: "acc-002",
        name: "Mid-range Lodge",
        type: "accommodation",
        description: "Comfortable lodges like Rwakobo Rock Lodge or Arcadia Cottages with en-suite facilities.",
        priceAdjustment: 0
      },
      {
        id: "acc-003",
        name: "Luxury Safari Lodge",
        type: "accommodation",
        description: "Premium lodges like Mihingo Lodge with luxury amenities and stunning lake views.",
        priceAdjustment: 270
      },
      {
        id: "acc-004",
        name: "Community Bandas",
        type: "accommodation",
        description: "Community-managed bandas offering authentic local experience with traditional meals.",
        priceAdjustment: -22
      }
    ],
      activities: [
      {
        id: "act-001",
        name: "Extended Horseback Safari",
        type: "activity",
        description: "Multi-day horseback safari exploring different areas of Lake Mburo National Park.",
        priceAdjustment: 54
      },
      {
        id: "act-002",
        name: "Boat Cruise on Lake Mburo",
        type: "activity",
        description: "Boat cruise on Lake Mburo to see hippos, crocodiles, and diverse water birds.",
        priceAdjustment: 22
      },
      {
        id: "act-003",
        name: "Walking Safari",
        type: "activity",
        description: "Guided walking safari to get closer to wildlife and experience nature on foot.",
        priceAdjustment: 16
      },
      {
        id: "act-004",
        name: "Cultural Community Visit",
        type: "activity",
        description: "Visit Bahima pastoralist communities to learn about traditional cattle keeping and lifestyle.",
        priceAdjustment: 14
      },
      {
        id: "act-005",
        name: "Night Game Drive",
        type: "activity",
        description: "Night game drive to spot nocturnal animals like leopards, hyenas, and bush babies.",
        priceAdjustment: 19
      }
    ],
      transportation: [
      {
        id: "trans-001",
        name: "Shared Safari Vehicle",
        type: "transportation",
        description: "Shared 4WD vehicle for transfers and game drives. Budget-friendly option.",
        priceAdjustment: -22
      },
      {
        id: "trans-002",
        name: "Private Safari Vehicle",
        type: "transportation",
        description: "Private 4WD vehicle with professional driver-guide for personalized experience.",
        priceAdjustment: 0
      },
      {
        id: "trans-003",
        name: "Luxury Safari Vehicle",
        type: "transportation",
        description: "Premium 4WD with air conditioning and enhanced comfort features.",
        priceAdjustment: 32
      },
      {
        id: "trans-004",
        name: "Helicopter Safari",
        type: "transportation",
        description: "Helicopter scenic flight over Lake Mburo with aerial wildlife viewing opportunities.",
        priceAdjustment: 541
      }
    ],
      duration: [
      {
        id: "dur-001",
        name: "2 Days Express Safari",
        type: "duration",
        description: "Quick 2-day safari with horseback riding and game drives. Perfect for short visits.",
        priceAdjustment: -41
      },
      {
        id: "dur-002",
        name: "3 Days Standard Safari",
        type: "duration",
        description: "Standard 3-day itinerary with horseback safari, boat cruise, and walking safari.",
        priceAdjustment: 0
      },
      {
        id: "dur-003",
        name: "4 Days Extended Safari",
        type: "duration",
        description: "Extended safari with additional activities and cultural visits for comprehensive experience.",
        priceAdjustment: 54
      },
      {
        id: "dur-004",
        name: "5 Days Comprehensive Safari",
        type: "duration",
        description: "Most comprehensive Lake Mburo experience with all activities and relaxed pace.",
        priceAdjustment: 95
      }
    ]
    },
    featured: false
  }
];
