"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { hasCookieConsent, COOKIE_STATUS } from "../services/cookieService";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookieConsentStatus, setCookieConsentStatus] = useState(null);

  useEffect(() => {
    // Frissítjük a cookie állapotot, amikor az komponens betöltődik
    const cookieStatus = localStorage.getItem("cookieConsent");
    setCookieConsentStatus(cookieStatus);

    // Csak akkor ellenőrizzük a mentett felhasználói adatokat, ha a süti használatot elfogadták
    if (cookieStatus === COOKIE_STATUS.ACCEPTED) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setLoading(false);
  }, []);

  // Süti állapot változásának figyelése
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cookieConsent") {
        setCookieConsentStatus(e.newValue);

        // Ha a süti használatot visszavonták, töröljük a felhasználói adatokat
        if (e.newValue !== COOKIE_STATUS.ACCEPTED) {
          logout();
        } else if (e.newValue === COOKIE_STATUS.ACCEPTED) {
          // Ha elfogadták, de nincs még user, akkor lehet, hogy már volt korábban mentve
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (userData) => {
    // Csak akkor tároljuk a felhasználói adatokat, ha elfogadták a sütiket
    if (hasCookieConsent()) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } else {
      // Ha nem fogadták el a sütiket, nem tárolhatjuk a session-t
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        cookieConsentStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
