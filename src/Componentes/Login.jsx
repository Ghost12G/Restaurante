import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ setUsuarioLogueado }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Usuarios de ejemplo
  const usuarios = [
    { username: "Cris Kennedy", password: "1234", rol: "usuario" },
    { username: "Admin Master", password: "1234", rol: "admin" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usuarios.find(
      (u) => u.username === usuario && u.password === password
    );

    if (user) {
      // Actualizamos el navbar con el primer nombre
      if (setUsuarioLogueado) setUsuarioLogueado(user.username.split(" ")[0]);

      // Redirigimos según rol
      if (user.rol === "usuario") navigate("/carta");
      else navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos ❌");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center text-primary mb-2 fw-bold">
          Bienvenido a Sabor Peruano
        </h2>
        <p className="text-center text-muted mb-4 fst-italic">
          "El verdadero secreto está en cocinar con el corazón"
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu nombre completo"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Ingresar
          </button>
        </form>

        <div className="mt-3 text-center">
          <a href="#" className="text-decoration-none me-3">Olvidaste tu contraseña?</a>
          <a href="#" className="text-decoration-none">Crea una cuenta aquí</a>
        </div>
      </div>
    </div>
  );
};
