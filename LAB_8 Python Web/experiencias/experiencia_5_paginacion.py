import json
from urllib.parse import parse_qs
from wsgiref.simple_server import make_server

# Simulación de una Colección SQL/NoSQL gigante
base_de_datos = [{"id": i, "articulo": f"Item {i}", "valor": i*10} for i in range(1, 101)]


def endpoint_inventario_paginado(environ, start_response):
    # 1. Extracción Cruda de las variables de la URI (ej. limite=15&pagina=2)
    cadena_consulta = environ.get('QUERY_STRING', '')

    # 2. Descomposición Inteligente a Diccionario con arreglos implícitos
    parametros_url = parse_qs(cadena_consulta)

    try:
        # 3. Conversión de Tipos (Type Casting) y Valores Base Lógicos
        # Extraemos el primer [0] valor de la lista retornada por parse_qs, e intentamos castearlo a Entero
        limite_elementos = int(parametros_url.get('limite', ['10'])[0])
        pagina_actual = int(parametros_url.get('pagina', ['1'])[0])
    except ValueError:
        # Fail-fast: Si envían "?pagina=tres", cortamos la ejecución por incompatibilidad aritmética
        estado, cuerpo = '400 Bad Request', {"error": "Paginación exige numéricos"}
    else:
        # 4. Políticas de Seguridad (Hard Limits contra Denegación de Servicio)
        if limite_elementos > 50:
            limite_elementos = 50  # Tope máximo imperativo dictado por negocio

        # 5. Algoritmo Offset/Limit de Desplazamiento Lineal
        indice_desplazamiento = (pagina_actual - 1) * limite_elementos
        indice_corte = indice_desplazamiento + limite_elementos

        # Slicing sobre la lista en memoria (Simula la query OFFSET de SQL)
        datos_cortados = base_de_datos[indice_desplazamiento:indice_corte]

        estado = '200 OK'
        cuerpo = {
            "meta": {"pagina": pagina_actual, "limite_real": limite_elementos, "total_items": len(base_de_datos)},
            "registros": datos_cortados
        }

    # Salida binaria universal
    payload = json.dumps(cuerpo).encode('utf-8')
    start_response(estado, [
        ('Content-Type', 'application/json'),
        ('Content-Length', str(len(payload)))
    ])
    return [payload]


if __name__ == '__main__':
    servidor = make_server('127.0.0.1', 8080, endpoint_inventario_paginado)
    print("Inventario paginado en http://127.0.0.1:8080/?limite=15&pagina=2")
    servidor.serve_forever()
