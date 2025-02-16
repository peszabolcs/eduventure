import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Perjési Szabolcs",
    study: "SZTE - Programtervező informatikus",
    role: "Tech Lead Developer",
    image: "/perjesi.jpg",
  },
  {
    name: "Lengyel Patrik Gábor",
    study: "SZTE - Pénzügy és számvitel",
    role: "Pénzügyi elemző",
    image: "/patrik.jpg",
  },
  {
    name: "Báló Dávid Levente",
    study: "BCE - Nemzetközi gazdálkodás",
    role: "Műszaki termékfejlesztő",
    image: "/balo.jpg",
  },
  {
    name: "Gellén Zalán",
    study: "BCE - Nemzetközi gazdálkodás",
    role: "Marketing vezető",
    image: "/zazi.jpg",
  },
];

export default function TeamSection() {
  return (
      <section
          id="team-section"
          className="relative py-4 sm:py-8 md:py-16"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-2/4 left-2/3 w-96 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        <div className="container relative mx-auto px-4 sm:px-6">
          <motion.h2
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6}}
              className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 md:mb-16 text-center text-white tracking-tight"
          >
            Csapatunk
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
                <motion.div
                    key={index}
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: index * 0.2}}
                    whileHover={{y: -5, transition: {duration: 0.2}}}
                    className="group"
                >
                  <div
                      className="relative p-4 sm:p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent rounded-2xl"></div>
                    <div className="relative">
                      <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover rounded-xl mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 p-1 group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300"
                      />
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-center text-white group-hover:text-indigo-200 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-indigo-200/80 mb-2 text-center text-xs sm:text-sm">
                        {member.study}
                      </p>
                      <p className="text-purple-300 font-medium text-center text-xs sm:text-sm">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
        <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
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
