var http = require('http');
http.createServer(function (req, res) {
  var hora = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Hora del servidor en Lima: ' + hora);
}).listen(process.env.PORT || 3000, function () {
  console.log('Servidor de hora en http://localhost:' + (process.env.PORT || 3000));
});
