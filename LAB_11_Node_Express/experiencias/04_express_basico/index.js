var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hola mundo desde Express');
});
app.get('/login', function (req, res) {
  res.send('Aquí se mostraría la página del login');
});
app.listen(process.env.PORT || 3000, function () {
  console.log('Aplicación en http://localhost:' + (process.env.PORT || 3000));
});
