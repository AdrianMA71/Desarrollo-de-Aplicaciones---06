const { llamar } = require('../db');
const { validarCategoria, enteroPositivo } = require('../validaciones/datos');
async function listar(req, res) {

  res.json(await llamar('sp_categorias_listar'));
}
async function obtener(req, res) {
  const [dato] = await llamar('sp_categorias_obtener', [req.id]);
  if (!dato) return res.status(404).json({ error: 'Registro no encontrado' });
  res.json(dato);
}
async function crear(req, res) {
  const datos = validarCategoria(req.body);
  if (!datos) return res.status(400).json({ error: 'Datos inválidos' });
  const [{ id }] = await llamar('sp_categorias_crear', [datos.nombre]);
  res.status(201).json({ id, ...datos });
}
async function actualizar(req, res) {
  const datos = validarCategoria(req.body);
  if (!datos) return res.status(400).json({ error: 'Datos inválidos' });
  const [{ filas }] = await llamar('sp_categorias_actualizar', [req.id, ...[datos.nombre]]);
  if (!Number(filas)) return res.status(404).json({ error: 'Registro no encontrado' });
  res.json({ id: req.id, ...datos });
}
async function eliminar(req, res) {
  const [{ filas }] = await llamar('sp_categorias_eliminar', [req.id]);
  if (!Number(filas)) return res.status(404).json({ error: 'Registro no encontrado' });
  res.status(204).end();
}
module.exports = { listar, obtener, crear, actualizar, eliminar };
