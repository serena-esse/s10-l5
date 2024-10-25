import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams per ottenere il parametro cityName
import Card from "react-bootstrap/Card"; // Per visualizzare i dettagli meteo
import Button from "react-bootstrap/Button"; // Per il pulsante di salvataggio
import { Player } from "@lottiefiles/react-lottie-player";
import "./WeatherPage.css"; // Importa il CSS personalizzato

export default function WeatherPage({ saveFavoriteCity }) {
  const { cityName } = useParams(); // Estrai cityName dall'URL
  const [weatherData, setWeatherData] = useState(null); // Stato per i dati meteo
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [error, setError] = useState(null); // Stato per gli errori
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Messaggio di conferma

  // Funzione per ottenere l'animazione meteo in base alle condizioni
  const getWeatherAnimation = () => {
    if (!weatherData) return null;
    const weatherCondition = weatherData.weather[0].main.toLowerCase();

    switch (weatherCondition) {
      case "clear":
        return "https://lottie.host/b0bcef94-998f-49ba-83c3-7f9afc7fbbb5/zPVjuYPFYM.json"; // Clear sky animation
      case "rain":
        return "https://lottie.host/16921caf-f2e5-4c96-90d0-d2c930cc3b53/XRXeqaGAIs.json"; // Rain animation
      case "clouds":
        return "https://lottie.host/7c1d754a-b5cf-4636-a285-511aa105e797/8yNaM2wGAZ.json"; // Clouds animation
      case "snow":
        return "https://lottie.host/0371afde-1331-4875-85b7-cbc377ef7998/3OySUx7Mo4.json"; // Snow animation
      default:
        return "https://lottie.host/b0bcef94-998f-49ba-83c3-7f9afc7fbbb5/zPVjuYPFYM.json"; // Default clear sky animation
    }
  };

  // Recupera i dati meteo quando il componente si monta o quando cityName cambia
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f86d2e7fc92e5c469caf430dd0a90e69&units=metric`
        );
        const data = await response.json();
        if (response.ok) {
          setWeatherData(data); // Imposta i dati meteo nello stato
        } else {
          setError(data.message); // Gestisci errori
        }
      } catch (error) {
        setError("Errore nel recupero dei dati meteo.");
      }
      setLoading(false);
    };

    fetchWeather();
  }, [cityName]);

  // Funzione per salvare il comune nei preferiti
  const handleSaveFavorite = () => {
    if (weatherData) {
      // Aggiungi un codice fittizio se necessario o richiedi ulteriori dati dal server
      saveFavoriteCity({ nome: weatherData.name, codice: `dummy_${weatherData.name}` }); // Passa nome e codice fittizio
      setConfirmationMessage(`${weatherData.name} è stato aggiunto ai preferiti!`);
      setTimeout(() => {
        setConfirmationMessage("");
      }, 3000);
    }
  };

  if (loading) return <p>Caricamento...</p>; // Mostra stato di caricamento
  if (error) return <p>Errore: {error}</p>; // Mostra stato di errore

  return (
    <div className="weather-page-container">
      {weatherData && (
        <>
          <Card className="weather-card">
            <Card.Body>
              <Card.Title>Meteo a {weatherData.name}</Card.Title>
              <Player autoplay loop src={getWeatherAnimation()} style={{ height: "200px", width: "200px" }}></Player>
              <Card.Text>Temperatura massima: {weatherData.main.temp_max}°C</Card.Text>
              <Card.Text>Temperatura minima: {weatherData.main.temp_min}°C</Card.Text>
              <Card.Text>Umidità: {weatherData.main.humidity}%</Card.Text>
              <Card.Text>Descrizione: {weatherData.weather[0].description}</Card.Text>
            </Card.Body>
          </Card>

          {/* Posizionamento del pulsante sotto la card */}
          <div className="button-container">
            <Button className="save-favorites-btn" onClick={handleSaveFavorite}>
              Salva nei Preferiti
            </Button>

            {confirmationMessage && (
              <div className="confirmation-message mt-3">
                <p>{confirmationMessage}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
