// Map coordinates for destinations in East Africa
export interface MapPoint {
  id: string;
  name: string;
  country: string;
  position: [number, number]; // [latitude, longitude]
  slug: string;
}

export const mapPoints: MapPoint[] = [
  // Uganda destinations
  {
    id: "map-001",
    name: "Bwindi Impenetrable Forest",
    country: "Uganda",
    position: [-1.0478, 29.6225],
    slug: "bwindi-impenetrable-forest"
  },
  {
    id: "map-002",
    name: "Queen Elizabeth National Park",
    country: "Uganda",
    position: [-0.2000, 30.0000],
    slug: "queen-elizabeth-national-park"
  },
  {
    id: "map-003",
    name: "Murchison Falls",
    country: "Uganda",
    position: [2.2748, 31.6830],
    slug: "murchison-falls"
  },
  {
    id: "map-004",
    name: "Kibale Forest",
    country: "Uganda",
    position: [0.4700, 30.3900],
    slug: "kibale-forest"
  },
  {
    id: "map-005",
    name: "Kidepo Valley",
    country: "Uganda",
    position: [3.8500, 33.7500],
    slug: "kidepo-valley"
  },
  {
    id: "map-006",
    name: "Lake Mburo National Park",
    country: "Uganda",
    position: [-0.6333, 30.9500],
    slug: "lake-mburo"
  },
  {
    id: "map-007",
    name: "Rwenzori Mountains",
    country: "Uganda",
    position: [0.3500, 29.8833],
    slug: "rwenzori-mountains"
  },
  
  // Kenya destinations
  {
    id: "map-008",
    name: "Masai Mara",
    country: "Kenya",
    position: [-1.5000, 35.1667],
    slug: "masai-mara"
  },
  {
    id: "map-009",
    name: "Amboseli National Park",
    country: "Kenya",
    position: [-2.6527, 37.2606],
    slug: "amboseli-national-park"
  },
  {
    id: "map-010",
    name: "Lake Nakuru",
    country: "Kenya",
    position: [-0.3667, 36.0833],
    slug: "lake-nakuru"
  },
  {
    id: "map-011",
    name: "Samburu National Reserve",
    country: "Kenya",
    position: [0.6167, 37.5333],
    slug: "samburu-national-reserve"
  },
  {
    id: "map-012",
    name: "Lewa Wildlife Conservancy",
    country: "Kenya",
    position: [0.2000, 37.4500],
    slug: "lewa-wildlife-conservancy"
  },
  {
    id: "map-013",
    name: "Tsavo National Park",
    country: "Kenya",
    position: [-2.5000, 38.3333],
    slug: "tsavo-national-park"
  },
  {
    id: "map-014",
    name: "Meru National Park",
    country: "Kenya",
    position: [0.1833, 38.1833],
    slug: "meru-national-park"
  },
  {
    id: "map-015",
    name: "Laikipia Plateau",
    country: "Kenya",
    position: [0.4000, 36.8333],
    slug: "laikipia-plateau"
  },
  
  // Tanzania destinations
  {
    id: "map-016",
    name: "Serengeti National Park",
    country: "Tanzania",
    position: [-2.3333, 34.8333],
    slug: "serengeti-national-park"
  },
  {
    id: "map-017",
    name: "Ngorongoro Crater",
    country: "Tanzania",
    position: [-3.2000, 35.4500],
    slug: "ngorongoro-crater"
  },
  {
    id: "map-018",
    name: "Tarangire National Park",
    country: "Tanzania",
    position: [-4.0000, 36.0000],
    slug: "tarangire-national-park"
  },
  {
    id: "map-019",
    name: "Ruaha and Selous",
    country: "Tanzania",
    position: [-7.5000, 37.0000],
    slug: "ruaha-selous"
  }
];