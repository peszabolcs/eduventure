"use client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const PersonalityTestButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = () => {
    // analytics
    if (window.gtag) {
      window.gtag("event", "personality_test_click", {
        event_category: "engagement",
        event_label: "Személyiségteszt gomb kattintás",
      });
    }
    navigate("/szemelyisegteszt");
  };

  return (
    <div className="flex justify-center my-8">
      <button
        onClick={handleClick}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center"
      >
        <span className="mr-2">{t("hero.ctaButton")}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default PersonalityTestButton;
