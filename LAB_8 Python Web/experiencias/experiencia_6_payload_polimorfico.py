import json
from urllib.parse import parse_qs
from wsgiref.simple_server import make_server


def endpoint_recepcion_estricta(environ, start_response):
    # Control perimetral de Verbos de Transacción
    if environ.get('REQUEST_METHOD') not in ['POST', 'PUT']:
        start_response('405 Method Not Allowed', [('Content-Type', 'application/json')])
        return [b'{"error": "Metodo transaccional bloqueado"}']

    # 1. Prevención de Bloqueos de Socket (Hang-ups) mediante cuotas de longitud
    tamano_buffer = int(environ.get('CONTENT_LENGTH', '0') or '0')
    if tamano_buffer == 0:
        start_response('400 Bad Request', [('Content-Type', 'application/json')])
        return [b'{"error": "Rechazo: Payload vacio (Zero Bytes)"}']

    cuerpo_bytes = environ['wsgi.input'].read(tamano_buffer)
    metadato_formato = environ.get('CONTENT_TYPE', '')

    # 2. Deserialización Polimórfica
    try:
        if 'application/json' in metadato_formato:
            # Estrategia de ingesta API moderna
            dto_diccionario = json.loads(cuerpo_bytes.decode('utf-8'))

        elif 'application/x-www-form-urlencoded' in metadato_formato:
            # Estrategia de ingesta HTML Legacy
            diccionario_listas = parse_qs(cuerpo_bytes.decode('utf-8'))
            dto_diccionario = {k: v[0] for k, v in diccionario_listas.items()}

        else:
            start_response('415 Unsupported Media Type', [('Content-Type', 'application/json')])
            return [b'{"error": "El servidor exige formatos JSON o URL-Encoded"}']

    except (json.JSONDecodeError, ValueError):
        start_response('400 Bad Request', [('Content-Type', 'application/json')])
        return [b'{"error": "Corrupcion detectada en el formato de transferencia"}']

    # 3. Validación Mandatoria de Esquemas (Contrato de Datos)
    # Se audita que las llaves obligatorias existan independientemente del formato de origen
    llaves_obligatorias = {'identificador', 'token_operacion', 'comando'}

    # Resta de conjuntos (Sets): Si hay alguna llave del contrato que NO esté en las recibidas, rechaza.
    llaves_faltantes = llaves_obligatorias - dto_diccionario.keys()
    if llaves_faltantes:
        start_response('400 Bad Request', [('Content-Type', 'application/json')])
        mensaje = f'{{"error": "Violación del esquema. Faltan propiedades: {list(llaves_faltantes)}"}}'
        return [mensaje.encode('utf-8')]

    # Finalización con Éxito Estructural
    respuesta_ok = json.dumps({"estado": "Payload estandarizado y auditado exitosamente", "datos": dto_diccionario})
    start_response('200 OK', [
        ('Content-Type', 'application/json'),
        ('Content-Length', str(len(respuesta_ok.encode('utf-8'))))
    ])
    return [respuesta_ok.encode('utf-8')]


if __name__ == '__main__':
    servidor = make_server('127.0.0.1', 8080, endpoint_recepcion_estricta)
    print("Receptor de payloads en http://127.0.0.1:8080")
    servidor.serve_forever()
