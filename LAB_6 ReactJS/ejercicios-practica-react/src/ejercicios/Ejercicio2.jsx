import { useState } from 'react'
import FormularioResena from './FormularioResena'
import Publicaciones from './Publicaciones'

function Ejercicio2() {
  const [resenas, setResenas] = useState([])

  function registrarResena(nuevaResena) {
    setResenas([nuevaResena, ...resenas])
  }

  return (
    <div className="ejercicio">
      <h2>Ejercicio 2: Registro y consulta de información</h2>

      <FormularioResena onRegistrar={registrarResena} />

      {resenas.length > 0 && (
        <ul className="lista-resenas">
          {resenas.map((resena) => (
            <li key={resena.id}>
              <strong>{resena.titulo}</strong> — {resena.calificacion}
              <br />
              {resena.comentario}
            </li>
          ))}
        </ul>
      )}

      <Publicaciones />
    </div>
  )
}

export default Ejercicio2
