const { pedir, comprobar, assert } = require('./http');
const base = '/api/tareas';

async function main() {
  const primera = await pedir('GET', base + '?pagina=1&limite=10');
  comprobar('Primera página', primera, 200);
  const segunda = await pedir('GET', base + '?pagina=2&limite=10');
  comprobar('Segunda página', segunda, 200);
  assert.equal(primera.datos.tareas.length, 10);
  assert.ok(segunda.datos.tareas.length > 0);
  const ids = new Set(primera.datos.tareas.map(tarea => tarea.id));
  assert.ok(segunda.datos.tareas.every(tarea => !ids.has(tarea.id)));
  console.log('Página 1:', [...ids].join(', '));
  console.log('Página 2:', segunda.datos.tareas.map(tarea => tarea.id).join(', '));
  comprobar('Página inválida', await pedir('GET', base + '?pagina=0'), 400);
  const original = primera.datos.tareas[0];
  const ruta = base + '/' + original.id + '/estado';
  const estado = original.estado === 'pendiente' ? 'en_progreso' : 'pendiente';
  try {
    const cambio = await pedir('PATCH', ruta, {estado});
    comprobar('Cambio de estado', cambio, 200);
    assert.deepEqual(cambio.datos, {...original, estado});
    console.log('Estado:', original.estado, '->', estado, '| demás campos intactos');
    comprobar('Estado inválido', await pedir('PATCH', ruta, {estado: 'otro'}), 400);
    comprobar('Campos extra', await pedir('PATCH', ruta, {estado, titulo: 'Otro'}), 400);
    comprobar('Tarea inexistente', await pedir('PATCH', base + '/2147483647/estado', {estado}), 404);
  } finally {
    comprobar('Restauración de la tarea', await pedir('PATCH', ruta, {estado: original.estado}), 200);
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
