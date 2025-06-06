import "bootstrap/dist/css/bootstrap.min.css";
import ProjectDescription from "./components/ProjectDescription.jsx";
import TeamMembers from "./components/TeamMembers.jsx";
import { Element } from "react-scroll";
import Hero from "./components/Hero.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./components/AuthContext.jsx";
import CareerOrientationModule from "./components/career/CareerOrientationModule.jsx";
import CareerResultDetail from "./components/career/CareerResultDetail.jsx";
// Blog komponensek importálása
import Blog from "./components/Blog.jsx";
import BlogDetail from "./components/BlogDetail.jsx";
import BlogAdmin from "./components/BlogAdmin.jsx";
import BlogEditor from "./components/BlogEditor.jsx";
import Unauthorized from "./components/Unauthorized";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import CookieConsent from "./components/CookieConsent.jsx";
import { COOKIE_STATUS, setCookieConsent } from "./services/cookieService";
import { useState, useEffect } from "react";

// Új komponens a loading állapot kezelésére
const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <Element name="hero-section">
        <Hero />
      </Element>
      <Element name="project-description">
        <ProjectDescription />
      </Element>
      <Element name="team-section">
        <TeamMembers />
      </Element>
    </>
  );
};

function App() {
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  const handleAcceptAllCookies = () => {
    setCookieConsent(COOKIE_STATUS.ACCEPT_ALL);
    setShowCookieConsent(false);
  };

  const handleEssentialOnlyCookies = () => {
    setCookieConsent(COOKIE_STATUS.ESSENTIAL_ONLY);
    setShowCookieConsent(false);
  };

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent) {
      setShowCookieConsent(false);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col relative">
        {/* Animated background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <AuthProvider>
          <Header />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route
                path="/szemelyisegteszt"
                element={<CareerOrientationModule />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    allowedRoles={["user", "CTO", "CFO", "CMO", "CPO", "admin"]}
                  >
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/karrier-eredmenyek/:id"
                element={
                  <ProtectedRoute
                    allowedRoles={["user", "CTO", "CFO", "CMO", "CPO", "admin"]}
                  >
                    <CareerResultDetail />
                  </ProtectedRoute>
                }
              />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route
                path="/blog/admin"
                element={
                  <ProtectedRoute allowedRoles={["CTO", "CFO", "CMO", "CPO"]}>
                    <BlogAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/admin/new"
                element={
                  <ProtectedRoute allowedRoles={["CTO", "CFO", "CMO", "CPO"]}>
                    <BlogEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog/admin/edit/:id"
                element={
                  <ProtectedRoute allowedRoles={["CTO", "CFO", "CMO", "CPO"]}>
                    <BlogEditor />
                  </ProtectedRoute>
                }
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </main>
          <Footer />

          {/* Cookie Consent Banner */}
          <CookieConsent
            onAcceptAll={handleAcceptAllCookies}
            onEssentialOnly={handleEssentialOnlyCookies}
          />
        </AuthProvider>

        {/* Add animation keyframes */}
        <style>{`
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
        `}</style>
      </div>
    </Router>
  );
}

export default App;
