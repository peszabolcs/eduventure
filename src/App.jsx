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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider, useAuth } from "./components/AuthContext.jsx";

// Új komponens a loading állapot kezelésére
const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative">
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
