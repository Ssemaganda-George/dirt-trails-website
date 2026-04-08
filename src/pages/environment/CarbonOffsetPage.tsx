import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Plane, Car, Ship, Bus, Calculator, Info, Train, Briefcase, Globe, Building, BarChart3, ServerCog, Globe2, Plug, ShieldCheck, TreeDeciduous, Users, Award } from "lucide-react";

const CarbonOffsetCalculator = () => {
  const navigate = useNavigate();
  const [transportType, setTransportType] = useState('flight');
  const [flightType, setFlightType] = useState('long-haul');
  const [distance, setDistance] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [carType, setCarType] = useState('medium-petrol');
  const [occupancy, setOccupancy] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [treesNeeded, setTreesNeeded] = useState<number | null>(null);
  const [detailedResults, setDetailedResults] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const [demoCompanyName, setDemoCompanyName] = useState('');
  const [demoBusinessType, setDemoBusinessType] = useState('DMC');
  const [demoGeographicFocus, setDemoGeographicFocus] = useState('Africa');
  const [demoKeySoftwareNeeds, setDemoKeySoftwareNeeds] = useState('');
  const [demoSuccessMessage, setDemoSuccessMessage] = useState('');
  const [demoErrors, setDemoErrors] = useState<{ [key: string]: string }>({});
  
  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    const distanceNum = parseFloat(distance);
    const passengersNum = parseInt(passengers);
    if (!distance || distanceNum <= 0) newErrors.distance = 'Please enter a valid distance greater than 0.';
    if (!passengers || passengersNum <= 0) newErrors.passengers = 'Please enter a valid number of passengers greater than 0.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const calculateOffset = () => {
    if (!validateInputs()) return;
    setIsCalculating(true);
    // Simulate brief calculation delay for UX
    setTimeout(() => {
      const distanceNum = parseFloat(distance) || 0;
      const passengersNum = parseInt(passengers) || 1;
      const occupancyNum = parseInt(occupancy) || 1;
      
      const factors: Record<string, any> = {
        flight: {
          'short-haul': 0.246,  // Based on research: 246g CO2e per passenger-km for short flights
          'medium-haul': 0.178, // Medium-haul flights (1-3 hours)
          'long-haul': 0.150    // Long-haul flights more efficient per km
        },
        car: {
          'small-petrol': 0.142,
          'medium-petrol': 0.192,
          'large-petrol': 0.257,
          'small-diesel': 0.133,
          'medium-diesel': 0.171,
          'large-diesel': 0.209,
          'hybrid': 0.109,
          'electric': 0.053     
        },
        bus: {
          'local-bus': 0.089,   
          'coach': 0.027        
        },
        ship: {
          'ferry': 0.023,      
          'cruise': 0.250       
        },
        train: {
          'electric': 0.041,    // Electric trains
          'diesel': 0.081       // Diesel trains
        }
      };
      
      let emissionFactor = 0;
      let details = '';
      
      switch (transportType) {
        case 'flight':
          emissionFactor = factors.flight[flightType];
          details = `${flightType} flight`;
          break;
        case 'car':
          emissionFactor = factors.car[carType] / occupancyNum; 
          details = `${carType} car with ${occupancyNum} occupant(s)`;
          break;
        case 'bus':
          emissionFactor = factors.bus['coach'];
          details = 'coach/long-distance bus';
          break;
        case 'ship':
          emissionFactor = factors.ship['ferry'];
          details = 'ferry';
          break;
        case 'train':
          emissionFactor = factors.train['electric'];
          details = 'electric train';
          break;
      }
      
      const totalEmissions = distanceNum * emissionFactor * passengersNum;
      
      const finalEmissions = transportType === 'flight' ? totalEmissions * 2.0 : totalEmissions;
      
      setResult(finalEmissions);
      
      

      // Using conservative estimate: 1 tree absorbs 22kg CO2/year over 20 years
      const treesPerYear = Math.ceil(finalEmissions / 22);
      setTreesNeeded(treesPerYear);
      
      // Set detailed results
      setDetailedResults({
        emissionFactor: emissionFactor,
        baseEmissions: totalEmissions,
        radiativeForcingApplied: transportType === 'flight',
        details: details,
        perPassengerEmissions: finalEmissions / passengersNum
      });
      setIsCalculating(false);
    }, 500); // Brief delay
  };
  
  const resetCalculator = () => {
    setTransportType('flight');
    setFlightType('long-haul');
    setDistance('');
    setPassengers('1');
    setCarType('medium-petrol');
    setOccupancy('1');
    setResult(null);
    setTreesNeeded(null);
    setDetailedResults(null);
    setErrors({});
    setIsCalculating(false);
  };

  const getTransportSpecificFields = () => {
    switch (transportType) {
      case 'flight':
        return (
          <div className="grid gap-2">
            <Label htmlFor="flight-type">Flight Type</Label>
            <Select value={flightType} onValueChange={setFlightType}>
              <SelectTrigger>
                <SelectValue placeholder="Select flight type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short-haul">Short-haul (under 1,500km)</SelectItem>
                <SelectItem value="medium-haul">Medium-haul (1,500-4,000km)</SelectItem>
                <SelectItem value="long-haul">Long-haul (over 4,000km)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 'car':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="car-type">Car Type</Label>
              <Select value={carType} onValueChange={setCarType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select car type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small-petrol">Small Petrol Car</SelectItem>
                  <SelectItem value="medium-petrol">Medium Petrol Car</SelectItem>
                  <SelectItem value="large-petrol">Large Petrol Car</SelectItem>
                  <SelectItem value="small-diesel">Small Diesel Car</SelectItem>
                  <SelectItem value="medium-diesel">Medium Diesel Car</SelectItem>
                  <SelectItem value="large-diesel">Large Diesel Car</SelectItem>
                  <SelectItem value="hybrid">Hybrid Car</SelectItem>
                  <SelectItem value="electric">Electric Car</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="occupancy">Car Occupancy</Label>
              <Input 
                id="occupancy" 
                type="number" 
                value={occupancy} 
                onChange={(e) => setOccupancy(e.target.value)} 
                min="1"
                max="7"
                placeholder="Number of people in car" 
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleOffsetClick = () => {
    navigate('/environment/donate');
  };

  const handleDemoSubmit = () => {
    const validation: { [key: string]: string } = {};
    if (!demoCompanyName.trim()) validation.companyName = 'Company name is required.';
    if (!demoKeySoftwareNeeds.trim()) validation.keySoftwareNeeds = 'Please describe your software needs.';
    setDemoErrors(validation);

    if (Object.keys(validation).length > 0) {
      setDemoSuccessMessage('');
      return;
    }

    setDemoSuccessMessage('Thank you! Your demo request has been captured. We will reach out shortly.');
    setDemoCompanyName('');
    setDemoBusinessType('DMC');
    setDemoGeographicFocus('Africa');
    setDemoKeySoftwareNeeds('');
    setDemoErrors({});
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Enhanced Carbon Footprint Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your travel emissions using scientifically-backed emission factors and offset your impact
          </p>
        </div>

        <section className="mb-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">B2B audience</p>
            <h2 className="text-3xl font-semibold mt-3">Built for DMCs, OTAs, Hotels and DMOs</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mt-3">
              Incoming Agencies, Tour Operators, Hospitality Businesses and Destination Management Organizations rely on our modular platform to automate bookings, optimize inventory, scale global distribution and embed sustainability across every operation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 mb-4">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Incoming Agencies (DMC)</h3>
              <p className="mt-3 text-slate-600">
                Automate inventory, transfers and confirmations while giving partners live access to your offers across markets.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 mb-4">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Tour Operators</h3>
              <p className="mt-3 text-slate-600">
                Deliver real-time global distribution, automate bookings and keep tour packages live across channels without the usual fragmentation.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 mb-4">
                <Building className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Hospitality Businesses</h3>
              <p className="mt-3 text-slate-600">
                Manage rates, availability and reservations from one dashboard, while tracking sustainability progress for guest offers and packages.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 mb-4">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Destination Management Organizations</h3>
              <p className="mt-3 text-slate-600">
                Share live availability, optimize inventory and generate integrated sustainability reports that prove impact across regions.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Modular Solutions</p>
            <h2 className="text-3xl font-semibold mt-3">Modular software modules for global tourism scale</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mt-3">
              Don’t buy one big website. Choose software modules built for inventory, booking automation, distribution, sustainability reporting and seamless integration.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <ServerCog className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Dirt Trails Booking Engine</h3>
              <p className="mt-3 text-slate-600">
                Automate reservations, confirmations and flexible pricing for partners, packages and dynamic inventory.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <Globe2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Global Inventory & Distribution System</h3>
              <p className="mt-3 text-slate-600">
                Publish availability worldwide with real-time channel sync across OTAs, agents and destination platforms.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Integrated Sustainability & Impact Reporting</h3>
              <p className="mt-3 text-slate-600">
                Track ESG outcomes, carbon data and community impact in one unified reporting dashboard.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <Plug className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">API Integration Services</h3>
              <p className="mt-3 text-slate-600">
                Connect your existing systems with secure APIs for bookings, inventory management and sustainability data exchange.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Technical & sustainable advantage</p>
            <h2 className="text-3xl font-semibold mt-3">Optimized, connected and sustainability-first technology</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mt-3">
              Our platform is built for global connectivity, modular scalability and embedded sustainability — not as an add-on, but as the foundation of every solution.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <Globe2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Global Connectivity</h3>
              <p className="mt-3 text-slate-600">
                Connect partners, agents and distribution channels across borders with live availability and centralized pricing.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <ServerCog className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Customizable Modular System</h3>
              <p className="mt-3 text-slate-600">
                Compose the exact technology stack you need with modular building blocks that adapt to your business model.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Secure & Robust Architecture</h3>
              <p className="mt-3 text-slate-600">
                Rely on resilient infrastructure built for enterprise-scale bookings, distribution and data protection.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <TreeDeciduous className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Embedded Sustainability & Responsible Tourism Tools</h3>
              <p className="mt-3 text-slate-600">
                Embed carbon, community and conservation metrics directly into your operations to promote responsible growth.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Trusted partners & global impact</p>
            <h2 className="text-3xl font-semibold mt-3">Partnering with international tourism, conservation and technology leaders</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mt-3">
              We work with international tourism organizations, global conservation bodies and technology incubators to scale responsible tourism across Africa and beyond.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">International Tourism Organizations</h3>
              <p className="mt-3 text-slate-600">
                Strengthen destination partnerships and unlock scalable distribution with trusted tourism networks.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Global Conservation Bodies</h3>
              <p className="mt-3 text-slate-600">
                Embed conservation and climate action into bookings, reporting and operational decision-making.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Technology Incubators</h3>
              <p className="mt-3 text-slate-600">
                Collaborate with innovation partners to deliver scalable travel tech and sustainability-first solutions.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="mb-6 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Our global figures</p>
              <h3 className="text-2xl font-semibold mt-3">Data-driven proof of our platform’s global effectiveness</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                  <Globe2 className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold text-slate-900">1,200+</p>
                <p className="mt-2 text-sm text-slate-600">Businesses Empowered Globally</p>
              </div>

              <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                  <ServerCog className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold text-slate-900">8M+</p>
                <p className="mt-2 text-sm text-slate-600">Bookings Processed</p>
              </div>

              <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                  <TreeDeciduous className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold text-slate-900">120K+</p>
                <p className="mt-2 text-sm text-slate-600">Carbon Offset Tons</p>
              </div>

              <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white mb-4">
                  <Leaf className="h-5 w-5" />
                </div>
                <p className="text-3xl font-bold text-slate-900">500K+</p>
                <p className="mt-2 text-sm text-slate-600">Trees Tracked via Our Platform</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader className="bg-green-50 rounded-t-lg">
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-green-600" />
                Calculate My Travel Emissions
              </CardTitle>
              <CardDescription>
                Enter your travel details for accurate carbon footprint calculation
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="transport-type">Mode of Transport</Label>
                  <Select value={transportType} onValueChange={setTransportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transport type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flight">
                        <div className="flex items-center">
                          <Plane className="mr-2 h-4 w-4" />
                          Flight
                        </div>
                      </SelectItem>
                      <SelectItem value="car">
                        <div className="flex items-center">
                          <Car className="mr-2 h-4 w-4" />
                          Car
                        </div>
                      </SelectItem>
                      <SelectItem value="bus">
                        <div className="flex items-center">
                          <Bus className="mr-2 h-4 w-4" />
                          Bus/Coach
                        </div>
                      </SelectItem>
                      <SelectItem value="ship">
                        <div className="flex items-center">
                          <Ship className="mr-2 h-4 w-4" />
                          Ferry
                        </div>
                      </SelectItem>
                      <SelectItem value="train">
                        <div className="flex items-center">
                          <Train className="mr-2 h-4 w-4" />
                          Train
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {getTransportSpecificFields()}

                <div className="grid gap-2">
                  <Label htmlFor="distance">Distance (kilometers)</Label>
                  <Input 
                    id="distance" 
                    type="number" 
                    value={distance} 
                    onChange={(e) => setDistance(e.target.value)} 
                    placeholder="Enter distance in kilometers" 
                    aria-describedby="distance-error"
                  />
                  {errors.distance && <p id="distance-error" className="text-red-600 text-sm">{errors.distance}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Input 
                    id="passengers" 
                    type="number" 
                    value={passengers} 
                    onChange={(e) => setPassengers(e.target.value)} 
                    min="1"
                    placeholder="Number of people traveling" 
                    aria-describedby="passengers-error"
                  />
                  {errors.passengers && <p id="passengers-error" className="text-red-600 text-sm">{errors.passengers}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button onClick={calculateOffset} className="flex-1" disabled={isCalculating || !distance || !passengers}>
                {isCalculating ? 'Calculating...' : 'Calculate Carbon Footprint'}
              </Button>
              <Button onClick={resetCalculator} variant="outline">Reset</Button>
            </CardFooter>
          </Card>
          
          {result !== null && (
            <Card className="border-green-200">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-green-600" />
                  Your Carbon Footprint Results
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-lg font-medium">Total Carbon Footprint:</p>
                    <p className="text-3xl font-bold text-green-600">{result.toFixed(2)} kg CO₂e</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {detailedResults?.perPassengerEmissions.toFixed(2)} kg CO₂e per passenger
                    </p>
                  </div>
                  
                  {detailedResults && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <Info className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium">Calculation Details:</p>
                          <p>Transport: {detailedResults.details}</p>
                          <p>Emission factor: {detailedResults.emissionFactor.toFixed(3)} kg CO₂/km/person</p>
                          {detailedResults.radiativeForcingApplied && (
                            <p className="text-orange-600">
                              * Includes 2x radiative forcing multiplier for aviation high-altitude effects
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Tree Offset Estimate:</strong> Approximately <span className="font-bold text-green-600">{treesNeeded}</span> trees 
                      needed to absorb this amount of CO₂ over one year.
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      * Based on average tree absorption of 22kg CO₂ per year
                    </p>
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <Button onClick={handleOffsetClick} className="bg-green-600 hover:bg-green-700" title="Proceed to offset your emissions">
                      Offset Your Carbon Footprint
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Our Carbon Calculation Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Emission Factors Used:</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Flights:</strong> 150-246g CO₂e/km (varies by distance)</li>
                  <li>• <strong>Cars:</strong> 53-257g CO₂e/km (varies by fuel type)</li>
                  <li>• <strong>Buses:</strong> 27-89g CO₂e/km (coach vs local)</li>
                  <li>• <strong>Ferries:</strong> 23g CO₂e/km per passenger</li>
                  <li>• <strong>Trains:</strong> 41-81g CO₂e/km (electric vs diesel)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Aviation includes radiative forcing effects (2x multiplier)</li>
                  <li>• Car emissions adjusted for occupancy</li>
                  <li>• Based on latest scientific research and government data</li>
                  <li>• Accounts for different vehicle types and fuel sources</li>
                  <li>• Tree offset calculations based on realistic absorption rates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="mb-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Request a demo</p>
            <h2 className="text-3xl font-semibold mt-3">Book a demo tailored to your tourism business</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mt-3">
              Share your company details and software priorities, and our team will design the right solution for your organization.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={demoCompanyName}
                  onChange={(e) => setDemoCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                />
                {demoErrors.companyName && <p className="text-red-600 text-sm mt-1">{demoErrors.companyName}</p>}
              </div>

              <div>
                <Label htmlFor="business-type">Business Type</Label>
                <Select value={demoBusinessType} onValueChange={setDemoBusinessType}>
                  <SelectTrigger id="business-type">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DMC">DMC</SelectItem>
                    <SelectItem value="OTA">OTA</SelectItem>
                    <SelectItem value="Hotel">Hotel</SelectItem>
                    <SelectItem value="DMO">DMO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="geographic-focus">Geographic Focus</Label>
                <Select value={demoGeographicFocus} onValueChange={setDemoGeographicFocus}>
                  <SelectTrigger id="geographic-focus">
                    <SelectValue placeholder="Select geographic focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Africa">Africa</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Global">Global</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Americas">Americas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="software-needs">Key Software Needs</Label>
                <Textarea
                  id="software-needs"
                  value={demoKeySoftwareNeeds}
                  onChange={(e) => setDemoKeySoftwareNeeds(e.target.value)}
                  rows={6}
                  placeholder="e.g. Booking Engine, Sustainability Reporting"
                />
                {demoErrors.keySoftwareNeeds && <p className="text-red-600 text-sm mt-1">{demoErrors.keySoftwareNeeds}</p>}
              </div>

              {demoSuccessMessage && (
                <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
                  {demoSuccessMessage}
                </div>
              )}

              <div className="flex items-end justify-end">
                <Button
                  className="bg-[#2ECC71] text-white hover:bg-[#28b765] border-none"
                  onClick={handleDemoSubmit}
                >
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CarbonOffsetCalculator;