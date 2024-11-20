import React from "react";

function Questionnaire({ questions, responses, handleAnswer, handleSubmit }) {
  const handleReadQuestion = (question) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${question.text}. Opcion 1: ${question.options.join(", Opcion 2: ")}`;
    utterance.lang = "es-ES"; // Idioma español
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang === "es-ES" && voice.name.includes("Google")); // Selecciona una voz específica
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="survey-container">
      <h1>Cuestionario de Estilos de Aprendizaje</h1>
      {questions.map((q) => (
        <div key={q.id} className="survey-question">
          <p>
            <strong>{q.id}.</strong> {q.text}
          </p>
          <button
            type="button"
            onClick={() => handleReadQuestion(q)}
            className="read-button"
          >
            Leer Pregunta
          </button>
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
