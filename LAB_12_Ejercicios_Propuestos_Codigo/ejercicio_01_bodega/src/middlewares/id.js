function validarId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ error: 'El id debe ser un entero positivo' });
  }
  req.id = id;
  next();
}
module.exports = validarId;
