require('dotenv').config({quiet: true});
const jwt = require('jsonwebtoken');
const { randomUUID } = require('node:crypto');
const {pedir, comprobar, assert} = require('./http');
const auth = '/api/auth';
const notas = '/api/notas/mis-notas';

async function login(email, password, etiqueta) {
  const r = await pedir('POST', auth + '/login', {email, password});
  comprobar(etiqueta, r, 200);
  assert.equal(r.datos.expiraEn, 1800);
  const payload = jwt.decode(r.datos.token);
  assert.equal(payload.exp - payload.iat, 1800);
  return r.datos.token;
}
async function main() {
  const clave = process.env.LAB_PASSWORD;
  if (!clave) throw new Error('Configura LAB_PASSWORD y prepara las cuentas');
  const marca = randomUUID().slice(0, 8);
  const password = randomUUID();
  const emailA = 'a-' + marca + '@matricula.test';
  const emailB = 'b-' + marca + '@matricula.test';
  const a = await pedir('POST', auth + '/registro', {nombre: 'Estudiante A', email: emailA, password, rol: 'admin'});
  comprobar('Registro estudiante A', a, 201);
  assert.equal(a.datos.rol, 'estudiante');
  const b = await pedir('POST', auth + '/registro', {nombre: 'Estudiante B', email: emailB, password});
  comprobar('Registro estudiante B', b, 201);
  const admin = await login('admin@matricula.test', clave, 'Login admin');
  const docente = await login('docente@matricula.test', clave, 'Login docente');
  const tokenA = await login(emailA, password, 'Login estudiante A');
  const tokenB = await login(emailB, password, 'Login estudiante B');
  const perfil = await pedir('GET', auth + '/perfil', undefined, docente);
  comprobar('Perfil docente', perfil, 200);
  assert.equal(perfil.datos.rol, 'docente');
  console.log('Vigencia comprobada:', 1800, 'segundos');
  const curso = {nombre: 'Desarrollo de Aplicaciones ' + marca, docente_id: perfil.datos.id};
  comprobar('Estudiante no crea cursos', await pedir('POST', '/api/cursos', curso, tokenA), 403);
  const alta = await pedir('POST', '/api/cursos', curso, admin);
  comprobar('Admin crea curso', alta, 201);
  const curso_id = alta.datos.id;
  for (const alumno of [a, b]) {
    const estudiante_id = alumno.datos.id;
    comprobar('Admin matricula', await pedir('POST', '/api/matriculas', {curso_id, estudiante_id}, admin), 201);
    const dato = {curso_id, estudiante_id, nota: alumno === a ? 17 : 14};
    comprobar('Admin no registra nota', await pedir('POST', '/api/notas', dato, admin), 403);
    comprobar('Docente registra nota', await pedir('POST', '/api/notas', dato, docente), 201);
  }
  const resA = await pedir('GET', notas, undefined, tokenA);
  const resB = await pedir('GET', notas, undefined, tokenB);
  comprobar('Notas propias A', resA, 200);
  comprobar('Notas propias B', resB, 200);
  assert.deepEqual(resA.datos.map(n => [n.estudiante_id, n.nota]), [[a.datos.id, 17]]);
  assert.deepEqual(resB.datos.map(n => [n.estudiante_id, n.nota]), [[b.datos.id, 14]]);
  console.log('A recibe 17 y B recibe 14; cada consulta devuelve un estudiante distinto');
  comprobar('ID ajeno en query rechazado', await pedir('GET', notas + '?estudiante_id=' + b.datos.id, undefined, tokenA), 400);
  comprobar('Docente no consulta notas de estudiante', await pedir('GET', notas, undefined, docente), 403);

  const endpoint = auth + '/perfil';
  comprobar('Sin token', await pedir('GET', endpoint), 401);
  const invalido = await pedir('GET', endpoint, undefined, 'token-invalido');
  comprobar('Token inválido', invalido, 401);
  assert.equal(invalido.datos.error, 'Token inválido');
  const expirado = jwt.sign({}, process.env.JWT_SECRET, {
    subject: String(a.datos.id), algorithm: 'HS256', audience: 'lab12-matricula', expiresIn: -1
  });
  const vencido = await pedir('GET', endpoint, undefined, expirado);
  comprobar('Token expirado', vencido, 401);
  assert.equal(vencido.datos.error, 'Token expirado');

  const nueva = randomUUID();
  const url = auth + '/password';
  comprobar('Contraseña actual incorrecta', await pedir('PUT', url, {actual: randomUUID(), nueva}, tokenA), 401);
  comprobar('Cambio de contraseña', await pedir('PUT', url, {actual: password, nueva}, tokenA), 200);
  comprobar('Login con contraseña anterior', await pedir('POST', auth + '/login', {email: emailA, password}), 401);
  await login(emailA, nueva, 'Login con contraseña nueva');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
