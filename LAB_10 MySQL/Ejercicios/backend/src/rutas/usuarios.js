import { Router } from 'express';
import { pool } from '../db.js';
import { exigir } from '../servicios/validacion.js';
import { validarUsuario, crearHash } from '../servicios/usuarios.js';

export const rutasUsuarios = Router();

rutasUsuarios.post('/', async (req, res) => {
  const usuario = validarUsuario(req.body);
  const claveHash = await crearHash(req.body.clave);
  const [resultado] = await pool.execute(
    'INSERT INTO usuarios (nombre, direccion, correo, clave_hash, fecha_nacimiento, sexo, temas, aficiones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      usuario.nombre,
      usuario.direccion,
      usuario.correo,
      claveHash,
      usuario.fechaNacimiento,
      usuario.sexo,
      JSON.stringify(usuario.temas),
      JSON.stringify(usuario.aficiones)
    ]
  );
  res.status(201).json({ id: resultado.insertId, ...usuario });
});

rutasUsuarios.get('/:id', async (req, res) => {
  exigir(/^\d+$/.test(req.params.id), 'El identificador no es válido');
  const [filas] = await pool.execute(
    'SELECT id, nombre, direccion, correo, fecha_nacimiento AS fechaNacimiento, sexo, temas, aficiones FROM usuarios WHERE id = ?',
    [req.params.id]
  );
  if (filas.length === 0) {
    return res.status(404).json({ mensaje: 'El usuario no existe' });
  }
  const usuario = filas[0];
  res.json({
    ...usuario,
    temas: JSON.parse(usuario.temas),
    aficiones: JSON.parse(usuario.aficiones)
  });
});
