import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import UniversityCard from "./UniversityCard";
import UniversityListItem from "./UniversityListItem";
import FilterPanel from "./FilterPanel";

// Sample universities data - this would typically be fetched from an API
const UNIVERSITIES = [
  {
    id: 1,
    name: "Eötvös Loránd Tudományegyetem",
    shortName: "ELTE",
    logo: "/egyetemek/ELTE.jpg",
    location: "Budapest",
    rating: 4.7,
    fields: [
      "természettudomány",
      "bölcsészettudomány",
      "informatika",
      "jog",
      "társadalomtudomány",
      "pedagógia",
    ],
    description:
      "Magyarország legrégebbi, folyamatosan működő egyeteme, széles képzési palettával.",
    students: 26000,
    foundedYear: 1635,
    faculties: [
      {
        name: "Állam- és Jogtudományi Kar (ÁJK)",
        programs: ["Jogász", "Igazságügyi igazgatási"],
      },
      {
        name: "Bölcsészettudományi Kar (BTK)",
        programs: [
          "Magyar",
          "Történelem",
          "Pszichológia",
          "Anglisztika",
          "Germanisztika",
        ],
      },
      {
        name: "Informatikai Kar (IK)",
        programs: ["Programtervező informatikus", "Mérnökinformatikus"],
      },
      {
        name: "Pedagógiai és Pszichológiai Kar (PPK)",
        programs: ["Pszichológia", "Pedagógia", "Gyógypedagógia"],
      },
      {
        name: "Társadalomtudományi Kar (TáTK)",
        programs: ["Szociológia", "Szociális munka", "Nemzetközi tanulmányok"],
      },
      {
        name: "Természettudományi Kar (TTK)",
        programs: ["Biológia", "Fizika", "Kémia", "Matematika", "Földtudomány"],
      },
      {
        name: "Gazdaságtudományi Kar (GTK)",
        programs: [
          "Gazdálkodási és menedzsment",
          "Kereskedelem és marketing",
          "Pénzügy és számvitel",
        ],
      },
      {
        name: "Bárczi Gusztáv Gyógypedagógiai Kar (BGGYK)",
        programs: ["Gyógypedagógia"],
      },
    ],
    topPrograms: ["Pszichológia", "Jogász", "Programtervező informatikus"],
    internationalRanking: 650,
  },
  {
    id: 2,
    name: "Budapesti Műszaki és Gazdaságtudományi Egyetem",
    shortName: "BME",
    logo: "/egyetemek/BME.jpg",
    location: "Budapest",
    rating: 4.6,
    fields: ["műszaki", "természettudomány", "informatika", "gazdaságtudomány"],
    description:
      "Hazánk első műszaki felsőoktatási intézménye, kiváló mérnöki és technológiai képzésekkel.",
    students: 21000,
    foundedYear: 1782,
    faculties: [
      {
        name: "Építőmérnöki Kar (ÉMK)",
        programs: ["Építőmérnök", "Infrastruktúra-építőmérnök"],
      },
      {
        name: "Gépészmérnöki Kar (GPK)",
        programs: [
          "Gépészmérnök",
          "Energetikai mérnök",
          "Mechatronikai mérnök",
        ],
      },
      { name: "Építészmérnöki Kar (ÉPK)", programs: ["Építészmérnök"] },
      {
        name: "Vegyészmérnöki és Biomérnöki Kar (VBK)",
        programs: ["Vegyészmérnök", "Biomérnök", "Környezetmérnök"],
      },
      {
        name: "Villamosmérnöki és Informatikai Kar (VIK)",
        programs: [
          "Villamosmérnök",
          "Mérnökinformatikus",
          "Üzemmérnök-informatikus",
        ],
      },
      {
        name: "Közlekedésmérnöki és Járműmérnöki Kar (KJK)",
        programs: ["Közlekedésmérnök", "Járműmérnök", "Logisztikai mérnök"],
      },
      {
        name: "Természettudományi Kar (TTK)",
        programs: ["Matematika", "Fizika", "Alkalmazott matematikus"],
      },
      {
        name: "Gazdaság- és Társadalomtudományi Kar (GTK)",
        programs: [
          "Műszaki menedzser",
          "Kommunikáció és médiatudomány",
          "Nemzetközi gazdálkodás",
        ],
      },
    ],
    topPrograms: ["Építészmérnöki", "Villamosmérnöki", "Gépészmérnöki"],
    internationalRanking: 700,
  },
  {
    id: 3,
    name: "Budapesti Corvinus Egyetem",
    shortName: "Corvinus",
    logo: "/egyetemek/corvinus.jpg",
    location: "Budapest",
    rating: 4.5,
    fields: [
      "gazdaságtudomány",
      "társadalomtudomány",
      "nemzetközi kapcsolatok",
    ],
    description:
      "Közgazdasági, gazdálkodási és társadalomtudományi képzések első számú hazai intézménye.",
    students: 10000,
    foundedYear: 1948,
    faculties: [
      {
        name: "Gazdálkodástudományi Kar",
        programs: [
          "Gazdálkodási és menedzsment",
          "Kereskedelem és marketing",
          "Turizmus-vendéglátás",
        ],
      },
      {
        name: "Közgazdaságtudományi Kar",
        programs: ["Alkalmazott közgazdaságtan", "Nemzetközi gazdálkodás"],
      },
      {
        name: "Társadalomtudományi és Nemzetközi Kapcsolatok Kar",
        programs: [
          "Nemzetközi tanulmányok",
          "Szociológia",
          "Kommunikáció és médiatudomány",
        ],
      },
    ],
    topPrograms: [
      "Gazdálkodás és menedzsment",
      "Nemzetközi gazdálkodás",
      "Pénzügy",
    ],
    internationalRanking: 750,
  },
  {
    id: 7,
    name: "Semmelweis Egyetem",
    shortName: "SE",
    logo: "/egyetemek/semmelweis.jpg",
    location: "Budapest",
    rating: 4.8,
    fields: ["orvostudomány", "egészségtudomány", "gyógyszerészet"],
    description:
      "Magyarország legrégebbi orvosképző intézménye, kiemelkedő nemzetközi hírnévvel.",
    students: 11000,
    foundedYear: 1769,
    faculties: [
      {
        name: "Általános Orvostudományi Kar (ÁOK)",
        programs: ["Általános orvos"],
      },
      { name: "Fogorvostudományi Kar (FOK)", programs: ["Fogorvos"] },
      { name: "Gyógyszerésztudományi Kar (GYTK)", programs: ["Gyógyszerész"] },
      {
        name: "Egészségtudományi Kar (ETK)",
        programs: [
          "Ápolás és betegellátás",
          "Gyógytornász",
          "Dietetikus",
          "Mentőtiszt",
        ],
      },
      {
        name: "Egészségügyi Közszolgálati Kar (EKK)",
        programs: ["Egészségügyi szervező"],
      },
    ],
    topPrograms: ["Általános orvos", "Fogorvos", "Gyógyszerész"],
    internationalRanking: 450,
  },
  {
    id: 4,
    name: "Debreceni Egyetem",
    shortName: "DE",
    logo: "/egyetemek/debrecen.jpg",
    location: "Debrecen",
    rating: 4.4,
    fields: [
      "orvostudomány",
      "agrártudomány",
      "természettudomány",
      "bölcsészettudomány",
      "jog",
      "informatika",
    ],
    description:
      "Az ország egyik legrégebbi és legnagyobb hallgatói létszámmal rendelkező egyeteme.",
    students: 25000,
    foundedYear: 1538,
    faculties: [],
    topPrograms: ["Általános orvos", "Állatorvos", "Gyógyszerész"],
    internationalRanking: 800,
  },
  {
    id: 8,
    name: "Pécsi Tudományegyetem",
    shortName: "PTE",
    logo: "/egyetemek/pecsi.jpg",
    location: "Pécs",
    rating: 4.3,
    fields: [
      "orvostudomány",
      "bölcsészettudomány",
      "művészet",
      "természettudomány",
      "gazdaságtudomány",
      "jog",
    ],
    description:
      "A Pécsi Tudományegyetem Magyarország egyik legrégebbi egyeteme, amely széles képzési kínálattal és nemzetközi programokkal várja a hallgatókat.",
    students: 20000,
    foundedYear: 1367,
    faculties: [
      {
        name: "Általános Orvostudományi Kar",
        programs: ["Általános orvos", "Fogorvos", "Gyógyszerész"],
      },
      {
        name: "Bölcsészettudományi Kar",
        programs: ["Pszichológia", "Történelem", "Magyar", "Anglisztika"],
      },
      {
        name: "Művészeti Kar",
        programs: ["Képzőművészet", "Zeneművészet"],
      },
      {
        name: "Természettudományi Kar",
        programs: ["Biológia", "Fizika", "Kémia", "Matematika"],
      },
      {
        name: "Közgazdaságtudományi Kar",
        programs: ["Gazdálkodási és menedzsment", "Pénzügy", "Marketing"],
      },
      {
        name: "Állam- és Jogtudományi Kar",
        programs: ["Jogász", "Közigazgatási szervező"],
      },
    ],
    topPrograms: ["Általános orvos", "Pszichológia", "Képzőművészet"],
    internationalRanking: 800,
  },
  {
    id: 9,
    name: "Szegedi Tudományegyetem",
    shortName: "SZTE",
    logo: "/egyetemek/szte.jpg",
    location: "Szeged",
    rating: 4.6,
    fields: [
      "orvostudomány",
      "természettudomány",
      "bölcsészettudomány",
      "informatika",
      "jog",
    ],
    description:
      "A Tisza-parti város büszkesége, sokszínű képzési kínálattal és nemzetközi kapcsolatokkal.",
    students: 21000,
    foundedYear: 1872,
    faculties: [
      {
        name: "Általános Orvostudományi Kar",
        programs: ["Általános orvos", "Biotechnológus"],
      },
      {
        name: "Természettudományi és Informatikai Kar",
        programs: ["Informatika", "Biológia", "Fizika"],
      },
      {
        name: "Bölcsészettudományi Kar",
        programs: ["Pszichológia", "Anglisztika", "Történelem"],
      },
      { name: "Állam- és Jogtudományi Kar", programs: ["Jogász"] },
    ],
    topPrograms: ["Általános orvos", "Informatika", "Jogász"],
    internationalRanking: 700,
  },
  {
    id: 10,
    name: "Széchenyi István Egyetem",
    shortName: "SZE",
    logo: "/egyetemek/szécheny.jpg",
    location: "Győr",
    rating: 4.2,
    fields: ["műszaki", "informatika", "gazdaságtudomány", "jog", "művészet"],
    description:
      "A győri egyetem műszaki és gazdasági képzései révén vált elismertté a nyugat-magyarországi régióban.",
    students: 14000,
    foundedYear: 1968,
    faculties: [
      {
        name: "Műszaki Tudományi Kar",
        programs: ["Gépészmérnök", "Villamosmérnök", "Járműmérnök"],
      },
      {
        name: "Kautz Gyula Gazdaságtudományi Kar",
        programs: ["Gazdálkodási és menedzsment", "Pénzügy és számvitel"],
      },
      { name: "Deák Ferenc Állam- és Jogtudományi Kar", programs: ["Jogász"] },
      { name: "Művészeti Kar", programs: ["Tervezőgrafika", "Zene"] },
    ],
    topPrograms: ["Járműmérnök", "Gépészmérnök", "Gazdálkodás és menedzsment"],
    internationalRanking: 1000,
  },
  {
    id: 11,
    name: "Pannon Egyetem",
    shortName: "PE",
    logo: "/egyetemek/pannon.jpg",
    location: "Veszprém",
    rating: 4.1,
    fields: ["műszaki", "természettudomány", "gazdaságtudomány", "informatika"],
    description:
      "A Balaton közelében elhelyezkedő, erősen műszaki orientált egyetem zöld innovációival is kiemelkedik.",
    students: 8000,
    foundedYear: 1949,
    faculties: [
      {
        name: "Mérnöki Kar",
        programs: ["Vegyészmérnök", "Környezettudományi mérnök"],
      },
      {
        name: "Gazdaságtudományi Kar",
        programs: ["Gazdálkodási és menedzsment", "Turizmus-vendéglátás"],
      },
      { name: "Informatikai Kar", programs: ["Programtervező informatikus"] },
    ],
    topPrograms: [
      "Vegyészmérnök",
      "Turizmus-vendéglátás",
      "Programtervező informatikus",
    ],
    internationalRanking: 1200,
  },
  {
    id: 12,
    name: "Óbudai Egyetem",
    shortName: "OE",
    logo: "/egyetemek/obuda.jpg",
    location: "Budapest",
    rating: 4.0,
    fields: ["műszaki", "informatika", "gazdaságtudomány"],
    description:
      "Gyakorlatorientált műszaki és informatikai képzések Budapest szívében.",
    students: 11000,
    foundedYear: 2000,
    faculties: [
      {
        name: "Bánki Donát Gépész és Biztonságtechnikai Mérnöki Kar",
        programs: ["Gépészmérnök"],
      },
      {
        name: "Neumann János Informatikai Kar",
        programs: ["Mérnökinformatikus"],
      },
      {
        name: "Keleti Károly Gazdasági Kar",
        programs: ["Gazdálkodási és menedzsment"],
      },
    ],
    topPrograms: ["Gépészmérnök", "Mérnökinformatikus"],
    internationalRanking: 1300,
  },
];

// Export the function to find a university by its numeric ID
export const getUniversityById = (id) => {
  const numericId = parseInt(id, 10);
  return UNIVERSITIES.find((uni) => uni.id === numericId);
};

const FIELD_OPTIONS = [
  "természettudomány",
  "bölcsészettudomány",
  "informatika",
  "jog",
  "társadalomtudomány",
  "pedagógia",
  "műszaki",
  "gazdaságtudomány",
  "nemzetközi kapcsolatok",
  "orvostudomány",
  "agrártudomány",
  "művészet",
  "egészségtudomány",
  "gyógyszerészet",
];

const LOCATION_OPTIONS = [
  "Budapest",
  "Debrecen",
  "Szeged",
  "Pécs",
  "Győr",
  "Veszprém",
];

const UniversitiesPage = () => {
  const [universities, setUniversities] = useState(UNIVERSITIES);
  const [filteredUniversities, setFilteredUniversities] =
    useState(UNIVERSITIES);
  const [viewMode, setViewMode] = useState("card"); // "card" or "list"
  const [filters, setFilters] = useState({
    location: [],
    fields: [],
    minRating: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Apply filters when filters or searchQuery change
    applyFilters();
  }, [filters, searchQuery]);

  const applyFilters = () => {
    let filtered = [...universities];

    // Apply location filter
    if (filters.location.length > 0) {
      filtered = filtered.filter((university) =>
        filters.location.includes(university.location)
      );
    }

    // Apply fields filter
    if (filters.fields.length > 0) {
      filtered = filtered.filter((university) =>
        filters.fields.some((field) => university.fields.includes(field))
      );
    }

    // Apply rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(
        (university) => university.rating >= filters.minRating
      );
    }

    // Apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (university) =>
          university.name.toLowerCase().includes(query) ||
          university.shortName.toLowerCase().includes(query)
      );
    }

    setFilteredUniversities(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const handleUniversityClick = (id) => {
    navigate(`/egyetem/${id}`);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "list" : "card");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Egyetemek
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Fedezd fel a magyarországi egyetemeket, és találd meg a számodra
            legmegfelelőbb intézményt!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              fieldOptions={FIELD_OPTIONS}
              locationOptions={LOCATION_OPTIONS}
              toggleViewMode={toggleViewMode}
              viewMode={viewMode}
            />
          </motion.div>

          {/* University List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {filteredUniversities.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-center">
                <h3 className="text-xl text-white mb-2">Nincs találat</h3>
                <p className="text-purple-200">
                  Próbáld meg módosítani a keresési feltételeket, hogy több
                  egyetemet találj.
                </p>
              </div>
            ) : viewMode === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUniversities.map((university) => (
                  <UniversityCard
                    key={university.id}
                    university={university}
                    onClick={() => handleUniversityClick(university.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUniversities.map((university) => (
                  <UniversityListItem
                    key={university.id}
                    university={university}
                    onClick={() => handleUniversityClick(university.id)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UniversitiesPage;
