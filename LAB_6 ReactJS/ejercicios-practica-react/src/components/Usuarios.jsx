import { useEffect, useState } from 'react'

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setUsuarios(datos)
        setCargando(false)
      })
  }, [])

  if (cargando) {
    return <p style={{ textAlign: 'center' }}>Cargando usuarios...</p>
  }

  return (
    <div className="usuarios" style={{ textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center', marginTop: 0 }}>Usuarios (API)</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '15px',
        }}
      >
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="usuario"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '14px 16px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              fontSize: '14px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            }}
          >
            <strong style={{ color: 'var(--text-h)' }}>{usuario.name}</strong>
            <span style={{ fontSize: '13px' }}>📧 {usuario.email}</span>
            <span style={{ fontSize: '13px' }}>🏢 {usuario.company.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Usuarios