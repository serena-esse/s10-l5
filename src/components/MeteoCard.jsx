import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione interna
import "./MeteoCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHalf } from "@fortawesome/free-solid-svg-icons";

export default function MeteoCard() {
  const cities = ["Roma", "Milano", "Venezia", "Firenze", "Napoli"];
  const [weatherData, setWeatherData] = useState({});
  const navigate = useNavigate(); // Hook per la navigazione interna

  const cityImages = {
    Roma: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Milano:
      "https://images.pexels.com/photos/931015/pexels-photo-931015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Venezia:
      "https://images.pexels.com/photos/1796736/pexels-photo-1796736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Firenze:
      "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Napoli:
      "https://images.pexels.com/photos/17311064/pexels-photo-17311064/free-photo-of-mare-spiaggia-costa-montagna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  // Fetch weather data for cities
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {};
        for (const city of cities) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},it&appid=f86d2e7fc92e5c469caf430dd0a90e69&units=metric`
          );
          const weather = await response.json();
          data[city] = weather;
        }
        setWeatherData(data);
      } catch (error) {
        console.error("Errore nel recupero dei dati meteo:", error);
      }
    };

    fetchData();
  }, []);

  // Gestisci il click della card per navigare ai dettagli meteo della città
  const handleCardClick = (city) => {
    if (city && weatherData[city]) {
      navigate(`/weather/${city}`); // Naviga alla pagina meteo della città selezionata
    }
  };

  return (
    <Container fluid>
      <h1 className="mt-5 mb-4">Meteo nelle città italiane</h1>
      <Row className="justify-content-center" id="meteocard">
        {cities.map((city, index) => {
          const weather = weatherData[city];
          return (
            <Col key={index} xs={12} sm={6} md={4} lg={2} className="mb-3">
              <Card onClick={() => handleCardClick(city)} style={{ cursor: "pointer" }}>
                <Card.Body>
                  <Card.Title>{city}</Card.Title>
                  {weather && (
                    <>
                      <Card.Img variant="top" src={cityImages[city]} className="card-img-top" />
                      <Card.Text>
                        <FontAwesomeIcon icon={faTemperatureHalf} /> {weather.main.temp}°C
                      </Card.Text>
                      <Card.Text>{weather.weather[0].description}</Card.Text>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
