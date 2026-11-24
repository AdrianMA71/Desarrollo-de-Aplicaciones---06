// Estructura de los documentos de la coleccion "alumnos"
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnoSchema = new Schema({
  dni: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true, min: 15 },
  distrito: { type: String, required: true },
  celular: { type: String, required: true }
});

module.exports = mongoose.model('alumnos', AlumnoSchema);
