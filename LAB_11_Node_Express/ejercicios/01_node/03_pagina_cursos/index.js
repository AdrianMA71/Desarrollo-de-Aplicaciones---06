var http = require('http');
var fs = require('fs');
var path = require('path');
var html = fs.readFileSync(path.join(__dirname, 'index.html'));
http.createServer(function (peticion, respuesta) {
  respuesta.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  respuesta.end(html);
}).listen(process.env.PORT || 3000, function () {
  console.log('Servidor HTML en http://localhost:' + (process.env.PORT || 3000));
});
