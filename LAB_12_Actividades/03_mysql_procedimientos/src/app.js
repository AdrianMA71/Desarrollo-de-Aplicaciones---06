const express = require('express');
const librosRoutes = require('./routes/libros.routes');
 
const app = express();
app.use(express.json());
 
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Biblioteca Digital en funcionamiento' });
});
 
app.use('/api/libros', librosRoutes);
 
// Ruta no encontrada (siempre después de las rutas)
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.originalUrl} no encontrada` });
});
 
// Manejador de errores: Express 5 también recibe aquí los errores de funciones async
app.use((err, req, res, next) => {
  console.error(err);
  const estado = err.status || 500;
  res.status(estado).json({ error: estado === 500 ? 'Error interno del servidor' : err.message });
});
 
module.exports = app;
