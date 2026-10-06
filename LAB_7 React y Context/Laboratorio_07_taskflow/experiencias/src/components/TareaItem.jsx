// Componente de presentación puro (Exp. 2). Desde la Exp. 6 puede enlazar al detalle.
import { Link } from "react-router-dom";

function TareaItem({ tarea, onAlternar, detalleBase }) {
  return (
    <li className={tarea.completada ? "tarea completada" : "tarea"}>
      <span>
        {detalleBase ? (
          <Link to={`${detalleBase}/${tarea.id}`}>{tarea.titulo}</Link>
        ) : (
          tarea.titulo
        )}
      </span>
      <button onClick={() => onAlternar(tarea.id)}>
        {tarea.completada ? "Deshacer" : "Completar"}
      </button>
    </li>
  );
}

export default TareaItem;
