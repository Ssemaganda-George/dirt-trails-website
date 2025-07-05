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
    description: "This trip gives you an opportunity to experience and explore the medley of wonders in this most visited wildlife safari park in Uganda, start the day the way nature intended at the crack of dawn to see the wild residents emerge for a drink from the bushy waterholes as the sun begins to rise over the iconic bush veld scenery. This trip engages all your senses when you combine it with Ultimate Gorilla Tracking experience in Bwindi as a Highlight for the Best of Uganda Ultimate Primate safari.",
    duration: 5,
    price: 2000,
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
      "Small group sizes for intimate experience",
      "Stay at lodges that support conservation",
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
        description: "You will then drive to Bwindi Impenetrable National Park with stop over for lunch en-route at selected Restaurant, Driving on these snake roads of kigezi region it is another great experience and check in at the Lodge in the evening as you relax after this long drive.",
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
        description: "After early morning, breakfast Drive, back to Kampala with stop over for lunch at selected Restaurant en-route. ",
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
    name: "3 Days Lifetime Wildlife Safari-Queen Elizabeth National Park",
    tagline: "Discover Uganda's most diverse national park",
    description: "You are welcome to this adventure that takes you to Queen Elizabeth national park, Uganda’s second largest national park that covers an area of 1978 square km. This trip to the medley of wonders will offer you an opportunity to experience and encounter the most outstanding moment, as you will be able to see a number of flora and fauna.During your game drive, you will be able to see animals like Lions, Elephants, Leopards, Buffaloes and many others. And the boat cruise that will be done along Kazinga channel will offer you a chance to see hippos, crocodiles, water birds and others.",
    duration: 3,
    price: 490000,
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
      "Game drives to spot tree-climbing lions",
      "Boat cruise on Kazinga Channel",
      "Chimpanzee tracking in Kyambura Gorge",
      "Bird watching opportunities",
      "Cultural village visits"
    ],
    inclusions: [
      "Transportation",
"Park entrance",
"Accommodation",
"Boat cruise",
"Game drive",
"Safari guide"
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
        title: "Transfer from Kampala to Queen Elizabeth national park.",
        description: "You will begin your trip from Kampala to Queen Elizabeth national park with a morning briefing by your guide upon pick up, and then begin your trip to Queen Elizabeth national park, with a number of stopovers for photography, snacks, and relaxing.You will take a stopover at the equator along masaka road, and lunch at a selected restaurant. Then after your lunch, you will embark on your journey, to the park, check in from the hotel and relax as you wait for the next day.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Protea Hotel Entebbe"
      },
      {
        day: 2,
        title: "Morning Game Drive and Afternoon Boat Cruise.",
        description: "You will wake early in the morning with the early grazers, have your breakfast, and then head to the jungle, in search for the wild residents. During this game drive, you will have an opportunity to see a number wildlife, including the elephants, buffaloes, lions, leopards, beautiful birds and many others. Then then after, head to the lodge for your lunch, as your prepare for the afternoon boat cruise.Afternoon boat cruise  You will get set for the 2-3 hours boat cruise along Kazinga channel, that connects Lakes Edward and George, with over 40kn long. You will be able to see a number animals more especially the water life, like Hippos, crocodiles, water birds like kingfishers and many others.You will after, head back to the lodge for dinner and overnight. ",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mweya Safari Lodge"
      },
      {
        day: 3,
        title: "Transfer To Kampala",
        description: "After your morning breakfast, you will exit the park with many memories, you will exit the park as you embark on the most engaging moments and memories and drive back to Kampala,You will drive and have your lunch enroute from a selected restaurant. You will reach in Kampala in the evening, and be dropped to your hotel or to the airport or Kampala, or at your respective homes.End of the Tour.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Mweya Safari Lodge"
      },
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
    name: "3 Days Wildlife Encounter- Murchison Falls NP",
    tagline: "Witness the world's most powerful waterfall",
    description: "The park is located in west Nile and have a number of activities that reward you with the great connection to the nature.  You will enjoy the great and stunning view of the falls standing on the top. The park is home for a number of wildlife including the lions, elephants, buffaloes, giraffes, warthogs, leopards, hippos, and many others.While on your boat cruise, you will be able to encounter the number of animals, like hippos, crocodiles, elephants, and others. The boat cruise starts from the lower side of the river Nile, and cruise as you head towards the bottom of the falls. This will be very interesting and engaging moment than ever before.",
    duration: 3,
    price: 580000,
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
        description: "You will be welcomed to a new day with a beautiful and delicious African made breakfast, and then you start a new day by driving into the jungle.You will go in for a morning game drive where you will be able to meet and encounter the wild residents including the lions, leopards, elephants,  bufalloes and many others.These wild resident will potray a clear reason for you being in this fascinating and touristic destination. Enjoy the more than a rewarding moments with these wild animals.You will then return to the lodge for your lunch and thereafter, you will go in for an afternoon boat cruise along the river nile, that takes approximately 3 hours. Within the boat cruise, you will be able to meet a number of animals like the hippos, crocodiles, and water birds like kingfishers, among others. You will also be able to see more other animals that come to drink waters on the river nile.You will then return to the hotel and relax, have your dinner and overnight.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Paraa Safari Lodge"
      },
      {
        day: 3,
        title: "Transfer To Kampala",
        description: "After your morning breakfast, you will exit the park with a lot of memories, you will exit the park as you embark on the most engaging moments and memories and drive back to kampala,You will drive and have your lunch enroute from a selected restaurant. You will reach in kampala in the evening, and be dropped to your hotel or to the airport for your flight.End Of The Tour.",
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
    slug: "gorilla-tracking",
    name: "5 days lifetime wildlife and gorilla tracking (Queen Elizabeth & Bwindi Forest National Park)",
    tagline: "Track gorillas in the primate capital of the world",
    description: "This trip gives you an opportunity to experience and explore the medley of wonders in this most visited wildlife safari park in Uganda, start the day the way nature intended at the crack of dawn to see the wild residents emerge for a drink from the bushy waterholes as the sun begins to rise over the iconic bush veld scenery. This trip engages all your senses when you combine it with Ultimate Gorilla Tracking experience in Bwindi as a Highlight for the Best of Uganda Ultimate Primate safari.",
    duration: 5,
    price: 2000,
    location: "Queen Elizabeth & Bwindi Forest National Park",
    country: "Uganda",
    coverImage: "/images/silverback-gorilla-3.jpg",
    images: [
      { url: "/images/silverback-gorilla-4.jpg", alt: "Gorilla tracking" },
      { url: "/images/walk.jpg", alt: "Forest walks" },
      { url: "/images/silverback-gorilla-1.jpg", alt: "Silver Back" },
      { url: "/images/lodge-uganda.jpg", alt: "Lodge" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Chimpanzee tracking experience",
      "13 different primate species",
      "Guided forest walks",
      "Bird watching opportunities",
      "Cultural community visits"
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
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
      "Optional activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Transfer from Kampala to Queen Elizabeth NP with stopover at Equator and Igongo Cultural Center For Lunch",
        description: "Pick up from Kampala or Entebbe international Airport and drive to Queen Elizabeth National park, with stopover at Equator crossing point at kayabwe and then proceed to Igongo cultural center in Mbarara for Lunch later after Lunch drive through Bushenyi and enjoy beautiful view of Tea plantations of south western Uganda to Queen Elizabeth National Park and check in at the Lodge in the evening.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Protea Hotel Entebbe"
      },
      {
        day: 2,
        title: "Morning Game Drive and Afternoon Boat Cruise",
        description: "After early morning Breakfast drive to Kasenyi plains for morning game drive which gives you the best African classic safari experience which engages all your senses with such a beautiful scenery of Rwenzori ranges and crater lakes animals expected to be sighted includes; Buffaloes, elephants, Uganda Kobs, Warthogs, Water bucks, Lions and baboons and varieties of Birds such as grey crown cranes, Southern Red bishop. Drive back to the lodge for warm Lunch, after lunch drive to mweya for the afternoon Boat cruise along the Kazinga channel for best of this un-forgettable and memorable experience while on the boat for two hours cruise to lake Edward where you will see local fishermen, this trip highlights are elephants which come down to the banks to drink and swim, several school of Hippopotamuses, Crocodiles basking at the banks and other animals like Buffaloes, water bucks with varieties of water birds such as, Great cormorant, pied kingfisher, African fish eagle etc.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Primate Lodge Kibale"
      },
      {
        day: 3,
        title: "Transfer to Bwindi Impenetrable Forest National Park",
        description: "You will then drive to Bwindi Impenetrable National Park with stop over for lunch en-route at selected Restaurant, Driving on these snake roads of kigezi region it is another great experience and check in at the Lodge in the evening as you relax after this long drive",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Primate Lodge Kibale"
      },
      {
        day: 4,
        title: "Gorilla Tracking in Bwindi Impenetrable National Park",
        description: "After Early Morning Breakfast drive to Gorilla tracking Briefing Point along with your packed lunch after briefing set off to meet the Beautiful giants in the forest enjoy the time with these closest giants to human.After tracking drive back to the lodge and have your time and relax as you enjoy the perfect view of Bwindi impenetrable forest, enjoy the balcony view of the forest from your room or on your private patio just outside at the shade besides the restaurant and the Bar.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: null
      },
      {
        day: 5,
        title: "Transfer Back to Kampala",
        description: "After early morning, breakfast Drive, back to Kampala with stop over for lunch at selected Restaurant en-route.",
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
    id: "tour-008",
    slug: "kibale-primates",
    name: "Kibale Forest Primate Safari",
    tagline: "Track chimpanzees in the primate capital of the world",
    description: "Explore Kibale Forest National Park, home to 13 primate species including chimpanzees. Experience guided nature walks, bird watching, and cultural encounters with local communities.",
    duration: 4,
    price: 1699,
    location: "Kibale Forest",
    country: "Uganda",
    coverImage: "/images/kibaale.jpeg",
    images: [
      { url: "/images/kibaale.jpeg", alt: "Chimpanzee tracking" },
      { url: "/images/kibaale.jpeg", alt: "Forest walks" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Lodge exterior" },
      { url: "/images/murchison-falls-view.jpg", alt: "Local culture" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
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
    id: "tour-009",
    slug: "8-day-gorilla-tracking",
    name: "8 Days Ultimate Gorilla Tracking, Chimpanzee Tracking and Wildlife Encounter in Uganda",
    tagline: "Track gorillas in the primate capital of the world",
    description: "This trip takes you to 3 of Uganda’s 10 national parks, which are one of the most loved and visited by tourists. While on this trip, you will encounter and explore the ultimate gorilla experience, in Bwindi, the medley of wonders in queen Elizabeth national as you will be engaged in game drive, and boat cruise, as well as the tree climbing lions of  Ishasha. While in Kibale national Park, you will experience the great moments with the chimpanzees, our closest cousins. This adventure, make the best of it, as it engages your minds, and uplifts your soul connecting you to the most outstanding and rewarding, wildlife encounter.Begin every day the way nature has intended.",
    duration: 8,
    price: 1699,
    location: "Bwindi Forest,Queen Elizabeth National Park & Kibale Forest",
    country: "Uganda",
    coverImage: "/images/chimp1.jpg",
    images: [
      { url: "/images/chip2.jpg", alt: "Chimpanzee tracking" },
      { url: "/images/chip3.jpg", alt: "Forest walks" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Lodge exterior" },
      { url: "/images/hippo.jpg", alt: "Local culture" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Chimpanzee tracking experience",
      "13 different primate species",
      "Guided forest walks",
      "Bird watching opportunities",
      "Cultural community visits"
    ],
    inclusions: [
      "Gorilla tracking permit",
"Chimpanzee tracking permit",
"All park entrances",
"Transportation & Transfers",
"Game drives",
"Boat cruise",
"Batwa experience",
"Full board accommodation",
"Professional Safari guide",
"Snacks & drinking water"
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
        title: "Transfer from Kampala to Bwindi National Park.",
        description: "You will begin your trip, on day one from Kampala with a briefing from the driver guide, who will the make sure you got your breakfast, and then drive to western Uganda, where your end will be Bwindi national park. You will have number stopovers for meals, snacks, photos, and your lunch.  You will be driving westwards, along the snake like roads, surrounded by the most beautiful and fantastic landscapes that will be attracting every camera lens and your eyes.Curious! You will check in from the hotel, in the evening and relax as you prepare your minds for the wonderful next day.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Protea Hotel Entebbe"
      },
      {
        day: 2,
        title: "Ultimate Gorilla Tracking Experience",
        description: "This is a long waited and a highlight day of the trip! As you will wake up In the morning have your breakfast, and packed lunch, then head to the gorilla tracking briefing point to meet the guides who will be taking you through this experience.You will take a short walk through the impenetrable and tropical rain forests, as you will meet these primates, as you will be allowed time with them, as you witness their interaction and behaviours.Thereafter, you will return to the hotel, for relaxation, sit and enjoy the balcony view of the tropical rain forests, as the beautiful birds sing for you from the nature, with that sweet and sharp nature voice. You will later have your dinner and overnight stay as you wait for the next day.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Primate Lodge Kibale"
      },
      {
        day: 3,
        title: "Batwa Experience ",
        description: "You are welcome to this new and 3rd day of your adventure, where a morning breakfast, and then head in for the cultural encounter will welcome you. During this day, you will be able to meet the Batwa, the so said to be human but the poorest tribe of people in Uganda. During your stay with them, you will be able to enjoy the beautiful and remarkable moments, as you will enjoy their local dances, and other cultural activities, like their hunting activities and others. You will in the evening, head back to the lodge, relax and you enjoy the balcony view of the tropical rain forests. Dinner, overnight stay as you wait for the next day.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Primate Lodge Kibale"
      },
      {
        day: 4,
        title: "Transfer to Queen Elizabeth National Park via Ishasha",
        description: "You will be welcomed to this new day for your adventure with an African delicious breakfast, and then drive to Queen Elizabeth national park via Ishasha sector in southern part of Queen Elizabeth national park.While driving to queen Elizabeth national park, a drive that will take about 5 hours, driving with a game drive through Ishasha, and with luck, you will be able to observe the tree climbing lions as the submerge in the tree branches, relaxing or playing, as they watch their territories. You will proceed to Queen Elizabeth’s northern sector, for checking in from the lodge, relax with dinner and overnight stay and wait for the next day. ",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      },
       {
        day: 5,
        title: "The Morning Game Drive and Afternoon Boat Cruise",
        description: "After early morning Breakfast drive to the Kasenyi plains for morning game drive because its believed to be a home for abundant wildlife, including the predators and the prey, which gives you the best African classic safari experience which engages all your senses with such a beautiful scenery of Rwenzori ranges and crater lakes animals expected to be sighted includes; Buffaloes, elephants, Uganda Kobs, Warthogs, Water bucks, Lions and baboons and varieties of Birds such as grey crown cranes, Southern Red bishop.Drive back to the lodge for warm Lunch, after lunch drive to mweya OR Katunguru for the afternoon Boat cruise along the Kazinga channel for best of this un-forgettable and memorable experience while on the boat for two hours cruise to lake Edward where you will see local fishermen, this trip highlights are elephants which come down to the banks to drink and swim, several school of Hippopotamuses, Crocodiles basking at the banks and other animals like Buffaloes, water bucks with varieties of water birds such as, Great cormorant, pied kingfisher, African fish eagle etc.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      },
      {
        day: 6,
        title: "Transfer to Kibale Forest National Park",
        description: "You will wake up in the morning with your morning breakfast, and then embark on your journey to Kibale national park, via Kasese Mpondwe road, with a number of stopovers and outstanding view of the fantastic landscapes, as you drive along the zigzag road heading to fort portal. You will drive for approximately 2-3 hours where you will reach check in from the hotel, and then relax, a you prepare for an activity or the next day. On this day, we may visit the Bigodi community for nature walks to see a number of birds, and primates like the monkeys. Head back to the lodge, relax, with your dinner stay as you wait for the next day.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      },
      {
        day: 7,
        title: "Transfer to Kibale Forest National Park",
        description: "You will wake up in the morning with a morning breakfast and head to Kanyanchu tourist information center with your parked lunch and drinking water, where you will meet the rangers or guides, who will give you the briefing and information about the chimpanzees, and go meet the wild residents from the primate capital of the world. On this day, you will have a moment with the Chimpanzees, our closest cousins. Spending that moment with these primates is so fascinating that, you will be thrilled by their behaviors and interactions. You will then after drive back to the for relaxation, and then have an evening walk, you will then head back to the lodge and relax with your dinner, and overnight stay as you wait for the next day.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      },
      {
        day: 8,
        title: "Transfer back to Kampala.",
        description: "You will wake up in the morning with your morning breakfast, and embark on your journey back to Kampala, as this will be the last day of your adventure. You will drive with your lunch en route and through Fort portal Kampala road as you enjoy the drive through the beautiful and scenic landscapes filled and covered by the tea plantations. You will reach in Kampala in the afternoon / evening and drive to your home, or hotel, or the airport for your return flight.",
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
    coverImage: "/images/maasai-mara-national-reserve-safari.jpg",
    images: [
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Lions resting in Masai Mara" },
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Elephants at sunset" },
      { url: "/images/Samburu-national-reserve.jpg", alt: "Safari camp" },
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Giraffe on the savanna" },
    ],
    mapImage: "/images/murchison-falls-view.jpg",
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
  },
  {
    id: "tour-008",
    slug: "amboseli-kilimanjaro-view",
    name: "Amboseli Kilimanjaro View Safari",
    tagline: "Experience elephants against the backdrop of Africa's tallest mountain",
    description: "Explore Amboseli National Park, famous for its large elephant herds and spectacular views of Mount Kilimanjaro. This safari offers incredible wildlife viewing opportunities with the snow-capped peak of Kilimanjaro creating a stunning backdrop for your photographs. Enjoy game drives, guided walks, and cultural interactions with the local Maasai communities.",
    duration: 4,
    price: 1750,
    location: "Amboseli National Park",
    country: "Kenya",
    coverImage: "/images/Amboseli.jpg",
    images: [
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Elephants with Kilimanjaro view" },
      { url: "/images/Samburu-national-reserve.jpg", alt: "Amboseli landscape" },
      { url: "/images/lake-nakuru.jpg", alt: "Safari lodge" },
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Maasai cultural experience" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Spectacular views of Mount Kilimanjaro",
      "Large elephant herds and diverse wildlife",
      "Traditional Maasai village visit",
      "Guided nature walks (optional)",
      "Bird watching in the marshlands"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
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
        description: "Arrive at Jomo Kenyatta International Airport where you'll be met and transferred to your hotel in Nairobi. Enjoy the rest of the day at leisure or explore the city.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Tamarind Tree Hotel"
      },
      {
        day: 2,
        title: "Nairobi to Amboseli National Park",
        description: "After breakfast, drive to Amboseli National Park (approximately 4 hours). Arrive at your lodge for lunch, followed by an afternoon game drive with your first opportunity to spot elephants against the backdrop of Mount Kilimanjaro.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Ol Tukai Lodge"
      },
      {
        day: 3,
        title: "Full Day in Amboseli",
        description: "Enjoy morning and afternoon game drives in Amboseli National Park. Between drives, relax at the lodge or take an optional guided nature walk. Visit a Maasai village in the afternoon to learn about their traditional way of life.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Ol Tukai Lodge"
      },
      {
        day: 4,
        title: "Amboseli to Nairobi",
        description: "Final morning game drive in Amboseli before breakfast. Return to Nairobi, arriving in the afternoon for your onward journey or flight home.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Thomas Burton",
        rating: 5,
        comment: "The views of Kilimanjaro with elephants in the foreground were stunning! Our guide was excellent at finding the perfect photo spots.",
        date: "2023-09-15"
      },
      {
        id: "review-002",
        name: "Rebecca Wong",
        rating: 4,
        comment: "A wonderful safari experience. Ol Tukai Lodge was comfortable with great views of elephants right from our room.",
        date: "2023-08-22"
      },
      {
        id: "review-003",
        name: "Alan Michaels",
        rating: 5,
        comment: "Seeing Kilimanjaro at sunrise with the elephants below was a magical moment I'll never forget.",
        date: "2023-07-10"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Lodge",
          type: "accommodation",
          description: "Comfortable safari lodge with excellent views.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Tented Camp",
          type: "accommodation",
          description: "Upgrade to a luxury tented camp experience.",
          priceAdjustment: 350
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Guided Bush Walk",
          type: "activity",
          description: "Walking safari with an armed ranger and guide.",
          priceAdjustment: 150
        },
        {
          id: "act-002",
          name: "Bird Watching Excursion",
          type: "activity",
          description: "Specialized bird watching tour of Amboseli wetlands.",
          priceAdjustment: 120
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Road Transfer",
          type: "transportation",
          description: "Standard road transfers between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Flying Safari",
          type: "transportation",
          description: "Scenic flights between destinations instead of driving.",
          priceAdjustment: 500
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 4-Day Safari",
          type: "duration",
          description: "Classic 4-day Amboseli experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 5-Day Safari",
          type: "duration",
          description: "Extended safari with more time in Amboseli.",
          priceAdjustment: 550
        }
      ]
    },
    featured: false
  },
  {
    id: "tour-009",
    slug: "lake-nakuru-flamingos",
    name: "Lake Nakuru Flamingo Safari",
    tagline: "Witness the pink paradise of flamingos and diverse wildlife",
    description: "Discover the breathtaking spectacle of Lake Nakuru National Park, famous for its flocks of flamingos that create a stunning pink fringe around the alkaline lake. Beyond the flamingos, explore a park rich in biodiversity including rhinos, lions, giraffes, and over 400 bird species. This safari combines exceptional wildlife viewing with beautiful landscapes in one of Kenya's most accessible conservation areas.",
    duration: 3,
    price: 1250,
    location: "Lake Nakuru National Park",
    country: "Kenya",
    coverImage: "/images/lake-nakuru.jpg",
    images: [
      { url: "/images/lake-nakuru.jpg", alt: "Flamingos at Lake Nakuru" },
      { url: "/images/lake-nakuru.jpg", alt: "White rhino" },
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Safari lodge view" },
      { url: "/images/lake-nakuru.jpg", alt: "Lake Nakuru landscape" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Thousands of pink flamingos (seasonal)",
      "Protected rhino sanctuary",
      "Abundant bird life with over 400 species",
      "Scenic lake and mountain landscapes",
      "Rothschild's giraffe conservation area"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
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
        title: "Nairobi to Lake Nakuru",
        description: "Morning departure from Nairobi, driving through the Great Rift Valley with a stop at a viewpoint. Arrive at Lake Nakuru National Park for lunch at the lodge. Afternoon game drive to see flamingos, rhinos, and other wildlife.",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Lake Nakuru Sopa Lodge"
      },
      {
        day: 2,
        title: "Full Day at Lake Nakuru",
        description: "Early morning game drive when predators are most active. Return to the lodge for breakfast and relaxation. Afternoon game drive focusing on the lake shore for flamingos and water birds, as well as the rhino sanctuary area.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Lake Nakuru Sopa Lodge"
      },
      {
        day: 3,
        title: "Lake Nakuru to Nairobi",
        description: "Final morning game drive after breakfast. Depart for Nairobi, arriving in the afternoon for your onward journey or flight home.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Martin Brooks",
        rating: 5,
        comment: "The flamingos were spectacular! We also saw both black and white rhinos which made this trip extra special.",
        date: "2023-08-05"
      },
      {
        id: "review-002",
        name: "Claire Thompson",
        rating: 4,
        comment: "Beautiful scenery and excellent wildlife viewing. The lodge had great views over the lake.",
        date: "2023-07-12"
      },
      {
        id: "review-003",
        name: "Derek Wilson",
        rating: 5,
        comment: "Incredible bird life! Our guide was very knowledgeable about the different species.",
        date: "2023-09-20"
      }
    ],
    rating: 4.6,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Lodge",
          type: "accommodation",
          description: "Comfortable lodge with lake views.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Lodge",
          type: "accommodation",
          description: "Upgrade to a luxury lodge experience.",
          priceAdjustment: 250
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Bird Watching Specialist",
          type: "activity",
          description: "Add a specialist bird watching guide to your safari.",
          priceAdjustment: 200
        },
        {
          id: "act-002",
          name: "Photography Workshop",
          type: "activity",
          description: "Wildlife photography workshop with tips for capturing flamingos.",
          priceAdjustment: 180
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Road Transfer",
          type: "transportation",
          description: "Standard road transfers between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Flying Safari",
          type: "transportation",
          description: "Scenic flights between destinations instead of driving.",
          priceAdjustment: 400
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 3-Day Safari",
          type: "duration",
          description: "Classic 3-day Lake Nakuru experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Combined with Lake Naivasha",
          type: "duration",
          description: "Extended 5-day safari including Lake Naivasha.",
          priceAdjustment: 650
        }
      ]
    },
    featured: false
  },
  {
    id: "tour-010",
    slug: "samburu-special",
    name: "Samburu Special Five Safari",
    tagline: "Discover unique wildlife in Kenya's rugged northern frontier",
    description: "Explore the stunning wilderness of Samburu National Reserve, home to the 'Samburu Special Five' - unique species found only in northern Kenya including the reticulated giraffe, Grevy's zebra, Somali ostrich, gerenuk and beisa oryx. This safari takes you to a less-visited but wildlife-rich region with distinctive landscapes, fascinating cultures, and unforgettable safari experiences.",
    duration: 4,
    price: 1899,
    location: "Samburu National Reserve",
    country: "Kenya",
    coverImage: "/images/Samburu-national-reserve.jpg",
    images: [
      { url: "/images/Samburu-national-reserve.jpg", alt: "Reticulated giraffe" },
      { url: "/images/Samburu-national-reserve.jpg", alt: "Samburu landscape" },
      { url: "/images/Samburu-national-reserve.jpg", alt: "Safari camp" },
      { url: "/images/Samburu-national-reserve.jpg", alt: "Samburu warriors" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Samburu Special Five unique wildlife",
      "Scenic landscapes of northern Kenya",
      "Samburu cultural visit",
      "Buffalo Springs experience",
      "Excellent elephant viewing"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
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
        title: "Nairobi to Samburu",
        description: "Early morning departure from Nairobi, driving north through changing landscapes to Samburu National Reserve. Arrive at your lodge for lunch, followed by an afternoon game drive to begin your search for Samburu's special species.",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Samburu Sopa Lodge"
      },
      {
        day: 2,
        title: "Samburu Game Drives",
        description: "Full day exploring Samburu with morning and afternoon game drives. Look for the 'Special Five' as well as big cats, elephants, and other wildlife. Between drives, relax at the lodge and enjoy views of the surrounding wilderness.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Samburu Sopa Lodge"
      },
      {
        day: 3,
        title: "Buffalo Springs and Cultural Visit",
        description: "Morning game drive in the neighboring Buffalo Springs Reserve. After lunch, visit a Samburu village to learn about their traditional way of life, distinctive dress, and customs. Evening game drive returning to the lodge.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Samburu Sopa Lodge"
      },
      {
        day: 4,
        title: "Samburu to Nairobi",
        description: "Final morning game drive in Samburu before breakfast. Depart for Nairobi, arriving in the late afternoon for your onward journey or flight home.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Olivia Reynolds",
        rating: 5,
        comment: "Samburu was the highlight of our Kenya trip. Seeing the unique northern species like the reticulated giraffe and gerenuk was incredible.",
        date: "2023-08-15"
      },
      {
        id: "review-002",
        name: "James Peterson",
        rating: 4,
        comment: "Less crowded than the Mara but still packed with wildlife. The Samburu village visit was fascinating and authentic.",
        date: "2023-07-22"
      },
      {
        id: "review-003",
        name: "Sofia Martinez",
        rating: 5,
        comment: "The landscapes in Samburu are stunning and unlike anything else in Kenya. We saw all of the Special Five plus lions and cheetahs!",
        date: "2023-09-05"
      }
    ],
    rating: 4.8,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Lodge",
          type: "accommodation",
          description: "Comfortable lodge with river views.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Tented Camp",
          type: "accommodation",
          description: "Upgrade to a luxury tented camp along the river.",
          priceAdjustment: 400
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Bush Breakfast",
          type: "activity",
          description: "Special breakfast setup in the wilderness.",
          priceAdjustment: 120
        },
        {
          id: "act-002",
          name: "Extended Cultural Experience",
          type: "activity",
          description: "In-depth cultural experience with Samburu people.",
          priceAdjustment: 150
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Road Transfer",
          type: "transportation",
          description: "Standard road transfers between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Flying Safari",
          type: "transportation",
          description: "Scenic flights between destinations instead of driving.",
          priceAdjustment: 450
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 4-Day Safari",
          type: "duration",
          description: "Classic 4-day Samburu experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 6-Day Safari",
          type: "duration",
          description: "Extended safari including Shaba National Reserve.",
          priceAdjustment: 750
        }
      ]
    },
    featured: true
  },
  {
    id: "tour-011",
    slug: "lewa-wildlife-conservancy",
    name: "Lewa Wildlife Adventure",
    tagline: "Experience conservation success in Kenya's premier private conservancy",
    description: "Discover the world-renowned Lewa Wildlife Conservancy, a UNESCO World Heritage Site and pioneering force in African conservation. Home to healthy populations of endangered black and white rhinos as well as diverse plains game, Lewa offers an intimate and exclusive safari experience. Stay in a small, luxurious lodge while enjoying guided game drives, walking safaris, and insights into groundbreaking conservation initiatives.",
    duration: 4,
    price: 3200,
    location: "Lewa Wildlife Conservancy",
    country: "Kenya",
    coverImage: "/images/Lewa.jpg",
    images: [
      { url: "/images/Lewa.jpg", alt: "White rhino at Lewa" },
      { url: "/images/Lewa.jpg", alt: "Lewa landscape" },
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Luxury tented camp" },
      { url: "/images/Lewa.jpg", alt: "Walking safari" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Black and white rhino conservation",
      "Exclusive and uncrowded game viewing",
      "Guided walking safaris",
      "Conservation and community projects",
      "Stunning Mount Kenya views"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals and selected drinks",
      "Conservancy fees",
      "Game drives in 4x4 vehicles",
      "Walking safaris with armed guide",
      "Conservation center visit",
      "Airport transfers"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Premium alcoholic beverages",
      "Optional activities",
      "Personal expenses",
      "Tips and gratuities",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Lewa",
        description: "Morning flight from Nairobi's Wilson Airport to Lewa Airstrip. On arrival, you'll be met by your guide and transferred to the lodge for lunch. Afternoon game drive in the conservancy, with focus on rhino and other wildlife.",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Lewa Safari Camp"
      },
      {
        day: 2,
        title: "Game Drives and Conservation",
        description: "Morning game drive followed by breakfast at the lodge. Visit the conservation center to learn about Lewa's pioneering work protecting rhinos and other species. Afternoon game drive focusing on different areas of the conservancy.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Lewa Safari Camp"
      },
      {
        day: 3,
        title: "Walking Safari and Community Visit",
        description: "Early morning walking safari with an armed guide, experiencing the wilderness on foot. After lunch, visit a nearby community project supported by the conservancy to see conservation and community development working together.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Lewa Safari Camp"
      },
      {
        day: 4,
        title: "Lewa to Nairobi",
        description: "Final morning game drive after breakfast. Transfer to the airstrip for your flight back to Nairobi, arriving in time for lunch and your onward journey.",
        meals: { breakfast: true, lunch: false, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Richard Atkinson",
        rating: 5,
        comment: "Lewa was exceptional - we saw 15 different rhinos and the guides were the most knowledgeable we've encountered anywhere in Africa. The small camp made it feel incredibly personal.",
        date: "2023-08-10"
      },
      {
        id: "review-002",
        name: "Amanda Hayworth",
        rating: 5,
        comment: "The walking safari was a highlight - being on foot in the bush gives you such a different perspective. Our guide pointed out tracks and plants we would have missed from a vehicle.",
        date: "2023-07-15"
      },
      {
        id: "review-003",
        name: "Daniel Carter",
        rating: 4,
        comment: "Excellent wildlife viewing and conservation focus. The camp was beautiful though slightly more rustic than we expected. The staff went above and beyond to make our stay special.",
        date: "2023-09-22"
      }
    ],
    rating: 4.8,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Safari Camp",
          type: "accommodation",
          description: "Comfortable tented safari camp.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Lodge",
          type: "accommodation",
          description: "Upgrade to a luxury lodge with private plunge pools.",
          priceAdjustment: 800
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Horseback Safari",
          type: "activity",
          description: "Horseback riding safari for experienced riders.",
          priceAdjustment: 350
        },
        {
          id: "act-002",
          name: "Helicopter Excursion",
          type: "activity",
          description: "Scenic helicopter flight over the conservancy.",
          priceAdjustment: 600
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
          priceAdjustment: 900
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 4-Day Safari",
          type: "duration",
          description: "Classic 4-day Lewa experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 6-Day Safari",
          type: "duration",
          description: "Extended stay with more activities and relaxation time.",
          priceAdjustment: 1500
        }
      ]
    },
    featured: false
  },
  {
    id: "tour-012",
    slug: "tsavo-adventure",
    name: "Tsavo East & West Explorer",
    tagline: "Discover Kenya's largest wilderness area and legendary red elephants",
    description: "Journey through the vast wilderness of Tsavo, Kenya's largest protected area divided into the contrasting landscapes of Tsavo East and West. Famous for its red-colored elephants, diverse wildlife, and dramatic scenery including the Yatta Plateau and Mzima Springs, this safari offers an authentic wild Africa experience. Explore different ecosystems while staying in comfortable lodges positioned for optimal wildlife viewing.",
    duration: 5,
    price: 1950,
    location: "Tsavo National Parks",
    country: "Kenya",
    coverImage: "/images/Tsavo-East-National-Park.jpg",
    images: [
      { url: "/images/Tsavo-East-National-Park.jpg", alt: "Red elephants of Tsavo" },
      { url: "/images/Tsavo-East-National-Park.jpg", alt: "Tsavo landscape" },
      { url: "/images/Tsavo-East-National-Park.jpg", alt: "Safari lodge" },
      { url: "/images/Tsavo-East-National-Park.jpg", alt: "Mzima Springs" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Red elephants of Tsavo East",
      "Mzima Springs crystal-clear waters",
      "Dramatic landscapes and volcanic hills",
      "Yatta Plateau - world's longest lava flow",
      "Less crowded safari experience"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
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
        title: "Nairobi to Tsavo East",
        description: "Morning departure from Nairobi, driving to Tsavo East National Park. Arrive at your lodge for lunch, followed by an afternoon game drive to search for the famous red elephants and other wildlife.",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Satao Camp"
      },
      {
        day: 2,
        title: "Tsavo East Exploration",
        description: "Full day exploring Tsavo East with morning and afternoon game drives. Visit the Aruba Dam, a popular wildlife gathering spot, and the scenic Mudanda Rock outlook. Return to the lodge for dinner.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Satao Camp"
      },
      {
        day: 3,
        title: "Tsavo East to Tsavo West",
        description: "Morning game drive in Tsavo East before departing for Tsavo West National Park. After lunch at your new lodge, enjoy an afternoon game drive in this dramatically different landscape.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Kilaguni Serena Safari Lodge"
      },
      {
        day: 4,
        title: "Tsavo West and Mzima Springs",
        description: "Morning game drive followed by a visit to Mzima Springs, where you can observe hippos and crocodiles from an underwater viewing chamber. Afternoon game drive exploring different areas of the park.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Kilaguni Serena Safari Lodge"
      },
      {
        day: 5,
        title: "Tsavo West to Nairobi",
        description: "Final morning game drive after breakfast. Depart for Nairobi, arriving in the late afternoon for your onward journey or flight home.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Gregory Barnes",
        rating: 5,
        comment: "Tsavo was less crowded than other parks but the wildlife was incredible. Seeing the red elephants was a particular highlight.",
        date: "2023-07-05"
      },
      {
        id: "review-002",
        name: "Patricia Liang",
        rating: 4,
        comment: "The landscape diversity between East and West was fascinating. Mzima Springs was magical - we saw hippos underwater through the viewing chamber!",
        date: "2023-08-18"
      },
      {
        id: "review-003",
        name: "Robert and Julia Kramer",
        rating: 5,
        comment: "This safari felt more wild and adventurous than our previous experiences. The lodges were excellent, especially Kilaguni with its waterhole views.",
        date: "2023-09-10"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Lodges",
          type: "accommodation",
          description: "Comfortable safari lodges.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Deluxe Eco-Camps",
          type: "accommodation",
          description: "Upgrade to intimate eco-camps with more personalized service.",
          priceAdjustment: 450
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Guided Nature Walk",
          type: "activity",
          description: "Walking safari with an armed ranger and guide.",
          priceAdjustment: 150
        },
        {
          id: "act-002",
          name: "Volcanic Hills Excursion",
          type: "activity",
          description: "Special excursion to Tsavo's volcanic formations.",
          priceAdjustment: 180
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Road Transfer",
          type: "transportation",
          description: "Standard road transfers between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Flying Safari",
          type: "transportation",
          description: "Scenic flights between destinations instead of driving.",
          priceAdjustment: 650
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 5-Day Safari",
          type: "duration",
          description: "Classic 5-day Tsavo experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 7-Day Safari",
          type: "duration",
          description: "Extended safari with more time in both parks.",
          priceAdjustment: 850
        }
      ]
    },
    featured: false
  },
  {
    id: "tour-013",
    slug: "serengeti-migration",
    name: "Serengeti Migration Safari",
    tagline: "Witness nature's greatest wildlife spectacle in Tanzania",
    description: "Experience the awe-inspiring Great Migration as vast herds of wildebeest and zebra make their annual journey through the Serengeti ecosystem. This carefully timed safari positions you in the best locations to witness river crossings, calving season, or the rut, depending on the time of year. Combine the epic migration with exceptional big cat sightings and diverse wildlife in Tanzania's most famous national park.",
    duration: 7,
    price: 3500,
    location: "Serengeti National Park",
    country: "Tanzania",
    coverImage: "/images/serengeti.jpg",
    images: [
      { url: "/images/serengeti.jpg", alt: "Wildebeest migration" },
      { url: "/images/serengeti.jpg", alt: "Lions in Serengeti" },
      { url: "/images/serengeti.jpg", alt: "Luxury tented camp" },
      { url: "/images/serengeti.jpg", alt: "Serengeti sunset" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Witness the Great Migration herds",
      "Potential river crossings (seasonal)",
      "Outstanding predator sightings",
      "Exclusive mobile camps that follow the migration",
      "Balloon safari over the plains (optional)"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals and selected drinks",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Domestic flights as specified",
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
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro International Airport and transfer to your hotel in Arusha. Evening briefing about your safari.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Arusha Coffee Lodge"
      },
      {
        day: 2,
        title: "Arusha to Northern Serengeti",
        description: "Morning flight from Arusha to the northern Serengeti. Begin game drives immediately after arrival, focusing on migration areas and the Mara River.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Sayari Camp"
      },
      {
        day: 3,
        title: "Northern Serengeti Migration",
        description: "Full day of game drives in the northern Serengeti, positioning near the Mara River for potential crossing sightings. Picnic lunch in the field to maximize wildlife viewing time.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Sayari Camp"
      },
      {
        day: 4,
        title: "Northern to Central Serengeti",
        description: "Game drive south into the central Serengeti, following the migration route. Afternoon game drive in the central regions, known for excellent big cat sightings.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Dunia Camp"
      },
      {
        day: 5,
        title: "Central Serengeti",
        description: "Full day exploring the Central Serengeti with morning and afternoon game drives. Visit the Seronera area with its diverse habitats and year-round wildlife.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Dunia Camp"
      },
      {
        day: 6,
        title: "Optional Balloon Safari",
        description: "Optional pre-dawn hot air balloon safari, followed by champagne breakfast. Continue with game drives in different areas of the central Serengeti.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Dunia Camp"
      },
      {
        day: 7,
        title: "Serengeti to Arusha",
        description: "Final morning game drive before flying back to Arusha. Day room available before your evening departure.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: "Day room if required"
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "William Houghton",
        rating: 5,
        comment: "Words can't describe witnessing thousands of wildebeest crossing the Mara River. Our guide anticipated the crossing perfectly - a once in a lifetime experience.",
        date: "2023-08-20"
      },
      {
        id: "review-002",
        name: "Jennifer and Mark Stevens",
        rating: 5,
        comment: "The migration was spectacular and we saw all the big cats - 16 lions in one day! The mobile camps were surprisingly luxurious and put us right in the action.",
        date: "2023-07-15"
      },
      {
        id: "review-003",
        name: "Stephanie Wong",
        rating: 4,
        comment: "Incredible wildlife experience. The balloon safari was magical though quite expensive. Our only disappointment was not seeing a river crossing, but that's nature!",
        date: "2023-09-05"
      }
    ],
    rating: 4.8,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Classic Camps",
          type: "accommodation",
          description: "Comfortable classic safari camps.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Premium Luxury Camps",
          type: "accommodation",
          description: "Upgrade to ultra-luxury camps throughout.",
          priceAdjustment: 1200
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Hot Air Balloon Safari",
          type: "activity",
          description: "Dawn hot air balloon ride with champagne breakfast.",
          priceAdjustment: 600
        },
        {
          id: "act-002",
          name: "Private Photography Guide",
          type: "activity",
          description: "Add a specialist photography guide to your safari.",
          priceAdjustment: 1500
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
          priceAdjustment: 2500
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 7-Day Safari",
          type: "duration",
          description: "Classic 7-day migration experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 10-Day Safari",
          type: "duration",
          description: "Extended safari including Ngorongoro Crater.",
          priceAdjustment: 1800
        }
      ]
    },
    featured: true
  },
  {
    id: "tour-014",
    slug: "ngorongoro-crater",
    name: "Ngorongoro Crater Safari",
    tagline: "Explore Africa's Eden and the world's largest intact caldera",
    description: "Discover the unique ecosystem of the Ngorongoro Crater, a UNESCO World Heritage Site and natural wonder with one of the highest concentrations of wildlife in Africa. This ancient volcanic caldera creates a natural enclosure for approximately 25,000 animals, including rare black rhinos, lions, elephants, and flamingos. Stay at lodges perched on the crater rim with spectacular views while enjoying game drives on the crater floor.",
    duration: 4,
    price: 2200,
    location: "Ngorongoro Conservation Area",
    country: "Tanzania",
    coverImage: "/images/Ngorongoro-crater.jpg",
    images: [
      { url: "/images/Ngorongoro-crater.jpg", alt: "Ngorongoro Crater view" },
      { url: "/images/Ngorongoro-crater.jpg", alt: "Lions in the crater" },
      { url: "/images/Ngorongoro-crater.jpg", alt: "Crater lodge" },
      { url: "/images/Ngorongoro-crater.jpg", alt: "Maasai village" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Game drives on the crater floor",
      "Spectacular views from crater rim lodges",
      "Chance to see endangered black rhino",
      "High concentration of predators",
      "Maasai cultural experiences"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
      "Park and crater entry fees",
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
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro International Airport and transfer to your hotel in Arusha. Evening briefing about your safari.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Arusha Coffee Lodge"
      },
      {
        day: 2,
        title: "Arusha to Ngorongoro",
        description: "After breakfast, drive to the Ngorongoro Conservation Area. Stop at a viewpoint for your first glimpse of the crater before checking in to your lodge perched on the crater rim. Afternoon at leisure to enjoy the spectacular views.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Ngorongoro Serena Lodge"
      },
      {
        day: 3,
        title: "Ngorongoro Crater Game Drive",
        description: "Full day game drive on the crater floor. Descend early to maximize wildlife viewing time and explore different areas of this unique ecosystem. Picnic lunch at a scenic hippo pool. Return to the lodge in the late afternoon.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Ngorongoro Serena Lodge"
      },
      {
        day: 4,
        title: "Ngorongoro to Arusha",
        description: "Morning visit to a Maasai village to learn about their traditional way of life. Afterward, return to Arusha, arriving in the late afternoon for your onward journey.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Margaret Wilson",
        rating: 5,
        comment: "The crater is simply magical! We saw everything - lions, elephants, and even two black rhinos. The density of wildlife is incredible.",
        date: "2023-08-28"
      },
      {
        id: "review-002",
        name: "John Tanner",
        rating: 4,
        comment: "The views from our lodge on the crater rim were breathtaking. The game drive was excellent though there were more vehicles than we expected.",
        date: "2023-07-15"
      },
      {
        id: "review-003",
        name: "Alexandra and Paul Richards",
        rating: 5,
        comment: "A truly unique safari experience. The volcanic landscape combined with the wildlife makes for unforgettable scenery. Our guide was extremely knowledgeable.",
        date: "2023-09-10"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Standard Lodge",
          type: "accommodation",
          description: "Comfortable lodge on the crater rim.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Lodge",
          type: "accommodation",
          description: "Upgrade to a luxury lodge with premium views.",
          priceAdjustment: 600
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Olmoti Crater Hike",
          type: "activity",
          description: "Guided hike to nearby Olmoti Crater.",
          priceAdjustment: 180
        },
        {
          id: "act-002",
          name: "Empakaai Crater Excursion",
          type: "activity",
          description: "Full day trip to the lesser-visited Empakaai Crater.",
          priceAdjustment: 300
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Road Transfer",
          type: "transportation",
          description: "Standard road transfers between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Flying Safari",
          type: "transportation",
          description: "Scenic flights between destinations instead of driving.",
          priceAdjustment: 450
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 4-Day Safari",
          type: "duration",
          description: "Classic 4-day Ngorongoro experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 6-Day Safari",
          type: "duration",
          description: "Extended safari including Lake Manyara.",
          priceAdjustment: 900
        }
      ]
    },
    featured: true
  },
  {
    id: "tour-015",
    slug: "tarangire-elephant-safari",
    name: "Tarangire Elephant Paradise",
    tagline: "Discover Tanzania's elephant haven and ancient baobab landscapes",
    description: "Explore the diverse ecosystem of Tarangire National Park, famous for its large elephant herds and iconic baobab trees. Less visited than other northern circuit parks, Tarangire offers a more secluded safari experience with excellent wildlife viewing, especially during the dry season when animals congregate around the Tarangire River. This safari combines game drives with walking safaris and night drives for a comprehensive wilderness experience.",
    duration: 4,
    price: 1850,
    location: "Tarangire National Park",
    country: "Tanzania",
    coverImage: "/images/tarangire.jpg",
    images: [
      { url: "/images/serengeti.jpg", alt: "Elephants by baobab trees" },
      { url: "/images/serengeti.jpg", alt: "Tarangire landscape" },
      { url: "/images/serengeti.jpg", alt: "Safari tent" },
      { url: "/images/serengeti.jpg", alt: "Night safari" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Large elephant herds",
      "Ancient baobab tree landscapes",
      "Night game drives",
      "Walking safaris",
      "Diverse birdlife"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Night drive and walking safari",
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
        title: "Arrival in Arusha",
        description: "Arrive at Kilimanjaro International Airport and transfer to your hotel in Arusha. Evening briefing about your safari.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Arusha Coffee Lodge"
      },
      {
        day: 2,
        title: "Arusha to Tarangire",
        description: "Morning drive to Tarangire National Park. Afternoon game drive focusing on elephant herds and the park's diverse habitats.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Tarangire Treetops"
      },
      {
        day: 3,
        title: "Tarangire Exploration",
        description: "Morning walking safari with an armed ranger, followed by a game drive. Evening night drive to spot nocturnal animals rarely seen during daylight hours.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Tarangire Treetops"
      },
      {
        day: 4,
        title: "Tarangire to Arusha",
        description: "Final morning game drive in Tarangire. Return to Arusha, arriving in the late afternoon for your onward journey.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Elizabeth Cooper",
        rating: 5,
        comment: "The elephant herds in Tarangire were incredible - we counted over 80 in one group! The treetop accommodation made it even more special.",
        date: "2023-08-05"
      },
      {
        id: "review-002",
        name: "Michael Henderson",
        rating: 4,
        comment: "The walking safari was a highlight, getting close to nature in a whole new way. Night drive revealed aardvarks and genets we would never have seen otherwise.",
        date: "2023-07-20"
      },
      {
        id: "review-003",
        name: "Sarah Johnson",
        rating: 5,
        comment: "Tarangire was less crowded than other parks but the wildlife was abundant. The baobab trees create such a unique landscape for photography.",
        date: "2023-09-15"
      }
    ],
    rating: 4.6,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Luxury Treehouse",
          type: "accommodation",
          description: "Unique elevated treehouse accommodation.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Tented Safari Camp",
          type: "accommodation",
          description: "Classic safari camp experience.",
          priceAdjustment: -200
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Extended Night Drive",
          type: "activity",
          description: "Extended night drive with spotlight safari.",
          priceAdjustment: 150
        },
        {
          id: "act-002",
          name: "Balloon Safari",
          type: "activity",
          description: "Hot air balloon safari over Tarangire.",
          priceAdjustment: 550
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Road Transfer",
          type: "transportation",
          description: "Standard road transfers between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Flying Safari",
          type: "transportation",
          description: "Scenic flights between destinations instead of driving.",
          priceAdjustment: 400
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 4-Day Safari",
          type: "duration",
          description: "Classic 4-day Tarangire experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 5-Day Safari",
          type: "duration",
          description: "Extended safari with Lake Manyara day trip.",
          priceAdjustment: 650
        }
      ]
    },
    featured: false
  },
  {
    id: "tour-016",
    slug: "ruaha-selous",
    name: "Southern Tanzania Wilderness",
    tagline: "Discover Tanzania's wild south in Ruaha and Selous reserves",
    description: "Venture off the beaten path to explore the remote wilderness areas of southern Tanzania. This safari combines Ruaha National Park, known for its dramatic landscapes and high predator density, with Selous Game Reserve (Nyerere National Park), Africa's largest protected area bisected by the mighty Rufiji River. Experience a different side of Tanzania with fewer visitors, diverse ecosystems, and exciting activities including boat safaris and walking adventures.",
    duration: 8,
    price: 4200,
    location: "Ruaha and Selous",
    country: "Tanzania",
    coverImage: "/images/southern-tanzania.jpg",
    images: [
      { url: "/images/serengeti.jpg", alt: "Ruaha landscape" },
      { url: "/images/serengeti.jpg", alt: "Lion pride" },
      { url: "/images/serengeti.jpg", alt: "Boat safari" },
      { url: "/images/serengeti.jpg", alt: "Safari camp" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Remote wilderness experience",
      "High predator concentration in Ruaha",
      "Boat safaris on Rufiji River",
      "Walking safaris",
      "Diverse habitats from baobab forests to wetlands"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals and selected drinks",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Boat safaris and walking safaris",
      "Domestic flights as specified",
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
        title: "Arrival in Dar es Salaam",
        description: "Arrive at Julius Nyerere International Airport in Dar es Salaam. Transfer to your hotel for overnight.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Hyatt Regency Dar es Salaam"
      },
      {
        day: 2,
        title: "Dar es Salaam to Ruaha",
        description: "Morning flight to Ruaha National Park. Transfer to your camp for lunch, followed by an afternoon game drive in this predator-rich wilderness.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Kwihala Camp"
      },
      {
        day: 3,
        title: "Ruaha National Park",
        description: "Full day exploring Ruaha with morning and afternoon game drives. Focus on finding the park's famous lion prides and other predators.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Kwihala Camp"
      },
      {
        day: 4,
        title: "Walking Safari in Ruaha",
        description: "Morning walking safari with an armed ranger, experiencing the wilderness on foot. Afternoon game drive exploring different areas of the park.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Kwihala Camp"
      },
      {
        day: 5,
        title: "Ruaha to Selous",
        description: "Morning game drive in Ruaha before flying to Selous Game Reserve (Nyerere National Park). Afternoon game drive en route to your riverside lodge.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Sand Rivers Selous"
      },
      {
        day: 6,
        title: "Boat Safari in Selous",
        description: "Morning boat safari on the Rufiji River, spotting hippos, crocodiles, and water birds. Afternoon game drive exploring the diverse habitats of Selous.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Sand Rivers Selous"
      },
      {
        day: 7,
        title: "Selous Game Reserve",
        description: "Full day exploring Selous with a combination of game drives and walking. Option for a full-day excursion to remote areas of the reserve with a picnic lunch.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Sand Rivers Selous"
      },
      {
        day: 8,
        title: "Selous to Dar es Salaam",
        description: "Final morning activity before flying back to Dar es Salaam for your onward journey.",
        meals: { breakfast: true, lunch: false, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Christopher Black",
        rating: 5,
        comment: "The southern circuit was a revelation - far fewer tourists but incredible wildlife. We saw 14 lions in one pride in Ruaha, and the boat safaris in Selous were outstanding.",
        date: "2023-08-10"
      },
      {
        id: "review-002",
        name: "Victoria and James Hamilton",
        rating: 4,
        comment: "Combining these two parks gave us a diverse experience. Ruaha's landscapes are dramatic with amazing baobabs, while Selous offered water activities we hadn't experienced elsewhere.",
        date: "2023-07-25"
      },
      {
        id: "review-003",
        name: "Benjamin Carter",
        rating: 5,
        comment: "If you want a more authentic, less crowded safari experience, this is it. The walking safaris were intense and exciting. Accommodations were surprisingly luxurious for such remote locations.",
        date: "2023-09-18"
      }
    ],
    rating: 4.8,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Classic Safari Camps",
          type: "accommodation",
          description: "Comfortable classic safari camps.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Lodges",
          type: "accommodation",
          description: "Upgrade to premium luxury lodges.",
          priceAdjustment: 1200
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Fly Camping",
          type: "activity",
          description: "Overnight fly camping experience in the wilderness.",
          priceAdjustment: 350
        },
        {
          id: "act-002",
          name: "Fishing Excursion",
          type: "activity",
          description: "Fishing trip on the Rufiji River.",
          priceAdjustment: 200
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
          priceAdjustment: 900
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 8-Day Safari",
          type: "duration",
          description: "Classic 8-day southern Tanzania experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 10-Day Safari",
          type: "duration",
          description: "Extended safari with more time in both parks.",
          priceAdjustment: 1500
        }
      ]
    },
    featured: false
  },
  {
    id: "tour-017",
    slug: "laikipia-wilderness",
    name: "Laikipia Wilderness Experience",
    tagline: "Discover Kenya's hidden gem of conservation and adventure",
    description: "Explore the vast wilderness of Laikipia, one of Kenya's most exciting and diverse safari destinations. This private conservancy area offers a perfect blend of wildlife viewing, cultural experiences, and adventure activities. Home to the second-highest concentration of wildlife in Kenya, Laikipia hosts not only the Big Five but also endangered species like wild dogs, Grevy's zebra, and reticulated giraffe. Experience the unique combination of luxury accommodations and authentic wilderness in this conservation success story.",
    duration: 5,
    price: 2800,
    location: "Laikipia Plateau",
    country: "Kenya",
    coverImage: "/images/Laikipia.jpg",
    images: [
      { url: "/images/Lewa.jpg", alt: "Laikipia wilderness" },
      { url: "/images/Samburu-national-reserve.jpg", alt: "Wildlife viewing" },
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Lodge exterior" },
      { url: "/images/Lewa.jpg", alt: "Cultural interaction" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Incredible wildlife diversity including rare species",
      "Walking safaris and camel treks",
      "Visits to local communities and conservation projects",
      "Horse riding safaris (optional)",
      "Fly camping under the stars"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals and selected drinks",
      "Conservancy fees",
      "Game drives in 4x4 vehicles",
      "Walking safaris with armed guide",
      "Cultural visits",
      "Airport transfers"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Premium alcoholic beverages",
      "Optional activities",
      "Personal expenses",
      "Tips and gratuities",
      "Visa fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Laikipia",
        description: "Morning flight from Nairobi's Wilson Airport to Laikipia. Meet your guide and transfer to your lodge for lunch. Afternoon game drive introducing you to the diverse landscapes and wildlife of the conservancy.",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Laikipia Wilderness Camp"
      },
      {
        day: 2,
        title: "Walking Safari",
        description: "Early morning walking safari accompanied by armed guides and trackers. Learn about tracking wildlife and the small wonders of the bush. Afternoon game drive focusing on predator sightings.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Laikipia Wilderness Camp"
      },
      {
        day: 3,
        title: "Conservation and Cultural Day",
        description: "Morning visit to local conservation projects including anti-poaching units and wildlife tracking teams. Afternoon visit to a local community to learn about their culture and relationship with wildlife conservation.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Laikipia Wilderness Camp"
      },
      {
        day: 4,
        title: "Adventure Activities",
        description: "Choose between a camel trek, horseback safari (for experienced riders), or mountain biking adventure. Evening fly camping experience under the stars with a bush dinner (weather permitting).",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Fly Camp"
      },
      {
        day: 5,
        title: "Laikipia to Nairobi",
        description: "Final morning game drive focusing on any species you haven't yet encountered. Return to the lodge for brunch before your flight back to Nairobi.",
        meals: { breakfast: true, lunch: false, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Eleanor Hughes",
        rating: 5,
        comment: "Laikipia was the highlight of our Kenya trip. We saw wild dogs on our first day and the walking safaris gave us a completely different perspective on the wildlife. The fly camping experience was magical!",
        date: "2024-09-12"
      },
      {
        id: "review-002",
        name: "Patrick O'Connor",
        rating: 4,
        comment: "The diversity of activities at Laikipia made it perfect for our family with teenagers. They loved the camel trek and mountain biking, while we appreciated the excellent wildlife viewing and conservation focus.",
        date: "2024-08-05"
      },
      {
        id: "review-003",
        name: "Bianca and Marco Rossi",
        rating: 5,
        comment: "The guides at Laikipia were incredibly knowledgeable, and the camp had just the right balance of comfort and wilderness feel. Seeing both black and white rhino was incredible, and learning about the conservation efforts was inspiring.",
        date: "2024-10-18"
      }
    ],
    rating: 4.8,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Classic Safari Camp",
          type: "accommodation",
          description: "Authentic safari camp with comfortable tents.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Lodge Upgrade",
          type: "accommodation",
          description: "Upgrade to a premium lodge with enhanced amenities.",
          priceAdjustment: 750
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Wild Dog Tracking",
          type: "activity",
          description: "Specialized wild dog tracking excursion.",
          priceAdjustment: 250
        },
        {
          id: "act-002",
          name: "Helicopter Excursion",
          type: "activity",
          description: "Scenic helicopter flight over Laikipia and Mount Kenya.",
          priceAdjustment: 800
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
          priceAdjustment: 1100
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 5-Day Safari",
          type: "duration",
          description: "Classic 5-day Laikipia experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 7-Day Safari",
          type: "duration",
          description: "Extended safari with more activities and relaxation time.",
          priceAdjustment: 1200
        }
      ]
    },
    featured: true
  },
  {
    id: "tour-018",
    slug: "meru-national-park",
    name: "Meru National Park Explorer",
    tagline: "Follow in the footsteps of Elsa the lioness in Adamson's paradise",
    description: "Venture into the wild, unspoiled beauty of Meru National Park, made famous by Joy Adamson's book 'Born Free' and home to the lioness Elsa. This remote and less-visited gem offers diverse landscapes from lush riverine forests to open plains and swamps, teeming with diverse wildlife including elephants, rhinos, leopards, and over 300 bird species. Experience the authentic wilderness atmosphere of this biodiverse park with its 13 rivers, palm-lined riverbanks, and baobab-studded plains, all while enjoying comfortable accommodations and expert guiding.",
    duration: 4,
    price: 1950,
    discount: 10,
    location: "Meru National Park",
    country: "Kenya",
    coverImage: "/images/meru-national-park-kenya.jpg",
    images: [
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Meru landscape" },
      { url: "/images/Tsavo-East-National-Park.jpg", alt: "Elephants crossing river" },
      { url: "/images/lake-nakuru.jpg", alt: "Lodge view" },
      { url: "/images/maasai-mara-national-reserve-safari.jpg", alt: "Born Free memorial" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "Visit to Elsa the Lioness grave site and Born Free memorial",
      "Outstanding bird watching opportunities",
      "Diverse landscapes with 13 rivers crossing the park",
      "Rhino sanctuary visits",
      "Uncrowded wilderness experience"
    ],
    inclusions: [
      "All accommodations",
      "Professional safari guide",
      "All meals as specified",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Walking safari with ranger",
      "Airport transfers",
      "Bottled water during activities"
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
        title: "Nairobi to Meru",
        description: "Morning flight from Nairobi to Meru National Park. Meet your driver-guide and transfer to your lodge. After lunch, enjoy an afternoon game drive to begin exploring this beautiful wilderness area.",
        meals: { breakfast: false, lunch: true, dinner: true },
        accommodation: "Elsa's Kopje"
      },
      {
        day: 2,
        title: "Meru Wildlife Exploration",
        description: "Full day of game drives in Meru National Park, exploring different habitats from riverine forests to open plains. Visit the rhino sanctuary to see both white and black rhinos being protected. Picnic lunch by one of the park's beautiful rivers.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Elsa's Kopje"
      },
      {
        day: 3,
        title: "Born Free Heritage",
        description: "Morning game drive followed by a visit to Elsa's grave and the Born Free memorial site. Learn about the conservation legacy of George and Joy Adamson. Afternoon walking safari accompanied by an armed ranger to experience the bush on foot.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Elsa's Kopje"
      },
      {
        day: 4,
        title: "Meru to Nairobi",
        description: "Final morning game drive focusing on bird watching and any species you haven't yet encountered. Return to the lodge for brunch before your flight back to Nairobi.",
        meals: { breakfast: true, lunch: false, dinner: false },
        accommodation: null
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Katherine Bennett",
        rating: 5,
        comment: "Meru was such a wonderful surprise - far fewer tourists than the Mara but incredible wildlife and scenery. We saw more elephants than we could count and the bird life was spectacular. Elsa's Kopje is also one of the most beautiful lodges we've stayed in.",
        date: "2024-07-22"
      },
      {
        id: "review-002",
        name: "Robert Fleming",
        rating: 4,
        comment: "As a Born Free fan, visiting Elsa's grave was a moving experience. The park has a wild, untamed feel that's increasingly rare in more popular safari destinations. Our guide was excellent at spotting wildlife including three leopards!",
        date: "2024-08-30"
      },
      {
        id: "review-003",
        name: "Samantha and Mike Taylor",
        rating: 5,
        comment: "The landscapes in Meru are simply stunning - we loved the palm-lined rivers and the views from Elsa's Kopje. Very few other vehicles made it feel like our own private park. The rhino sanctuary was a highlight and great conservation work.",
        date: "2024-09-15"
      }
    ],
    rating: 4.7,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Luxury Lodge",
          type: "accommodation",
          description: "Stay at the iconic Elsa's Kopje luxury lodge.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Tented Camp",
          type: "accommodation",
          description: "Switch to an authentic tented camp experience.",
          priceAdjustment: -400
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Night Game Drive",
          type: "activity",
          description: "Evening game drive to spot nocturnal species.",
          priceAdjustment: 180
        },
        {
          id: "act-002",
          name: "Fishing Excursion",
          type: "activity",
          description: "Fishing trip on one of Meru's rivers.",
          priceAdjustment: 150
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
          name: "Road Transfer",
          type: "transportation",
          description: "Overland journey through central Kenya (longer but more scenic).",
          priceAdjustment: -300
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 4-Day Safari",
          type: "duration",
          description: "Classic 4-day Meru experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 6-Day Safari",
          type: "duration",
          description: "Extended safari with more time for exploring Meru.",
          priceAdjustment: 950
        }
      ]
    },
    featured: false
  },
  {
    id: "tour-019",
    slug: "kidepo-valley",
    name: "Kidepo Valley Wilderness Safari",
    tagline: "Discover Uganda's most remote and spectacular national park",
    description: "Journey to the far northeast of Uganda to explore the magnificent Kidepo Valley National Park, one of Africa's most isolated yet spectacular wilderness areas. Bordered by South Sudan and Kenya, this pristine savanna landscape hosts abundant wildlife including rare species not found elsewhere in Uganda. With its golden plains, rugged mountains, and authentic cultural encounters, Kidepo offers the perfect combination of exceptional wildlife viewing and stunning landscapes without the crowds. This exclusive safari takes you deep into Uganda's least visited yet most rewarding national park.",
    duration: 6,
    price: 2950,
    location: "Kidepo Valley National Park",
    country: "Uganda",
    coverImage: "/images/kidepo-valley.jpg",
    images: [
      { url: "/images/murchison-falls-view.jpg", alt: "Kidepo Valley landscape" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Wildlife viewing" },
      { url: "/images/gorilla-uganda-primate-trekking-eating.jpeg", alt: "Luxury safari lodge" },
      { url: "/images/kibaale.jpeg", alt: "Cultural interaction" }
    ],
    mapImage: "/images/murchison-falls-view.jpg",
    highlights: [
      "One of Africa's most isolated and untouched wilderness areas",
      "Spectacular savanna landscapes and mountain views",
      "Unique wildlife including cheetah and striped hyena",
      "Authentic cultural experiences with Karamojong people",
      "Uncrowded safari experience far from tourist routes"
    ],
    inclusions: [
      "All accommodations",
      "Charter flights to/from Kidepo",
      "Professional safari guide",
      "All meals as specified",
      "Park entry fees",
      "Game drives in 4x4 vehicles",
      "Cultural village visits",
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
        title: "Arrival in Entebbe",
        description: "Arrive at Entebbe International Airport and transfer to your hotel. Enjoy a welcome dinner and briefing about your upcoming safari adventure.",
        meals: { breakfast: false, lunch: false, dinner: true },
        accommodation: "Hotel No. 5"
      },
      {
        day: 2,
        title: "Entebbe to Kidepo Valley",
        description: "Morning charter flight to Kidepo Valley National Park (approximately 2 hours). Transfer to your lodge with game viewing en route. Afternoon game drive introducing you to the park's diverse landscapes and wildlife.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Apoka Safari Lodge"
      },
      {
        day: 3,
        title: "Kidepo Valley Game Drives",
        description: "Full day exploration with morning and afternoon game drives in different sectors of the park. Search for unique species including cheetah, Rothschild's giraffe, zebra, and over 500 bird species. Enjoy a packed lunch at a scenic viewpoint overlooking the Narus Valley.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Apoka Safari Lodge"
      },
      {
        day: 4,
        title: "Karamojong Cultural Experience",
        description: "Morning game drive followed by a visit to a local Karamojong village. Learn about the traditional lifestyle, culture and customs of these semi-nomadic pastoralists. In the afternoon, enjoy a guided nature walk focusing on smaller wildlife and the unique flora of the region.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Apoka Safari Lodge"
      },
      {
        day: 5,
        title: "Kanangorok Hot Springs",
        description: "Full day excursion to the northern sector of the park and the Kanangorok Hot Springs near the Sudan border. This area offers different landscapes and wildlife viewing opportunities. Enjoy a picnic lunch by the hot springs before returning to the lodge for an evening game drive.",
        meals: { breakfast: true, lunch: true, dinner: true },
        accommodation: "Apoka Safari Lodge"
      },
      {
        day: 6,
        title: "Kidepo to Entebbe",
        description: "Early morning game drive focusing on any species you haven't yet encountered. Return to the lodge for breakfast before your charter flight back to Entebbe. Transfer to your hotel or the international airport for your onward journey.",
        meals: { breakfast: true, lunch: true, dinner: false },
        accommodation: "Day room if required"
      }
    ],
    reviews: [
      {
        id: "review-001",
        name: "Anthony Richards",
        rating: 5,
        comment: "Kidepo Valley was like stepping back in time to an untouched Africa. We had entire valleys to ourselves, saw 15 lions in one day, and the lodge was spectacular. Worth every penny and the extra effort to get there.",
        date: "2024-11-12"
      },
      {
        id: "review-002",
        name: "Maria Sanchez",
        rating: 4,
        comment: "A truly authentic safari experience far from the crowds. The landscape is breathtaking - vast golden plains surrounded by mountains. The Karamojong cultural visit was fascinating and gave us insights into a very traditional way of life.",
        date: "2024-09-20"
      },
      {
        id: "review-003",
        name: "Daniel and Helen Morris",
        rating: 5,
        comment: "Kidepo exceeded all our expectations. We've been on safaris throughout Africa but this felt the most wild and pristine. Our guide was exceptional at finding wildlife including cheetah and bat-eared foxes. The stargazing was incredible too!",
        date: "2025-01-15"
      }
    ],
    rating: 4.8,
    customizationOptions: {
      accommodation: [
        {
          id: "acc-001",
          name: "Luxury Safari Lodge",
          type: "accommodation",
          description: "Stunning lodge with panoramic views over the savanna.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Authentic Safari Camp",
          type: "accommodation",
          description: "More authentic tented camp experience.",
          priceAdjustment: -400
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Scenic Helicopter Flight",
          type: "activity",
          description: "Aerial tour over Kidepo's magnificent landscapes.",
          priceAdjustment: 650
        },
        {
          id: "act-002",
          name: "Extended Cultural Program",
          type: "activity",
          description: "In-depth cultural immersion with overnight homestay.",
          priceAdjustment: 250
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Charter Flights",
          type: "transportation",
          description: "Scheduled charter flights between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Overland Adventure",
          type: "transportation",
          description: "Multi-day road journey through rural Uganda (for the adventurous).",
          priceAdjustment: -400
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 6-Day Safari",
          type: "duration",
          description: "Classic 6-day Kidepo experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 8-Day Safari",
          type: "duration",
          description: "Extended exploration with more activities.",
          priceAdjustment: 1100
        }
      ]
    },
    featured: true
  },
  {
    id: "tour-020",
    slug: "ziwa-rhino-sanctuary-murchison-combo",
    name: "Rhinos & Rapids Safari",
    tagline: "Track rhinos on foot and witness the mighty Murchison Falls",
    description: "Experience a unique combination of endangered rhino tracking at Ziwa Rhino Sanctuary followed by the wildlife and scenic wonders of Murchison Falls National Park. This tour begins with the thrilling experience of approaching white rhinos on foot in the company of trained rangers at Ziwa, the only place to see rhinos in the wild in Uganda. Then continue to Murchison Falls National Park to witness the spectacular waterfall, enjoy game drives teeming with wildlife, and cruise along the Nile River. This safari offers a perfect blend of adventure, wildlife viewing, and natural beauty.",
    duration: 5,
    price: 1850,
    discount: 5,
    location: "Ziwa Sanctuary & Murchison Falls",
    country: "Uganda",
    coverImage: "/images/ziwa-rhino-sanctuary.jpg",
    images: [
      { url: "/images/murchison-falls-view.jpg", alt: "Murchison Falls" },
      { url: "/images/murchison-falls-view.jpg", alt: "White rhino tracking" },
      { url: "/images/queen-Elizabeth.jpeg", alt: "Game drive" },
      { url: "/images/kibaale.jpeg", alt: "Safari lodge" }
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
          name: "Standard Lodges",
          type: "accommodation",
          description: "Comfortable safari lodges with all amenities.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Luxury Accommodation",
          type: "accommodation",
          description: "Upgrade to premium lodges throughout.",
          priceAdjustment: 400
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Hot Air Balloon Safari",
          type: "activity",
          description: "Dawn balloon flight over Murchison Falls landscape.",
          priceAdjustment: 450
        },
        {
          id: "act-002",
          name: "Behind-the-Scenes Conservation",
          type: "activity",
          description: "Extended rhino conservation experience with researchers.",
          priceAdjustment: 250
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Road Transfer",
          type: "transportation",
          description: "Standard road transfers between destinations.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Fly-in Safari",
          type: "transportation",
          description: "Flight from Murchison Falls to Entebbe (saving travel time).",
          priceAdjustment: 300
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 5-Day Safari",
          type: "duration",
          description: "Classic 5-day experience as outlined.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 7-Day Safari",
          type: "duration",
          description: "Extended safari including Budongo Forest chimpanzees.",
          priceAdjustment: 850
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
          name: "Standard Mountain Huts",
          type: "accommodation",
          description: "Basic but comfortable mountain huts during the trek.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Premium Pre/Post Trek",
          type: "accommodation",
          description: "Upgrade to luxury lodges before and after the trek.",
          priceAdjustment: 300
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Extended Peak Circuit",
          type: "activity",
          description: "Longer trek option with attempt on Margherita Peak (5,109m).",
          priceAdjustment: 850
        },
        {
          id: "act-002",
          name: "Cultural Extension",
          type: "activity",
          description: "Additional day visiting local Bakonzo mountain communities.",
          priceAdjustment: 200
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Road Transfer",
          type: "transportation",
          description: "Standard road transfers to and from the mountains.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Fly to Kasese",
          type: "transportation",
          description: "Flights between Entebbe and Kasese (saving travel time).",
          priceAdjustment: 400
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 8-Day Trek",
          type: "duration",
          description: "Classic central circuit trek as outlined.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 12-Day Trek",
          type: "duration",
          description: "Full circuit including Margherita Peak climb option.",
          priceAdjustment: 1200
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
          name: "Luxury Lodge",
          type: "accommodation",
          description: "Scenic luxury lodge overlooking the lake.",
          priceAdjustment: 0
        },
        {
          id: "acc-002",
          name: "Tented Camp",
          type: "accommodation",
          description: "More authentic tented safari camp experience.",
          priceAdjustment: -200
        }
      ],
      activities: [
        {
          id: "act-001",
          name: "Mountain Biking",
          type: "activity",
          description: "Half-day guided mountain biking safari.",
          priceAdjustment: 120
        },
        {
          id: "act-002",
          name: "Extended Horseback Safari",
          type: "activity",
          description: "Full-day horseback adventure with bush lunch.",
          priceAdjustment: 180
        }
      ],
      transportation: [
        {
          id: "trans-001",
          name: "Road Transfer",
          type: "transportation",
          description: "Standard road transfers as outlined.",
          priceAdjustment: 0
        },
        {
          id: "trans-002",
          name: "Private Vehicle",
          type: "transportation",
          description: "Exclusive use of safari vehicle throughout.",
          priceAdjustment: 250
        }
      ],
      duration: [
        {
          id: "dur-001",
          name: "Standard 3-Day Safari",
          type: "duration",
          description: "Classic 3-day Lake Mburo experience.",
          priceAdjustment: 0
        },
        {
          id: "dur-002",
          name: "Extended 4-Day Safari",
          type: "duration",
          description: "Extra day to include Igongo Cultural Center visit.",
          priceAdjustment: 350
        }
      ]
    },
    featured: false
  }
];
