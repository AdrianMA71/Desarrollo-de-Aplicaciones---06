import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { pool } from '../db.js';
import { exigir } from '../servicios/validacion.js';

export const rutasArchivos = Router();
const raiz = fileURLToPath(new URL('../../almacenamiento/', import.meta.url));
const especialidades = ['Estadistica', 'DesarrolloWeb', 'Testing'];
const tipos = {
  '.txt': 'text/plain',
  '.csv': 'text/plain',
  '.md': 'text/plain',
  '.json': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf'
};
const cargar = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 1 }
});

function validarEspecialidad(valor) {
  exigir(especialidades.includes(valor), 'La especialidad no es válida');
}

rutasArchivos.post('/', cargar.single('archivo'), async (req, res) => {
  const especialidad = req.body.especialidad;
  validarEspecialidad(especialidad);
  exigir(req.file, 'Selecciona un archivo');
  const extension = path.extname(req.file.originalname).toLowerCase();
  exigir(
    Object.hasOwn(tipos, extension),
    'Formato permitido: TXT, CSV, MD, JSON, PNG, JPG o PDF'
  );
  const nombreOriginal = req.file.originalname
    .replaceAll('\\', '/')
    .split('/')
    .pop();
  exigir(
    nombreOriginal.length <= 255,
    'El nombre del archivo es demasiado largo'
  );
  const nombreGuardado = `${randomUUID()}${extension}`;
  const carpeta = path.join(raiz, especialidad);
  await mkdir(carpeta, { recursive: true });
  const destino = path.join(carpeta, nombreGuardado);
  await writeFile(destino, req.file.buffer);
  try {
    const [resultado] = await pool.execute(
      'INSERT INTO archivos (especialidad, nombre_original, nombre_guardado, extension, tamano) VALUES (?, ?, ?, ?, ?)',
      [especialidad, nombreOriginal, nombreGuardado, extension, req.file.size]
    );
    res
      .status(201)
      .json({
        id: resultado.insertId,
        nombre_original: nombreOriginal,
        especialidad
      });
  } catch (error) {
    await unlink(destino).catch(() => {});
    throw error;
  }
});

rutasArchivos.get('/', async (req, res) => {
  validarEspecialidad(req.query.especialidad);
  const [archivos] = await pool.execute(
    'SELECT id, nombre_original, extension, tamano, especialidad FROM archivos WHERE especialidad = ? ORDER BY id DESC',
    [req.query.especialidad]
  );
  res.json(archivos);
});

async function obtenerArchivo(id) {
  exigir(/^\d+$/.test(id), 'El identificador no es válido');
  const [filas] = await pool.execute('SELECT * FROM archivos WHERE id = ?', [
    id
  ]);
  if (filas.length === 0) {
    const error = new Error('El archivo no existe');
    error.status = 404;
    throw error;
  }
  const archivo = filas[0];
  const contenido = await readFile(
    path.join(raiz, archivo.especialidad, archivo.nombre_guardado)
  );
  return { archivo, contenido };
}

rutasArchivos.get('/:id/texto', async (req, res) => {
  const { archivo, contenido } = await obtenerArchivo(req.params.id);
  exigir(
    ['.txt', '.csv', '.md', '.json'].includes(archivo.extension),
    'Este archivo no es de texto'
  );
  res.json({
    nombre: archivo.nombre_original,
    contenido: contenido.toString('utf8')
  });
});

rutasArchivos.get('/:id/contenido', async (req, res) => {
  const { archivo, contenido } = await obtenerArchivo(req.params.id);
  res.set('Content-Type', tipos[archivo.extension]);
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Content-Security-Policy', "default-src 'none'; sandbox");
  res.send(contenido);
});
