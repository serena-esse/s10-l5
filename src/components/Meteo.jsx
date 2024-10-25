import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player"; // Import Lottie for animations
import Card from "react-bootstrap/Card"; // Use Bootstrap for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faTemperatureArrowUp, faTemperatureArrowDown, faCloudSun } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione interna

export default function Meteo({ selectcomune, meteoparams }) {
  const [weatherData, setWeatherData] = useState(meteoparams);
  const navigate = useNavigate(); // Hook per la navigazione interna

  // Carica i dati meteo se meteoparams non è fornito
  useEffect(() => {
    if (!meteoparams && selectcomune) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectcomune.nome},it&appid=f86d2e7fc92e5c469caf430dd0a90e69&units=metric`
      )
        .then((response) => response.json())
        .then((data) => setWeatherData(data))
        .catch((error) => console.error("Errore nel recupero dei dati meteo:", error));
    }
  }, [selectcomune, meteoparams]);

  // Ottieni l'animazione corretta in base alle condizioni meteo
  const getWeatherAnimation = () => {
    if (!weatherData) return null;
    const weatherCondition = weatherData.weather[0].main.toLowerCase();

    switch (weatherCondition) {
      case "clear":
        return "https://lottie.host/b0bcef94-998f-49ba-83c3-7f9afc7fbbb5/zPVjuYPFYM.json"; // Clear sky animation
      case "rain":
        return "https://lottie.host/408b7c90-953d-41d2-b2c7-d158c7d9dc3a/q6v26YxO6B.json"; // Rain animation
      case "clouds":
        return "https://lottie.host/6dd47d1d-47f5-42f0-af47-e2b40cd5d2b7/Rh3H2NpLtJ.json"; // Clouds animation
      case "snow":
        return "https://lottie.host/0371afde-1331-4875-85b7-cbc377ef7998/3OySUx7Mo4.json"; // Snow animation
      default:
        return "https://lottie.host/b0bcef94-998f-49ba-83c3-7f9afc7fbbb5/zPVjuYPFYM.json"; // Default clear sky animation
    }
  };

  // Naviga alla pagina del meteo per il comune selezionato
  const handleCardClick = () => {
    if (selectcomune && selectcomune.nome) {
      navigate(`/weather/${selectcomune.nome}`); // Usa navigate per passare alla pagina meteo
    }
  };

  if (!weatherData) {
    return <p>Caricamento meteo...</p>;
  }

  return (
    <Card
      className="weather-card"
      style={{
        width: "18rem",
        margin: "10px",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={handleCardClick} // Usa la funzione di navigazione al clic
    >
      <Card.Body>
        <Card.Title>{selectcomune.nome}</Card.Title>
        <Player autoplay loop src={getWeatherAnimation()} style={{ height: "150px", width: "150px" }}></Player>
        <Card.Text>
          <FontAwesomeIcon icon={faTemperatureArrowDown} /> {weatherData.main.temp_min}°C
        </Card.Text>
        <Card.Text>
          <FontAwesomeIcon icon={faTemperatureArrowUp} /> {weatherData.main.temp_max}°C
        </Card.Text>
        <Card.Text>
          <FontAwesomeIcon icon={faDroplet} /> {weatherData.main.humidity}%
        </Card.Text>
        <Card.Text>
          <FontAwesomeIcon icon={faCloudSun} /> {weatherData.weather[0].description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
