/* import React, { useState } from "react"; */
import React, { useState } from "react";

export const Carta = () => {
  const [carrito, setCarrito] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [errores, setErrores] = useState({}); // Guardamos errores por producto
  

  const productos = {
    cenas: [
      { id: 1, nombre: "Arroz con Marisco", descripcion: "Sabroso, marino, criollo", precio: 17, imagen: "img/arrozMarisco.png" },
      { id: 2, nombre: "Arroz con Pato", descripcion: "Tradicional, norteño, jugoso", precio: 18, imagen: "img/arrozPato.png" },
      { id: 3, nombre: "Ceviche", descripcion: "Sabor marino intenso", precio: 15, imagen: "img/ceviche.png" },
      { id: 4, nombre: "Causa Ferreñafana", descripcion: "Colorida, rellena, deliciosa", precio: 12, imagen: "img/causaFerre.png" },
      { id: 5, nombre: "Papa Huacaina", descripcion: "Cremosa, amarilla, picante", precio: 10, imagen: "img/papaHuancaina.png" },
    ],
    postres: [
      { id: 6, nombre: "Chifon", descripcion: "Dulce, ligero", precio: 15, imagen: "img/chifon.png" },
      { id: 7, nombre: "Torta Chocolate", descripcion: "Intensa, suave, golosa", precio: 18, imagen: "img/tortaChoco.png" },
      { id: 8, nombre: "Turron", descripcion: "Miel, anís, crujiente", precio: 12, imagen: "img/turron.png" },
      { id: 9, nombre: "Torta Tres Leches", descripcion: "Húmeda, dulce, cremosa", precio: 14, imagen: "img/tortaTresLeches.png" },
      { id: 10, nombre: "Postre de Fresa", descripcion: "Frutal, rosado, suave", precio: 13, imagen: "img/postres.jpg" },
    ],
    bebidas: [
      { id: 11, nombre: "Jugo de Piña", descripcion: "Natural, refrescante, tropical", precio: 8, imagen: "img/piña.png" },
      { id: 12, nombre: "Pisco Sour", descripcion: "Cítrico, espumoso, peruano", precio: 6, imagen: "img/piscoSour.png" },
      { id: 13, nombre: "Malteada de Fresa", descripcion: "Fría, cremosa, dulce", precio: 10, imagen: "img/malteadaFresa.png" },
      { id: 14, nombre: "Frappe", descripcion: "Helado, batido, energético", precio: 9, imagen: "img/frappe.png" },
      { id: 15, nombre: "Capuchino", descripcion: "Café, leche, espuma", precio: 5, imagen: "img/cafe.png" },
    ],
  };

  const agregarAlCarrito = (producto) => {
    const cantidad = parseInt(cantidades[producto.id]);

    if (!cantidad || cantidad <= 0) {
      setErrores({ ...errores, [producto.id]: "Por favor, seleccionar cantidad" });
      return;
    }

    // Limpiamos el error si la cantidad es válida
    setErrores({ ...errores, [producto.id]: "" });

    const existente = carrito.find((item) => item.id === producto.id);
    if (existente) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }

    setCantidades({ ...cantidades, [producto.id]: 0 });
  };

  const eliminarDelCarrito = (id) => setCarrito(carrito.filter((item) => item.id !== id));
  const vaciarCarrito = () => setCarrito([]);
  const obtenerCantidadEnCarrito = (id) => {
    const item = carrito.find((i) => i.id === id);
    return item ? item.cantidad : 0;
  };
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold text-primary"> 📖 Nuestra Carta</h2>

      {Object.keys(productos).map((categoria) => (
        <div key={categoria} className="mb-5">
          <h3 className="mb-3 text-capitalize">{categoria}</h3>
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {productos[categoria].map((producto) => (
              <div key={producto.id} className="col">
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
                    <p className="fw-bold">S/ {producto.precio}</p>

                    <input
                      type="number"
                      min="0"
                      className="form-control mb-2"
                      placeholder="Cantidad"
                      value={cantidades[producto.id] ?? 0}
                      onChange={(e) =>
                        setCantidades({ ...cantidades, [producto.id]: e.target.value })
                      }
                    />

                    {errores[producto.id] && (
                      <p className="text-danger mb-2">{errores[producto.id]}</p>
                    )}

                    {obtenerCantidadEnCarrito(producto.id) > 0 && (
                      <p className="text-success">
                        Cantidad en carrito: {obtenerCantidadEnCarrito(producto.id)}
                      </p>
                    )}

                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Carrito */}
      <div className="mt-5">
        <h3>🛒 Carrito</h3>
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {carrito.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {item.nombre} (x{item.cantidad})
                    <br />
                    <small>S/ {item.precio} c/u</small>
                  </div>
                  <div>
                    <span className="me-3 fw-bold">S/ {item.precio * item.cantidad}</span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <h4>Total: S/ {total}</h4>

            <div className="d-flex gap-3 mt-3">
              <button className="btn btn-secondary flex-fill" onClick={vaciarCarrito}>
                Eliminar Todos
              </button>
              <a href="/delivery" className="btn btn-success flex-fill">
                🛵 Delivery
              </a>
              <a href="/reservas" className="btn btn-warning flex-fill">
                🍽️ Reservar Mesa
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
