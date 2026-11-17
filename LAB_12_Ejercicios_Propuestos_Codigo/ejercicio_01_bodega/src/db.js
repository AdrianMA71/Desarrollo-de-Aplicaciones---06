const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');
function opcionesSSL() {
  if (process.env.DB_SSL !== 'true') return undefined;
  const archivo = process.env.DB_SSL_CA;
  return archivo
    ? { ca: fs.readFileSync(path.resolve(archivo), 'utf8'), rejectUnauthorized: true }
    : { rejectUnauthorized: true };
}
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  ssl: opcionesSSL(),
  waitForConnections: true,
  connectionLimit: 5,
  connectTimeout: 15000,
  decimalNumbers: true
});
const procedimientos = new Set(["sp_categorias_listar", "sp_categorias_obtener", "sp_categorias_crear", "sp_categorias_actualizar", "sp_categorias_eliminar", "sp_productos_listar", "sp_productos_obtener", "sp_productos_crear", "sp_productos_actualizar", "sp_productos_eliminar", "sp_productos_por_categoria"]);
async function llamar(nombre, parametros = []) {
  if (!procedimientos.has(nombre)) throw new Error('Procedimiento no permitido');
  const marcadores = parametros.map(() => '?').join(', ');
  const [resultados] = await pool.query('CALL ' + nombre + '(' + marcadores + ')', parametros);
  return resultados[0];
}
module.exports = { pool, llamar };
