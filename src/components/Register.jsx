"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, XCircle, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

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
    if (!formData.username)
      newErrors.username = t("auth.validation.usernameRequired");
    if (!formData.email) newErrors.email = t("auth.validation.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("auth.validation.invalidEmail");
    if (!formData.password)
      newErrors.password = t("auth.validation.passwordRequired");
    else if (formData.password.length < 8)
      newErrors.password = t("auth.validation.passwordLength");
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("auth.validation.passwordMismatch");
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
        });
        const result = await response.json();
        if (result.error) {
          setErrors({ api: result.error });
        } else {
          console.log(t("auth.messages.registerSuccess"), result);
          navigate("/login");
        }
      } catch (error) {
        console.error(t("auth.messages.registerError"), error);
        setErrors({ api: t("auth.messages.registerError") });
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
            {t("auth.registerTitle")}
          </h2>
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
                placeholder={t("auth.name")}
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
                placeholder={t("auth.username")}
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
                placeholder={t("auth.email")}
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
                placeholder={t("auth.password")}
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
                placeholder={t("auth.confirmPassword")}
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

            <AnimatePresence>
              {errors.api && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-white text-sm flex items-center"
                >
                  <XCircle className="inline mr-2 flex-shrink-0" size={18} />
                  <span>{errors.api}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("common.loading")}
                </span>
              ) : (
                t("auth.registerButton")
              )}
            </motion.button>

            <div className="text-center text-white/70 text-sm">
              {t("auth.alreadyHaveAccount")}{" "}
              <motion.a
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {t("auth.loginLink")}
              </motion.a>
            </div>
          </form>
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
