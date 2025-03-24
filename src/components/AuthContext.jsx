"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  hasAcceptedAllCookies,
  hasAcceptedEssentialCookies,
  COOKIE_STATUS,
} from "../services/cookieService";

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

    // Süti beállítások alapján betöltjük a felhasználói adatokat
    loadUserData(cookieStatus);

    setLoading(false);
  }, []);

  // Betölti a felhasználói adatokat a megfelelő helyről a süti beállítások alapján
  const loadUserData = (cookieStatus) => {
    if (cookieStatus === COOKIE_STATUS.ACCEPT_ALL) {
      // Ha minden sütit elfogadott, a localStorage-ból töltjük be (tartós)
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } else if (cookieStatus === COOKIE_STATUS.ESSENTIAL_ONLY) {
      // Ha csak a kötelező sütiket fogadta el, a sessionStorage-ból töltjük (ideiglenes)
      const savedUser = sessionStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  };

  // Süti állapot változásának figyelése
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cookieConsent") {
        const newValue = e.newValue;
        setCookieConsentStatus(newValue);

        // Ha változott a süti beállítás, frissítjük a felhasználói adatokat
        loadUserData(newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (userData) => {
    // Süti beállítások ellenőrzése és felhasználó tárolása
    setUser(userData);

    if (hasAcceptedAllCookies()) {
      // Ha minden sütit elfogadott, a localStorage-ba mentjük (tartós)
      localStorage.setItem("user", JSON.stringify(userData));
    }

    if (hasAcceptedEssentialCookies()) {
      // Ha legalább a kötelező sütiket elfogadta, a sessionStorage-ba is mentjük (ideiglenes)
      sessionStorage.setItem("user", JSON.stringify(userData));
      return true;
    } else {
      // Ha még nem fogadta el a sütiket, nem tudjuk tárolni
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    // Mindkét tárolóból töröljük
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
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
