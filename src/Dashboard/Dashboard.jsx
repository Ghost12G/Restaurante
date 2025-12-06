// src/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { iniciarDashboard } from "./Dashboard.js";
import { SidebarDashboard } from "./SidebarDashboard";
import DashboardContent from "./DashboardContent";

// 👉 Importamos el contexto
import { useUsuario } from "../Componentes/context/UsuarioContext";

const Dashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState("principal");
  const navigate = useNavigate();

  // 👉 Obtenemos el usuario desde el contexto global
  const { usuario, setUsuario } = useUsuario();

  useEffect(() => {
    if (seccionActiva === "principal") iniciarDashboard();
  }, [seccionActiva]);

  return (
    <div className="dashboard-container d-flex">
      <SidebarDashboard
        seccionActiva={seccionActiva}
        setSeccionActiva={setSeccionActiva}
      />

      <div className="dashboard-main flex-grow-1 bg-light">
        <header className="p-3 bg-primary text-white shadow-sm d-flex justify-content-between align-items-center">

          {/* Mostrar nombre del administrador */}
          <h4 className="m-0">
            Hola, <strong>{usuario?.nombre}</strong>
          </h4>

          {/* Botón cerrar sesión */}
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => {
              setUsuario(null);   // Limpia el usuario del contexto
              navigate("/login");
            }}
          >
            Cerrar sesión
          </button>
        </header>

        <main className="p-4">
          <DashboardContent seccionActiva={seccionActiva} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
