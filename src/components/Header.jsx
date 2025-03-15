"use client";

import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext.jsx";

const menuItems = [
  { name: "Főoldal", to: "hero-section", href: "/" },
  // { name: "Projekt", to: "project-description" },
  // { name: "Csapat", to: "team-section" },
  {
    name: "Kérdőív",
    to: "form-section",
    href: "https://forms.gle/hewV8BhLbWoBoLsLA",
  },
  // {name: "Regisztráció", href: "/register" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  useEffect(() => {
    if (user) {
      const items = [...menuItems, { name: "Profilom", href: "/profile" }];
      // Ha a felhasználó CTO, hozzáadjuk a Blog Admin menüpontot
      if (user.role === "CTO") {
        items.push({ name: "Blog Admin", href: "/blog/admin" });
      }
      setFilteredMenuItems(items);
    } else {
      setFilteredMenuItems([
        ...menuItems,
        { name: "Regisztráció", href: "/register" },
        { name: "Bejelentkezés", href: "/login" },
      ]);
    }
  }, [user]);

  const handleClick = (item) => {
    setIsOpen(false);
    if (item.href && item.href.startsWith("http")) {
      window.open(item.href, "_blank");
    } else if (item.href) {
      navigate(item.href);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-md border-b border-white/10"></div>

      <nav className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-white font-bold text-xl cursor-pointer no-underline relative"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              EduVenture
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {filteredMenuItems.map((item) => (
              <motion.div
                key={item.name}
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.to ? (
                  <ScrollLink
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="text-white/90 hover:text-white cursor-pointer no-underline transition-colors relative group"
                    onClick={() => item.href && handleClick(item)}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 group-hover:w-full transition-all duration-300"></span>
                  </ScrollLink>
                ) : (
                  <RouterLink
                    to={item.href}
                    className="text-white/90 hover:text-white cursor-pointer no-underline transition-colors relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 group-hover:w-full transition-all duration-300"></span>
                  </RouterLink>
                )}
              </motion.div>
            ))}
            {user && (
              <motion.button
                onClick={handleLogout}
                className="text-white/90 hover:text-white no-underline transition-colors px-4 py-1.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kijelentkezés
              </motion.button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/90 hover:text-white focus:outline-none transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden">
                {filteredMenuItems.map((item) => (
                  <motion.div
                    key={item.name}
                    className="border-b border-white/10 last:border-none"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.to ? (
                      <ScrollLink
                        to={item.to}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                        className="text-white/90 hover:text-white block px-4 py-3 no-underline transition-colors hover:bg-white/5"
                        onClick={() => {
                          setIsOpen(false);
                          item.href && handleClick(item);
                        }}
                      >
                        {item.name}
                      </ScrollLink>
                    ) : (
                      <RouterLink
                        to={item.href}
                        className="text-white/90 hover:text-white block px-4 py-3 no-underline transition-colors hover:bg-white/5"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </RouterLink>
                    )}
                  </motion.div>
                ))}
                {user && (
                  <motion.button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="text-white/90 hover:text-white w-full px-4 py-3 text-left no-underline transition-colors hover:bg-white/5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Kijelentkezés
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
