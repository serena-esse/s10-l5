import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

export default function MeteoCard() {
  const cities = ["Roma", "Milano", "Venezia", "Firenze", "Napoli"];
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (const city of cities) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},it&appid=f86d2e7fc92e5c469caf430dd0a90e69
            &units=metric`
          );
          const weather = await response.json();
          data[city] = weather;
        } catch (error) {
          console.error(`Error fetching weather data for ${city}:`, error);
        }
      }
      setWeatherData(data);
    };

    fetchData();
  }, [cities]);

  return (
    <Container fluid>
      <h1 className="mt-5 mb-4">Weather in Italian Cities</h1>
      <Row>
        {cities.map((city, index) => {
          const weather = weatherData[city];
          return (
            <Col key={index} sm={12} md={4} lg={2} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title style={{ fontWeight: "bold" }}>{city}</Card.Title>
                  {weather && (
                    <>
                      <Card.Img
                        variant="top"
                        src="https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Background.png"
                        style={{ width: "80px" }}
                      />
                      <Card.Text>Temperatura: {weather.main.temp}°C</Card.Text>
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
