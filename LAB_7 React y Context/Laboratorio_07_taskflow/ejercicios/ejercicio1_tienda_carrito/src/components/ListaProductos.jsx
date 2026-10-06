import ProductoCard from "./ProductoCard";

function ListaProductos({ productos, onAgregar }) {
  if (productos.length === 0) return <p>No se encontraron productos.</p>;

  return (
    <div className="grid">
      {productos.map((p) => (
        <ProductoCard key={p.id} producto={p} onAgregar={onAgregar} />
      ))}
    </div>
  );
}

export default ListaProductos;
