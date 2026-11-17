const { llamar } = require('../db');
const { validarProducto, enteroPositivo } = require('../validaciones/datos');
async function listar(req, res) {
  if (req.query.categoria !== undefined) {
    const valor = req.query.categoria;
    if (typeof valor !== 'string' || !/^[1-9][0-9]*$/.test(valor) || !enteroPositivo(Number(valor))) {
      return res.status(400).json({ error: 'Categoría debe ser un entero positivo' });
    }
    return res.json(await llamar('sp_productos_por_categoria', [Number(valor)]));
  }
  res.json(await llamar('sp_productos_listar'));
}
async function obtener(req, res) {
  const [dato] = await llamar('sp_productos_obtener', [req.id]);
  if (!dato) return res.status(404).json({ error: 'Registro no encontrado' });
  res.json(dato);
}
async function crear(req, res) {
  const datos = validarProducto(req.body);
  if (!datos) return res.status(400).json({ error: 'Datos inválidos' });
  const [{ id }] = await llamar('sp_productos_crear', [datos.nombre, datos.precio, datos.stock, datos.categoria_id]);
  res.status(201).json({ id, ...datos });
}
async function actualizar(req, res) {
  const datos = validarProducto(req.body);
  if (!datos) return res.status(400).json({ error: 'Datos inválidos' });
  const [{ filas }] = await llamar('sp_productos_actualizar', [req.id, ...[datos.nombre, datos.precio, datos.stock, datos.categoria_id]]);
  if (!Number(filas)) return res.status(404).json({ error: 'Registro no encontrado' });
  res.json({ id: req.id, ...datos });
}
async function eliminar(req, res) {
  const [{ filas }] = await llamar('sp_productos_eliminar', [req.id]);
  if (!Number(filas)) return res.status(404).json({ error: 'Registro no encontrado' });
  res.status(204).end();
}
module.exports = { listar, obtener, crear, actualizar, eliminar };
