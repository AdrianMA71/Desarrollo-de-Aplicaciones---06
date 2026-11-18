const express = require('express');
const app = express();
app.use(express.json());
 
const libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967 },
  { id: 2, titulo: 'La ciudad y los perros', autor: 'Mario Vargas Llosa', anio: 1963 },
];
 
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Biblioteca Digital en funcionamiento' });
});
 
app.get('/api/libros', (req, res) => {
  res.json(libros);
});
 
app.get('/api/libros/:id', (req, res) => {
  const libro = libros.find((l) => l.id === Number(req.params.id));
  if (!libro) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }
  res.json(libro);
});
 
module.exports = app;
