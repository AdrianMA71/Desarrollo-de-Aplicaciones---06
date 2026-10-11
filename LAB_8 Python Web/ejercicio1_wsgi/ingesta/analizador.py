import json
from urllib.parse import parse_qs

from comun.excepciones import ErrorPeticion


def decodificar_texto(cuerpo):
    try:
        return cuerpo.decode("utf-8")
    except UnicodeDecodeError:
        raise ErrorPeticion(400, "El cuerpo no está codificado en UTF-8")


def analizar_json(cuerpo):
    texto = decodificar_texto(cuerpo)

    try:
        datos = json.loads(texto)
    except json.JSONDecodeError:
        raise ErrorPeticion(400, "El cuerpo JSON está mal formado")

    if not isinstance(datos, dict):
        raise ErrorPeticion(400, "El JSON debe ser un objeto con pares clave-valor")

    return datos


def analizar_formulario(cuerpo):
    texto = decodificar_texto(cuerpo)
    pares = parse_qs(texto)
    datos = {clave: valores[0] for clave, valores in pares.items()}
    return datos


ANALIZADORES = {
    "application/json": analizar_json,
    "application/x-www-form-urlencoded": analizar_formulario,
}


def obtener_tipo_contenido(environ):
    cabecera = environ.get("CONTENT_TYPE", "")
    partes = cabecera.split(";")
    return partes[0].strip().lower()


def analizar_cuerpo(environ, cuerpo):
    tipo = obtener_tipo_contenido(environ)

    if tipo == "":
        raise ErrorPeticion(415, "Falta la cabecera Content-Type")

    analizador = ANALIZADORES.get(tipo)

    if analizador is None:
        raise ErrorPeticion(415, "Tipo de contenido no soportado: " + tipo)

    return analizador(cuerpo)
