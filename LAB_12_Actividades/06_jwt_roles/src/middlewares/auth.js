const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const [tipo, token] = (req.headers.authorization ?? '').split(' ');
  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    });
    next();
  } catch (err) {
    const mensaje = err.name === 'TokenExpiredError'
      ? 'Token expirado' : 'Token inválido';
    return res.status(401).json({ error: mensaje });
  }
}

function permitirRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario?.rol)) {
      return res.status(403).json({
        error: 'No tiene permisos para esta operación',
      });
    }
    next();
  };
}

module.exports = { verificarToken, permitirRoles };
