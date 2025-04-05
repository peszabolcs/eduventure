"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  hasAcceptedAllCookies,
  hasAcceptedEssentialCookies,
  COOKIE_STATUS,
} from "../services/cookieService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookieConsentStatus, setCookieConsentStatus] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Function to save career results
  const saveStoredCareerResults = async () => {
    const storedResults = localStorage.getItem("tempCareerResults");
    const storedAnswers = localStorage.getItem("tempCareerAnswers");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (storedResults && storedAnswers && token) {
      try {
        const response = await fetch(
          `${API_URL}/backend/save_career_result.php`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              results: JSON.parse(storedResults),
              personality_profile:
                JSON.parse(storedResults).personality_profile,
              answers: JSON.parse(storedAnswers),
            }),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.success) {
          // Clear stored results after successful save
          localStorage.removeItem("tempCareerResults");
          localStorage.removeItem("tempCareerAnswers");
          // Return success to handle navigation in the component
          return true;
        }
      } catch (error) {
        console.error("Error saving stored career results:", error);
      }
    }
    return false;
  };

  // Session ellenőrzés
  const validateSession = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        logout();
        return false;
      }

      const response = await fetch(`${API_URL}/backend/check_auth.php`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        logout();
        return false;
      }

      const data = await response.json();
      if (!data.success) {
        logout();
        return false;
      }

      // Update user data if it has changed
      const userData = data.user;
      if (JSON.stringify(user) !== JSON.stringify(userData)) {
        setUser(userData);
        if (cookieConsentStatus === COOKIE_STATUS.ACCEPT_ALL) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }
      }

      return true;
    } catch (error) {
      console.error("Session validation error:", error);
      logout();
      return false;
    }
  };

  // Rendszeres session ellenőrzés (5 percenként)
  useEffect(() => {
    if (user) {
      const interval = setInterval(validateSession, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    // Frissítjük a cookie állapotot, amikor az komponens betöltődik
    const cookieStatus = localStorage.getItem("cookieConsent");
    setCookieConsentStatus(cookieStatus);

    // Süti beállítások alapján betöltjük a felhasználói adatokat
    loadUserData(cookieStatus);

    // Kezdeti session validáció
    const initialValidation = async () => {
      const isValid = await validateSession();
      if (!isValid && user) {
        logout();
      }
      setLoading(false);
    };

    initialValidation();
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

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/backend/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        const userData = data.user;
        const token = userData.token;

        // Store token and user data based on cookie preferences
        if (cookieConsentStatus === COOKIE_STATUS.ACCEPT_ALL) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify(userData));
        }

        setIsAuthenticated(true);
        setUser(userData);

        // Save stored career results and return success with navigation info
        const savedResults = await saveStoredCareerResults();
        return {
          success: true,
          shouldNavigateToCareerTest: savedResults,
        };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Hiba történt a bejelentkezés során" };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    // Clear both storages to be safe
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    // Szerver oldali kijelentkezés
    fetch(`${API_URL}/backend/logout.php`, {
      method: "POST",
      credentials: "include",
    }).catch(console.error);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        cookieConsentStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
