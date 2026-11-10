var express = require('express');
var app = express();
var solicitudes = 0;
app.use(function (req, res, next) {
  if (req.path !== '/favicon.ico') { solicitudes = solicitudes + 1; }
  console.log('Petición ' + solicitudes + ': ' + req.method + ' ' + req.path);
  req.numeroSolicitud = solicitudes;
  next();
});
app.get('/', function (req, res) {
  res.send('Página principal. Solicitud número: ' + req.numeroSolicitud);
});
app.get('/estado', function (req, res) {
  res.json({ mensaje: 'Servidor activo', solicitudes: req.numeroSolicitud });
});
app.listen(process.env.PORT || 3000, function () {
  console.log('Middleware de registro en http://localhost:' + (process.env.PORT || 3000));
});
