import json

ESTADOS_HTTP = {
    200: "200 OK",
    201: "201 Created",
    400: "400 Bad Request",
    401: "401 Unauthorized",
    404: "404 Not Found",
    405: "405 Method Not Allowed",
    413: "413 Payload Too Large",
    415: "415 Unsupported Media Type",
}


def construir_respuesta(start_response, codigo, datos, cabeceras_extra=None):
    texto_json = json.dumps(datos, ensure_ascii=False)
    cuerpo = texto_json.encode("utf-8")

    cabeceras = [
        ("Content-Type", "application/json; charset=utf-8"),
        ("Content-Length", str(len(cuerpo))),
    ]

    if cabeceras_extra is not None:
        cabeceras = cabeceras + cabeceras_extra

    start_response(ESTADOS_HTTP[codigo], cabeceras)
    return [cuerpo]
