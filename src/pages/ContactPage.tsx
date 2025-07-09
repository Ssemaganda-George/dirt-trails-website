
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    setFormSubmitted(true);
    // Reset form fields if needed
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-safari-brown/10">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Have questions about our tours or need help planning your East African adventure? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                  <p>Your message has been submitted. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block mb-2 font-medium">First Name</label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-2 font-medium">Last Name</label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">Phone Number</label>
                    <Input id="phone" name="phone" />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block mb-2 font-medium">I'm Interested In</label>
                    <Select name="interest">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safari">Safari Tours</SelectItem>
                        <SelectItem value="gorilla">Gorilla Trekking</SelectItem>
                        <SelectItem value="beach">Beach Extensions</SelectItem>
                        <SelectItem value="custom">Custom Itinerary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Your Message</label>
                    <Textarea id="message" name="message" rows={5} required />
                  </div>
                  <Button type="submit" size="lg" className="w-full">Send Message</Button>
                </form>
              )}
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex">
                    <MapPin className="h-6 w-6 text-safari-orange mr-4 shrink-0" />
                    <div>
                      <h3 className="font-medium">Our Office</h3>
                      <address className="not-italic text-muted-foreground">
                      MIICHub, Makerere University 
                      <br />
                        Kampala, Uganda
                      </address>
                    </div>
                  </div>
                  <div className="flex">
                    <Phone className="h-6 w-6 text-safari-orange mr-4 shrink-0" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+256 759 918649</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Mail className="h-6 w-6 text-safari-orange mr-4 shrink-0" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">safaris.dirttrails@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex">
                    <Clock className="h-6 w-6 text-safari-orange mr-4 shrink-0" />
                    <div>
                      <h3 className="font-medium">Office Hours</h3>
                      <p className="text-muted-foreground">Monday to Friday: 9AM - 6PM<br />Saturday: 9AM - 1PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-safari-green/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Emergency Contact</h3>
                <p className="text-muted-foreground mb-4">
                  For urgent matters outside of office hours, please contact our 24-hour emergency line:
                </p>
                <div className="font-medium text-lg">+256 759 918649</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-safari-brown/10">
        <div className="container">
          <h2 className="text-3xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FaqItem 
              question="What payment methods do you accept?" 
              answer="We accept credit/debit cards (Visa, MasterCard, American Express), bank transfers, and mobile money services like M-Pesa for clients in Kenya. A deposit is required to secure your booking, with the balance due 60 days before departure." 
            />
            <FaqItem 
              question="How far in advance should I book my safari?" 
              answer="We recommend booking at least 3-6 months in advance, especially if you plan to travel during peak season (June-October) or if you're interested in gorilla trekking, which requires permits that are limited and sell out quickly."
            />
            <FaqItem 
              question="What vaccinations do I need for East Africa?" 
              answer="Required and recommended vaccinations vary by country. Yellow fever vaccination is often required for entry. We recommend consulting with a travel medicine specialist for the most current health information and requirements."
            />
            <FaqItem 
              question="What's your cancellation policy?" 
              answer="Our standard cancellation policy allows for a full refund (minus administrative fees) for cancellations made more than 90 days before departure. Cancellations between 90-60 days receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations made less than 60 days prior to departure."
            />
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-medium mb-3">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
};

export default ContactPage;
