import json
from wsgiref.simple_server import make_server


# Contrato Callable de WSGI: Función que acepta el diccionario y el callback
def inspector_entorno_wsgi(environ, start_response):

    # 1. Filtro Inteligente de Variables (Reflection)
    # El diccionario environ contiene flujos binarios (wsgi.input) u objetos de error irrompibles.
    # Iteramos y filtramos para capturar exclusivamente las variables textuales configuradas por el Gateway
    entorno_legible = {}
    for clave, valor in environ.items():
        if isinstance(valor, str):
            entorno_legible[clave] = valor

    # 2. Formateo y Serialización
    # Convertimos el diccionario a un texto JSON, usando 'indent' para legibilidad humana en el navegador
    texto_diagnostico = json.dumps(entorno_legible, indent=4)
    cuerpo_bytes = texto_diagnostico.encode('utf-8')

    # 3. Protocolo de Inicio (Callback)
    # Determinamos que la salida será texto plano estructurado en JSON
    start_response('200 OK', [
        ('Content-Type', 'application/json; charset=utf-8'),
        ('Content-Length', str(len(cuerpo_bytes)))
    ])

    # 4. Retorno del iterable (Cumplimiento de la norma)
    return [cuerpo_bytes]


# Levantamiento del servidor de diagnóstico
# servidor_diagnostico = make_server('127.0.0.1', 8080, inspector_entorno_wsgi)
# servidor_diagnostico.serve_forever()

if __name__ == '__main__':
    servidor_diagnostico = make_server('127.0.0.1', 8080, inspector_entorno_wsgi)
    print("Inspector WSGI en http://127.0.0.1:8080")
    servidor_diagnostico.serve_forever()
