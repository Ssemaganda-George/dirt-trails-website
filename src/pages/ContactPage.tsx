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
              Vision Map inquiry
            </span>
            <div className="space-y-6">
              <h1 className="text-5xl font-serif tracking-tight sm:text-6xl">Plan your next chapter with the Dirt Trails Vision Map.</h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Our Vision Map connects market intelligence, partner operations and sustainable product design so travel teams can grow with clarity and confidence.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Roadmap speed</p>
                <p className="mt-4 text-2xl font-semibold">Within 1 business day</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Strategic support</p>
                <p className="mt-4 text-2xl font-semibold">Market-informed guidance</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Partner alignment</p>
                <p className="mt-4 text-2xl font-semibold">Operator & destination strategy</p>
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
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Vision Map inquiry</p>
                <h2 className="mt-4 text-4xl font-serif text-slate-950">Tell us about your Vision Map.</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Share your current plans, market goals and partner ambitions so we can tailor a Vision Map that strengthens your operation and supports sustainable growth.
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-3 block text-sm font-semibold text-slate-700">First Name *</label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        disabled={isSubmitting}
                        className="h-14 border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-3 block text-sm font-semibold text-slate-700">Last Name *</label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        disabled={isSubmitting}
                        className="h-14 border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-3 block text-sm font-semibold text-slate-700">Email Address *</label>
                    <Input
                      id="email"
                      name="_replyto"
                      type="email"
                      required
                      disabled={isSubmitting}
                      className="h-14 border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-3 block text-sm font-semibold text-slate-700">Phone Number</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      disabled={isSubmitting}
                      className="h-14 border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="mb-3 block text-sm font-semibold text-slate-700">Vision Map focus</label>
                    <select
                      id="interest"
                      name="interest"
                      disabled={isSubmitting}
                      className="h-14 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="">Select an option</option>
                      <option value="platform">Platform clarity</option>
                      <option value="partnership">Partnership strategy</option>
                      <option value="research">Market intelligence</option>
                      <option value="sustainability">Sustainability positioning</option>
                      <option value="operations">Operations & distribution</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-3 block text-sm font-semibold text-slate-700">Share your Vision Map details *</label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      disabled={isSubmitting}
                      placeholder="Tell us about your current product vision, target market and growth priorities."
                      className="border-slate-300 bg-slate-50 text-slate-950 focus:border-slate-900 focus:ring-slate-900 resize-none"
                    />
                  </div>

                  <input type="hidden" name="_subject" value="New Vision Map Inquiry from Website" />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-slate-950 px-8 py-4 text-white shadow-xl shadow-slate-950/20 transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      'Submit Vision Map Inquiry'
                    )}
                  </Button>
                </form>
              )}
            </div>

            <aside className="space-y-8 animate-fade-in-up">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Vision Map support</p>
                <h2 className="mt-4 text-3xl font-serif">Align strategy, product and partners.</h2>
                <p className="mt-4 text-slate-300 leading-7">
                  Our Vision Map process helps you create a clear operating plan, connect the right partners, and scale with the best market intelligence.
                </p>
                <div className="mt-8 space-y-4 rounded-[1.75rem] bg-slate-900/80 p-6 ring-1 ring-white/10">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Platform clarity</p>
                    <p className="mt-2 text-lg font-semibold text-white">One roadmap for sales, suppliers and operations.</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Partner growth</p>
                    <p className="mt-2 text-lg font-semibold text-white">Actions to support local and global distribution.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)]">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Why it matters</p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">Future-ready travel operations</h3>
                <p className="mt-3 text-slate-600 leading-7">
                  The Vision Map turns ambition into a practical plan that improves bookings, accountability and sustainability across your business.
                </p>
                <div className="mt-8 space-y-4 text-slate-700">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Market intelligence</p>
                    <p className="mt-2">Use trend data to shape pricing and distribution decisions.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Sustainability</p>
                    <p className="mt-2">Build premium products with stronger community and environmental impact.</p>
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
            Meet the Vision Map team
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
                question: "What does the Vision Map include?",
                answer: "The Vision Map includes a tailored roadmap for your platform, partner strategy, market signals, and sustainability positioning to support smarter growth."
              },
              {
                question: "Who is the Vision Map for?",
                answer: "Operators and partners who want a clear path for bookings, distribution, supplier coordination, and impact reporting. It is ideal for businesses seeking intelligent structure and premium support."
              },
              {
                question: "How quickly can I get a Vision Map proposal?",
                answer: "After we receive your inquiry, our team typically responds within one business day with next steps and a proposed scope."
              },
              {
                question: "Can the Vision Map support sustainability planning?",
                answer: "Yes. We include sustainable product positioning and impact reporting in the Vision Map so your offerings can be premium and responsible."
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