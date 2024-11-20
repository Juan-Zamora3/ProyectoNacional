import React, { useState } from "react";
import "./DashboardEstudiante.css";
import { FaHome, FaBook, FaChartLine, FaCog, FaSignOutAlt } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Progreso from "./Progreso";

const DashboardEstudiante = () => {
  const [view, setView] = useState("dashboard"); // Vista actual
  const [selectedCourse, setSelectedCourse] = useState(null); // Curso seleccionado
  const [selectedActivity, setSelectedActivity] = useState(null); // Actividad seleccionada

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

  const courses = [
    {
      id: 1,
      title: "Historia",
      image: "https://via.placeholder.com/150",
      description: "Aprenderás sobre los eventos más importantes de la historia.",
      activities: [
        { id: "act1", name: "Línea de tiempo histórica", description: "Crea una línea de tiempo con eventos históricos." },
        { id: "act2", name: "Mapas interactivos", description: "Explora mapas históricos interactivos." },
      ],
    },
    {
      id: 2,
      title: "Tecnología",
      image: "https://via.placeholder.com/150",
      description: "Explora el mundo de la innovación tecnológica.",
      activities: [
        { id: "act3", name: "Circuitos básicos", description: "Aprende los fundamentos de circuitos eléctricos." },
        { id: "act4", name: "Taller de programación", description: "Participa en un taller de programación básica." },
      ],
    },
  ];

  // Manejadores de navegación
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setView("courseDetails");
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setView("activityDetail");
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setView("cursos");
  };

  const handleBackToActivities = () => {
    setSelectedActivity(null);
    setView("courseDetails");
  };

  return (
    <div className="dashboard-container">
      {/* Barra lateral */}
      <aside className="sidebar">
        <div className="logo">
          <h2>EduNova</h2>
        </div>
        <nav className="menu">
          <button className="menu-item" onClick={() => setView("dashboard")}>
            <FaHome /> Inicio
          </button>
          <button className="menu-item" onClick={() => setView("cursos")}>
            <FaBook /> Aprendizaje
          </button>
          <button className="menu-item" onClick={() => setView("progreso")}>
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

      {/* Contenido dinámico */}
      <div className="main-content">
        {view === "dashboard" && (
          <>
            {/* Vista del Dashboard */}
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
                  {activities.map((activity, index) => (
                    <div className="message" key={index}>
                      <strong>{activity.title}</strong>
                      <p>{activity.date}, {activity.time}</p>
                    </div>
                  ))}
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
          </>
        )}

        {view === "cursos" && (
          <div className="cursos-container">
            <button className="back-btn" onClick={() => setView("dashboard")}>
              Volver al Dashboard
            </button>
            <h2>Cursos Disponibles</h2>
            <div className="courses-grid">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => handleCourseSelect(course)}
                >
                  <img src={course.image} alt={course.title} className="course-image" />
                  <h3 className="course-title">{course.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "courseDetails" && selectedCourse && (
          <div className="course-detail">
            <button className="back-btn" onClick={handleBackToCourses}>
              Volver a Cursos
            </button>
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            <h3>Actividades:</h3>
            <ul>
              {selectedCourse.activities.map((activity) => (
                <li key={activity.id}>
                  <button
                    className="activity-btn"
                    onClick={() => handleActivitySelect(activity)}
                  >
                    {activity.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {view === "activityDetail" && selectedActivity && (
          <div className="activity-detail">
            <button className="back-btn" onClick={handleBackToActivities}>
              Volver a Detalles del Curso
            </button>
            <h2>{selectedActivity.name}</h2>
            <p>{selectedActivity.description}</p>
            <textarea
              placeholder="Escribe aquí tu respuesta..."
              rows="10"
              cols="50"
            ></textarea>
            <button className="submit-btn">Enviar Respuesta</button>
          </div>
        )}

        {view === "progreso" && <Progreso />}
      </div>
    </div>
  );
};

export default DashboardEstudiante;
