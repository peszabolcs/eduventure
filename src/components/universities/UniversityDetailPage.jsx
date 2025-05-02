import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
// Import the correct function from the main UniversitiesPage
import { getUniversityById } from "./UniversitiesPage";
import { MapPin, BookOpen, ChevronLeft, GraduationCap } from "lucide-react";

const UniversityDetailPage = () => {
  const { id } = useParams();
  // getUniversityById from UniversitiesPage already handles parsing the ID
  const university = getUniversityById(id);

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            Egyetem nem található
          </h2>
          <p className="text-gray-700 mb-6">
            A keresett egyetem (ID: {id}) nem létezik vagy az adatai hiányosak.
          </p>
          <Link
            to="/egyetemek"
            className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow hover:shadow-md"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Vissza az egyetemek listájához
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            to="/egyetemek"
            className="inline-flex items-center text-sm text-purple-300 hover:text-white font-medium group transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Vissza az egyetemekhez
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden mb-10 border border-white/20"
        >
          <div className="md:flex">
            <div className="md:w-1/3 flex items-center justify-center p-6 bg-black/10">
              <motion.img
                src={university.logo}
                alt={`${university.name} logo`}
                className="h-32 object-contain filter drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
            </div>
            <div className="md:w-2/3 p-6 md:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {university.name} ({university.shortName})
              </h1>
              <p className="text-purple-200 mb-4 text-base">
                {university.description}
              </p>
              <div className="flex items-center text-sm text-purple-300">
                <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                <span>{university.location}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-3 text-purple-400" />
            Karok és Képzések
          </h2>

          <div className="space-y-6">
            {university.faculties.map((faculty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-lg shadow-md border border-white/10 overflow-hidden hover:border-white/20 transition-colors duration-300"
              >
                <div className="bg-black/10 p-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-purple-200">
                    {faculty.name}
                  </h3>
                </div>
                <div className="p-5">
                  <h4 className="text-sm font-medium text-purple-300 mb-3 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-purple-400" />
                    Képzési területek:
                  </h4>
                  {faculty.programs && faculty.programs.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                      {faculty.programs.map((program, pIndex) => (
                        <li key={pIndex} className="text-sm text-purple-100">
                          {program}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-purple-300 italic">
                      Nincsenek megadva képzések ehhez a karhoz.
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;
