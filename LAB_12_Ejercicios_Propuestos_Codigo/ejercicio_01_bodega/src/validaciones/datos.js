function enteroPositivo(valor) {
  return Number.isSafeInteger(valor) && valor > 0 && valor <= 2147483647;
}
function validarCategoria(datos) {
  if (!datos || typeof datos.nombre !== 'string') return null;
  const nombre = datos.nombre.trim();
  return nombre && nombre.length <= 100 ? { nombre } : null;
}
function validarProducto(datos) {
  if (!datos || typeof datos.nombre !== 'string') return null;
  const { precio, stock, categoria_id } = datos;
  const nombre = datos.nombre.trim();
  if (!nombre || nombre.length > 150) return null;
  if (typeof precio !== 'number' || !Number.isFinite(precio) || precio < 0 || precio > 99999999.99) return null;
  if (Math.abs(precio * 100 - Math.round(precio * 100)) > 0.000001) return null;
  if (!Number.isInteger(stock) || stock < 0 || stock > 2147483647 || !enteroPositivo(categoria_id)) return null;
  return { nombre, precio, stock, categoria_id };
}
module.exports = { enteroPositivo, validarCategoria, validarProducto };
