from http.server import ThreadingHTTPServer

from configuracion import DIRECTORIO_PUBLICO, HOST, PUERTO
from manejador.peticiones import ManejadorPeticiones


def iniciar_servidor():
    servidor = ThreadingHTTPServer((HOST, PUERTO), ManejadorPeticiones)

    print("Servidor HTTP escuchando en http://" + HOST + ":" + str(PUERTO))
    print("Directorio público: " + DIRECTORIO_PUBLICO)
    print("API disponible: GET /api/inventario")
    print("Presione Ctrl+C para detener el servidor")

    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("Servidor detenido")
    finally:
        servidor.server_close()


if __name__ == "__main__":
    iniciar_servidor()
