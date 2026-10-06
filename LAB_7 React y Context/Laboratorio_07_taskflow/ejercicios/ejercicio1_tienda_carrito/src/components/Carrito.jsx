import { Link } from "react-router-dom";
import ItemCarrito from "./ItemCarrito";

function Carrito({ items, onMas, onMenos, onEliminar, onVaciar }) {
  const total = items.reduce((suma, i) => suma + i.producto.price * i.cantidad, 0);

  return (
    <>
      <h2>Carrito de compras</h2>
      {items.length === 0 ? (
        <p>
          El carrito está vacío. <Link to="/catalogo">Ir al catálogo</Link>
        </p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <ItemCarrito
                  key={i.producto.id}
                  item={i}
                  onMas={onMas}
                  onMenos={onMenos}
                  onEliminar={onEliminar}
                />
              ))}
            </tbody>
          </table>
          <p className="total">Total: $ {total.toFixed(2)}</p>
          <button className="peligro" onClick={onVaciar}>Vaciar carrito</button>
        </>
      )}
    </>
  );
}

export default Carrito;
