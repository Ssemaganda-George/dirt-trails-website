import { useState } from 'react';
import Hero from '@/components/home/Hero';
import ToursSection from '@/components/home/ToursSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Conservation from '@/components/home/Conservation';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import ChatBot from '@/components/ChatBot';
import Partners from '@/components/home/Partners';

const HomePage = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleContinue = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowWelcome(false);
    }, 700); // match the transition duration
  };

  return (
    <div className="min-h-screen">
      {showWelcome && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-yellow-50 p-2 sm:p-6 transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-4 sm:p-10 text-center overflow-y-auto max-h-[90vh]">
            <h1 className="text-4xl font-extrabold mb-6 text-green-700 tracking-tight">Welcome to Dirt Trails Safaris</h1>
            <p className="text-lg mb-6 text-gray-700">
              <span className="font-semibold text-green-700">Dirt Trails Safaris</span> is an adventure and eco-tourism company committed to delivering sustainable, professional, and safe safari experiences. Our mission is to connect travelers with Africa's beautiful landscapes and vibrant cultures, while upholding the highest standards of service and sustainability.
            </p>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Our Core Goals</h2>
              <ul className="text-left text-gray-700 mb-4 list-disc list-inside mx-auto max-w-md">
                <li className="mb-1">Provide world-class, memorable safari journeys with professionalism and care</li>
                <li className="mb-1">Promote conservation and support local communities</li>
                <li className="mb-1">Champion eco-friendly and responsible travel practices</li>
                <li className="mb-1">Empower guests to experience the true beauty and diversity of Africa</li>
              </ul>
            </div>
            <p className="mb-8 text-gray-600">
              We invite you to begin your journey with us. Click below to access our booking platform and start planning your adventure.
            </p>
            <button
              className="mt-2 px-8 py-3 bg-green-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-800 hover:shadow-xl active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 w-full sm:w-auto flex items-center justify-center gap-2"
              onClick={handleContinue}
              aria-label="Continue to the booking platform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
              Click to Continue
            </button>
          </div>
        </div>
      )}
      <Hero />
      {/* <ToursSection /> */}
      <WhyChooseUs /> 
      <Partners />
      <Conservation />
      <Testimonials />
      <CallToAction />
      <ChatBot />
    </div>
  );
};

export default HomePage;
