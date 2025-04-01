export const QUESTIONS = [
  {
    id: 1,
    text: "Melyik tevékenység tűnik a legvonzóbbnak számodra?",
    weight: 1.2,
    options: [
      {
        id: "1a",
        text: "Gyakorlati problémák megoldása, eszközök javítása vagy építése",
        holland_codes: ["R", "I"],
        cognitive_indicators: ["analytical", "technical"],
        work_environment: ["structured", "independent"],
      },
      {
        id: "1b",
        text: "Új ötletek kitalálása és kreatív megoldások kidolgozása",
        holland_codes: ["A", "I"],
        cognitive_indicators: ["creative", "analytical"],
        work_environment: ["flexible", "innovative"],
      },
      {
        id: "1c",
        text: "Emberekkel való együttműködés és segítségnyújtás",
        holland_codes: ["S", "E"],
        cognitive_indicators: ["social", "leadership"],
        work_environment: ["collaborative", "structured"],
      },
    ],
  },
  {
    id: 2,
    text: "Milyen környezetben éreznéd magad a legjobban?",
    weight: 1.0,
    options: [
      {
        id: "2a",
        text: "Rendszeres és jól strukturált munkakörnyezet",
        holland_codes: ["C", "R"],
        cognitive_indicators: ["technical", "analytical"],
        work_environment: ["structured", "independent"],
      },
      {
        id: "2b",
        text: "Rugalmas és változatos környezet",
        holland_codes: ["A", "E"],
        cognitive_indicators: ["creative", "leadership"],
        work_environment: ["flexible", "innovative"],
      },
      {
        id: "2c",
        text: "Csapatban való együttműködés",
        holland_codes: ["S", "E"],
        cognitive_indicators: ["social", "leadership"],
        work_environment: ["collaborative", "structured"],
      },
    ],
  },
  {
    id: 3,
    text: "Melyik készség fejlesztése érdekel a legjobban?",
    weight: 1.1,
    options: [
      {
        id: "3a",
        text: "Technikai és gyakorlati készségek",
        holland_codes: ["R", "I"],
        cognitive_indicators: ["technical", "analytical"],
        work_environment: ["structured", "independent"],
      },
      {
        id: "3b",
        text: "Kreatív és innovatív gondolkodás",
        holland_codes: ["A", "I"],
        cognitive_indicators: ["creative", "analytical"],
        work_environment: ["flexible", "innovative"],
      },
      {
        id: "3c",
        text: "Kommunikációs és vezetési készségek",
        holland_codes: ["E", "S"],
        cognitive_indicators: ["social", "leadership"],
        work_environment: ["collaborative", "structured"],
      },
    ],
  },
  {
    id: 4,
    text: "Milyen típusú problémák megoldása érdekel?",
    weight: 1.3,
    options: [
      {
        id: "4a",
        text: "Konkrét, gyakorlati problémák",
        holland_codes: ["R", "C"],
        cognitive_indicators: ["technical", "analytical"],
        work_environment: ["structured", "independent"],
      },
      {
        id: "4b",
        text: "Elméleti és kutatási kérdések",
        holland_codes: ["I", "A"],
        cognitive_indicators: ["analytical", "creative"],
        work_environment: ["flexible", "innovative"],
      },
      {
        id: "4c",
        text: "Emberi kapcsolatokkal kapcsolatos problémák",
        holland_codes: ["S", "E"],
        cognitive_indicators: ["social", "leadership"],
        work_environment: ["collaborative", "structured"],
      },
    ],
  },
  {
    id: 5,
    text: "Milyen típusú projekteken szeretnél dolgozni?",
    weight: 1.1,
    options: [
      {
        id: "5a",
        text: "Gyakorlati, kézzelfogható projektek",
        holland_codes: ["R", "C"],
        cognitive_indicators: ["technical", "analytical"],
        work_environment: ["structured", "independent"],
      },
      {
        id: "5b",
        text: "Kreatív és innovatív projektek",
        holland_codes: ["A", "I"],
        cognitive_indicators: ["creative", "analytical"],
        work_environment: ["flexible", "innovative"],
      },
      {
        id: "5c",
        text: "Csapatos projektek",
        holland_codes: ["S", "E"],
        cognitive_indicators: ["social", "leadership"],
        work_environment: ["collaborative", "structured"],
      },
    ],
  },
  {
    id: 6,
    text: "Milyen típusú kihívások vonzanak?",
    weight: 1.2,
    options: [
      {
        id: "6a",
        text: "Technikai és gyakorlati kihívások",
        holland_codes: ["R", "I"],
        cognitive_indicators: ["technical", "analytical"],
        work_environment: ["structured", "independent"],
      },
      {
        id: "6b",
        text: "Kreatív és innovatív kihívások",
        holland_codes: ["A", "I"],
        cognitive_indicators: ["creative", "analytical"],
        work_environment: ["flexible", "innovative"],
      },
      {
        id: "6c",
        text: "Emberi kapcsolatokkal kapcsolatos kihívások",
        holland_codes: ["S", "E"],
        cognitive_indicators: ["social", "leadership"],
        work_environment: ["collaborative", "structured"],
      },
    ],
  },
  {
    id: 7,
    text: "Milyen típusú fejlődési lehetőségek érdekelnek?",
    weight: 1.0,
    options: [
      {
        id: "7a",
        text: "Technikai szakértés fejlesztése",
        holland_codes: ["R", "I"],
        cognitive_indicators: ["technical", "analytical"],
        work_environment: ["structured", "independent"],
      },
      {
        id: "7b",
        text: "Kreatív és innovatív készségek fejlesztése",
        holland_codes: ["A", "I"],
        cognitive_indicators: ["creative", "analytical"],
        work_environment: ["flexible", "innovative"],
      },
      {
        id: "7c",
        text: "Vezetési és kommunikációs készségek fejlesztése",
        holland_codes: ["E", "S"],
        cognitive_indicators: ["social", "leadership"],
        work_environment: ["collaborative", "structured"],
      },
    ],
  },
  {
    id: 8,
    text: "Milyen típusú munkakörnyezetben éreznéd magad a legjobban?",
    weight: 1.1,
    options: [
      {
        id: "8a",
        text: "Rendszeres és jól strukturált környezet",
        holland_codes: ["C", "R"],
        cognitive_indicators: ["technical", "analytical"],
        work_environment: ["structured", "independent"],
      },
      {
        id: "8b",
        text: "Rugalmas és változatos környezet",
        holland_codes: ["A", "E"],
        cognitive_indicators: ["creative", "leadership"],
        work_environment: ["flexible", "innovative"],
      },
      {
        id: "8c",
        text: "Csapatban való együttműködés",
        holland_codes: ["S", "E"],
        cognitive_indicators: ["social", "leadership"],
        work_environment: ["collaborative", "structured"],
      },
    ],
  },
];

export const HOLLAND_CODES = {
  R: {
    name: "Realista",
    description: "Gyakorlati, mechanikus és technikai készségek",
    traits: [
      "Gyakorlati gondolkodás",
      "Technikai érdeklődés",
      "Pontos munkavégzés",
      "Strukturált megközelítés",
    ],
  },
  I: {
    name: "Investigatív",
    description: "Kutatási és elemző készségek",
    traits: [
      "Analitikus gondolkodás",
      "Kutatói érdeklődés",
      "Részletes megfigyelés",
      "Elméleti megközelítés",
    ],
  },
  A: {
    name: "Artisztikus",
    description: "Kreatív és expresszív készségek",
    traits: [
      "Kreatív gondolkodás",
      "Expresszív készségek",
      "Innovatív megközelítés",
      "Vizuális érzékenység",
    ],
  },
  S: {
    name: "Szociális",
    description: "Emberi kapcsolatok és segítő készségek",
    traits: [
      "Empátia",
      "Kommunikációs készségek",
      "Segítőkészség",
      "Csapatmunka",
    ],
  },
  E: {
    name: "Vállalkozó",
    description: "Vezetési és üzleti készségek",
    traits: [
      "Vezetési készségek",
      "Üzleti érzék",
      "Döntéshozatal",
      "Befolyásolási készségek",
    ],
  },
  C: {
    name: "Konvencionális",
    description: "Rendszeres és adminisztratív készségek",
    traits: [
      "Rendszeres munkavégzés",
      "Adminisztratív készségek",
      "Pontosság",
      "Szervezési készségek",
    ],
  },
};

export const COGNITIVE_SKILLS = {
  analytical: {
    name: "Analitikus gondolkodás",
    description: "Részletes elemzés és logikus gondolkodás",
    traits: [
      "Logikus gondolkodás",
      "Részletes elemzés",
      "Probléma megoldás",
      "Kritikus gondolkodás",
    ],
  },
  creative: {
    name: "Kreatív gondolkodás",
    description: "Új ötletek generálása és innovatív megoldások",
    traits: [
      "Innovatív gondolkodás",
      "Új ötletek",
      "Vizuális gondolkodás",
      "Divergens gondolkodás",
    ],
  },
  social: {
    name: "Szociális készségek",
    description: "Emberi kapcsolatok kezelése és kommunikáció",
    traits: ["Empátia", "Kommunikáció", "Csapatmunka", "Konfliktuskezelés"],
  },
  technical: {
    name: "Technikai készségek",
    description: "Gyakorlati és technikai problémák megoldása",
    traits: [
      "Technikai érdeklődés",
      "Gyakorlati készségek",
      "Rendszeres gondolkodás",
      "Probléma megoldás",
    ],
  },
  leadership: {
    name: "Vezetési készségek",
    description: "Csapatok vezetése és döntéshozatal",
    traits: ["Vezetés", "Döntéshozatal", "Motiváció", "Stratégiai gondolkodás"],
  },
};

export const WORK_ENVIRONMENTS = {
  structured: {
    name: "Strukturált",
    description: "Rendszeres és jól definiált munkakörnyezet",
    traits: [
      "Rendszeres munkaidő",
      "Jól definiált feladatok",
      "Pontos követelmények",
      "Stabil környezet",
    ],
  },
  flexible: {
    name: "Rugalmas",
    description: "Változatos és adaptív munkakörnyezet",
    traits: [
      "Rugalmas munkaidő",
      "Változatos feladatok",
      "Adaptív követelmények",
      "Dinamikus környezet",
    ],
  },
  collaborative: {
    name: "Együttműködő",
    description: "Csapatban való munka és együttműködés",
    traits: [
      "Csapatmunka",
      "Együttműködés",
      "Megosztott felelősség",
      "Interaktív környezet",
    ],
  },
  independent: {
    name: "Független",
    description: "Önálló munka és döntéshozatal",
    traits: [
      "Önálló munka",
      "Független döntéshozatal",
      "Saját felelősség",
      "Autonóm környezet",
    ],
  },
  innovative: {
    name: "Innovatív",
    description: "Kreatív és újító munkakörnyezet",
    traits: [
      "Kreatív munka",
      "Újítások",
      "Kísérletezés",
      "Dinamikus környezet",
    ],
  },
};

export const CAREER_AREAS = {
  technology: {
    name: "Technológia",
    description: "Informatika, szoftverfejlesztés és technológiai innovációk",
    required_holland_codes: ["R", "I"],
    cognitive_requirements: ["analytical", "technical"],
    skills: [
      "Programozás",
      "Rendszertervezés",
      "Probléma megoldás",
      "Technikai elemzés",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Magas",
    specializations: [
      "Szoftverfejlesztő",
      "Rendszeradminisztrátor",
      "Adatelemző",
      "UI/UX Designer",
    ],
  },
  creative: {
    name: "Kreatív ipar",
    description: "Média, design és kreatív tartalomgyártás",
    required_holland_codes: ["A", "I"],
    cognitive_requirements: ["creative", "analytical"],
    skills: [
      "Kreatív gondolkodás",
      "Vizuális design",
      "Tartalomgyártás",
      "Innováció",
    ],
    growth_potential: "Közepes",
    future_outlook: "Stabil",
    salary_range: "Változó",
    specializations: [
      "Grafikus designer",
      "Tartalomgyártó",
      "Animátor",
      "Média producer",
    ],
  },
  business: {
    name: "Üzleti",
    description: "Vállalkozás, marketing és üzleti stratégia",
    required_holland_codes: ["E", "C"],
    cognitive_requirements: ["leadership", "analytical"],
    skills: [
      "Vezetés",
      "Stratégiai gondolkodás",
      "Üzleti elemzés",
      "Marketing",
    ],
    growth_potential: "Magas",
    future_outlook: "Stabil",
    salary_range: "Magas",
    specializations: [
      "Üzleti elemző",
      "Marketing menedzser",
      "Vállalkozási tanácsadó",
      "Projekt menedzser",
    ],
  },
  healthcare: {
    name: "Egészségügy",
    description: "Orvostudomány, pszichológia és egészségügyi szolgáltatások",
    required_holland_codes: ["S", "I"],
    cognitive_requirements: ["social", "analytical"],
    skills: [
      "Empátia",
      "Orvosi tudás",
      "Diagnosztikai készségek",
      "Betegellátás",
    ],
    growth_potential: "Magas",
    future_outlook: "Kiváló",
    salary_range: "Magas",
    specializations: ["Orvos", "Pszichológus", "Ápoló", "Gyógytornász"],
  },
  education: {
    name: "Oktatás",
    description: "Tanítás, képzés és oktatási fejlesztés",
    required_holland_codes: ["S", "A"],
    cognitive_requirements: ["social", "creative"],
    skills: ["Tanítási készségek", "Kommunikáció", "Tantervezés", "Motiváció"],
    growth_potential: "Közepes",
    future_outlook: "Stabil",
    salary_range: "Közepes",
    specializations: [
      "Tanár",
      "Oktatási szakértő",
      "Képzési menedzser",
      "Oktatási technológus",
    ],
  },
};
