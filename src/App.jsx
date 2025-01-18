import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
        <div className="hero">
          <div className="hero-image">
            <img id="logo" alt="logo" src="/edugit iventurelogohatternelkul.svg"/>
          </div>
          <div className="hero-text">
            <h2>Tanulás és kaland, egyetlen platformon</h2>
          </div>
          <div className="hero-buttons">
            <button className={"more"}>Tudj meg többet</button>
            <button className={"team"}>Csapatunk</button>
          </div>
        </div>
    </>
  )
}

export default App
