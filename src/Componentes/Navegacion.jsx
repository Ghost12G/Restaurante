import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navegacion.css";
import { useUsuario } from "./context/UsuarioContext"; // ✅ usar contexto

export const Navegacion = () => {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useUsuario(); // ✅ obtener usuario del contexto

  const handleSalir = () => {
    setUsuario(null); // ✅ limpiar usuario en contexto
    navigate("/");
  };

  return (
    <nav className="navbar-premium">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="img/paladar.jpg" alt="Logo" />
          <span>El Buen Paladar</span>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-item">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/productos" className="nav-item">Productos</NavLink>
          </li>
          <li>
            <NavLink to="/delivery" className="nav-item">Delivery</NavLink>
          </li>
          <li>
            <NavLink to="/reservas" className="nav-item">Reservas</NavLink>
          </li>
        </ul>

        <div className="nav-user">
          {usuario ? (
            <>
              <span className="nav-usuario">Hola, {usuario.nombre.split(" ")[0]}</span>
              <button className="btn-salir" onClick={handleSalir}>Salir</button>
            </>
          ) : (
            <NavLink to="/login" className="btn-login">Iniciar sesión</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
