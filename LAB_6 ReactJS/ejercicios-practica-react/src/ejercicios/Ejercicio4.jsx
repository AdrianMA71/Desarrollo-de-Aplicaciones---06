import { useEffect, useState } from 'react'
import UsuarioCard from './UsuarioCard'

function Ejercicio4() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setUsuarios(datos)
        setCargando(false)
      })
  }, [])

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (cargando) {
    return (
      <div className="ejercicio">
        <h2>Ejercicio 4: Directorio de usuarios</h2>
        <p>Cargando directorio de usuarios...</p>
      </div>
    )
  }

  return (
    <div className="ejercicio">
      <h2>Ejercicio 4: Directorio de usuarios desde una API</h2>

      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar usuario por nombre..."
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
        />
      </div>

      {/* 11. Mensaje cuando no existen coincidencias. */}
      {usuariosFiltrados.length === 0 ? (
        <p className="sin-resultados">No se encontraron usuarios con ese nombre.</p>
      ) : (
        <div className="grid-usuarios">
          {usuariosFiltrados.map((usuario) => (
            <UsuarioCard
              key={usuario.id}
              nombre={usuario.name}
              correo={usuario.email}
              ciudad={usuario.address.city}
              empresa={usuario.company.name}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Ejercicio4

