"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  BookOpen,
  MessageCircle,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "AI-alapú pályaorientáció",
    description:
      "Személyre szabott karrierút-ajánlások érdeklődési köröd és képességeid alapján. Kapcsolatba léphetsz szakértőkkel one-on-one meetingeken vagy csoportos szemináriumokon.",
    color: "from-violet-500 to-purple-600",
    delay: 0.1,
  },
  {
    icon: GraduationCap,
    title: "Egyetemi statisztikák",
    description:
      "Összehasonlítható adatok és értékelések egyetemekről, szakokról. Valós visszajelzések korábbi hallgatóktól, hogy megalapozott döntést hozhass.",
    color: "from-blue-500 to-cyan-600",
    delay: 0.2,
  },
  {
    icon: Building2,
    title: "Virtuális cégtúrák",
    description:
      "Betekintés különböző munkakörök mindennapjaiba interaktív élményeken keresztül. Ismerd meg a szakmák valódi működését még a pályaválasztás előtt.",
    color: "from-emerald-500 to-teal-600",
    delay: 0.3,
  },
  {
    icon: MessageCircle,
    title: "Közösségi terek",
    description:
      "Csatlakozz hasonló érdeklődésű fiatalokhoz, ossz meg tapasztalatokat és építs kapcsolatokat. Tematikus fórumok különböző iparágakhoz kapcsolódóan.",
    color: "from-orange-500 to-amber-600",
    delay: 0.4,
  },
  {
    icon: Briefcase,
    title: "Gyakornoki programok",
    description:
      "Fedezd fel a szakodnak megfelelő gyakornoki lehetőségeket. Jelentkezz közvetlenül az oldalon keresztül, és szerezz értékes munkatapasztalatot.",
    color: "from-pink-500 to-rose-600",
    delay: 0.5,
  },
  {
    icon: BookOpen,
    title: "Blog és tudásbázis",
    description:
      "Naprakész cikkek, karriertippek és szakmai útmutatók. Bővítsd tudásod a különböző szakmákról és iparágakról hiteles forrásokból.",
    color: "from-red-500 to-rose-600",
    delay: 0.6,
  },
];

export default function ProjectDetails() {
  return (
    <section
      id="project-details"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

      {/* Section divider - top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent"></div>

      {/* Animated blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Particle-like elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
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
              <Sparkles className="w-5 h-5 text-yellow-300 mr-2" />
              <span className="text-white/90 text-sm font-medium">
                Fedezd fel karriered jövőjét
              </span>
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
            Fedezd fel a jövőd
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Az <span className="font-semibold text-white">EduVenture</span> egy
            innovatív platform, amely segíti a pályaválasztás előtt álló
            középiskolásokat és egyetemistákat a karrierutak megismerésében.
            Célunk, hogy interaktív, informatív és értékalapú segítséget
            nyújtsunk, miközben közösséget építünk a fiatalok számára.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-white/10"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-8">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-r from-indigo-600/40 to-purple-600/40 backdrop-blur-lg rounded-3xl p-8 md:p-12 text-white shadow-xl border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Miért válaszd az EduVenture-t?
              </h3>
              <p className="mb-6 leading-relaxed text-white/80">
                Platformunk egyedülálló módon ötvözi a mesterséges
                intelligenciát, a közösségi élményt és a valós szakmai
                tapasztalatokat, hogy segítsen megtalálni a számodra
                legmegfelelőbb karrierutat.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 mt-0.5">
                    <BarChart3 className="w-3.5 h-3.5 text-blue-300" />
                  </div>
                  <span className="text-white/90">
                    Adatvezérelt döntéstámogatás
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center mr-3 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                  <span className="text-white/90">
                    Valódi szakértőkkel való kapcsolat
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-pink-500/30 flex items-center justify-center mr-3 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-pink-300" />
                  </div>
                  <span className="text-white/90">
                    Betekintés a munka világába
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-xl"></div>
              <div className="relative p-6 md:p-8 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-xl"></div>
                <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                  Értesülj az indulásról!
                </h4>
                <p className="mb-6 text-white/80">
                  Iratkozz fel hírlevelünkre, hogy elsőként értesülj a platform
                  indulásáról és a legfrissebb fejlesztésekről. Légy részese a
                  kezdeteknek!
                </p>
                <Link to="/szemelyisegteszt">
                  <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:translate-y-0">
                    Feliratkozás a hírlevélre
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section divider - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Add animation keyframes */}
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
