// Prueba manual del reducer FUERA de React (solo Node).
// Uso:  node prueba_reducer.mjs
import assert from "node:assert/strict";
import tareasReducer, { estadoInicial } from "./src/store/tareasReducer.js";
import {
  cargarTareas, agregarTarea, completarTarea, alternarTarea,
} from "./src/store/actions.js";
import store from "./src/store/store.js";

// Estado congelado: si el reducer intentara mutarlo, lanzaría un error.
const congelar = (e) => {
  Object.freeze(e);
  Object.freeze(e.tareas);
  e.tareas.forEach(Object.freeze);
  return e;
};

console.log("=== 1. Reducer puro, acciones en secuencia ===");
let estado = congelar(tareasReducer(undefined, { type: "@@INIT" }));
console.log("Estado inicial       :", JSON.stringify(estado));
assert.deepEqual(estado, estadoInicial);

estado = congelar(tareasReducer(estado, cargarTareas([
  { id: 1, titulo: "Revisar teoría", completada: false },
  { id: 2, titulo: "Repasar Hooks", completada: false },
])));
console.log("CARGAR_TAREAS        :", JSON.stringify(estado));
assert.equal(estado.tareas.length, 2);

const antes = estado;
estado = congelar(tareasReducer(estado, agregarTarea("Resolver Redux")));
console.log("AGREGAR_TAREA        :", estado.tareas.length, "tareas");
assert.equal(estado.tareas.length, 3);
assert.equal(antes.tareas.length, 2, "el estado anterior no se modificó");
assert.notEqual(antes, estado, "retorna un objeto nuevo");

estado = congelar(tareasReducer(estado, completarTarea(1)));
console.log("COMPLETAR_TAREA (1)  :", estado.tareas[0].completada);
assert.equal(estado.tareas[0].completada, true);

estado = congelar(tareasReducer(estado, alternarTarea(1)));
console.log("ALTERNAR_TAREA (1)   :", estado.tareas[0].completada);
assert.equal(estado.tareas[0].completada, false);

const igual = tareasReducer(estado, { type: "ACCION_DESCONOCIDA" });
console.log("Acción desconocida   : mismo estado ->", igual === estado);
assert.equal(igual, estado);

console.log("\n=== 2. Pureza: mismos argumentos => mismo resultado ===");
const accion = completarTarea(2);
assert.deepEqual(tareasReducer(estado, accion), tareasReducer(estado, accion));
console.log("OK: dos llamadas idénticas producen el mismo estado");

console.log("\n=== 3. Store: dispatch -> reducer -> subscribe ===");
let notificaciones = 0;
const cancelar = store.subscribe(() => notificaciones++);
store.dispatch(cargarTareas([{ id: 10, titulo: "Demo", completada: false }]));
store.dispatch(agregarTarea("Otra tarea"));
store.dispatch(alternarTarea(10));
console.log("Estado del store     :", JSON.stringify(store.getState()));
console.log("Suscriptor notificado:", notificaciones, "veces");
assert.equal(notificaciones, 3);
cancelar();

console.log("\nTodas las pruebas del reducer pasaron correctamente.");
