import { Router } from 'express';
import { pool } from '../db.js';
import { generarMatriz, verificarMatriz } from '../servicios/matrices.js';

export const rutasMatrices = Router();

async function guardarMatriz(matriz) {
  const resultado = verificarMatriz(matriz);
  const [registro] = await pool.execute(
    'INSERT INTO matrices (dimension, valores, es_perfecta, suma_objetivo) VALUES (?, ?, ?, ?)',
    [
      resultado.dimension,
      JSON.stringify(matriz),
      resultado.esPerfecta,
      resultado.sumaObjetivo
    ]
  );
  return { id: registro.insertId, ...resultado };
}

rutasMatrices.post('/generar', async (req, res) => {
  const matriz = generarMatriz(Number(req.body.dimension));
  res.status(201).json(await guardarMatriz(matriz));
});

rutasMatrices.post('/verificar', async (req, res) => {
  res.status(201).json(await guardarMatriz(req.body.matriz));
});
