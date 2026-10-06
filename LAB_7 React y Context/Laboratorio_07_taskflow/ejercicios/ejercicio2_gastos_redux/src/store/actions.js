// src/store/actions.js
export const AGREGAR_GASTO = "AGREGAR_GASTO";
export const ELIMINAR_GASTO = "ELIMINAR_GASTO";

// El id se genera en el action creator (no en el reducer) para mantenerlo puro.
export const agregarGasto = ({ descripcion, monto, categoria }) => ({
  type: AGREGAR_GASTO,
  payload: { id: Date.now() + Math.random(), descripcion, monto: Number(monto), categoria },
});

export const eliminarGasto = (id) => ({ type: ELIMINAR_GASTO, payload: id });
