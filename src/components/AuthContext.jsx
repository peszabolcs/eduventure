import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch(`${API_URL}/backend/check_session.php`, {
                    credentials: "include"
                });
                const result = await response.json();
                if (result.logged_in) {
                    setUser(result.user);
                    localStorage.setItem("user", JSON.stringify(result.user));
                    console.log(user);
                } else {
                    setUser(null);
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("Session check failed:", error);
            }
        };

        fetchSession();
    }, []);

    const logout = async () => {
        await fetch(`${API_URL}/backend/logout.php`, {
            method: "POST",
            credentials: "include"
        });
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
