import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CareerResults = ({
  results,
  personalityProfile,
  onFindExpert,
  onRecommendedPaths,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("careers"); // careers, personality

  if (!results || results.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Nincs elérhető eredmény
        </h2>
        <p className="text-purple-200 mb-6">
          Úgy tűnik, hogy az eredmények nem töltődtek be megfelelően. Kérjük,
          próbáld újra a tesztet.
        </p>
        <button
          onClick={() => {
            navigate("/palyaorientacio", { replace: true });
            window.location.reload();
          }}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
        >
          Teszt újrakezdése
        </button>
      </div>
    );
  }

  const personalityTraitDescriptions = {
    approach: {
      a: "Módszeres és strukturált megközelítés",
      b: "Innovatív és kreatív gondolkodás",
      c: "Vezetői és delegáló képesség",
      d: "Analitikus és kutatói szemlélet",
      e: "Empatikus és emberközpontú hozzáállás",
    },
    problem_solving: {
      a: "Logikus és módszeres problémamegoldás",
      b: "Kreatív problémamegoldás",
      c: "Csapatmunka-orientált megközelítés",
      d: "Intuitív döntéshozatal",
      e: "Adatvezérelt gondolkodás",
    },
    motivation: {
      a: "Tudásvágy és fejlődés",
      b: "Szociális érzékenység",
      c: "Gyakorlatias szemlélet",
      d: "Eredményorientált",
      e: "Művészi hajlam",
    },
    skills: {
      a: "Technikai érdeklődés",
      b: "Vezetői készségek",
      c: "Kommunikációs készségek",
      d: "Művészi készségek",
      e: "Stratégiai gondolkodás",
    },
    work_style: {
      a: "Precíz, hosszú távú fókusz",
      b: "Dinamikus, változatos munka",
      c: "Emberközpontú megközelítés",
      d: "Kreatív alkotómunka",
      e: "Stratégiai tervezés",
    },
    decision_making: {
      a: "Adatvezérelt döntéshozatal",
      b: "Konszenzuskereső",
      c: "Gyors, intuitív",
      d: "Megfontolt, elemző",
      e: "Innovatív megközelítés",
    },
    achievement: {
      a: "Technikai kiválóság",
      b: "Társadalmi hatás",
      c: "Kézzelfogható eredmények",
      d: "Üzleti siker",
      e: "Pozitív változás",
    },
    environment: {
      a: "Modern technológiai környezet",
      b: "Változatos, utazós munka",
      c: "Nyugodt, fókuszált környezet",
      d: "Dinamikus csapatmunka",
      e: "Szolgáltatás-orientált",
    },
    stress_management: {
      a: "Strukturált problémamegoldás",
      b: "Rugalmas alkalmazkodás",
      c: "Csapatmunka-orientált",
      d: "Kreatív megoldások",
      e: "Tapasztalat-alapú",
    },
    tech_interests: {
      a: "Mesterséges intelligencia és adatvezérelt fejlesztés",
      b: "Fenntarthatóság és zöld technológiák",
      c: "Virtuális és kiterjesztett valóság",
      d: "Egészségügyi technológiák",
      e: "Blockchain és decentralizált rendszerek",
    },
    crisis_management: {
      a: "Tervező és újraszervező",
      b: "Erőforrás-orientált",
      c: "Stratégiai priorizáló",
      d: "Csapatmunka-központú",
      e: "Innovatív problémamegoldó",
    },
    work_environment: {
      a: "Strukturált környezet kedvelése",
      b: "Kreatív, autonóm munkastílus",
      c: "Csapatmunka-orientált szemlélet",
      d: "Célorientált, versengő attitűd",
      e: "Rugalmas munkavégzés preferálása",
    },
    tech_adaptability: {
      a: "Korai technológia-adoptáló",
      b: "Pragmatikus technológia-használó",
      c: "Egyensúlykereső szemlélet",
      d: "Emberközpontú technológia-használat",
      e: "Innovátor és technológiafejlesztő",
    },
    employer_preferences: {
      a: "Innovatív munkakörnyezet-orientált",
      b: "Társadalmi hatás-fókuszú",
      c: "Szakmai fejlődés-központú",
      d: "Presztízs- és státusz-orientált",
      e: "Munka-magánélet egyensúly-orientált",
    },
  };

  const getPersonalityInsights = () => {
    const insights = {};

    if (!personalityProfile?.categories) return insights;

    Object.entries(personalityProfile.categories).forEach(
      ([category, answers]) => {
        if (!answers || !Array.isArray(answers)) return;

        // Deduplicate traits by using a Set
        const traitsSet = new Set();

        answers.forEach((answer) => {
          const categoryTraits = personalityTraitDescriptions[category];
          if (categoryTraits && categoryTraits[answer.optionId]) {
            traitsSet.add(categoryTraits[answer.optionId]);
          }
        });

        const traits = Array.from(traitsSet);

        if (traits.length > 0) {
          insights[category] = traits;
        }
      }
    );

    return insights;
  };

  const personalityInsights = getPersonalityInsights();

  const getCategoryTitle = (category) => {
    const titles = {
      problem_solving: "Problémamegoldás",
      motivation: "Motiváció",
      skills: "Készségek",
      work_style: "Munkastílus",
      decision_making: "Döntéshozatal",
      achievement: "Sikerorientáció",
      environment: "Munkakörnyezet",
      stress_management: "Stresszkezelés",
      approach: "Megközelítés",
      tech_interests: "Technológiai érdeklődés",
      crisis_management: "Kríziskezelés",
      work_environment: "Munkakörnyezeti preferenciák",
      tech_adaptability: "Technológiai adaptáció",
      employer_preferences: "Munkáltatói preferenciák",
    };
    return titles[category] || category;
  };

  // Group personality insights by themes
  const groupedInsights = {
    Gondolkodásmód: ["approach", "problem_solving", "decision_making"],
    Munkastílus: ["work_style", "stress_management", "work_environment"],
    "Érdeklődés és motiváció": [
      "motivation",
      "tech_interests",
      "employer_preferences",
    ],
    "Készségek és képességek": [
      "skills",
      "crisis_management",
      "tech_adaptability",
    ],
    "Célok és teljesítmény": ["achievement"],
  };

  // Generate default matching traits if none are provided
  const generateDefaultMatchingTraits = (result) => {
    if (!result.matching_traits || result.matching_traits.length === 0) {
      return [
        "Problémamegoldó képesség",
        "Kommunikációs készség",
        "Analitikus gondolkodás",
      ];
    }
    return result.matching_traits;
  };

  return (
    <div className="space-y-8 pt-24">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          Karrierprofilod Eredményei
        </h2>
        <p className="text-purple-200 text-lg max-w-3xl mx-auto">
          A válaszaid alapján részletes elemzést készítettünk a személyiségedről
          és a hozzád legjobban illő karrierterületekről.
        </p>
      </div>

      {/* Tabs for navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-full p-1 border border-white/20 flex">
          <button
            onClick={() => setActiveTab("careers")}
            className={`px-6 py-2 rounded-full transition-all duration-200 ${
              activeTab === "careers"
                ? "bg-white/10 text-white font-medium"
                : "text-purple-300 hover:text-white"
            }`}
          >
            Top 5 Karrierút
          </button>
          <button
            onClick={() => setActiveTab("personality")}
            className={`px-6 py-2 rounded-full transition-all duration-200 ${
              activeTab === "personality"
                ? "bg-white/10 text-white font-medium"
                : "text-purple-300 hover:text-white"
            }`}
          >
            Személyiségprofil
          </button>
        </div>
      </div>

      {/* Career Results Section */}
      {activeTab === "careers" && (
        <div className="space-y-6">
          {/* Score chart at the top */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-xl font-medium text-purple-300 mb-6 text-center">
              Karrier kompatibilitás
            </h3>
            <div className="flex items-end justify-center space-x-12">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  className="flex flex-col items-center w-24"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <motion.div
                    className="w-full flex items-end justify-center"
                    initial={{ height: 0 }}
                    animate={{
                      height: `${Math.max(15, (result.score / 100) * 180)}px`,
                    }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  >
                    <div
                      className="w-16 rounded-t-lg bg-gradient-to-t from-blue-600 to-purple-600"
                      style={{
                        height: `${Math.max(15, (result.score / 100) * 180)}px`,
                        opacity: 0.6 + 0.4 * (1 - index * 0.15),
                      }}
                    ></div>
                  </motion.div>
                  <p className="text-white font-medium mt-2">{result.score}%</p>
                  <div className="h-16 flex items-center mt-1">
                    <p
                      className="text-purple-300 text-sm text-center w-28 break-words hyphens-auto"
                      title={result.name}
                    >
                      {result.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Career Cards - Display in grid for larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/20 hover:border-white/30 transition-all overflow-hidden h-full flex flex-col"
              >
                {/* Header section with progress bar */}
                <div className="relative">
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">
                      {result.name}
                    </h3>
                    <div className="flex items-center">
                      <div className="text-right">
                        <div className="flex items-center">
                          <span className="text-sm text-purple-300 mr-2">
                            Egyezés:
                          </span>
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            {result.score}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-purple-200 text-base mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-300">
                    {result.description}
                  </p>

                  {/* Two-column layout for details */}
                  <div className="grid grid-cols-1 gap-4 flex-grow">
                    {/* Skills Section */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-base font-medium text-purple-300 mb-2 flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          ></path>
                        </svg>
                        Szükséges készségek
                      </h4>
                      <ul className="space-y-1">
                        {result.skills.slice(0, 4).map((skill, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-purple-100 text-sm"
                          >
                            <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2"></span>
                            {skill}
                          </li>
                        ))}
                        {result.skills.length > 4 && (
                          <li className="text-purple-300 text-xs italic">
                            +{result.skills.length - 4} további...
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Personality Match Section */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-base font-medium text-purple-300 mb-2 flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Személyiségjegyek egyezése
                      </h4>
                      <div className="space-y-1">
                        {generateDefaultMatchingTraits(result)
                          .slice(0, 3)
                          .map((trait, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-purple-100 text-sm"
                            >
                              <span className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-2"></span>
                              {trait}
                            </div>
                          ))}
                        {generateDefaultMatchingTraits(result).length > 3 && (
                          <p className="text-purple-300 text-xs italic">
                            +{generateDefaultMatchingTraits(result).length - 3}{" "}
                            további...
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Career Outlook Section */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-base font-medium text-purple-300 mb-2 flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                        Karrierkilátások
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-xs text-purple-300 flex items-center">
                              Növekedési potenciál
                            </p>
                            <div className="flex items-center">
                              {Array.from({
                                length: getGrowthLevel(result.growthPotential),
                              }).map((_, i) => (
                                <span
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 ml-1"
                                ></span>
                              ))}
                            </div>
                          </div>
                          <p className="text-purple-100 text-xs">
                            {result.growthPotential}
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-xs text-purple-300 flex items-center">
                              Jövőkép
                            </p>
                            <div className="flex items-center">
                              {Array.from({
                                length: getOutlookLevel(result.futureOutlook),
                              }).map((_, i) => (
                                <span
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 ml-1"
                                ></span>
                              ))}
                            </div>
                          </div>
                          <p className="text-purple-100 text-xs">
                            {result.futureOutlook}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-purple-300 mb-1 flex items-center">
                            Fizetési sáv
                          </p>
                          <p className="text-purple-100 text-xs">
                            {result.salaryRange}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() =>
                      window.open(`/karrier-reszletek/${result.id}`, "_blank")
                    }
                    className="mt-4 w-full py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <span>Részletek megtekintése</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Personality Profile Section */}
      {activeTab === "personality" && (
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-white/20">
          <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 text-center">
            Személyiségprofilod
          </h3>

          {Object.entries(groupedInsights).map(
            ([groupName, categories], groupIndex) => (
              <div key={groupName} className="mb-8">
                <h4 className="text-xl font-medium text-white mb-4 border-b border-white/10 pb-2">
                  {groupName}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categories.map((category) =>
                    personalityInsights[category] ? (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all"
                      >
                        <h5 className="text-base font-medium text-purple-300 mb-2">
                          {getCategoryTitle(category)}
                        </h5>
                        <ul className="space-y-1.5">
                          {personalityInsights[category].map((trait, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                              className="flex items-start text-purple-100 text-sm"
                            >
                              <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2 mt-1.5"></span>
                              {trait}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : null
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            if (typeof onFindExpert === "function") {
              onFindExpert();
            } else {
              navigate("/szakerto-kereso");
            }
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
        >
          <span className="mr-2">🎯</span>
          Találj szakértőt ezen a területen
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            if (typeof onRecommendedPaths === "function") {
              onRecommendedPaths();
            } else {
              navigate("/ajanlott-utak");
            }
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
        >
          <span className="mr-2">🗺️</span>
          Ajánlott karrierutak
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            navigate("/palyaorientacio", { replace: true });
            window.location.reload();
          }}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
        >
          <span className="mr-2">🔄</span>
          Teszt újrakezdése
        </motion.button>
      </div>
    </div>
  );
};

// Helper functions for ratings visualization
function getGrowthLevel(potential) {
  const levels = {
    Alacsony: 1,
    Átlagos: 2,
    Mérsékelt: 2,
    Nagy: 3,
    Magas: 4,
    Kiemelkedő: 5,
  };
  return levels[potential] || 3;
}

function getOutlookLevel(outlook) {
  const levels = {
    Bizonytalan: 1,
    Változó: 2,
    Stabil: 3,
    Kedvező: 4,
    Kiváló: 5,
  };
  return levels[outlook] || 3;
}

export default CareerResults;
