// src/store/actions.js
// Tipos de acción (constantes) y "action creators".
export const CARGAR_TAREAS = "CARGAR_TAREAS";
export const AGREGAR_TAREA = "AGREGAR_TAREA";
export const COMPLETAR_TAREA = "COMPLETAR_TAREA";
export const ALTERNAR_TAREA = "ALTERNAR_TAREA";

export const cargarTareas = (tareas) => ({ type: CARGAR_TAREAS, payload: tareas });

export const agregarTarea = (titulo) => ({
  type: AGREGAR_TAREA,
  // El id se genera aquí (en el action creator) y NO dentro del reducer,
  // porque el reducer debe ser una función pura.
  payload: { id: Date.now(), titulo, completada: false },
});

export const completarTarea = (id) => ({ type: COMPLETAR_TAREA, payload: id });
export const alternarTarea = (id) => ({ type: ALTERNAR_TAREA, payload: id });
