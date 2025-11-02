import { Calendar, Users, MapPin, DollarSign, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const InquiryForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Travel Information Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
        <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4">Travel Information</h3>
        
        {/* Countries to visit */}
        <div className="space-y-4">
          <label className="block text-base font-medium text-gray-800">What country/countries do you want to visit? <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox id="kenya" name="countries" value="kenya" className="w-5 h-5" />
              <Label htmlFor="kenya" className="text-sm font-medium cursor-pointer">Kenya</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox id="uganda" name="countries" value="uganda" className="w-5 h-5" />
              <Label htmlFor="uganda" className="text-sm font-medium cursor-pointer">Uganda</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox id="tanzania" name="countries" value="tanzania" className="w-5 h-5" />
              <Label htmlFor="tanzania" className="text-sm font-medium cursor-pointer">Tanzania</Label>
            </div>
          </div>
        </div>

        {/* What do you want to do */}
        <div className="space-y-4">
          <label className="block text-base font-medium text-gray-800">What do you want to do? <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox id="safari" name="activities" value="safari" className="w-5 h-5" />
              <Label htmlFor="safari" className="text-sm font-medium cursor-pointer">Safari</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox id="beach" name="activities" value="beach" className="w-5 h-5" />
              <Label htmlFor="beach" className="text-sm font-medium cursor-pointer">Beach holiday</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox id="climbing" name="activities" value="climbing" className="w-5 h-5" />
              <Label htmlFor="climbing" className="text-sm font-medium cursor-pointer">Mountain climbing</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox id="gorilla" name="activities" value="gorilla" className="w-5 h-5" />
              <Label htmlFor="gorilla" className="text-sm font-medium cursor-pointer">Gorilla trekking</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox id="chimpanzee" name="activities" value="chimpanzee" className="w-5 h-5" />
              <Label htmlFor="chimpanzee" className="text-sm font-medium cursor-pointer">Chimpanzee trekking</Label>
            </div>
          </div>
        </div>

        {/* How many days and travel companion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label htmlFor="tripDays" className="block text-base font-medium text-gray-800">How many days do you want to travel? <span className="text-red-500">*</span></label>
            <Select name="tripDays">
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Choose number of days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-5">3-5 days</SelectItem>
                <SelectItem value="6-9">6-9 days</SelectItem>
                <SelectItem value="10-14">10-14 days</SelectItem>
                <SelectItem value="15+">15+ days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Who are you travelling with */}
          <div className="space-y-4">
            <label htmlFor="travelCompanion" className="block text-base font-medium text-gray-800">Who are you travelling with? <span className="text-red-500">*</span></label>
            <Select name="travelCompanion">
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select travel companion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Solo (no group tours)</SelectItem>
                <SelectItem value="couple">Couple</SelectItem>
                <SelectItem value="honeymoon">Honeymoon</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="friends">Group of friends</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-4">
          <label htmlFor="budget" className="block text-base font-medium text-gray-800">Do you have a budget per person in mind? <span className="text-red-500">*</span></label>
          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-200">
            Budget EXCLUDING INTERNATIONAL FLIGHTS.
          </p>
          <Select name="budget">
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1500">{'<$1,500 per person'}</SelectItem>
              <SelectItem value="3000">$1,500 - $3,000 per person</SelectItem>
              <SelectItem value="4500">$3,000 - $4,500 per person</SelectItem>
              <SelectItem value="6000">$4,500 - $6,000 per person</SelectItem>
              <SelectItem value="6000+">$6,000+ per person</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Travellers & Age Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
        <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4">Travellers & Age</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label htmlFor="numAdults" className="block text-base font-medium text-gray-800">Choose the number of adults <span className="text-red-500">*</span></label>
            <Select name="numAdults" defaultValue="2">
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 adult</SelectItem>
                <SelectItem value="2">2 adults</SelectItem>
                <SelectItem value="3">3 adults</SelectItem>
                <SelectItem value="4">4 adults</SelectItem>
                <SelectItem value="5">5 adults</SelectItem>
                <SelectItem value="6">6+ adults</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <label htmlFor="numChildren" className="block text-base font-medium text-gray-800">Choose the number of children</label>
            <Select name="numChildren" defaultValue="0">
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 children</SelectItem>
                <SelectItem value="1">1 child</SelectItem>
                <SelectItem value="2">2 children</SelectItem>
                <SelectItem value="3">3 children</SelectItem>
                <SelectItem value="4">4+ children</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Travel Date */}
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4">When do you want to travel?</h3>
        <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border-l-4 border-green-200">
          Select a date. You can always change it later on, if you are not sure.
        </p>
        <div className="max-w-md space-y-4">
          <label htmlFor="travelDate" className="flex items-center gap-3 text-base font-medium text-gray-800">
            <Calendar size={20} className="text-blue-600" />
            Choose an arrival date <span className="text-red-500">*</span>
          </label>
          <Input id="travelDate" name="travelDate" type="date" required className="h-12 text-base" />
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <label htmlFor="specialRequests" className="block text-base font-medium text-gray-800">
          Anything else you'd like to share with us?
        </label>
        <p className="text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-200 leading-relaxed">
          For example: If you want to combine safari and beach, would you prefer to do a long safari and a short beach holiday, or the contrary? Do you want a specific room type? Which national parks or animals would really want to see? Please share with us anything we should know to make this trip unforgettable!
        </p>
        <textarea 
          id="specialRequests" 
          name="specialRequests" 
          rows={8} 
          className="w-full border border-gray-300 rounded-lg p-4 text-base leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          placeholder="Please share with us anything we should know to make this trip unforgettable!"
        ></textarea>
      </div>

      
    </div>
  );
};