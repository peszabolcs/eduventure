import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CareerQuestion from "./CareerQuestion";
import CareerResults from "./CareerResults";
import { useNavigate } from "react-router-dom";

// Sample questions data - this could be fetched from an API
const QUESTIONS = [
  {
    id: 1,
    text: "Hogyan oldanál meg egy komplex problémát?",
    options: [
      {
        id: "a",
        text: "Lépésről lépésre, logikus megközelítéssel",
        areas: ["tech", "science", "engineering"],
      },
      {
        id: "b",
        text: "Kreatív, újszerű megoldásokkal",
        areas: ["arts", "design", "marketing"],
      },
      {
        id: "c",
        text: "Csapatban dolgozva, különböző nézőpontokat figyelembe véve",
        areas: ["management", "healthcare", "education"],
      },
      {
        id: "d",
        text: "Intuíciómra és tapasztalataimra hagyatkozva",
        areas: ["entrepreneurship", "sales", "hospitality"],
      },
    ],
  },
  {
    id: 2,
    text: "Milyen környezetben szeretsz dolgozni?",
    options: [
      {
        id: "a",
        text: "Csendes, nyugodt környezetben, ahol elmélyülhetek a feladatokban",
        areas: ["tech", "research", "writing"],
      },
      {
        id: "b",
        text: "Dinamikus, változatos helyen, ahol mindig történik valami",
        areas: ["media", "marketing", "events"],
      },
      {
        id: "c",
        text: "Emberek között, ahol segíthetek másoknak",
        areas: ["healthcare", "education", "social_services"],
      },
      {
        id: "d",
        text: "Rugalmas helyen, ahol szabadon dönthetek a munkamódszerről",
        areas: ["arts", "entrepreneurship", "consulting"],
      },
    ],
  },
  {
    id: 3,
    text: "Milyen tevékenységet végeznél szívesen egész nap?",
    options: [
      {
        id: "a",
        text: "Adatelemzés, rendszerek optimalizálása",
        areas: ["data_science", "finance", "engineering"],
      },
      {
        id: "b",
        text: "Alkotás, tervezés, új ötletek kidolgozása",
        areas: ["design", "arts", "architecture"],
      },
      {
        id: "c",
        text: "Emberekkel való kommunikáció, segítségnyújtás",
        areas: ["customer_service", "psychology", "education"],
      },
      {
        id: "d",
        text: "Stratégiai tervezés, döntéshozatal",
        areas: ["management", "entrepreneurship", "consulting"],
      },
    ],
  },
  {
    id: 4,
    text: "Milyen elismerés motivál a leginkább?",
    options: [
      {
        id: "a",
        text: "Szakmai elismerés, szakértőként való elismertség",
        areas: ["science", "law", "academia"],
      },
      {
        id: "b",
        text: "Mások életére gyakorolt pozitív hatás",
        areas: ["healthcare", "social_work", "education"],
      },
      {
        id: "c",
        text: "Anyagi siker, jólét elérése",
        areas: ["finance", "sales", "real_estate"],
      },
      {
        id: "d",
        text: "Kreativitás és művészi kifejezés szabadsága",
        areas: ["arts", "design", "entertainment"],
      },
    ],
  },
  {
    id: 5,
    text: "Milyen típusú kihívásokat részesítesz előnyben?",
    options: [
      {
        id: "a",
        text: "Technikai problémák megoldása",
        areas: ["tech", "engineering", "science"],
      },
      {
        id: "b",
        text: "Emberi kapcsolatok kezelése",
        areas: ["hr", "psychology", "education"],
      },
      {
        id: "c",
        text: "Kreatív kihívások",
        areas: ["design", "marketing", "arts"],
      },
      {
        id: "d",
        text: "Üzleti és pénzügyi problémák",
        areas: ["finance", "entrepreneurship", "consulting"],
      },
    ],
  },
];

const CareerOrientationModule = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const handleAnswer = (questionId, answerId, areas) => {
    // Add answer to the state
    setAnswers([...answers, { questionId, answerId, areas }]);

    // Move to the next question or show results
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Count occurrences of each area
    const areaCounts = {};

    answers.forEach((answer) => {
      answer.areas.forEach((area) => {
        areaCounts[area] = (areaCounts[area] || 0) + 1;
      });
    });

    // Find the top areas
    const sortedAreas = Object.entries(areaCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map((entry) => entry[0]);

    // Area descriptions mapping
    const areaDescriptions = {
      tech: "Technológia és informatika",
      science: "Tudomány és kutatás",
      engineering: "Mérnöki területek",
      arts: "Művészet és kultúra",
      design: "Formatervezés és dizájn",
      marketing: "Marketing és PR",
      management: "Menedzsment és vezetés",
      healthcare: "Egészségügy",
      education: "Oktatás és képzés",
      entrepreneurship: "Vállalkozás",
      sales: "Értékesítés",
      hospitality: "Vendéglátás és turizmus",
      research: "Kutatás-fejlesztés",
      writing: "Írás és kommunikáció",
      media: "Média és újságírás",
      events: "Rendezvényszervezés",
      social_services: "Szociális szolgáltatások",
      consulting: "Tanácsadás",
      data_science: "Adattudomány",
      finance: "Pénzügy és számvitel",
      architecture: "Építészet",
      customer_service: "Ügyfélszolgálat",
      psychology: "Pszichológia",
      law: "Jog és igazságszolgáltatás",
      academia: "Akadémia és felsőoktatás",
      social_work: "Szociális munka",
      real_estate: "Ingatlan",
      entertainment: "Szórakoztatóipar",
      hr: "Emberi erőforrás",
    };

    // Create results object
    const resultAreas = sortedAreas.map((area) => ({
      id: area,
      name: areaDescriptions[area] || area,
      description: `A ${
        areaDescriptions[area] || area
      } terület illik a válaszaid alapján a személyiségedhez és preferenciáidhoz.`,
    }));

    setResults(resultAreas);
    setIsCompleted(true);
  };

  const handleFindExpert = () => {
    // Navigate to experts page or implement your logic
    navigate("/szakerto-kereso");
  };

  const handleRecommendedPaths = () => {
    // Navigate to recommended paths page or implement your logic
    navigate("/ajanlott-utak");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-2xl"
      >
        {!isCompleted ? (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Pályaorientációs Teszt
              </h2>
              <p className="text-purple-200">
                Válaszolj őszintén minden kérdésre, hogy megtalálhasd a hozzád
                legjobban illő területeket!
              </p>
              <div className="mt-4 w-full bg-white/30 h-2 rounded-full">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / QUESTIONS.length) * 100
                    }%`,
                  }}
                />
              </div>
              <p className="text-white mt-2 text-sm">
                {currentQuestionIndex + 1} / {QUESTIONS.length}
              </p>
            </div>

            <CareerQuestion
              question={QUESTIONS[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </>
        ) : (
          <CareerResults
            results={results}
            onFindExpert={handleFindExpert}
            onRecommendedPaths={handleRecommendedPaths}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CareerOrientationModule;
