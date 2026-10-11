from wsgiref.simple_server import make_server

from aplicacion.inscripciones import aplicacion_inscripciones
from configuracion import HOST, PUERTO, TOKEN_VALIDO
from seguridad.middleware import MiddlewareTokenSeguridad


def crear_aplicacion_protegida():
    return MiddlewareTokenSeguridad(aplicacion_inscripciones, TOKEN_VALIDO)


def iniciar_servidor():
    aplicacion_protegida = crear_aplicacion_protegida()

    with make_server(HOST, PUERTO, aplicacion_protegida) as servidor:
        print("Servidor WSGI escuchando en http://" + HOST + ":" + str(PUERTO))
        print("Endpoint disponible: POST /api/inscripciones")
        print("Presione Ctrl+C para detener el servidor")

        try:
            servidor.serve_forever()
        except KeyboardInterrupt:
            print("Servidor detenido")


if __name__ == "__main__":
    iniciar_servidor()
