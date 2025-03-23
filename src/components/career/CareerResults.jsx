import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CareerResults = ({
  results,
  personalityProfile,
  onFindExpert,
  onRecommendedPaths,
}) => {
  const navigate = useNavigate();

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
  };

  const getPersonalityInsights = () => {
    const insights = {};

    if (!personalityProfile?.categories) return insights;

    Object.entries(personalityProfile.categories).forEach(
      ([category, answers]) => {
        if (!answers || !Array.isArray(answers)) return;

        const traits = answers
          .map((answer) => {
            const categoryTraits = personalityTraitDescriptions[category];
            return categoryTraits ? categoryTraits[answer.optionId] : null;
          })
          .filter(Boolean);

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
    };
    return titles[category] || category;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          Karrierprofilod Eredményei
        </h2>
        <p className="text-purple-200 text-lg">
          A válaszaid alapján részletes elemzést készítettünk a személyiségedről
          és a hozzád legjobban illő karrierterületekről.
        </p>
      </div>

      {/* Personality Profile Section */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 mb-8 border border-white/20">
        <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
          Személyiségprofilod
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(personalityInsights).map(([category, traits]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <h4 className="text-xl font-medium text-purple-300 mb-4">
                {getCategoryTitle(category)}
              </h4>
              <ul className="space-y-3">
                {traits.map((trait, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center text-purple-100"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
                    {trait}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Career Results Section */}
      <div className="space-y-6">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:border-white/30 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{result.name}</h3>
              <div className="flex items-center">
                <div className="text-right">
                  <p className="text-sm text-purple-300 mb-1">Egyezési arány</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {result.score}%
                  </p>
                </div>
              </div>
            </div>

            <p className="text-purple-200 text-lg mb-6">{result.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-lg font-medium text-purple-300 mb-4">
                  Szükséges készségek
                </h4>
                <ul className="space-y-2">
                  {result.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center text-purple-100">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-lg font-medium text-purple-300 mb-4">
                  Személyiségjegyek egyezése
                </h4>
                <div className="space-y-2">
                  {result.matching_traits.map((trait, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-purple-100"
                    >
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-2"></span>
                      {trait}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-lg font-medium text-purple-300 mb-4">
                  Karrierkilátások
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-purple-300 mb-1">
                      Növekedési potenciál
                    </p>
                    <p className="text-purple-100">{result.growthPotential}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300 mb-1">Jövőkép</p>
                    <p className="text-purple-100">{result.futureOutlook}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300 mb-1">Fizetési sáv</p>
                    <p className="text-purple-100">{result.salaryRange}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Paths Section */}
            {result.education_paths && result.education_paths.length > 0 && (
              <div className="mt-6 p-6 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-lg font-medium text-purple-300 mb-4">
                  Ajánlott képzési utak
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.education_paths.map((path, idx) => (
                    <div key={idx} className="text-purple-100">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2"></span>
                      {path}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Industry Insights Section */}
            {result.industry_insights &&
              result.industry_insights.length > 0 && (
                <div className="mt-6 p-6 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-lg font-medium text-purple-300 mb-4">
                    Iparági betekintések
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {result.industry_insights.map((insight, idx) => (
                      <div key={idx} className="text-purple-100">
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2"></span>
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (typeof onFindExpert === "function") {
              onFindExpert();
            } else {
              navigate("/szakerto-kereso");
            }
          }}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
        >
          <span className="mr-2">🎯</span>
          Találj szakértőt ezen a területen
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (typeof onRecommendedPaths === "function") {
              onRecommendedPaths();
            } else {
              navigate("/ajanlott-utak");
            }
          }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
        >
          <span className="mr-2">🗺️</span>
          Ajánlott karrierutak
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate("/palyaorientacio", { replace: true });
            window.location.reload();
          }}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
        >
          <span className="mr-2">🔄</span>
          Teszt újrakezdése
        </motion.button>
      </div>
    </div>
  );
};

export default CareerResults;
