const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { llamar } = require('../db');

const registrar = async (req, res) => {
  const { nombre, email, password } = req.body ?? {};
  if (!nombre || !email || !password || String(password).length < 8) {
    return res.status(400).json({
      error: 'nombre, email y password (mínimo 8 caracteres) son obligatorios',
    });
  }
  const correo = String(email).trim().toLowerCase();
  const hash = await bcrypt.hash(String(password), 10);
  try {
    const [{ id }] = await llamar('sp_usuario_registrar',
      [nombre, correo, hash, 'lector']);
    res.status(201).json({ id, nombre, email: correo, rol: 'lector' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    throw err;
  }
};
const login = async (req, res) => {
  const { email, password } = req.body ?? {};
  const correo = String(email ?? '').trim().toLowerCase();
  const [usuario] = await llamar('sp_usuario_buscar_email', [correo]);
  const valido = usuario && await bcrypt.compare(
    String(password ?? ''), usuario.password_hash);
  if (!valido) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
  const expiraEn = process.env.JWT_EXPIRES_IN || '1h';
  const token = jwt.sign(
    { sub: String(usuario.id), nombre: usuario.nombre, rol: usuario.rol },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: expiraEn },
  );
  res.json({ token, tipo: 'Bearer', expiraEn });
};

module.exports = { registrar, login };
