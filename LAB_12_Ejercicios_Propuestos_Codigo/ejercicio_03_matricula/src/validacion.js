function claveValida(clave) {
  return typeof clave === 'string' && clave.length >= 8 &&
    Buffer.byteLength(clave, 'utf8') <= 72;
}
function correoValido(correo) {
  return typeof correo === 'string' && correo.length <= 120 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}
function textoValido(texto, maximo) {
  return typeof texto === 'string' && texto.trim().length > 0 &&
    texto.trim().length <= maximo;
}
function idValido(id) {
  return Number.isSafeInteger(id) && id > 0 && id <= 4294967295;
}
module.exports = {claveValida, correoValido, textoValido, idValido};
