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

const CareerOrientationModule = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [personalityProfile, setPersonalityProfile] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  // Reset state when the component mounts or when the location changes
  useEffect(() => {
    const resetState = () => {
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResults(false);
      setResults(null);
      setPersonalityProfile({});
      setIsSaving(false);
    };

    resetState();
    return () => resetState(); // Cleanup on unmount
  }, [location.key]);

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

      // Save the results
      try {
        setIsSaving(true);
        const response = await fetch(
          `${API_URL}/backend/save_career_result.php`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              results: {
                career_matches: calculatedResults.career_matches,
                personality_profile: calculatedResults.personality_profile,
              },
              personality_profile: calculatedResults.personality_profile,
              answers: newAnswers,
            }),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (!data.success) {
          console.error("Failed to save career results:", data.error);
          // Show error notification to user
          alert("Hiba történt az eredmények mentése közben: " + data.error);
        } else {
          // Show success notification
          alert("Az eredmények sikeresen elmentve!");
        }
      } catch (error) {
        console.error("Error saving career results:", error);
        alert(
          "Hiba történt az eredmények mentése közben. Kérjük, próbáld újra!"
        );
      } finally {
        setIsSaving(false);
      }
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
        holland_codes: hollandCodes,
        cognitive_skills: cognitiveSkills,
        work_environments: workEnvironments,
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
    return (
      <CareerResults
        results={results}
        personalityProfile={personalityProfile}
        onFindExpert={handleFindExpert}
        onRecommendedPaths={handleRecommendedPaths}
        isSaving={isSaving}
      />
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
