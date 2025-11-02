import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';

interface TravelInfoFormProps {
  numberOfPeople: number;
  handleTravelersChange: (value: string) => void;
  getCurrentPricePerPerson: () => number;
  getCurrentTierLabel: () => string;
  selectedCustomizations: any;
}

export const TravelInfoForm = ({
  numberOfPeople,
  handleTravelersChange,
  getCurrentPricePerPerson,
  getCurrentTierLabel,
  selectedCustomizations
}: TravelInfoFormProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Travel Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="travelers">Number of Travelers <span className="text-red-500">*</span></Label>
          <Input
            id="travelers"
            name="travelers"
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={(e) => handleTravelersChange(e.target.value)}
            required
          />
          <p className="text-sm text-muted-foreground mt-1">
            Current pricing tier: {getCurrentTierLabel()}
          </p>
        </div>
        
        <div>
          <Label htmlFor="travelDate">Preferred Travel Date <span className="text-red-500">*</span></Label>
          <Input id="travelDate" name="travelDate" type="date" required />
        </div>
      </div>
      
      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          rows={4}
          className="w-full p-2 border rounded-md"
          placeholder="Any dietary restrictions, accessibility needs, or special requests..."
        />
      </div>
    </div>
  );
};