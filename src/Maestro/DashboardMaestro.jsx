import React, { useState } from "react";
import { FaHome, FaBook, FaBookmark, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./DashboardMaestro.css";
import DashboardClasses from "./DashboardClasses";

function DashboardMaestro({ onLogout }) {
  const [view, setView] = useState("home"); // Controla la vista actual (home o classes)

  const messages = [
    { initials: "MA", text: "Acabo de terminar el primer capítulo", time: "09:34 am" },
    { initials: "OT", text: "¿Puedes comprobar las fórmulas...?", time: "12:30 pm" },
    { initials: "Y", text: "Tienes que entregar tu tarea...", time: "15:30 horas" },
  ];

  const progressData = [
    { progress: 75 },
    { progress: 91 },
    { progress: 25 },
    { progress: 97 },
  ];

  const activities = [
    { date: 8, title: "Examen evaluador", details: "8 - 10 de noviembre de 2024 • 8:00 a 9:00 horas", location: "Tutoría Edulog College, Blk 56" },
    { date: 13, title: "Actividad nueva", details: "13 de noviembre de 2024 • 9 a. m. a 10 a. m.", location: "Salón de actos de la escuela, University Road" },
    { date: 18, title: "Crear contenido", details: "18 de noviembre de 2024 • 10 a. m. a 11 a. m.", location: "**Para enviar por correo electrónico" },
    { date: 23, title: "Evaluación docente", details: "23 de noviembre de 2024 • 10 a. m. a 1 p. m.", location: "Tutoría Edulog College, Blk 56" },
  ];

  // Vista principal del dashboard
  const renderHome = () => (
    <>
      <header className="header">
        <h1>Bienvenido de nuevo, 👋 Docente</h1>
      </header>

      <div className="content">
        {/* Messages Section */}
        <div className="messages-section">
          <h3>Mensajes</h3>
          {messages.map((message, index) => (
            <div key={index} className="message-item">
              <div className="message-initials">{message.initials}</div>
              <div>
                <p className="message-text">{`"${message.text}"`}</p>
                <p className="message-time">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <h3>Progreso de los alumnos</h3>
          {progressData.map((data, index) => (
            <div key={index} className="progress-item">
              <div style={{ width: "60px", height: "60px" }}>
                <CircularProgressbar
                  value={data.progress}
                  text={`${data.progress}%`}
                  styles={buildStyles({
                    textColor: "#007bff",
                    pathColor: "#007bff",
                    trailColor: "#e0e0e0",
                    textSize: "12px",
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="calendar-section">
        <div className="calendar">
          <h3>Calendario</h3>
          <div className="calendar-grid">
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i + 1} className="calendar-date">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="upcoming-activities">
          <h3>Fechas importantes</h3>
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-date">{activity.date}</div>
              <div>
                <p className="activity-title">{activity.title}</p>
                <p className="activity-details">{activity.details}</p>
                <p className="activity-location">{activity.location}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Edulog</div>
        <ul className="menu">
          <li className={`menu-item ${view === "home" ? "active" : ""}`} onClick={() => setView("home")}>
            <FaHome className="menu-icon" />
            Hogar
          </li>
          <li className={`menu-item ${view === "classes" ? "active" : ""}`} onClick={() => setView("classes")}>
            <FaBook className="menu-icon" />
            Clases
          </li>
          <li className="menu-item">
            <FaBookmark className="menu-icon" />
            Documentos
          </li>
          <li className="menu-item">
            <FaEnvelope className="menu-icon" />
            Mensajes <span className="notification">4</span>
          </li>
          <li className="menu-item">
            <FaCog className="menu-icon" />
            Ajustes
          </li>
        </ul>
        <button className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt className="menu-icon" />
          Desconectar
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {view === "home" ? renderHome() : <DashboardClasses />}
      </main>
    </div>
  );
}

export default DashboardMaestro;
