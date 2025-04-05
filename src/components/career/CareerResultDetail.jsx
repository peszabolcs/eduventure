import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  ArrowLeft,
  ChevronRight,
  Calendar,
  Briefcase,
  User,
  BarChart3,
  Brain,
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Building2,
  GraduationCap,
  Award,
  Heart,
  Zap,
  Shield,
  Lightbulb,
} from "lucide-react";

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

export default function CareerResultDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("careers");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await fetch(
          `${API_URL}/backend/get_career_result.php?id=${id}`,
          {
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setResult(data.result);
        } else {
          if (
            data.error === "Érvénytelen munkamenet" ||
            data.error === "Nincs bejelentkezett felhasználó"
          ) {
            // Ha session probléma van, átirányítjuk a bejelentkezési oldalra
            alert("A munkamenete lejárt. Kérjük, jelentkezzen be újra!");
            navigate("/login");
            return;
          }
          setError(data.error || "Nem sikerült betölteni az eredményt");
        }
      } catch (error) {
        setError("Hiba történt az eredmény betöltése közben");
        console.error("Failed to fetch career result:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id, API_URL]);

  const getGrowthLevel = (text) => {
    const levels = {
      Kivételes: 5,
      Magas: 4,
      Jó: 3,
      Átlagos: 2,
      Alacsony: 1,
    };
    return levels[text] || 0;
  };

  const getOutlookLevel = (text) => {
    const levels = {
      Kivételes: 5,
      Magas: 4,
      Jó: 3,
      Átlagos: 2,
      Alacsony: 1,
    };
    return levels[text] || 0;
  };

  // Transform the data to match the expected structure
  const transformCareerData = (career) => {
    return {
      id: career.id,
      title: career.name || career.title,
      description: career.description || "Nincs elérhető leírás",
      score: career.score || 0,
      requiredSkills: career.required_skills || career.requiredSkills || [],
      matchingTraits: career.matching_traits || career.matchingTraits || [],
      growthPotential:
        career.growth_potential || career.growthPotential || "Átlagos",
      futureOutlook: career.future_outlook || career.futureOutlook || "Átlagos",
      salaryRange: career.salary_range || career.salaryRange || "Nem elérhető",
      workEnvironment:
        career.work_environment || career.workEnvironment || "Nem elérhető",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <Button
            onClick={() => navigate("/profile")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Vissza a profilhoz
          </Button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">
            Az eredmény nem található
          </div>
          <Button
            onClick={() => navigate("/profile")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Vissza a profilhoz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 pt-32">
        <Button
          onClick={() => navigate("/profile")}
          variant="ghost"
          className="mb-8 text-purple-300 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Vissza a profilhoz
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              Karrier Eredmények
            </h1>
            <div className="flex items-center justify-center gap-6 text-purple-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(result.date).toLocaleDateString("hu-HU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <span>{result.results.length} Karrierút</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("careers")}
              className={`px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                activeTab === "careers"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/5 text-purple-300 hover:bg-white/10"
              }`}
            >
              <Briefcase className="h-5 w-5" />
              Ajánlott Karrierek
            </button>
            <button
              onClick={() => setActiveTab("personality")}
              className={`px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                activeTab === "personality"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/5 text-purple-300 hover:bg-white/10"
              }`}
            >
              <User className="h-5 w-5" />
              Személyiségprofil
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === "careers" ? (
              <motion.div
                key="careers"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Score chart at the top */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-medium text-purple-300 mb-6 text-center">
                    Karrier kompatibilitás
                  </h3>
                  <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-8 md:gap-12">
                    {result.results.map((career, index) => {
                      const transformedCareer = transformCareerData(career);
                      return (
                        <motion.div
                          key={transformedCareer.id}
                          className="flex flex-col items-center w-20 sm:w-24"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          <motion.div
                            className="w-full flex items-end justify-center"
                            initial={{ height: 0 }}
                            animate={{
                              height: `${Math.max(
                                15,
                                (transformedCareer.score / 100) * 180
                              )}px`,
                            }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.2 + 0.3,
                            }}
                          >
                            <div
                              className="w-12 sm:w-16 rounded-t-lg bg-gradient-to-t from-blue-600 to-purple-600"
                              style={{
                                height: `${Math.max(
                                  15,
                                  (transformedCareer.score / 100) * 180
                                )}px`,
                                opacity: 0.6 + 0.4 * (1 - index * 0.15),
                              }}
                            ></div>
                          </motion.div>
                          <p className="text-white font-medium mt-2 text-sm sm:text-base">
                            {transformedCareer.score}%
                          </p>
                          <div className="h-16 flex items-center mt-1">
                            <p
                              className="text-purple-300 text-xs sm:text-sm text-center w-20 sm:w-28 break-words hyphens-auto"
                              title={transformedCareer.title}
                            >
                              {transformedCareer.title}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Career Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {result.results.map((career, index) => {
                    const transformedCareer = transformCareerData(career);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden"
                      >
                        {/* Header section with progress bar */}
                        <div className="relative">
                          <div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${transformedCareer.score}%` }}
                          ></div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                              {transformedCareer.title}
                            </h3>
                            <div className="flex items-center">
                              <div className="text-right">
                                <div className="flex items-center">
                                  <span className="text-sm text-purple-300 mr-2">
                                    Egyezés:
                                  </span>
                                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    {transformedCareer.score}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-purple-200 text-base mb-6 line-clamp-3 hover:line-clamp-none transition-all duration-300">
                            {transformedCareer.description}
                          </p>

                          {/* Career Details Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Skills Section */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <h4 className="text-base font-medium text-purple-300 mb-3 flex items-center">
                                <GraduationCap className="w-4 h-4 mr-2 text-purple-400" />
                                Szükséges készségek
                              </h4>
                              <ul className="space-y-2">
                                {transformedCareer.requiredSkills &&
                                transformedCareer.requiredSkills.length > 0 ? (
                                  transformedCareer.requiredSkills.map(
                                    (skill, idx) => (
                                      <li
                                        key={idx}
                                        className="text-purple-200/70 text-sm flex items-center gap-2"
                                      >
                                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                                        {skill}
                                      </li>
                                    )
                                  )
                                ) : (
                                  <li className="text-purple-200/70 text-sm italic">
                                    Nincs elérhető készséglista
                                  </li>
                                )}
                              </ul>
                            </div>

                            {/* Personality Match Section */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <h4 className="text-base font-medium text-purple-300 mb-3 flex items-center">
                                <Heart className="w-4 h-4 mr-2 text-green-400" />
                                Személyiségjegyek egyezése
                              </h4>
                              <ul className="space-y-2">
                                {transformedCareer.matchingTraits.map(
                                  (trait, idx) => (
                                    <li
                                      key={idx}
                                      className="text-purple-200/70 text-sm flex items-center gap-2"
                                    >
                                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                      {trait}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            {/* Career Outlook Section */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <h4 className="text-base font-medium text-purple-300 mb-3 flex items-center">
                                <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
                                Karrierkilátások
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <p className="text-xs text-purple-300">
                                      Növekedési potenciál
                                    </p>
                                    <div className="flex items-center">
                                      {Array.from({
                                        length: getGrowthLevel(
                                          transformedCareer.growthPotential
                                        ),
                                      }).map((_, i) => (
                                        <span
                                          key={i}
                                          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 ml-1"
                                        ></span>
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-purple-100 text-xs">
                                    {transformedCareer.growthPotential}
                                  </p>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <p className="text-xs text-purple-300">
                                      Jövőkép
                                    </p>
                                    <div className="flex items-center">
                                      {Array.from({
                                        length: getOutlookLevel(
                                          transformedCareer.futureOutlook
                                        ),
                                      }).map((_, i) => (
                                        <span
                                          key={i}
                                          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 ml-1"
                                        ></span>
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-purple-100 text-xs">
                                    {transformedCareer.futureOutlook}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Salary and Work Environment */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <h4 className="text-base font-medium text-purple-300 mb-3 flex items-center">
                                <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
                                Fizetés és környezet
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-purple-300 mb-1">
                                    Fizetési sáv
                                  </p>
                                  <p className="text-purple-100 text-xs">
                                    {transformedCareer.salaryRange}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-purple-300 mb-1">
                                    Munkakörnyezet
                                  </p>
                                  <p className="text-purple-100 text-xs">
                                    {transformedCareer.workEnvironment}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="personality"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {Object.entries(result.personalityProfile.categories).map(
                  ([category, answers], index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 group"
                    >
                      <h3 className="text-lg font-medium text-white mb-4 group-hover:text-purple-300 transition-colors duration-300 flex items-center gap-2">
                        {getCategoryTitle(category)}
                      </h3>
                      <ul className="space-y-3">
                        {answers.map((answer, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="text-purple-300/70 flex items-start gap-3 group/item"
                          >
                            <span className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 group-hover/item:bg-purple-300 transition-colors duration-300"></span>
                            <span className="group-hover/item:text-purple-200 transition-colors duration-300">
                              {personalityTraitDescriptions[category]?.[
                                answer.optionId
                              ] || answer.optionId}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
