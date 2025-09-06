import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Plane, Car, Ship, Bus, Calculator, Info } from "lucide-react";

const CarbonOffsetCalculator = () => {
  const [transportType, setTransportType] = useState('flight');
  const [flightType, setFlightType] = useState('long-haul');
  const [distance, setDistance] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [carType, setCarType] = useState('medium-petrol');
  const [occupancy, setOccupancy] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [treesNeeded, setTreesNeeded] = useState<number | null>(null);
  const [detailedResults, setDetailedResults] = useState<any>(null);
  
  const calculateOffset = () => {
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Enhanced Carbon Footprint Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your travel emissions using scientifically-backed emission factors and offset your impact
          </p>
        </div>
        
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
                          <Car className="mr-2 h-4 w-4" />
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
                    <Button className="bg-green-600 hover:bg-green-700">
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
      </div>
    </div>
  );
};

export default CarbonOffsetCalculator;