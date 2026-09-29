import { useState } from 'react'

const estadoInicial = { titulo: '', calificacion: '5', comentario: '' }

function FormularioResena({ onRegistrar }) {
  const [formulario, setFormulario] = useState(estadoInicial)

  function manejarCambio(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function manejarEnvio(event) {
    event.preventDefault()
    if (!formulario.titulo.trim() || !formulario.comentario.trim()) return

    onRegistrar({ ...formulario, id: Date.now() })
    setFormulario(estadoInicial)
  }

  return (
    <form className="form-resena" onSubmit={manejarEnvio}>
      <h3>Registrar reseña de película</h3>

      <label>
        Título de la película:
        <input
          type="text"
          name="titulo"
          value={formulario.titulo}
          onChange={manejarCambio}
        />
      </label>

      <label>
        Calificación:
        <select name="calificacion" value={formulario.calificacion} onChange={manejarCambio}>
          {[1, 2, 3, 4, 5].map((valor) => (
            <option key={valor} value={valor}>{valor} estrella{valor > 1 ? 's' : ''}</option>
          ))}
        </select>
      </label>

      <label>
        Comentario:
        <textarea
          name="comentario"
          rows={3}
          value={formulario.comentario}
          onChange={manejarCambio}
        />
      </label>

      <button type="submit">Registrar reseña</button>
    </form>
  )
}

export default FormularioResena
