import os
import mimetypes
from http.server import BaseHTTPRequestHandler, HTTPServer


class ServidorEstaticoFortificado(BaseHTTPRequestHandler):
    def do_GET(self):
        # 1. Definición estricta de la "Jaula" (Directorio Público Permitido)
        directorio_base = os.getcwd()

        # Se elimina el '/' inicial para evitar que el OS lo interprete como la raíz del disco duro
        ruta_cruda = self.path.lstrip('/')
        if not ruta_cruda:
            ruta_cruda = 'index.html'

        # 2. Motor de Sanitización (Prevención Path Traversal)
        # os.path.abspath calcula la ruta matemática final, colapsando cualquier salto malicioso "../"
        ruta_resuelta = os.path.abspath(os.path.join(directorio_base, ruta_cruda))

        # 3. Validación de Fronteras Perimetrales
        # Se verifica que la ruta resultante comience obligatoriamente con el path de nuestro directorio base
        if not ruta_resuelta.startswith(directorio_base) or not os.path.isfile(ruta_resuelta):
            self.send_error(404, "Recurso no encontrado o acceso estrictamente denegado.")
            return

        # 4. Inferencia Dinámica de Metadatos (MIME)
        # Escanea la extensión del archivo (ej. .css) y devuelve 'text/css'
        tipo_mime, _ = mimetypes.guess_type(ruta_resuelta)

        # 5. Transmisión del Flujo Binario
        try:
            # Se abre el archivo exclusivamente en lectura binaria ('rb')
            with open(ruta_resuelta, 'rb') as archivo_fisico:
                contenido = archivo_fisico.read()

            # Protocolo de respuesta HTTP
            self.send_response(200)
            self.send_header('Content-Type', tipo_mime or 'application/octet-stream')
            self.send_header('Content-Length', str(len(contenido)))
            self.end_headers()

            # Inyección de los bytes hacia la tubería TCP conectada al cliente
            self.wfile.write(contenido)
        except IOError:
            self.send_error(500, "Error del sistema al intentar acceder al archivo físico.")


# Bloque de ejecución (descomentar para usar)
# servidor = HTTPServer(('localhost', 8000), ServidorEstaticoFortificado)
# servidor.serve_forever()

if __name__ == '__main__':
    servidor = HTTPServer(('localhost', 8000), ServidorEstaticoFortificado)
    print("Servidor estático en http://localhost:8000")
    servidor.serve_forever()
