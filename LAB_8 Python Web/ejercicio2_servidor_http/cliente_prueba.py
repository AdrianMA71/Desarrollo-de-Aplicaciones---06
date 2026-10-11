import http.client
import json

from configuracion import HOST, PUERTO


def consultar(metodo, ruta):
    conexion = http.client.HTTPConnection(HOST, PUERTO)
    conexion.request(metodo, ruta)
    respuesta = conexion.getresponse()
    cuerpo = respuesta.read()
    tipo = respuesta.getheader("Content-Type")
    conexion.close()
    return respuesta.status, tipo, cuerpo


def resumir(tipo, cuerpo):
    if tipo is not None and tipo.startswith("application/json"):
        datos = json.loads(cuerpo.decode("utf-8"))

        if "error" in datos:
            return "error: " + datos["error"]

        paginacion = datos["paginacion"]
        productos = datos["datos"]

        texto = "página " + str(paginacion["pagina"])
        texto = texto + " de " + str(paginacion["total_paginas"])
        texto = texto + " | límite " + str(paginacion["limite"])
        texto = texto + " | registros " + str(paginacion["total_registros"])
        texto = texto + " | mostrados " + str(len(productos))

        if len(productos) > 0:
            primero = productos[0]["nombre"]
            ultimo = productos[len(productos) - 1]["nombre"]
            texto = texto + " (" + primero + " ... " + ultimo + ")"

        return texto

    return str(len(cuerpo)) + " bytes"


def mostrar(numero, titulo, metodo, ruta):
    estado, tipo, cuerpo = consultar(metodo, ruta)
    print(str(numero) + ". " + titulo)
    print("   Petición : " + metodo + " " + ruta)
    print("   Estado   : " + str(estado))
    print("   Tipo     : " + str(tipo))
    print("   Resumen  : " + resumir(tipo, cuerpo))
    print()


def ejecutar_pruebas():
    mostrar(1, "Página principal (HTML estático)", "GET", "/")
    mostrar(2, "Hoja de estilos (CSS estático)", "GET", "/estilos.css")
    mostrar(3, "Script (JS estático)", "GET", "/app.js")
    mostrar(4, "Archivo estático inexistente", "GET", "/noexiste.html")
    mostrar(5, "Path Traversal con ../", "GET", "/../configuracion.py")
    mostrar(6, "Path Traversal codificado (%2e%2e)", "GET", "/%2e%2e/configuracion.py")
    mostrar(7, "Path Traversal en varios niveles", "GET", "/css/../../servidor.py")
    mostrar(8, "Inventario sin parámetros", "GET", "/api/inventario")
    mostrar(9, "Paginación: limite=5 y pagina=2", "GET", "/api/inventario?limite=5&pagina=2")
    mostrar(10, "Filtro por texto: filtro=mouse", "GET", "/api/inventario?filtro=mouse")
    mostrar(11, "Límite máximo: limite=500", "GET", "/api/inventario?limite=500")
    mostrar(12, "Error de casting: limite=abc", "GET", "/api/inventario?limite=abc")
    mostrar(13, "Error de rango: pagina=0", "GET", "/api/inventario?pagina=0")
    mostrar(14, "Verbo no permitido", "POST", "/api/inventario")


if __name__ == "__main__":
    ejecutar_pruebas()
