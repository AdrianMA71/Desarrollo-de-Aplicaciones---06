// src/store/tareasReducer.js
// Reducer: función pura (estadoActual, accion) => nuevoEstado.
//  - No muta el estado recibido: retorna siempre objetos/arreglos nuevos.
//  - Mismos argumentos => mismo resultado; sin fetch, random ni Date.now().
import {
  CARGAR_TAREAS,
  AGREGAR_TAREA,
  COMPLETAR_TAREA,
  ALTERNAR_TAREA,
} from "./actions.js";

export const estadoInicial = { tareas: [] };

function tareasReducer(estado = estadoInicial, accion) {
  switch (accion.type) {
    case CARGAR_TAREAS:
      return { ...estado, tareas: accion.payload };
    case AGREGAR_TAREA:
      return { ...estado, tareas: [...estado.tareas, accion.payload] };
    case COMPLETAR_TAREA:
      return {
        ...estado,
        tareas: estado.tareas.map((t) =>
          t.id === accion.payload ? { ...t, completada: true } : t
        ),
      };
    case ALTERNAR_TAREA:
      return {
        ...estado,
        tareas: estado.tareas.map((t) =>
          t.id === accion.payload ? { ...t, completada: !t.completada } : t
        ),
      };
    default:
      return estado;
  }
}

export default tareasReducer;
