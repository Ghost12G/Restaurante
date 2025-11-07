import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Reservas = () => {
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [personas, setPersonas] = useState(1);
  const [mesa, setMesa] = useState(""); // 🪑 nueva variable de estado
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // Horarios disponibles
  const horasDisponibles = [
    "17:00", "17:30",
    "18:00", "18:30",
    "19:00", "19:30",
    "20:00", "20:30",
    "21:00", "21:30",
    "22:00", "22:30",
    "23:00", "23:30",
    "00:00",
  ];

  // Mesas disponibles (10 mesas)
  const mesasDisponibles = Array.from({ length: 10 }, (_, i) => `Mesa ${i + 1}`);

  // Función para agregar reserva
  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaStr = fecha.toDateString();

    if (!mesa) {
      setError("⚠️ Debes seleccionar una mesa antes de confirmar.");
      return;
    }

    // Verificar si ya hay una reserva en esa fecha, hora y mesa
    const conflicto = reservas.find(
      (r) => r.fecha === fechaStr && r.hora === hora && r.mesa === mesa
    );

    if (conflicto) {
      setError("⚠️ Ya existe una reserva para esa fecha, hora y mesa. Intenta con otro horario o mesa.");
      return;
    }

    // Crear la nueva reserva
    const nuevaReserva = {
      id: reservas.length + 1,
      nombre,
      fecha: fechaStr,
      hora,
      personas,
      mesa,
    };

    setReservas([...reservas, nuevaReserva]);
    setShowModal(true);
    setError("");
  };

  // Cerrar modal y limpiar
  const handleClose = () => {
    setShowModal(false);
    setNombre("");
    setHora("");
    setMesa("");
    setPersonas(1);
  };

  // Efecto para ver cambios en consola
  useEffect(() => {
    console.log("Reservas actualizadas:", reservas);
  }, [reservas]);

  // Marcar fechas con reservas
  const tileClassName = ({ date }) => {
    const tieneReserva = reservas.some(
      (r) => r.fecha === date.toDateString()
    );
    return tieneReserva ? "bg-primary text-white rounded-circle" : "";
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        📅 Gestión de Reservas
      </h2>

      <div className="row">
        {/* 📆 Calendario */}
        <div className="col-md-6 mb-4">
          <div className="bg-light p-3 rounded shadow-sm">
            <label className="form-label fw-semibold">Selecciona una fecha</label>
            <Calendar
              onChange={setFecha}
              value={fecha}
              tileClassName={tileClassName}
              className="border rounded"
            />
          </div>
        </div>

        {/* 🧾 Formulario */}
        <div className="col-md-6">
          <div className="bg-light p-4 rounded shadow-sm">
            <h5 className="text-center mb-3">Registrar nueva reserva</h5>

            {error && <Alert variant="danger">{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Hora</label>
                <select
                  className="form-select"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                >
                  <option value="">Seleccionar hora</option>
                  {horasDisponibles.map((h, i) => (
                    <option key={i} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Mesa disponible</label>
                <select
                  className="form-select"
                  value={mesa}
                  onChange={(e) => setMesa(e.target.value)}
                  required
                >
                  <option value="">Seleccionar mesa</option>
                  {mesasDisponibles.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre del cliente</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Número de personas</label>
                <input
                  type="number"
                  className="form-control"
                  value={personas}
                  min="1"
                  max="12"
                  onChange={(e) => setPersonas(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold">
                Confirmar Reserva
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 📋 Lista de reservas */}
      <div className="mt-5 bg-white shadow-sm p-4 rounded">
        <h4 className="text-center mb-3">📋 Reservas Registradas</h4>
        {reservas.length === 0 ? (
          <p className="text-center text-muted">No hay reservas registradas.</p>
        ) : (
          <table className="table table-striped text-center">
            <thead className="table-primary">
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Mesa</th>
                <th>Personas</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((r) => (
                <tr key={r.id}>
                  <td>{r.nombre}</td>
                  <td>{r.fecha}</td>
                  <td>{r.hora}</td>
                  <td>{r.mesa}</td>
                  <td>{r.personas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>✅ Reserva Confirmada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Reserva para <strong>{nombre}</strong> confirmada.</p>
          <p><strong>Fecha:</strong> {fecha.toLocaleDateString()}</p>
          <p><strong>Hora:</strong> {hora}</p>
          <p><strong>Mesa:</strong> {mesa}</p>
          <p><strong>Personas:</strong> {personas}</p>
          <hr />
          <p className="text-success fw-semibold text-center">
            ¡Nos vemos pronto en el restaurante! 🍽️
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
