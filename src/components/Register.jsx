"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  XCircle,
  User,
  Mail,
  Lock,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  hasAcceptedAllCookies,
  hasAcceptedEssentialCookies,
} from "../services/cookieService";
import { useAuth } from "./AuthContext.jsx";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const { cookieConsentStatus } = useAuth();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const strength = calculatePasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [formData.password]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/\d/)) strength += 1;
    if (password.match(/[^a-zA-Z\d]/)) strength += 1;
    return strength;
  };

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
    if (!formData.username) newErrors.username = "Felhasználónév kötelező";
    if (!formData.email) newErrors.email = "Email cím kötelező";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Érvénytelen email cím";
    if (!formData.password) newErrors.password = "Jelszó kötelező";
    else if (formData.password.length < 8)
      newErrors.password =
        "A jelszónak legalább 8 karakter hosszúnak kell lennie";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "A jelszavak nem egyeznek";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${API_URL}/backend/register.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: formData.fullname,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        });

        const result = await response.json();

        if (result.error) {
          setErrors({ api: result.error });
        } else {
          navigate("/login");
        }
      } catch (error) {
        setErrors({ api: `Hiba a regisztráció során: ${error.message}` });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
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
            Regisztráció
          </h2>

          {errors.api && (
            <div className="bg-red-500 bg-opacity-10 text-red-100 p-3 rounded-lg mb-4">
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                size={20}
              />
              <motion.input
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                type="text"
                placeholder="Teljes név"
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
              />
              <AnimatePresence>
                {errors.fullname && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-red-400 text-sm flex items-center"
                  >
                    <XCircle className="inline mr-1" size={16} />{" "}
                    {errors.fullname}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                size={20}
              />
              <motion.input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Felhasználónév"
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
              />
              <AnimatePresence>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-red-400 text-sm flex items-center"
                  >
                    <XCircle className="inline mr-1" size={16} />{" "}
                    {errors.username}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

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

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                size={20}
              />
              <motion.input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Jelszó megerősítése"
                className={inputClasses}
                whileFocus={{ scale: 1.02 }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              <AnimatePresence>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-red-400 text-sm flex items-center"
                  >
                    <XCircle className="inline mr-1" size={16} />{" "}
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Strength Indicator */}
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-white/70">Jelszó erőssége:</span>
                <span className="text-xs text-white/70">
                  {passwordStrength === 0 && "Gyenge"}
                  {passwordStrength === 1 && "Közepes"}
                  {passwordStrength === 2 && "Jó"}
                  {passwordStrength === 3 && "Erős"}
                  {passwordStrength === 4 && "Nagyon erős"}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5">
                <motion.div
                  className="bg-green-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
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
                  Regisztráció...
                </motion.div>
              ) : (
                "Regisztráció"
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-white/80 text-center">
            Már van fiókod?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-white underline hover:text-white/90 transition duration-300 cursor-pointer"
            >
              Jelentkezz be!
            </a>
          </p>
        </motion.div>
        <style>
          {`
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
                `}
        </style>
      </div>
    </div>
  );
}
