const {Router} = require('express');
const pool = require('./db');
const {verificarToken, permitirRoles} = require('./middlewares');
const {textoValido, idValido} = require('./validacion');
const router = Router();
router.use(verificarToken);

router.post('/cursos', permitirRoles('admin'), async (req, res) => {
  const {nombre, docente_id} = req.body ?? {};
  if (!textoValido(nombre, 120) || !idValido(docente_id)) {
    return res.status(400).json({error: 'Datos del curso inválidos'});
  }
  const [[docente]] = await pool.execute(
    "SELECT id FROM usuarios WHERE id=? AND rol='docente'", [docente_id]
  );
  if (!docente) return res.status(404).json({error: 'Docente no encontrado'});
  const [curso] = await pool.execute(
    'INSERT INTO cursos(nombre,docente_id) VALUES (?,?)', [nombre.trim(), docente_id]
  );
  res.status(201).json({id: curso.insertId, nombre: nombre.trim(), docente_id});
});

router.post('/matriculas', permitirRoles('admin'), async (req, res) => {
  const {curso_id, estudiante_id} = req.body ?? {};
  if (!idValido(curso_id) || !idValido(estudiante_id)) {
    return res.status(400).json({error: 'Datos de matrícula inválidos'});
  }
  const [alta] = await pool.execute(
    "INSERT INTO matriculas(curso_id,estudiante_id) SELECT c.id,u.id FROM cursos c CROSS JOIN usuarios u WHERE c.id=? AND u.id=? AND u.rol='estudiante'",
    [curso_id, estudiante_id]
  );
  if (!alta.affectedRows) return res.status(404).json({error: 'Curso o estudiante no encontrado'});
  res.status(201).json({curso_id, estudiante_id});
});

router.post('/notas', permitirRoles('docente'), async (req, res) => {
  const {curso_id, estudiante_id, nota} = req.body ?? {};
  if (!idValido(curso_id) || !idValido(estudiante_id) ||
      !Number.isFinite(nota) || nota < 0 || nota > 20 ||
      Math.abs(nota * 100 - Math.round(nota * 100)) > 0.000001) {
    return res.status(400).json({error: 'Datos de nota inválidos'});
  }
  const [[curso]] = await pool.execute('SELECT docente_id FROM cursos WHERE id=?', [curso_id]);
  if (!curso) return res.status(404).json({error: 'Curso no encontrado'});
  if (curso.docente_id !== req.usuario.id) {
    return res.status(403).json({error: 'Curso no asignado al docente'});
  }
  const [[matricula]] = await pool.execute(
    'SELECT 1 AS existe FROM matriculas WHERE curso_id=? AND estudiante_id=?',
    [curso_id, estudiante_id]
  );
  if (!matricula) return res.status(404).json({error: 'Matrícula no encontrada'});
  await pool.execute('INSERT INTO notas(curso_id,estudiante_id,nota) VALUES (?,?,?)',
    [curso_id, estudiante_id, nota]);
  res.status(201).json({curso_id, estudiante_id, nota});
});

router.get('/notas/mis-notas', permitirRoles('estudiante'), async (req, res) => {
  if (Object.keys(req.query).length) return res.status(400).json({error: 'No se admite otro ID'});
  const [notas] = await pool.execute(
    'SELECT n.curso_id,c.nombre AS curso,n.estudiante_id,n.nota FROM notas n JOIN cursos c ON c.id=n.curso_id WHERE n.estudiante_id=? ORDER BY n.curso_id',
    [req.usuario.id]
  );
  res.json(notas);
});
module.exports = router;
