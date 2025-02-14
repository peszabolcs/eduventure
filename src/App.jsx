import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectDescription from "./components/ProjectDescription.jsx";
import TeamMembers from "./components/TeamMembers.jsx";
import {Link, Element} from 'react-scroll';
import Hero from "./components/Hero.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <Header/>
          <main className="flex-grow">
              <Hero/>
              <ProjectDescription/>
              <TeamMembers/>
          </main>

        <Element name="project-description"/>


        <Element name="team-members"/>


        {/*<FormSection/>*/}
        <div className="text-center text-xs sm:text-sm text-white/60">
            © {new Date().getFullYear()} Perjési Szabolcs. Minden jog fenntartva.
        </div>
      </div>
  )
}

export default App
