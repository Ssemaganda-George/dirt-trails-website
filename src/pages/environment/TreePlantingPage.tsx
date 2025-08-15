import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TreePine, MapPin, Award, Leaf, Users, Link as LinkIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatBot from "@/components/ChatBot";

const TreePlantingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-safari-green/10 rounded-full mb-4">
          <TreePine className="h-6 w-6 text-safari-green" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Tree Planting Initiative</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our efforts to reforest East Africa, combat climate change, and support local communities through our tree planting programs
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="border border-safari-green/20">
          <CardHeader className="bg-safari-green/10 rounded-t-lg">
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Our tree planting process explained</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-safari-green/20 p-2 rounded-full mr-4">
                  <Leaf className="h-5 w-5 text-safari-green" />
                </div>
                <div>
                  <h3 className="font-semibold">Add the Tree Planting Option</h3>
                  <p className="text-muted-foreground">During checkout, add the $50 tree planting option to your booking.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-safari-green/20 p-2 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-safari-green" />
                </div>
                <div>
                  <h3 className="font-semibold">We Plant Native Trees</h3>
                  <p className="text-muted-foreground">Our local partners plant native tree species in designated conservation areas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-safari-green/20 p-2 rounded-full mr-4">
                  <Award className="h-5 w-5 text-safari-green" />
                </div>
                <div>
                  <h3 className="font-semibold">Receive Your Certificate</h3>
                  <p className="text-muted-foreground">Get a digital certificate with details about your contribution.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-safari-green/20 p-2 rounded-full mr-4">
                  <LinkIcon className="h-5 w-5 text-safari-green" />
                </div>
                <div>
                  <h3 className="font-semibold">Track Your Trees</h3>
                  <p className="text-muted-foreground">Use your unique tracking link to monitor the growth of your trees.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Why Plant Trees in East Africa?</CardTitle>
            <CardDescription>Environmental and social benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Combat Climate Change:</span> Trees absorb CO₂, storing carbon and releasing oxygen.
              </p>
              <p>
                <span className="font-semibold">Prevent Soil Erosion:</span> Tree roots help bind soil together, preventing erosion.
              </p>
              <p>
                <span className="font-semibold">Support Biodiversity:</span> Native trees provide habitat for local wildlife.
              </p>
              <p>
                <span className="font-semibold">Community Benefits:</span> Our program creates jobs and sustainable income for local communities.
              </p>
              <p>
                <span className="font-semibold">Water Security:</span> Trees help regulate water cycles and improve water quality.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-8">Our Planting Locations</h2>
        
        <Tabs defaultValue="kenya" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-6">
            <TabsTrigger value="kenya">Kenya</TabsTrigger>
            <TabsTrigger value="tanzania">Tanzania</TabsTrigger>
            <TabsTrigger value="uganda">Uganda</TabsTrigger>
          </TabsList>
          <TabsContent value="kenya">
            <Card>
              <CardHeader className="bg-safari-green/10">
                <CardTitle>Kenya Reforestation Sites</CardTitle>
                <CardDescription>Mount Kenya Forest and Coastal Mangroves</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Mount Kenya Forest</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our reforestation efforts in the Mount Kenya region focus on planting indigenous tree species
                      that have been depleted due to deforestation. These trees help protect water catchment areas
                      that millions of Kenyans depend on.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-safari-green" />
                      <span>Mount Kenya, Central Kenya</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Coastal Mangroves</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our coastal mangrove restoration project helps protect Kenya's coastline from erosion,
                      provides breeding grounds for marine life, and creates sustainable livelihoods for
                      coastal communities.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-safari-green" />
                      <span>Gazi Bay, Coastal Kenya</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tanzania">
            <Card>
              <CardHeader className="bg-safari-green/10">
                <CardTitle>Tanzania Reforestation Sites</CardTitle>
                <CardDescription>Usambara Mountains and Kilimanjaro Region</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Usambara Mountains</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The Usambara Mountains are a biodiversity hotspot in urgent need of reforestation. 
                      Our tree planting efforts here help restore habitats for endemic species and protect 
                      vital water sources.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-safari-green" />
                      <span>East Usambara Mountains, Tanzania</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Kilimanjaro Region</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Climate change has significantly impacted Mount Kilimanjaro's forests. Our planting
                      efforts help restore the mountain's ecosystem and support local communities.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-safari-green" />
                      <span>Kilimanjaro Region, Northern Tanzania</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="uganda">
            <Card>
              <CardHeader className="bg-safari-green/10">
                <CardTitle>Uganda Reforestation Sites</CardTitle>
                <CardDescription>Mabira Forest and Mount Elgon</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Mabira Forest</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once Uganda's largest forest, Mabira has suffered extensive deforestation. 
                      Our restoration efforts focus on replanting native species and creating buffer
                      zones to protect the remaining forest.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-safari-green" />
                      <span>Mabira Forest, Central Uganda</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mount Elgon</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our tree planting initiatives on Mount Elgon help restore watershed areas,
                      prevent landslides, and support coffee farmers with sustainable agroforestry.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-safari-green" />
                      <span>Mount Elgon, Eastern Uganda</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="text-center">
        <Button size="lg" asChild>
          <Link to="/tours">
            Browse Tours & Add Tree Planting
          </Link>
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          {/* You can add the tree planting option ($50) during the checkout process for any tour */}
        </p>
      </div>
      <ChatBot />
    </div>
  );
};

export default TreePlantingPage;
