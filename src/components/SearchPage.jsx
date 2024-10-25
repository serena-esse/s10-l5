import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Meteo from "./Meteo";
import "./SearchPage.css"; // Import custom CSS

export default function SearchPage({ saveFavoriteCity }) {
  const [regioni, setRegioni] = useState([]);
  const [prov, setProv] = useState([]);
  const [filteredProv, setFilteredProv] = useState([]);
  const [comune, setComune] = useState([]);
  const [filteredComune, setFilteredComune] = useState([]);
  const [selectedComune, setSelectedComune] = useState(null);
  const [meteoparams, setMeteoparams] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegione, setSelectedRegione] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  // Carica dati al montaggio
  useEffect(() => {
    fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/regioni")
      .then((response) => response.json())
      .then((data) => setRegioni(data))
      .catch(console.log);

    fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/province/")
      .then((response) => response.json())
      .then((data) => {
        setProv(data);
        setFilteredProv(data);
      })
      .catch(console.log);

    fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni")
      .then((response) => response.json())
      .then((data) => {
        setComune(data);
        setFilteredComune(data);
      })
      .catch(console.log);
  }, []);

  // Carica meteo del comune selezionato
  const loadMeteo = (codiceComune) => {
    fetch(`https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni?codice=${codiceComune}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedComune(data[0]);
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${data[0].nome},it&APPID=f86d2e7fc92e5c469caf430dd0a90e69`
        );
      })
      .then((response) => response.json())
      .then(setMeteoparams)
      .catch(console.log);
  };

  // Salva comune nei preferiti
  const handleSaveFavorite = (city) => {
    saveFavoriteCity(city);
    setConfirmationMessage(`${city.nome} è stato aggiunto ai preferiti!`);
    setTimeout(() => setConfirmationMessage(""), 3000);
  };

  // Filtra comuni per ricerca
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredComune(comune.filter((item) => item.nome.toLowerCase().includes(searchValue)));
    setShowSuggestions(true);
  };

  // Filtra province per regione selezionata
  const handleRegionChange = (regione) => {
    setSelectedRegione(regione);
    setFilteredProv(regione === "" ? prov : prov.filter((p) => p.regione === regione));
  };

  // Filtra comuni per provincia selezionata
  const handleProvinceChange = (provincia) => {
    setSelectedProvincia(provincia);
    setFilteredComune(provincia === "" ? comune : comune.filter((c) => c.provincia.nome === provincia));
  };

  // Chiudi suggerimenti se si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container fluid className="search-page-container">
      <div className="inner-container">
        {/* Colonna sinistra: ricerca */}
        <div className="search-column">
          <h2>Ricerca Comune</h2>

          {/* Selezione regione */}
          <Row className="mt-4">
            <Col md="12">
              <Form.Select aria-label="Seleziona Regione" onChange={(e) => handleRegionChange(e.target.value)}>
                <option value="">Seleziona Regione</option>
                {regioni.map((regione, index) => (
                  <option key={index} value={regione}>
                    {regione}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {/* Selezione provincia */}
          <Row className="mt-4">
            <Col md="12">
              <Form.Select aria-label="Seleziona Provincia" onChange={(e) => handleProvinceChange(e.target.value)}>
                <option value="">Seleziona Provincia</option>
                {filteredProv.map((e, index) => (
                  <option key={index} value={e.nome}>
                    {e.nome}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {/* Selezione comune */}
          <Row className="mt-4">
            <Col md="12">
              <Form.Select aria-label="Seleziona Comune" onChange={(e) => loadMeteo(e.target.value)}>
                <option>Seleziona Comune</option>
                {filteredComune.map((e, index) => (
                  <option key={index} value={e.codice}>
                    {e.nome}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </div>

        {/* Colonna destra: meteo */}
        <div className="meteo-column">
          {selectedComune && meteoparams && (
            <>
              <Row className="mt-5">
                <Col md="12" className="d-flex justify-content-center">
                  <div className="meteo-card">
                    <Meteo selectcomune={selectedComune} meteoparams={meteoparams} />
                  </div>
                </Col>
              </Row>

              <Button className="save-favorites-btn" onClick={() => handleSaveFavorite(selectedComune)}>
                Salva nei Preferiti
              </Button>

              {confirmationMessage && (
                <div className="confirmation-message mt-3">
                  <p>{confirmationMessage}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
