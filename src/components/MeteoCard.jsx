import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

function CityWeather({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},it&appid=cfb6222cddabb8de7b450309092343d6&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <Col sm={12} md={4} lg={2} className="mb-3">
      <Card>
        <Card.Body>
          <Card.Title>{city}</Card.Title>
          {weatherData && (
            <>
              <Card.Img variant="top" src="./public/meteo.png" />
              <Card.Text>Temperatura: {weatherData.main.temp}°C</Card.Text>
              <Card.Text> {weatherData.weather[0].description}</Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default function MeteoCard() {
  const cities = ["Roma", "Milano", "Venezia", "Firenze", "Napoli"];

  return (
    <Container fluid>
      <h1 className="mt-5 mb-4">Weather in Italian Cities</h1>
      <Row>
        {cities.map((city, index) => (
          <CityWeather key={index} city={city} />
        ))}
      </Row>
    </Container>
  );
}
