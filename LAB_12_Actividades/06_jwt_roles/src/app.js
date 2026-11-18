const express = require('express');
const librosRoutes = require('./routes/libros.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Biblioteca Digital en funcionamiento' });
});
app.use('/api/libros', librosRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
