require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool, llamar } = require('../src/db');

async function main() {
  const [nombre, email, password] = process.argv.slice(2);
  if (!nombre || !email || !password || password.length < 8) {
    throw new Error('Uso: node scripts/crear_admin.js "Nombre" correo clave (8+)');
  }
  const hash = await bcrypt.hash(password, 10);
  const [{ id }] = await llamar('sp_usuario_registrar', [
    nombre, email.trim().toLowerCase(), hash, 'admin',
  ]);
  console.log(`Administrador creado con id ${id}`);
}

main()
  .catch((err) => {
    console.error('Error:', err.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
