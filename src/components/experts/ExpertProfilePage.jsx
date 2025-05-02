import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Calendar,
  ArrowLeft,
  MessageCircle,
  Check,
  Clock,
  Mail,
  Phone,
  Award,
  Bookmark,
  ChevronDown,
  User,
  BookOpen,
} from "lucide-react";

// Sample expert data - would come from an API in a real application
const EXPERTS = [
  {
    id: 1,
    name: "Dr. Nagy Katalin",
    title: "Pszichológus, Pályaválasztási tanácsadó",
    photo: "/szakertok/drnagykati.png",
    experience: "15+ év tapasztalat",
    specializations: ["Pályaorientáció", "Karrierváltás", "Stresszkezelés"],
    introduction:
      "Szakterületem a fiatalok és felnőttek pályaválasztási tanácsadása, karriertervezése. Több mint 15 éves szakmai tapasztalattal segítek a diákoknak megtalálni az érdeklődésüknek és képességeiknek leginkább megfelelő irányt. Pszichológiai megközelítéssel és gyakorlati tanácsokkal támogatom az egyéni célok megfogalmazását és elérését.",
    rating: 4.8,
    reviewCount: 124,
    availability: "Következő szabad időpont: 2023. június 8.",
    hourlyRate: "15.000 Ft / 60 perc",
    education: "Eötvös Loránd Tudományegyetem, Pszichológia szak",
    contactInfo: {
      email: "nagy.katalin@example.com",
      phone: "+36 20 123 4567",
    },
    reviews: [
      {
        id: 1,
        name: "Kovács Péter",
        date: "2023. május 15.",
        rating: 5,
        text: "Katalin nagyon segítőkész és türelmes volt. Sokat segített tisztázni a jövőbeli céljaimat és a hozzájuk vezető lépéseket. Őszintén ajánlom mindenkinek, aki bizonytalan a pályaválasztással kapcsolatban.",
      },
      {
        id: 2,
        name: "Tóth Anna",
        date: "2023. április 22.",
        rating: 5,
        text: "Nagyszerű szakember, aki valóban figyel az egyéni igényekre. A tanácsadás után sokkal tisztábban láttam a lehetőségeimet.",
      },
      {
        id: 3,
        name: "Szabó Gábor",
        date: "2023. március 10.",
        rating: 4,
        text: "Hasznos tanácsokat kaptam, amelyek segítettek szűkíteni a szakválasztási lehetőségeimet. Ajánlom.",
      },
    ],
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
      "Mérnöki háttérrel rendelkező karriertanácsadó vagyok, aki különösen a műszaki és informatikai területen segít eligazodni. Egyetemi oktatóként is dolgozom, így naprakész információkkal rendelkezem az iparági elvárásokról és a felsőoktatási lehetőségekről egyaránt. Tanácsadásomban nagy hangsúlyt fektetek a gyakorlati szempontokra és a munkaerőpiaci trendekre.",
    rating: 4.7,
    reviewCount: 98,
    availability: "Következő szabad időpont: 2023. június 5.",
    hourlyRate: "18.000 Ft / 60 perc",
    education:
      "Budapesti Műszaki és Gazdaságtudományi Egyetem, Villamosmérnöki szak",
    contactInfo: {
      email: "kovacs.istvan@example.com",
      phone: "+36 30 987 6543",
    },
    reviews: [
      {
        id: 1,
        name: "Nagy Márton",
        date: "2023. május 20.",
        rating: 5,
        text: "István tanácsadása rendkívül hasznos volt számomra. Az IT szektor különböző területeiről kapott átfogó képet, valamint gyakorlati tanácsokat a karrierem építéséhez.",
      },
      {
        id: 2,
        name: "Kiss Viktória",
        date: "2023. április 12.",
        rating: 4,
        text: "Szakmailag nagyon felkészült, reális képet adott a mérnöki pályákról és a jelenlegi álláslehetőségekről.",
      },
    ],
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
      "A külföldi tanulmányok és ösztöndíjprogramok szakértőjeként segítek a diákoknak eligazodni a nemzetközi oktatási lehetőségek között. Korábban magam is több külföldi egyetemen tanultam és dolgoztam oktatási tanácsadóként. Gyakorlati tapasztalattal rendelkezem a sikeres jelentkezések, motivációs levelek és interjúk területén, és szívesen osztom meg ezt a tudást az érdeklődőkkel.",
    rating: 4.9,
    reviewCount: 87,
    availability: "Következő szabad időpont: 2023. június 10.",
    hourlyRate: "16.000 Ft / 60 perc",
    education: "University of Cambridge, Oktatási menedzsment",
    contactInfo: {
      email: "horvath.judit@example.com",
      phone: "+36 70 456 7890",
    },
    reviews: [
      {
        id: 1,
        name: "Molnár Eszter",
        date: "2023. május 8.",
        rating: 5,
        text: "Judit segítségével sikeresen jelentkeztem egy németországi egyetemre. A teljes folyamatban támogatott, a dokumentumok összeállításától kezdve a motivációs levél megírásáig.",
      },
      {
        id: 2,
        name: "Varga Dániel",
        date: "2023. március 25.",
        rating: 5,
        text: "Kiváló tanácsadó, aki személyre szabott segítséget nyújt. Nekem különösen az Erasmus program lehetőségeivel kapcsolatban adott hasznos információkat.",
      },
    ],
  },
];

const ExpertProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeTab, setActiveTab] = useState("about"); // 'about', 'background', 'reviews'

  // Find the expert with the matching ID
  const expert =
    EXPERTS.find((expert) => expert.id === parseInt(id)) || EXPERTS[0];

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

  // Handle booking button click
  const handleBookAppointment = () => {
    alert("Időpontfoglalás funkció hamarosan elérhető!");
  };

  const handleSendMessage = () => {
    alert("Üzenetküldés funkció hamarosan elérhető!");
  };

  // Reviews to display
  const displayedReviews = showAllReviews
    ? expert.reviews
    : expert.reviews.slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Enhanced animated background blobs - smaller */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-3000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 pt-24">
        {/* Added pt-24 above to account for the fixed header height */}

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-white mb-6 hover:text-purple-300 transition-colors bg-white/5 px-3 py-1.5 rounded-lg backdrop-blur-sm text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Vissza a szakértőkhöz
        </motion.button>

        {/* Expert profile header - more compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-5 mb-6 border border-white/20 shadow-lg relative overflow-hidden"
        >
          {/* Decorative accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-b from-purple-500/20 to-indigo-500/0 rounded-full -translate-y-1/2 translate-x-1/2 mix-blend-overlay"></div>

          <div className="md:flex items-start relative">
            {/* Expert photo - smaller */}
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-3 border-white/30 relative shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 mix-blend-overlay"></div>
                <img
                  src={expert.photo || "/placeholder-expert.jpg"}
                  alt={expert.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "/placeholder-expert.jpg";
                  }}
                />
              </motion.div>
            </div>

            {/* Expert info - more compact */}
            <div className="md:w-3/4 md:pl-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
                  {expert.name}
                </h1>
                <h2 className="text-lg text-purple-300 mb-3 font-medium">
                  {expert.title}
                </h2>

                <div className="flex items-center mb-4 bg-white/5 px-3 py-1.5 rounded-lg inline-flex">
                  <div className="flex mr-2">{renderStars(expert.rating)}</div>
                  <span className="text-white font-semibold">
                    {expert.rating}
                  </span>
                  <span className="text-purple-200 ml-1 text-sm">
                    ({expert.reviewCount} értékelés)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <Clock className="h-4 w-4 text-purple-300 mr-2" />
                    <div>
                      <p className="text-xs text-purple-200">Tapasztalat</p>
                      <p className="font-semibold text-white text-sm">
                        {expert.experience}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <Calendar className="h-4 w-4 text-purple-300 mr-2" />
                    <div>
                      <p className="text-xs text-purple-200">
                        Következő időpont
                      </p>
                      <p className="font-semibold text-white text-sm">
                        {expert.availability.replace(
                          "Következő szabad időpont: ",
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <Award className="h-4 w-4 text-purple-300 mr-2" />
                    <div>
                      <p className="text-xs text-purple-200">Díjazás</p>
                      <p className="font-semibold text-white text-sm">
                        {expert.hourlyRate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <User className="h-4 w-4 text-purple-300 mr-2" />
                    <div>
                      <p className="text-xs text-purple-200">Végzettség</p>
                      <p className="font-semibold text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        {expert.education}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {expert.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-500/30 text-white rounded-full text-xs backdrop-blur-md border border-white/10 flex items-center"
                    >
                      <Check className="h-3 w-3 mr-1 text-purple-300" />
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBookAppointment}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md text-sm"
                  >
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Időpontfoglalás
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendMessage}
                    className="bg-white/10 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-white/15 transition-all border border-white/20 shadow-md text-sm"
                  >
                    <MessageCircle className="h-4 w-4 mr-1.5" />
                    Üzenet küldése
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 text-white w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all border border-white/20 shadow-md"
                  >
                    <Bookmark className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tab navigation - smaller */}
        <div className="flex mb-4 border-b border-white/10 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2 font-medium transition-colors text-sm ${
              activeTab === "about"
                ? "text-white border-b-2 border-purple-400"
                : "text-purple-200 hover:text-white"
            }`}
          >
            Bemutatkozás
          </button>
          <button
            onClick={() => setActiveTab("background")}
            className={`px-4 py-2 font-medium transition-colors text-sm ${
              activeTab === "background"
                ? "text-white border-b-2 border-purple-400"
                : "text-purple-200 hover:text-white"
            }`}
          >
            Szakmai háttér
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 font-medium transition-colors text-sm ${
              activeTab === "reviews"
                ? "text-white border-b-2 border-purple-400"
                : "text-purple-200 hover:text-white"
            }`}
          >
            Értékelések ({expert.reviews.length})
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-2 font-medium transition-colors text-sm ${
              activeTab === "contact"
                ? "text-white border-b-2 border-purple-400"
                : "text-purple-200 hover:text-white"
            }`}
          >
            Kapcsolat
          </button>
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 gap-5">
          <AnimatePresence mode="wait">
            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <BookOpen className="h-4 w-4 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Bemutatkozás
                  </h3>
                </div>
                <p className="text-purple-100 leading-relaxed">
                  {expert.introduction}
                </p>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="text-white font-medium mb-3 text-sm">
                    Miért válassz engem?
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 mt-0.5">
                        <Check className="h-3 w-3 text-purple-300" />
                      </div>
                      <p className="text-purple-100 text-sm">
                        Személyre szabott tanácsadás egyéni igények alapján
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 mt-0.5">
                        <Check className="h-3 w-3 text-purple-300" />
                      </div>
                      <p className="text-purple-100 text-sm">
                        Naprakész tudás az aktuális trendekről és lehetőségekről
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 mt-0.5">
                        <Check className="h-3 w-3 text-purple-300" />
                      </div>
                      <p className="text-purple-100 text-sm">
                        Gyakorlati megközelítés és konkrét lépések kidolgozása
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 mt-0.5">
                        <Check className="h-3 w-3 text-purple-300" />
                      </div>
                      <p className="text-purple-100 text-sm">
                        Folyamatos támogatás a közös munka során
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "background" && (
              <motion.div
                key="background"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Award className="h-4 w-4 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Végzettség és szakmai háttér
                  </h3>
                </div>

                <div className="mb-5">
                  <h4 className="text-white font-medium mb-3 flex items-center text-sm">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                      <BookOpen className="h-3 w-3 text-purple-300" />
                    </div>
                    Végzettség
                  </h4>
                  <div className="ml-8">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <p className="text-purple-100 text-sm">
                        {expert.education}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3 flex items-center text-sm">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                      <Award className="h-3 w-3 text-purple-300" />
                    </div>
                    Szakterületek
                  </h4>

                  <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {expert.specializations.map((spec, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-2.5 border border-white/10 flex items-center"
                      >
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                          <Check className="h-3 w-3 text-purple-300" />
                        </div>
                        <p className="text-purple-100 text-sm">{spec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <Star className="h-4 w-4 text-purple-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      Értékelések
                    </h3>
                  </div>
                  <div className="flex items-center bg-white/5 px-3 py-1.5 rounded-lg">
                    <div className="flex mr-1.5">
                      {renderStars(expert.rating)}
                    </div>
                    <span className="text-white font-medium text-sm">
                      {expert.rating}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {displayedReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/5 rounded-lg p-3 border border-white/10"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium flex items-center text-sm">
                          <div className="w-6 h-6 rounded-full bg-purple-600/30 flex items-center justify-center mr-2">
                            <User className="h-3 w-3 text-purple-300" />
                          </div>
                          {review.name}
                        </h4>
                        <span className="text-purple-300 text-xs bg-white/5 px-2 py-0.5 rounded-full">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex mb-2 ml-8">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-purple-100 ml-8 italic text-sm">
                        "{review.text}"
                      </p>
                    </motion.div>
                  ))}
                </div>

                {expert.reviews.length > 2 && (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="mt-4 text-purple-300 hover:text-white flex items-center justify-center w-full py-2 bg-white/5 rounded-lg border border-white/10 transition-colors text-sm"
                  >
                    {showAllReviews
                      ? "Kevesebb vélemény mutatása"
                      : `Összes vélemény mutatása (${expert.reviews.length})`}
                    <ChevronDown
                      className={`h-3.5 w-3.5 ml-1.5 transition-transform ${
                        showAllReviews ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>
                )}
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Mail className="h-4 w-4 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Kapcsolatfelvétel
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.a
                    href={`mailto:${expert.contactInfo.email}`}
                    className="bg-white/5 hover:bg-white/10 transition-all p-3 rounded-lg border border-white/10 flex items-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3">
                      <Mail className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-200 mb-0.5">Email</p>
                      <p className="text-white font-medium text-sm">
                        {expert.contactInfo.email}
                      </p>
                    </div>
                  </motion.a>

                  <motion.a
                    href={`tel:${expert.contactInfo.phone}`}
                    className="bg-white/5 hover:bg-white/10 transition-all p-3 rounded-lg border border-white/10 flex items-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3">
                      <Phone className="h-5 w-5 text-purple-300" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-200 mb-0.5">Telefon</p>
                      <p className="text-white font-medium text-sm">
                        {expert.contactInfo.phone}
                      </p>
                    </div>
                  </motion.a>
                </div>

                <div className="mt-5 bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-medium mb-3 text-sm">
                    Küldj üzenetet közvetlenül
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-purple-200 mb-1 block">
                        Neved
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                        placeholder="Add meg a neved..."
                      />
                    </div>

                    <div>
                      <label className="text-xs text-purple-200 mb-1 block">
                        Email címed
                      </label>
                      <input
                        type="email"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                        placeholder="Add meg az email címed..."
                      />
                    </div>

                    <div>
                      <label className="text-xs text-purple-200 mb-1 block">
                        Üzenet
                      </label>
                      <textarea
                        rows="3"
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                        placeholder="Írd meg üzeneted a szakértőnek..."
                      ></textarea>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md w-full text-sm"
                    >
                      <MessageCircle className="h-4 w-4 mr-1.5" />
                      Üzenet küldése
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfilePage;
