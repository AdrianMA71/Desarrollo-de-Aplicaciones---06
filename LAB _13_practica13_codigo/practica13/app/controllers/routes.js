// Importando paquetes y archivos necesarios para trabajar las rutas
var express = require('express');
var mongoose = require('mongoose');
var Alumno = require('../models/alumnos');
var router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use(function (req, res, next) {
  console.log('request ' + req.method + ' ' + req.originalUrl);
  next();
});

// Endpoint 1: /alumnos  (GET todos, POST crear)
router.route('/alumnos')
  .get(async function (req, res) {
    try {
      var alumnos = await Alumno.find();
      res.json(alumnos);
    } catch (error) {
      res.status(500).json({ error: 'Error en el servicio: ' + error.message });
    }
  })
  .post(async function (req, res) {
    try {
      var alumno = await Alumno.create(req.body);
      res.status(201).json({ message: 'Alumno registrado con exito', alumno: alumno });
    } catch (error) {
      res.status(400).json({ error: 'Datos no validos: ' + error.message });
    }
  });

// Endpoint 2: /alumnos/:id  (GET uno, PUT actualizar, DELETE eliminar)
router.route('/alumnos/:id')
  .get(async function (req, res) {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: 'Identificador no valido' });
      }
      var alumno = await Alumno.findById(req.params.id);
      if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
      res.json(alumno);
    } catch (error) {
      res.status(500).json({ error: 'Error en el servicio: ' + error.message });
    }
  })
  .put(async function (req, res) {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: 'Identificador no valido' });
      }
      var alumno = await Alumno.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
      res.json({ message: 'Alumno actualizado con exito', alumno: alumno });
    } catch (error) {
      res.status(400).json({ error: 'Datos no validos: ' + error.message });
    }
  })
  .delete(async function (req, res) {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: 'Identificador no valido' });
      }
      var alumno = await Alumno.findByIdAndDelete(req.params.id);
      if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
      res.json({ message: 'Alumno eliminado con exito', alumno: alumno });
    } catch (error) {
      res.status(500).json({ error: 'Error en el servicio: ' + error.message });
    }
  });

module.exports = router;
