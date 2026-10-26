import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { pool } from './db.js';
import { rutasPasajes } from './rutas/pasajes.js';
import { rutasMatrices } from './rutas/matrices.js';
import { rutasUsuarios } from './rutas/usuarios.js';
import { rutasArchivos } from './rutas/archivos.js';

const app = express();
app.use(
  cors({
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://127.0.0.1:4173'
    ]
  })
);
app.use(express.json({ limit: '64kb' }));

app.get('/api/salud', async (req, res) => {
  await pool.query('SELECT 1');
  res.json({ mensaje: 'Conexión con MySQL correcta' });
});

app.use('/api/pasajes', rutasPasajes);
app.use('/api/matrices', rutasMatrices);
app.use('/api/usuarios', rutasUsuarios);
app.use('/api/archivos', rutasArchivos);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'La ruta no existe' });
});

app.use((error, req, res, next) => {
  console.error(error.message);
  if (error instanceof multer.MulterError) {
    return res
      .status(400)
      .json({
        mensaje:
          error.code === 'LIMIT_FILE_SIZE'
            ? 'El tamaño máximo es de 5 MB'
            : 'La carga del archivo no es válida'
      });
  }
  if (error.code === 'ER_DUP_ENTRY') {
    return res
      .status(409)
      .json({ mensaje: 'Este correo ya está registrado' });
  }
  const status = error.status || 500;
  res
    .status(status)
    .json({
      mensaje:
        status < 500
          ? error.message
          : 'No fue posible completar la operación. Revisa MySQL y la terminal del backend.'
    });
});

const puerto = Number(process.env.PORT || 3001);
app.listen(puerto, '127.0.0.1', () => {
  console.log(`Backend disponible en http://127.0.0.1:${puerto}`);
});
