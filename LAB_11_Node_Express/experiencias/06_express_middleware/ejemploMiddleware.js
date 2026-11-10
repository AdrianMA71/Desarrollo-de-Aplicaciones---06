var express = require('express');
var app = express();
const middleware = function (req, res, next) {
  console.log('Ejecutando el middleware mientras llega petición');
  next();
};
app.use(middleware);
app.get('/', function (req, res) {
  res.send('Llegó petición al servidor');
});
app.listen(process.env.PORT || 3000, function () {
  console.log('Servidor en escucha en http://localhost:' + (process.env.PORT || 3000));
});
