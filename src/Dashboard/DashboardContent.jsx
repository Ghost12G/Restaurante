// src/Dashboard/DashboardContent.jsx
import React, { useEffect } from "react";
import ClientesDashboard from "./ClientesDashboard";
import ProductosDashboard from "./ProductosDashboard";
import PedidosDashboard from "./PedidosDashboard";
import ReservasDashboard from "./ReservasDashboard";
import { iniciarDashboard } from "./Dashboard";

const DashboardContent = ({ seccionActiva }) => {

  useEffect(() => {
    if (seccionActiva === "principal") {
      iniciarDashboard();
    }
  }, [seccionActiva]);

  return (
    <div className="dashboard-content">
      {seccionActiva === "principal" && (
        <>
          <h3>📈 Resumen general</h3>
          <p className="text-muted">Gráficos y métricas del sistema.</p>
          <div className="card p-3 shadow-sm">
            <canvas id="myChart" width="350" height="140"></canvas>
          </div>
        </>
      )}

      {seccionActiva === "reservas" && <ReservasDashboard />}
     {/*  {seccionActiva === "reportes" && (
        <>
          <h3>📁 Reportes Generales</h3>
          <p>Visualiza los reportes de ventas y rendimiento del negocio.</p>
          <ul>
            <li>📅 Reporte semanal</li>
            <li>💰 Ventas totales</li>
            <li>⭐ Clientes frecuentes</li>
          </ul>
        </>
      )} */}
      {seccionActiva === "pedidos" && <PedidosDashboard />}
      {seccionActiva === "productos" && <ProductosDashboard />}
      {seccionActiva === "clientes" && <ClientesDashboard />}
    </div>
  );
};

export default DashboardContent;
