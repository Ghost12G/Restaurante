import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useUsuario } from "./context/UsuarioContext";
import { useNavigate, useLocation } from "react-router-dom";

export const Reservas = () => {
  const { usuario } = useUsuario();
  const navigate = useNavigate();
  const location = useLocation();

  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState("");
  const [personas, setPersonas] = useState(1);
  const [mesa, setMesa] = useState("");
  const [nombre, setNombre] = useState("");
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // Productos enviados desde carrito
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (usuario) setNombre(usuario.nombre || "");
    if (location.state?.productos && Array.isArray(location.state.productos)) {
      setProductos(location.state.productos);
    }
  }, [usuario, location.state]);

  const horasDisponibles = [
    "17:00","17:30","18:00","18:30",
    "19:00","19:30","20:00","20:30",
    "21:00","21:30","22:00","22:30",
    "23:00","23:30","00:00"
  ];

  const mesasDisponibles = Array.from({ length: 10 }, (_, i) => `Mesa ${i + 1}`);

  const tileClassName = ({ date }) => {
    const tieneReserva = reservas.some(r => r.fecha === date.toDateString());
    return tieneReserva ? "bg-primary text-white rounded-circle" : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      Swal.fire("Error", "Debes iniciar sesión para hacer una reserva", "error");
      navigate("/login");
      return;
    }

    if (!mesa || !hora) {
      setError("⚠️ Debes seleccionar mesa y hora.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:8081/restaurante/public/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: usuario.id_usuario,
          fecha: fecha.toISOString().split("T")[0],
          hora,
          mesa,
          personas,
          productos
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const { reserva } = result; // Tomamos la reserva completa desde backend
        setShowModal(true);
        setReservas(prev => [
          ...prev,
          {
            id: reserva.id_reserva,
            nombre: nombre || reserva.nombre || "",
            fecha: new Date(reserva.fecha).toLocaleDateString(),
            hora: reserva.hora,
            mesa: reserva.mesa,
            personas: reserva.personas
          }
        ]);
      } else {
        Swal.fire("Error", result.message || "Error al registrar la reserva", "error");
      }
    } catch (err) {
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
      console.error(err);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setHora("");
    setMesa("");
    setPersonas(1);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">📅 Gestión de Reservas</h2>

      <div className="row">
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

              <button type="submit" className="btn btn-success w-100 fw-bold">
                Confirmar Reserva
              </button>
            </form>
          </div>
        </div>
      </div>

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

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>✅ Reserva Exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Reserva para <strong>{nombre}</strong> confirmada.</p>
          <p><strong>Fecha:</strong> {fecha.toLocaleDateString()}</p>
          <p><strong>Hora:</strong> {hora}</p>
          <p><strong>Mesa:</strong> {mesa}</p>
          <p><strong>Personas:</strong> {personas}</p>

          {productos.length > 0 && (
            <>
              <hr />
              <h6>Productos en la reserva:</h6>
              <ul>
                {productos.map((p, i) => (
                  <li key={i}>{p.nombre} x {p.cantidad}</li>
                ))}
              </ul>
            </>
          )}

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
