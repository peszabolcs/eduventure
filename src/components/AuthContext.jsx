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
      const token = localStorage.getItem("token");
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
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
      }

      return true;
    } catch (error) {
      console.error("Session validation error:", error);
      logout();
      return false;
    }
  };

  // Kezdeti session validáció és adatok betöltése
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);

          // Validáljuk a session-t
          const isValid = await validateSession();
          if (!isValid) {
            logout();
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Rendszeres session ellenőrzés (5 percenként)
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(validateSession, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Function to handle login
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
        // Always store token in localStorage for persistence
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);

        // Check for and save any stored career results
        await saveStoredCareerResults();

        return { success: true };
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
