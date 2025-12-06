import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PedidosDashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoEditar, setPedidoEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const estados = ["Pendiente", "Recibido", "Cancelado"];

  // =================== CARGAR PEDIDOS ===================
  const obtenerPedidos = async () => {
    try {
      const res = await fetch("http://localhost:8081/restaurante/public/api/pedidos");
      const data = await res.json();
      setPedidos(data || []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los pedidos", "error");
    }
  };

  // =================== CARGAR USUARIOS ===================
  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:8081/restaurante/public/api/usuarios");
      const data = await res.json();
      setUsuarios(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerPedidos();
    obtenerUsuarios();
  }, []);

  // =================== ELIMINAR PEDIDO ===================
  const eliminarPedido = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmar.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:8081/restaurante/public/api/pedidos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        Swal.fire("Pedido eliminado", "Se eliminó correctamente", "success");
        setPedidos(pedidos.filter((p) => p.id_pedido === undefined ? p.id !== id : p.id_pedido !== id));
      } else {
        const errorData = await res.json();
        Swal.fire("Error", errorData.message || "No se pudo eliminar el pedido", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Error de conexión con la API al eliminar el pedido", "error");
    }
  };

  // =================== EDITAR PEDIDO ===================
  const abrirModalEditar = (pedido) => {
    setPedidoEditar({ ...pedido });
    setModalVisible(true);
  };

  const handleChange = (e) => {
    setPedidoEditar({ ...pedidoEditar, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/restaurante/public/api/pedidos/${pedidoEditar.id_pedido}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedidoEditar),
        }
      );

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Éxito", "Pedido actualizado correctamente", "success");
        setModalVisible(false);
        obtenerPedidos();
      } else {
        Swal.fire("Error", data.message || "No se pudo actualizar", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Error de conexión con la API al actualizar el pedido", "error");
    }
  };

  // =================== FILTRAR PEDIDOS ===================
  const pedidosFiltrados = pedidos.filter((p) => {
    const usuario = usuarios.find((u) => u.id_usuario === p.id_usuario);
    const nombre = usuario ? usuario.nombre : "";
    return nombre.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <>
      <h3>🛒 Pedidos Registrados</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre de cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <table className="table table-hover mt-3">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidosFiltrados.length > 0 ? (
            pedidosFiltrados.map((p, i) => {
              const usuario = usuarios.find((u) => u.id_usuario === p.id_usuario);
              return (
                <tr key={p.id_pedido || p.id}>
                  <td>{i + 1}</td>
                  <td>{usuario ? usuario.nombre : "Desconocido"}</td>
                  <td>{p.fecha_pedido}</td>
                  <td>{p.estado}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => abrirModalEditar(p)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminarPedido(p.id_pedido || p.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No hay pedidos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal edición */}
      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Pedido</h5>
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Estado</label>
                  <select
                    className="form-select"
                    name="estado"
                    value={pedidoEditar.estado}
                    onChange={handleChange}
                  >
                    {estados.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalVisible(false)}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={guardarCambios}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PedidosDashboard;
