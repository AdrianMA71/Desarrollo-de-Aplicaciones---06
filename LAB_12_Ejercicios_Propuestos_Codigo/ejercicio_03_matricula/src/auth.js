const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const {verificarToken} = require('./middlewares');
const {claveValida, correoValido, textoValido} = require('./validacion');
const router = Router();

router.post('/registro', async (req, res) => {
  const {nombre, email, password} = req.body ?? {};
  if (!textoValido(nombre, 100) || !correoValido(email) || !claveValida(password)) {
    return res.status(400).json({error: 'Datos de registro inválidos'});
  }
  const correo = email.toLowerCase();
  const hash = await bcrypt.hash(password, 10);
  const [alta] = await pool.execute(
    "INSERT INTO usuarios(nombre,email,password_hash,rol) VALUES (?,?,?,'estudiante')",
    [nombre.trim(), correo, hash]
  );
  res.status(201).json({id: alta.insertId, nombre: nombre.trim(), email: correo, rol: 'estudiante'});
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body ?? {};
  if (!correoValido(email) || !claveValida(password)) {
    return res.status(401).json({error: 'Credenciales incorrectas'});
  }
  const [[usuario]] = await pool.execute('SELECT id,rol,password_hash FROM usuarios WHERE email=?',
    [email.toLowerCase()]);
  if (!usuario || !await bcrypt.compare(password, usuario.password_hash)) {
    return res.status(401).json({error: 'Credenciales incorrectas'});
  }
  const token = jwt.sign({rol: usuario.rol}, process.env.JWT_SECRET, {
    subject: String(usuario.id), algorithm: 'HS256', audience: 'lab12-matricula',
    expiresIn: '30m'
  });
  res.json({token, tipo: 'Bearer', expiraEn: 1800});
});

router.get('/perfil', verificarToken, (req, res) => res.json(req.usuario));

router.put('/password', verificarToken, async (req, res) => {
  const {actual, nueva} = req.body ?? {};
  if (!claveValida(actual) || !claveValida(nueva) || actual === nueva) {
    return res.status(400).json({error: 'Usa una contraseña nueva distinta y válida'});
  }
  const [[usuario]] = await pool.execute('SELECT password_hash FROM usuarios WHERE id=?',
    [req.usuario.id]);
  if (!usuario || !await bcrypt.compare(actual, usuario.password_hash)) {
    return res.status(401).json({error: 'Contraseña actual incorrecta'});
  }
  const hash = await bcrypt.hash(nueva, 10);
  const [cambio] = await pool.execute(
    'UPDATE usuarios SET password_hash=? WHERE id=? AND password_hash=?',
    [hash, req.usuario.id, usuario.password_hash]
  );
  if (!cambio.affectedRows) return res.status(409).json({error: 'La contraseña ya cambió'});
  res.json({mensaje: 'Contraseña actualizada'});
});
module.exports = router;
