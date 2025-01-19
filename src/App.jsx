import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectDescription from "./components/ProjectDescription.jsx";
import TeamMembers from "./components/TeamMembers.jsx";
import {Link, Element} from 'react-scroll';
import Hero from "./components/Hero.jsx";

function App() {
  return (
      <>
        <Hero/>
        <Element name="project-description"/>
        <ProjectDescription/>

        <Element name="team-members"/>
        <TeamMembers/>

      </>
  )
}

export default App
