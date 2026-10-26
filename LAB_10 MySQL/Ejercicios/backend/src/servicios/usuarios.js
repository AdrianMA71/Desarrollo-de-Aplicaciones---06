import { randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { exigir, texto, fechaValida, hoy } from './validacion.js';

export const temasPermitidos = [
  'Ficción',
  'Terror',
  'Acción',
  'Comedia',
  'Suspense'
];
export const aficionesPermitidas = [
  'Deporte al aire libre',
  'Música pop',
  'Fotografía',
  'Lectura',
  'Videojuegos'
];

export function validarUsuario(datos) {
  const nombre = texto(datos.nombre, 'El nombre completo', 120);
  const direccion = texto(datos.direccion, 'La dirección', 250);
  const correo = texto(datos.correo, 'El correo', 160).toLowerCase();
  exigir(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo),
    'El correo no tiene un formato válido'
  );
  exigir(
    typeof datos.clave === 'string' &&
      datos.clave.length >= 8 &&
      datos.clave.length <= 128,
    'La contraseña debe tener entre 8 y 128 caracteres'
  );
  exigir(datos.clave === datos.confirmacion, 'Las contraseñas no coinciden');
  fechaValida(datos.fechaNacimiento);
  exigir(
    datos.fechaNacimiento <= hoy(),
    'La fecha de nacimiento no puede estar en el futuro'
  );
  exigir(['Hombre', 'Mujer'].includes(datos.sexo), 'Selecciona el sexo');
  exigir(
    Array.isArray(datos.temas) &&
      datos.temas.length > 0 &&
      datos.temas.every((tema) => temasPermitidos.includes(tema)),
    'Selecciona al menos un tema válido'
  );
  exigir(
    Array.isArray(datos.aficiones) &&
      datos.aficiones.length > 0 &&
      datos.aficiones.every((aficion) =>
        aficionesPermitidas.includes(aficion)
      ),
    'Selecciona al menos una afición válida'
  );
  return {
    nombre,
    direccion,
    correo,
    fechaNacimiento: datos.fechaNacimiento,
    sexo: datos.sexo,
    temas: [...new Set(datos.temas)],
    aficiones: [...new Set(datos.aficiones)]
  };
}

export async function crearHash(clave) {
  const sal = randomBytes(16).toString('hex');
  const derivar = promisify(scrypt);
  const resultado = await derivar(clave, sal, 64);
  return `${sal}:${resultado.toString('hex')}`;
}
