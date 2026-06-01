import { useState } from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export const InquiryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleCountryChange = (country: string, checked: boolean) => {
    if (checked) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    }
  };

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setSelectedActivities([...selectedActivities, activity]);
    } else {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Add selected countries and activities to form data
      formData.set('countries', selectedCountries.join(', '));
      formData.set('activities', selectedActivities.join(', '));

      const formspreeId = import.meta.env.VITE_FORMSPREE_INQUIRY_ID;
      
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormSubmitted(true);
        toast({
          title: 'Success!',
          description: 'Your inquiry has been submitted. We\'ll get back to you within 24 hours.',
        });
        e.currentTarget.reset();
        setSelectedCountries([]);
        setSelectedActivities([]);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your inquiry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-3xl font-bold text-green-900 mb-2">Thank You!</h2>
          <p className="text-green-700 mb-4">
            Your inquiry has been submitted successfully. Our team will review your request and contact you within 24 hours.
          </p>
          <Button 
            onClick={() => setFormSubmitted(false)}
            className="mt-6"
          >
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Travel Information Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
        <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4">Travel Information</h3>
        
        {/* Countries to visit */}
        <div className="space-y-4">
          <label className="block text-base font-medium text-gray-800">What country/countries do you want to visit? <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['kenya', 'uganda', 'tanzania'].map(country => (
              <div key={country} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Checkbox 
                  id={country} 
                  checked={selectedCountries.includes(country)}
                  onCheckedChange={(checked) => handleCountryChange(country, checked as boolean)}
                  className="w-5 h-5" 
                />
                <Label htmlFor={country} className="text-sm font-medium cursor-pointer capitalize">{country}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* What do you want to do */}
        <div className="space-y-4">
          <label className="block text-base font-medium text-gray-800">What do you want to do? <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'safari', label: 'Safari' },
              { id: 'beach', label: 'Beach holiday' },
              { id: 'climbing', label: 'Mountain climbing' },
              { id: 'gorilla', label: 'Gorilla trekking' },
              { id: 'chimpanzee', label: 'Chimpanzee trekking' },
            ].map(activity => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Checkbox 
                  id={activity.id}
                  checked={selectedActivities.includes(activity.id)}
                  onCheckedChange={(checked) => handleActivityChange(activity.id, checked as boolean)}
                  className="w-5 h-5" 
                />
                <Label htmlFor={activity.id} className="text-sm font-medium cursor-pointer">{activity.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* How many days and travel companion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label htmlFor="tripDays" className="block text-base font-medium text-gray-800">How many days do you want to travel? <span className="text-red-500">*</span></label>
            <Select name="tripDays" required>
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
            <Select name="travelCompanion" required>
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
          <Select name="budget" required>
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
            <Select name="numAdults" defaultValue="2" required>
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

      {/* Contact Information */}
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4">Your Contact Information</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-base font-medium text-gray-800">Full Name <span className="text-red-500">*</span></label>
            <Input id="name" name="name" required placeholder="John Doe" className="h-12" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-base font-medium text-gray-800">Email Address <span className="text-red-500">*</span></label>
            <Input id="email" name="_replyto" type="email" required placeholder="you@example.com" className="h-12" />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-base font-medium text-gray-800">Phone Number</label>
            <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-12" />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Inquiry'
          )}
        </Button>
      </div>
    </form>
  );
};