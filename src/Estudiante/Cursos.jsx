import React, { useState } from "react";
import "./Cursos.css";

const Cursos = ({ onBack }) => {
  const [currentView, setCurrentView] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Historia",
      description: "Aprenderás sobre los eventos más importantes de la historia.",
      activities: [
        { id: "1", name: "Línea de tiempo histórica", description: "Crea una línea de tiempo de eventos históricos." },
        { id: "2", name: "Mapas interactivos", description: "Explora los mapas históricos interactivos." },
      ],
    },
    {
      id: 2,
      title: "Tecnología",
      description: "Explora el mundo de la innovación tecnológica.",
      activities: [
        { id: "3", name: "Circuitos básicos", description: "Aprende sobre circuitos eléctricos básicos." },
        { id: "4", name: "Taller de programación", description: "Participa en el taller de programación básica." },
      ],
    },
  ];

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentView("activities");
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setCurrentView("activityDetail");
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setCurrentView("courses");
  };

  const handleBackToActivities = () => {
    setSelectedActivity(null);
    setCurrentView("activities");
  };

  return (
    <div className="cursos-container">
      {currentView === "courses" && (
        <>
          <button onClick={onBack}>Volver al Dashboard</button>
          <h2>Cursos Disponibles</h2>
          {courses.map((course) => (
            <div key={course.id} onClick={() => handleCourseSelect(course)} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </>
      )}
      {currentView === "activities" && selectedCourse && (
        <>
          <button onClick={handleBackToCourses}>Volver a Cursos</button>
          <h2>{selectedCourse.title}</h2>
          {selectedCourse.activities.map((activity) => (
            <div key={activity.id} onClick={() => handleActivitySelect(activity)} className="activity-card">
              <h4>{activity.name}</h4>
              <p>{activity.description}</p>
            </div>
          ))}
        </>
      )}
      {currentView === "activityDetail" && selectedActivity && (
        <>
          <button onClick={handleBackToActivities}>Volver a Actividades</button>
          <h2>{selectedActivity.name}</h2>
          <p>{selectedActivity.description}</p>
          <p>Aquí puedes completar la actividad seleccionada.</p>
        </>
      )}
    </div>
  );
};

export default Cursos;
