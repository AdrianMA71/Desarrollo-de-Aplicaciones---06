function Card({ id, nombre, descripcion, categoria, onEliminar }) {
  return (
    <article
      className="card"
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        textAlign: 'left',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '20px', color: 'var(--text-h)' }}>{nombre}</h2>

      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)', flexGrow: 1 }}>
        {descripcion}
      </p>

      <span
        style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          background: 'var(--accent-bg)',
          color: 'var(--accent)',
          padding: '4px 12px',
          borderRadius: '14px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {categoria}
      </span>

      <button
        onClick={() => onEliminar(id)}
        style={{
          marginTop: '8px',
          padding: '9px',
          background: 'transparent',
          color: '#e74c3c',
          border: '1px solid #e74c3c',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#e74c3c'
          e.target.style.color = 'white'
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent'
          e.target.style.color = '#e74c3c'
        }}
      >
        Eliminar
      </button>
    </article>
  )
}

export default Card