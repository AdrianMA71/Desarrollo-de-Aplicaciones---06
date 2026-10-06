// Exp. 2: recorre el arreglo con map() y usa una key estable (t.id)
import TareaItem from "./TareaItem";

function TareaLista({ tareas, onAlternar, detalleBase }) {
  if (tareas.length === 0) return <p>No hay tareas registradas.</p>;

  return (
    <ul className="lista">
      {tareas.map((t) => (
        <TareaItem
          key={t.id}
          tarea={t}
          onAlternar={onAlternar}
          detalleBase={detalleBase}
        />
      ))}
    </ul>
  );
}

export default TareaLista;
