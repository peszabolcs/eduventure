import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Search,
  Users,
  Clock,
  Filter,
  BadgeCheck,
  ChevronRight,
  Sparkles,
  Award,
} from "lucide-react";

// Sample experts data - would come from an API in a real application
const EXPERTS = [
  {
    id: 1,
    name: "Dr. Nagy Katalin",
    title: "Pszichológus, Pályaválasztási tanácsadó",
    photo: "/szakertok/drnagykati.png",
    experience: "15+ év tapasztalat",
    specializations: ["Pályaorientáció", "Karrierváltás", "Stresszkezelés"],
    introduction:
      "Szakterületem a fiatalok és felnőttek pályaválasztási tanácsadása, karriertervezése. Több mint 15 éves szakmai tapasztalattal segítek a diákoknak megtalálni az érdeklődésüknek és képességeiknek leginkább megfelelő irányt.",
    rating: 4.8,
    reviewCount: 124,
    availability: "Következő szabad időpont: 2023. június 8.",
    hourlyRate: "15.000 Ft / 60 perc",
  },
  {
    id: 2,
    name: "Dr. Kovács István",
    title: "Karriertanácsadó, Egyetemi docens",
    photo: "/szakertok/drkovacsistvan.jpg",
    experience: "20+ év tapasztalat",
    specializations: [
      "Mérnöki pályák",
      "IT karrierutak",
      "Vezetői készségfejlesztés",
    ],
    introduction:
      "Mérnöki háttérrel rendelkező karriertanácsadó vagyok, aki különösen a műszaki és informatikai területen segít eligazodni. Egyetemi oktatóként naprakész információkkal rendelkezem az iparági elvárásokról.",
    rating: 4.7,
    reviewCount: 98,
    availability: "Következő szabad időpont: 2023. június 5.",
    hourlyRate: "18.000 Ft / 60 perc",
  },
  {
    id: 3,
    name: "Horváth Judit",
    title: "Oktatási szakértő, Tanácsadó",
    photo: "/szakertok/horvathjudit.jpg",
    experience: "12 év tapasztalat",
    specializations: [
      "Külföldi továbbtanulás",
      "Ösztöndíjak",
      "Nyelvi felkészítés",
    ],
    introduction:
      "A külföldi tanulmányok és ösztöndíjprogramok szakértőjeként segítek a diákoknak eligazodni a nemzetközi oktatási lehetőségek között. Gyakorlati tapasztalattal rendelkezem a sikeres jelentkezések és interjúk területén.",
    rating: 4.9,
    reviewCount: 87,
    availability: "Következő szabad időpont: 2023. június 10.",
    hourlyRate: "16.000 Ft / 60 perc",
  },
  {
    id: 4,
    name: "Szabó Márta",
    title: "Pszichológus, Coach",
    photo: "/szakertok/szabomarta.jpg",
    experience: "8 év tapasztalat",
    specializations: ["Önismeret", "Motiváció", "Tanulási stratégiák"],
    introduction:
      "Pszichológusként és coachként segítek a fiataloknak jobban megismerni önmagukat, erősségeiket és fejlesztendő területeiket. Támogatom a tanulási motiváció és hatékony tanulási stratégiák kialakítását.",
    rating: 4.6,
    reviewCount: 62,
    availability: "Következő szabad időpont: 2023. június 7.",
    hourlyRate: "14.000 Ft / 60 perc",
  },
  {
    id: 5,
    name: "Tóth Gábor",
    title: "IT szakértő, Mentor",
    photo: "/szakertok/tothgabor.jpg",
    experience: "18 év tapasztalat",
    specializations: ["Programozás", "Szoftverfejlesztés", "IT karrierutak"],
    introduction:
      "Gyakorló IT szakemberként segítek eligazodni a technológiai pályák között. Mentoráltjaimnak átfogó képet adok az IT iparág különböző területeiről, a szükséges készségekről és karrierlehetőségekről.",
    rating: 4.8,
    reviewCount: 73,
    availability: "Következő szabad időpont: 2023. június 12.",
    hourlyRate: "17.000 Ft / 60 perc",
  },
  {
    id: 6,
    name: "Varga Éva",
    title: "Közgazdász, Karriertanácsadó",
    photo: "/szakertok/vargaeva.jpg",
    experience: "14 év tapasztalat",
    specializations: [
      "Gazdasági pályák",
      "Pénzügyi karrier",
      "Vállalkozásfejlesztés",
    ],
    introduction:
      "Közgazdászként és üzleti tanácsadóként segítek eligazodni a gazdasági szektorban. Tanácsadásaim során gyakorlati információkat nyújtok a különböző üzleti területekről és karrierlehetőségekről.",
    rating: 4.5,
    reviewCount: 59,
    availability: "Következő szabad időpont: 2023. június 9.",
    hourlyRate: "16.000 Ft / 60 perc",
  },
];

// All possible specializations for filtering
const ALL_SPECIALIZATIONS = [
  "Pályaorientáció",
  "Karrierváltás",
  "Stresszkezelés",
  "Mérnöki pályák",
  "IT karrierutak",
  "Vezetői készségfejlesztés",
  "Külföldi továbbtanulás",
  "Ösztöndíjak",
  "Nyelvi felkészítés",
  "Önismeret",
  "Motiváció",
  "Tanulási stratégiák",
  "Programozás",
  "Szoftverfejlesztés",
  "Gazdasági pályák",
  "Pénzügyi karrier",
  "Vállalkozásfejlesztés",
];

// Category groups for better organization
const SPECIALIZATION_CATEGORIES = [
  {
    name: "Pályaválasztás",
    icon: <BadgeCheck className="h-4 w-4" />,
    items: ["Pályaorientáció", "Karrierváltás", "Vezetői készségfejlesztés"],
  },
  {
    name: "Tanulás",
    icon: <Sparkles className="h-4 w-4" />,
    items: [
      "Önismeret",
      "Motiváció",
      "Tanulási stratégiák",
      "Nyelvi felkészítés",
    ],
  },
  {
    name: "Szakmai területek",
    icon: <Award className="h-4 w-4" />,
    items: [
      "IT karrierutak",
      "Mérnöki pályák",
      "Gazdasági pályák",
      "Pénzügyi karrier",
    ],
  },
];

const ExpertsListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredExperts, setFilteredExperts] = useState(EXPERTS);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredExpertId, setHoveredExpertId] = useState(null);

  // Handle search and filter changes
  useEffect(() => {
    let result = EXPERTS;

    // Apply search query filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (expert) =>
          expert.name.toLowerCase().includes(query) ||
          expert.title.toLowerCase().includes(query) ||
          expert.specializations.some((spec) =>
            spec.toLowerCase().includes(query)
          )
      );
    }

    // Apply specialization filtering
    if (selectedSpecializations.length > 0) {
      result = result.filter((expert) =>
        selectedSpecializations.some((spec) =>
          expert.specializations.includes(spec)
        )
      );
    }

    setFilteredExperts(result);
  }, [searchQuery, selectedSpecializations]);

  // Handle selecting a specialization for filtering
  const handleSpecializationToggle = (specialization) => {
    setSelectedSpecializations((prev) => {
      if (prev.includes(specialization)) {
        return prev.filter((s) => s !== specialization);
      } else {
        return [...prev, specialization];
      }
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecializations([]);
  };

  // Generate star rating display
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : index < rating
            ? "text-yellow-400 fill-yellow-400 half-filled"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // View an expert's profile
  const handleViewExpert = (id) => {
    navigate(`/szakerto/${id}`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Enhanced animated background blobs with more variety - made smaller */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-3000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 pt-24">
        {/* Added pt-24 above to account for the fixed header height */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-300">
              Szakértőink
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-purple-200 max-w-3xl mx-auto"
          >
            Találj személyre szabott tanácsadást és támogatást pályaválasztási,
            tanulási és karrierkérdésekben a legjobb szakértőinktől.
          </motion.p>
        </motion.div>

        {/* Search and Filters - made more compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 border border-white/20 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-3 items-center mb-3">
            {/* Search input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-purple-300" />
              </div>
              <input
                type="text"
                placeholder="Keresés név vagy szakterület alapján..."
                className="block w-full bg-white/5 border border-white/20 rounded-lg pl-10 py-2.5 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter toggle button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 text-white px-4 py-2.5 rounded-lg transition-all duration-300 hover:from-purple-500 hover:to-indigo-500 shadow-md hover:shadow-lg border border-white/20"
            >
              <Filter className="h-4 w-4" />
              Szűrők {showFilters ? "elrejtése" : "mutatása"}
            </motion.button>
          </div>

          {/* Enhanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-medium text-base">
                      Szakterületek
                    </h3>
                    {selectedSpecializations.length > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-purple-300 hover:text-white transition-colors"
                      >
                        Összes törlése
                      </button>
                    )}
                  </div>

                  {/* Category-based filter UI - made more compact */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {SPECIALIZATION_CATEGORIES.map((category) => (
                        <button
                          key={category.name}
                          onClick={() =>
                            setActiveCategory(
                              activeCategory === category.name
                                ? null
                                : category.name
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-all ${
                            activeCategory === category.name
                              ? "bg-purple-600 text-white"
                              : "bg-white/10 text-purple-200 hover:bg-white/15"
                          }`}
                        >
                          {category.icon}
                          {category.name}
                          <ChevronRight
                            className={`h-3 w-3 transition-transform ${
                              activeCategory === category.name
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar pr-2">
                    {ALL_SPECIALIZATIONS.map((spec) => {
                      // Only show all specs or those in active category
                      const shouldShow =
                        !activeCategory ||
                        SPECIALIZATION_CATEGORIES.find(
                          (cat) => cat.name === activeCategory
                        )?.items.includes(spec);

                      if (!shouldShow) return null;

                      return (
                        <motion.button
                          key={spec}
                          onClick={() => handleSpecializationToggle(spec)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                            selectedSpecializations.includes(spec)
                              ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                              : "bg-white/10 text-purple-200 hover:bg-white/15"
                          }`}
                        >
                          {spec}
                          {selectedSpecializations.includes(spec) && (
                            <span className="ml-1">✓</span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Result count */}
                  <div className="mt-2 text-xs text-purple-200">
                    {filteredExperts.length === 1
                      ? "1 szakértő találat"
                      : `${filteredExperts.length} szakértő találat`}

                    {selectedSpecializations.length > 0 && (
                      <span>
                        {" "}
                        ({selectedSpecializations.length} aktív szűrő)
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Experts List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredExperts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20 shadow-lg"
              >
                <div className="inline-flex justify-center items-center w-12 h-12 bg-purple-600/30 rounded-full mb-3">
                  <Search className="h-6 w-6 text-purple-200" />
                </div>
                <h3 className="text-xl text-white mb-2">Nincs találat</h3>
                <p className="text-purple-200 text-sm">
                  Próbáld meg módosítani a keresési feltételeket a találatok
                  megjelenítéséhez.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-3 px-4 py-1.5 bg-purple-600/50 hover:bg-purple-600/70 text-white rounded-lg transition-colors text-sm"
                >
                  Szűrők törlése
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredExperts.map((expert, index) => (
                  <motion.div
                    key={expert.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover="hover"
                    onClick={() => handleViewExpert(expert.id)}
                    onMouseEnter={() => setHoveredExpertId(expert.id)}
                    onMouseLeave={() => setHoveredExpertId(null)}
                    className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 shadow-lg transition-all cursor-pointer relative group"
                  >
                    {/* Subtle hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-indigo-600/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                    <div className="p-3">
                      <div className="md:flex items-center">
                        {/* Expert photo with enhanced styling - made smaller */}
                        <div className="md:w-1/6 flex justify-center mb-3 md:mb-0">
                          <motion.div
                            className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 relative shadow-md"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 mix-blend-overlay"></div>
                            <img
                              src={expert.photo || "/placeholder-expert.jpg"}
                              alt={expert.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder-expert.jpg";
                              }}
                            />
                          </motion.div>
                        </div>

                        {/* Expert info with better typography and spacing - made more compact */}
                        <div className="md:w-3/6 md:pl-4">
                          <h2 className="text-lg font-semibold text-white mb-0.5 group-hover:text-purple-200 transition-colors">
                            {expert.name}
                          </h2>
                          <p className="text-purple-300 mb-1.5 text-sm">
                            {expert.title}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-purple-200 mb-2">
                            <div className="flex items-center bg-white/5 px-2 py-0.5 rounded-full">
                              <Clock className="h-3 w-3 mr-1 text-purple-300" />
                              {expert.experience}
                            </div>
                            <div className="flex items-center bg-white/5 px-2 py-0.5 rounded-full">
                              <Users className="h-3 w-3 mr-1 text-purple-300" />
                              {expert.reviewCount} értékelés
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-2 md:mb-0">
                            {expert.specializations
                              .slice(0, 3)
                              .map((spec, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-purple-500/20 text-white rounded-full text-xs backdrop-blur-md border border-white/10"
                                >
                                  {spec}
                                </span>
                              ))}
                            {expert.specializations.length > 3 && (
                              <span className="px-2 py-0.5 bg-white/10 text-purple-200 rounded-full text-xs">
                                +{expert.specializations.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Rating and price with enhanced visuals - more compact */}
                        <div className="md:w-2/6 flex flex-col items-start md:items-end mt-2 md:mt-0 md:border-l border-white/10 md:pl-3">
                          <div className="flex items-center mb-1.5 bg-white/5 px-2 py-1 rounded-lg">
                            <div className="flex mr-1">
                              {renderStars(expert.rating)}
                            </div>
                            <span className="text-white font-medium text-sm">
                              {expert.rating}
                            </span>
                          </div>

                          <p className="text-purple-300 text-xs mb-1.5 bg-white/5 px-2 py-1 rounded-lg inline-flex items-center">
                            <Clock className="h-3 w-3 mr-1.5 text-purple-400" />
                            {expert.availability.replace(
                              "Következő szabad időpont: ",
                              ""
                            )}
                          </p>

                          <div className="flex items-center bg-gradient-to-r from-purple-600/30 to-indigo-600/30 px-2 py-1 rounded-lg border border-white/10">
                            <p className="text-white font-medium text-sm">
                              {expert.hourlyRate}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Expert intro with better formatting - more compact */}
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <p className="text-purple-100 text-xs line-clamp-2 italic">
                          "{expert.introduction}"
                        </p>

                        {/* View profile prompt */}
                        <motion.div
                          className="mt-1 flex justify-end"
                          initial={{ opacity: 0.5 }}
                          animate={{
                            opacity: hoveredExpertId === expert.id ? 1 : 0.5,
                          }}
                        >
                          <span className="text-purple-300 text-xs flex items-center">
                            Profil megtekintése
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ExpertsListPage;
