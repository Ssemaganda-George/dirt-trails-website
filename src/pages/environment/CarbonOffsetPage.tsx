
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Plane, Car, Ship, Bus, Calculator } from "lucide-react";
import { Link } from 'react-router-dom';

const CarbonOffsetPage = () => {
  const [transportType, setTransportType] = useState('flight');
  const [distance, setDistance] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [treesNeeded, setTreesNeeded] = useState<number | null>(null);
  
  const calculateOffset = () => {
    const distanceNum = parseFloat(distance) || 0;
    const passengersNum = parseInt(passengers) || 1;
    
    // Carbon emission factors (kg CO2 per km per person)
    const factors: Record<string, number> = {
      flight: 0.255, // Long-haul flight
      car: 0.17,     // Medium car, petrol
      bus: 0.027,    // Coach
      ship: 0.019    // Ferry
    };
    
    // Calculate emissions
    const emissions = distanceNum * factors[transportType] * passengersNum;
    setResult(emissions);
    
    // Estimate trees needed (rough calculation: 1 tree absorbs ~22kg of CO2 per year)
    setTreesNeeded(Math.ceil(emissions / 22));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Carbon Footprint Calculator</h1>
          <p className="text-muted-foreground">
            Understand the environmental impact of your journey and discover how you can offset it
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="bg-safari-green/10 rounded-t-lg">
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-safari-green" />
              Calculate Your Travel Emissions
            </CardTitle>
            <CardDescription>
              Estimate the carbon footprint of your East African adventure
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6">
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
                        Bus
                      </div>
                    </SelectItem>
                    <SelectItem value="ship">
                      <div className="flex items-center">
                        <Ship className="mr-2 h-4 w-4" />
                        Ship/Ferry
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="distance">Distance (kilometers)</Label>
                <Input 
                  id="distance" 
                  type="number" 
                  value={distance} 
                  onChange={(e) => setDistance(e.target.value)} 
                  placeholder="Enter distance in kilometers" 
                />
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
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={calculateOffset} className="w-full">Calculate Carbon Footprint</Button>
          </CardFooter>
        </Card>
        
        {result !== null && (
          <Card className="mb-8 border-safari-green/20">
            <CardHeader className="bg-safari-green/10 rounded-t-lg">
              <CardTitle className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-safari-green" />
                Your Carbon Footprint Results
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-lg font-medium">Your estimated carbon footprint:</p>
                  <p className="text-4xl font-bold text-safari-green">{result.toFixed(2)} kg CO₂e</p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm">
                    Based on your travel details, we estimate you would need approximately <span className="font-bold">{treesNeeded}</span> trees 
                    to offset your carbon emissions over one year.
                  </p>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button asChild>
                    <Link to="/environment/tree-planting">Offset Your Carbon Footprint</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="bg-muted/30 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">About Carbon Offsetting</h3>
          <p className="mb-4">
            Carbon offsetting is the process of compensating for your carbon emissions by funding projects that reduce 
            an equivalent amount of greenhouse gases from the atmosphere.
          </p>
          <p>
            At East Africa Tours, we partner with local conservation organizations to plant native trees in East Africa, 
            supporting both environmental restoration and community development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonOffsetPage;
