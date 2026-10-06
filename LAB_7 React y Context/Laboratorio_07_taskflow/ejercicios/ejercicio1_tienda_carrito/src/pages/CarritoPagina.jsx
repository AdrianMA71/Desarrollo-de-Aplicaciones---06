import { useOutletContext } from "react-router-dom";
import Carrito from "../components/Carrito";

function CarritoPagina() {
  const { carrito, agregarAlCarrito, quitarDelCarrito, eliminarDelCarrito, vaciarCarrito } =
    useOutletContext();

  return (
    <Carrito
      items={carrito}
      onMas={agregarAlCarrito}
      onMenos={quitarDelCarrito}
      onEliminar={eliminarDelCarrito}
      onVaciar={vaciarCarrito}
    />
  );
}

export default CarritoPagina;
