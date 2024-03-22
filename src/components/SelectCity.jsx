import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import React, { useState, useEffect } from "react";
import Meteo from "./Meteo";

export default function SelectCity() {
  const [prov, setProv] = useState([]);
  const [comune, setComune] = useState([]);
  const [selectcomune, setSelectcomune] = useState();
  const [meteoparams, setMeteoparams] = useState();

  useEffect(() => {
    fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/province/")
      .then((response) => response.json())
      .then((data) => setProv(data))
      .catch((error) => console.log(error));
  }, []);

  const loadmeteo = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        selectcomune && selectcomune.nome
      },it&APPID=f86d2e7fc92e5c469caf430dd0a90e69`
    )
      .then((response) => response.json())
      .then((data) => setMeteoparams(data))
      .catch((error) => console.log(error));
  };

  const loadcom = (e) => {
    fetch(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni/provincia/${e}`)
      .then((response) => response.json())
      .then((data) => setComune(data))
      .catch((error) => console.log(error));
  };

  const icom = (e) => {
    fetch(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni?codice=${e}`)
      .then((response) => response.json())
      .then((data) => setSelectcomune(data[0]))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Container fluid className="my-3">
        <Row>
          <Col md="3">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                loadcom(e.target.value);
              }}
            >
              <option>Seleziona Provincia</option>
              {prov.map((e, index) => (
                <option key={index} value={e.nome}>
                  {e.nome}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md="3">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                icom(e.target.value);
                loadmeteo();
              }}
            >
              <option>Seleziona Comune</option>
              {comune.map((e, index) => (
                <option key={index} name={e.codice} value={e.codice}>
                  {e.nome}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <Meteo selectcomune={selectcomune} meteoparams={meteoparams} />
    </>
  );
}
