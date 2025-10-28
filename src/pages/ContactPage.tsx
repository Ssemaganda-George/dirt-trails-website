import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section - Professional Single Color */}
      <section className="relative py-24 bg-safari-green text-white overflow-hidden">
        <div className="container relative">
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Contact Us
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl leading-relaxed">
              Have questions about our tours or need help planning your East African adventure? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info - Professional */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-8 text-gray-900">
                Send Us a Message
              </h2>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
                  <p className="text-lg mb-6">Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                  <Button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmitError(null);
                    }}
                    variant="outline"
                    className="border-safari-green text-safari-green hover:bg-safari-green hover:text-white transition-all duration-300"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-200">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                      <p>{submitError}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block mb-3 font-semibold text-gray-700">First Name *</label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        required 
                        disabled={isSubmitting}
                        className="h-12 border-gray-300 focus:border-safari-green focus:ring-safari-green"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-3 font-semibold text-gray-700">Last Name *</label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        required 
                        disabled={isSubmitting}
                        className="h-12 border-gray-300 focus:border-safari-green focus:ring-safari-green"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-3 font-semibold text-gray-700">Email Address *</label>
                    <Input 
                      id="email" 
                      name="_replyto" 
                      type="email" 
                      required 
                      disabled={isSubmitting}
                      className="h-12 border-gray-300 focus:border-safari-green focus:ring-safari-green"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-3 font-semibold text-gray-700">Phone Number</label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      disabled={isSubmitting}
                      className="h-12 border-gray-300 focus:border-safari-green focus:ring-safari-green"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interest" className="block mb-3 font-semibold text-gray-700">I'm Interested In</label>
                    <select 
                      name="interest" 
                      disabled={isSubmitting}
                      className="flex h-12 w-full rounded-md border border-gray-300 bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-safari-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select an option</option>
                      <option value="Consultancy">Conservation Consultancy</option>
                      <option value="safari">Safari Tours</option>
                      <option value="gorilla">Gorilla Trekking</option>
                      <option value="custom">Custom Itinerary</option> 
                      <option value="Collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-3 font-semibold text-gray-700">Your Message *</label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      rows={6} 
                      required 
                      disabled={isSubmitting}
                      placeholder="Tell us about your dream safari, preferred dates, group size, or any specific requirements..."
                      className="border-gray-300 focus:border-safari-green focus:ring-safari-green resize-none"
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
                    className="w-full h-12 bg-safari-green hover:bg-safari-green/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              )}
            </div>
            
            {/* Contact Information - Professional */}
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-8 text-gray-900">
                Get In Touch
              </h2>
              <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-start hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
                    <MapPin className="h-8 w-8 text-safari-green mr-6 shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">Our Office</h3>
                      <address className="not-italic text-gray-600 leading-relaxed">
                        MIICHub, Makerere University 
                        <br />
                        Kampala, Uganda
                      </address>
                    </div>
                  </div>
                  <div className="flex items-start hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
                    <Phone className="h-8 w-8 text-safari-green mr-6 shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">Phone</h3>
                      <p className="text-gray-600 text-lg">+256 759 918649</p>
                    </div>
                  </div>
                  <div className="flex items-start hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
                    <Mail className="h-8 w-8 text-safari-green mr-6 shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">Email</h3>
                      <p className="text-gray-600 text-lg">safaris.dirttrails@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
                    <Clock className="h-8 w-8 text-safari-green mr-6 shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">Office Hours</h3>
                      <p className="text-gray-600 leading-relaxed">Monday to Friday: 9AM - 6PM<br />Saturday: 9AM - 1PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-safari-green/5 rounded-2xl p-8 border border-safari-green/20">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Emergency Contact</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  For urgent matters outside of office hours, please contact our 24-hour emergency line:
                </p>
                <div className="font-bold text-xl text-safari-green">+256 759 918649</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Professional */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Find Our Office
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
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
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-gray-900">Visit Our Office</h3>
                    <p className="text-gray-600 leading-relaxed">
                      MIICHub, Makerere University, Kampala, Uganda
                    </p>
                  </div>
                  <div>
                    <a 
                      href="https://maps.app.goo.gl/9HwmBKsXjgLv9AKo7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-safari-green text-white rounded-lg hover:bg-safari-green/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Professional */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "What payment methods do you accept?",
                answer: "We accept credit/debit cards (Visa, MasterCard, American Express), bank transfers, and mobile money services like M-Pesa for clients in Kenya. A deposit is required to secure your booking, with the balance due 60 days before departure."
              },
              {
                question: "How far in advance should I book my safari?",
                answer: "We recommend booking at least 3-6 months in advance, especially if you plan to travel during peak season (June-October) or if you're interested in gorilla trekking, which requires permits that are limited and sell out quickly."
              },
              {
                question: "What vaccinations do I need for East Africa?",
                answer: "Required and recommended vaccinations vary by country. Yellow fever vaccination is often required for entry. We recommend consulting with a travel medicine specialist for the most current health information and requirements."
              },
              {
                question: "What's your cancellation policy?",
                answer: "Our standard cancellation policy allows for a full refund (minus administrative fees) for cancellations made more than 90 days before departure. Cancellations between 90-60 days receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations made less than 60 days prior to departure."
              }
            ].map((faq, index) => (
              <FaqItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isExpanded={expandedFaq === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

// FAQ Item Component - Professional
const FaqItem = ({ question, answer, isExpanded, onToggle }: { question: string; answer: string; isExpanded: boolean; onToggle: () => void }) => {
  return (
    <div className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-8 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
      >
        <h3 className="text-xl font-semibold text-gray-900 pr-4">{question}</h3>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-safari-green shrink-0" />
        ) : (
          <ChevronDown className="h-6 w-6 text-safari-green shrink-0" />
        )}
      </button>
      {isExpanded && (
        <div className="px-8 pb-8">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default ContactPage;