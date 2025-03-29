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
    skills: [
      "logikus gondolkodás",
      "problémamegoldás",
      "folyamatos tanulás",
      "technikai készségek",
      "rendszerszintű gondolkodás",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Versenyképes, junior szinttől senior pozíciókig növekvő",
    required_traits: [
      "analytical",
      "systematic",
      "detail_oriented",
      "innovative",
    ],
    education_paths: [
      "Informatikai BSc/MSc",
      "Programozói bootcamp",
      "Mérnökinformatikus képzés",
      "DevOps/Cloud engineer képzések",
      "Cybersecurity specializáció",
    ],
    industry_insights: [
      "A mesterséges intelligencia és gépi tanulás területén folyamatos növekedés várható",
      "A távmunka és hibrid munkavégzés tartósan megmarad az IT szektorban",
      "A cyberbiztonság szerepe egyre fontosabbá válik minden vállalatnál",
    ],
  },
  data_science: {
    name: "Adattudomány",
    description:
      "Az adatok elemzésével és értelmezésével foglalkozó terület, ahol matematikai és statisztikai módszerekkel segíted a döntéshozatalt és új meglátásokat nyersz ki a nagy adathalmazokból.",
    skills: [
      "analitikus gondolkodás",
      "matematika",
      "programozás",
      "statisztika",
      "vizualizációs készségek",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Kiemelkedő",
    required_traits: [
      "analytical",
      "detail_oriented",
      "systematic",
      "innovative",
    ],
    education_paths: [
      "Adattudomány MSc",
      "Statisztika vagy Matematika BSc/MSc",
      "Business Intelligence képzések",
      "Machine Learning specializáció",
      "Big Data elemzői tanfolyamok",
    ],
    industry_insights: [
      "Az adatvezérelt döntéshozatal kulcsfontosságú lesz minden iparágban",
      "Megnövekedett igény az etikus AI és adatelemzés szakemberek iránt",
      "Az üzleti elemző és data scientist pozíciók száma folyamatosan emelkedik",
    ],
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
  digital_marketing: {
    name: "Digitális marketing",
    description:
      "A digitális marketing az online csatornákon történő marketingtevékenységekre fókuszál, beleértve a közösségi média, SEO, SEM, és email marketinget.",
    skills: [
      "kreativitás",
      "analitikus gondolkodás",
      "tartalom készítés",
      "social media menedzsment",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Versenyképes, tapasztalat-függő",
    required_traits: [
      "creative",
      "innovative",
      "analytical",
      "people_oriented",
    ],
    education_paths: [
      "Marketing vagy Kommunikáció BSc",
      "Digitális marketing szakirány",
      "Google/Facebook/Instagram hirdetési tanfolyamok",
      "Tartalommarketing képzések",
    ],
    industry_insights: [
      "A személyre szabott marketing és célzás egyre fontosabbá válik",
      "A videó és interaktív tartalmak dominálják a jövő marketingjét",
      "Az adatvezérelt marketing stratégiák alapvető elvárássá válnak",
    ],
  },
  product_management: {
    name: "Termékmenedzsment",
    description:
      "A termékmenedzsment a termékek teljes életciklusát felügyeli, a fejlesztéstől a piacra dobáson át a továbbfejlesztésig.",
    skills: [
      "stratégiai gondolkodás",
      "kommunikációs készségek",
      "projektmenedzsment",
      "üzleti érzék",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Kiemelkedő",
    required_traits: [
      "leadership",
      "collaborative",
      "analytical",
      "innovative",
    ],
    education_paths: [
      "Üzleti vagy Menedzsment BSc/MSc",
      "Product Management képzések",
      "Agilis módszertanok tanfolyamai",
      "UX/UI design alapismeretek",
    ],
    industry_insights: [
      "A termékmenedzser pozíció egyre központibb szerepet tölt be a tech cégekben",
      "Az adatvezérelt termékfejlesztés alapkövetelménnyé válik",
      "A felhasználói élmény és a termék használhatósága kiemelt fókuszt kap",
    ],
  },
  sustainability: {
    name: "Fenntarthatóság és környezetvédelem",
    description:
      "A fenntarthatósági szektor a környezetvédelemmel, megújuló energiákkal és a fenntartható fejlődéssel foglalkozik.",
    skills: [
      "környezettudatosság",
      "stratégiai tervezés",
      "elemzői készségek",
      "kommunikáció",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Versenyképes, specializációtól függően",
    required_traits: [
      "detail_oriented",
      "systematic",
      "people_oriented",
      "innovative",
    ],
    education_paths: [
      "Környezetmérnöki BSc/MSc",
      "Fenntartható fejlődés szakirány",
      "Megújuló energia specializáció",
      "ESG (Environmental, Social, Governance) képzések",
    ],
    industry_insights: [
      "A klímaváltozás miatt egyre több vállalat fektet a fenntarthatósági kezdeményezésekbe",
      "A zöld munkahelyek száma exponenciálisan növekszik",
      "A körforgásos gazdaság modelljei egyre több iparágban jelennek meg",
    ],
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
        traits: ["systematic", "analytical", "detail_oriented"],
      },
      {
        id: "b",
        text: "Kreatív ötletekkel és innovatív megoldásokkal kísérletezek",
        areas: ["design", "arts", "marketing", "digital_marketing"],
        weight: 1.4,
        traits: ["creative", "innovative", "adaptable"],
      },
      {
        id: "c",
        text: "Csapatot építek és delegálom a feladatokat",
        areas: ["management", "hr", "entrepreneurship", "product_management"],
        weight: 1.3,
        traits: ["leadership", "collaborative", "delegative"],
      },
      {
        id: "d",
        text: "Kutatással és adatelemzéssel kezdem",
        areas: ["research", "science", "finance", "data_science"],
        weight: 1.5,
        traits: ["analytical", "detail_oriented", "methodical"],
      },
      {
        id: "e",
        text: "Az emberek igényeit és érzéseit vizsgálom először",
        areas: ["psychology", "healthcare", "social_work", "design"],
        weight: 1.4,
        traits: ["empathetic", "people_oriented", "intuitive"],
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
  {
    id: 11,
    text: "Melyik technológiai terület vagy trend érdekel leginkább?",
    options: [
      {
        id: "a",
        text: "Mesterséges intelligencia és gépi tanulás",
        areas: ["tech", "data_science", "research"],
        weight: 1.5,
        traits: ["innovative", "analytical", "forward_thinking"],
      },
      {
        id: "b",
        text: "Fenntarthatóság és zöld technológiák",
        areas: ["sustainability", "engineering", "science"],
        weight: 1.4,
        traits: ["conscientious", "forward_thinking", "ethical"],
      },
      {
        id: "c",
        text: "Virtuális/kiterjesztett valóság (VR/AR)",
        areas: ["tech", "design", "entertainment"],
        weight: 1.3,
        traits: ["creative", "innovative", "visual_thinking"],
      },
      {
        id: "d",
        text: "Digital wellness és egészségügyi technológiák",
        areas: ["healthcare", "tech", "psychology"],
        weight: 1.4,
        traits: ["empathetic", "analytical", "health_conscious"],
      },
      {
        id: "e",
        text: "Blockchain és decentralizált rendszerek",
        areas: ["tech", "finance", "entrepreneurship"],
        weight: 1.3,
        traits: ["innovative", "analytical", "security_focused"],
      },
    ],
    category: "tech_interests",
  },
  {
    id: 12,
    text: "Ha egy projekt késésben van, hogyan reagálsz?",
    options: [
      {
        id: "a",
        text: "Újratervezem a határidőket és átszervezem a feladatokat",
        areas: ["management", "product_management", "project_management"],
        weight: 1.4,
        traits: ["adaptable", "organized", "pragmatic"],
      },
      {
        id: "b",
        text: "Extra erőforrásokat keresek vagy több időt fordítok a munkára",
        areas: ["engineering", "tech", "entrepreneurship"],
        weight: 1.3,
        traits: ["determined", "committed", "problem_solver"],
      },
      {
        id: "c",
        text: "Átnézem a projekt hatókörét és priorizálok a lényeges feladatokra",
        areas: ["product_management", "consulting", "research"],
        weight: 1.5,
        traits: ["strategic", "analytical", "decisive"],
      },
      {
        id: "d",
        text: "A csapattal közösen keresek megoldásokat",
        areas: ["hr", "management", "education"],
        weight: 1.3,
        traits: ["collaborative", "supportive", "team_oriented"],
      },
      {
        id: "e",
        text: "Innovatívabb megközelítéseket vagy rövidítéseket keresek",
        areas: ["design", "tech", "entrepreneurship"],
        weight: 1.4,
        traits: ["creative", "innovative", "adaptable"],
      },
    ],
    category: "crisis_management",
  },
  {
    id: 13,
    text: "Milyen munkakörnyezetben teljesítesz a legjobban?",
    options: [
      {
        id: "a",
        text: "Strukturált, jól szervezett, világos elvárásokkal",
        areas: ["finance", "law", "engineering"],
        weight: 1.3,
        traits: ["organized", "systematic", "detail_oriented"],
      },
      {
        id: "b",
        text: "Dinamikus, kreatív, jelentős önállósággal",
        areas: ["arts", "design", "entrepreneurship"],
        weight: 1.4,
        traits: ["creative", "independent", "adaptable"],
      },
      {
        id: "c",
        text: "Együttműködő, támogató csapatmunka hangsúlyával",
        areas: ["healthcare", "education", "hr"],
        weight: 1.3,
        traits: ["collaborative", "supportive", "team_oriented"],
      },
      {
        id: "d",
        text: "Célorientált, versengő, teljesítményalapú",
        areas: ["sales", "finance", "entrepreneurship"],
        weight: 1.2,
        traits: ["competitive", "results_oriented", "ambitious"],
      },
      {
        id: "e",
        text: "Rugalmas, hibrid/távmunkát lehetővé tevő",
        areas: ["tech", "writing", "digital_marketing"],
        weight: 1.3,
        traits: ["adaptable", "independent", "self_motivated"],
      },
    ],
    category: "work_environment",
  },
  {
    id: 14,
    text: "Hogyan viszonyulsz a folyamatos technológiai változásokhoz?",
    options: [
      {
        id: "a",
        text: "Lelkesen elfogadom és gyorsan alkalmazkodom az új technológiákhoz",
        areas: ["tech", "digital_marketing", "data_science"],
        weight: 1.5,
        traits: ["adaptable", "innovative", "tech_savvy"],
      },
      {
        id: "b",
        text: "Előnyösnek tartom, de csak akkor alkalmazom, ha bizonyított az értéke",
        areas: ["management", "finance", "healthcare"],
        weight: 1.3,
        traits: ["pragmatic", "analytical", "cautious"],
      },
      {
        id: "c",
        text: "Érdeklődve figyelem, de értékelem a bevált módszereket is",
        areas: ["education", "consulting", "engineering"],
        weight: 1.2,
        traits: ["balanced", "thoughtful", "practical"],
      },
      {
        id: "d",
        text: "Kritikusan szemlélem, fontosnak tartom az emberi tényezőket is",
        areas: ["social_work", "psychology", "arts"],
        weight: 1.3,
        traits: ["people_oriented", "conscientious", "skeptical"],
      },
      {
        id: "e",
        text: "Aktívan részt veszek új technológiák fejlesztésében",
        areas: ["research", "tech", "product_management"],
        weight: 1.5,
        traits: ["innovative", "entrepreneurial", "forward_thinking"],
      },
    ],
    category: "tech_adaptability",
  },
  {
    id: 15,
    text: "Mi a legfontosabb számodra egy munkáltató kiválasztásánál?",
    options: [
      {
        id: "a",
        text: "Innovatív vállalati kultúra és modern technológiák",
        areas: ["tech", "design", "digital_marketing"],
        weight: 1.4,
        traits: ["innovative", "tech_savvy", "forward_thinking"],
      },
      {
        id: "b",
        text: "Társadalmi hatás és fenntarthatósági szemlélet",
        areas: ["social_work", "sustainability", "education"],
        weight: 1.3,
        traits: ["conscientious", "ethical", "purpose_driven"],
      },
      {
        id: "c",
        text: "Szakmai fejlődési lehetőségek és karrierút",
        areas: ["consulting", "finance", "management"],
        weight: 1.3,
        traits: ["ambitious", "growth_oriented", "career_focused"],
      },
      {
        id: "d",
        text: "Munkáltatói márka presztízse és elismertsége",
        areas: ["law", "finance", "marketing"],
        weight: 1.2,
        traits: ["prestige_oriented", "status_conscious", "ambitious"],
      },
      {
        id: "e",
        text: "Munka-magánélet egyensúly és rugalmas munkafeltételek",
        areas: ["healthcare", "education", "tech"],
        weight: 1.3,
        traits: ["balanced", "well_being_focused", "practical"],
      },
    ],
    category: "employer_preferences",
  },
];

const CareerOrientationModule = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [personalityProfile, setPersonalityProfile] = useState({});
  const [showProgress, setShowProgress] = useState(true);
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
      setShowProgress(false);
      setTimeout(() => setShowProgress(true), 50); // Reanimate progress bar
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers) => {
    const areaScores = {};
    const personalityTraits = {};
    const traitFrequency = {};
    const areaFrequency = {};
    const traitStrength = {}; // Új: trait erősségének mérése
    const categoryPreferences = {}; // Új: kategória preferenciák követése
    const questionWeights = {}; // Új: kérdés fontosságának súlyozása

    // Kérdések számának meghatározása kategóriánként a normalizáláshoz
    const categoryCounts = {};
    QUESTIONS.forEach((question) => {
      if (question.category) {
        categoryCounts[question.category] =
          (categoryCounts[question.category] || 0) + 1;
      }
    });

    // Minden kérdéshez relatív fontosság meghatározása
    // A teszt vége felé lévő kérdések fontosabbak (a felhasználó jobban átlátja a tesztet)
    QUESTIONS.forEach((question, index) => {
      // 1.0-től 1.5-ig növekvő súly a kérdések előrehaladtával
      const progressWeight = 1.0 + (index / QUESTIONS.length) * 0.5;
      questionWeights[question.id] = progressWeight;
    });

    // Első körben összegyűjtjük a trait-eket és területeket
    finalAnswers.forEach((answer) => {
      const question = QUESTIONS.find((q) => q.id === answer.questionId);
      const option = question.options.find((o) => o.id === answer.answerId);
      const questionWeight = questionWeights[question.id] || 1.0;

      // Kategória alapú személyiségprofil
      if (question.category) {
        // Kategória preferenciák követése - a választott opció súlyával
        categoryPreferences[question.category] =
          categoryPreferences[question.category] || {};
        categoryPreferences[question.category][option.id] =
          (categoryPreferences[question.category][option.id] || 0) +
          (option.weight || 1) * questionWeight;

        // Személyiségjegyek gyűjtése
        personalityTraits[question.category] =
          personalityTraits[question.category] || [];
        personalityTraits[question.category].push({
          optionId: option.id,
          traits: option.traits || [],
          weight: option.weight || 1,
        });
      }

      // Területek súlyozott számítása javított algoritmussal
      option.areas.forEach((area) => {
        // Alap súlyozás kérdés előrehaladással módosítva
        const weight = (option.weight || 1) * questionWeight;
        areaScores[area] = (areaScores[area] || 0) + weight;
        areaFrequency[area] = (areaFrequency[area] || 0) + 1;
      });

      // Személyiségjegyek erősségének számítása
      if (option.traits) {
        option.traits.forEach((trait) => {
          traitFrequency[trait] = (traitFrequency[trait] || 0) + 1;
          // Trait erősség - súlyozott érték a válasz és kérdés súlya alapján
          traitStrength[trait] =
            (traitStrength[trait] || 0) + (option.weight || 1) * questionWeight;
        });
      }
    });

    // Kategória-alapú jellemzés finomítása
    // Minden kategóriában meghatározzuk a legerősebb preferenciákat
    const dominantCategoryTraits = {};
    Object.entries(categoryPreferences).forEach(([category, preferences]) => {
      // Rendezzük a preferenciákat erősség szerint
      const sortedPrefs = Object.entries(preferences).sort(
        (a, b) => b[1] - a[1]
      );

      // Csak akkor vesszük figyelembe, ha elég nagy a különbség a preferenciák között
      // vagy ha nagyon erős az adott preferencia
      if (
        sortedPrefs.length > 0 &&
        (sortedPrefs[0][1] > 1.5 ||
          (sortedPrefs.length > 1 &&
            sortedPrefs[0][1] > sortedPrefs[1][1] * 1.3))
      ) {
        dominantCategoryTraits[category] = sortedPrefs[0][0]; // Legerősebb preferencia
      }
    });

    // Fejlett pontozási algoritmus
    const normalizedScores = {};
    const maxFrequency = Math.max(...Object.values(areaFrequency), 1);

    // Első normalizálás: mindegyik terület pontszámát normalizáljuk a terület maximális pontszámához
    const areaMaxPossibleScores = {};

    // Minden terület maximális lehetséges pontszámának kiszámítása
    Object.keys(CAREER_AREAS).forEach((area) => {
      let maxPossibleScore = 0;
      QUESTIONS.forEach((question) => {
        // Keressük meg a legnagyobb súlyú választ, ami tartalmazza ezt a területet
        let maxOptionWeight = 0;
        question.options.forEach((option) => {
          if (
            option.areas.includes(area) &&
            (option.weight || 1) > maxOptionWeight
          ) {
            maxOptionWeight = option.weight || 1;
          }
        });
        maxPossibleScore += maxOptionWeight * questionWeights[question.id];
      });
      areaMaxPossibleScores[area] = maxPossibleScore > 0 ? maxPossibleScore : 1;
    });

    // Normalizálás a maximális lehetséges pontszámhoz képest
    Object.keys(areaScores).forEach((area) => {
      normalizedScores[area] =
        (areaScores[area] / areaMaxPossibleScores[area]) * 60; // Alap 60% a terület illeszkedése alapján
    });

    // Második lépés: trait illeszkedés és bónuszok számítása
    Object.keys(normalizedScores).forEach((area) => {
      // Trait-egyezési bónusz - max 25%
      const relevantTraits = CAREER_AREAS[area]?.required_traits || [];
      let traitMatchScore = 0;
      let traitStrengthScore = 0;

      if (relevantTraits.length > 0) {
        // Számoljuk az egyezési pontszámot és az erősségi pontszámot
        let matchCount = 0;
        let strengthSum = 0;
        let maxStrength = 0;

        relevantTraits.forEach((trait) => {
          if (traitFrequency[trait]) {
            matchCount += 1;

            // Trait erősség figyelembevétele
            const strength = traitStrength[trait] || 0;
            strengthSum += strength;
            if (strength > maxStrength) maxStrength = strength;
          }
        });

        // Trait egyezési arány (0-25%)
        traitMatchScore = (matchCount / relevantTraits.length) * 25;

        // Trait erősségi bónusz (0-10%)
        if (maxStrength > 0) {
          traitStrengthScore = Math.min(
            10,
            (strengthSum / (relevantTraits.length * maxStrength)) * 10
          );
        }
      }

      // Gyakorisági bónusz - max 10%
      // Ha egy terület gyakran szerepel a válaszokban, az megerősíti az érdeklődést
      const frequencyBonus = Math.min(
        10,
        (areaFrequency[area] / maxFrequency) * 10
      );

      // Kategória-preferencia bónusz - max 5%
      // Ha a domináns kategória-preferenciák egyeznek a terület jellegével
      let categoryBonus = 0;
      const areaCategoryMatch = Object.entries(dominantCategoryTraits).filter(
        ([category, pref]) => {
          // Itt definiálhatnánk, hogy mely kategóriák mely területekhez illeszkednek legjobban
          const categoryAreaMatches = {
            approach: {
              a: ["tech", "data_science", "engineering"],
              b: ["design", "arts", "marketing"],
              c: ["management", "hr", "entrepreneurship"],
              d: ["research", "science", "finance"],
              e: ["psychology", "healthcare", "social_work"],
            },
            problem_solving: {
              a: ["engineering", "tech", "science"],
              b: ["design", "arts", "marketing"],
              c: ["management", "hr", "education"],
              d: ["entrepreneurship", "sales"],
              e: ["data_science", "finance", "research"],
            },
            // További kategória-terület megfeleltetések...
          };

          return categoryAreaMatches[category]?.[pref]?.includes(area) || false;
        }
      ).length;

      categoryBonus = Math.min(5, areaCategoryMatch * 2.5);

      // Végső pontszám (kerekítve 1 tizedesre)
      normalizedScores[area] = parseFloat(
        (
          normalizedScores[area] +
          traitMatchScore +
          traitStrengthScore +
          frequencyBonus +
          categoryBonus
        ).toFixed(1)
      );

      // Biztosítsuk, hogy ne legyen 100%-nál magasabb
      normalizedScores[area] = Math.min(100, normalizedScores[area]);
    });

    // Rendezzük a területeket pontszám szerint és válasszuk a top 5-öt
    const sortedAreas = Object.entries(normalizedScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Javított matching_traits számítás erősség alapján
    // Részletes eredmények létrehozása
    const resultAreas = sortedAreas.map(([areaId, score]) => {
      // Releváns trait-ek kiválasztása erősség szerint rendezve
      const relevantTraits = CAREER_AREAS[areaId]?.required_traits || [];
      const matchingTraits = relevantTraits
        .filter((trait) => traitFrequency[trait])
        .sort((a, b) => (traitStrength[b] || 0) - (traitStrength[a] || 0))
        .map((trait) => {
          // Keressük meg a trait emberi nyelven olvasható megfelelőjét
          const traitNames = {
            analytical: "Analitikus gondolkodás",
            systematic: "Rendszerező képesség",
            detail_oriented: "Részletekre figyelés",
            innovative: "Innovatív szemlélet",
            creative: "Kreatív gondolkodás",
            adaptable: "Alkalmazkodóképesség",
            leadership: "Vezetői készség",
            collaborative: "Együttműködési készség",
            delegative: "Delegálási képesség",
            empathetic: "Empátia",
            people_oriented: "Emberközpontú szemlélet",
            intuitive: "Intuitív gondolkodás",
            pragmatic: "Gyakorlatias szemlélet",
            strategic: "Stratégiai gondolkodás",
            decisive: "Döntésképesség",
            team_oriented: "Csapatjátékos",
            competitive: "Versenyorientált szemlélet",
            ambitious: "Ambiciózus hozzáállás",
            forward_thinking: "Előremutató gondolkodás",
            conscientious: "Lelkiismeretesség",
            ethical: "Etikus szemlélet",
            // További trait megnevezések...
          };

          return traitNames[trait] || trait;
        });

      return {
        id: areaId,
        name: CAREER_AREAS[areaId]?.name || areaId,
        description: CAREER_AREAS[areaId]?.description || "",
        score: score,
        skills: CAREER_AREAS[areaId]?.skills || [],
        required_traits: CAREER_AREAS[areaId]?.required_traits || [],
        matching_traits: matchingTraits,
        growthPotential: CAREER_AREAS[areaId]?.growth_potential || "Átlagos",
        futureOutlook: CAREER_AREAS[areaId]?.future_outlook || "Stabil",
        salaryRange: CAREER_AREAS[areaId]?.salary_range || "Változó",
        education_paths: CAREER_AREAS[areaId]?.education_paths || [],
        industry_insights: CAREER_AREAS[areaId]?.industry_insights || [],
      };
    });

    setResults(resultAreas);
    setPersonalityProfile({
      traits: traitFrequency,
      traitStrength: traitStrength, // Új: trait erősség hozzáadása a profilhoz
      categories: personalityTraits,
      dominantCategoryTraits: dominantCategoryTraits, // Új: domináns kategória preferenciák
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
    <div className="min-h-screen px-4 pt-32 pb-12">
      {!isCompleted ? (
        // Questions Screen
        <motion.div
          key="questions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              Professzionális Karrierteszt
            </h2>
            <p className="text-purple-200 text-lg">
              Fedezd fel a hozzád legjobban illő karrierutakat! Tudományos
              alapokon nyugvó tesztünk segít megtalálni azokat a területeket,
              ahol készségeid és érdeklődési köröd alapján a leginkább
              kibontakozhatnál.
            </p>

            {showProgress && (
              <motion.div
                className="mt-8 relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
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
                <div className="flex justify-between items-center mt-2">
                  <p className="text-white text-lg font-medium">
                    Kérdés: {currentQuestionIndex + 1} / {QUESTIONS.length}
                  </p>
                  <p className="text-purple-200 text-sm">
                    {Math.floor(
                      ((currentQuestionIndex + 1) / QUESTIONS.length) * 100
                    )}
                    % teljesítve
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <CareerQuestion
            key={currentQuestionIndex}
            question={QUESTIONS[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </motion.div>
      ) : (
        // Results Screen
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-full mx-auto"
        >
          <CareerResults
            results={results}
            personalityProfile={personalityProfile}
            onFindExpert={handleFindExpert}
            onRecommendedPaths={handleRecommendedPaths}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CareerOrientationModule;
