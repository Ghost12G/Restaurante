// src/Dashboard/DashboardContent.jsx
import React from "react";

const DashboardContent = ({ seccionActiva }) => {
  return (
    <div className="dashboard-content">
      {seccionActiva === "principal" && (
        <>
          <h3>📈 Resumen general</h3>
          <p className="text-muted">Gráficos y métricas del sistema.</p>
          <div className="card p-3 shadow-sm">
            <canvas id="myChart" width="400" height="200"></canvas>
          </div>
        </>
      )}

      {seccionActiva === "reservas" && (
        <>
          <h3>🗓️ Gestión de Reservas</h3>
          <p>Listado de reservas recientes:</p>
          <table className="table table-striped mt-3">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Ana Torres</td>
                <td>2025-11-06</td>
                <td>19:00</td>
                <td>Confirmada</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Carlos Vega</td>
                <td>2025-11-07</td>
                <td>20:30</td>
                <td>Pendiente</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {seccionActiva === "reportes" && (
        <>
          <h3>📁 Reportes Generales</h3>
          <p>Visualiza los reportes de ventas y rendimiento del negocio.</p>
          <ul>
            <li>📅 Reporte semanal</li>
            <li>💰 Ventas totales</li>
            <li>⭐ Clientes frecuentes</li>
          </ul>
        </>
      )}

      {seccionActiva === "ordenes" && (
        <>
          <h3>🧾 Órdenes registradas</h3>
          <p>Aquí se mostrarán las órdenes del sistema.</p>
        </>
      )}

      {seccionActiva === "productos" && (
        <>
          <h3>📦 Gestión de productos</h3>
          <p>Listado y administración de productos.</p>
        </>
      )}

      {seccionActiva === "clientes" && (
        <>
          <h3>👥 Clientes</h3>
          <p>Información sobre los clientes registrados.</p>
        </>
      )}
    </div>
  );
};

export default DashboardContent;
