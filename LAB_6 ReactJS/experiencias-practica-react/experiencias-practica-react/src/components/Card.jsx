function Card({ nombre, descripcion, categoria, onEliminar }) {
  return (
    <article className="card">
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <span className="categoria">{categoria}</span>
      <div className="acciones">
        <button onClick={onEliminar}>Eliminar</button>
      </div>
    </article>
  )
}

export default Card