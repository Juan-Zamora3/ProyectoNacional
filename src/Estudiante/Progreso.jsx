import React from "react";
import "./Progreso.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Importa automáticamente los gráficos necesarios

const Progreso = () => {
  // Datos para el gráfico de barras
  const chartData = {
    labels: ["Comunicación", "Resolución de problemas", "Trabajo en equipo", "Pensamiento crítico"],
    datasets: [
      {
        label: "Porcentaje de avance",
        data: [85, 70, 90, 65], // Datos de ejemplo
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico de barras
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  // Datos para la lista de actividades completadas
  const completedActivities = [
    {
      title: "Ensayo crítico sobre innovación",
      grade: "95%",
      feedback: "Excelente análisis y redacción.",
    },
    {
      title: "Simulación de circuitos básicos",
      grade: "88%",
      feedback: "Buen manejo de conceptos, puedes optimizar tus tiempos.",
    },
    {
      title: "Proyecto colaborativo: Línea del tiempo",
      grade: "92%",
      feedback: "Trabajo en equipo destacado.",
    },
    {
      title: "Examen de programación",
      grade: "80%",
      feedback: "Revisar sintaxis y lógica para mejorar.",
    },
  ];

  return (
    <div className="progreso-container">
      {/* Encabezado */}
      <header className="progreso-header">
        <h1>Progreso</h1>
      </header>

      {/* Cuerpo principal */}
      <div className="progreso-body">
        {/* Columna izquierda */}
        <div className="progreso-left">
          <div className="progreso-chart">
            <h2>Dimensiones del aprendizaje</h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="progreso-insights">
            <h2>Indicadores</h2>
            <ul>
              <li>💪 Fortalezas: Trabajo en equipo (90%), Comunicación (85%).</li>
              <li>⚠️ Áreas de mejora: Pensamiento crítico (65%).</li>
            </ul>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="progreso-right">
          <h2>Actividades Completadas</h2>
          <ul className="activity-list">
            {completedActivities.map((activity, index) => (
              <li key={index} className="activity-item">
                <h3>{activity.title}</h3>
                <p>Calificación: <strong>{activity.grade}</strong></p>
                <p>Retroalimentación: {activity.feedback}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Progreso;
