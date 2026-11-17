const noEncontrada = (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
};
const manejarError = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON inválido' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Cuerpo demasiado grande' });
  if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Registro duplicado' });
  if (['ER_ROW_IS_REFERENCED_2', 'ER_ROW_IS_REFERENCED'].includes(err.code)) {
    return res.status(409).json({ error: 'No se puede eliminar una categoría con productos' });
  }
  if (['ER_NO_REFERENCED_ROW_2', 'ER_NO_REFERENCED_ROW', 'ER_SIGNAL_EXCEPTION'].includes(err.code)) {
    return res.status(400).json({ error: err.sqlMessage || 'Categoría no válida' });
  }
  console.error(err.code || err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
};
module.exports = { noEncontrada, manejarError };
