import React from "react";
import "./Inicio.css";

const Inicio = ({ onLogout,  }) => {
  return (
    <div className="inicio-container">
      <h1>Bienvenido</h1>
      <p>pantalla inicio</p>
      <button className="logout-btn" onClick={onLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Inicio;
