from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from busqueda.motor import buscar
from busqueda.parametros import leer_parametros
from comun.excepciones import ErrorSolicitud
from comun.respuestas import enviar_error, enviar_json
from configuracion import RUTA_INVENTARIO
from estaticos.gestor import obtener_recurso


class ManejadorPeticiones(BaseHTTPRequestHandler):
    def do_GET(self):
        direccion = urlparse(self.path)

        try:
            if direccion.path == RUTA_INVENTARIO:
                self.responder_inventario(direccion.query)
            else:
                self.responder_estatico(direccion.path)
        except ErrorSolicitud as error:
            enviar_error(self, error.codigo, error.mensaje)

    def responder_inventario(self, query_string):
        parametros = leer_parametros(query_string)
        resultado = buscar(parametros)
        enviar_json(self, 200, resultado)

    def responder_estatico(self, ruta):
        contenido, tipo_contenido = obtener_recurso(ruta)

        self.send_response(200)
        self.send_header("Content-Type", tipo_contenido)
        self.send_header("Content-Length", str(len(contenido)))
        self.end_headers()
        self.wfile.write(contenido)

    def metodo_no_permitido(self):
        cabeceras = [("Allow", "GET")]
        enviar_json(self, 405, {"error": "Método no permitido"}, cabeceras)

    def do_POST(self):
        self.metodo_no_permitido()

    def do_PUT(self):
        self.metodo_no_permitido()

    def do_DELETE(self):
        self.metodo_no_permitido()
