import "./App.css";
import NavBar from "./components/NavBar";
import Meteo from "./components/Meteo";
import SelectCity from "./components/SelectCity";
import MeteoCard from "./components/MeteoCard";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Meteo />
      <SelectCity />
      {/* <MeteoCard />  */}
    </div>
  );
}

export default App;
