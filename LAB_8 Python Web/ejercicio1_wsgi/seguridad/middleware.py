import hmac

from comun.respuestas import construir_respuesta


class MiddlewareTokenSeguridad:
    def __init__(self, aplicacion, token_valido):
        self.aplicacion = aplicacion
        self.token_valido = token_valido

    def __call__(self, environ, start_response):
        token_recibido = environ.get("HTTP_AUTHORIZATION")

        if token_recibido is None:
            return self.rechazar(start_response, "Falta la cabecera Authorization")

        if not self.token_es_valido(token_recibido):
            return self.rechazar(start_response, "Token de autorización inválido")

        return self.aplicacion(environ, start_response)

    def token_es_valido(self, token_recibido):
        recibido = token_recibido.encode("utf-8")
        esperado = self.token_valido.encode("utf-8")
        return hmac.compare_digest(recibido, esperado)

    def rechazar(self, start_response, mensaje):
        datos = {"error": mensaje}
        cabeceras = [("WWW-Authenticate", "Bearer")]
        return construir_respuesta(start_response, 401, datos, cabeceras)
