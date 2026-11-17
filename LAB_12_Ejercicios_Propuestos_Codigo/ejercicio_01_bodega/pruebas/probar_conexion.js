require('dotenv').config({ quiet: true });
const { pool, llamar } = require('../src/db');
async function main() {
  const [[info]] = await pool.query('SELECT VERSION() AS version, DATABASE() AS base');
  console.log(info);
  console.log('Categorías:', await llamar('sp_categorias_listar'));
  console.log('Productos:', await llamar('sp_productos_listar'));
}
main().catch(error => { console.error(error.code || error.message); process.exitCode = 1; }).finally(() => pool.end());
