// src/store/gastosReducer.js
// Función pura: no muta el arreglo original y no tiene efectos secundarios.
import { AGREGAR_GASTO, ELIMINAR_GASTO } from "./actions.js";

export const estadoInicial = { gastos: [] };

function gastosReducer(estado = estadoInicial, accion) {
  switch (accion.type) {
    case AGREGAR_GASTO:
      return { ...estado, gastos: [...estado.gastos, accion.payload] };
    case ELIMINAR_GASTO:
      // filter() devuelve un arreglo nuevo, el original queda intacto
      return { ...estado, gastos: estado.gastos.filter((g) => g.id !== accion.payload) };
    default:
      return estado;
  }
}

export default gastosReducer;
