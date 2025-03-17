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
import { useLanguage } from "./LanguageContext";

// A feature objektumokat dinamikusan építjük fel a fordítási kulcsok alapján
export default function ProjectDetails() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t("project.features.ai.title"),
      description: t("project.features.ai.description"),
      color: "from-violet-500 to-purple-600",
      delay: 0.1,
    },
    {
      icon: GraduationCap,
      title: t("project.features.university.title"),
      description: t("project.features.university.description"),
      color: "from-blue-500 to-cyan-600",
      delay: 0.2,
    },
    {
      icon: Building2,
      title: t("project.features.company.title"),
      description: t("project.features.company.description"),
      color: "from-emerald-500 to-teal-600",
      delay: 0.3,
    },
    {
      icon: MessageCircle,
      title: t("project.features.community.title"),
      description: t("project.features.community.description"),
      color: "from-orange-500 to-amber-600",
      delay: 0.4,
    },
    {
      icon: Briefcase,
      title: t("project.features.internship.title"),
      description: t("project.features.internship.description"),
      color: "from-pink-500 to-rose-600",
      delay: 0.5,
    },
    {
      icon: BookOpen,
      title: t("project.features.blog.title"),
      description: t("project.features.blog.description"),
      color: "from-red-500 to-rose-600",
      delay: 0.6,
    },
  ];

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
                {t("project.tagline")}
              </span>
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
            {t("project.title")}
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            {t("project.description")}
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
                {t("project.whyUs.title")}
              </h3>
              <p className="mb-6 leading-relaxed text-white/80">
                {t("project.whyUs.description")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 mt-0.5">
                    <BarChart3 className="w-3.5 h-3.5 text-blue-300" />
                  </div>
                  <span className="text-white/90">
                    {t("project.whyUs.points.data")}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center mr-3 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                  <span className="text-white/90">
                    {t("project.whyUs.points.experts")}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-pink-500/30 flex items-center justify-center mr-3 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-pink-300" />
                  </div>
                  <span className="text-white/90">
                    {t("project.whyUs.points.insight")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-xl"></div>
              <div className="relative p-6 md:p-8 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-xl"></div>
                <h4 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                  {t("project.newsletter.title")}
                </h4>
                <p className="mb-6 text-white/80">
                  {t("project.newsletter.description")}
                </p>
                <Link to="/szemelyisegteszt">
                  <button className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:translate-y-0">
                    {t("project.newsletter.button")}
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
