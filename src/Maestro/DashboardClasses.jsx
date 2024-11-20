import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./DashboardClasses.css";

function DashboardClasses() {
  const progressData = [
    { name: "Life Contingency", chapter: "Chapter 3", progress: 75 },
    { name: "Social Insurance", chapter: "Chapter 4", progress: 91 },
    { name: "Advanced Maths.", chapter: "Module 2", progress: 25 },
    { name: "Pension", chapter: "Chapter 5", progress: 97 },
  ];

  const chartData = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Progreso Semanal",
        data: [20, 50, 75, 90],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.4)",
        borderWidth: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#007bff",
        pointHoverBackgroundColor: "#007bff",
        pointHoverBorderColor: "#fff",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: "#e0e0e0",
        },
        ticks: {
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="classes-dashboard">
      <header className="classes-header">
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar Cursos, Documentos, Actividades..."
        />
        <div className="user-profile">
          <span className="notification-icon">🔔</span>
          <div className="user-avatar">Adeola Ayo</div>
        </div>
      </header>

      <div className="content">
        <div className="completion-progress">
          <h3>Progreso de finalización</h3>
          <div className="progress-list">
            {progressData.map((course, index) => (
              <div key={index} className="progress-item">
                <div>
                  <h4>{course.name}</h4>
                  <p>{course.chapter}</p>
                  <a href="/" className="view-link">
                    Ver
                  </a>
                </div>
                <div className="progress-circle">
                  <CircularProgressbar
                    value={course.progress}
                    text={`${course.progress}%`}
                    styles={buildStyles({
                      textColor: "#007bff",
                      pathColor: course.progress > 70 ? "#4caf50" : "#ff5722",
                      trailColor: "#e0e0e0",
                    })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="global-progress">
          <h3>Progreso global</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default DashboardClasses;
