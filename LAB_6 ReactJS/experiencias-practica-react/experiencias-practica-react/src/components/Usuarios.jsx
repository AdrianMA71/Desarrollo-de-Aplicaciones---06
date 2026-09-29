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
    return <p className="cargando">Cargando usuarios...</p>
  }

  return (
    <section className="usuarios">
      <h2>Usuarios (API)</h2>
      {usuarios.map((usuario) => (
        <p key={usuario.id}>{usuario.name}</p>
      ))}
    </section>
  )
}

export default Usuarios