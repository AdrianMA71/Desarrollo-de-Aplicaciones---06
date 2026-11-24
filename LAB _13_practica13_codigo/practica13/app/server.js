// Importando paquetes y archivos necesarios para crear y levantar el servidor
var express = require('express');
var path = require('path');
var app = express();
require('./models/db');
var Router = require('./controllers/routes');
var port = process.env.PORT || 3000;

// Vista principal
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rutas de la API
app.use('/api', Router);

app.listen(port, function () {
  console.log('Ejecutandose en el puerto ' + port);
});
