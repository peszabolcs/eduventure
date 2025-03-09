"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, XCircle, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email cím kötelező";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Érvénytelen email cím";
    if (!formData.password) newErrors.password = "Jelszó kötelező";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        console.log("Login submitted");
        const response = await fetch(`${API_URL}/backend/login.php`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        });
        const result = await response.json();
        if (result.error) {
          setErrors({ api: result.error });
        } else {
          console.log("Login successful:", result);
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("authToken", result.token);
          setUser(result.user);
          navigate("/");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({ api: "Hiba történt a bejelentkezés során" });
      } finally {
        setIsSubmitting(false);
      }
      // await new Promise((resolve) => setTimeout(resolve, 1500))
      // console.log("Login submitted:", formData)
      // setIsSubmitting(false)
    } else {
      setErrors(newErrors);
    }
  };

  const inputClasses =
    "w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition duration-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Bejelentkezés
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
              size={20}
            />
            <motion.input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email cím"
              className={inputClasses}
              whileFocus={{ scale: 1.02 }}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-red-400 text-sm flex items-center"
                >
                  <XCircle className="inline mr-1" size={16} /> {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
              size={20}
            />
            <motion.input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Jelszó"
              className={inputClasses}
              whileFocus={{ scale: 1.02 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-red-400 text-sm flex items-center"
                >
                  <XCircle className="inline mr-1" size={16} />{" "}
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-300 ${
              isSubmitting
                ? "bg-white/50 text-purple-700 cursor-not-allowed"
                : "bg-white text-purple-700 hover:bg-white/90"
            }`}
          >
            {isSubmitting ? (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-5 h-5 border-t-2 border-purple-700 border-solid rounded-full animate-spin mr-2"></div>
                Bejelentkezés...
              </motion.div>
            ) : (
              "Bejelentkezés"
            )}
          </motion.button>
        </form>

        {errors.api && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-red-400 text-sm flex items-center"
          >
            <XCircle className="inline mr-1" size={16} /> {errors.api}
          </motion.p>
        )}

        <div className="mt-6 text-white/80 text-center space-y-2">
          <p>
            <a
              href="#"
              className="text-white underline hover:text-white/90 transition duration-300"
            >
              Elfelejtett jelszó?
            </a>
          </p>
          <p>
            Még nincs fiókod?{" "}
            <a
              onClick={() => navigate("/register")}
              className="text-white underline hover:text-white/90 transition duration-300 cursor-pointer"
            >
              Regisztrálj!
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
