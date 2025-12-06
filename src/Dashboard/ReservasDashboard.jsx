import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ReservasDashboard = () => {
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editReserva, setEditReserva] = useState(null);
  const [form, setForm] = useState({
    id_usuario: "",
    fecha: "",
    hora: "",
    mesa: "",
    personas: ""
  });
  const [filtro, setFiltro] = useState("");

  // Cargar reservas
  const fetchReservas = async () => {
    try {
      const res = await fetch("http://localhost:8081/restaurante/public/api/reservas");
      const data = await res.json();
      setReservas(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Cargar usuarios
  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:8081/restaurante/public/api/usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReservas();
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregar = () => {
    setForm({
      id_usuario: "",
      fecha: "",
      hora: "",
      mesa: "",
      personas: ""
    });
    setEditReserva({ nuevo: true });
  };

  const handleEditar = (reserva) => {
    setEditReserva(reserva);
    setForm({
      id_usuario: reserva.id_usuario,
      fecha: reserva.fecha,
      hora: reserva.hora,
      mesa: reserva.mesa, // ya viene como "Mesa X" si guardaste así
      personas: reserva.personas
    });
  };

  const handleGuardar = async () => {
    try {
      let url = "http://localhost:8081/restaurante/public/api/reserva";
      let method = "POST";

      if (!editReserva?.nuevo) {
        url = `http://localhost:8081/restaurante/public/api/reservas/${editReserva.id_reserva}`;
        method = "PUT";
      }

      // Enviar mesa tal cual, "Mesa X"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!data.success) {
        Swal.fire("Error", data.message, "error");
        return;
      }

      Swal.fire(
        "Éxito",
        editReserva?.nuevo ? "Reserva creada" : "Reserva actualizada",
        "success"
      );

      setEditReserva(null);
      fetchReservas();
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar la reserva", "error");
    }
  };

  const handleEliminar = async (id_reserva) => {
    const result = await Swal.fire({
      title: "¿Eliminar reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:8081/restaurante/public/api/reservas/${id_reserva}`, { method: "DELETE" });
        Swal.fire("Eliminado", "Reserva eliminada", "success");
        fetchReservas();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  if (loading) return <p>Cargando reservas...</p>;

  return (
    <div>
      <h2 className="text-start mb-4 fw-bold text-primary">📅 Registro de Reservas</h2>

      <button className="btn btn-success mb-3" onClick={handleAgregar}>
        Agregar Reserva
      </button>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="form-control mb-3"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {editReserva && (
        <div className="form-editar mb-3 p-3 border rounded">
          <h4>{editReserva.nuevo ? "Nueva Reserva" : `Editar Reserva ID: ${editReserva.id_reserva}`}</h4>

          <select
            name="id_usuario"
            value={form.id_usuario}
            onChange={handleChange}
            className="form-select mb-2"
          >
            <option value="">Seleccionar Usuario</option>
            {usuarios.map(u => (
              <option key={u.id_usuario} value={u.id_usuario}>{u.nombre}</option>
            ))}
          </select>

          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="form-control mb-2"
          />

          <select
            name="hora"
            value={form.hora}
            onChange={handleChange}
            className="form-select mb-2"
          >
            {["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"].map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          <select
            name="mesa"
            value={form.mesa}
            onChange={handleChange}
            className="form-select mb-2"
          >
            <option value="">Seleccionar Mesa</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(m => (
              <option key={m} value={`Mesa ${m}`}>{`Mesa ${m}`}</option> // 👈 Aquí el cambio clave
            ))}
          </select>

          <input
            type="number"
            name="personas"
            value={form.personas}
            onChange={handleChange}
            placeholder="Personas"
            className="form-control mb-2"
          />

          <button className="btn btn-success me-2" onClick={handleGuardar}>
            Guardar
          </button>
          <button className="btn btn-secondary" onClick={() => setEditReserva(null)}>
            Cancelar
          </button>
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Mesa</th>
            <th>Personas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length > 0 && usuarios.length > 0 &&
            reservas
              .filter(r => {
                const usuario = usuarios.find(u => u.id_usuario === r.id_usuario);
                const nombreUsuario = usuario ? usuario.nombre : "";
                return nombreUsuario.toLowerCase().includes(filtro.toLowerCase());
              })
              .map((r, index) => {
                const usuario = usuarios.find(u => u.id_usuario === r.id_usuario);
                const nombreUsuario = usuario ? usuario.nombre : r.id_usuario;
                return (
                  <tr key={r.id_reserva}>
                    <td>{index + 1}</td> {/* Índice consecutivo */}
                    <td>{nombreUsuario}</td>
                    <td>{r.fecha}</td>
                    <td>{r.hora}</td>
                    <td>{r.mesa}</td>
                    <td>{r.personas}</td>
                    <td>
                      <button className="btn btn-primary me-2" onClick={() => handleEditar(r)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => handleEliminar(r.id_reserva)}>Eliminar</button>
                    </td>
                  </tr>
                );
              })
          }
          {/* {reservas
            .filter(r => {
              const nombreUsuario = usuarios.find(u => u.id_usuario === r.id_usuario)?.nombre || "";
              return nombreUsuario.toLowerCase().includes(filtro.toLowerCase());
            })
            .map(r => (
              <tr key={r.id_reserva}>
                <td>{r.id_reserva}</td>
                <td>{usuarios.find(u => u.id_usuario === r.id_usuario)?.nombre || r.id_usuario}</td>
                <td>{r.fecha}</td>
                <td>{r.hora}</td>
                <td>{r.mesa}</td>
                <td>{r.personas}</td> Muestra Mesas x
                <td>
                  <button className="btn btn-primary me-2" onClick={() => handleEditar(r)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleEliminar(r.id_reserva)}>Eliminar</button>
                </td>
              </tr>
            ))} */}


        </tbody>
      </table>
    </div>
  );
};

export default ReservasDashboard;
