require('dotenv').config({quiet: true});
const express = require('express');
const app = express();
app.use(express.json({limit: '32kb'}));
app.use('/api/tareas', require('./tareas'));
app.use((req, res) => res.status(404).json({error: 'Ruta no encontrada'}));
app.use((err, req, res, next) => {
  const estado = err.status === 400 ? 400 : err.status === 413 ? 413 : 500;
  res.status(estado).json({error: estado === 500 ? 'Error de servidor' : 'Cuerpo inválido'});
});
const puerto = Number(process.env.PORT || 3002);
app.listen(puerto, '127.0.0.1', () => console.log('API en http://127.0.0.1:' + puerto));
