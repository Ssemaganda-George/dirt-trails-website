import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isGoogleTranslateLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language code mapping for Google Translate
const languageCodeMap = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de'
};

// Global variable to track Google Translate initialization
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isGoogleTranslateLoaded, setIsGoogleTranslateLoaded] = useState(false);

  // Load Google Translate script
  useEffect(() => {
    const loadGoogleTranslate = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
      }
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,es,fr,de',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element');
        setIsGoogleTranslateLoaded(true);
      }
    };

    loadGoogleTranslate();
  }, []);

  // Apply translation styles to hide Google Translate UI elements
  useEffect(() => {
    if (isGoogleTranslateLoaded) {
      const style = document.createElement('style');
      style.id = 'google-translate-styles';
      style.innerHTML = `
        #google_translate_element {
          display: none !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        .goog-te-menu-value {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-tooltip {
          display: none !important;
        }
        .goog-tooltip:hover {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .skiptranslate {
          display: none !important;
        }
        iframe.goog-te-banner-frame {
          display: none !important;
        }
        .goog-te-ftab {
          display: none !important;
        }
        .goog-logo-link {
          display: none !important;
        }
        .goog-te-gadget {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, [isGoogleTranslateLoaded]);

  // Handle language change and trigger Google Translate
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    
    // Trigger Google Translate if loaded
    if (isGoogleTranslateLoaded && window.google && window.google.translate) {
      const targetLang = languageCodeMap[lang];
      
      // Method 1: Try to find and trigger the select element
      const translateSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (translateSelect) {
        translateSelect.value = targetLang;
        translateSelect.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        // Method 2: If select not found, try to trigger translation programmatically
        setTimeout(() => {
          const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (selectElement) {
            selectElement.value = targetLang;
            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }, 500);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleLanguageChange, 
      isGoogleTranslateLoaded 
    }}>
      {children}
      {/* Google Translate element - hidden but functional */}
      <div id="google_translate_element" style={{ display: 'none' }} />
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};