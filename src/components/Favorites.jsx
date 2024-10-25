import React from "react";
import Meteo from "./Meteo";

export default function Favorites({ favoriteCities, removeFavoriteCity }) {
  if (favoriteCities.length === 0) {
    return <p>Non hai ancora selezionato un comune preferito.</p>;
  }

  return (
    <div style={{ textAlign: "center", minHeight: "100vh" }}>
      <h1>I tuoi Comuni Preferiti</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically (if space permits)
          gap: "20px", // Add space between the cards
          minHeight: "50vh", // Optional: Ensures the container has some height
        }}
      >
        {favoriteCities.map((city) => (
          <div key={city.codice} style={{ position: "relative" }}>
            <Meteo selectcomune={city} meteoparams={null} />

            {/* Pulsante per rimuovere la città */}
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={() => removeFavoriteCity(city.codice)}
            >
              Rimuovi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
