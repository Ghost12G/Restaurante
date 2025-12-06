/* Productos.jsx */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Productos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(true);

  // ================== CARGAR PEDIDOS DEL LOCALSTORAGE ==================
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(stored);

    const inicial = {};
    stored.forEach(p => { inicial[p.id_producto] = 0; });
    setCantidades(inicial);
  }, []);

  // ================== GUARDAR PEDIDOS ==================
  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  // ================== CARGAR PRODUCTOS DESDE API ==================
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:8081/restaurante/public/api/productos");
        const data = await res.json();

        // BACKEND NUEVO → devuelve un ARRAY directo
        if (Array.isArray(data)) {
          setProductos(data);

          const inicial = {};
          data.forEach(p => (inicial[p.id_producto] = 0));
          setCantidades(prev => ({ ...inicial, ...prev }));
        } else {
          console.error("Error API productos:", data);
        }

      } catch (e) {
        console.error("Error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // ================== AGREGAR A PEDIDO ==================
  const agregarAlPedido = (producto) => {
    const cantidad = Number(cantidades[producto.id_producto]);

    if (cantidad <= 0 || Number.isNaN(cantidad)) {
      setErrores(prev => ({
        ...prev,
        [producto.id_producto]: "Selecciona una cantidad válida"
      }));
      return;
    }

    setErrores(prev => {
      const copia = { ...prev };
      delete copia[producto.id_producto];
      return copia;
    });

    const existe = pedidos.find(p => p.id_producto === producto.id_producto);

    if (existe) {
      setPedidos(prev =>
        prev.map(p =>
          p.id_producto === producto.id_producto
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        )
      );
    } else {
      setPedidos(prev => [
        ...prev,
        {
          id_producto: producto.id_producto,
          nombre: producto.nombre,
          precio: Number(producto.precio),
          imagen: producto.imagen,
          cantidad: cantidad,
        }
      ]);
    }

    setCantidades(prev => ({ ...prev, [producto.id_producto]: 0 }));
  };

  // ================== ELIMINAR DEL PEDIDO ==================
  const eliminarDelPedido = (id_producto) => {
    setPedidos(prev => prev.filter(p => p.id_producto !== id_producto));
  };

  // ================== VACIAR PEDIDO ==================
  const vaciarPedidos = () => {
    setPedidos([]);
    localStorage.removeItem("pedidos");
  };

  // ================== CALCULAR TOTAL ==================
  const total = pedidos.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const categorias = [...new Set(productos.map(p => p.categoria).filter(Boolean))];

  const irADelivery = () => {
    navigate("/delivery", { state: { productos: pedidos } });
  };

  const irAReserva = () => {
    navigate("/reservas", { state: { productos: pedidos } });
  };

  // ================== LOADING ==================
  if (loading) return <p className="text-center my-5">Cargando productos...</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary">📖 Nuestra Carta</h2>

      {categorias.map(cat => (
        <div key={cat} className="mb-5">
          <h3 className="text-capitalize">{cat}</h3>
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {productos
              .filter(p => p.categoria === cat)
              .map(producto => (
                <div key={producto.id_producto} className="col">
                  <div className="card h-100 shadow-sm">

                    <img
                      src={producto.imagen}
                      className="card-img-top"
                      alt={producto.nombre}
                      style={{ height: "150px", objectFit: "cover" }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text">{producto.descripcion}</p>
                      <p className="fw-bold">
                        S/ {Number(producto.precio).toFixed(2)}
                      </p>

                      <input
                        type="number"
                        min="0"
                        value={cantidades[producto.id_producto] || 0}
                        className="form-control mb-2"
                        placeholder="Cantidad"
                        onChange={e =>
                          setCantidades(prev => ({
                            ...prev,
                            [producto.id_producto]: Number(e.target.value),
                          }))
                        }
                        onFocus={() =>
                          setErrores(prev => {
                            const copia = { ...prev };
                            delete copia[producto.id_producto];
                            return copia;
                          })
                        }
                      />

                      {errores[producto.id_producto] && (
                        <p className="text-danger small mb-2">
                          {errores[producto.id_producto]}
                        </p>
                      )}

                      {pedidos.find(i => i.id_producto === producto.id_producto) && (
                        <p className="text-success small">
                          Cantidad en pedido:{" "}
                          {pedidos.find(i => i.id_producto === producto.id_producto)
                            .cantidad}
                        </p>
                      )}

                      <button
                        className="btn btn-primary mt-auto"
                        onClick={() => agregarAlPedido(producto)}
                        type="button"
                      >
                        Agregar al pedido
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="mt-5">
        <h3>🛒 Pedidos</h3>

        {pedidos.length === 0 ? (
          <p>No hay productos en tu pedido.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {pedidos.map(item => (
                <li
                  key={item.id_producto}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.nombre}</strong> (x{item.cantidad})<br />
                    <small>S/ {item.precio.toFixed(2)} c/u</small>
                  </div>

                  <div className="d-flex align-items-center">
                    <strong className="me-3">
                      S/ {(item.precio * item.cantidad).toFixed(2)}
                    </strong>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarDelPedido(item.id_producto)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <h4>Total: S/ {total.toFixed(2)}</h4>

            <div className="d-flex gap-3 mt-3">
              <button
                className="btn btn-secondary flex-fill"
                onClick={vaciarPedidos}
                type="button"
              >
                Vaciar pedidos
              </button>

              <button
                className="btn btn-success flex-fill"
                onClick={irADelivery}
                type="button"
              >
                🛵 Delivery
              </button>

              <button
                className="btn btn-warning flex-fill"
                onClick={irAReserva}
                type="button"
              >
                🍽 Reservar mesa
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
