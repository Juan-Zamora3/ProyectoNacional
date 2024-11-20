import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardEstudiante from "./DashboardEstudiante"; // Importa el dashboard
import Cursos from "./Cursos"; // Importa los cursos

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta del Dashboard */}
        <Route path="/" element={<DashboardEstudiante />} />

        {/* Ruta para la página de Cursos */}
        <Route path="/cursos" element={<Cursos />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
