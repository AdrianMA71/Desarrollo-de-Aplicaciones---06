var express = require('express');
var app = express();
app.use('/', require('./rutas'));
app.listen(process.env.PORT || 3000, function () {
  console.log('Catálogo en http://localhost:' + (process.env.PORT || 3000));
});
