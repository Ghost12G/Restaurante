/* RegisterModal.jsx */
import React, { useState } from "react";
import Swal from "sweetalert2";

export const RegisterModal = ({ show, onClose }) => {
  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
          referencia: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleRegister = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(
        "http://localhost:8081/restaurante/public/api/usuarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: result.message || "Usuario registrado correctamente",
        });

        setForm({
          dni: "",
          nombre: "",
          correo: "",
          telefono: "",
          direccion: "",
          referencia: "",
          password: "",
        });
        setErrors({});

        if (onClose) onClose();
      } else if (response.status === 422) {
        setErrors(result.errors || {});
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "Por favor corrige los campos",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "Ocurrió un error",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor",
      });
      console.error(err);
    }


  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    > <div className="modal-dialog"> <div className="modal-content shadow"> <div className="modal-header"> <h5 className="modal-title">Crear cuenta</h5>
      <button
        className="btn-close"
        onClick={() => {
          setForm({
            dni: "",
            nombre: "",
            correo: "",
            telefono: "",
            direccion: "",
          referencia: "",
            password: "",
          });
          setErrors({});
          if (onClose) onClose();
        }}
      ></button> </div>


      <form onSubmit={handleRegister}>
        <div className="modal-body">

          <div className="mb-2">
            <label className="form-label">DNI</label>
            <input
              type="text"
              name="dni"
              maxLength="8"
              className="form-control"
              required
              onChange={handleChange}
              value={form.dni}
            />
            {errors.dni && <small className="text-danger">{errors.dni[0]}</small>}
          </div>

          <div className="mb-2">
            <label className="form-label">Nombres completos</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              required
              onChange={handleChange}
              value={form.nombre}
            />
            {errors.nombre && <small className="text-danger">{errors.nombre[0]}</small>}
          </div>

          <div className="mb-2">
            <label className="form-label">Correo</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              required
              onChange={handleChange}
              value={form.correo}
            />
            {errors.correo && <small className="text-danger">{errors.correo[0]}</small>}
          </div>

          <div className="mb-2">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              required
              onChange={handleChange}
              value={form.telefono}
            />
            {errors.telefono && <small className="text-danger">{errors.telefono[0]}</small>}
          </div>

          <div className="mb-2">
            <label className="form-label">Direccion</label>
            <input
              type="text"
              name="direccion"
              className="form-control"
              required
              onChange={handleChange}
              value={form.direccion}
            />
            {errors.direccion && <small className="text-danger">{errors.direccion[0]}</small>}
          </div>


          <div className="mb-2">
            <label className="form-label">Referencia</label>
            <input
              type="text"
              name="referencia"
              className="form-control"
              required
              onChange={handleChange}
              value={form.referencia}
            />
            {errors.referencia && <small className="text-danger">{errors.referencia[0]}</small>}
          </div>


          <div className="mb-2">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              onChange={handleChange}
              value={form.password}
            />
            {errors.password && <small className="text-danger">{errors.password[0]}</small>}
          </div>

        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setForm({ dni: "", nombre: "", correo: "", telefono: "", password: "" });
              setErrors({});
              if (onClose) onClose();
            }}
          >
            Cerrar
          </button>

          <button type="submit" className="btn btn-primary">
            Crear cuenta
          </button>
        </div>

      </form>
    </div>
      </div>
    </div>


  );
};
