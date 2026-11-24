// Importando paquetes necesarios para conectarse con MongoDB
var mongoose = require('mongoose');

// URL de conexion (se puede cambiar con la variable de entorno MONGO_URL)
var url = process.env.MONGO_URL || 'mongodb://localhost:27017/ucsm';

mongoose.connect(url)
  .then(function () {
    console.log('Conectado a MongoDB: ' + url);
  })
  .catch(function (error) {
    console.error('Error de conexion con MongoDB: ' + error.message);
    process.exit(1);
  });

module.exports = mongoose;
