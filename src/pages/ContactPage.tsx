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
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.2),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_30%)]" />
        <div className="relative container mx-auto max-w-7xl px-4 py-24 sm:py-28">
          <div className="max-w-3xl space-y-8">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Contact our travel intelligence team
            </span>
            <div className="space-y-6">
              <h1 className="text-5xl font-serif tracking-tight sm:text-6xl">Talk to Dirt Trails about your next launch.</h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                We help operators, partners and destination teams connect bookings, distribution, sustainability and market intelligence through a premium travel technology experience.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Fast response</p>
                <p className="mt-4 text-2xl font-semibold">Within 1 business day</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Expert support</p>
                <p className="mt-4 text-2xl font-semibold">Travel tech guidance</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Partner enablement</p>
                <p className="mt-4 text-2xl font-semibold">Operator & supplier support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="animate-fade-in-up rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
              <div className="mb-10 max-w-2xl">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Request a demo</p>
                <h2 className="mt-4 text-4xl font-serif text-slate-950">Request a demo tailored to your business.</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Share your company details, platform priorities and collaboration interests. Our team will respond with clear next steps for product demos and partner support.
                </p>
              </div>

              {formSubmitted ? (
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-slate-950">Thank you</h3>
                  <p className="mt-4 text-slate-600 leading-7">
                    Your request has been submitted. Our team will review it and respond within one business day.
                  </p>
                  <Button
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmitError(null);
                    }}
                    variant="outline"
                    className="mt-8 rounded-full border-slate-300 text-slate-950 hover:bg-slate-950 hover:text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="businessType" className="mb-3 block text-sm font-semibold text-slate-700">Business Type *</label>
                      <select
                        id="businessType"
                        name="businessType"
                        required
                        disabled={isSubmitting}
                        className="h-14 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value="">Select business type</option>
                        <option value="DMC">DMC</option>
                        <option value="OTA">OTA</option>
                        <option value="Hotel">Hotel</option>
                        <option value="DMO">DMO</option>
                        <option value="Supplier">Supplier</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-slate-700">First Name *</label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        disabled={isSubmitting}
                        className="h-14 rounded-xl border border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-slate-700">Last Name *</label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        disabled={isSubmitting}
                        className="h-14 rounded-xl border border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="companyName" className="mb-2 block text-sm font-semibold text-slate-700">Company Name *</label>
                      <Input
                        id="companyName"
                        name="companyName"
                        required
                        disabled={isSubmitting}
                        className="h-14 rounded-xl border border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email Address *</label>
                      <Input
                        id="email"
                        name="_replyto"
                        type="email"
                        required
                        disabled={isSubmitting}
                        className="h-14 rounded-xl border border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="mb-2 block text-sm font-semibold text-slate-700">Country *</label>
                      <Input
                        id="country"
                        name="country"
                        type="text"
                        required
                        disabled={isSubmitting}
                        placeholder="e.g. Kenya, Uganda, United Kingdom"
                        className="h-14 rounded-xl border border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">Phone Number</label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        disabled={isSubmitting}
                        className="h-14 rounded-xl border border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="mb-2 block text-sm font-semibold text-slate-700">Website</label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        disabled={isSubmitting}
                        placeholder="https://"
                        className="h-14 rounded-xl border border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="interest" className="mb-2 block text-sm font-semibold text-slate-700">What are you interested in? *</label>
                      <select
                        id="interest"
                        name="interest"
                        required
                        disabled={isSubmitting}
                        className="h-14 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value="">Select an option</option>
                        <option value="platform">Platform implementation</option>
                        <option value="partnership">Partnership collaboration</option>
                        <option value="research">Research support</option>
                        <option value="sustainability">Sustainability enablement</option>
                        <option value="operations">Operations improvement</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">Comments *</label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      disabled={isSubmitting}
                      placeholder="Share your project scope, audience, timeline or platform priorities."
                      className="min-h-[160px] rounded-xl border border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900 resize-none"
                    />
                  </div>

                  <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className="flex items-start gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        id="privacyConsent"
                        name="privacyConsent"
                        required
                        disabled={isSubmitting}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-900"
                      />
                      <span className="text-slate-700 leading-relaxed">
                        I have read and accept the <a href="/privacy" className="text-slate-950 underline">Privacy Policy</a> and agree to submit my data for this inquiry.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        id="receivePromotions"
                        name="receivePromotions"
                        disabled={isSubmitting}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-900"
                      />
                      <span>Yes, I agree to receive promotions, product news and updates.</span>
                    </label>
                  </div>

                  <input type="hidden" name="_subject" value="New Demo Request from Website" />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-slate-950 px-6 py-3 text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      'Request a Demo'
                    )}
                  </Button>
                </form>
              )}
            </div>

            <aside className="space-y-8 animate-fade-in-up">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Priority contact</p>
                <h2 className="mt-4 text-3xl font-serif">Expert guidance for travel teams.</h2>
                <p className="mt-4 text-slate-300 leading-7">
                  Our specialists support operators, suppliers and partners with platform, distribution and sustainability expertise.
                </p>
                <div className="mt-8 space-y-4 rounded-[1.75rem] bg-slate-900/80 p-6 ring-1 ring-white/10">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Platform clarity</p>
                    <p className="mt-2 text-lg font-semibold text-white">Connect bookings, inventory and partner workflows.</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Partner enablement</p>
                    <p className="mt-2 text-lg font-semibold text-white">Support for operators and destination collaborators.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)]">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Why it matters</p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">Stronger bookings, clearer operations</h3>
                <p className="mt-3 text-slate-600 leading-7">
                  We help travel businesses use data, supply networks and partner workflows to launch more confidently and manage growth reliably.
                </p>
                <div className="mt-8 space-y-4 text-slate-700">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Market intelligence</p>
                    <p className="mt-2">Use trend data to shape pricing and distribution decisions.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Sustainability</p>
                    <p className="mt-2">Build premium products with responsible travel outcomes.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="py-12 sm:py-20 bg-slate-50">
        <div className="container max-w-7xl">
          <h2 className="text-4xl font-serif mb-12 text-center text-slate-950">
            Visit our Kampala office
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
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
                <div className="flex items-center justify-between flex-col gap-6 lg:flex-row">
                  <div>
                    <h3 className="text-2xl font-serif mb-2 text-slate-950">Visit Our Office</h3>
                    <p className="text-slate-600 leading-relaxed">
                      MIICHub, Makerere University, Kampala, Uganda
                    </p>
                  </div>
                  <div>
                    <a 
                      href="https://maps.app.goo.gl/9HwmBKsXjgLv9AKo7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl"
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
      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container max-w-7xl">
          <h2 className="text-4xl font-serif mb-12 text-center text-slate-950">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "How can Dirt Trails help my travel business grow?",
                answer: "We help operators and partners scale bookings, connect supplier workflows, and apply market intelligence so operations become more efficient and more profitable."
              },
              {
                question: "Can you integrate with our current systems?",
                answer: "Yes. We support API integrations, channel management workflows and partner feeds to connect with your existing booking and supplier systems."
              },
              {
                question: "What type of partnership support is available?",
                answer: "We offer onboarding, technical enablement, partner coordination and ongoing account support to help you build reliable supplier networks and distribution channels."
              },
              {
                question: "Do you help with sustainability and impact reporting?",
                answer: "Yes. Our platform captures sustainability metrics and responsible travel outcomes in bookings, making it easier to report on impact and position premium products."
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