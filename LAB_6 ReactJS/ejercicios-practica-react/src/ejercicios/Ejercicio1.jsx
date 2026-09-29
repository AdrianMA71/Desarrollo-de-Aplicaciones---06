import { useState } from 'react'

function JuegoCard({ id, nombre, descripcion, categoria, favorito, onFavorito }) {
  const [verDetalle, setVerDetalle] = useState(false)

  return (
    <article
      className={`juego-card ${favorito ? 'favorito' : ''}`}
      style={{
        background: favorito ? 'rgba(170, 59, 255, 0.12)' : 'var(--bg)',
        border: favorito ? '1px solid var(--accent)' : '1px solid var(--border)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        textAlign: 'left',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-h)' }}>{nombre}</h3>

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

      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)', flexGrow: 1 }}>
        {descripcion}
      </p>

      {verDetalle && (
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--accent)', fontStyle: 'italic' }}>
          Disponible en todas las plataformas
        </p>
      )}

      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <button
          onClick={() => onFavorito(id)}
          style={{
            flex: 1,
            minWidth: '110px',
            padding: '9px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
            background: favorito ? 'var(--accent)' : 'transparent',
            color: favorito ? 'white' : 'var(--accent)',
            border: '1px solid var(--accent)',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          {favorito ? ' Favorito' : ' Favorito'}
        </button>

        <button
          onClick={() => setVerDetalle(!verDetalle)}
          style={{
            flex: 1,
            minWidth: '110px',
            padding: '9px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
            background: 'transparent',
            color: 'var(--text-h)',
            border: '1px solid var(--border)',
          }}
        >
          {verDetalle ? 'Ocultar' : 'Ver detalle'}
        </button>
      </div>
    </article>
  )
}

function Ejercicio1() {
  const [juegos] = useState([
    { id: 1, nombre: 'The Legend of Zelda: Tears of the Kingdom', descripcion: 'Aventura de mundo abierto en Hyrule', categoria: 'Aventura' },
    { id: 2, nombre: 'Stardew Valley', descripcion: 'Simulación de granja y vida rural', categoria: 'Simulación' },
    { id: 3, nombre: 'Hades', descripcion: 'Roguelike de acción con mitología griega', categoria: 'Acción' },
    { id: 4, nombre: 'Civilization VI', descripcion: 'Estrategia por turnos para construir imperios', categoria: 'Estrategia' },
    { id: 5, nombre: 'It Takes Two', descripcion: 'Aventura cooperativa para dos jugadores', categoria: 'Cooperativo' },
    { id: 6, nombre: 'Celeste', descripcion: 'Plataformas con precisión y desafío', categoria: 'Plataformas' },
  ])

  const [favoritos, setFavoritos] = useState([])

  function alternarFavorito(id) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id))
    } else {
      setFavoritos([...favoritos, id])
    }
  }

  return (
    <section className="seccion-ejercicio" style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>
        Ejercicio 1: Catálogo interactivo de videojuegos
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '14px' }}>
        {juegos.length} juegos registrados · {favoritos.length} marcados como favoritos
      </p>

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        {juegos.map((juego) => (
          <JuegoCard
            key={juego.id}
            id={juego.id}
            nombre={juego.nombre}
            descripcion={juego.descripcion}
            categoria={juego.categoria}
            favorito={favoritos.includes(juego.id)}
            onFavorito={alternarFavorito}
          />
        ))}
      </main>
    </section>
  )
}

export default Ejercicio1