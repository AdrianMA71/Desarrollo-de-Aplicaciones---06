import { useEffect, useState } from 'react'

function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setPublicaciones(datos)
        setCargando(false)
      })
  }, [])

  if (cargando) {
    return <p>Cargando publicaciones...</p>
  }

  return (
    <div className="publicaciones">
      <h3>Últimas publicaciones (API)</h3>
      <ul>
        {publicaciones.map((publicacion) => (
          <li key={publicacion.id}>
            <strong>#{publicacion.id}</strong> — {publicacion.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Publicaciones
