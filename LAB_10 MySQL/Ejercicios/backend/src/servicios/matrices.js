import { exigir } from './validacion.js';

export function generarMatriz(dimension, aleatorio = Math.random) {
  exigir(
    Number.isInteger(dimension) && dimension >= 2 && dimension <= 8,
    'El tamaño debe ser un entero entre 2 y 8'
  );
  const valores = Array.from(
    { length: dimension * dimension },
    (_, indice) => indice + 1
  );
  for (let indice = valores.length - 1; indice > 0; indice = indice - 1) {
    const otro = Math.floor(aleatorio() * (indice + 1));
    const temporal = valores[indice];
    valores[indice] = valores[otro];
    valores[otro] = temporal;
  }
  const matriz = [];
  for (let fila = 0; fila < dimension; fila = fila + 1) {
    matriz.push(valores.slice(fila * dimension, (fila + 1) * dimension));
  }
  return matriz;
}

export function verificarMatriz(matriz) {
  exigir(
    Array.isArray(matriz) && matriz.length >= 2 && matriz.length <= 8,
    'La matriz debe tener de 2 a 8 filas'
  );
  const dimension = matriz.length;
  exigir(
    matriz.every((fila) => Array.isArray(fila) && fila.length === dimension),
    'La matriz debe ser cuadrada'
  );
  const valores = matriz.flat();
  exigir(
    valores.every(Number.isInteger),
    'La matriz solo admite números enteros'
  );
  const sumaObjetivo = (dimension * (dimension * dimension + 1)) / 2;
  const numerosValidos =
    new Set(valores).size === dimension * dimension &&
    valores.every((valor) => valor >= 1 && valor <= dimension * dimension);
  const sumasFilas = matriz.map((fila) =>
    fila.reduce((suma, valor) => suma + valor, 0)
  );
  const sumasColumnas = [];
  let diagonalPrincipal = 0;
  let diagonalSecundaria = 0;
  for (let columna = 0; columna < dimension; columna = columna + 1) {
    let suma = 0;
    for (let fila = 0; fila < dimension; fila = fila + 1) {
      suma = suma + matriz[fila][columna];
    }
    sumasColumnas.push(suma);
    diagonalPrincipal = diagonalPrincipal + matriz[columna][columna];
    diagonalSecundaria =
      diagonalSecundaria + matriz[columna][dimension - 1 - columna];
  }
  const todasLasSumas = [
    ...sumasFilas,
    ...sumasColumnas,
    diagonalPrincipal,
    diagonalSecundaria
  ];
  const esPerfecta =
    numerosValidos && todasLasSumas.every((suma) => suma === sumaObjetivo);
  return {
    dimension,
    matriz,
    sumaObjetivo,
    sumasFilas,
    sumasColumnas,
    diagonalPrincipal,
    diagonalSecundaria,
    numerosValidos,
    esPerfecta
  };
}
