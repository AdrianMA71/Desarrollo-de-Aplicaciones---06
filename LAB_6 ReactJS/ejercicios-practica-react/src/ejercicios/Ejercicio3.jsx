import { useState } from 'react'
import TareaCard, { ORDEN_ESTADOS } from './TareaCard'

const tareasIniciales = [
  { id: 1, nombre: 'Diseñar esquema de base de datos', descripcion: 'Definir tablas y relaciones del proyecto Ecocret.', estado: 'completado' },
  { id: 2, nombre: 'Configurar routers EIGRP', descripcion: 'Laboratorio de redes: HQ, Remote1 y Remote2.', estado: 'en-progreso' },
  { id: 3, nombre: 'Maquetar interfaz de facturación', descripcion: 'Pantallas principales del sistema KALOSS FACTU.', estado: 'en-progreso' },
  { id: 4, nombre: 'Redactar informe de laboratorio', descripcion: 'Documentar evidencias y capturas de pantalla.', estado: 'pendiente' },
  { id: 5, nombre: 'Preparar exposición grupal', descripcion: 'Diapositivas y ensayo de la sustentación.', estado: 'pendiente' },
]

function Ejercicio3() {
  const [tareas, setTareas] = useState(tareasIniciales)

  function cambiarEstado(id) {
    setTareas(
      tareas.map((tarea) => {
        if (tarea.id !== id) return tarea
        const siguiente = ORDEN_ESTADOS[(ORDEN_ESTADOS.indexOf(tarea.estado) + 1) % ORDEN_ESTADOS.length]
        return { ...tarea, estado: siguiente }
      })
    )
  }

  function eliminarTarea(id) {
    setTareas(tareas.filter((tarea) => tarea.id !== id))
  }

  return (
    <div className="ejercicio">
      <h2>Ejercicio 3: Panel de estado interactivo</h2>
      <p className="intro">{tareas.length} tareas en el panel</p>

      <div className="lista-tareas">
        {tareas.map((tarea) => (
          <TareaCard
            key={tarea.id}
            id={tarea.id}
            nombre={tarea.nombre}
            descripcion={tarea.descripcion}
            estado={tarea.estado}
            onCambiarEstado={cambiarEstado}
            onEliminar={eliminarTarea}
          />
        ))}
        {tareas.length === 0 && <p>No quedan tareas registradas</p>}
      </div>
    </div>
  )
}

export default Ejercicio3
