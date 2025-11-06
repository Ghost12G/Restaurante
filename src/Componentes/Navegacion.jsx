import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const Navegacion = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navigate = useNavigate();

  const handleSalir = () => {
    if (setUsuarioLogueado) setUsuarioLogueado("");
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fw-bolder">
      <div className="container-fluid">
        {/* Logo y nombre */}
        <div className="d-flex align-items-center">
          <img
            src='img/paladar.jpg'
            alt="Logo Restaurante"
            width="50"
            height="50"
            className="me-2 rounded-circle border border-light"
          />
          <span className="fw-bold text-light fs-5">El Buen Paladar</span>
        </div>

        {/* Botón responsive */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {/* Menú centrado */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/carta" className="nav-link text-white">Carta</Link>
            </li>
            <li className="nav-item">
              <Link to="/delivery" className="nav-link text-white">Delivery</Link>
            </li>
            <li className="nav-item">
              <Link to="/reservas" className="nav-link text-white">Reservas</Link>
            </li>
          </ul>

          {/* Login/Usuario a la derecha */}
          <div className="d-flex align-items-center">
            {usuarioLogueado ? (
              <>
                <span className="text-white me-2">Hola, {usuarioLogueado}</span>
                <button 
                  onClick={handleSalir} 
                  className="btn btn-sm btn-light"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link text-white">Hola, Iniciar sesión</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
