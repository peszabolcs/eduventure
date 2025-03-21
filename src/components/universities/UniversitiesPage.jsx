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
    faculties: 8,
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
    faculties: 8,
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
    faculties: 5,
    topPrograms: [
      "Gazdálkodás és menedzsment",
      "Nemzetközi gazdálkodás",
      "Pénzügy",
    ],
    internationalRanking: 750,
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
    faculties: 14,
    topPrograms: ["Általános orvos", "Állatorvos", "Gyógyszerész"],
    internationalRanking: 800,
  },
  {
    id: 5,
    name: "Szegedi Tudományegyetem",
    shortName: "SZTE",
    logo: "/egyetemek/szte.jpg",
    location: "Szeged",
    rating: 4.5,
    fields: [
      "orvostudomány",
      "természettudomány",
      "bölcsészettudomány",
      "jog",
      "informatika",
    ],
    description:
      "Kiemelkedő kutatási és oktatási centrum, széles képzési kínálattal.",
    students: 20000,
    foundedYear: 1872,
    faculties: 12,
    topPrograms: ["Általános orvos", "Biológia", "Jogász"],
    internationalRanking: 550,
  },
  {
    id: 6,
    name: "Pécsi Tudományegyetem",
    shortName: "PTE",
    logo: "/egyetemek/pecsi.jpg",
    location: "Pécs",
    rating: 4.3,
    fields: [
      "orvostudomány",
      "művészet",
      "bölcsészettudomány",
      "jog",
      "műszaki",
    ],
    description:
      "Az ország első egyeteme, ma is kiemelkedő szerepet tölt be a hazai felsőoktatásban.",
    students: 18000,
    foundedYear: 1367,
    faculties: 10,
    topPrograms: ["Általános orvos", "Művészeti képzések", "Mérnöki szakok"],
    internationalRanking: 700,
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
    faculties: 6,
    topPrograms: ["Általános orvos", "Fogorvos", "Gyógyszerész"],
    internationalRanking: 450,
  },
  {
    id: 8,
    name: "Óbudai Egyetem",
    shortName: "ÓE",
    logo: "/egyetemek/obuda.jpg",
    location: "Budapest",
    rating: 4.1,
    fields: ["műszaki", "informatika", "gazdaságtudomány"],
    description:
      "Gyakorlatorientált műszaki és informatikai képzések széles választékát kínálja.",
    students: 12000,
    foundedYear: 1879,
    faculties: 6,
    topPrograms: [
      "Mérnökinformatikus",
      "Villamosmérnöki",
      "Mechatronikai mérnök",
    ],
    internationalRanking: 800,
  },
  {
    id: 9,
    name: "Pannon Egyetem",
    shortName: "PE",
    logo: "/egyetemek/pannon.jpg",
    location: "Veszprém",
    rating: 4.2,
    fields: [
      "műszaki",
      "gazdaságtudomány",
      "informatika",
      "bölcsészettudomány",
    ],
    description:
      "Erős regionális kapcsolatokkal rendelkező, dinamikusan fejlődő egyetem.",
    students: 8000,
    foundedYear: 1949,
    faculties: 5,
    topPrograms: [
      "Vegyészmérnöki",
      "Gazdaságinformatikus",
      "Műszaki menedzser",
    ],
    internationalRanking: 900,
  },
  {
    id: 10,
    name: "Széchenyi István Egyetem",
    shortName: "SZE",
    logo: "/egyetemek/szécheny.jpg",
    location: "Győr",
    rating: 4.3,
    fields: [
      "műszaki",
      "jog",
      "gazdaságtudomány",
      "egészségtudomány",
      "művészet",
    ],
    description:
      "Az iparral szorosan együttműködő, gyakorlatorientált képzéseket nyújtó intézmény.",
    students: 12000,
    foundedYear: 1968,
    faculties: 9,
    topPrograms: ["Járműmérnöki", "Építőmérnöki", "Logisztikai mérnök"],
    internationalRanking: 1000,
  },
];

// Available field options for filtering
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

// Available locations for filtering
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
    navigate(`/egyetemek/${id}`);
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
