import React, { useState } from "react";
import "./App.css";
import app from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import Questionnaire from "./Questionnaire";
import Results from "./Results";
import DashboardEstudiante from "./Estudiante/DashboardEstudiante";

// Firebase setup
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState(""); // "maestro" o "estudiante"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false); // Mostrar encuesta
  const [responses, setResponses] = useState({});
  const [surveyResults, setSurveyResults] = useState(null); // Resultados de las dimensiones

  // Preguntas del cuestionario
  const questions = [
    { id: 1, text: "Entiendo algo mejor después de", options: ["probarlo.", "pensarlo detenidamente."] },
    { id: 2, text: "Preferiría ser considerado", options: ["realista.", "innovador."] },
    { id: 3, text: "Cuando pienso en lo que hice ayer, es más probable que recuerde", options: ["una imagen.", "palabras."] },
    { id: 4, text: "Tiendo a", options: ["entender los detalles de un tema, pero puede que me confunda con la estructura general.", "entender la estructura general, pero puede que me confunda con los detalles."] },
    { id: 5, text: "Cuando estoy aprendiendo algo nuevo, me ayuda", options: ["hablar sobre ello.", "pensar sobre ello."] },
    { id: 6, text: "Si fuera maestro, preferiría enseñar un curso que trate", options: ["con hechos y situaciones de la vida real.", "con ideas y teorías."] },
    { id: 7, text: "Prefiero obtener nueva información en forma de", options: ["imágenes, diagramas, gráficos o mapas.", "instrucciones escritas o información verbal."] },
    { id: 8, text: "Una vez que entiendo", options: ["todas las partes, entiendo todo el conjunto.", "el conjunto, veo cómo encajan las partes."] },
    { id: 9, text: "En un grupo de estudio trabajando con material difícil, es más probable que", options: ["participe y aporte ideas.", "me siente y escuche."] },
    { id: 10, text: "Me resulta más fácil", options: ["aprender hechos.", "aprender conceptos."] },
    { id: 11, text: "En un libro con muchas imágenes y gráficos, es más probable que", options: ["examine cuidadosamente las imágenes y gráficos.", "me concentre en el texto escrito."] },
    { id: 12, text: "Cuando resuelvo problemas matemáticos", options: ["usualmente sigo los pasos uno por uno para llegar a la solución.", "a menudo veo la solución pero tengo que esforzarme para descubrir los pasos para llegar a ella."] },
    { id: 13, text: "En las clases que he tomado", options: ["generalmente he conocido a muchos de los estudiantes.", "raramente he conocido a muchos de los estudiantes."] },
    { id: 14, text: "Cuando leo textos no ficticios, prefiero", options: ["algo que me enseñe nuevos hechos o me diga cómo hacer algo.", "algo que me dé nuevas ideas para reflexionar."] },
    { id: 15, text: "Me gustan los maestros", options: ["que ponen muchos diagramas en el tablero.", "que pasan mucho tiempo explicando."] },
    { id: 16, text: "Cuando analizo una historia o novela", options: ["pienso en los incidentes y trato de unirlos para entender los temas.", "simplemente sé cuáles son los temas cuando termino de leer y luego tengo que volver y encontrar los incidentes que los demuestran."] },
    { id: 17, text: "Cuando empiezo un problema de tarea, es más probable que", options: ["comience a trabajar en la solución de inmediato.", "trate de entender completamente el problema primero."] },
    { id: 18, text: "Prefiero la idea de", options: ["certeza.", "teoría."] },
    { id: 19, text: "Recuerdo mejor", options: ["lo que veo.", "lo que escucho."] },
    { id: 20, text: "Para mí es más importante que un instructor", options: ["presente el material en pasos secuenciales claros.", "me dé una visión general y relacione el material con otros temas."] },
    { id: 21, text: "Prefiero estudiar", options: ["en un grupo de estudio.", "solo."] },
    { id: 22, text: "Es más probable que se me considere", options: ["cuidadoso con los detalles de mi trabajo.", "creativo en cómo hago mi trabajo."] },
    { id: 23, text: "Cuando recibo indicaciones para ir a un lugar nuevo, prefiero", options: ["un mapa.", "instrucciones escritas."] },
    { id: 24, text: "Aprendo", options: ["a un ritmo bastante regular. Si estudio mucho, lo entenderé.", "de forma irregular. Estoy completamente confundido y luego, de repente, todo hace 'clic'."] },
    { id: 25, text: "Prefiero primero", options: ["probar cosas.", "pensar en cómo voy a hacerlo."] },
    { id: 26, text: "Cuando leo por diversión, prefiero que los escritores", options: ["digan claramente lo que quieren decir.", "digan cosas de maneras creativas e interesantes."] },
    { id: 27, text: "Cuando veo un diagrama o un esquema en clase, es más probable que recuerde", options: ["la imagen.", "lo que dijo el instructor al respecto."] },
    { id: 28, text: "Al considerar un conjunto de información, es más probable que", options: ["me concentre en los detalles y pierda la visión general.", "trate de entender la visión general antes de entrar en los detalles."] },
    { id: 29, text: "Recuerdo más fácilmente", options: ["algo que he hecho.", "algo en lo que he pensado mucho."] },
    { id: 30, text: "Cuando tengo que realizar una tarea, prefiero", options: ["dominar una forma de hacerlo.", "idear nuevas formas de hacerlo."] },
    { id: 31, text: "Cuando alguien me muestra datos, prefiero", options: ["gráficos o diagramas.", "texto que resuma los resultados."] },
    { id: 32, text: "Cuando escribo un trabajo, es más probable que", options: ["trabaje en el comienzo del trabajo y avance en orden.", "trabaje en diferentes partes del trabajo y luego las ordene."] },
    { id: 33, text: "Cuando trabajo en un proyecto grupal, primero quiero", options: ["tener una 'lluvia de ideas grupal' donde todos contribuyan con ideas.", "pensar individualmente y luego reunirnos como grupo para comparar ideas."] },
    { id: 34, text: "Considero que es más halagador que me llamen", options: ["sensato.", "imaginativo."] },
    { id: 35, text: "Cuando conozco a personas en una fiesta, es más probable que recuerde", options: ["cómo se veían.", "lo que dijeron sobre sí mismos."] },
    { id: 36, text: "Cuando estoy aprendiendo un tema nuevo, prefiero", options: ["mantenerme enfocado en ese tema, aprendiendo tanto como pueda sobre él.", "tratar de hacer conexiones entre ese tema y temas relacionados."] },
    { id: 37, text: "Es más probable que se me considere", options: ["extrovertido.", "reservado."] },
    { id: 38, text: "Prefiero cursos que enfatizan", options: ["material concreto (hechos, datos).", "material abstracto (conceptos, teorías)."] },
    { id: 39, text: "Para entretenerme, prefiero", options: ["ver televisión.", "leer un libro."] },
    { id: 40, text: "Algunos maestros comienzan sus clases con un esquema de lo que cubrirán. Estos esquemas son", options: ["algo útiles para mí.", "muy útiles para mí."] },
    { id: 41, text: "La idea de hacer tareas en grupo, con una calificación para todo el grupo,", options: ["me atrae.", "no me atrae."] },
    { id: 42, text: "Cuando hago cálculos largos,", options: ["tiendo a repetir todos mis pasos y revisar mi trabajo cuidadosamente.", "revisar mi trabajo me resulta tedioso y tengo que obligarme a hacerlo."] },
    { id: 43, text: "Tiendo a imaginar lugares donde he estado", options: ["fácil y bastante exactamente.", "con dificultad y sin mucho detalle."] },
    { id: 44, text: "Cuando resuelvo problemas en grupo, es más probable que", options: ["piense en los pasos del proceso de solución.", "piense en posibles consecuencias o aplicaciones de la solución en una amplia variedad de áreas."] },
    { id: 45, text: "Prefiero estudiar en", options: ["grupo.", "solitario."] },
    { id: 46, text: "Cuando tengo que resolver un problema difícil, prefiero", options: ["trabajar con otras personas.", "trabajar solo."] },
    { id: 47, text: "En reuniones sociales, tiendo a", options: ["ser muy participativo.", "escuchar más que hablar."] },
    { id: 48, text: "Prefiero trabajar en proyectos", options: ["en equipo.", "de forma individual."] },
    { id: 49, text: "Cuando aprendo algo nuevo, me ayuda", options: ["discutirlo con otros.", "pensar en ello por mí mismo."] },
    { id: 50, text: "Cuando tengo dudas sobre un tema, prefiero", options: ["preguntar a otros.", "buscar respuestas por mi cuenta."] },
    { id: 51, text: "Cuando trabajo, me siento más productivo", options: ["rodeado de otras personas.", "en un ambiente tranquilo y privado."] },
    { id: 52, text: "Prefiero participar en actividades de aprendizaje que son", options: ["colaborativas.", "independientes."] },
    { id: 53, text: "Cuando pienso en mis logros, prefiero compartirlos con", options: ["un grupo de personas.", "una persona cercana o conmigo mismo."] },
    { id: 54, text: "En mi tiempo libre, prefiero", options: ["hacer actividades en grupo.", "hacer actividades por mi cuenta."] },
    { id: 55, text: "Cuando trabajo en un equipo, suelo", options: ["contribuir activamente en las discusiones.", "realizar mi parte sin mucha interacción."] },
  
  ];

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setError("");
  };

  const handleAnswer = (questionId, answer) => {
    setResponses((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSurveySubmit = () => {
    const allAnswered = questions.every((q) => responses[q.id]);
    if (!allAnswered) {
      setError("Por favor responde todas las preguntas antes de continuar.");
      return;
    }
    const calculatedResults = calculateResults();
    setSurveyResults(calculatedResults);
    saveSurveyResults(calculatedResults);
  };

  const calculateResults = () => {
    const categoryMap = {
      ACT: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41],
      SNS: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42],
      VIS: [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43],
      SEQ: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44],
      SOC: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
    };

    const scores = {
      ACT: { a: 0, b: 0 },
      SNS: { a: 0, b: 0 },
      VIS: { a: 0, b: 0 },
      SEQ: { a: 0, b: 0 },
      SOC: { a: 0, b: 0 },
    };

    Object.entries(responses).forEach(([questionId, answer]) => {
      const id = parseInt(questionId, 10);
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

    const results = {};
    Object.entries(scores).forEach(([category, values]) => {
      if (values.a > values.b) {
        results[category] =
          category === "ACT"
            ? "Activo"
            : category === "SNS"
            ? "Sensitivo"
            : category === "VIS"
            ? "Visual"
            : category === "SEQ"
            ? "Secuencial"
            : "Social";
      } else if (values.b > values.a) {
        results[category] =
          category === "ACT"
            ? "Reflexivo"
            : category === "SNS"
            ? "Intuitivo"
            : category === "VIS"
            ? "Verbal"
            : category === "SEQ"
            ? "Global"
            : "Solitario";
      } else {
        results[category] = "Balanceado";
      }
    });

    return results;
  };

  const saveSurveyResults = async (calculatedResults) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "estudiantes", user.uid), {
        email,
        password: hashedPassword,
        role: "estudiante",
        name,
        age,
        gender,
        surveyResults: calculatedResults,
      });

      setSuccess("Datos registrados y resultado de encuesta guardado.");
      setIsLoggedIn(true);
      setShowSurvey(false);
    } catch (err) {
      setError("Error al guardar los datos: " + err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !email.includes("@")) {
      setError("Por favor, introduce un correo válido.");
      return;
    }
    if (!password || password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (isRegister) {
      setShowSurvey(true);
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const docRef = doc(db, "estudiantes", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const isPasswordValid = await bcrypt.compare(password, userData.password);
          if (!isPasswordValid) {
            setError("Contraseña incorrecta. Inténtalo de nuevo.");
            return;
          }

          setSuccess(`Inicio de sesión exitoso: ${user.email}`);
          setIsLoggedIn(true);
        } else {
          setError("No se encontró información del usuario.");
        }
      } catch (err) {
        setError("Error: " + err.message);
      }
    }
  };

  if (showSurvey) {
    return (
      <div className="survey-container">
        <h1>Cuestionario de Estilos de Aprendizaje</h1>
        <Questionnaire
          questions={questions}
          responses={responses}
          handleAnswer={handleAnswer}
          handleSubmit={handleSurveySubmit}
        />
      </div>
    );
  }

  if (isLoggedIn) {
    return <DashboardEstudiante results={surveyResults} />;
  }

  if (!role) {
    return (
      <div className="role-selection-container">
        <h1>Selecciona tu Rol</h1>
        <button onClick={() => handleRoleSelection("estudiante")}>Estudiante</button>
        <button onClick={() => handleRoleSelection("maestro")}>Maestro</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1>{isRegister ? `Registro (${role})` : `Inicio de Sesión (${role})`}</h1>
      <form onSubmit={handleFormSubmit}>
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Edad"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Selecciona tu género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </>
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? "Registrarse" : "Iniciar Sesión"}</button>
      </form>
      <p>
        {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}{" "}
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </button>
      </p>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}



export default App;
