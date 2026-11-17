const assert = require('node:assert/strict');
const API = (process.env.API_URL || 'http://localhost:3000').replace(/\/$/, '');
async function pedir(metodo, ruta, cuerpo, token) {
  const headers = {};
  if (cuerpo !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = 'Bearer ' + token;
  const r = await fetch(API + ruta, { method: metodo, headers, body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo) });
  const texto = await r.text();
  return { estado: r.status, datos: texto ? JSON.parse(texto) : null };
}
function comprobar(nombre, resultado, esperado) {
  console.log(nombre + ' -> HTTP ' + resultado.estado + ' (esperado ' + esperado + ')');
  assert.equal(resultado.estado, esperado, nombre + ': ' + JSON.stringify(resultado.datos));
}
module.exports = { pedir, comprobar, assert };
