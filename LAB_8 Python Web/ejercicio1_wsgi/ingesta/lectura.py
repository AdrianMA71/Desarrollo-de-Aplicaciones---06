from comun.excepciones import ErrorPeticion
from configuracion import TAMANO_MAXIMO_CUERPO


def obtener_longitud(environ):
    texto = environ.get("CONTENT_LENGTH", "")

    if texto.strip() == "":
        return 0

    try:
        longitud = int(texto)
    except ValueError:
        raise ErrorPeticion(400, "CONTENT_LENGTH no es un número entero válido")

    if longitud < 0:
        raise ErrorPeticion(400, "CONTENT_LENGTH no puede ser negativo")

    if longitud > TAMANO_MAXIMO_CUERPO:
        raise ErrorPeticion(413, "El cuerpo de la petición supera el tamaño permitido")

    return longitud


def leer_cuerpo(environ):
    longitud = obtener_longitud(environ)

    if longitud == 0:
        return b""

    flujo = environ["wsgi.input"]
    return flujo.read(longitud)
