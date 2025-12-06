// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterModal } from "./RegisterModal";
import Swal from "sweetalert2";
import { useUsuario } from "./context/UsuarioContext";
import "./Login.css";


export const Login = () => {
  const navigate = useNavigate();
  const { setUsuario } = useUsuario();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8081/restaurante/public/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dni, password }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        const { nombre, rol, id_usuario, telefono } = result.data;

        setUsuario({ id_usuario, nombre, rol, telefono });

        if (rol === "usuario") navigate("/productos");
        else navigate("/dashboard");
      } else {
        setError(result.message || "DNI o contraseña incorrectos");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "DNI o contraseña incorrectos",
        });
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor",
      });
      console.error(err);
    }
  };

  return (
    <>
      <div className="login-premium-container">

        {/* IZQUIERDA */}
        <div className="login-left-side">
          <h1>Bienvenido a Sabor Peruano</h1>
          <p>"El verdadero secreto está en cocinar con el corazón"</p>
          <img 
            src="img/arrozMarisco.png" 
            className="login-side-img" 
            alt="Comida Peruana" 
          />
        </div>

        {/* DERECHA: TU LOGIN ORIGINAL */}
        <div className="login-right-side">

          <h2 className="login-title">Iniciar Sesión</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form-premium">
            <div className="mb-3">
              <label className="form-label fw-semibold">DNI</label>
              <input
                type="text"
                className="form-control premium-input"
                placeholder="Ingresa tu DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Contraseña</label>
              <input
                type="password"
                className="form-control premium-input"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-login-premium">
              Ingresar
            </button>
          </form>

          <div className="text-center mt-3">
            <button
              type="button"
              className="btn-link-premium me-3"
              onClick={() => alert("Aquí va recuperación de contraseña")}
            >
              ¿Olvidaste tu contraseña?
            </button>

            <button
              type="button"
              className="btn-link-premium"
              onClick={() => setShowRegister(true)}
            >
              Crear una cuenta aquí
            </button>
          </div>
        </div>
      </div>

      <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} />
    </>
  );
};
