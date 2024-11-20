import React from "react";

function Questionnaire({ questions, responses, handleAnswer, handleSubmit }) {
  return (
    <div className="survey-container">
      <h1>Cuestionario de Estilos de Aprendizaje</h1>
      {questions.map((q) => (
        <div key={q.id} className="survey-question">
          <p>
            <strong>{q.id}.</strong> {q.text}
          </p>
          {q.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={index === 0 ? "a" : "b"}
                checked={responses[q.id] === (index === 0 ? "a" : "b")}
                onChange={() => handleAnswer(q.id, index === 0 ? "a" : "b")}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="submit-btn">
        Enviar
      </button>
    </div>
  );
}

export default Questionnaire;
