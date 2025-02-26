import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectDescription from "./components/ProjectDescription.jsx";
import TeamMembers from "./components/TeamMembers.jsx";
import {Element} from 'react-scroll';
import Hero from "./components/Hero.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import {useEffect} from "react";

function App() {
    // const location = useLocation();
    // useEffect(() => {
    //     if (location.state && location.state.scrollTo) {
    //         setTimeout(() => {  // 🔹 Időt adunk az elemek renderelésére
    //             const section = document.querySelector(`[name="${location.state.scrollTo}"]`);
    //             if (section) {
    //                 section.scrollIntoView({ behavior: "smooth" });
    //             }
    //         }, 500);
    //     }
    // }, [location]);
  return (
      <Router>
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen flex flex-col">
          <Header/>
          <main className="flex-grow relative">
              <Routes> {/* 🔹 Útvonalkezelő */}
                  <Route path="/" element={
                      <>
                          <Element name="hero-section">
                              <Hero/>
                          </Element>
                          <Element name="project-description">
                              <ProjectDescription/>
                          </Element>
                          <Element name="team-section">
                              <TeamMembers/>
                          </Element>
                      </>
                  } />
                  <Route path="/register" element={<Register />} /> {/* 🔹 Új regisztrációs oldal */}
                  <Route path="/login" element={<Login />} /> {/* 🔹 Új bejelentkezési oldal */}
              </Routes>
          </main>
          <Footer/>
      </div>

      </Router>
  )
}

export default App
