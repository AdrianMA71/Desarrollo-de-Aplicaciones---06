const { pedir } = require('./http');
const BASE = 'http://localhost:3000/api/auth';
const usuario = {
  nombre: 'Lucía Quispe',
  email: 'lucia@biblioteca.pe',
  password: 'Lectura2026',
};

async function main() {
  let r = await pedir('POST', `${BASE}/registro`, usuario);
  console.log('Registro          ->', r.estado, r.datos);

  r = await pedir('POST', `${BASE}/registro`, usuario);
  console.log('Registro repetido ->', r.estado, r.datos.error);

  r = await pedir('POST', `${BASE}/registro`, {
    ...usuario, password: '123',
  });
  console.log('Registro inválido ->', r.estado, r.datos.error);

  r = await pedir('POST', `${BASE}/login`, {
    email: usuario.email, password: 'otraClave1',
  });
  console.log('Login incorrecto  ->', r.estado, r.datos.error);

  r = await pedir('POST', `${BASE}/login`, {
    email: usuario.email, password: usuario.password,
  });
  console.log('Login correcto    ->', r.estado, r.datos.tipo);
  if (!r.datos.token) throw new Error('El login no devolvió un token');
  console.log('Token:', r.datos.token.slice(0, 48) + '...');
  const [, payload] = r.datos.token.split('.');
  const contenido = JSON.parse(Buffer.from(payload,
    'base64url').toString('utf8'));
  console.log('Payload:', contenido);
  console.log('Vigencia:', contenido.exp - contenido.iat, 'segundos');
}
main().catch((err) => {
  console.error('Error:', err.message);
  process.exitCode = 1;
});
