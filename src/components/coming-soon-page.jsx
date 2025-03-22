"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const ComingSoonPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [daysLeft, setDaysLeft] = useState(90);
  const [hoursLeft, setHoursLeft] = useState(20);
  const [minutesLeft, setMinutesLeft] = useState(18);
  const [secondsLeft, setSecondsLeft] = useState(24);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageInfo, setPageInfo] = useState({
    title: "Hamarosan érkezik!",
    description: "Ez a funkció hamarosan elérhető lesz. Nézz vissza később!",
    buttonText: "Vissza a főoldalra",
    buttonLink: "/",
  });

  // Visszaszámláló szimuláció
  useEffect(() => {
    const timer = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        setSecondsLeft(59);
        if (minutesLeft > 0) {
          setMinutesLeft(minutesLeft - 1);
        } else {
          setMinutesLeft(59);
          if (hoursLeft > 0) {
            setHoursLeft(hoursLeft - 1);
          } else {
            setHoursLeft(23);
            if (daysLeft > 0) {
              setDaysLeft(daysLeft - 1);
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, minutesLeft, hoursLeft, daysLeft]);

  // Ablakméret figyelése a konfettihez
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Konfetti megjelenítése oldal betöltésekor
  useEffect(() => {
    setShowConfetti(true);
    // Nem állítjuk le időzítővel, helyette hagyjuk természetesen "kiesni"
  }, []);

  useEffect(() => {
    // Set page-specific information based on the current route
    switch (location.pathname) {
      case "/szemelyisegteszt":
        setPageInfo({
          title: "Személyiségteszt",
          description:
            "A személyiségteszt funkció fejlesztés alatt áll. Látogass vissza hamarosan!",
          buttonText: "Próbáld ki a pályaorientációs tesztet",
          buttonLink: "/palyaorientacio",
        });
        break;
      case "/szakerto-kereso":
        setPageInfo({
          title: "Szakértő kereső",
          description:
            "A szakértő kereső funkció hamarosan elérhető lesz. Itt majd szakemberekkel konzultálhatsz a karrieredről.",
          buttonText: "Vissza a pályaorientációs teszthez",
          buttonLink: "/palyaorientacio",
        });
        break;
      case "/ajanlott-utak":
        setPageInfo({
          title: "Ajánlott karrierutak",
          description:
            "Az ajánlott karrierutak funkció fejlesztés alatt áll. Hamarosan személyre szabott karrierötleteket kaphatsz.",
          buttonText: "Vissza a pályaorientációs teszthez",
          buttonLink: "/palyaorientacio",
        });
        break;
      default:
        setPageInfo({
          title: "Hamarosan érkezik!",
          description:
            "Ez a funkció hamarosan elérhető lesz. Nézz vissza később!",
          buttonText: "Vissza a főoldalra",
          buttonLink: "/",
        });
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("backend/subscribe_email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hiba történt a feliratkozás során");
      }

      setIsSubscribed(true);
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Csak a nagy, lassú háttérelemek
  const backgroundElements = Array.from({ length: 3 }, (_, i) => {
    const size = Math.random() * 200 + 150; // Nagyobb méretek (150-350px)
    const left = Math.random() * 90 + 5;
    const top = Math.random() * 90 + 5;
    const delay = i * 30; // Még nagyobb késleltetés
    const duration = 240 + Math.random() * 120; // Még lassabb animáció (4-6 perc)

    return (
      <div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl"
        style={{
          width: size + "px",
          height: size + "px",
          left: left + "%",
          top: top + "%",
          animation: `floatBackground ${duration}s linear infinite alternate`,
          transition: "all 8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    );
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4 py-12">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-lg opacity-75"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            {pageInfo.title}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-purple-200 mb-8"
          >
            {pageInfo.description}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to={pageInfo.buttonLink}
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {pageInfo.buttonText}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
