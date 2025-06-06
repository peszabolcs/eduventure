"use client";

import { motion } from "framer-motion";
import PersonalityTestButton from "./ui/personality-test-button";
import { useEffect, useState } from "react";

export default function Hero() {
  // Detektáljuk a PWA módot
  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy PWA módban vagyunk-e
    const isPwaMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://");

    setIsPwa(isPwaMode);

    // Figyelje a display-mode változásait
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleChange = (e) => {
      setIsPwa(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // A Hero szekció osztálya a PWA mód alapján
  const sectionClassName = `relative min-h-screen flex md:flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4 ${
    isPwa ? "pt-20 hero-section-pwa safe-area-top" : "" // PWA módban extra padding-top és safe-area kezelés
  }`;

  return (
    <section id="hero-section" className={sectionClassName}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/logo.webp"
            alt="EduVenture Logo"
            className="w-48 h-48 sm:w-52 sm:h-52 md:w-64 md:h-64 mx-auto object-contain"
          />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            EduVenture
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-purple-100 mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
        >
          Fedezd fel a különböző szakmákat és találd meg a hozzád legjobban illő
          karrierutat egy innovatív, interaktív platformon!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4 sm:space-y-0 space-x-4"
        ></motion.div>
        <PersonalityTestButton />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-8"
      >
        <svg
          className="w-6 h-6 text-white animate-bounce"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>

      {/* Subtle gradient transition at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>

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
                
                /* PWA-specifikus stílusok az iPhone biztonságos területekhez */
                @media all and (display-mode: standalone) {
                    .safe-area-top {
                        padding-top: env(safe-area-inset-top, 0px);
                    }
                }
            `}</style>
    </section>
  );
}
