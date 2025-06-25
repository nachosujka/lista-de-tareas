import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    const password = formData.get("password") || "";

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/session/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al registrarse");
      }

      // Registro exitoso
      navigate("/tasks");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registrarse</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Registrarse</button>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </form>
  );
}

export default Register;
