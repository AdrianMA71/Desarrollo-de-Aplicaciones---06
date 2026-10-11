import json
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from configuracion import HOST, PUERTO, TOKEN_VALIDO

URL_BASE = "http://" + HOST + ":" + str(PUERTO)
RUTA = "/api/inscripciones"

DATOS_VALIDOS = {
    "dni": "45871236",
    "correo_electronico": "aspirante@ucsm.edu.pe",
    "programa_academico": "Ingeniería de Sistemas",
}


def enviar(metodo, ruta, cabeceras, cuerpo):
    peticion = Request(URL_BASE + ruta, data=cuerpo, headers=cabeceras, method=metodo)

    try:
        respuesta = urlopen(peticion)
        codigo = respuesta.status
        texto = respuesta.read().decode("utf-8")
    except HTTPError as error:
        codigo = error.code
        texto = error.read().decode("utf-8")

    return codigo, texto


def mostrar(numero, titulo, resultado):
    codigo, texto = resultado
    print(str(numero) + ". " + titulo)
    print("   Estado   : " + str(codigo))
    print("   Respuesta: " + texto)
    print()


def cabeceras_json(con_token):
    cabeceras = {"Content-Type": "application/json"}
    if con_token:
        cabeceras["Authorization"] = TOKEN_VALIDO
    return cabeceras


def cabeceras_formulario():
    return {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": TOKEN_VALIDO,
    }


def cuerpo_json(datos):
    return json.dumps(datos).encode("utf-8")


def cuerpo_formulario(datos):
    return urlencode(datos).encode("utf-8")


def ejecutar_pruebas():
    cuerpo_valido = cuerpo_json(DATOS_VALIDOS)

    resultado = enviar("POST", RUTA, cabeceras_json(False), cuerpo_valido)
    mostrar(1, "POST sin cabecera Authorization", resultado)

    cabeceras = cabeceras_json(False)
    cabeceras["Authorization"] = "Bearer TOKEN_FALSO"
    resultado = enviar("POST", RUTA, cabeceras, cuerpo_valido)
    mostrar(2, "POST con token incorrecto", resultado)

    resultado = enviar("GET", RUTA, cabeceras_json(True), None)
    mostrar(3, "GET en /api/inscripciones (verbo no permitido)", resultado)

    resultado = enviar("POST", "/api/otra-ruta", cabeceras_json(True), cuerpo_valido)
    mostrar(4, "POST en una ruta inexistente", resultado)

    resultado = enviar("POST", RUTA, cabeceras_json(True), cuerpo_valido)
    mostrar(5, "POST application/json con datos completos", resultado)

    resultado = enviar("POST", RUTA, cabeceras_formulario(), cuerpo_formulario(DATOS_VALIDOS))
    mostrar(6, "POST x-www-form-urlencoded con datos completos", resultado)

    datos_sin_dni = dict(DATOS_VALIDOS)
    del datos_sin_dni["dni"]
    resultado = enviar("POST", RUTA, cabeceras_json(True), cuerpo_json(datos_sin_dni))
    mostrar(7, "POST JSON sin el campo dni", resultado)

    datos_sin_correo = dict(DATOS_VALIDOS)
    del datos_sin_correo["correo_electronico"]
    resultado = enviar("POST", RUTA, cabeceras_formulario(), cuerpo_formulario(datos_sin_correo))
    mostrar(8, "POST formulario sin el campo correo_electronico", resultado)

    resultado = enviar("POST", RUTA, cabeceras_json(True), b'{"dni": ')
    mostrar(9, "POST con JSON mal formado", resultado)

    cabeceras = cabeceras_json(True)
    cabeceras["Content-Type"] = "text/plain"
    resultado = enviar("POST", RUTA, cabeceras, b"dni=45871236")
    mostrar(10, "POST con Content-Type no soportado", resultado)


if __name__ == "__main__":
    ejecutar_pruebas()
