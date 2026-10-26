import { Router } from 'express';
import { pool } from '../db.js';
import { prepararPasaje } from '../servicios/pasajes.js';

export const rutasPasajes = Router();

rutasPasajes.post('/calcular', (req, res) => {
  res.json(prepararPasaje(req.body));
});

rutasPasajes.post('/', async (req, res) => {
  const pasaje = prepararPasaje(req.body);
  const [resultado] = await pool.execute(
    'INSERT INTO ventas (nombre, fecha_nacimiento, fecha_vuelo, destino, edad, categoria, precio_base, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      pasaje.nombre,
      pasaje.fechaNacimiento,
      pasaje.fechaVuelo,
      pasaje.destino,
      pasaje.edad,
      pasaje.categoria,
      pasaje.precioBase,
      pasaje.total
    ]
  );
  res.status(201).json({ id: resultado.insertId, ...pasaje });
});

rutasPasajes.get('/', async (req, res) => {
  const [ventas] = await pool.query(
    'SELECT * FROM ventas ORDER BY id DESC LIMIT 20'
  );
  res.json(ventas);
});
