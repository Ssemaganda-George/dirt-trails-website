import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://formspree.io/f/xpwjoknq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormSubmitted(true);
        toast({
          title: 'Message Sent',
          description: "Your message has been sent successfully. We'll get back to you within 24 hours.",
        });
        e.currentTarget.reset(); // Reset form after successful submission
      } else {
        throw new Error('Failed to send message');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError('Failed to send message. Please try again or contact us directly.');
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-safari-brown/10">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Leave a Message</h1>
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
                  <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                  <Button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmitError(null);
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                      <p>{submitError}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block mb-2 font-medium">First Name *</label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        required 
                        disabled={isSubmitting} 
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-2 font-medium">Last Name *</label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        required 
                        disabled={isSubmitting} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email Address *</label>
                    <Input 
                      id="email" 
                      name="_replyto" 
                      type="email" 
                      required 
                      disabled={isSubmitting} 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">Phone Number</label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      disabled={isSubmitting} 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interest" className="block mb-2 font-medium">I'm Interested In</label>
                    <select 
                      name="interest" 
                      disabled={isSubmitting}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select an option</option>
                      <option value="safari">Safari Tours</option>
                      <option value="gorilla">Gorilla Trekking</option>
                      <option value="beach">Beach Extensions</option>
                      <option value="custom">Custom Itinerary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Your Message *</label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      required 
                      disabled={isSubmitting}
                      placeholder="Tell us about your dream safari, preferred dates, group size, or any specific requirements..."
                    />
                  </div>

                  {/* Hidden field for subject line */}
                  <input 
                    type="hidden" 
                    name="_subject" 
                    value="New Safari Inquiry from Website"
                  />
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
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

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-semibold mb-8 text-center">Find Our Office</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3989.751207514449!2d32.5678668!3d0.3323261!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb91e1a6c939%3A0x38793a83feb972e9!2sMakerere%20Innovation%20and%20Incubation%20Center!5e0!3m2!1sen!2sug!"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MIICHub, Makerere University Location"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Visit Our Office</h3>
                    <p className="text-muted-foreground">
                      MIICHub, Makerere University, Kampala, Uganda
                    </p>
                  </div>
                  <div>
                    <a 
                      href="https://maps.app.goo.gl/9HwmBKsXjgLv9AKo7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-safari-orange text-white rounded-md hover:bg-safari-orange/90 transition-colors"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Open in Maps
                    </a>
                  </div>
                </div>
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