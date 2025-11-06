// src/Dashboard/SidebarDashboard.jsx
import React from "react";
import { House, CalendarDays, FileText, ShoppingBag, Users, ClipboardList } from "lucide-react";

export const SidebarDashboard = ({ seccionActiva, setSeccionActiva }) => {
  const menuItems = [
    { id: "principal", label: "Dashboard", icon: <House size={18} /> },
    { id: "reservas", label: "Reservas", icon: <CalendarDays size={18} /> },
    { id: "reportes", label: "Reportes", icon: <FileText size={18} /> },
    { id: "ordenes", label: "Órdenes", icon: <ClipboardList size={18} /> },
    { id: "productos", label: "Productos", icon: <ShoppingBag size={18} /> },
    { id: "clientes", label: "Clientes", icon: <Users size={18} /> },
  ];

  return (
    <nav className="sidebar bg-white border-end vh-100 p-3 shadow-sm">
      <h4 className="fw-bold mb-4 text-primary text-center">📊 Panel Admin</h4>
      <ul className="nav flex-column">
        {menuItems.map((item) => (
          <li key={item.id} className="nav-item mb-2">
            <button
              onClick={() => setSeccionActiva(item.id)}
              className={`btn d-flex align-items-center gap-2 w-100 text-start ${
                seccionActiva === item.id
                  ? "btn-primary text-white shadow-sm"
                  : "btn-outline-primary"
              }`}
              style={{ borderRadius: "10px", transition: "0.3s" }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
