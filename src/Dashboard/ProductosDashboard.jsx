// src/Dashboard/ProductosDashboard.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductosDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // ================= CARGAR PRODUCTOS =================
  const obtenerProductos = async () => {
    try {
      const res = await fetch(
        "http://localhost:8081/restaurante/public/api/productos"
      );
      const data = await res.json();
      setProductos(data.data || []);
    } catch (error) {
      console.error("Error cargando productos:", error);
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // ================= BUSCADOR =================
  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  // ================= ELIMINAR PRODUCTO =================
  const eliminarProducto = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmar.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:8081/restaurante/public/api/productos/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        Swal.fire("Producto eliminado", "Se eliminó correctamente.", "success");
        setProductos(productos.filter((p) => p.id_producto !== id));
      } else {
        Swal.fire("Error", "No se pudo eliminar el producto.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Fallo la conexión con la API.", "error");
      console.error(error);
    }
  };

  // ================= ABRIR MODAL =================
  const abrirModal = (producto = null) => {
    if (producto) {
      setProductoEditar({ ...producto });
    } else {
      setProductoEditar({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: 0,
        categoria: "",
        imagen: "",
      });
    }
    setModalVisible(true);
  };

  // ================= MANEJAR INPUTS =================
  const handleChange = (e) => {
    setProductoEditar({ ...productoEditar, [e.target.name]: e.target.value });
  };

  // ================= MANEJAR IMAGEN =================
  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductoEditar({ ...productoEditar, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ================= GUARDAR PRODUCTO =================
  const guardarProducto = async () => {
    if (!productoEditar.nombre || !productoEditar.precio || !productoEditar.categoria) {
      Swal.fire("Error", "Completa los campos obligatorios", "warning");
      return;
    }

    try {
      let url = "http://localhost:8081/restaurante/public/api/productos";
      let method = "POST";

      if (productoEditar.id_producto) {
        url += `/${productoEditar.id_producto}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoEditar),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Éxito", data.message || "Producto guardado correctamente", "success");
        setModalVisible(false);
        obtenerProductos();
      } else {
        Swal.fire("Error", data.message || "Error al guardar el producto", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Fallo la conexión con la API", "error");
      console.error(error);
    }
  };

  return (
    <>
      <h3>📦 Productos Registrados</h3>
      <p>Lista completa de productos del sistema.</p>

      {/* BUSCADOR */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o categoría..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* BOTÓN AGREGAR */}
      <button className="btn btn-success mb-3" onClick={() => abrirModal()}>
        + Agregar Producto
      </button>

      {/* TABLA DE PRODUCTOS */}
      <table className="table table-hover mt-3">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((p, index) => (
              <tr key={p.id_producto}>
                <td>{index + 1}</td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.categoria}</td>
                <td>
                  {p.imagen && <img src={p.imagen} alt={p.nombre} style={{ width: "50px" }} />}
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => abrirModal(p)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(p.id_producto)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No hay productos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL AGREGAR/EDITAR */}
      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "#00000080" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {productoEditar.id_producto ? "Editar Producto" : "Agregar Producto"}
                </h5>
                <button className="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={productoEditar.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    className="form-control"
                    name="descripcion"
                    value={productoEditar.descripcion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    value={productoEditar.precio}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={productoEditar.stock}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="categoria"
                    value={productoEditar.categoria}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  <input type="file" className="form-control" onChange={handleImagen} />
                  {productoEditar.imagen && (
                    <img
                      src={productoEditar.imagen}
                      alt="Preview"
                      className="mt-2"
                      style={{ width: "80px" }}
                    />
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalVisible(false)}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={guardarProducto}>
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

export default ProductosDashboard;
