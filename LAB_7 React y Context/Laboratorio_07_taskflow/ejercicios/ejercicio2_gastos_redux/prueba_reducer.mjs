// Prueba manual del reducer FUERA de React (solo Node).
// Uso:  node prueba_reducer.mjs
import assert from "node:assert/strict";
import gastosReducer, { estadoInicial } from "./src/store/gastosReducer.js";
import { agregarGasto, eliminarGasto } from "./src/store/actions.js";
import store from "./src/store/store.js";

const congelar = (e) => {
  Object.freeze(e);
  Object.freeze(e.gastos);
  e.gastos.forEach(Object.freeze);
  return e;
};
const total = (e) => e.gastos.reduce((s, g) => s + g.monto, 0);

console.log("=== 1. Secuencia de acciones sobre el reducer ===");
let estado = congelar(gastosReducer(undefined, { type: "@@INIT" }));
console.log("Estado inicial :", JSON.stringify(estado));
assert.deepEqual(estado, estadoInicial);

const a1 = agregarGasto({ descripcion: "Almuerzo", monto: 12.5, categoria: "Alimentación" });
const a2 = agregarGasto({ descripcion: "Pasaje", monto: 3, categoria: "Transporte" });
const a3 = agregarGasto({ descripcion: "Libro", monto: 45.9, categoria: "Educación" });

const previo = estado;
estado = congelar(gastosReducer(estado, a1));
console.log("AGREGAR_GASTO 1 -> total:", total(estado).toFixed(2), "| gastos:", estado.gastos.length);
assert.equal(previo.gastos.length, 0, "el estado anterior no se mutó");

estado = congelar(gastosReducer(estado, a2));
console.log("AGREGAR_GASTO 2 -> total:", total(estado).toFixed(2), "| gastos:", estado.gastos.length);
estado = congelar(gastosReducer(estado, a3));
console.log("AGREGAR_GASTO 3 -> total:", total(estado).toFixed(2), "| gastos:", estado.gastos.length);
assert.equal(total(estado).toFixed(2), "61.40");

const antesEliminar = estado;
estado = congelar(gastosReducer(estado, eliminarGasto(a2.payload.id)));
console.log("ELIMINAR_GASTO  -> total:", total(estado).toFixed(2), "| gastos:", estado.gastos.length);
assert.equal(estado.gastos.length, 2);
assert.equal(antesEliminar.gastos.length, 3, "el arreglo original quedó intacto");
assert.equal(total(estado).toFixed(2), "58.40");

const igual = gastosReducer(estado, { type: "DESCONOCIDA" });
assert.equal(igual, estado);
console.log("Acción desconocida -> retorna el mismo estado:", igual === estado);

console.log("\n=== 2. Pureza ===");
assert.deepEqual(gastosReducer(estado, a1), gastosReducer(estado, a1));
console.log("OK: mismos argumentos => mismo resultado");

console.log("\n=== 3. Store real con dispatch ===");
store.dispatch(a1);
store.dispatch(a2);
store.dispatch(eliminarGasto(a1.payload.id));
console.log("Gastos en el store:", store.getState().gastos.map((g) => g.descripcion).join(", "));
assert.equal(store.getState().gastos.length, 1);

console.log("\nTodas las pruebas del reducer pasaron correctamente.");
