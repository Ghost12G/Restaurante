import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ClientesDashboard = () => {
  const [clientes, setClientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    correo: "",
    rol: "usuario",
  });
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [clientesPorPagina] = useState(5);

  // =================== CARGAR CLIENTES ===================
  const obtenerClientes = async () => {
    try {
      const res = await fetch(
        "http://localhost:8081/restaurante/public/api/usuarios"
      );
      const data = await res.json();

      const lista = data.usuario || data.usuarios || data || [];
      const soloClientes = lista.filter((u) => u.rol === "usuario");

      setClientes(soloClientes);
    } catch (error) {
      console.error("Error cargando clientes:", error);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  // =================== ELIMINAR ===================
  const eliminarUsuario = async (id, rol) => {
    if (rol === "admin") {
      Swal.fire("Error", "No se puede eliminar un administrador", "error");
      return;
    }

    const confirmar = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmar.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:8081/restaurante/public/api/usuarios/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        Swal.fire({
          title: "Usuario eliminado",
          text: "Se eliminó correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setClientes(clientes.filter((c) => c.id_usuario !== id));
      } else {
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Fallo la conexión con la API.", "error");
    }
  };

  // =================== EDITAR ===================
  const abrirModalEditar = (cliente) => {
    if (cliente.rol === "admin") {
      Swal.fire("Error", "No se puede editar un administrador", "error");
      return;
    }

    setFormEdit(cliente);
    setEditando(cliente.id_usuario);
  };

  const guardarCambios = async () => {
    if (!formEdit.nombre || !formEdit.dni || !formEdit.telefono) {
      Swal.fire("Error", "Completa los campos obligatorios", "warning");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8081/restaurante/public/api/usuarios/${editando}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formEdit),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Actualizado", "Usuario editado correctamente", "success");
        setEditando(null);
        obtenerClientes();
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo conectar con la API", "error");
    }
  };

  // =================== FILTRAR ===================
  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.dni.includes(busqueda)
  );

  // =================== PAGINACIÓN ===================
  const indexUltimoCliente = paginaActual * clientesPorPagina;
  const indexPrimerCliente = indexUltimoCliente - clientesPorPagina;
  const clientesPaginados = clientesFiltrados.slice(
    indexPrimerCliente,
    indexUltimoCliente
  );
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

  return (
    <>
      <h3>👥 Clientes Registrados</h3>
      <p>Lista completa de usuarios sin incluir administradores.</p>

      {/* BUSCADOR */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o DNI..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* TABLA */}
      <table className="table table-hover mt-3">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientesPaginados.length > 0 ? (
            clientesPaginados.map((c, index) => (
              <tr key={c.id_usuario}>
                <td>{index + 1 + indexPrimerCliente}</td>
                <td>{c.nombre}</td>
                <td>{c.dni}</td>
                <td>{c.telefono}</td>
                <td>{c.rol}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => abrirModalEditar(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarUsuario(c.id_usuario, c.rol)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No hay clientes registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${
                  paginaActual === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setPaginaActual(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* MODAL EDITAR */}
      {editando && (
        <div
          className="modal fade show d-block"
          style={{ background: "#00000090" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">Editar Usuario</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditando(null)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-2">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formEdit.nombre}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, nombre: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label>DNI</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formEdit.dni}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, dni: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formEdit.telefono}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, telefono: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label>Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formEdit.correo}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, correo: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <label>Rol</label>
                  <select
                    className="form-select"
                    value={formEdit.rol}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, rol: e.target.value })
                    }
                  >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditando(null)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={guardarCambios}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientesDashboard;
