import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione interna
import Meteo from "./Meteo"; // Importa il componente Meteo per visualizzare il meteo
import SelectCity from "./SelectCity"; // Importa SelectCity per selezionare una città

export default function Home() {
  const [favoriteCity, setFavoriteCity] = useState(null); // Stato per la città preferita
  const [favoriteWeather, setFavoriteWeather] = useState(null); // Stato per il meteo della città preferita
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per recuperare i dati meteo della città selezionata
  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.nome}&appid=f86d2e7fc92e5c469caf430dd0a90e69&units=metric`
      );
      const data = await response.json();
      setFavoriteWeather(data); // Imposta i dati meteo nello stato
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo:", error);
    }
  };

  // Funzione per salvare la città selezionata come preferita
  const saveFavoriteCity = (city) => {
    setFavoriteCity(city); // Aggiorna lo stato della città preferita
    localStorage.setItem("favoriteCity", JSON.stringify(city)); // Salva la città nel localStorage
    fetchWeather(city); // Recupera i dati meteo per la città selezionata
  };

  // Funzione per gestire il click su una card e navigare alla pagina del meteo
  const handleFavoriteClick = (comune) => {
    console.log("Naviga verso:", `/weather/${comune.nome}`); // Debug: Stampa l'URL per verifica
    navigate(`/weather/${comune.nome}`); // Naviga alla pagina meteo per il comune selezionato
  };

  // Recupera la città salvata nel localStorage al caricamento della pagina
  useEffect(() => {
    const savedCity = localStorage.getItem("favoriteCity");
    if (savedCity) {
      const city = JSON.parse(savedCity);
      setFavoriteCity(city); // Ripristina la città dal localStorage
      fetchWeather(city); // Recupera i dati meteo al caricamento della pagina
    }
  }, []);

  return (
    <div>
      {/* Mostra le informazioni meteo per la città preferita */}
      {favoriteCity && favoriteWeather ? (
        <div onClick={() => handleFavoriteClick(favoriteCity)} style={{ cursor: "pointer" }}>
          <Meteo selectcomune={favoriteCity} meteoparams={favoriteWeather} />
        </div>
      ) : (
        <SelectCity saveFavoriteCity={saveFavoriteCity} />
      )}
    </div>
  );
}
