// src/pages/TareaDetalle.jsx  (ruta :id de /tareas)
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function TareaDetalle() {
  const { id } = useParams();
  const tarea = useSelector((estado) =>
    estado.tareas.find((t) => String(t.id) === id)
  );

  return (
    <div>
      <p>Detalle de la tarea con id: {id}</p>
      {tarea ? (
        <ul>
          <li>Título: {tarea.titulo}</li>
          <li>Estado: {tarea.completada ? "Completada" : "Pendiente"}</li>
        </ul>
      ) : (
        <p className="error">No existe una tarea con ese id.</p>
      )}
      <Link to="/tareas">← Volver a la lista</Link>
    </div>
  );
}

export default TareaDetalle;
