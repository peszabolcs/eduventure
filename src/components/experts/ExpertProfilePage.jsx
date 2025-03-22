import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Calendar, ArrowLeft, MessageCircle } from "lucide-react";

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

  // Find the expert with the matching ID
  const expert =
    EXPERTS.find((expert) => expert.id === parseInt(id)) || EXPERTS[0];

  // Generate star rating display
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
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

  // Reviews to display
  const displayedReviews = showAllReviews
    ? expert.reviews
    : expert.reviews.slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 pt-16">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white mb-6 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Vissza a szakértőkhöz
        </button>

        {/* Expert profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20"
        >
          <div className="md:flex items-start">
            {/* Expert photo */}
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/30">
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
            <div className="md:w-3/4 md:pl-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {expert.name}
              </h1>
              <h2 className="text-xl text-purple-300 mb-4">{expert.title}</h2>

              <div className="flex items-center mb-4">
                <div className="flex mr-2">{renderStars(expert.rating)}</div>
                <span className="text-white">
                  {expert.rating} ({expert.reviewCount} értékelés)
                </span>
              </div>

              <div className="text-white mb-4">
                <p className="font-semibold">
                  Tapasztalat: {expert.experience}
                </p>
                <p className="font-semibold mt-1">Díj: {expert.hourlyRate}</p>
                <p className="text-purple-200 mt-1">{expert.availability}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {expert.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/30 text-white rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookAppointment}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Időpontfoglalás
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all border border-white/30"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Üzenet küldése
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expert details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Bio and expertise */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Bemutatkozás
              </h3>
              <p className="text-purple-100 leading-relaxed">
                {expert.introduction}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Végzettség és szakmai háttér
              </h3>
              <div className="mb-4">
                <h4 className="text-white font-medium mb-1">Végzettség</h4>
                <p className="text-purple-200">{expert.education}</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Szakterületek</h4>
                <ul className="list-disc list-inside text-purple-200">
                  {expert.specializations.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right column: Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-white">
                  Értékelések
                </h3>
                <div className="flex items-center">
                  <div className="flex mr-2">{renderStars(expert.rating)}</div>
                  <span className="text-white font-medium">
                    {expert.rating}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {displayedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-white/10 pb-4 last:border-0"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">{review.name}</h4>
                      <span className="text-purple-300 text-sm">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-purple-100">{review.text}</p>
                  </div>
                ))}
              </div>

              {expert.reviews.length > 2 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-purple-300 hover:text-white mt-4 font-medium transition-colors"
                >
                  {showAllReviews
                    ? "Kevesebb vélemény mutatása"
                    : `Összes vélemény mutatása (${expert.reviews.length})`}
                </button>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Kapcsolat
              </h3>
              <p className="text-purple-100 mb-2">
                Email: {expert.contactInfo.email}
              </p>
              <p className="text-purple-100">
                Telefon: {expert.contactInfo.phone}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfilePage;
