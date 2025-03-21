import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Search, Users, Clock, Filter } from "lucide-react";

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

const ExpertsListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredExperts, setFilteredExperts] = useState(EXPERTS);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Szakértők
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Találj személyre szabott tanácsadást és támogatást pályaválasztási,
            tanulási és karrierkérdésekben.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
            {/* Search input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type="text"
                placeholder="Keresés név vagy szakterület alapján..."
                className="block w-full bg-white/5 border border-white/20 rounded-lg pl-10 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter toggle button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-lg transition-colors border border-white/20"
            >
              <Filter className="h-5 w-5" />
              Szűrők {showFilters ? "elrejtése" : "mutatása"}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <h3 className="text-white font-medium mb-3">Szakterületek</h3>
              <div className="flex flex-wrap gap-2">
                {ALL_SPECIALIZATIONS.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => handleSpecializationToggle(spec)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedSpecializations.includes(spec)
                        ? "bg-purple-600 text-white"
                        : "bg-white/10 text-purple-200 hover:bg-white/15"
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Experts List */}
        <div className="space-y-6">
          {filteredExperts.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center border border-white/20">
              <h3 className="text-xl text-white mb-2">Nincs találat</h3>
              <p className="text-purple-200">
                Próbáld meg módosítani a keresési feltételeket a találatok
                megjelenítéséhez.
              </p>
            </div>
          ) : (
            filteredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
                onClick={() => handleViewExpert(expert.id)}
              >
                <div className="md:flex items-center">
                  {/* Expert photo */}
                  <div className="md:w-1/6 flex justify-center mb-4 md:mb-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30">
                      <img
                        src={expert.photo || "/placeholder-expert.jpg"}
                        alt={expert.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder-expert.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Expert info */}
                  <div className="md:w-3/6 md:pl-4">
                    <h2 className="text-xl font-semibold text-white">
                      {expert.name}
                    </h2>
                    <p className="text-purple-300 mb-2">{expert.title}</p>

                    <div className="flex items-center gap-4 text-sm text-purple-200 mb-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {expert.experience}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {expert.reviewCount} értékelés
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3 md:mb-0">
                      {expert.specializations.slice(0, 3).map((spec, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-500/30 text-white rounded-full text-xs"
                        >
                          {spec}
                        </span>
                      ))}
                      {expert.specializations.length > 3 && (
                        <span className="px-2 py-1 bg-purple-500/20 text-white rounded-full text-xs">
                          +{expert.specializations.length - 3} további
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating and price */}
                  <div className="md:w-2/6 flex flex-col items-start md:items-end mt-4 md:mt-0">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderStars(expert.rating)}
                      </div>
                      <span className="text-white font-medium">
                        {expert.rating}
                      </span>
                    </div>

                    <p className="text-purple-200 text-sm mb-3">
                      {expert.availability}
                    </p>
                    <p className="text-white font-medium">
                      {expert.hourlyRate}
                    </p>
                  </div>
                </div>

                {/* Expert intro - only shown on mobile */}
                <div className="mt-4 md:hidden">
                  <p className="text-purple-100 text-sm line-clamp-2">
                    {expert.introduction}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertsListPage;
