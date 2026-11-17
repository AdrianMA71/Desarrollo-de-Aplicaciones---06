require('dotenv').config({quiet: true});
const bcrypt = require('bcryptjs');
const pool = require('../src/db');
const {claveValida} = require('../src/validacion');

async function main() {
  const clave = process.env.LAB_PASSWORD;
  if (!claveValida(clave)) throw new Error('Configura LAB_PASSWORD en .env');
  const cuentas = [
    ['Administrador', 'admin@matricula.test', 'admin'],
    ['Docente de prueba', 'docente@matricula.test', 'docente']
  ];
  for (const [nombre, email, rol] of cuentas) {
    const [[actual]] = await pool.execute('SELECT rol,password_hash FROM usuarios WHERE email=?', [email]);
    if (actual) {
      if (actual.rol !== rol || !await bcrypt.compare(clave, actual.password_hash)) {
        throw new Error('Cuenta existente con rol o clave distinta: ' + email);
      }
    } else {
      await pool.execute('INSERT INTO usuarios(nombre,email,password_hash,rol) VALUES (?,?,?,?)',
        [nombre, email, await bcrypt.hash(clave, 10), rol]);
    }
    console.log(email, '->', rol);
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => pool.end());
