import React from "react";
import "./DashboardEstudiante.css";
import { FaHome, FaBook, FaChartLine, FaCog, FaSignOutAlt } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DashboardEstudiante = () => {
  const progressData = [
    { title: "Life Contingency", percentage: 79 },
    { title: "Social Insurance", percentage: 61 },
    { title: "Advanced Maths", percentage: 90 },
    { title: "Pension", percentage: 75 },
  ];

  const activities = [
    { title: "Life Contingency Tutorials", date: "8 Julio", time: "9:00 AM - 11:00 AM" },
    { title: "Social Insurance Test", date: "13 Julio", time: "2:00 PM - 4:00 PM" },
    { title: "Advanced Maths Assignment Due", date: "18 Julio", time: "Todo el día" },
    { title: "Dr. Dipo's Tutorial Class", date: "23 Julio", time: "4:00 PM - 6:00 PM" },
  ];

  return (
    <div className="dashboard-container">
      {/* Barra lateral */}
      <aside className="sidebar">
        <div className="logo">
          <h2>EduNova</h2>
        </div>
        <nav className="menu">
          <button className="menu-item active">
            <FaHome /> Inicio
          </button>
          <button className="menu-item">
            <FaBook /> Aprendizaje
          </button>
          <button className="menu-item">
            <FaChartLine /> Progreso
          </button>
          <button className="menu-item">
            <FaCog /> Ajustes
          </button>
        </nav>
        <button className="logout-btn">
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <div className="main-content">
        <header className="header">
          <input type="text" placeholder="Buscar" className="search-bar" />
          <div className="profile-info">
            <img
              src="https://via.placeholder.com/40"
              alt="Perfil"
              className="profile-avatar"
            />
            <span>Andrea Ayo</span>
          </div>
        </header>

        <div className="dashboard-body">
          <section className="welcome-section">
            <h2>Welcome back, Ayo 👋</h2>
            <p>
              You've learned <strong>70%</strong> of your goal this week! Keep it up and improve your progress.
            </p>
          </section>

          <div className="main-panels">
            {/* Mensajes */}
            <div className="messages-panel">
              <h3>Messages</h3>
              <div className="message">
                <strong>Mayowa Ade</strong>
                <p>Just finished the first chapter.</p>
              </div>
              <div className="message">
                <strong>Olawuyi Tobi</strong>
                <p>Can you check the formulas for Chapter 2?</p>
              </div>
              <div className="message">
                <strong>Joshua Ashiru</strong>
                <p>Dear Ayo, you need to submit your assignment.</p>
              </div>
            </div>

            {/* Avance del curso */}
            <div className="progress-panel">
              <h3>Avance del curso</h3>
              {progressData.map((item, index) => (
                <div className="progress-item" key={index}>
                  <CircularProgressbar value={item.percentage} text={`${item.percentage}%`} />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="right-panel">
        <div className="calendar-section">
          <h3>Fechas Importantes</h3>
          <Calendar />
        </div>
        <div className="upcoming-activities">
          <h3>Próximas Actividades</h3>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>
                <strong>{activity.title}</strong>
                <p>{activity.date} - {activity.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardEstudiante;
