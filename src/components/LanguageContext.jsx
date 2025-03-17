import React, { createContext, useState, useContext, useEffect } from "react";
import huTranslations from "../utils/translations/hu";
import enTranslations from "../utils/translations/en";

// Nyelvi kontextus létrehozása
const LanguageContext = createContext();

// Fordítási objektumok
const translations = {
  hu: huTranslations,
  en: enTranslations,
};

// Nyelvi provider komponens
export const LanguageProvider = ({ children }) => {
  // Alapértelmezett nyelv beállítása (magyar)
  const [language, setLanguage] = useState("hu");
  const [currentTranslations, setCurrentTranslations] = useState(
    translations.hu
  );

  // Nyelvi beállítás betöltése a localStorage-ból
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
      setCurrentTranslations(translations[savedLanguage]);
    }
  }, []);

  // Nyelvi beállítás frissítése a nyelv változásakor
  useEffect(() => {
    if (translations[language]) {
      setCurrentTranslations(translations[language]);
      // Nyelvi beállítás mentése a localStorage-ba
      localStorage.setItem("language", language);
    }
  }, [language]);

  // Nyelv váltása
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  // Fordítási segédfüggvény
  const t = (key) => {
    // Kulcs feldarabolása (pl. "menu.home" -> ["menu", "home"])
    const keys = key.split(".");

    // Érték keresése a fordítási objektumban
    let value = currentTranslations;
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Ha nem található a fordítás, visszaadjuk a kulcsot
        return key;
      }
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook a nyelvi kontextus használatához
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
