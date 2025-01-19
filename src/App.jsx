import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectDescription from "./components/ProjectDescription.jsx";
import TeamMembers from "./components/TeamMembers.jsx";
import {Link, Element} from 'react-scroll';

function App() {
  return (
      <>
        <div className="hero">
          <div className="hero-image">
            <img id="logo" alt="logo" src="/eduventurelogohatternelkul.svg"/>
          </div>
          <div className="hero-text">
            <h2>Tanulás és kaland, egyetlen platformon</h2>
          </div>
          <div className="hero-buttons">
            <Link to="project-description" smooth={true} duration={100}>
              <button className={"more"}>Tudj meg többet</button>
            </Link>
            <Link to="team-members" smooth={true} duration={200}>
              <button className={"team"}>Csapatunk</button>
            </Link>
          </div>
        </div>
        <Element name="project-description"/>
        <ProjectDescription/>

        <Element name="team-members"/>
        <TeamMembers/>

      </>
  )
}

export default App
