var http = require('http');
var server = http.createServer();
function mensaje(peticion, respuesta) {
  respuesta.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  respuesta.write('Hola Mundo');
  respuesta.end();
}
server.on('request', mensaje);
server.listen(process.env.PORT || 3000, function () {
  console.log('La aplicación está funcionando en el puerto ' + (process.env.PORT || 3000));
});
