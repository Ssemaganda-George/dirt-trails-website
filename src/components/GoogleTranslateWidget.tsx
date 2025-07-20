import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const GoogleTranslateWidget: React.FC = () => {
  const { isGoogleTranslateLoaded, language } = useLanguage();
  const translateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isGoogleTranslateLoaded && translateRef.current) {
      // Apply comprehensive styles to hide Google Translate UI elements
      const existingStyle = document.getElementById('google-translate-custom-styles');
      if (!existingStyle) {
        const style = document.createElement('style');
        style.id = 'google-translate-custom-styles';
        style.innerHTML = `
          /* Hide Google Translate widget completely */
          #google_translate_element {
            display: none !important;
          }
          
          /* Hide Google Translate banner */
          .goog-te-banner-frame {
            display: none !important;
          }
          
          /* Hide Google Translate menu */
          .goog-te-menu-value {
            display: none !important;
          }
          
          /* Prevent body displacement */
          body {
            top: 0 !important;
            position: static !important;
          }
          
          /* Hide Google Translate balloon */
          .goog-te-balloon-frame {
            display: none !important;
          }
          
          /* Hide tooltips */
          .goog-tooltip {
            display: none !important;
          }
          
          .goog-tooltip:hover {
            display: none !important;
          }
          
          /* Remove text highlighting */
          .goog-text-highlight {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          
          /* Hide skip translate elements */
          .skiptranslate {
            display: none !important;
          }
          
          /* Hide banner iframe */
          iframe.goog-te-banner-frame {
            display: none !important;
          }
          
          /* Hide floating tab */
          .goog-te-ftab {
            display: none !important;
          }
          
          /* Hide Google logo link */
          .goog-logo-link {
            display: none !important;
          }
          
          /* Hide gadget */
          .goog-te-gadget {
            display: none !important;
          }
          
          /* Hide combo box */
          .goog-te-combo {
            display: none !important;
          }
          
          /* Ensure proper page layout */
          html {
            top: 0 !important;
          }
          
          /* Hide any remaining Google Translate elements */
          .goog-te-banner-frame,
          .goog-te-menu-frame,
          .goog-te-balloon-frame,
          .goog-te-ftab-frame {
            display: none !important;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [isGoogleTranslateLoaded]);

  // Monitor for page changes and ensure translation persists
  useEffect(() => {
    if (isGoogleTranslateLoaded && language !== 'en') {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if new content was added that needs translation
            const needsTranslation = Array.from(mutation.addedNodes).some(node => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                return !element.classList.contains('skiptranslate') && 
                       !element.closest('.goog-te-balloon-frame') &&
                       !element.closest('.goog-te-banner-frame');
              }
              return false;
            });

            if (needsTranslation) {
              // Trigger re-translation after a short delay
              setTimeout(() => {
                triggerTranslation();
              }, 100);
            }
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => observer.disconnect();
    }
  }, [isGoogleTranslateLoaded, language]);

  const triggerTranslation = () => {
    if (window.google && window.google.translate) {
      const translateSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (translateSelect && language !== 'en') {
        const languageCodeMap = {
          en: 'en',
          es: 'es',
          fr: 'fr',
          de: 'de'
        };
        
        const targetLang = languageCodeMap[language];
        if (translateSelect.value !== targetLang) {
          translateSelect.value = targetLang;
          translateSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
  };

  return (
    <div 
      ref={translateRef}
      id="google_translate_element"
      style={{ display: 'none' }}
    />
  );
};

export default GoogleTranslateWidget;