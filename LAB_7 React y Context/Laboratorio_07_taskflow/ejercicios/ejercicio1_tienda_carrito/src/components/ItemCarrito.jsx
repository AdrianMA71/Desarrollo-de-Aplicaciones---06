function ItemCarrito({ item, onMas, onMenos, onEliminar }) {
  const { producto, cantidad } = item;
  return (
    <tr>
      <td>{producto.title}</td>
      <td>$ {producto.price.toFixed(2)}</td>
      <td>
        <button className="secundario" onClick={() => onMenos(producto.id)}>−</button>{" "}
        {cantidad}{" "}
        <button className="secundario" onClick={() => onMas(producto)}>+</button>
      </td>
      <td>$ {(producto.price * cantidad).toFixed(2)}</td>
      <td>
        <button className="peligro" onClick={() => onEliminar(producto.id)}>Quitar</button>
      </td>
    </tr>
  );
}

export default ItemCarrito;
