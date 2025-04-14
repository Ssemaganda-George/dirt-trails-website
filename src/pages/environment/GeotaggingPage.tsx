
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, TreePine, Camera, Smartphone, QrCode } from "lucide-react";
import { useState } from "react";

const GeotaggingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      setShowDemo(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-safari-green/10 rounded-full mb-4">
          <MapPin className="h-6 w-6 text-safari-green" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Geotagging & Tree Tracking</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Monitor the growth and impact of your planted trees with our advanced geotagging system
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto mb-16">
        <Card className="mb-8">
          <CardHeader className="bg-safari-green/10 rounded-t-lg">
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Track Your Trees
            </CardTitle>
            <CardDescription>
              Enter your tracking ID from your certificate to see your trees
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tracking-id">Tracking ID</Label>
                  <Input 
                    id="tracking-id" 
                    placeholder="Enter your tracking ID (e.g., EAT-2023-12345)" 
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4 w-full">
                Find My Trees
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {showDemo && (
          <div className="space-y-8 animate-fade-in">
            <Card className="border-safari-green/20">
              <CardHeader className="bg-safari-green/10">
                <CardTitle>Your Tree Planting Summary</CardTitle>
                <CardDescription>Tracking ID: {trackingId || 'EAT-2023-12345'}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Trees Planted</p>
                      <p className="text-2xl font-semibold">5</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Planted Date</p>
                      <p className="text-2xl font-semibold">March 15, 2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-2xl font-semibold">Mt. Kenya Forest</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Species</p>
                      <p className="text-2xl font-semibold">Acacia & Olive</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg flex items-center">
                    <TreePine className="h-5 w-5 text-safari-green mr-2" />
                    <p className="text-sm">Your trees have absorbed approximately <span className="font-semibold">110 kg</span> of CO₂ so far.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="rounded-lg overflow-hidden border h-72 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-safari-green mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Interactive map showing tree locations</p>
                <p className="text-xs text-muted-foreground mt-2">(Demo visualization)</p>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Tree Growth Timeline</CardTitle>
                <CardDescription>Showing growth data over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-safari-green text-white p-1 rounded-full mr-3">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">March 2023: Planting Day</p>
                      <p className="text-sm text-muted-foreground">Saplings planted by local community members</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-safari-green text-white p-1 rounded-full mr-3">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">June 2023: 3-Month Growth</p>
                      <p className="text-sm text-muted-foreground">Trees showing healthy initial growth</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-safari-green text-white p-1 rounded-full mr-3">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">December 2023: 9-Month Growth</p>
                      <p className="text-sm text-muted-foreground">Established root systems and strong growth</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-muted p-1 rounded-full mr-3">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Next update: June 2024</p>
                      <p className="text-sm text-muted-foreground">You'll receive an email when new images are added</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">How Our Geotagging Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-safari-green/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-safari-green" />
              </div>
              <CardTitle className="mt-2">GPS Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Each tree is tagged with precise GPS coordinates when planted, allowing us to
                monitor its exact location and growth over time.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-safari-green/10 p-3 rounded-full">
                <Smartphone className="h-6 w-6 text-safari-green" />
              </div>
              <CardTitle className="mt-2">Mobile Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our local rangers use custom mobile apps to regularly document tree growth,
                health status, and surrounding biodiversity.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-safari-green/10 p-3 rounded-full">
                <QrCode className="h-6 w-6 text-safari-green" />
              </div>
              <CardTitle className="mt-2">QR Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
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
