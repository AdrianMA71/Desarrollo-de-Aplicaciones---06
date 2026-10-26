export function exigir(condicion, mensaje) {
  if (!condicion) {
    const error = new Error(mensaje);
    error.status = 400;
    throw error;
  }
}

export function texto(valor, campo, maximo) {
  exigir(typeof valor === 'string', `${campo} es obligatorio`);
  const resultado = valor.trim();
  exigir(resultado.length > 0, `${campo} es obligatorio`);
  exigir(resultado.length <= maximo, `${campo} es demasiado largo`);
  return resultado;
}

export function fechaValida(valor) {
  exigir(
    typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor),
    'La fecha no es válida'
  );
  const fecha = new Date(`${valor}T00:00:00Z`);
  exigir(!Number.isNaN(fecha.getTime()), 'La fecha no es válida');
  exigir(fecha.toISOString().slice(0, 10) === valor, 'La fecha no existe');
  return fecha;
}

export function hoy() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
}
