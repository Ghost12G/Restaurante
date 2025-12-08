import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useUsuario } from "./context/UsuarioContext";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Delivery = () => {
  const { usuario } = useUsuario();
  const location = useLocation();

  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    referencia: "",
    telefono: "",
    pago: "",
    tarjetaNumero: "",
    tarjetaNombre: "",
    tarjetaCVV: "",
    tarjetaFecha: "",
    yapeNumero: "",
    yapeCodigo: "",
  });

  const [carrito, setCarrito] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [deliveryData, setDeliveryData] = useState(null);

  // ⭐ Nuevo estado para mostrar contenedor debajo
  const [deliveryFinal, setDeliveryFinal] = useState(null);

  useEffect(() => {
    if (usuario) {
      setForm((prev) => ({
        ...prev,
        nombre: usuario.nombre ?? "",
        telefono: usuario.telefono ?? "",
      }));
    }

    if (location.state?.productos && Array.isArray(location.state.productos)) {
      setCarrito(location.state.productos);
    }
  }, [usuario, location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.pago) {
      Swal.fire("Error", "Selecciona un método de pago", "error");
      return;
    }

    if (!usuario) {
      Swal.fire("Error", "Debes estar logueado para registrar un delivery", "error");
      return;
    }

    if (carrito.length === 0) {
      Swal.fire("Error", "No hay productos en el carrito", "error");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/restaurante/public/api/delivery",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_usuario: usuario.id_usuario,
            direccion: form.direccion,
            referencia: form.referencia,
            telefono: form.telefono,
            pago: form.pago,
            tarjetaNumero: form.tarjetaNumero,
            tarjetaNombre: form.tarjetaNombre,
            tarjetaCVV: form.tarjetaCVV,
            tarjetaFecha: form.tarjetaFecha,
            yapeNumero: form.yapeNumero,
            yapeCodigo: form.yapeCodigo,
            productos: carrito,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        
        const dataToShow = {
          total: result.total,
          ...form,
          productos: carrito,
        };

        // Modal
        setDeliveryData(dataToShow);
        setShowModal(true);

        // Contenedor abajo
        setDeliveryFinal(dataToShow);

        // Limpiar formulario
        setForm({
          nombre: usuario?.nombre ?? "",
          direccion: "",
          referencia: "",
          telefono: usuario?.telefono ?? "",
          pago: "",
          tarjetaNumero: "",
          tarjetaNombre: "",
          tarjetaCVV: "",
          tarjetaFecha: "",
          yapeNumero: "",
          yapeCodigo: "",
        });

        // Limpiar carrito
        setCarrito([]);

      } else {
        Swal.fire("Error", result.message || "Error en el registro", "error");
      }
    } catch (err) {
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
      console.error(err);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold text-primary">📦 Información de Delivery</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg bg-light rounded-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={form.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Referencia</label>
          <input
            type="text"
            name="referencia"
            className="form-control"
            value={form.referencia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            value={form.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Método de Pago</label>
          <select
            className="form-select"
            name="pago"
            value={form.pago}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="tarjeta">💳 Tarjeta</option>
            <option value="yape">📱 Yape</option>
            <option value="efectivo">💵 Efectivo</option>
          </select>
        </div>

        {form.pago === "tarjeta" && (
          <>
            <div className="mb-3">
              <label>Número de tarjeta</label>
              <input
                type="text"
                name="tarjetaNumero"
                className="form-control"
                value={form.tarjetaNumero}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Nombre en tarjeta</label>
              <input
                type="text"
                name="tarjetaNombre"
                className="form-control"
                value={form.tarjetaNombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>CVV</label>
              <input
                type="text"
                name="tarjetaCVV"
                className="form-control"
                value={form.tarjetaCVV}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Fecha Fecimiento</label>
              <input
                type="text"
                name="tarjetaFecha"
                className="form-control"
                value={form.tarjetaFecha}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {form.pago === "yape" && (
          <>
            <div className="mb-3">
              <label>Número Yape</label>
              <input
                type="text"
                name="yapeNumero"
                className="form-control"
                value={form.yapeNumero}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Código Yape</label>
              <input
                type="text"
                name="yapeCodigo"
                className="form-control"
                value={form.yapeCodigo}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Registrar Delivery
        </button>
      </form>

      {/* ⭐ CONTENEDOR ABAJO */}
      {deliveryFinal && (
        <div className="mt-4 p-4 border rounded-4 shadow bg-white">
          <h4 className="fw-bold text-success mb-3">📦 Delivery registrado</h4>

          <p><strong>Cliente:</strong> {deliveryFinal.nombre}</p>
          <p><strong>Dirección:</strong> {deliveryFinal.direccion}</p>
          <p><strong>Referencia:</strong> {deliveryFinal.referencia}</p>
          <p><strong>Teléfono:</strong> {deliveryFinal.telefono}</p>
          <p><strong>Método de pago:</strong> {deliveryFinal.pago}</p>

          <hr />

          <h5 className="fw-bold">🛒 Productos</h5>
          <ul>
            {deliveryFinal.productos.map((p, i) => (
              <li key={i}>{p.nombre} — x{p.cantidad}</li>
            ))}
          </ul>

          <hr />

          <h4 className="text-center text-primary fw-bold">
            Total: S/ {parseFloat(deliveryFinal.total).toFixed(2)}
          </h4>
        </div>
      )}

      {/* MODAL */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>✅ Delivery Registrado</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {deliveryData && (
            <>
              <p><strong>Cliente:</strong> {deliveryData.nombre}</p>
              <p><strong>Dirección:</strong> {deliveryData.direccion}</p>
              <p><strong>Referencia:</strong> {deliveryData.referencia}</p>
              <p><strong>Teléfono:</strong> {deliveryData.telefono}</p>
              <p><strong>Método de pago:</strong> {deliveryData.pago}</p>

              <hr />
              <h6>Productos:</h6>
              <ul>
                {deliveryData.productos.map((p, i) => (
                  <li key={i}>{p.nombre} x {p.cantidad}</li>
                ))}
              </ul>

              <hr />
              <p className="text-success fw-bold text-center">
                Total: S/ {parseFloat(deliveryData.total).toFixed(2)}
              </p>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
