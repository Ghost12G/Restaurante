import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const Delivery = () => {
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

  const [showModal, setShowModal] = useState(false);
  const [pedidoInfo, setPedidoInfo] = useState(null); // Guardar info del pedido para mostrar en el modal

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardamos la información del pedido antes de limpiar
    const fechaHora = new Date();
    const info = {
      ...form,
      numeroPedido: Math.floor(Math.random() * 100000),
      fechaHora: fechaHora.toLocaleString(), // formato local de fecha y hora
    };
    setPedidoInfo(info);

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm({
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
    setPedidoInfo(null);
  };

  return (
    <div className="container my-5" style={{ maxWidth: "650px" }}>
      <h2 className="text-center mb-4 fw-bold text-primary">🛵 Delivery</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        {/* Datos del cliente */}
        <div className="mb-3">
          <label className="form-label">Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Referencias</label>
          <input
            type="text"
            name="referencia"
            value={form.referencia}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Método de pago */}
        <div className="mb-4">
          <label className="form-label">Método de Pago</label>
          <select
            name="pago"
            value={form.pago}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Seleccione un método</option>
            <option value="tarjeta">💳 Tarjeta</option>
            <option value="yape">📱 Yape</option>
            <option value="efectivo">💵 Efectivo</option>
          </select>
        </div>

        {/* Si elige TARJETA */}
        {form.pago === "tarjeta" && (
          <div className="border p-3 rounded bg-white mb-3">
            <h5 className="fw-bold mb-3">Datos de la Tarjeta</h5>
            <div className="mb-2">
              <label className="form-label">Número de Tarjeta</label>
              <input
                type="text"
                name="tarjetaNumero"
                value={form.tarjetaNumero}
                onChange={handleChange}
                className="form-control"
                placeholder="0000 0000 0000 0000"
                maxLength="19"
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Nombre del Titular</label>
              <input
                type="text"
                name="tarjetaNombre"
                value={form.tarjetaNombre}
                onChange={handleChange}
                className="form-control"
                placeholder="Nombre como aparece en la tarjeta"
                required
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="form-label">Fecha de Vencimiento</label>
                <input
                  type="month"
                  name="tarjetaFecha"
                  value={form.tarjetaFecha}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  name="tarjetaCVV"
                  value={form.tarjetaCVV}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="3 dígitos"
                  maxLength="3"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Si elige YAPE */}
        {form.pago === "yape" && (
          <div className="border p-3 rounded bg-white mb-3">
            <h5 className="fw-bold mb-3">Pago con Yape</h5>
            <div className="mb-2">
              <label className="form-label">Número Yape</label>
              <input
                type="tel"
                name="yapeNumero"
                value={form.yapeNumero}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej: 999 888 777"
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Código de verificación</label>
              <input
                type="text"
                name="yapeCodigo"
                value={form.yapeCodigo}
                onChange={handleChange}
                className="form-control"
                placeholder="Código de 6 dígitos"
                maxLength="6"
                required
              />
            </div>
          </div>
        )}

        {/* Si elige EFECTIVO */}
        {form.pago === "efectivo" && (
          <div className="border p-3 rounded bg-white mb-3">
            <h5 className="fw-bold mb-3">Pago en Efectivo</h5>
            <p className="mb-2">
              💵 El pago se realizará al momento de la entrega.
            </p>
            <p className="text-muted fst-italic">
              Por favor, tenga el monto exacto para agilizar la entrega.
            </p>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Realizar Pedido
        </button>
      </form>

      {/* Modal de confirmación */}
      {pedidoInfo && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>✅ Transacción Exitosa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Gracias por tu pedido, <strong>{pedidoInfo.nombre}</strong>!
            </p>
            <p>
              Tu pedido será entregado en: <strong>{pedidoInfo.direccion}</strong>
            </p>
            <p>
              <strong>Método de pago:</strong>{" "}
              {pedidoInfo.pago === "tarjeta"
                ? "💳 Tarjeta"
                : pedidoInfo.pago === "yape"
                ? "📱 Yape"
                : "💵 Efectivo"}
            </p>
            <p>
              Número de pedido: <strong>#{pedidoInfo.numeroPedido}</strong>
            </p>
            <p>
              Fecha y hora del pedido: <strong>{pedidoInfo.fechaHora}</strong>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
