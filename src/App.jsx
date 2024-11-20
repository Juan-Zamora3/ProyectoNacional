import { useState } from "react";
import "./App.css";
import app from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs"; // Importa bcrypt para cifrar contraseñas
import DashboardEstudiante from "./Estudiante/DashboardEstudiante";
import DashboardMaestro from "./Maestro/DashboardMaestro";

const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // "maestro" o "estudiante"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegister, setIsRegister] = useState(false); // Alternar entre registro/inicio de sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // Rol del usuario autenticado

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setError("");
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

    try {
      if (isRegister) {
        // Registro de un nuevo usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Cifrar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar usuario en la colección correspondiente
        const collectionName = role === "maestro" ? "maestros" : "estudiantes";
        await setDoc(doc(db, collectionName, user.uid), {
          email,
          role,
          password: hashedPassword, // Guardar contraseña cifrada
        });

        setSuccess(`Usuario registrado con éxito: ${user.email}`);
        setUserRole(role);
      } else {
        // Inicio de sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Verificar el rol en la colección correspondiente
        const collectionName = role === "maestro" ? "maestros" : "estudiantes";
        const docRef = doc(db, collectionName, user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();

          // Comparar contraseñas
          const isPasswordValid = await bcrypt.compare(password, userData.password);
          if (!isPasswordValid) {
            setError("Contraseña incorrecta. Inténtalo de nuevo.");
            return;
          }

          if (userData.role !== role) {
            setError("El rol seleccionado no coincide con tu cuenta.");
            return;
          }

          setUserRole(userData.role);
          setSuccess(`Inicio de sesión exitoso: ${user.email}`);
        } else {
          setError("No se encontró información del usuario en la colección correspondiente.");
          return;
        }
      }
      setIsLoggedIn(true);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Usuario no encontrado. Por favor, regístrate.");
      } else if (err.code === "auth/wrong-password") {
        setError("Contraseña incorrecta. Inténtalo de nuevo.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("El correo ya está registrado. Intenta iniciar sesión.");
      } else {
        setError("Error: " + err.message);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setRole("");
    setUserRole("");
    setError("");
    setSuccess("");
  };

  if (isLoggedIn) {
    return userRole === "estudiante" ? (
      <DashboardEstudiante onLogout={handleLogout} />
    ) : userRole === "maestro" ? (
      <DashboardMaestro onLogout={handleLogout} />
    ) : (
      <div>
        <p>Rol desconocido. Por favor, contacta al administrador.</p>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    );
  }

  if (!role) {
    // Selector inicial de rol
    return (
      <div className="role-selection-container">
        <h1>Selecciona tu Rol</h1>
        <button onClick={() => handleRoleSelection("estudiante")} className="role-btn">
          Estudiante
        </button>
        <button onClick={() => handleRoleSelection("maestro")} className="role-btn">
          Maestro
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1>{isRegister ? `Registro (${role})` : `Inicio de Sesión (${role})`}</h1>
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
      <button onClick={() => setRole("")} className="back-btn">
        Volver
      </button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default App;
