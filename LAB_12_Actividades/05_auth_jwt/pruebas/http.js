async function pedir(metodo, url, datos = null, token = null) {
  const headers = {};
  if (datos !== null) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;
  const respuesta = await fetch(url, {
    method: metodo,
    headers,
    body: datos === null ? undefined : JSON.stringify(datos),
  });
  const texto = await respuesta.text();
  return {
    estado: respuesta.status,
    datos: texto ? JSON.parse(texto) : null,
  };
}

module.exports = { pedir };
