import mimetypes
import os
from urllib.parse import unquote

from comun.excepciones import ErrorSolicitud
from configuracion import DIRECTORIO_PUBLICO


def limpiar_ruta_url(ruta_url):
    ruta = unquote(ruta_url)

    if ruta == "/":
        ruta = "/index.html"

    return ruta.lstrip("/")


def calcular_ruta_absoluta(ruta_relativa):
    ruta_unida = os.path.join(DIRECTORIO_PUBLICO, ruta_relativa)
    return os.path.abspath(ruta_unida)


def esta_dentro_del_directorio_publico(ruta_absoluta):
    prefijo = DIRECTORIO_PUBLICO + os.sep
    return ruta_absoluta.startswith(prefijo)


def obtener_tipo_contenido(ruta_absoluta):
    tipo, codificacion = mimetypes.guess_type(ruta_absoluta)

    if tipo is None:
        return "application/octet-stream"

    return tipo


def leer_archivo(ruta_absoluta):
    with open(ruta_absoluta, "rb") as archivo:
        return archivo.read()


def obtener_recurso(ruta_url):
    ruta_relativa = limpiar_ruta_url(ruta_url)
    ruta_absoluta = calcular_ruta_absoluta(ruta_relativa)

    if not esta_dentro_del_directorio_publico(ruta_absoluta):
        raise ErrorSolicitud(403, "Acceso denegado a la ruta solicitada")

    if not os.path.isfile(ruta_absoluta):
        raise ErrorSolicitud(404, "Recurso no encontrado")

    contenido = leer_archivo(ruta_absoluta)
    tipo_contenido = obtener_tipo_contenido(ruta_absoluta)

    return contenido, tipo_contenido
