export interface SiteContentItem {
  path: string;
  title: string;
  content: string;
}

// Short, maintainable summaries for important site pages. This is a pragmatic
// build-time / developer-maintained index that the ChatBot can search at runtime.
// If you want deeper scraping of rendered components, consider a build-step
// extractor that pulls text from pages and components automatically.
export const siteContent: SiteContentItem[] = [
  {
    path: '/',
    title: 'Home',
    content: `Dirt Trails Safaris welcomes guests to a curated collection of safari
experiences across East Africa. The home page highlights featured tours,
conservation initiatives, testimonials, and a search to quickly find tours by
country, duration or price. We emphasize sustainable travel, community
engagement and responsible wildlife viewing.`
  },
  {
    path: '/about',
    title: 'About',
    content: `Dirt Trails Safaris is a professional safari operator focused on
sustainable tourism, conservation and community benefits. Our mission is to
deliver authentic, safe and well-planned safari experiences while supporting
local conservation and livelihoods.`
  },
  {
    path: '/contact',
    title: 'Contact',
    content: `Find our contact form, office location, phone numbers and typical
response times. Use this page to enquire about tailor-made tours, group
bookings, or partnership opportunities.`
  },
  {
    path: '/tours',
    title: 'Tours',
    content: `Browse our full catalogue of tour packages including wildlife safaris,
gorilla trekking, primate safaris, and cultural experiences. Each tour page
contains itinerary, inclusions, exclusions, prices, and booking information.`
  },
  {
    path: '/destinations',
    title: 'Destinations',
    content: `Overview of destinations we operate in: Kenya, Uganda, Tanzania and
Rwanda. Destination pages describe highlights, best seasons to visit and
typical wildlife sightings.`
  },
  {
    path: '/checkout',
    title: 'Checkout',
    content: `Secure booking flow for reserving tours, selecting payment methods,
and confirming traveler information. Includes optional extras and insurance
options.`
  },
  {
    path: '/environment/carbon-offset',
    title: 'Carbon Offset',
    content: `Information about how Dirt Trails Safaris measures and offsets carbon
emissions from travel. Options for customers to contribute to reforestation
and local offsetting programs.`
  },
  {
    path: '/environment/tree-planting',
    title: 'Tree Planting',
    content: `Details of our tree-planting partnerships, how contributions are used
to plant native species and support community nurseries.`
  },
  {
    path: '/environment/geotagging',
    title: 'Geotagging',
    content: `How we use geotagged data to support conservation monitoring,
wildlife tracking and community stewardship projects.`
  }
];

export default siteContent;
