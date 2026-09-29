import { useState } from 'react'

function Formulario({ onAgregar }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
  })

  function manejarCambio(event) {
    const { name, value } = event.target
    setFormulario({
      ...formulario,
      [name]: value,
    })
  }

  function manejarEnvio(event) {
    event.preventDefault()
    if (!formulario.nombre || !formulario.descripcion) return

    onAgregar({
      id: Date.now(),
      nombre: formulario.nombre,
      descripcion: formulario.descripcion,
      categoria: 'Nuevo',
    })

    setFormulario({ nombre: '', descripcion: '' })
  }

  return (
    <form
      className="formulario"
      onSubmit={manejarEnvio}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <h2 style={{ textAlign: 'center', margin: 0 }}>Agregar tecnología</h2>

      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          textAlign: 'left',
          fontSize: '14px',
        }}
      >
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          style={{
            padding: '10px 14px',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '14px',
            background: 'var(--bg)',
            color: 'var(--text-h)',
          }}
        />
      </label>

      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          textAlign: 'left',
          fontSize: '14px',
        }}
      >
        Descripción:
        <input
          type="text"
          name="descripcion"
          value={formulario.descripcion}
          onChange={manejarCambio}
          style={{
            padding: '10px 14px',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '14px',
            background: 'var(--bg)',
            color: 'var(--text-h)',
          }}
        />
      </label>

      <button
        type="submit"
        style={{
          padding: '12px',
          background: 'var(--accent)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '15px',
        }}
      >
        Registrar
      </button>
    </form>
  )
}

export default Formulario