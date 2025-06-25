import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.trim() || "";
    const password = formData.get("password") || "";

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/session/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // para sesiones con cookie
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Login exitoso
      navigate("/tasks");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Iniciar Sesión</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Ingresar</button>
        <p>
          ¿Todavía no tienes una cuenta?{" "}
          <Link to="/register">Registrarme</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
