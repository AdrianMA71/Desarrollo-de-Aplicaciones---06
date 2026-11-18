// Ejecutar con el servidor en marcha (npm run dev en otra terminal)
const { pedir } = require('./http');
 
const BASE = 'http://localhost:3000/api/libros';
 
async function main() {
  let r = await pedir('POST', BASE, { titulo: 'Los ríos profundos', autor: 'José María Arguedas' });
  const id = r.datos.id;
  console.log('POST válido ->', r.estado, 'id =', id);
 
  r = await pedir('POST', BASE, { titulo: 'Sin autor' });
  console.log('POST inválido ->', r.estado, r.datos.error);
 
  r = await pedir('PUT', `${BASE}/${id}`,
    { titulo: 'Los ríos profundos', autor: 'José María Arguedas', anio: 1958 });
  console.log('PUT ->', r.estado, 'anio =', r.datos.anio);
 
  r = await pedir('GET', BASE);
  console.log('GET lista ->', r.estado, r.datos.map((l) => l.titulo));
 
  r = await pedir('DELETE', `${BASE}/${id}`);
  console.log('DELETE ->', r.estado);
 
  r = await pedir('GET', `${BASE}/${id}`);
  console.log('GET eliminado ->', r.estado, r.datos.error);
}
 
main().catch((e) => console.error('Error:', e.message));
