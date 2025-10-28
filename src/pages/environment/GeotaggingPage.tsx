import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, TreePine, Camera, Smartphone, QrCode, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
    id: "TREE-001",
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
    species: 'Ficus natalensis',
    latitude: 0.55800,
    longitude: 32.45970,
    planted_by: 'MIICHub',
    planted_on: '2025-09-25',
    count: 1,
    notes: ''
  },
  {
    id: "TREE-004",
    species: 'Prunus africana',
    latitude: 1.37330,
    longitude: 32.29030,
    planted_by: 'Uganda Wildlife Authority',
    planted_on: '2025-09-25',
    count: 1,
    notes: ''
  },
  {
    id: "TREE-005",
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
  const [mapCenter, setMapCenter] = useState<[number, number]>([-0.0236, 37.9062]);
  const [mapZoom, setMapZoom] = useState(7);
  const hasCenteredOnUser = useRef(false);
  const mapRef = useRef<any>(null);

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

  // Get user location on mount and center map there
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(loc);
          setMapCenter(loc);
          setMapZoom(12);
        },
        () => {
          setUserLocation(null);
          setMapCenter([-0.0236, 37.9062]);
          setMapZoom(7);
        }
      );
    }
  }, []);

  // Search by Tree ID and center map on that tree
  const handleTreeIdSearch = () => {
    const id = trackingId.trim();
    if (!id) return;
    const foundTree = allTrees.find(tree => tree.id.toLowerCase() === id.toLowerCase());
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

  // Helper component to center map on user location when available
  function CenterMapOnUser({ userLocation }: { userLocation: [number, number] | null }) {
    const map = useMap();
    if (userLocation && !hasCenteredOnUser.current) {
      map.setView(userLocation, 12, { animate: true });
      hasCenteredOnUser.current = true;
    }
    // Attach map ref for search
    if (!mapRef.current) mapRef.current = map;
    return null;
  }

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
          <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
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

  return (
    <div className="container mx-auto px-0 py-0">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-green-500/10 rounded-full mb-4">
          <MapPin className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Geotagging & Tree Tracking</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor the growth and impact of your planted trees with our advanced geotagging system
        </p>
      </div>

      {/* Full-width, tall map */}
      <div className="w-full" style={{ height: "70vh", minHeight: 400, maxHeight: "90vh" }}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="w-full h-full"
          style={{ borderRadius: "1rem", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
          whenReady={e => { mapRef.current = e.target; }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CenterMapOnUser userLocation={userLocation} />
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
                  <p><strong>Planted By:</strong> {tree.planted_by || "Unknown"}</p>
                  <p><strong>Planted On:</strong> {new Date(tree.planted_on).toLocaleDateString()}</p>
                  <p><strong>Count:</strong> {tree.count}</p>
                  <p><strong>Location:</strong> {tree.latitude.toFixed(5)}, {tree.longitude.toFixed(5)}</p>
                  {tree.notes && <p><strong>Notes:</strong> {tree.notes}</p>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Track Your Trees section */}
      <Card className="mb-8">
        <CardHeader className="bg-green-500/10 rounded-t-lg">
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Track Your Trees by ID
          </CardTitle>
          <CardDescription>
            Enter your Tree ID (e.g., TREE-001) to find and zoom to your tree on the map.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tracking-id">Tree ID</Label>
                <Input 
                  id="tracking-id" 
                  placeholder="Enter your Tree ID (e.g., TREE-001)" 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTreeIdSearch()}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example IDs: TREE-001, TREE-002, TREE-003, TREE-004, TREE-005
                </p>
              </div>
            </div>
            <Button onClick={handleTreeIdSearch} className="mt-4 w-full bg-green-600 hover:bg-green-700">
              Find My Tree
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search results */}
      {showDemo && treeData && (
        <div className="space-y-8 animate-fade-in">
          <Card className="border-green-500/20">
            <CardHeader className="bg-green-500/10">
              <CardTitle>Your Tree Planting Summary</CardTitle>
              <CardDescription>Tracking ID: {trackingId || 'EAT-2023-12345'}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Trees Planted</p>
                    <p className="text-2xl font-semibold">{treeData.trees}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Planted Date</p>
                    <p className="text-2xl font-semibold">{treeData.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="text-2xl font-semibold">{treeData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Species</p>
                    <p className="text-2xl font-semibold">{treeData.species}</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg flex items-center border border-green-200">
                  <TreePine className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-sm">Your trees have absorbed approximately <span className="font-semibold">{treeData.co2Absorbed} kg</span> of CO₂ so far.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Individual tree map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Tree Location Map
              </CardTitle>
              <CardDescription>
                Exact GPS coordinates: {treeData.coordinates.lat.toFixed(4)}, {treeData.coordinates.lng.toFixed(4)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full rounded-lg border">
                <MapContainer
                  center={[treeData.coordinates.lat, treeData.coordinates.lng]}
                  zoom={12}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[treeData.coordinates.lat, treeData.coordinates.lng]} icon={treeIcon}>
                    <Popup>
                      <div className="space-y-1">
                        <p className="font-semibold text-green-700">{treeData.species}</p>
                        <p><strong>Trees:</strong> {treeData.trees}</p>
                        <p><strong>Planted:</strong> {treeData.date}</p>
                        <p><strong>Location:</strong> {treeData.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tree Growth Timeline</CardTitle>
              <CardDescription>Showing growth data over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-600 text-white p-1 rounded-full mr-3">
                    <Camera className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{treeData.date}: Planting Day</p>
                    <p className="text-sm text-gray-600">Saplings planted by local community members</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-600 text-white p-1 rounded-full mr-3">
                    <Camera className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">3-Month Growth Update</p>
                    <p className="text-sm text-gray-600">Trees showing healthy initial growth</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-600 text-white p-1 rounded-full mr-3">
                    <Camera className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">9-Month Growth Update</p>
                    <p className="text-sm text-gray-600">Established root systems and strong growth</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-300 p-1 rounded-full mr-3">
                    <Camera className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Next update: {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">You'll receive an email when new images are added</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {!showDemo && (
        <div className="rounded-lg overflow-hidden border">
          <FallbackMap />
        </div>
      )}
    
      {/* Modal for full tree details */}
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
            <p><strong>Planted By:</strong> {selectedTree.planted_by || "Unknown"}</p>
            <p><strong>Planted On:</strong> {new Date(selectedTree.planted_on).toLocaleDateString()}</p>
            <p><strong>Count:</strong> {selectedTree.count}</p>
            <p className="mt-2"><strong>Notes:</strong> {selectedTree.notes || "No additional notes"}</p>
            <p className="mt-2"><strong>Location:</strong> {selectedTree.latitude}, {selectedTree.longitude}</p>
          </div>
        </div>
      )}
      
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">How Our Geotagging Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-green-500/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-green-600" />
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