import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CareerResults = ({
  results,
  personalityProfile,
  onFindExpert,
  onRecommendedPaths,
  isSaving,
}) => {
  const navigate = useNavigate();

  // Debug log to check the structure
  console.log("CareerResults props:", { results, personalityProfile });

  // Early return if no valid results
  if (!results || typeof results !== "object") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#312e81] to-[#581c87] to-[#831843] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Nincs elegendő adat az eredmények megjelenítéséhez
        </h2>
        <button
          onClick={() => navigate("/career-test")}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Teszt újrakezdése
        </button>
      </div>
    );
  }

  // Ensure we have valid career matches and personality profile
  const career_matches = Array.isArray(results.career_matches)
    ? results.career_matches
    : [];
  const personality_profile = results.personality_profile || {};

  // Filter career matches with proper type checking
  const filteredCareerMatches = career_matches.filter(
    (career) =>
      typeof career === "object" &&
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
          onClick={() => navigate("/career-test")}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Teszt újrakezdése
        </button>
      </div>
    );
  }

  // Generate personality traits array from the profile
  const personalityTraits = Array.isArray(personality_profile.traits)
    ? personality_profile.traits
    : [];

  return (
    <>
      <style jsx global>{`
        body {
          background: linear-gradient(
            to bottom right,
            #312e81,
            #581c87,
            #831843
          );
          background-attachment: fixed;
        }
      `}</style>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 pt-24">
          {isSaving && (
            <div className="fixed top-4 right-4 bg-purple-500/20 backdrop-blur-sm text-purple-300 px-4 py-2 rounded-lg flex items-center gap-2 animate-pulse">
              <div className="w-4 h-4 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
              Eredmények mentése...
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-500/20"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
              Pályaorientációs eredmények
            </h1>

            {/* Személyiségprofil szekció */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-2"></span>
                Személyiségprofil
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalityTraits.map((trait, index) => (
                  <motion.div
                    key={`trait-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20 hover:shadow-lg transition-all duration-300 group"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="text-base font-medium text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {trait.name}
                    </h3>
                    <p className="text-purple-200/80 text-xs mb-3">
                      {trait.description}
                    </p>
                    <div className="mt-2">
                      <div className="w-full bg-purple-500/10 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${trait.score * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <p className="text-xs text-purple-300 mt-1">
                        {Math.round(trait.score * 100)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Karrierterületek szekció */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-2"></span>
                Ajánlott karrierterületek
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCareerMatches.map((career, index) => (
                  <motion.div
                    key={`career-${career.id || index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 p-4 hover:shadow-lg transition-all duration-300 group"
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* Karrier cím és egyezés */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                          {career.title}
                        </h3>
                        <p className="text-purple-200/80 text-xs mt-1">
                          {career.description}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                        {career.score}% egyezés
                      </div>
                    </div>

                    {/* Karrier adatok grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Bal oldali oszlop */}
                      <div className="space-y-3">
                        {/* Készségek */}
                        <div>
                          <h4 className="text-sm font-medium text-white mb-1.5">
                            Szükséges készségek
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {Array.isArray(career.skills) &&
                              career.skills.map((skill, skillIndex) => (
                                <span
                                  key={`skill-${
                                    career.id || index
                                  }-${skillIndex}`}
                                  className="bg-purple-500/10 text-purple-200 px-2 py-0.5 rounded-full text-xs hover:bg-purple-500/20 hover:text-purple-300 transition-colors cursor-default"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>

                        {/* Illeszkedő tulajdonságok */}
                        <div>
                          <h4 className="text-sm font-medium text-white mb-1.5">
                            Illeszkedő tulajdonságaid
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {Array.isArray(career.matching_traits) &&
                              career.matching_traits.map(
                                (trait, traitIndex) => (
                                  <span
                                    key={`trait-${
                                      career.id || index
                                    }-${traitIndex}`}
                                    className="bg-green-500/10 text-green-300 px-2 py-0.5 rounded-full text-xs hover:bg-green-500/20 transition-colors cursor-default"
                                  >
                                    {trait}
                                  </span>
                                )
                              )}
                          </div>
                        </div>
                      </div>

                      {/* Jobb oldali oszlop */}
                      <div className="space-y-3">
                        {/* Karrierkilátások */}
                        <div>
                          <h4 className="text-sm font-medium text-white mb-1.5">
                            Karrierkilátások
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white/5 p-2 rounded-lg border border-purple-500/20">
                              <h4 className="text-xs font-medium text-purple-200/80">
                                Növekedés
                              </h4>
                              <p className="mt-0.5 text-white text-xs">
                                {career.growthPotential}
                              </p>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg border border-purple-500/20">
                              <h4 className="text-xs font-medium text-purple-200/80">
                                Kilátások
                              </h4>
                              <p className="mt-0.5 text-white text-xs">
                                {career.futureOutlook}
                              </p>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg border border-purple-500/20">
                              <h4 className="text-xs font-medium text-purple-200/80">
                                Fizetés
                              </h4>
                              <p className="mt-0.5 text-white text-xs">
                                {career.salaryRange}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Specializációk */}
                        {Array.isArray(career.specializations) &&
                          career.specializations.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-white mb-1.5">
                                Specializációk
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {career.specializations.map(
                                  (spec, specIndex) => (
                                    <span
                                      key={`spec-${
                                        career.id || index
                                      }-${specIndex}`}
                                      className="bg-white/5 px-2 py-0.5 rounded-full text-xs text-purple-200/80 hover:bg-purple-500/10 hover:text-purple-300 transition-colors cursor-default"
                                    >
                                      {spec}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Újrakezdés gomb */}
          <div className="text-center mt-6">
            <motion.button
              onClick={() => {
                window.location.reload();
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-base font-medium shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Teszt újrakezdése
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerResults;
