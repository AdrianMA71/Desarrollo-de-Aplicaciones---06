import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularEdad, calcularTarifa } from '../src/servicios/pasajes.js';
import { generarMatriz, verificarMatriz } from '../src/servicios/matrices.js';
import { validarUsuario, crearHash } from '../src/servicios/usuarios.js';

for (const [edad, total, categoria] of [
  [0, 0, 'Infante'],
  [1, 0, 'Infante'],
  [2, 150, 'Menor'],
  [17, 150, 'Menor'],
  [18, 200, 'Adulto']
]) {
  test(`Tarifa para ${edad} años`, () => {
    const resultado = calcularTarifa(edad, 200);
    assert.equal(resultado.total, total);
    assert.equal(resultado.categoria, categoria);
  });
}

test('La edad cambia el día del cumpleaños', () => {
  assert.equal(calcularEdad('2008-10-26', '2026-10-25'), 17);
  assert.equal(calcularEdad('2008-10-26', '2026-10-26'), 18);
});

test('Rechaza fechas inexistentes y nacimiento posterior', () => {
  assert.throws(() => calcularEdad('2026-02-30', '2026-10-25'));
  assert.throws(() => calcularEdad('2027-01-01', '2026-10-25'));
});

test('Redondea el importe a céntimos', () => {
  assert.equal(calcularTarifa(15, 99.99).total, 74.99);
});

test('Reconoce el cuadrado mágico normal de orden tres', () => {
  const resultado = verificarMatriz([
    [8, 1, 6],
    [3, 5, 7],
    [4, 9, 2]
  ]);
  assert.equal(resultado.esPerfecta, true);
  assert.equal(resultado.sumaObjetivo, 15);
});

test('Comprueba diagonales y números sin repetir', () => {
  assert.equal(
    verificarMatriz([
      [1, 5, 9],
      [6, 7, 2],
      [8, 3, 4]
    ]).esPerfecta,
    false
  );
  assert.equal(
    verificarMatriz([
      [5, 5, 5],
      [5, 5, 5],
      [5, 5, 5]
    ]).esPerfecta,
    false
  );
});

test('Genera una permutación cuadrada con valores del 1 al n²', () => {
  for (const dimension of [2, 3, 8]) {
    const matriz = generarMatriz(dimension);
    assert.equal(matriz.length, dimension);
    assert.ok(matriz.every((fila) => fila.length === dimension));
    assert.equal(new Set(matriz.flat()).size, dimension * dimension);
    assert.equal(Math.min(...matriz.flat()), 1);
    assert.equal(Math.max(...matriz.flat()), dimension * dimension);
  }
  assert.throws(() => generarMatriz(2.5));
  assert.throws(() => verificarMatriz([[1, 2], [3]]));
});

const usuario = {
  nombre: 'Ana Torres',
  direccion: 'Arequipa',
  correo: 'ANA@example.com',
  clave: 'Clave2026!',
  confirmacion: 'Clave2026!',
  fechaNacimiento: '2005-07-21',
  sexo: 'Mujer',
  temas: ['Ficción'],
  aficiones: ['Fotografía']
};

test('Valida el registro y normaliza el correo', () => {
  assert.equal(validarUsuario(usuario).correo, 'ana@example.com');
  assert.throws(() => validarUsuario({ ...usuario, correo: 'sin-correo' }));
  assert.throws(() => validarUsuario({ ...usuario, confirmacion: 'otra' }));
  assert.throws(() => validarUsuario({ ...usuario, temas: [] }));
  assert.throws(() => validarUsuario({ ...usuario, aficiones: ['Otra'] }));
});

test('La contraseña se deriva con una sal diferente en cada registro', async () => {
  const primero = await crearHash(usuario.clave);
  const segundo = await crearHash(usuario.clave);
  assert.notEqual(primero, usuario.clave);
  assert.notEqual(primero, segundo);
  assert.ok(primero.includes(':'));
});
