import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CareerQuestion from "./CareerQuestion";
import CareerResults from "./CareerResults";
import { useNavigate, useLocation } from "react-router-dom";
import {
  QUESTIONS,
  HOLLAND_CODES,
  COGNITIVE_SKILLS,
  WORK_ENVIRONMENTS,
  CAREER_AREAS,
} from "./questions";

const SignupPromptModal = ({ isOpen, onClose, onSignup, results }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-lg rounded-2xl p-8 max-w-lg w-full border border-purple-500/20 shadow-xl"
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-4">
            Gratulálunk a teszt kitöltéséhez! 🎉
          </h3>
          <p className="text-purple-200 mb-4">
            A részletes eredmények megtekintéséhez és az eredmények későbbi
            eléréséhez hozz létre egy fiókot vagy jelentkezz be!
          </p>
          <div className="bg-purple-500/10 rounded-lg p-4 mb-6">
            <p className="text-purple-300 text-sm">
              A fiók létrehozásával az alábbi előnyöket élvezheted:
            </p>
            <ul className="text-left mt-3 space-y-2">
              <li className="flex items-center text-purple-200">
                <svg
                  className="w-5 h-5 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Részletes karrierelemzés és személyiségprofil
              </li>
              <li className="flex items-center text-purple-200">
                <svg
                  className="w-5 h-5 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Eredmények mentése és későbbi megtekintése
              </li>
              <li className="flex items-center text-purple-200">
                <svg
                  className="w-5 h-5 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Személyre szabott karriertanácsok
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={onSignup}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Fiók létrehozása
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-white/10 text-purple-200 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
          >
            Később
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CareerOrientationModule = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [personalityProfile, setPersonalityProfile] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  // Check for stored results on mount
  useEffect(() => {
    const storedResults = localStorage.getItem("tempCareerResults");
    const storedAnswers = localStorage.getItem("tempCareerAnswers");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const resetState = () => {
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResults(false);
      setResults(null);
      setPersonalityProfile({});
      setIsSaving(false);
      setShowSignupPrompt(false);
    };

    if (storedResults && storedAnswers) {
      try {
        const parsedResults = JSON.parse(storedResults);
        const parsedAnswers = JSON.parse(storedAnswers);

        // Validate the stored results structure
        if (
          !parsedResults.career_matches ||
          !parsedResults.personality_profile
        ) {
          // If the structure is invalid, recalculate results
          const recalculatedResults = calculateResults(parsedAnswers);
          setResults(recalculatedResults);
          setPersonalityProfile(recalculatedResults.personality_profile);
        } else {
          setResults(parsedResults);
          setPersonalityProfile(parsedResults.personality_profile);
        }

        setAnswers(parsedAnswers);
        setShowResults(true);

        // If user is logged in and we have stored results, save them
        if (token) {
          saveResults(parsedResults, parsedAnswers);
          // Clear stored results after saving
          localStorage.removeItem("tempCareerResults");
          localStorage.removeItem("tempCareerAnswers");
        }
      } catch (error) {
        console.error("Error processing stored results:", error);
        resetState();
      }
    } else {
      resetState();
    }

    return () => resetState(); // Cleanup on unmount
  }, [location.key]);

  // Function to save results to the server
  const saveResults = async (resultsToSave, answersToSave) => {
    try {
      setIsSaving(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        // Store results temporarily and show signup prompt
        localStorage.setItem(
          "tempCareerResults",
          JSON.stringify(resultsToSave)
        );
        localStorage.setItem(
          "tempCareerAnswers",
          JSON.stringify(answersToSave)
        );
        setShowSignupPrompt(true);
        setIsSaving(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/backend/save_career_result.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            results: {
              career_matches: resultsToSave.career_matches,
              personality_profile: resultsToSave.personality_profile,
            },
            personality_profile: resultsToSave.personality_profile,
            answers: answersToSave,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!data.success) {
        if (
          data.error === "Érvénytelen munkamenet" ||
          data.error === "Nincs bejelentkezett felhasználó"
        ) {
          // Store results temporarily and show signup prompt
          localStorage.setItem(
            "tempCareerResults",
            JSON.stringify(resultsToSave)
          );
          localStorage.setItem(
            "tempCareerAnswers",
            JSON.stringify(answersToSave)
          );
          setShowSignupPrompt(true);
        } else {
          console.error("Failed to save career results:", data.error);
          alert("Hiba történt az eredmények mentése közben: " + data.error);
        }
      } else {
        alert("Az eredmények sikeresen elmentve!");
      }
    } catch (error) {
      console.error("Error saving career results:", error);
      alert("Hiba történt az eredmények mentése közben. Kérjük, próbáld újra!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnswer = async (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const calculatedResults = calculateResults(newAnswers);
      setResults(calculatedResults);
      setPersonalityProfile(calculatedResults.personality_profile);
      setShowResults(true);

      // Save or store results
      await saveResults(calculatedResults, newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Remove the last answer when going back
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleFindExpert = () => {
    navigate("/szakerto-kereso");
  };

  const handleRecommendedPaths = () => {
    navigate("/ajanlott-utak");
  };

  const handleSignup = () => {
    // Átirányítás a regisztrációs oldalra
    navigate("/register");
  };

  const calculateResults = (answers) => {
    // Holland kódok normalizálása
    const hollandCodes = {};
    Object.keys(HOLLAND_CODES).forEach((code) => {
      hollandCodes[code] = 0;
    });

    // Kognitív készségek normalizálása
    const cognitiveSkills = {};
    Object.keys(COGNITIVE_SKILLS).forEach((skill) => {
      cognitiveSkills[skill] = 0;
    });

    // Környezeti preferenciák normalizálása
    const workEnvironments = {};
    Object.keys(WORK_ENVIRONMENTS).forEach((env) => {
      workEnvironments[env] = 0;
    });

    // Válaszok feldolgozása
    answers.forEach((answer, index) => {
      const question = QUESTIONS[index];
      const selectedOption = question.options.find((opt) => opt.id === answer);

      // Holland kódok súlyozása
      selectedOption.holland_codes.forEach((code) => {
        hollandCodes[code] += question.weight;
      });

      // Kognitív készségek súlyozása
      selectedOption.cognitive_indicators.forEach((skill) => {
        cognitiveSkills[skill] += question.weight;
      });

      // Környezeti preferenciák súlyozása
      selectedOption.work_environment.forEach((env) => {
        workEnvironments[env] += question.weight;
      });
    });

    // Eredmények normalizálása
    const maxHollandScore = Math.max(...Object.values(hollandCodes));
    const maxCognitiveScore = Math.max(...Object.values(cognitiveSkills));
    const maxEnvironmentScore = Math.max(...Object.values(workEnvironments));

    Object.keys(hollandCodes).forEach((code) => {
      hollandCodes[code] = hollandCodes[code] / maxHollandScore;
    });

    Object.keys(cognitiveSkills).forEach((skill) => {
      cognitiveSkills[skill] = cognitiveSkills[skill] / maxCognitiveScore;
    });

    Object.keys(workEnvironments).forEach((env) => {
      workEnvironments[env] = workEnvironments[env] / maxEnvironmentScore;
    });

    // Karrierterületek kiszámítása
    const careerMatches = calculateCareerMatches(hollandCodes, cognitiveSkills);

    return {
      personality_profile: {
        holland_codes: Object.entries(hollandCodes).map(([code, score]) => ({
          name: HOLLAND_CODES[code].name,
          score: score,
        })),
        cognitive_skills: Object.entries(cognitiveSkills).map(
          ([skill, score]) => ({
            name: COGNITIVE_SKILLS[skill].name,
            score: score,
          })
        ),
        work_environments: Object.entries(workEnvironments).map(
          ([env, score]) => ({
            name: WORK_ENVIRONMENTS[env].name,
            score: score,
          })
        ),
        traits: generatePersonalityTraits(hollandCodes, cognitiveSkills),
      },
      career_matches: careerMatches,
    };
  };

  const calculateCareerMatches = (hollandCodes, cognitiveSkills) => {
    const matches = Object.entries(CAREER_AREAS).map(([id, area]) => {
      let matchScore = 0;
      let totalWeight = 0;

      // Holland kódok egyezésének számítása
      area.required_holland_codes.forEach((code) => {
        matchScore += hollandCodes[code] * 0.6;
        totalWeight += 0.6;
      });

      // Kognitív készségek egyezésének számítása
      area.cognitive_requirements.forEach((skill) => {
        matchScore += cognitiveSkills[skill] * 0.4;
        totalWeight += 0.4;
      });

      // Végső egyezési pontszám számítása
      const finalScore = totalWeight > 0 ? (matchScore / totalWeight) * 100 : 0;

      return {
        id,
        title: area.title,
        description: area.description,
        score: Math.round(finalScore),
        skills: area.required_skills,
        matching_traits: area.matching_traits,
        growthPotential: area.growth_potential,
        futureOutlook: area.future_outlook,
        salaryRange: area.salary_range,
        specializations: area.specializations,
      };
    });

    // Rendezzük a karrierterületeket pontszám szerint csökkenő sorrendben
    return matches.sort((a, b) => b.score - a.score);
  };

  const generateMatchingTraits = (
    hollandCodes,
    cognitiveSkills,
    careerArea
  ) => {
    const traits = [];

    // Holland kódok alapján
    careerArea.required_holland_codes.forEach((code) => {
      if (hollandCodes[code] > 0.7) {
        traits.push(HOLLAND_CODES[code].traits[0]);
      }
    });

    // Kognitív készségek alapján
    careerArea.cognitive_requirements.forEach((skill) => {
      if (cognitiveSkills[skill] > 0.7) {
        traits.push(COGNITIVE_SKILLS[skill].traits[0]);
      }
    });

    return traits.slice(0, 3);
  };

  const generatePersonalityTraits = (hollandCodes, cognitiveSkills) => {
    const traits = [];

    // Holland kódok alapján
    Object.entries(hollandCodes).forEach(([code, score]) => {
      if (score > 0.7) {
        traits.push({
          name: HOLLAND_CODES[code].name,
          description: HOLLAND_CODES[code].description,
          score: score,
        });
      }
    });

    // Kognitív készségek alapján
    Object.entries(cognitiveSkills).forEach(([skill, score]) => {
      if (score > 0.7) {
        traits.push({
          name: COGNITIVE_SKILLS[skill].name,
          description: COGNITIVE_SKILLS[skill].description,
          score: score,
        });
      }
    });

    return traits;
  };

  if (showResults && results) {
    // Debug log
    console.log("Rendering CareerResults with:", {
      results,
      personality_profile: results.personality_profile,
    });

    // Validate the results structure
    if (!results.career_matches || !Array.isArray(results.career_matches)) {
      console.error("Invalid results structure:", results);
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#312e81] to-[#581c87] to-[#831843] flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Hiba történt az eredmények betöltése közben
          </h2>
          <button
            onClick={() => {
              // Clear stored results and reset state
              localStorage.removeItem("tempCareerResults");
              localStorage.removeItem("tempCareerAnswers");
              setCurrentQuestion(0);
              setAnswers([]);
              setShowResults(false);
              setResults(null);
              setPersonalityProfile({});
              window.location.reload();
            }}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Teszt újrakezdése
          </button>
        </div>
      );
    }

    // Ensure we have valid data structures before rendering CareerResults
    const validatedResults = {
      career_matches: results.career_matches.map((match) => ({
        ...match,
        skills: Array.isArray(match.skills) ? match.skills : [],
        matching_traits: Array.isArray(match.matching_traits)
          ? match.matching_traits
          : [],
      })),
      personality_profile: {
        holland_codes: Array.isArray(results.personality_profile?.holland_codes)
          ? results.personality_profile.holland_codes
          : [],
        cognitive_skills: Array.isArray(
          results.personality_profile?.cognitive_skills
        )
          ? results.personality_profile.cognitive_skills
          : [],
        work_environments: Array.isArray(
          results.personality_profile?.work_environments
        )
          ? results.personality_profile.work_environments
          : [],
        traits: Array.isArray(results.personality_profile?.traits)
          ? results.personality_profile.traits
          : [],
      },
    };

    return (
      <>
        <CareerResults
          results={validatedResults}
          personalityProfile={validatedResults.personality_profile}
          onFindExpert={handleFindExpert}
          onRecommendedPaths={handleRecommendedPaths}
          isSaving={isSaving}
        />
        <SignupPromptModal
          isOpen={showSignupPrompt}
          onClose={() => setShowSignupPrompt(false)}
          onSignup={handleSignup}
          results={validatedResults}
        />
      </>
    );
  }

  const currentQuestionData = QUESTIONS[currentQuestion];

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
        <div className="max-w-5xl mx-auto px-4 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-500/20"
          >
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-purple-200">
                  Kérdés {currentQuestion + 1} / {QUESTIONS.length}
                </span>
                <span className="text-sm font-medium text-purple-200">
                  {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}
                  %
                </span>
              </div>
              <div className="w-full bg-purple-500/10 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((currentQuestion + 1) / QUESTIONS.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="flex flex-col space-y-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    {currentQuestionData.text}
                  </h2>
                  <p className="text-purple-200/80 text-base">
                    Kérjük, válaszd ki azt az opciót, amelyik legjobban illik
                    hozzád.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Answer options */}
            <div className="flex flex-col space-y-4">
              {currentQuestionData.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option.id)}
                  className="w-full text-left p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 hover:border-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-purple-500/20 rounded-full text-purple-300 font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <p className="text-white text-base font-medium group-hover:text-purple-300 transition-colors">
                      {option.text}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Back button */}
            {currentQuestion > 0 && (
              <motion.button
                onClick={handleBack}
                className="mt-6 px-6 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Vissza
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CareerOrientationModule;
