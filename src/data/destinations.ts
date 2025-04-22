
export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
  shortDescription: string;
  image: string;
  highlights: string[];
  bestTimeToVisit: string;
}

export const destinations: Destination[] = [
  {
    id: "dest-001",
    name: "Masai Mara",
    slug: "masai-mara",
    country: "Kenya",
    description: "The Masai Mara National Reserve is one of Africa's most magnificent game reserves, world-renowned for its exceptional populations of lion, African leopard, cheetah, and African bush elephant. It is also host to the Great Migration, which secured it as one of the Seven Natural Wonders of Africa. The reserve is a photographer's and naturalist's paradise with abundant wildlife, diverse terrain, and spectacular scenery featuring vast open plains, woodlands, and riverine forest. Beyond the wildlife, visitors can also engage with the local Maasai people, learning about their distinctive customs and traditions.",
    shortDescription: "Famous for the Great Migration and abundant wildlife, the Masai Mara offers an iconic East African safari experience.",
    image: "images/maasai-mara-national-reserve-safari.jpg",
    highlights: [
      "The Great Migration (July-October)",
      "Big Five game viewing",
      "Hot air balloon safaris",
      "Maasai cultural visits",
      "Abundant predators including lions, cheetahs, and leopards"
    ],
    bestTimeToVisit: "July to October for the Great Migration, though wildlife viewing is excellent year-round."
  },
  {
    id: "dest-002",
    name: "Serengeti",
    slug: "serengeti",
    country: "Tanzania",
    description: "The Serengeti ecosystem is a geographical region in Africa, spanning northern Tanzania and southern Kenya. The name 'Serengeti' comes from the Maasai language, meaning 'endless plains'. The region contains Serengeti National Park, a UNESCO World Heritage Site, as well as several game reserves. The Serengeti is famous for its annual migration of over 1.5 million white-bearded wildebeest and 250,000 zebras, making it one of the most spectacular wildlife shows on earth. The vast ecosystem is also home to the 'big five' and more than 500 bird species. The diverse habitats, from open plains to acacia woodlands, riverine forests, and rocky outcrops known as kopjes, support an extraordinary variety of wildlife.",
    shortDescription: "Home to the largest terrestrial mammal migration in the world, the Serengeti's vast plains offer unparalleled game viewing.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    highlights: [
      "The Great Migration (year-round, different areas)",
      "Vast open plains teeming with wildlife",
      "Exceptional predator sightings",
      "Scenic hot air balloon safaris",
      "Stunning kopjes (rock formations) and diverse landscapes"
    ],
    bestTimeToVisit: "Year-round for excellent wildlife, with different migration highlights depending on season."
  },
  {
    id: "dest-003",
    name: "Bwindi Impenetrable Forest",
    slug: "bwindi",
    country: "Uganda",
    description: "Bwindi Impenetrable National Park is located in southwestern Uganda, a biodiverse, mountainous area with a magnificent misty landscape of dense rainforest. This ancient forest is home to almost half the world's population of endangered mountain gorillas, with around 400 individuals living within the park boundaries. Beyond the incredible gorilla tracking experience, the park is a sanctuary for colobus monkeys, chimpanzees, and numerous bird species. The biodiversity within Bwindi is exceptional, with over 160 tree species, 100 fern species, and numerous rare and endemic birds found nowhere else in East Africa. The challenging terrain, with steep ridges and valleys, adds to the adventure of exploring this primeval forest.",
    shortDescription: "Trek through mist-shrouded forests to encounter endangered mountain gorillas in their natural habitat.",
    image: "images/Bwindi.jpg",
    highlights: [
      "Mountain gorilla tracking",
      "Over 120 mammal species and 350 bird species",
      "Indigenous Batwa Pygmy cultural experiences",
      "Nature walks and birding",
      "Conservation and research opportunities"
    ],
    bestTimeToVisit: "Year-round, though trekking is easier during the drier months of June-August and December-February."
  },
  {
    id: "dest-004",
    name: "Zanzibar",
    slug: "zanzibar",
    country: "Tanzania",
    description: "Zanzibar is a semi-autonomous archipelago off the coast of Tanzania, consisting of Zanzibar Island (Unguja), Pemba Island, and numerous smaller islands. Zanzibar City, with its historic Stone Town district (a UNESCO World Heritage Site), reflects the island's fascinating cultural heritage, influenced by centuries of African, Arab, Indian, and European settlers. The island is famous for its pristine white sand beaches, vibrant coral reefs perfect for diving and snorkeling, and its historic role as a center for the spice trade. The blend of Swahili, Arabic, and Indian cuisines creates a distinctive culinary experience, while the warm, turquoise waters of the Indian Ocean provide the perfect setting for relaxation after an East African safari adventure.",
    shortDescription: "Experience the perfect blend of history, culture, and tropical beach paradise on this enchanting island.",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a",
    highlights: [
      "Pristine white sand beaches and crystal clear waters",
      "Historic Stone Town with architecture spanning centuries",
      "Spice tours and rich cultural heritage",
      "World-class snorkeling and diving opportunities",
      "Fresh seafood and fusion cuisine"
    ],
    bestTimeToVisit: "June to October during the dry season offers sunny days and low humidity."
  },
  {
    id: "dest-005",
    name: "Maasai Mara",
    slug: "maasai-mara",
    country: "Kenya",
    description: "The Maasai Mara National Reserve, also known simply as The Mara, is a large game reserve in southwestern Kenya, contiguous with the Serengeti National Park in Tanzania. It is named in honor of the Maasai people, the ancestral inhabitants of the area, and their description of the landscape when viewed from a distance: mara, which means 'spotted' in the local Maasai language, due to the many trees dotting the landscape. The Maasai Mara is renowned for its exceptional population of big cats, game, and the annual Great Migration, where over two million wildebeest, zebra, and Thomson's gazelle migrate from the Serengeti in Tanzania to the Maasai Mara in Kenya in search of greener pastures.",
    shortDescription: "Kenya's flagship conservation area offers spectacular savannah landscapes and unrivaled wildlife viewing opportunities.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e",
    highlights: [
      "Annual wildebeest migration (July-October)",
      "Exceptional big cat sightings",
      "Traditional Maasai culture",
      "Hot air balloon safaris over the plains",
      "Diverse ecosystems supporting abundant wildlife"
    ],
    bestTimeToVisit: "July to October for the Great Migration, though wildlife viewing is excellent year-round."
  }
];
