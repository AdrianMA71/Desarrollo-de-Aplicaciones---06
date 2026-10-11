from wsgiref.simple_server import make_server


# 1. Núcleo del Micro-Framework (Componente de Enrutamiento)
class NúcleoWSGI:
    def __init__(self):
        # Tabla Hash para resolución de endpoints O(1)
        self.mapa_enrutamiento = {}

    # Patrón Decorador para vincular URIs con Funciones Controladoras
    def registrar_endpoint(self, ruta_esperada):
        def envoltura_compilacion(funcion_controlador):
            # Asocia la función a la ruta en la memoria de la clase
            self.mapa_enrutamiento[ruta_esperada] = funcion_controlador
            return funcion_controlador
        return envoltura_compilacion

    # Despachador Dinámico (Dispatcher WSGI)
    def __call__(self, environ, start_response):
        ruta_solicitada = environ.get('PATH_INFO', '/')

        if ruta_solicitada in self.mapa_enrutamiento:
            # Ejecuta la función de negocio registrada
            respuesta_texto = self.mapa_enrutamiento[ruta_solicitada](environ)
            estado = '200 OK'
        else:
            respuesta_texto = "Error 404: Endpoint huérfano o no implementado."
            estado = '404 Not Found'

        payload = respuesta_texto.encode('utf-8')
        start_response(estado, [
            ('Content-Type', 'text/plain; charset=utf-8'),
            ('Content-Length', str(len(payload)))
        ])
        return [payload]


# 2. Implementación de Tareas Transversales (Middleware)
class MiddlewareAuditoria:
    def __init__(self, aplicacion_interior):
        # Almacena una referencia a la capa inferior (el Framework)
        self.aplicacion_interior = aplicacion_interior

    def __call__(self, environ, start_response):
        # Tarea previa a la ejecución (Filtro interceptor)
        verbo = environ.get('REQUEST_METHOD')
        uri = environ.get('PATH_INFO')
        print(f"[Capa de Seguridad] -> Intento de acceso: {verbo} a la ruta {uri}")

        # Delegación del control: La aplicación interna recibe la llamada sin saber que fue auditada
        return self.aplicacion_interior(environ, start_response)


# --- Instanciación y Uso (Developer Experience) ---
app = NúcleoWSGI()


@app.registrar_endpoint('/saludo')
def vista_saludo(environ):
    return "Micro-Framework funcionando mediante abstracción declarativa."


# Envolvimiento arquitectónico: El gateway llamará al middleware, y el middleware a la app
aplicacion_fortificada = MiddlewareAuditoria(app)

if __name__ == '__main__':
    servidor = make_server('127.0.0.1', 8080, aplicacion_fortificada)
    print("Micro-framework en http://127.0.0.1:8080/saludo")
    servidor.serve_forever()
