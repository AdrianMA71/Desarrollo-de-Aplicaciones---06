var express = require('express');
var router = express.Router();
var cursos = [
  { id: 1, nombre: 'Desarrollo de Aplicaciones', creditos: 4 },
  { id: 2, nombre: 'Bases de Datos', creditos: 4 },
  { id: 3, nombre: 'Redes', creditos: 3 }
];
router.get('/', function (req, res) {
  res.send('Catálogo académico: consulta /cursos y /cursos/1');
});
router.get('/cursos', function (req, res) { res.json(cursos); });
router.get('/cursos/:id', function (req, res) {
  var curso = cursos.find(function (curso) { return curso.id === Number(req.params.id); });
  if (!curso) { return res.status(404).json({ mensaje: 'Curso no encontrado' }); }
  res.json(curso);
});
module.exports = router;
