// src/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { iniciarDashboard } from "./Dashboard.js";
import { SidebarDashboard } from "./SidebarDashboard";
import DashboardContent from "./DashboardContent";

const Dashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState("principal");

  useEffect(() => {
    if (seccionActiva === "principal") iniciarDashboard();
  }, [seccionActiva]);

  return (
    <div className="dashboard-container d-flex">
      <SidebarDashboard seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />

      <div className="dashboard-main flex-grow-1 bg-light">
        <header className="p-3 bg-primary text-white shadow-sm d-flex justify-content-between align-items-center">
          <h4 className="m-0">Panel del Administrador</h4>
          {/* <button className="btn btn-outline-light btn-sm">Cerrar sesión</button> */}
        </header>

        <main className="p-4">
          <DashboardContent seccionActiva={seccionActiva} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
