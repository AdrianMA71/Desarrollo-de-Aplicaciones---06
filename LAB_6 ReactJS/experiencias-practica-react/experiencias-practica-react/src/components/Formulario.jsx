import { useState } from 'react'

function Formulario({ onAgregar }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
  })

  function manejarCambio(event) {
    const { name, value } = event.target
    setFormulario({ ...formulario, [name]: value })
  }

  function manejarEnvio(event) {
    event.preventDefault()

    onAgregar({
      id: Date.now(),
      nombre: formulario.nombre,
      descripcion: formulario.descripcion,
      categoria: formulario.categoria,
    })

    setFormulario({ nombre: '', descripcion: '', categoria: '' })
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />
      </label>

      <label>
        Descripción:
        <input
          type="text"
          name="descripcion"
          value={formulario.descripcion}
          onChange={manejarCambio}
          required
        />
      </label>

      <label>
        Categoría:
        <input
          type="text"
          name="categoria"
          value={formulario.categoria}
          onChange={manejarCambio}
          required
        />
      </label>

      <button type="submit">Registrar</button>
    </form>
  )
}

export default Formulario