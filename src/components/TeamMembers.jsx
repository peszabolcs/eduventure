import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function TeamSection() {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: t("team.members.perjesi.name"),
      study: t("team.members.perjesi.study"),
      role: t("team.members.perjesi.role"),
      image: "/perjesi.jpg",
    },
    {
      name: t("team.members.patrik.name"),
      study: t("team.members.patrik.study"),
      role: t("team.members.patrik.role"),
      image: "/patrik.jpg",
    },
    {
      name: t("team.members.david.name"),
      study: t("team.members.david.study"),
      role: t("team.members.david.role"),
      image: "/balo.jpg",
    },
    {
      name: t("team.members.zalan.name"),
      study: t("team.members.zalan.study"),
      role: t("team.members.zalan.role"),
      image: "/zazi.jpg",
    },
  ];

  return (
    <section id="team-section" className="relative py-16 md:py-24 min-h-screen">
      {/* Subtle gradient transition at the top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent"></div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Particle-like elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${3 + Math.random() * 7}s ease-in-out ${
                  Math.random() * 5
                }s infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 mx-auto"
            >
              <span className="text-white/90 text-sm font-medium">
                {t("team.tagline")}
              </span>
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
            {t("team.title")}
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            {t("team.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="relative p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent rounded-2xl"></div>
                <div className="relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-[120px] h-[120px] object-cover rounded-xl mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 p-1 group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300"
                  />
                  <h3 className="text-xl font-bold mb-2 text-center text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-indigo-200/80 mb-2 text-center text-sm">
                    {member.study}
                  </p>
                  <p className="text-purple-300 font-medium text-center text-sm">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
