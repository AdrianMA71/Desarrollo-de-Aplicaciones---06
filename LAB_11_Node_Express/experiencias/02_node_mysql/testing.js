var mysql = require('mysql');
var conexion = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'musicdb'
});
conexion.connect(function (error) {
  if (error) {
    console.error('Error de conexión: ' + error.message);
    process.exitCode = 1;
    conexion.destroy();
    return;
  }
  console.log('Conectado al ID ' + conexion.threadId);
  conexion.query('SELECT * FROM albums', function (error, resultados) {
    if (error) {
      console.error('Error de consulta: ' + error.message);
      process.exitCode = 1;
    } else {
      resultados.forEach(function (registro) {
        console.log(registro);
      });
    }
    conexion.end();
  });
});
