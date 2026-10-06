function ProductoCard({ producto, onAgregar }) {
  return (
    <article className="card">
      <img src={producto.thumbnail} alt={producto.title} />
      <h3>{producto.title}</h3>
      <span className="precio">$ {producto.price.toFixed(2)}</span>
      <button onClick={() => onAgregar(producto)}>Agregar al carrito</button>
    </article>
  );
}

export default ProductoCard;
