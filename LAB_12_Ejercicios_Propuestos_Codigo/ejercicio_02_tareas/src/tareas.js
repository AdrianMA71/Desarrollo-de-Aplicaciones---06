const { Router } = require('express');
const pool = require('./db');
const router = Router();
const estados = new Set(['pendiente','en_progreso','terminada']);

function entero(valor, maximo) {
  if (typeof valor !== 'string' || !/^[1-9][0-9]*$/.test(valor)) return null;
  const num = Number(valor);
  return Number.isSafeInteger(num) && num <= maximo ? num : null;
}

router.get('/', async (req, res) => {
  const pagina = entero(req.query.pagina ?? '1', 1000000);
  const limite = entero(req.query.limite ?? '10', 100);
  if (!pagina || !limite) return res.status(400).json({error: 'Paginación inválida'});
  const offset = (pagina - 1) * limite;
  const [[tareas, [conteo]]] = await pool.execute('CALL sp_tareas_listar(?, ?)', [limite, offset]);
  res.json({pagina, limite, total: Number(conteo.total), tareas});
});

router.patch('/:id/estado', async (req, res) => {
  const id = entero(req.params.id, 2147483647);
  const { estado } = req.body ?? {};
  if (!id || !estados.has(estado) || Object.keys(req.body).length !== 1) {
    return res.status(400).json({error: 'Envía únicamente un estado válido y un ID positivo'});
  }
  const [[[tarea]]] = await pool.execute('CALL sp_tareas_estado(?, ?)', [id, estado]);
  if (!tarea) return res.status(404).json({error: 'Tarea no encontrada'});
  res.json(tarea);
});

module.exports = router;
