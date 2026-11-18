// Función auxiliar para consumir la API con fetch
async function pedir(metodo, url, cuerpo = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const respuesta = await fetch(url, {
    method: metodo,
    headers,
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  const texto = await respuesta.text();
  return { estado: respuesta.status, datos: texto ? JSON.parse(texto) : null };
}
 
module.exports = { pedir };
