require('dotenv').config({quiet: true});
const pool = require('../src/db');

async function main() {
  const [[info]] = await pool.query('SELECT DATABASE() AS base');
  const [[ssl]] = await pool.query("SHOW SESSION STATUS LIKE 'Ssl_cipher'");
  if (!ssl?.Value) throw new Error('La conexión no reportó un cifrado TLS');
  console.log('Base:', info.base);
  console.log('Cifrado TLS:', ssl.Value);
}

main().catch(error => {
  console.error(error.code || error.message);
  process.exitCode = 1;
}).finally(() => pool.end());
