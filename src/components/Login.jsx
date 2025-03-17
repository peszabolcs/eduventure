"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, XCircle, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { useLanguage } from "./LanguageContext.jsx";

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/backend/login.php`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Sikeres bejelentkezés
        login(data.user); // Itt csak a user adatokat adjuk át
        navigate("/profile");
      } else {
        setError(data.error || t("auth.messages.loginError"));
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(t("auth.messages.loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    "w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition duration-300";

  return (
    <div className="min-h-screen pt-24">
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-1 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-8 w-full max-w-md relative z-10"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {t("auth.loginTitle")}
          </h2>
          {error && (
            <div className="bg-red-500 bg-opacity-10 text-red-100 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                size={20}
              />
              <motion.input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder={t("auth.email")}
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
                required
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                size={20}
              />
              <motion.input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder={t("auth.password")}
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-300 ${
                isLoading
                  ? "bg-white/50 text-purple-700 cursor-not-allowed"
                  : "bg-white text-purple-700 hover:bg-white/90"
              }`}
            >
              {isLoading ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 border-t-2 border-purple-700 border-solid rounded-full animate-spin mr-2"></div>
                  {t("common.loading")}
                </motion.div>
              ) : (
                t("auth.loginButton")
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-white/80 text-center space-y-2">
            <p>
              <a
                href="#"
                className="text-white underline hover:text-white/90 transition duration-300"
              >
                {t("auth.forgotPassword")}
              </a>
            </p>
            <p>
              {t("auth.dontHaveAccount")}{" "}
              <a
                onClick={() => navigate("/register")}
                className="text-white underline hover:text-white/90 transition duration-300 cursor-pointer"
              >
                {t("auth.registerHere")}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
