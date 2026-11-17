require('dotenv').config({quiet: true});
if (!process.env.JWT_SECRET || Buffer.byteLength(process.env.JWT_SECRET) < 32) {
  throw new Error('Configura JWT_SECRET con al menos 32 bytes');
}
const express = require('express');
const app = express();
app.use(express.json({limit: '32kb'}));
app.use('/api/auth', require('./auth'));
app.use('/api', require('./academico'));
app.use((req, res) => res.status(404).json({error: 'Ruta no encontrada'}));
app.use((err, req, res, next) => {
  if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({error: 'Registro duplicado'});
  const estado = err.status === 400 ? 400 : err.status === 413 ? 413 : 500;
  res.status(estado).json({error: estado === 500 ? 'Error de servidor' : 'Cuerpo inválido'});
});
const puerto = Number(process.env.PORT || 3003);
app.listen(puerto, '127.0.0.1', () => console.log('API en http://127.0.0.1:' + puerto));
