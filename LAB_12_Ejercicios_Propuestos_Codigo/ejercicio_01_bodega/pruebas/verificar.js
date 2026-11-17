const { pedir, comprobar, assert } = require('./http');
async function main() {
  let categoria;
  let producto;
  const marca = 'Prueba ' + Date.now();
  try {
    comprobar('01 Listar categorías', await pedir('GET', '/api/categorias'), 200);
    comprobar('02 Categoría inválida', await pedir('POST', '/api/categorias', { nombre: ' ' }), 400);
    let r = await pedir('POST', '/api/categorias', { nombre: marca });
    comprobar('03 Crear categoría', r, 201);
    categoria = r.datos.id;
    comprobar('04 Categoría repetida', await pedir('POST', '/api/categorias', { nombre: marca }), 409);
    comprobar('05 Obtener categoría', await pedir('GET', '/api/categorias/' + categoria), 200);
    comprobar('06 Actualizar categoría', await pedir('PUT', '/api/categorias/' + categoria, { nombre: marca + ' actualizada' }), 200);
    const datos = { nombre: 'Producto de prueba', precio: 4.5, stock: 10, categoria_id: categoria };
    comprobar('07 Precio negativo', await pedir('POST', '/api/productos', { ...datos, precio: -1 }), 400);
    comprobar('08 Stock fraccionario', await pedir('POST', '/api/productos', { ...datos, stock: 1.5 }), 400);
    comprobar('09 Datos incompletos', await pedir('POST', '/api/productos', { nombre: 'Solo nombre' }), 400);
    r = await pedir('POST', '/api/productos', datos);
    comprobar('10 Crear producto', r, 201);
    producto = r.datos.id;
    comprobar('11 Listar productos', await pedir('GET', '/api/productos'), 200);
    r = await pedir('GET', '/api/productos/' + producto);
    comprobar('12 Obtener producto', r, 200);
    assert.equal(Number(r.datos.precio), 4.5);
    r = await pedir('GET', '/api/productos?categoria=' + categoria);
    comprobar('13 Filtrar categoría', r, 200);
    assert.ok(r.datos.some(p => p.id === producto));
    assert.ok(r.datos.every(p => p.categoria_id === categoria));
    comprobar('14 Filtro inválido', await pedir('GET', '/api/productos?categoria=abc'), 400);
    comprobar('15 Actualizar producto', await pedir('PUT', '/api/productos/' + producto, { ...datos, precio: 6, stock: 12 }), 200);
    r = await pedir('GET', '/api/productos/' + producto);
    assert.equal(Number(r.datos.precio), 6);
    assert.equal(r.datos.stock, 12);
    comprobar('16 Categoría con productos', await pedir('DELETE', '/api/categorias/' + categoria), 409);
    comprobar('17 Id inválido', await pedir('GET', '/api/productos/abc'), 400);
    comprobar('18 Eliminar producto', await pedir('DELETE', '/api/productos/' + producto), 204);
    comprobar('19 Producto inexistente', await pedir('GET', '/api/productos/' + producto), 404);
    comprobar('20 Actualizar inexistente', await pedir('PUT', '/api/productos/' + producto, datos), 404);
    comprobar('21 Eliminar inexistente', await pedir('DELETE', '/api/productos/' + producto), 404);
    producto = undefined;
    comprobar('22 Eliminar categoría', await pedir('DELETE', '/api/categorias/' + categoria), 204);
    comprobar('23 Categoría inexistente', await pedir('GET', '/api/categorias/' + categoria), 404);
    comprobar('24 Categoría ajena', await pedir('POST', '/api/productos', { ...datos, categoria_id: categoria }), 400);
    categoria = undefined;
    console.log('24 comprobaciones correctas');
  } finally {
    if (producto) await pedir('DELETE', '/api/productos/' + producto);
    if (categoria) await pedir('DELETE', '/api/categorias/' + categoria);
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
