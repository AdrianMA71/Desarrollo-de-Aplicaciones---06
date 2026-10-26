import { exigir, texto, fechaValida, hoy } from './validacion.js';

export function calcularEdad(nacimiento, referencia) {
  const fechaNacimiento = fechaValida(nacimiento);
  const fechaReferencia = fechaValida(referencia);
  exigir(
    fechaNacimiento <= fechaReferencia,
    'El nacimiento no puede ser posterior a la fecha de referencia'
  );
  let edad =
    fechaReferencia.getUTCFullYear() - fechaNacimiento.getUTCFullYear();
  const mes = fechaReferencia.getUTCMonth() - fechaNacimiento.getUTCMonth();
  if (
    mes < 0 ||
    (mes === 0 && fechaReferencia.getUTCDate() < fechaNacimiento.getUTCDate())
  ) {
    edad = edad - 1;
  }
  return edad;
}

export function calcularTarifa(edad, precioBase) {
  let categoria = 'Adulto';
  let porcentaje = 100;
  if (edad < 2) {
    categoria = 'Infante';
    porcentaje = 0;
  } else if (edad < 18) {
    categoria = 'Menor';
    porcentaje = 75;
  }
  const centimos = Math.round(precioBase * 100);
  const total = Math.round((centimos * porcentaje) / 100) / 100;
  return { categoria, porcentaje, total };
}

export function prepararPasaje(datos) {
  const nombre = texto(datos.nombre, 'El nombre', 120);
  const destino = texto(datos.destino, 'El destino', 120);
  fechaValida(datos.fechaVuelo);
  exigir(
    datos.fechaVuelo >= hoy(),
    'La fecha del vuelo no puede estar en el pasado'
  );
  fechaValida(datos.fechaNacimiento);
  exigir(
    datos.fechaNacimiento <= hoy(),
    'El nacimiento no puede estar en el futuro'
  );
  const edad = calcularEdad(datos.fechaNacimiento, datos.fechaVuelo);
  const precioBase = Number(datos.precioBase);
  exigir(
    Number.isFinite(precioBase) &&
      precioBase > 0 &&
      precioBase <= 99999999.99,
    'El precio base debe ser mayor que cero y tener como máximo ocho cifras enteras'
  );
  exigir(
    Math.abs(precioBase * 100 - Math.round(precioBase * 100)) < 0.00001,
    'El precio admite como máximo dos decimales'
  );
  return {
    nombre,
    destino,
    fechaNacimiento: datos.fechaNacimiento,
    fechaVuelo: datos.fechaVuelo,
    edad,
    precioBase,
    ...calcularTarifa(edad, precioBase)
  };
}
