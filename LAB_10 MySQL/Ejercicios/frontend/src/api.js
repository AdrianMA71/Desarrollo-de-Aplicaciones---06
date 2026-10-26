export async function solicitar(ruta, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`/api${ruta}`, opciones);
  } catch {
    throw new Error('No se pudo conectar con el servidor');
  }
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(datos.mensaje || 'La operación no se pudo completar');
  }
  return datos;
}

export function enviar(ruta, datos) {
  return solicitar(ruta, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
}
