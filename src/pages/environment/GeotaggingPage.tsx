import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, TreePine, Camera, Smartphone, QrCode, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const GeotaggingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

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

  // Load Google Maps script
  useEffect(() => {
    if (window.google) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCU7J7Qw4DmPhRhqQx6dpT9vMucWx0UKqI&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    script.onerror = () => setMapError(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Initialize map when data is available
  useEffect(() => {
    if (mapLoaded && treeData && showDemo) {
      initializeMap();
    }
  }, [mapLoaded, treeData, showDemo]);

  const initializeMap = () => {
    const mapElement = document.getElementById('tree-map');
    if (!mapElement || !window.google) return;

    const map = new window.google.maps.Map(mapElement, {
      zoom: 12,
      center: treeData.coordinates,
      mapTypeId: 'satellite',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add marker for tree location
    const marker = new window.google.maps.Marker({
      position: treeData.coordinates,
      map: map,
      title: `${treeData.trees} trees planted here`,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#22c55e" width="32" height="32">
            <path d="M12 2L13.09 5.26L16 2V6L19.09 3.09L16 6L19.91 7.91L16 6L20 10L16 6L22 12L16 6V10L12 2Z"/>
            <path d="M12 22V12M8 18C8 16.89 8.89 16 10 16H14C15.11 16 16 16.89 16 18V22H8V18Z"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32)
      }
    });

    // Add info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 10px 0; color: #22c55e;">🌳 Tree Planting Site</h3>
          <p style="margin: 5px 0;"><strong>Trees:</strong> ${treeData.trees}</p>
          <p style="margin: 5px 0;"><strong>Species:</strong> ${treeData.species}</p>
          <p style="margin: 5px 0;"><strong>Planted:</strong> ${treeData.date}</p>
          <p style="margin: 5px 0;"><strong>Location:</strong> ${treeData.location}</p>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    // Open info window by default
    infoWindow.open(map, marker);
  };

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

  const GoogleMap = () => {
    if (mapError) {
      return (
        <div className="h-72 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-700 font-medium">Unable to load Google Maps</p>
            <p className="text-red-600 text-sm mt-1">Please check your internet connection</p>
          </div>
        </div>
      );
    }

    if (!mapLoaded) {
      return (
        <div className="h-72 bg-gray-100 border rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      );
    }

    return (
      <div 
        id="tree-map" 
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
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-green-500/10 rounded-full mb-4">
          <MapPin className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Geotagging & Tree Tracking</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor the growth and impact of your planted trees with our advanced geotagging system
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto mb-16">
        <Card className="mb-8">
          <CardHeader className="bg-green-500/10 rounded-t-lg">
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Track Your Trees
            </CardTitle>
            <CardDescription>
              Enter your tracking ID from your certificate to see your trees
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tracking-id">Tracking ID</Label>
                  <Input 
                    id="tracking-id" 
                    placeholder="Enter your tracking ID (e.g., EAT-2023-12345)" 
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Try: EAT-2023-12345, EAT-2023-67890, or EAT-2024-11111
                  </p>
                </div>
              </div>
              <Button onClick={handleSearch} className="mt-4 w-full bg-green-600 hover:bg-green-700">
                Find My Trees
              </Button>
            </div>
          </CardContent>
        </Card>
        
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
                <GoogleMap />
              </CardContent>
            </Card>
            
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
      </div>
      
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