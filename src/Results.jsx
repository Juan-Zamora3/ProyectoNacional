// src/components/Results.js
import React from "react";

function Results({ responses }) {
  // Mapa de preguntas por categoría
  const categoryMap = {
    ACT: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41],
    SNS: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42],
    VIS: [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43],
    SEQ: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44],
    SOC: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55], // Nueva categoría
  };

  // Descripciones de las categorías
  const descriptions = {
    ACT: "Procesamiento de información: Activo vs. Reflexivo.",
    SNS: "Percepción de la información: Sensitivo vs. Intuitivo.",
    VIS: "Entrada de información: Visual vs. Verbal.",
    SEQ: "Comprensión de la información: Secuencial vs. Global.",
    SOC: "Interacción social: Social vs. Solitario.", // Nueva descripción
  };

  // Inicialización de los puntajes
  const scores = {
    ACT: { a: 0, b: 0 },
    SNS: { a: 0, b: 0 },
    VIS: { a: 0, b: 0 },
    SEQ: { a: 0, b: 0 },
    SOC: { a: 0, b: 0 },
  };

  // Calcular puntajes
  Object.entries(responses).forEach(([questionId, answer]) => {
    const id = parseInt(questionId);

    Object.keys(categoryMap).forEach((category) => {
      if (categoryMap[category].includes(id)) {
        if (answer === "a") {
          scores[category].a += 1;
        } else if (answer === "b") {
          scores[category].b += 1;
        }
      }
    });
  });

  // Determinar estilo de aprendizaje según los puntajes
  const getLearningStyle = (category, values) => {
    if (values.a > values.b) {
      switch (category) {
        case "ACT":
          return "Activo";
        case "SNS":
          return "Sensitivo";
        case "VIS":
          return "Visual";
        case "SEQ":
          return "Secuencial";
        case "SOC":
          return "Social";
        default:
          return "Indeterminado";
      }
    } else if (values.b > values.a) {
      switch (category) {
        case "ACT":
          return "Reflexivo";
        case "SNS":
          return "Intuitivo";
        case "VIS":
          return "Verbal";
        case "SEQ":
          return "Global";
        case "SOC":
          return "Solitario";
        default:
          return "Indeterminado";
      }
    } else {
      return "Balanceado";
    }
  };

  return (
    <div>
      <h2>Cuestionario de Estilos de Aprendizaje</h2>
      <h3>Resultados del Inventario de Estilos de Aprendizaje</h3>
      {Object.entries(scores).map(([category, values]) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h4>{descriptions[category]}</h4>
          <p>
            Tu estilo de aprendizaje en esta dimensión es:{" "}
            <strong>{getLearningStyle(category, values)}</strong>
          </p>
        </div>
      ))}
      <p>
        Un puntaje mayor en "a" o "b" indica tu preferencia de estilo de aprendizaje en cada dimensión.
      </p>
    </div>
  );
}

export default Results;
