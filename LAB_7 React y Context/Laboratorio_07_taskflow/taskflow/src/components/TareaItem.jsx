// src/components/TareaItem.jsx
// Componente de presentación puro: recibe props y no maneja estado propio.
function TareaItem({ tarea, onAlternar }) {
  return (
    <li className={tarea.completada ? "tarea completada" : "tarea"}>
      <span>{tarea.titulo}</span>
      <button onClick={() => onAlternar(tarea.id)}>
        {tarea.completada ? "Deshacer" : "Completar"}
      </button>
    </li>
  );
}

export default TareaItem;
