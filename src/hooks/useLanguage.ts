import { useState, useEffect } from 'react';
import { translations } from '@/translations';

type Language = 'en' | 'es';

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<Language>;
      setLanguageState(customEvent.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  return {
    language,
    setLanguage,
    t: translations[language],
  };
};
