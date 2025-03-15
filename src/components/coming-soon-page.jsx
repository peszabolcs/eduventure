"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

const ComingSoonPage = () => {
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
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="absolute inset-0 min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-violet-900">
          <>
            <style>
              {`
                .safari-blur {
                  background: rgba(255, 255, 255, 0.03);
                  -webkit-backdrop-filter: blur(8px);
                  backdrop-filter: blur(8px);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                }

                @supports not ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px))) {
                  .safari-blur {
                    background: rgba(255, 255, 255, 0.15);
                  }
                }

                /* Külön osztály a konténernek */
                .container-blur {
                  background: rgba(255, 255, 255, 0.02);
                  -webkit-backdrop-filter: blur(12px);
                  backdrop-filter: blur(12px);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                }

                @supports not ((-webkit-backdrop-filter: blur(12px)) or (backdrop-filter: blur(12px))) {
                  .container-blur {
                    background: rgba(255, 255, 255, 0.1);
                  }
                }

                @keyframes floatBackground {
                  0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.1;
                  }
                  50% {
                    transform: translate(5px, -10px) scale(1.005);
                    opacity: 0.15;
                  }
                  100% {
                    transform: translate(-5px, 10px) scale(1);
                    opacity: 0.1;
                  }
                }

                .counter-box {
                  background: rgba(255, 255, 255, 0.1);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .container-glass {
                  background: rgba(255, 255, 255, 0.1);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                }

                .input-glass {
                  background: rgba(255, 255, 255, 0.1);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                }

                /* Hover effektek a jobb interakcióért */
                .counter-box:hover,
                .input-glass:hover {
                  background: rgba(255, 255, 255, 0.15);
                  transition: all 0.3s ease;
                }

                .input-glass:focus {
                  background: rgba(255, 255, 255, 0.2);
                }
              `}
            </style>
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
              {showConfetti && (
                <Confetti
                  width={windowSize.width}
                  height={windowSize.height}
                  recycle={false}
                  numberOfPieces={500}
                  gravity={0.5}
                  wind={0.05}
                  initialVelocityY={10}
                  tweenDuration={4000}
                  colors={[
                    "#FFD700",
                    "#FFA500",
                    "#FF69B4",
                    "#87CEEB",
                    "#98FB98",
                    "#DDA0DD",
                  ]}
                  opacity={0.8}
                />
              )}

              {/* Nagy háttérelemek */}
              {backgroundElements}

              {/* Fő tartalom konténer */}
              <div className="max-w-xl container-glass rounded-xl p-8 shadow-2xl z-10">
                <div className="text-purple-300 mb-2 font-semibold">
                  HAMAROSAN ÉRKEZIK
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Személyiségteszt
                </h1>

                <p className="text-purple-200 mb-6">
                  Köszönjük érdeklődésedet a személyiségtesztünk iránt! Jelenleg
                  még dolgozunk rajta, hogy a lehető legjobb élményt nyújthassuk
                  számodra.
                </p>

                {/* Interaktív visszaszámláló */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="counter-box rounded-lg p-3">
                    <div className="text-3xl font-bold text-white">
                      {daysLeft}
                    </div>
                    <div className="text-purple-300/90 text-sm">Nap</div>
                  </div>
                  <div className="counter-box rounded-lg p-3">
                    <div className="text-3xl font-bold text-white">
                      {hoursLeft}
                    </div>
                    <div className="text-purple-300/90 text-sm">Óra</div>
                  </div>
                  <div className="counter-box rounded-lg p-3">
                    <div className="text-3xl font-bold text-white">
                      {minutesLeft}
                    </div>
                    <div className="text-purple-300/90 text-sm">Perc</div>
                  </div>
                  <div className="counter-box rounded-lg p-3">
                    <div className="text-3xl font-bold text-white">
                      {secondsLeft}
                    </div>
                    <div className="text-purple-300/90 text-sm text-center">
                      Másodperc
                    </div>
                  </div>
                </div>

                {/* Interaktív folyamatjelző */}
                <div className="w-full bg-purple-300/10 h-3 rounded-full mb-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-pink-500 h-full rounded-full"
                    style={{
                      width: "75%",
                      animation: "pulse 2s infinite",
                    }}
                  ></div>
                </div>

                {/* Email feliratkozás */}
                {!isSubscribed ? (
                  <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Add meg az email címed"
                        className="flex-grow input-glass rounded-full px-4 py-2 text-white placeholder-purple-300/70 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="submit"
                        className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full transform transition-all duration-300 hover:scale-105 ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                      >
                        {isLoading ? "Folyamatban..." : "Értesíts"}
                      </button>
                    </div>
                    {error && (
                      <div className="mt-2 text-red-400 text-sm">{error}</div>
                    )}
                  </form>
                ) : (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 border border-green-300/30">
                    <div className="text-green-300 font-semibold">
                      Köszönjük a feliratkozást!
                    </div>
                    <div className="text-purple-200">
                      Értesíteni fogunk, amint a személyiségteszt elérhető lesz.
                    </div>
                  </div>
                )}

                {/* Interaktív gombok */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/"
                    className="bg-white text-purple-900 font-bold py-3 px-6 rounded-full hover:bg-purple-100 transition-colors duration-300 flex items-center justify-center no-underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Vissza a főoldalra
                  </Link>

                  <button
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/sharer/sharer.php?u=" +
                          encodeURIComponent(window.location.href),
                        "_blank"
                      )
                    }
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-full hover:from-blue-600 hover:to-blue-800 transition-colors duration-300 flex items-center justify-center"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Megosztás
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
