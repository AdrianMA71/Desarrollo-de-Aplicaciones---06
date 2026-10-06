// src/pages/Tienda.jsx
// Componente contenedor: aquí viven el catálogo (fetch), el carrito (useState)
// y el estado de carga/error. Se comparte con las rutas hijas vía Outlet.
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Tienda() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]); // [{ producto, cantidad }]

  useEffect(() => {

    fetch("https://dummyjson.com/products")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudo cargar el catálogo");
        return respuesta.json();
      })
      .then((datos) => setProductos(datos.products))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const agregarAlCarrito = (producto) => {
    const existente = carrito.find((i) => i.producto.id === producto.id);
    if (existente) {
      setCarrito(
        carrito.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        )
      );
    } else {
      setCarrito([...carrito, { producto, cantidad: 1 }]);
    }
  };

  const quitarDelCarrito = (id) => {
    setCarrito(
      carrito
        .map((i) => (i.producto.id === id ? { ...i, cantidad: i.cantidad - 1 } : i))
        .filter((i) => i.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) =>
    setCarrito(carrito.filter((i) => i.producto.id !== id));

  const vaciarCarrito = () => setCarrito([]);

  const totalUnidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);

  return (
    <>
      <nav className="nav">
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/catalogo/carrito">Carrito ({totalUnidades})</Link>
      </nav>
      <div className="contenedor" style={{ maxWidth: 960 }}>
        {cargando && <p>Cargando catálogo...</p>}
        {error && <p className="error">Ocurrió un error: {error}</p>}
        {!cargando && !error && (
          <Outlet
            context={{
              productos,
              carrito,
              agregarAlCarrito,
              quitarDelCarrito,
              eliminarDelCarrito,
              vaciarCarrito,
            }}
          />
        )}
      </div>
    </>
  );
}

export default Tienda;
