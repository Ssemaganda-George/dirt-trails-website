import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, TreePine, Camera, Smartphone, QrCode, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Green tree icon
const treeIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Tree data from user (add Ashoka entry)
const treeDataList = [
  {
    id: "TREE-004",
    species: 'Markhamia lutea',
    latitude: 0.34760,
    longitude: 32.58250,
    planted_by: 'DirtTrails Community',
    planted_on: '2025-09-25',
    count: 1,
    notes: ''
  },
  {
    id: "TREE-003",
    species: 'Markhamia lutea',
    latitude: 0.34760,
    longitude: 32.58250,
    planted_by: 'DirtTrails Community',
    planted_on: '2025-09-25',
    count: 1,
    notes: ''
  },
  {
    id: "TREE-002",
    species: 'Ficus natalensis',
    latitude: 0.55800,
    longitude: 32.45970,
    planted_by: 'MIICHub',
    planted_on: '2025-09-25',
    count: 1,
    notes: ''
  },
  {
    id: "TREE-001",
    species: 'Prunus africana',
    latitude: 1.37330,
    longitude: 32.29030,
    planted_by: 'Uganda Wildlife Authority',
    planted_on: '2025-09-25',
    count: 1,
    notes: ''
  },
  {
    id: "TREE-000",
    species: 'Ashoka',
    latitude: 0.32032,
    longitude: 32.47574,
    planted_by: 'George, Angel, Sharon, Twine',
    planted_on: '2025-09-25',
    count: 1,
    notes: ''
  }
];

const GeotaggingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [allTrees, setAllTrees] = useState(treeDataList);
  const [selectedTree, setSelectedTree] = useState(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0.32032, 32.47574]); // Center on TREE-000 by default
  const [mapZoom, setMapZoom] = useState(10); // Adjusted zoom for better view of TREE-000
  const hasCenteredOnUser = useRef(false);
  const mapRef = useRef<any>(null);
  const navigate = useNavigate(); // Add this hook

  const trackingDatabase = {
    'EAT-2023-12345': {
      trees: 5,
      date: 'March 15, 2023',
      location: 'Mt. Kenya Forest',
      species: 'Acacia & Olive',
      coordinates: { lat: -0.1519, lng: 37.3084 }, // Mt. Kenya area
      co2Absorbed: 110
    },
    'EAT-2023-67890': {
      trees: 3,
      date: 'April 8, 2023',
      location: 'Kakamega Forest',
      species: 'Cedar & Mahogany',
      coordinates: { lat: 0.2827, lng: 34.7519 }, // Kakamega Forest
      co2Absorbed: 78
    },
    'EAT-2024-11111': {
      trees: 10,
      date: 'January 12, 2024',
      location: 'Aberdare Forest',
      species: 'Bamboo & Pine',
      coordinates: { lat: -0.3833, lng: 36.7167 }, // Aberdare Range
      co2Absorbed: 45
    }
  };

  const [treeData, setTreeData] = useState(null);

  // Fetch all trees from API with realtime polling (fallback to provided data)
  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const response = await fetch('/api/trees');
        if (response.ok) {
          const data = await response.json();
          setAllTrees(data);
        } else {
          setAllTrees(treeDataList); // Fallback to provided data
        }
      } catch (error) {
        console.error('Error fetching trees:', error);
        setAllTrees(treeDataList); // Fallback to provided data
      }
    };

    fetchTrees(); // Initial fetch
    const interval = setInterval(fetchTrees, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Get user location on mount (store for potential use, but don't center map)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(loc);
          // Do not set mapCenter to user location; keep TREE-000 as default
        },
        () => {
          setUserLocation(null);
          // Keep default center on TREE-000
        }
      );
    }
  }, []);

  // Search by Tree ID and center map on that tree
  const handleTreeIdSearch = (id?: string) => {
    const searchId = id || trackingId.trim();
    if (!searchId) return;
    const foundTree = allTrees.find(tree => tree.id.toLowerCase() === searchId.toLowerCase());
    if (foundTree && mapRef.current) {
      setSelectedTree(foundTree);
      setMapCenter([foundTree.latitude, foundTree.longitude]);
      setMapZoom(15);
      // Center map using Leaflet API
      mapRef.current.setView([foundTree.latitude, foundTree.longitude], 15, { animate: true });
    } else {
      setSelectedTree(null);
    }
  };

  // Auto-center on TREE-000 when component mounts and trees are loaded
  useEffect(() => {
    if (allTrees.length > 0) {
      handleTreeIdSearch('TREE-000');
    }
  }, [allTrees]);

  const handleSearch = () => {
    if (trackingId.trim()) {
      const data = trackingDatabase[trackingId.trim()];
      if (data) {
        setTreeData(data);
        setShowDemo(true);
      } else {
        // Show demo data for any unrecognized ID
        setTreeData({
          trees: 5,
          date: 'March 15, 2023',
          location: 'Mt. Kenya Forest',
          species: 'Acacia & Olive',
          coordinates: { lat: -0.1519, lng: 37.3084 },
          co2Absorbed: 110
        });
        setShowDemo(true);
      }
    }
  };

  const GoogleMap = ({ mapId }) => {
    return (
      <div 
        id={mapId} 
        className="h-72 w-full rounded-lg border"
        style={{ minHeight: '288px' }}
      />
    );
  };

  const FallbackMap = () => {
    return (
      <div className="h-72 bg-gradient-to-br from-green-100 to-green-200 border rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-green-400 opacity-20"></div>
        <div className="text-center z-10">
          <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <p className="text-green-800 font-medium">Interactive map showing tree locations</p>
          <p className="text-green-700 text-sm mt-2">Enter your tracking ID to see exact coordinates</p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full opacity-60"></div>
        <div className="absolute top-8 right-8 w-2 h-2 bg-green-600 rounded-full opacity-40"></div>
        <div className="absolute bottom-6 left-12 w-4 h-4 bg-green-400 rounded-full opacity-50"></div>
      </div>
    );
  };

  // Combined header and search component with action buttons
  const HeaderAndSearch = () => (
    <Card className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-6 pt-8 pb-4">
        <div className="text-center md:text-left flex-1">
          <div className="inline-flex items-center justify-center p-2 bg-green-500/10 rounded-full mb-4">
            <TreePine className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Geotagging & Tree Tracking</h1>
          <p className="text-gray-600 max-w-2xl mx-auto md:mx-0 mb-4">
            Monitor, search, and celebrate your tree planting impact.
          </p>
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-2">
            <Button
              className="bg-green-700 hover:bg-green-800 text-white font-semibold"
              onClick={() => navigate('/tours')} // Update to use navigate
            >
              Book Safari
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              onClick={() => navigate('/environment/tree-planting')} // Update to use navigate
            >
              Plant Trees
            </Button>
            <Button
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold"
              onClick={() => navigate('/contact')} // Update to use navigate
            >
              Contact Us
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold"
              onClick={() => navigate('/environment/donate')} // Update to use navigate
            >
              Donate to Conservation
            </Button>
          </div>
        </div>
        <div className="flex-1 max-w-xl mx-auto md:mx-0">
          <div>
            <CardTitle className="flex items-center mb-2 text-lg">
              <Search className="mr-2 h-5 w-5" />
              Find Your Tree by ID
            </CardTitle>
            <CardDescription className="mb-4">
              Enter your Tree ID (e.g., TREE-001) to zoom to your tree on the map.
            </CardDescription>
            <div className="flex gap-2">
              <Input 
                id="tracking-id" 
                placeholder="Tree ID (e.g., TREE-001)" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTreeIdSearch()}
              />
              <Button onClick={() => handleTreeIdSearch()} className="bg-green-600 hover:bg-green-700">
                Find
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Example IDs: TREE-001, TREE-002, TREE-003, TREE-004, TREE-005
            </p>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="container mx-auto px-0 py-0">
      {/* Gallery at top */}
      <div className="w-full py-8 relative overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 px-4">Tourists Planting Trees</h2>
        <div className="relative" style={{ width: "100%", overflow: "hidden", height: "190px" }}>
          <div
            className="flex space-x-6 absolute left-0 top-0"
            style={{
              width: "max-content",
              animation: "gallery-marquee 30s linear infinite"
            }}
          >
            {[...Array(2)].flatMap((_, i) => [
              <div className="flex-shrink-0 w-64" key={`img1-${i}`}>
                <img src="/images/Sharon1.png" alt="Tourist 1 planting" className="rounded-lg w-full h-40 object-cover shadow" />
                <div className="mt-2 text-center text-sm font-medium">Sharon planting Markhamia lutea</div>
              </div>,
              <div className="flex-shrink-0 w-64" key={`img2-${i}`}>
                <img src="/images/angel.png" alt="Tourist 2 planting" className="rounded-lg w-full h-40 object-cover shadow" />
                <div className="mt-2 text-center text-sm font-medium">George & Angel with Ashoka</div>
              </div>,
              <div className="flex-shrink-0 w-64" key={`img3-${i}`}>
                <img src="/images/Sharon.png" alt="Tourist 3 planting" className="rounded-lg w-full h-40 object-cover shadow" />
                <div className="mt-2 text-center text-sm font-medium">MIICHub team with Ficus natalensis</div>
              </div>,
              <div className="flex-shrink-0 w-64" key={`img4-${i}`}>
                <img src="/images/uwa.png" alt="Tourist 4 planting" className="rounded-lg w-full h-40 object-cover shadow" />
                <div className="mt-2 text-center text-sm font-medium">Uganda Wildlife Authority - Prunus africana</div>
              </div>
            ])}
          </div>
        </div>
        <style>{`
          @keyframes gallery-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .gallery-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      {/* Combined header and search */}
      <HeaderAndSearch />

      {/* Map */}
      <div className="w-full mb-10" style={{ height: "60vh", minHeight: 350, maxHeight: "80vh" }}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="w-full h-full"
          style={{ borderRadius: "1rem", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>You are here 📍</Popup>
            </Marker>
          )}
          {allTrees.map((tree) => (
            <Marker key={tree.id} position={[tree.latitude, tree.longitude]} icon={treeIcon}>
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold text-green-700">{tree.species}</p>
                  <p><strong>ID:</strong> {tree.id}</p>
                  <p><strong>Planted By:</strong> {tree.planted_by}</p>
                  <p><strong>Planted On:</strong> {new Date(tree.planted_on).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {tree.latitude.toFixed(5)}, {tree.longitude.toFixed(5)}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Modal for tree details */}
      {selectedTree && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedTree(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedTree.species}</h2>
            <p><strong>ID:</strong> {selectedTree.id}</p>
            <p><strong>Planted By:</strong> {selectedTree.planted_by}</p>
            <p><strong>Planted On:</strong> {new Date(selectedTree.planted_on).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {selectedTree.latitude}, {selectedTree.longitude}</p>
          </div>
        </div>
      )}

      {/* How Our Geotagging Works */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-center mb-8">How Our Geotagging Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-green-500/10 p-3 rounded-full">
                <TreePine className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="mt-2">GPS Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Each tree is tagged with precise GPS coordinates when planted, allowing us to
                monitor its exact location and growth over time.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-green-500/10 p-3 rounded-full">
                <Smartphone className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="mt-2">Mobile Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our local rangers use custom mobile apps to regularly document tree growth,
                health status, and surrounding biodiversity.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-green-500/10 p-3 rounded-full">
                <QrCode className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="mt-2">QR Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Unique QR codes on your certificate link directly to your trees' data,
                allowing you to track their progress anywhere, anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GeotaggingPage;