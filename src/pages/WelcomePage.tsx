import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleContinue = () => {
    setLoading(true);
    setFadeOut(true);
    setTimeout(() => {
      navigate('/booking');
    }, 600); // match the transition duration
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-yellow-50 p-6 transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      role="main"
      aria-label="Welcome to Dirt Trails Safaris"
    >
      <div className="max-w-2xl bg-white rounded-xl shadow-lg p-10 text-center" tabIndex={-1}>
        <h1 className="text-4xl font-extrabold mb-6 text-green-700 tracking-tight">Welcome to Dirt Trails Safaris</h1>
        <p className="text-lg mb-6 text-gray-700">
          <span className="font-semibold text-green-700">Dirt Trails Safaris</span> is an adventure and eco-tourism company committed to delivering sustainable, professional, and safe safari experiences. Our mission is to connect travelers with Africa’s beautful landscapes and vibrant cultures, while upholding the highest standards of service and sustainability.
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
        <Button
          className="mt-2 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 focus-visible:ring-4 focus-visible:ring-green-400 focus-visible:outline-none"
          onClick={handleContinue}
          tabIndex={0}
          aria-label="Continue to booking platform"
          aria-live="polite"
          aria-busy={loading}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              Loading...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 animate-bounce inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>
              Click to Continue
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
