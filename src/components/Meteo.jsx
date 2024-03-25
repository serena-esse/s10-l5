import React from "react";
import { FaTemperatureArrowDown, FaTemperatureArrowUp, FaArrowsDownToLine } from "react-icons/fa6";
import { IoMdWater } from "react-icons/io";
import { FaRegSun } from "react-icons/fa";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Meteo({ selectcomune, meteoparams }) {
  const temperature = () => {
    if (Math.floor(meteoparams.main.temp - 273.15) > 5) {
      return "https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else {
      return "https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }
  };

  return (
    <>
      {selectcomune && (
        <section className="vh-100" style={{ backgroundColor: "#ADD8E6" }}>
          <Container className="h-100 ">
            <Row className="justify-content-center align-items-center h-100">
              <Col className="scheda">
                <Card>
                  <div className="bg-image" style={{ marginTop: "20px" }}>
                    <Card.Img
                      src={temperature()}
                      className="card-img"
                      width="200"
                      alt="weather"
                      style={{ borderRadius: "80px", marginTop: "20px" }}
                    />
                    <div
                      className="mask"
                      style={{
                        backgroundColor: "rgba(135, 206, 250, 0.5)",
                      }}
                    ></div>
                  </div>
                  <div className="card-img-overlay text-dark p-5">
                    <h4 tag="h4" className="mb-0 border-box">
                      <h1>{selectcomune.nome}</h1>
                      <span>{selectcomune.cap + " " + selectcomune.provincia.nome}</span>
                    </h4>
                    <p className="display-2 my-3">{Math.floor(meteoparams.main.temp - 273.15)}°C</p>
                    <Row>
                      <Col md={6}>
                        <p className="mb-2">
                          <FaTemperatureArrowDown /> Temperatura minima:{" "}
                          <strong>{Math.floor(meteoparams.main.temp_min - 273.15)}°C</strong>
                        </p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-2">
                          <FaTemperatureArrowUp /> Temperatura massima:{" "}
                          <strong>{Math.floor(meteoparams.main.temp_max - 273.15)}°C</strong>
                        </p>
                      </Col>
                      <Col md={6}>
                        <h4 tag="h5">
                          <FaArrowsDownToLine />
                          Pressione : <strong>{meteoparams.main.pressure}</strong>
                        </h4>
                      </Col>
                      <Col md={6}>
                        <h4 tag="h5">
                          <IoMdWater /> Umidità: <strong>{meteoparams.main.humidity}%</strong>
                        </h4>
                      </Col>
                      <h4 tag="h5">
                        <FaRegSun /> Situazione meteorologica : <strong>{meteoparams.weather[0].description}</strong>
                      </h4>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}
