import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CareerQuestion from "./CareerQuestion";
import CareerResults from "./CareerResults";
import { useNavigate, useLocation } from "react-router-dom";

// Career areas with detailed information
const CAREER_AREAS = {
  tech: {
    name: "Technológia és informatika",
    description:
      "A technológiai szektor folyamatosan fejlődő területe, ahol innovatív megoldásokat hozhatsz létre. Ide tartozik a szoftverfejlesztés, rendszerüzemeltetés, cyberbiztonság és más IT területek.",
    skills: ["logikus gondolkodás", "problémamegoldás", "folyamatos tanulás"],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Versenyképes, junior szinttől senior pozíciókig növekvő",
  },
  data_science: {
    name: "Adattudomány",
    description:
      "Az adatok elemzésével és értelmezésével foglalkozó terület, ahol matematikai és statisztikai módszerekkel segíted a döntéshozatalt.",
    skills: ["analitikus gondolkodás", "matematika", "programozás"],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Kiemelkedő",
  },
  science: {
    name: "Tudomány és kutatás",
    description:
      "A tudományos kutatás és felfedezés területe, ahol új tudományos ismereteket hozhatsz létre és fejlesztheted a tudományos módszereket.",
    skills: ["analitikus gondolkodás", "kreativitás", "folyamatos tanulás"],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Változó, kutatói pozíciók esetén versenyképes",
  },
  engineering: {
    name: "Mérnöki területek",
    description:
      "A mérnöki területek, ahol tervezel és építeszel infrastruktúrákat, gépeket és rendszereket.",
    skills: ["logikus gondolkodás", "problémamegoldás", "tervezés"],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  arts: {
    name: "Művészet és kultúra",
    description:
      "A művészet és kultúra területe, ahol kreativitásodat és tehetségedet fejlesztheted.",
    skills: ["kreativitás", "művészi látásmód", "önkifejezés"],
    growth_potential: "Változó",
    future_outlook: "Stabil",
    salary_range: "Változó, projektalapú",
  },
  design: {
    name: "Formatervezés és dizájn",
    description:
      "A formatervezés és dizájn területe, ahol a felhasználói élményt és a vizuális kommunikációt fejlesztheted.",
    skills: ["kreativitás", "dizájn képességek", "technikai ismeretek"],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Versenyképes",
  },
  marketing: {
    name: "Marketing és PR",
    description:
      "A marketing és PR területe, ahol a termékeket és szolgáltatásokat promócionálod és a vásárlói érdeklődést növeled.",
    skills: [
      "kreativitás",
      "kommunikációs készségek",
      "stratégiai gondolkodás",
    ],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  management: {
    name: "Menedzsment és vezetés",
    description:
      "A menedzsment és vezetés területe, ahol a csapatokat irányítod és a szervezeti célok elérését segíted elő.",
    skills: [
      "vezetői készségek",
      "kommunikációs készségek",
      "stratégiai gondolkodás",
    ],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Kiemelkedő",
  },
  healthcare: {
    name: "Egészségügy",
    description:
      "Az egészségügy területe, ahol a betegeket ápolod és segítsz a gyógyulásukban.",
    skills: ["kommunikációs készségek", "ápolási készségek", "szakmai tudás"],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Versenyképes",
  },
  education: {
    name: "Oktatás és képzés",
    description:
      "Az oktatás és képzés területe, ahol a tanulókat oktatod és segítsz a fejlődésükben.",
    skills: ["kommunikációs készségek", "tanítási készségek", "szakmai tudás"],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  entrepreneurship: {
    name: "Vállalkozás",
    description:
      "A vállalkozás területe, ahol saját üzletet alapítasz és vezetsz.",
    skills: [
      "vezetői készségek",
      "stratégiai gondolkodás",
      "vállalkozói készségek",
    ],
    growth_potential: "Nagy",
    future_outlook: "Változó",
    salary_range: "Változó, siker esetén kiemelkedő",
  },
  sales: {
    name: "Értékesítés",
    description:
      "Az értékesítés területe, ahol a termékeket és szolgáltatásokat promócionálod és eladod.",
    skills: [
      "kommunikációs készségek",
      "eladási készségek",
      "stratégiai gondolkodás",
    ],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes, bónuszokkal",
  },
  hospitality: {
    name: "Vendéglátás és turizmus",
    description:
      "A vendéglátás és turizmus területe, ahol a vendégeket fogadod és szolgálod.",
    skills: [
      "kommunikációs készségek",
      "szolgáltatási készségek",
      "kreativitás",
    ],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  research: {
    name: "Kutatás-fejlesztés",
    description:
      "A kutatás-fejlesztés területe, ahol új technológiákat és megoldásokat fejlesztesz.",
    skills: [
      "analitikus gondolkodás",
      "kutatási készségek",
      "folyamatos tanulás",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Versenyképes",
  },
  writing: {
    name: "Írás és kommunikáció",
    description:
      "Az írás és kommunikáció területe, ahol a tartalmakat íród és kommunikálsz.",
    skills: ["írási készségek", "kommunikációs készségek", "kreativitás"],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  media: {
    name: "Média és újságírás",
    description:
      "A média és újságírás területe, ahol a híreket íród és közölsz.",
    skills: ["írási készségek", "kommunikációs készségek", "kreativitás"],
    growth_potential: "Magas",
    future_outlook: "Változó",
    salary_range: "Versenyképes",
  },
  events: {
    name: "Rendezvényszervezés",
    description:
      "A rendezvényszervezés területe, ahol a rendezvényeket szervezöd és szervezel.",
    skills: ["szervezési készségek", "kommunikációs készségek", "kreativitás"],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  social_services: {
    name: "Szociális szolgáltatások",
    description:
      "A szociális szolgáltatások területe, ahol a közösségi szükségleteket segíted kielégíteni.",
    skills: ["kommunikációs készségek", "ápolási készségek", "szakmai tudás"],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  consulting: {
    name: "Tanácsadás",
    description:
      "A tanácsadás területe, ahol a szervezeteket tanácsolod és segítsz a problémáik megoldásában.",
    skills: [
      "analitikus gondolkodás",
      "kommunikációs készségek",
      "stratégiai gondolkodás",
    ],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Kiemelkedő",
  },
  finance: {
    name: "Pénzügy és számvitel",
    description:
      "A pénzügy és számvitel területe, ahol a pénzügyi adatokat elemzed és a szervezeti döntésekhez hozzájárulsz.",
    skills: [
      "analitikus gondolkodás",
      "számviteli készségek",
      "stratégiai gondolkodás",
    ],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Kiemelkedő",
  },
  architecture: {
    name: "Építészet",
    description:
      "Az építészet területe, ahol az épületeket tervezel és építeszel.",
    skills: ["tervezési készségek", "logikus gondolkodás", "problémamegoldás"],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  customer_service: {
    name: "Ügyfélszolgálat",
    description:
      "Az ügyfélszolgálat területe, ahol az ügyfelek igényeit figyelembe véve segítsz és támogatsz.",
    skills: [
      "kommunikációs készségek",
      "szolgáltatási készségek",
      "problémamegoldás",
    ],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  psychology: {
    name: "Pszichológia",
    description:
      "A pszichológia területe, ahol a személyiség és a viselkedés tanulmányozásával foglalkozol.",
    skills: [
      "kommunikációs készségek",
      "analitikus gondolkodás",
      "szakmai tudás",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Versenyképes",
  },
  law: {
    name: "Jog és igazságszolgáltatás",
    description:
      "A jog és igazságszolgáltatás területe, ahol a jogi kérdéseket tanulmányozod és megoldásokat hozol.",
    skills: ["analitikus gondolkodás", "írási készségek", "szakmai tudás"],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  academia: {
    name: "Akadémia és felsőoktatás",
    description:
      "Az akadémia és felsőoktatás területe, ahol a tanulmányokat és kutatásokat folytatod.",
    skills: ["analitikus gondolkodás", "írási készségek", "szakmai tudás"],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  social_work: {
    name: "Szociális munka",
    description:
      "A szociális munka területe, ahol a közösségi szükségleteket segíted kielégíteni.",
    skills: ["kommunikációs készségek", "ápolási készségek", "szakmai tudás"],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  real_estate: {
    name: "Ingatlan",
    description:
      "Az ingatlan területe, ahol az ingatlanokat vásárolod, eladod és kezeled.",
    skills: [
      "kommunikációs készségek",
      "stratégiai gondolkodás",
      "szakmai tudás",
    ],
    growth_potential: "Magas",
    future_outlook: "Változó",
    salary_range: "Versenyképes, bónuszokkal",
  },
  entertainment: {
    name: "Szórakoztatóipar",
    description:
      "A szórakoztatóipar területe, ahol a szórakoztató tartalmakat fejleszted és terjeszted.",
    skills: [
      "kreativitás",
      "kommunikációs készségek",
      "stratégiai gondolkodás",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Versenyképes",
  },
  hr: {
    name: "Emberi erőforrás",
    description:
      "Az emberi erőforrás területe, ahol a dolgozókat fejleszted és a szervezeti kultúrát építed.",
    skills: [
      "kommunikációs készségek",
      "vezetői készségek",
      "stratégiai gondolkodás",
    ],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Versenyképes",
  },
  creative_arts: {
    name: "Kreatív művészetek",
    description:
      "A művészi önkifejezés és alkotás területe, amely magában foglalja a vizuális művészeteket, előadóművészetet és digitális alkotást.",
    skills: ["kreativitás", "művészi látásmód", "önkifejezés"],
    growth_potential: "Változó",
    future_outlook: "Stabil",
    salary_range: "Változó, projektalapú",
  },
};

const QUESTIONS = [
  {
    id: 1,
    text: "Hogyan közelítesz meg egy új, komplex feladatot?",
    options: [
      {
        id: "a",
        text: "Részletes tervet készítek, és lépésről lépésre haladok",
        areas: ["tech", "engineering", "data_science"],
        weight: 1.5,
        traits: ["systematic", "analytical"],
      },
      {
        id: "b",
        text: "Kreatív ötletekkel és innovatív megoldásokkal kísérletezek",
        areas: ["design", "arts", "marketing"],
        weight: 1.4,
        traits: ["creative", "innovative"],
      },
      {
        id: "c",
        text: "Csapatot építek és delegálom a feladatokat",
        areas: ["management", "hr", "entrepreneurship"],
        weight: 1.3,
        traits: ["leadership", "collaborative"],
      },
      {
        id: "d",
        text: "Kutatással és adatelemzéssel kezdem",
        areas: ["research", "science", "finance"],
        weight: 1.5,
        traits: ["analytical", "detail_oriented"],
      },
      {
        id: "e",
        text: "Az emberek igényeit és érzéseit vizsgálom először",
        areas: ["psychology", "healthcare", "social_work"],
        weight: 1.4,
        traits: ["empathetic", "people_oriented"],
      },
    ],
    category: "approach",
  },
  {
    id: 2,
    text: "Mi motivál leginkább a munkában?",
    options: [
      {
        id: "a",
        text: "Új dolgok felfedezése és tanulása",
        areas: ["research", "science", "education"],
        weight: 1.3,
      },
      {
        id: "b",
        text: "Mások segítése és támogatása",
        areas: ["healthcare", "social_work", "psychology"],
        weight: 1.2,
      },
      {
        id: "c",
        text: "Kézzelfogható eredmények létrehozása",
        areas: ["engineering", "construction", "manufacturing"],
        weight: 1.1,
      },
      {
        id: "d",
        text: "Anyagi siker és előrelépés",
        areas: ["finance", "sales", "entrepreneurship"],
        weight: 1.0,
      },
      {
        id: "e",
        text: "Kreativitás és önkifejezés",
        areas: ["arts", "design", "media"],
        weight: 1.2,
      },
    ],
    category: "motivation",
  },
  {
    id: 3,
    text: "Milyen készségeid szeretnéd leginkább fejleszteni?",
    options: [
      {
        id: "a",
        text: "Technikai és programozási készségek",
        areas: ["tech", "data_science", "engineering"],
        weight: 1.3,
      },
      {
        id: "b",
        text: "Vezetői és szervezési képességek",
        areas: ["management", "entrepreneurship", "project_management"],
        weight: 1.2,
      },
      {
        id: "c",
        text: "Kommunikációs és prezentációs készségek",
        areas: ["marketing", "sales", "education"],
        weight: 1.1,
      },
      {
        id: "d",
        text: "Művészi és kreatív képességek",
        areas: ["design", "arts", "creative_writing"],
        weight: 1.2,
      },
      {
        id: "e",
        text: "Analitikus és stratégiai gondolkodás",
        areas: ["consulting", "research", "finance"],
        weight: 1.3,
      },
    ],
    category: "skills",
  },
  {
    id: 4,
    text: "Milyen típusú projektekben érzed magad a legjobban?",
    options: [
      {
        id: "a",
        text: "Hosszú távú, komplex projektek precíz kivitelezése",
        areas: ["engineering", "research", "science"],
        weight: 1.2,
      },
      {
        id: "b",
        text: "Gyors, dinamikus projektek változatos feladatokkal",
        areas: ["marketing", "media", "entrepreneurship"],
        weight: 1.1,
      },
      {
        id: "c",
        text: "Emberközpontú projektek, ahol másoknak segíthetek",
        areas: ["healthcare", "education", "social_work"],
        weight: 1.3,
      },
      {
        id: "d",
        text: "Kreatív projektek, ahol új dolgokat alkothatok",
        areas: ["design", "arts", "entertainment"],
        weight: 1.2,
      },
      {
        id: "e",
        text: "Stratégiai projektek, ahol üzleti célokat valósítunk meg",
        areas: ["management", "consulting", "finance"],
        weight: 1.2,
      },
    ],
    category: "work_style",
  },
  {
    id: 5,
    text: "Mi az, ami leginkább motivál egy munkakörnyezetben?",
    options: [
      {
        id: "a",
        text: "Szakmai fejlődés és új technológiák tanulása",
        areas: ["tech", "data_science", "engineering"],
        weight: 1.3,
      },
      {
        id: "b",
        text: "Pozitív társadalmi hatás és értékteremtés",
        areas: ["social_work", "education", "healthcare"],
        weight: 1.2,
      },
      {
        id: "c",
        text: "Versenyképes fizetés és előrelépési lehetőségek",
        areas: ["finance", "sales", "management"],
        weight: 1.1,
      },
      {
        id: "d",
        text: "Rugalmas munkavégzés és work-life balance",
        areas: ["writing", "design", "consulting"],
        weight: 1.0,
      },
      {
        id: "e",
        text: "Innovatív környezet és kreatív szabadság",
        areas: ["arts", "entrepreneurship", "media"],
        weight: 1.2,
      },
    ],
    category: "motivation",
  },
  {
    id: 6,
    text: "Hogyan szeretsz döntéseket hozni?",
    options: [
      {
        id: "a",
        text: "Adatok és tények alapos elemzésével",
        areas: ["data_science", "finance", "research"],
        weight: 1.3,
      },
      {
        id: "b",
        text: "Mások véleményének figyelembevételével, konszenzusra törekedve",
        areas: ["management", "hr", "education"],
        weight: 1.2,
      },
      {
        id: "c",
        text: "Gyorsan, az ösztöneimre hallgatva",
        areas: ["entrepreneurship", "sales", "media"],
        weight: 1.1,
      },
      {
        id: "d",
        text: "A lehetséges következmények alapos mérlegelésével",
        areas: ["law", "healthcare", "consulting"],
        weight: 1.2,
      },
      {
        id: "e",
        text: "Innovatív, nem konvencionális megoldásokat keresve",
        areas: ["design", "arts", "marketing"],
        weight: 1.2,
      },
    ],
    category: "decision_making",
  },
  {
    id: 7,
    text: "Milyen készségeidet szeretnéd leginkább használni a munkád során?",
    options: [
      {
        id: "a",
        text: "Elemző és logikai készségek",
        areas: ["tech", "finance", "engineering"],
        weight: 1.3,
      },
      {
        id: "b",
        text: "Kreativitás és művészi képességek",
        areas: ["design", "arts", "media"],
        weight: 1.2,
      },
      {
        id: "c",
        text: "Kommunikációs és kapcsolatépítési készségek",
        areas: ["sales", "hr", "marketing"],
        weight: 1.2,
      },
      {
        id: "d",
        text: "Szervezési és vezetői készségek",
        areas: ["management", "events", "project_management"],
        weight: 1.1,
      },
      {
        id: "e",
        text: "Empátia és segítőkészség",
        areas: ["healthcare", "social_work", "psychology"],
        weight: 1.3,
      },
    ],
    category: "skills",
  },
  {
    id: 8,
    text: "Milyen típusú sikerélmény motivál a legjobban?",
    options: [
      {
        id: "a",
        text: "Egy komplex probléma megoldása",
        areas: ["tech", "engineering", "science"],
        weight: 1.2,
      },
      {
        id: "b",
        text: "Mások fejlődésének és sikerének elősegítése",
        areas: ["education", "coaching", "healthcare"],
        weight: 1.3,
      },
      {
        id: "c",
        text: "Kézzelfogható eredmények és alkotások létrehozása",
        areas: ["design", "engineering", "arts"],
        weight: 1.2,
      },
      {
        id: "d",
        text: "Üzleti célok és pénzügyi eredmények elérése",
        areas: ["finance", "sales", "entrepreneurship"],
        weight: 1.1,
      },
      {
        id: "e",
        text: "Társadalmi hatás és pozitív változás elérése",
        areas: ["social_work", "nonprofit", "environmental"],
        weight: 1.3,
      },
    ],
    category: "achievement",
  },
  {
    id: 9,
    text: "Milyen munkakörnyezetet preferálsz?",
    options: [
      {
        id: "a",
        text: "Modern iroda, legújabb technológiákkal",
        areas: ["tech", "design", "media"],
        weight: 1.1,
      },
      {
        id: "b",
        text: "Változatos helyszínek, sok utazással",
        areas: ["sales", "consulting", "journalism"],
        weight: 1.2,
      },
      {
        id: "c",
        text: "Nyugodt, koncentrált munkakörnyezet",
        areas: ["research", "writing", "programming"],
        weight: 1.1,
      },
      {
        id: "d",
        text: "Dinamikus, csapatmunka-orientált környezet",
        areas: ["marketing", "events", "startup"],
        weight: 1.2,
      },
      {
        id: "e",
        text: "Emberközeli, szolgáltatás-orientált környezet",
        areas: ["healthcare", "education", "hospitality"],
        weight: 1.3,
      },
    ],
    category: "environment",
  },
  {
    id: 10,
    text: "Hogyan kezeled a stresszes helyzeteket?",
    options: [
      {
        id: "a",
        text: "Módszeres problémamegoldással és tervezéssel",
        areas: ["engineering", "project_management", "finance"],
        weight: 1.2,
      },
      {
        id: "b",
        text: "Rugalmasan alkalmazkodva a változásokhoz",
        areas: ["entrepreneurship", "sales", "hospitality"],
        weight: 1.1,
      },
      {
        id: "c",
        text: "Csapatmunkával és kommunikációval",
        areas: ["hr", "healthcare", "education"],
        weight: 1.3,
      },
      {
        id: "d",
        text: "Kreatív megoldások keresésével",
        areas: ["design", "marketing", "arts"],
        weight: 1.2,
      },
      {
        id: "e",
        text: "Tapasztalatra és rutinra támaszkodva",
        areas: ["management", "consulting", "law"],
        weight: 1.1,
      },
    ],
    category: "stress_management",
  },
];

const CareerOrientationModule = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [personalityProfile, setPersonalityProfile] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Reset state when the component mounts or when the location changes
  useEffect(() => {
    const resetState = () => {
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setIsCompleted(false);
      setResults(null);
      setPersonalityProfile({});
    };

    resetState();
    return () => resetState(); // Cleanup on unmount
  }, [location.key]);

  const handleAnswer = (questionId, answerId, areas) => {
    // Add answer to the state
    const newAnswers = [...answers, { questionId, answerId, areas }];
    setAnswers(newAnswers);

    // Move to the next question or show results
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers) => {
    const areaScores = {};
    const personalityTraits = {};
    const traitFrequency = {};

    // Első körben összegyűjtjük a trait-eket és területeket
    finalAnswers.forEach((answer) => {
      const question = QUESTIONS.find((q) => q.id === answer.questionId);
      const option = question.options.find((o) => o.id === answer.answerId);

      // Területek súlyozott számítása
      option.areas.forEach((area) => {
        areaScores[area] = (areaScores[area] || 0) + (option.weight || 1);
      });

      // Személyiségjegyek gyakoriságának számítása
      if (option.traits) {
        option.traits.forEach((trait) => {
          traitFrequency[trait] = (traitFrequency[trait] || 0) + 1;
        });
      }

      // Kategória alapú személyiségprofil
      if (question.category) {
        personalityTraits[question.category] =
          personalityTraits[question.category] || [];
        personalityTraits[question.category].push({
          optionId: option.id,
          traits: option.traits || [],
        });
      }
    });

    // Normalizáljuk a pontszámokat és súlyozzuk a gyakoriság alapján
    const maxScore = Math.max(...Object.values(areaScores));
    Object.keys(areaScores).forEach((area) => {
      const baseScore = (areaScores[area] / maxScore) * 100;
      const relevantTraits = CAREER_AREAS[area]?.required_traits || [];
      let traitBonus = 0;

      // Bónusz pontok a releváns személyiségjegyekért
      relevantTraits.forEach((trait) => {
        if (traitFrequency[trait]) {
          traitBonus += traitFrequency[trait] * 5; // 5% bónusz minden egyező személyiségjegyért
        }
      });

      areaScores[area] = Math.min(100, baseScore + traitBonus).toFixed(2);
    });

    // Rendezzük a területeket pontszám szerint
    const sortedAreas = Object.entries(areaScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Részletes eredmények létrehozása
    const resultAreas = sortedAreas.map(([areaId, score]) => ({
      id: areaId,
      name: CAREER_AREAS[areaId]?.name || areaId,
      description: CAREER_AREAS[areaId]?.description || "",
      score: parseFloat(score),
      skills: CAREER_AREAS[areaId]?.skills || [],
      required_traits: CAREER_AREAS[areaId]?.required_traits || [],
      matching_traits:
        CAREER_AREAS[areaId]?.required_traits?.filter(
          (trait) => traitFrequency[trait]
        ) || [],
      growthPotential: CAREER_AREAS[areaId]?.growth_potential || "Átlagos",
      futureOutlook: CAREER_AREAS[areaId]?.future_outlook || "Stabil",
      salaryRange: CAREER_AREAS[areaId]?.salary_range || "Változó",
      education_paths: CAREER_AREAS[areaId]?.education_paths || [],
      industry_insights: CAREER_AREAS[areaId]?.industry_insights || [],
    }));

    setResults(resultAreas);
    setPersonalityProfile({
      traits: traitFrequency,
      categories: personalityTraits,
    });
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
      {/* Modern animált háttér */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-6000"></div>
      </div>

      <motion.div
        key={location.key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-2xl border border-white/20"
      >
        {!isCompleted ? (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Részletes Pályaorientációs Teszt
              </h2>
              <p className="text-purple-200 text-lg">
                Fedezd fel a hozzád legjobban illő karrierutakat! A teszt segít
                megtalálni azokat a területeket, ahol a készségeid és
                érdeklődési köröd alapján a leginkább kibontakozhatnál.
              </p>
              <div className="mt-8 relative">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / QUESTIONS.length) * 100
                      }%`,
                    }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ((currentQuestionIndex + 1) / QUESTIONS.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-white mt-4 text-lg font-medium">
                  Kérdés: {currentQuestionIndex + 1} / {QUESTIONS.length}
                </p>
              </div>
            </div>

            <CareerQuestion
              key={currentQuestionIndex}
              question={QUESTIONS[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </>
        ) : (
          <CareerResults
            key="results"
            results={results}
            personalityProfile={personalityProfile}
            onFindExpert={handleFindExpert}
            onRecommendedPaths={handleRecommendedPaths}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CareerOrientationModule;
