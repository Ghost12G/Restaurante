// src/context/UsuarioContext.js
import React, { createContext, useContext, useState } from "react";

// Crear contexto
const UsuarioContext = createContext();

// Provider
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // null al inicio

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useUsuario = () => {
  return useContext(UsuarioContext);
};
