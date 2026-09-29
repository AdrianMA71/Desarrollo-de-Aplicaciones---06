function JuegoCard({ id, nombre, descripcion, categoria, favorito, mostrarDetalle, onToggleFavorito, onToggleDetalle }) {
  return (
    <article className={`juego-card${favorito ? ' favorito' : ''}`}>
      <h3>{nombre}</h3>
      <span className="categoria">{categoria}</span>

      {mostrarDetalle && <p>{descripcion}</p>}

      <div className="acciones">
        <button
          className={favorito ? 'activo' : ''}
          onClick={() => onToggleFavorito(id)}
        >
          {favorito ? '★ Favorito' : '☆ Marcar favorito'}
        </button>
        <button onClick={() => onToggleDetalle(id)}>
          {mostrarDetalle ? 'Ocultar detalle' : 'Ver detalle'}
        </button>
      </div>
    </article>
  )
}

export default JuegoCard
