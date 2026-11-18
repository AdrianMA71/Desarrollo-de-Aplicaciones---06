const { llamar } = require('../db');
 
function validar(datos) {
  const titulo = String(datos.titulo ?? '').trim();
  const autor = String(datos.autor ?? '').trim();
  if (!titulo || !autor) return null;
  return { titulo, autor, anio: datos.anio ?? null };
}
 
const listar = async (req, res) => {
  const libros = await llamar('sp_libros_listar');
  res.json(libros);
};
 
const obtener = async (req, res) => {
  const [libro] = await llamar('sp_libros_obtener', [Number(req.params.id)]);
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(libro);
};
 
const crear = async (req, res) => {
  const datos = validar(req.body ?? {});
  if (!datos) {
    return res.status(400).json({ error: 'titulo y autor son obligatorios' });
  }
  const [{ id }] = await llamar('sp_libros_crear', [datos.titulo, datos.autor, datos.anio]);
  res.status(201).json({ id, ...datos });
};
const actualizar = async (req, res) => {
  const id = Number(req.params.id);
  const datos = validar(req.body ?? {});
  if (!datos) {
    return res.status(400).json({ error: 'titulo y autor son obligatorios' });
  }
  const [{ filas }] = await llamar('sp_libros_actualizar',
    [id, datos.titulo, datos.autor, datos.anio]);
  if (filas === 0) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json({ id, ...datos });
};
 
const eliminar = async (req, res) => {
  const [{ filas }] = await llamar('sp_libros_eliminar', [Number(req.params.id)]);
  if (filas === 0) return res.status(404).json({ error: 'Libro no encontrado' });
  res.status(204).end();
};
 
module.exports = { listar, obtener, crear, actualizar, eliminar };
