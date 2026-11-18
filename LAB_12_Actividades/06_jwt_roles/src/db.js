const fs = require('node:fs');
const mysql = require('mysql2/promise');
 
// Conexión cifrada (TLS) cuando DB_SSL=true; se valida el certificado del servidor
function opcionesSSL() {
  if (process.env.DB_SSL !== 'true') return undefined;
  if (process.env.DB_SSL_CA) {
    return { ca: fs.readFileSync(process.env.DB_SSL_CA, 'utf8'), rejectUnauthorized: true };
  }
  return { rejectUnauthorized: true };
}
 
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: opcionesSSL(),
  waitForConnections: true,
  connectionLimit: 5,
  connectTimeout: 15000,
});
 
// Ejecuta CALL procedimiento(?, ?, ...) y devuelve las filas del primer SELECT
async function llamar(procedimiento, parametros = []) {
  const marcadores = parametros.map(() => '?').join(', ');
  const [resultados] = await pool.query(`CALL ${procedimiento}(${marcadores})`, parametros);
  return resultados[0];
}
 
module.exports = { pool, llamar };
