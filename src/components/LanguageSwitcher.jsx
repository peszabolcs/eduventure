import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage, t } = useLanguage();

  // Nyelv váltása
  const toggleLanguage = () => {
    const newLanguage = language === "hu" ? "en" : "hu";
    changeLanguage(newLanguage);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="text-white/90 hover:text-white no-underline transition-colors px-3 py-1.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${language === "hu" ? "English" : "Magyar"}`}
    >
      <span className="text-sm font-medium">
        {language === "hu" ? "EN" : "HU"}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        <path d="M2 12h20"></path>
      </svg>
    </motion.button>
  );
};

export default LanguageSwitcher;
