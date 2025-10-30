import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TreePine, MapPin, Award, Leaf, Users, Link as LinkIcon, TrendingUp, Quote, Globe } from "lucide-react";
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatBot from "@/components/ChatBot";

const TreePlantingPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="mb-10 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-full mb-4 shadow-lg">
          <TreePine className="h-8 w-8 text-green-600 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-stone-800 animate-slide-up">Tree Planting Initiative</h1>
        <p className="text-stone-600 max-w-2xl mx-auto animate-slide-up delay-200">
          Join our efforts to reforest East Africa, combat climate change, and support local communities through our tree planting programs
        </p>
      </div>
      
      {/* New Impact Statistics Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center border border-green-200 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in delay-300">
          <CardContent className="pt-6">
            <TreePine className="h-10 w-10 text-green-600 mx-auto mb-2 animate-bounce" />
            <h3 className="text-3xl font-bold text-stone-800 animate-count-up">100+</h3>
            <p className="text-stone-600">Trees Planted</p>
          </CardContent>
        </Card>
        <Card className="text-center border border-green-300 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in delay-400">
          <CardContent className="pt-6">
            <TrendingUp className="h-10 w-10 text-green-500 mx-auto mb-2 animate-bounce delay-100" />
            <h3 className="text-3xl font-bold text-stone-800 animate-count-up">100+ Tons</h3>
            <p className="text-stone-600">CO₂ Offset Annually</p>
          </CardContent>
        </Card>
        <Card className="text-center border border-green-400 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in delay-500">
          <CardContent className="pt-6">
            <Users className="h-10 w-10 text-green-700 mx-auto mb-2 animate-bounce delay-200" />
            <h3 className="text-3xl font-bold text-stone-800 animate-count-up">20+</h3>
            <p className="text-stone-600">Communities Supported</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in delay-600">
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-200 rounded-t-lg">
            <CardTitle className="text-stone-800">How It Works</CardTitle>
            <CardDescription className="text-stone-600">Our tree planting process explained</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start hover:bg-green-50 p-3 rounded-lg transition-colors duration-200">
                <div className="bg-green-200 p-2 rounded-full mr-4">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">Add the Tree Planting Option</h3>
                  <p className="text-stone-600">During checkout, add the $5+ tree planting option to your booking.</p>
                </div>
              </div>
              
              <div className="flex items-start hover:bg-green-50 p-3 rounded-lg transition-colors duration-200">
                <div className="bg-green-200 p-2 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">We Plant Native Trees</h3>
                  <p className="text-stone-600">Our local partners plant native tree species in designated conservation areas.</p>
                </div>
              </div>
              
              <div className="flex items-start hover:bg-green-50 p-3 rounded-lg transition-colors duration-200">
                <div className="bg-green-200 p-2 rounded-full mr-4">
                  <Award className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">Receive Your Certificate</h3>
                  <p className="text-stone-600">Get a digital certificate with details about your contribution.</p>
                </div>
              </div>
              
              <div className="flex items-start hover:bg-green-50 p-3 rounded-lg transition-colors duration-200">
                <div className="bg-green-200 p-2 rounded-full mr-4">
                  <LinkIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">Track Your Trees</h3>
                  <p className="text-stone-600">Use your unique tracking link to monitor the growth of your trees.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in delay-700">
          <CardHeader>
            <CardTitle className="text-stone-800">Why Plant Trees in East Africa?</CardTitle>
            <CardDescription className="text-stone-600">Environmental and social benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start hover:bg-green-50 p-3 rounded-lg transition-colors duration-200">
                <Leaf className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Combat Climate Change:</span> <span className="text-stone-600">Trees absorb CO₂, storing carbon and releasing oxygen.</span>
                </div>
              </div>
              <div className="flex items-start hover:bg-green-50 p-3 rounded-lg transition-colors duration-200">
                <MapPin className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Prevent Soil Erosion:</span> <span className="text-stone-600">Tree roots help bind soil together, preventing erosion.</span>
                </div>
              </div>
              <div className="flex items-start hover:bg-green-50 p-3 rounded-lg transition-colors duration-200">
                <Award className="h-5 w-5 text-green-700 mr-3 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Support Biodiversity:</span> <span className="text-stone-600">Native trees provide habitat for local wildlife.</span>
                </div>
              </div>
              <div className="flex items-start hover:bg-green-50 p-3 rounded-lg transition-colors duration-200">
                <Users className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Community Benefits:</span> <span className="text-stone-600">Our program creates jobs and sustainable income for local communities.</span>
                </div>
              </div>
              <div className="flex items-start hover:bg-green-50 p-3 rounded-lg transition-colors duration-200">
                <TrendingUp className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Water Security:</span> <span className="text-stone-600">Trees help regulate water cycles and improve water quality.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* New Testimonials Section */}
      <div className="mb-12 animate-fade-in delay-800">
        <h2 className="text-2xl font-semibold text-center mb-8 text-stone-800">What Our Partners Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-green-600 mb-4 animate-pulse" />
              <p className="text-stone-600 mb-4 italic">
                "Dirt Trails Safaris' tree planting initiative is helping to transform communities, providing sustainable livelihoods and restoring vital ecosystems."
              </p>
              <p className="font-semibold text-stone-800">- George, Founder, Green Trails Africa</p>
            </CardContent>
          </Card>
          <Card className="border border-green-300 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-green-500 mb-4 animate-pulse delay-100" />
              <p className="text-stone-600 mb-4 italic">
                "Partnering with them has helped us combat climate change while supporting biodiversity in East Africa."
              </p>
              <p className="font-semibold text-stone-800">- Patrick, Conservation Expert, AgriMate Farm</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-12 animate-fade-in delay-900">
        <h2 className="text-2xl font-semibold text-center mb-8 text-stone-800">Our Planting Locations</h2>
        
        <Tabs defaultValue="uganda" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-6 bg-gradient-to-r from-green-100 to-green-200">
            <TabsTrigger value="kenya" className="hover:bg-green-300 transition-colors">Kenya</TabsTrigger>
            <TabsTrigger value="uganda" className="hover:bg-green-200 transition-colors">Uganda</TabsTrigger>
            <TabsTrigger value="tanzania" className="hover:bg-green-400 transition-colors">Tanzania</TabsTrigger>
          </TabsList>
          <TabsContent value="uganda">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-green-100 to-green-200 rounded-t-lg">
                <CardTitle className="text-stone-800">Uganda Reforestation Sites</CardTitle>
                <CardDescription className="text-stone-600">Mabira Forest and Mount Elgon</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="hover:scale-105 transition-transform duration-200">
                    <img src="/images/mabira.png" alt="Mabira Forest" className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h3 className="font-semibold mb-2 text-stone-800">Mabira Forest</h3>
                    <p className="text-sm text-stone-600 mb-4">
                      Once Uganda's largest forest, Mabira has suffered extensive deforestation. 
                      Our restoration efforts focus on replanting native species and creating buffer
                      zones to protect and conserve such forests.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-green-600" />
                      <span className="text-stone-700">Mabira Forest, Central Uganda</span>
                    </div>
                  </div>
                  <div className="hover:scale-105 transition-transform duration-200">
                    <img src="/images/elgon.png" alt="Mount Elgon" className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h3 className="font-semibold mb-2 text-stone-800">Mount Elgon</h3>
                    <p className="text-sm text-stone-600 mb-4">
                      Our tree planting initiatives aim to extend to Mount Elgon helping to restore watershed areas,
                      prevent landslides, and support coffee farmers with sustainable agroforestry.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-green-600" />
                      <span className="text-stone-700">Mount Elgon, Eastern Uganda</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="kenya">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-green-200 to-green-300 rounded-t-lg">
                <CardTitle className="text-stone-800">Kenya Reforestation Sites</CardTitle>
                <CardDescription className="text-stone-600">Mount Kenya Forest and Coastal Mangroves</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="hover:scale-105 transition-transform duration-200">
                    <img src="/placeholder-mount-kenya.jpg" alt="Mount Kenya Forest" className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h3 className="font-semibold mb-2 text-stone-800">Mount Kenya Forest</h3>
                    <p className="text-sm text-stone-600 mb-4">
                      Our reforestation efforts in the Mount Kenya region focus on planting indigenous tree species
                      that have been depleted due to deforestation. These trees help protect water catchment areas
                      that millions of Kenyans depend on.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-stone-700">Mount Kenya, Central Kenya</span>
                    </div>
                  </div>
                  <div className="hover:scale-105 transition-transform duration-200">
                    <img src="/placeholder-coastal-mangroves.jpg" alt="Coastal Mangroves" className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h3 className="font-semibold mb-2 text-stone-800">Coastal Mangroves</h3>
                    <p className="text-sm text-stone-600 mb-4">
                      Our coastal mangrove restoration project helps protect Kenya's coastline from erosion,
                      provides breeding grounds for marine life, and creates sustainable livelihoods for
                      coastal communities.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-stone-700">Gazi Bay, Coastal Kenya</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tanzania">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-green-300 to-green-400 rounded-t-lg">
                <CardTitle className="text-stone-800">Tanzania Reforestation Sites</CardTitle>
                <CardDescription className="text-stone-600">Usambara Mountains and Kilimanjaro Region</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="hover:scale-105 transition-transform duration-200">
                    <img src="/placeholder-usambara-mountains.jpg" alt="Usambara Mountains" className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h3 className="font-semibold mb-2 text-stone-800">Usambara Mountains</h3>
                    <p className="text-sm text-stone-600 mb-4">
                      The Usambara Mountains are a biodiversity hotspot in urgent need of reforestation. 
                      Our tree planting efforts here help restore habitats for endemic species and protect 
                      vital water sources.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-green-700" />
                      <span className="text-stone-700">East Usambara Mountains, Tanzania</span>
                    </div>
                  </div>
                  <div className="hover:scale-105 transition-transform duration-200">
                    <img src="/placeholder-kilimanjaro.jpg" alt="Kilimanjaro Region" className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h3 className="font-semibold mb-2 text-stone-800">Kilimanjaro Region</h3>
                    <p className="text-sm text-stone-600 mb-4">
                      Climate change has significantly impacted Mount Kilimanjaro's forests. Our planting
                      efforts help restore the mountain's ecosystem and support local communities.
                    </p>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-green-700" />
                      <span className="text-stone-700">Kilimanjaro Region, Northern Tanzania</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="text-center mb-8 animate-fade-in delay-1000">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300" asChild>
            <Link to="/tours" state={{ from: 'tree-planting' }}>
              Browse Tours & Add Tree Planting
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
            <Link to="/contact" state={{ from: 'tree-planting' }}>
              Learn More About Our Impact
            </Link>
          </Button>
        </div>
      </div>
      
      {/* New Footer Section */}
      <div className="text-center border-t border-stone-200 pt-8 animate-fade-in delay-1100">
        <p className="text-sm text-stone-600">
          For more information, visit our <Link to="/about" className="text-green-600 hover:underline transition-colors">About Us</Link> page or <Link to="/contact" className="text-green-600 hover:underline transition-colors">contact us</Link> directly.
        </p>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default TreePlantingPage;
