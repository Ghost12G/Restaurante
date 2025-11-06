// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




import { Navegacion } from './Componentes/Navegacion';
import { Inicio } from './Componentes/Inicio';
import { Carta } from './Componentes/Carta';
import { Reservas } from './Componentes/Reservas';
import { Delivery } from './Componentes/Delivery';
import { Login } from './Componentes/Login';
import { Footer } from './Componentes/Footer';
import Dashboard from "./Dashboard/Dashboard.jsx";





export const App = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState("");

  return (
    <Router>
      <Navegacion
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
      />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/dashboard" element={<Dashboard />} />

    
        <Route
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
