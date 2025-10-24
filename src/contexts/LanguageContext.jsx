import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });

  // Determine if current language is RTL
  const isRTL = language === 'ar';

  // Update document direction and lang attribute when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language, isRTL]);

  // Function to change language
  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang);
    }
  };

  // Function to get translation by key path (e.g., "header.features")
  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let value = translations[language];

    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        // Return key if translation not found
        console.warn(`Translation not found for key: ${keyPath} in language: ${language}`);
        return keyPath;
      }
    }

    return value || keyPath;
  };

  const value = {
    language,
    changeLanguage,
    t,
    isRTL,
    availableLanguages: Object.keys(translations),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
