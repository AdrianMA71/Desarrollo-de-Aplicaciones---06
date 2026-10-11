from comun.excepciones import ErrorPeticion
from comun.respuestas import construir_respuesta
from configuracion import METODO_PERMITIDO, RUTA_INSCRIPCIONES
from ingesta.analizador import analizar_cuerpo
from ingesta.lectura import leer_cuerpo
from validacion.esquema import validar_esquema


def verificar_ruta_y_metodo(environ):
    ruta = environ.get("PATH_INFO", "")
    metodo = environ.get("REQUEST_METHOD", "")

    if ruta != RUTA_INSCRIPCIONES:
        raise ErrorPeticion(404, "Ruta no encontrada: " + ruta)

    if metodo != METODO_PERMITIDO:
        cabeceras = [("Allow", METODO_PERMITIDO)]
        raise ErrorPeticion(405, "Método no permitido: " + metodo, cabeceras)


def aplicacion_inscripciones(environ, start_response):
    try:
        verificar_ruta_y_metodo(environ)
        cuerpo = leer_cuerpo(environ)
        datos = analizar_cuerpo(environ, cuerpo)
        validar_esquema(datos)
    except ErrorPeticion as error:
        datos_error = {"error": error.mensaje}
        return construir_respuesta(start_response, error.codigo, datos_error, error.cabeceras)

    respuesta = {"mensaje": "Inscripción registrada correctamente", "datos": datos}
    return construir_respuesta(start_response, 201, respuesta)
