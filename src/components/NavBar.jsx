import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./NavBar.css";

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [comuni, setComuni] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    fetch("https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni")
      .then((response) => response.json())
      .then((data) => setComuni(data))
      .catch((error) => console.error("Error fetching comuni:", error));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = comuni.filter((comune) =>
        comune.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, comuni]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSuggestionClick = (comune) => {
    setSearchTerm(comune.nome);
    setSuggestions([]);
    navigate(`/weather/${comune.nome}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img src="/meteo.png" alt="logo" /> EpiWeather
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: "10px", color: "#ffffff" }} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-links">
          <Nav.Link as={Link} to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Nav.Link>
          <Nav.Link as={Link} to="/search">
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
          </Nav.Link>
          <Nav.Link as={Link} to="/preferiti">
            <FontAwesomeIcon icon={faStar} /> Preferiti
          </Nav.Link>
        </Nav>
        <Form className="search-form" ref={searchRef}>
          <Form.Control type="search" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
          <Button onClick={() => handleSuggestionClick({ nome: searchTerm })}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
          {suggestions.length > 0 && (
            <div className="suggestions-container-navbar">
              <ul className="suggestions-list-navbar">
                {suggestions.slice(0, 5).map((comune, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(comune)} className="suggestion-item-navbar">
                    {comune.nome} ({comune.provincia?.nome || "N/A"})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
