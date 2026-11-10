var express = require('express');
var app = express();
var rutas = require('./rutas');
app.use('/', rutas);
app.listen(process.env.PORT || 3000, function () {
  console.log('Aplicación en http://localhost:' + (process.env.PORT || 3000));
});
