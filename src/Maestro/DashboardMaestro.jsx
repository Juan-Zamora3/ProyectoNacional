import React from "react";

function DashboardMaestro({ onLogout }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido al Dashboard del Maestro</h1>
      <p>Este es tu espacio para gestionar cursos, calificaciones y actividades.</p>
      <button
        onClick={onLogout}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default DashboardMaestro;
