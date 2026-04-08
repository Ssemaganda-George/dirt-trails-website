import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    <div className="bg-slate-50 text-slate-900">
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[2rem] bg-slate-950 p-12 text-white shadow-xl border border-white/10">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Contact our travel intelligence team
            </span>
            <h1 className="mt-8 text-4xl font-serif tracking-tight sm:text-5xl">
              Talk to Dirt Trails about your next launch.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              We help operators, partners and destination teams connect bookings, distribution, sustainability and market intelligence through a premium travel technology experience.
            </p>

            <div className="mt-10 grid gap-4">
              <div className="rounded-3xl bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Fast response</p>
                <p className="mt-3 text-2xl font-semibold">Within 1 business day</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Expert support</p>
                <p className="mt-3 text-2xl font-semibold">Travel tech guidance</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Partner enablement</p>
                <p className="mt-3 text-2xl font-semibold">Operator & supplier support</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
            {formSubmitted ? (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                  <h2 className="text-3xl font-semibold text-slate-950">Thank you</h2>
                  <p className="mt-4 text-slate-600 leading-7">
                    Your request has been submitted. Our team will review it and respond within one business day.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormSubmitted(false);
                    setSubmitError(null);
                  }}
                  className="rounded-full border-slate-300 px-6 py-3 text-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Contact us</p>
                  <h2 className="text-4xl font-serif text-slate-950">Share your project details with our team.</h2>
                  <p className="max-w-xl text-base leading-8 text-slate-600">
                    Tell us about your business, priorities, and timeline. We will respond with a clear next step within one business day.
                  </p>
                </div>

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
                  <div className="sm:col-span-2">
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
                    'Send request'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};


export default ContactPage;