// src/pages/Inicio.jsx
import Encabezado from "../components/Encabezado";

function Inicio() {
  return (
    <div className="app">
      <Encabezado usuario="ADRIAN" />
      <p>Bienvenido a TaskFlow. Usa el menú para ir a tu lista de tareas.</p>
    </div>
  );
}

export default Inicio;
