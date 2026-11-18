require('dotenv').config();
const jwt = require('jsonwebtoken');
const { pedir } = require('./http');
const API = 'http://localhost:3000/api';
const nuevo = {
  titulo: 'El zorro de arriba y el zorro de abajo',
  autor: 'José María Arguedas', anio: 1971,
};

async function iniciarSesion(email, password) {
  const r = await pedir('POST', `${API}/auth/login`, { email, password });
  if (r.estado !== 200 || !r.datos.token) {
    throw new Error(`No se pudo iniciar sesión como ${email}`);
  }
  return r.datos.token;
}

async function main() {
  let r = await pedir('GET', `${API}/libros`);
  console.log('GET público       ->', r.estado, r.datos.length, 'libros');

  r = await pedir('POST', `${API}/libros`, nuevo);
  console.log('POST sin token    ->', r.estado, r.datos.error);
  r = await pedir('POST', `${API}/libros`, nuevo, 'abc.def.ghi');
  console.log('POST token falso  ->', r.estado, r.datos.error);

  const expirado = jwt.sign({ sub: '1', rol: 'lector' },
    process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: -1 });
  r = await pedir('POST', `${API}/libros`, nuevo, expirado);
  console.log('POST expirado     ->', r.estado, r.datos.error);

  const lector = await iniciarSesion('lucia@biblioteca.pe', 'Lectura2026');
  r = await pedir('POST', `${API}/libros`, nuevo, lector);
  console.log('POST como lector  ->', r.estado, r.datos.error);
  const admin = await iniciarSesion('admin@biblioteca.pe', 'Admin#2026');
  r = await pedir('POST', `${API}/libros`, nuevo, admin);
  if (r.estado !== 201) throw new Error('El administrador no pudo crear');
  const id = r.datos.id;
  console.log('POST como admin   ->', r.estado, 'id =', id);

  try {
    r = await pedir('PUT', `${API}/libros/${id}`, nuevo, lector);
    console.log('PUT como lector   ->', r.estado, r.datos.error);
    r = await pedir('DELETE', `${API}/libros/${id}`, null, lector);
    console.log('DELETE lector     ->', r.estado, r.datos.error);

    r = await pedir('PUT', `${API}/libros/${id}`, {
      ...nuevo, anio: 1972,
    }, admin);
    console.log('PUT como admin    ->', r.estado, 'anio =', r.datos.anio);
  } finally {
    r = await pedir('DELETE', `${API}/libros/${id}`, null, admin);
    console.log('DELETE como admin ->', r.estado);
  }

  r = await pedir('GET', `${API}/auth/perfil`, null, lector);
  console.log('Perfil del lector ->', r.estado, r.datos.nombre,
    '-', r.datos.rol);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exitCode = 1;
});
