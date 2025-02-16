import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectDescription from "./components/ProjectDescription.jsx";
import TeamMembers from "./components/TeamMembers.jsx";
import {Element} from 'react-scroll';
import Hero from "./components/Hero.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen flex flex-col">
          <Header/>
          <main className="flex-grow relative">
              <Element name="hero-section">
                  <Hero/>
              </Element>
              <Element name="project-description">
                  <ProjectDescription/>
              </Element>
              <Element name="team-section">
                  <TeamMembers/>
              </Element>
          </main>
          <Footer/>
      </div>


  )
}

export default App
