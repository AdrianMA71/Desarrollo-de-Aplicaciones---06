import json
from http.server import BaseHTTPRequestHandler, HTTPServer

# Componente de Estado: Colección persistente mientras el proceso de Python esté vivo
coleccion_usuarios = [
    {"id": 100, "nombre": "Linus Torvalds", "perfil": "SysAdmin"}
]


class EnrutadorAPI(BaseHTTPRequestHandler):

    # Componente Auxiliar: Estandariza la emisión de estructuras JSON
    def emitir_json(self, codigo_http, datos_diccionario):
        # Serializa el diccionario de Python a string y lo codifica a bytes UTF-8
        payload = json.dumps(datos_diccionario).encode('utf-8')

        self.send_response(codigo_http)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    # Motor de Enrutamiento para Lectura (GET)
    def do_GET(self):
        # Condicional de enrutamiento basado en la URI (Endpoint)
        if self.path == '/api/usuarios':
            self.emitir_json(200, {"estado": "ok", "total": len(coleccion_usuarios), "datos": coleccion_usuarios})
        else:
            self.emitir_json(404, {"error": "Endpoint no mapeado en la API"})

    # Motor de Enrutamiento para Mutación/Creación (POST)
    def do_POST(self):
        if self.path == '/api/usuarios':
            # 1. Extracción de I/O Segura
            longitud = int(self.headers.get('Content-Length', 0))
            bytes_recibidos = self.rfile.read(longitud)

            # 2. Deserialización de los datos entrantes
            try:
                nuevo_registro = json.loads(bytes_recibidos.decode('utf-8'))

                # 3. Regla de Negocio: Generación de identificador único secuencial
                nuevo_registro['id'] = coleccion_usuarios[-1]['id'] + 1 if coleccion_usuarios else 1

                # 4. Mutación de la colección de estado
                coleccion_usuarios.append(nuevo_registro)

                # 5. Respuesta 201 Created según el estándar REST
                self.emitir_json(201, {"estado": "creado", "datos": nuevo_registro})

            except json.JSONDecodeError:
                self.emitir_json(400, {"error": "El cuerpo de la petición debe ser JSON válido."})
        else:
            self.emitir_json(404, {"error": "Endpoint no mapeado en la API"})


if __name__ == '__main__':
    servidor = HTTPServer(('127.0.0.1', 8000), EnrutadorAPI)
    print("API REST en http://127.0.0.1:8000/api/usuarios")
    servidor.serve_forever()
