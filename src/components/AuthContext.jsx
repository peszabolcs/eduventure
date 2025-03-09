import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");

      console.log("Stored token:", token);
      console.log("Stored user:", storedUser);

      if (token && storedUser) {
        try {
          const headers = new Headers();
          headers.append("Authorization", `Bearer ${token}`);
          headers.append("Content-Type", "application/json");

          const response = await fetch(`${API_URL}/backend/check_auth.php`, {
            method: "GET",
            credentials: "include",
            headers: headers,
            mode: "cors",
          });

          console.log(
            "Request headers:",
            Object.fromEntries(headers.entries())
          );
          console.log("Auth check response:", response.status);

          const data = await response.json();
          console.log("Auth check data:", data);

          if (response.ok) {
            setUser(data.user);
          } else {
            console.log("Auth check failed:", data);
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            setUser(null);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${API_URL}/backend/logout.php`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
