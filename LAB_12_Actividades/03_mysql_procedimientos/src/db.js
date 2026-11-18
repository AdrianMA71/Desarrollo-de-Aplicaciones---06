const mysql = require('mysql2/promise');
 
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});
 
// Ejecuta CALL procedimiento(?, ?, ...) y devuelve las filas del primer SELECT
async function llamar(procedimiento, parametros = []) {
  const marcadores = parametros.map(() => '?').join(', ');
  const [resultados] = await pool.query(`CALL ${procedimiento}(${marcadores})`, parametros);
  return resultados[0];
}
 
module.exports = { pool, llamar };
