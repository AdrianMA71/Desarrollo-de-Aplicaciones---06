import json


def enviar_json(manejador, codigo, datos, cabeceras_extra=None):
    texto_json = json.dumps(datos, ensure_ascii=False)
    cuerpo = texto_json.encode("utf-8")

    manejador.send_response(codigo)
    manejador.send_header("Content-Type", "application/json; charset=utf-8")
    manejador.send_header("Content-Length", str(len(cuerpo)))

    if cabeceras_extra is not None:
        for nombre, valor in cabeceras_extra:
            manejador.send_header(nombre, valor)

    manejador.end_headers()
    manejador.wfile.write(cuerpo)


def enviar_error(manejador, codigo, mensaje):
    enviar_json(manejador, codigo, {"error": mensaje})
