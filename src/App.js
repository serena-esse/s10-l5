import "./App.css";
import NavBar from "./components/NavBar";
import Meteo from "./components/Meteo";
import MeteoCard from "./components/MeteoCard";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import Favorites from "./components/Favorites";
import WeatherPage from "./components/WeatherPage";

function App() {
  const [favoriteCities, setFavoriteCities] = useState([]); // Stato per i comuni preferiti

  // Funzione per salvare un comune nei preferiti
  const saveFavoriteCity = (city) => {
    const isAlreadyFavorite = favoriteCities.some((favCity) => favCity.codice === city.codice);

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favoriteCities, city];
      setFavoriteCities(updatedFavorites);
      localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites)); // Salva nel localStorage
      console.log("Città salvata:", updatedFavorites); // Debug
    }
  };

  // Funzione per rimuovere un comune dai preferiti
  const removeFavoriteCity = (codiceComune) => {
    const updatedFavorites = favoriteCities.filter((city) => city.codice !== codiceComune);
    setFavoriteCities(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites)); // Aggiorna il localStorage
    console.log("Città rimossa:", updatedFavorites); // Debug
  };

  // Carica i comuni preferiti dal localStorage
  useEffect(() => {
    const savedCities = localStorage.getItem("favoriteCities");
    if (savedCities) {
      console.log("Città preferite caricate:", JSON.parse(savedCities)); // Debug
      setFavoriteCities(JSON.parse(savedCities));
    }
  }, []); // Eseguito solo una volta al caricamento della pagina

  return (
    <Router>
      <div className="App">
        <NavBar />

        <Routes>
          {/* Rotta per la Home */}
          <Route
            path="/"
            element={
              <>
                <h2>I tuoi Comuni Preferiti</h2>
                {/* Visualizza le card dei comuni preferiti */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                  {favoriteCities.length > 0 ? (
                    favoriteCities.map((city) => (
                      <Meteo key={city.codice} selectcomune={city} meteoparams={null} /> // Usa il componente Meteo per ciascuna card
                    ))
                  ) : (
                    <p>Non hai ancora selezionato comuni preferiti.</p>
                  )}
                </div>
                <MeteoCard />
              </>
            }
          />

          {/* Rotta per la pagina Preferiti */}
          <Route
            path="/preferiti"
            element={<Favorites favoriteCities={favoriteCities} removeFavoriteCity={removeFavoriteCity} />}
          />

          {/* Rotta per la pagina di ricerca */}
          <Route path="/search" element={<SearchPage saveFavoriteCity={saveFavoriteCity} />} />

          {/* Rotta per la pagina meteo */}
          <Route path="/weather/:cityName" element={<WeatherPage saveFavoriteCity={saveFavoriteCity} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
