const jwt = require('jsonwebtoken');
const pool = require('./db');

async function verificarToken(req, res, next) {
  const header = req.get('Authorization');
  if (!header) return res.status(401).json({error: 'Token no proporcionado'});
  const partes = /^Bearer ([^\s]+)$/i.exec(header);
  if (!partes) return res.status(401).json({error: 'Token inválido'});
  let claims;
  try {
    claims = jwt.verify(partes[1], process.env.JWT_SECRET, {
      algorithms: ['HS256'], audience: 'lab12-matricula'
    });
    if (typeof claims.sub !== 'string' || !/^[1-9][0-9]*$/.test(claims.sub)) {
      return res.status(401).json({error: 'Token inválido'});
    }
  } catch (error) {
    return res.status(401).json({
      error: error.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido'
    });
  }
  const [[usuario]] = await pool.execute(
    'SELECT id,nombre,email,rol FROM usuarios WHERE id=?', [Number(claims.sub)]
  );
  if (!usuario) return res.status(401).json({error: 'Token inválido'});
  req.usuario = usuario;
  next();
}

function permitirRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario?.rol)) {
      return res.status(403).json({error: 'Permisos insuficientes'});
    }
    next();
  };
}
module.exports = {verificarToken, permitirRoles};
