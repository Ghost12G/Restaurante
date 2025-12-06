// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { UsuarioProvider } from "./Componentes/context/UsuarioContext.jsx"; // ✅ importar el provider
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Navegacion } from './Componentes/Navegacion';
import { Inicio } from './Componentes/Inicio';
import { Productos } from './Componentes/Productos.jsx';
import { Reservas } from './Componentes/Reservas';
import { Delivery } from './Componentes/Delivery';
import { Login } from './Componentes/Login';
import { Footer } from './Componentes/Footer';
import Dashboard from "./Dashboard/Dashboard.jsx";

const AppContent = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState("");
  const location = useLocation();

  const esDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!esDashboard && (
        <Navegacion
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
        />
      )}

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/delivery" element={<Delivery />} />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              usuarioLogueado={usuarioLogueado}
              setUsuarioLogueado={setUsuarioLogueado}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
        />
      </Routes>

      {!esDashboard && <Footer />}
    </>
  );
};

// ✅ envolver AppContent con UsuarioProvider
export const App = () => (
  <Router>
    <UsuarioProvider>
      <AppContent />
    </UsuarioProvider>
  </Router>
);

export default App;
