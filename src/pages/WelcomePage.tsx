import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAllGoals, setShowAllGoals] = useState(false);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleContinue = () => {
    setLoading(true);
    setFadeOut(true);
    setTimeout(() => {
      navigate('/booking');
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-cream p-4 sm:p-6 transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      role="main"
      aria-label="Welcome to Dirt Trails Safaris"
    >
      <div className="mx-auto w-full max-w-7xl bg-white rounded-xl shadow-lg p-4 sm:p-10 text-center max-h-[calc(100vh-4rem)] overflow-y-auto" tabIndex={-1} style={{ WebkitOverflowScrolling: 'touch' }}>
        <h1 className="text-3xl sm:text-4xl font-serif mb-4 sm:mb-6 text-brown-900 tracking-tight">Welcome to Dirt Trails Safaris</h1>
        <p className="text-base mb-4 sm:hidden text-gray-700 leading-relaxed">
          <span className="font-semibold text-brown-900">Dirt Trails Safaris</span> — sustainable, professional safari experiences connecting you with Africa's wildlife and communities.
        </p>
        <p className="hidden sm:block text-base sm:text-lg mb-4 sm:mb-6 text-gray-700 leading-relaxed">
          <span className="font-semibold text-brown-900">Dirt Trails Safaris</span> is an adventure and eco-tourism company committed to delivering sustainable, professional, and safe safari experiences. Our mission is to connect travelers with Africa's beautiful landscapes and vibrant cultures, while upholding the highest standards of service and sustainability.
        </p>
        <div className="mb-6">
          <h2 className="text-2xl font-serif text-brown-900 mb-2">Our Core Goals</h2>
          <ul className="text-left text-gray-700 mb-4 list-disc list-inside mx-auto max-w-md space-y-1">
            <li>Provide memorable safari journeys with professionalism and care</li>
            <li>Promote conservation and support local communities</li>
            <div className="sm:hidden">
              {!showAllGoals ? (
                <>
                  <li>…and more — sustainable, community-focused travel</li>
                  <button
                    onClick={() => setShowAllGoals(true)}
                    className="mt-2 text-sm text-accent font-semibold underline"
                    aria-expanded={showAllGoals}
                    aria-controls="full-goals"
                  >
                    See all goals
                  </button>
                </>
              ) : (
                <div id="full-goals" className="space-y-1">
                  <li>Champion eco-friendly and responsible travel practices</li>
                  <li>Empower guests to experience the true beauty and diversity of Africa</li>
                </div>
              )}
            </div>
            <div className="hidden sm:block" id="full-goals">
              <li>Champion eco-friendly and responsible travel practices</li>
              <li>Empower guests to experience the true beauty and diversity of Africa</li>
            </div>
          </ul>
        </div>
        <p className="mb-6 text-gray-600">
          We invite you to begin your journey with us. Click below to access our booking platform and start planning your adventure.
        </p>
        <Button
          className="mt-2 px-6 py-3 text-base sm:text-lg font-semibold rounded-lg shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 focus-visible:ring-4 focus-visible:ring-accent focus-visible:outline-none"
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