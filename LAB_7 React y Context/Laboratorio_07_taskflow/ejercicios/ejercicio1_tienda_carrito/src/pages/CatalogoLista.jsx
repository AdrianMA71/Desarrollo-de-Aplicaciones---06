import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import BuscadorProducto from "../components/BuscadorProducto";
import ListaProductos from "../components/ListaProductos";

function CatalogoLista() {
  const { productos, agregarAlCarrito } = useOutletContext();
  const [busqueda, setBusqueda] = useState("");

  const filtrados = productos.filter((p) =>
    p.title.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <>
      <h2>Catálogo</h2>
      <BuscadorProducto valor={busqueda} onCambio={setBusqueda} />
      <ListaProductos productos={filtrados} onAgregar={agregarAlCarrito} />
    </>
  );
}

export default CatalogoLista;
