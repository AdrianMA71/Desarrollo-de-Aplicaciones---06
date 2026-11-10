var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Bienvenido a la aplicación de saludos');
});
app.get('/saludo/:nombre', function (req, res) {
  res.type('text/plain').send('Hola, ' + req.params.nombre);
});
app.listen(process.env.PORT || 3000, function () {
  console.log('Saludos en http://localhost:' + (process.env.PORT || 3000));
});
