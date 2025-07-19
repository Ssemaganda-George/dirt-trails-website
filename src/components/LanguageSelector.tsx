import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 text-sm"
      >
        <Globe className="h-4 w-4" />
        {currentLanguage && (
          <>
            <span>{currentLanguage.flag}</span>
            <span className="hidden sm:inline">{currentLanguage.name}</span>
            <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
          </>
        )}
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
                i18n.language === lang.code 
                  ? 'bg-green-50 text-green-700 font-medium' 
                  : 'text-gray-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-green-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
