import { useState } from "react";
import "./App.css";
import Inicio from "./Inicio"; // Importa la pantalla de inicio
import app from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegister, setIsRegister] = useState(false); // Alternar entre registro/inicio de sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Determina si mostrar la pantalla de inicio
  const [userEmail, setUserEmail] = useState(""); // Correo del usuario autenticado

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isRegister) {
        // Registro de un nuevo usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setUserEmail(user.email);
        setSuccess(`Usuario registrado con éxito: ${user.email}`);
      } else {
        // Inicio de sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setUserEmail(user.email);
        setSuccess(`Inicio de sesión exitoso: ${user.email}`);
      }
      // Cambia a la pantalla de inicio
      setIsLoggedIn(true);
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  // Si el usuario está autenticado, muestra la pantalla de inicio
  if (isLoggedIn) {
    return <Inicio onLogout={handleLogout} userEmail={userEmail} />;
  }

  // Si el usuario no está autenticado, muestra el formulario de login/registro
  return (
    <div className="login-container">
      <h1>{isRegister ? "Registro" : "Inicio de Sesión"}</h1>
      <form onSubmit={handleFormSubmit}>
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
        <button type="submit" className="login-btn">
          {isRegister ? "Registrarse" : "Iniciar Sesión"}
        </button>
      </form>
      <p className="toggle-message">
        {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}{" "}
        <span className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </span>
      </p>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default App;
