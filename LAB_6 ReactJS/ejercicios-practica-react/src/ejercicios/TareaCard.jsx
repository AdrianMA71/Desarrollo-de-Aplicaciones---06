const ETIQUETAS = {
  pendiente: 'Pendiente',
  'en-progreso': 'En progreso',
  completado: 'Completado',
}

function TareaCard({ id, nombre, descripcion, estado, onCambiarEstado, onEliminar }) {
  return (
    <article className="tarea-card">
      <div className="info">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <span className={`estado estado-${estado}`}>{ETIQUETAS[estado]}</span>
      </div>

      <div className="acciones">
        {/*useState */}
        <button onClick={() => onCambiarEstado(id)}>Cambiar estado</button>
        {/*eliminar la tarea */}
        <button onClick={() => onEliminar(id)}>Eliminar</button>
      </div>
    </article>
  )
}

export default TareaCard
export const ORDEN_ESTADOS = ['pendiente', 'en-progreso', 'completado']
