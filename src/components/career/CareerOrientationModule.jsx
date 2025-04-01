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
  const navigate = useNavigate();
  const location = useLocation();

  // Reset state when the component mounts or when the location changes
  useEffect(() => {
    const resetState = () => {
      setCurrentQuestion(0);
      setAnswers([]);
      setShowResults(false);
      setResults(null);
      setPersonalityProfile({});
    };

    resetState();
    return () => resetState(); // Cleanup on unmount
  }, [location.key]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const calculatedResults = calculateResults(newAnswers);
      setResults(calculatedResults);
      setPersonalityProfile(calculatedResults.personality_profile);
      setShowResults(true);
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
      const finalScore = totalWeight > 0 ? matchScore / totalWeight : 0;

      return {
        id,
        title: area.name,
        description: area.description,
        score: Math.round(finalScore * 100),
        skills: area.skills,
        growthPotential: area.growth_potential,
        futureOutlook: area.future_outlook,
        salaryRange: area.salary_range,
        matching_traits: generateMatchingTraits(
          hollandCodes,
          cognitiveSkills,
          area
        ),
        specializations: area.specializations,
      };
    });

    // Eredmények rendezése egyezési pontszám szerint
    return matches.sort((a, b) => b.score - a.score).slice(0, 5);
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
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CareerOrientationModule;
