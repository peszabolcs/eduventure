import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CareerResults = ({
  results,
  personalityProfile,
  onFindExpert,
  onRecommendedPaths,
  isSaving,
}) => {
  const [activeTab, setActiveTab] = useState("summary");
  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const isLoggedIn = !!token;

  // Debug log to check the structure
  console.log("CareerResults received props:", { results, personalityProfile });

  // Early validation of results
  if (
    !results ||
    !results.career_matches ||
    !Array.isArray(results.career_matches)
  ) {
    console.error("Invalid results data:", results);
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Hiba történt</h2>
            <p className="text-purple-200">
              Az eredmények betöltése sikertelen. Kérjük, próbálja újra a
              tesztet.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              Teszt újrakezdése
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Ensure we have valid career matches and personality profile
  const filteredCareerMatches = results.career_matches.filter(
    (career) =>
      typeof career === "object" &&
      career !== null &&
      typeof career.score === "number" &&
      career.score >= 50
  );

  // Early return if no valid career matches
  if (filteredCareerMatches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#312e81] to-[#581c87] to-[#831843] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Nincs elegendő adat az eredmények megjelenítéséhez
        </h2>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Teszt újrakezdése
        </button>
      </div>
    );
  }

  const topCareerMatches = filteredCareerMatches.slice(0, 3);

  // Generate personality traits array from the profile
  const personalityTraits = Array.isArray(personalityProfile?.traits)
    ? personalityProfile.traits
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Karrierteszt Eredmények
            </h2>
            <p className="text-purple-200 text-lg">
              {isLoggedIn
                ? "Íme a részletes elemzés a karrierlehetőségeidről és személyiségprofilodról"
                : "Íme egy előzetes áttekintés a karrierlehetőségeidről"}
            </p>
          </div>

          {/* Top 3 Career Matches */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-purple-300 mb-6 text-center">
              Legjobb Karrieregyezések
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topCareerMatches.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 rounded-xl p-6 border border-purple-500/20"
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                      {career.score}%
                    </div>
                    <h4 className="text-xl font-semibold text-white">
                      {career.title}
                    </h4>
                  </div>
                  <p className="text-purple-200 text-sm mb-4 line-clamp-3">
                    {career.description}
                  </p>
                  {!isLoggedIn && (
                    <div className="text-center">
                      <span className="text-purple-300 text-sm">
                        Regisztrálj a részletes elemzésért
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {isLoggedIn ? (
            <>
              {/* Detailed Analysis Tabs */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === "summary"
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-purple-300 hover:bg-white/20"
                  }`}
                >
                  Összefoglaló
                </button>
                <button
                  onClick={() => setActiveTab("personality")}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === "personality"
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-purple-300 hover:bg-white/20"
                  }`}
                >
                  Személyiségprofil
                </button>
                <button
                  onClick={() => setActiveTab("recommendations")}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === "recommendations"
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-purple-300 hover:bg-white/20"
                  }`}
                >
                  Ajánlások
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "summary" && (
                    <div className="space-y-8">
                      {/* Detailed career matches */}
                      {results.career_matches.map((career, index) => (
                        <div
                          key={index}
                          className="bg-white/10 rounded-xl p-6 border border-purple-500/20"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-semibold text-white">
                              {career.title}
                            </h4>
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                              {career.score}%
                            </div>
                          </div>
                          <p className="text-purple-200 mb-4">
                            {career.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-purple-300 font-medium mb-2">
                                Szükséges készségek
                              </h5>
                              <ul className="list-disc list-inside text-purple-200">
                                {career.skills.map((skill, idx) => (
                                  <li key={idx}>{skill}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-purple-300 font-medium mb-2">
                                Személyiségjegyek
                              </h5>
                              <ul className="list-disc list-inside text-purple-200">
                                {career.matching_traits.map((trait, idx) => (
                                  <li key={idx}>{trait}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "personality" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {personalityProfile &&
                        typeof personalityProfile === "object" &&
                        Object.entries(personalityProfile)
                          .filter(
                            ([category, traits]) =>
                              traits &&
                              Array.isArray(traits) &&
                              traits.length > 0
                          )
                          .map(([category, traits], index) => {
                            if (!traits || traits.length === 0) return null;

                            return (
                              <div
                                key={category}
                                className="bg-white/10 rounded-xl p-6 border border-purple-500/20"
                              >
                                <h4 className="text-xl font-semibold text-white mb-4">
                                  {category
                                    .split("_")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")}
                                </h4>
                                <ul className="space-y-3">
                                  {traits.map((trait, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center text-purple-200"
                                    >
                                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                      {typeof trait === "object" && trait
                                        ? trait.name || "Ismeretlen"
                                        : trait || "Ismeretlen"}
                                      {typeof trait === "object" &&
                                        trait &&
                                        trait.score !== undefined && (
                                          <span className="ml-2 text-sm text-purple-400">
                                            ({Math.round(trait.score * 100)}%)
                                          </span>
                                        )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                    </div>
                  )}

                  {activeTab === "recommendations" && (
                    <div className="space-y-6">
                      <div className="bg-white/10 rounded-xl p-6 border border-purple-500/20">
                        <h4 className="text-xl font-semibold text-white mb-4">
                          Következő lépések
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            onClick={onFindExpert}
                            className="p-4 bg-purple-600/20 rounded-lg text-purple-200 hover:bg-purple-600/30 transition-all duration-300"
                          >
                            Szakértő keresése
                          </button>
                          <button
                            onClick={onRecommendedPaths}
                            className="p-4 bg-purple-600/20 rounded-lg text-purple-200 hover:bg-purple-600/30 transition-all duration-300"
                          >
                            Ajánlott képzési utak
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <div className="text-center mt-8">
              <p className="text-purple-200 mb-6">
                Regisztrálj vagy jelentkezz be a részletes karrierelemzés és
                személyiségprofil megtekintéséhez!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Regisztráció
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 bg-white/10 text-purple-200 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Bejelentkezés
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CareerResults;
