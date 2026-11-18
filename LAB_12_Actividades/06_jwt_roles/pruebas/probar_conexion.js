// Verifica versión, base y cifrado de la conexión (npm run probar:conexion)
require('dotenv').config();
const { pool, llamar } = require('../src/db');
 
async function main() {
  const [[info]] = await pool.query('SELECT VERSION() AS version, DATABASE() AS base');
  console.log('Conectado a MySQL', info.version, '- base:', info.base);
 
  const [[cifrado]] = await pool.query("SHOW SESSION STATUS LIKE 'Ssl_cipher'");
  console.log('Cifrado TLS:', cifrado.Value || '(conexión sin cifrar)');
 
  const libros = await llamar('sp_libros_listar');
  console.log('Libros en la base:', libros.map((l) => l.titulo));
}
 
main()
  .catch((e) => console.error('No se pudo conectar:', e.code || e.message))
  .finally(() => pool.end());
