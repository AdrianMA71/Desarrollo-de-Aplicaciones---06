from urllib.parse import parse_qs

from comun.excepciones import ErrorSolicitud
from configuracion import LIMITE_MAXIMO, LIMITE_POR_DEFECTO, PAGINA_POR_DEFECTO


def convertir_a_entero(texto, nombre):
    try:
        numero = int(texto)
    except ValueError:
        raise ErrorSolicitud(400, "El parámetro '" + nombre + "' debe ser un número entero")

    if numero < 1:
        raise ErrorSolicitud(400, "El parámetro '" + nombre + "' debe ser mayor que cero")

    return numero


def obtener_valor(parametros, nombre, valor_por_defecto):
    lista = parametros.get(nombre)

    if lista is None:
        return valor_por_defecto

    return lista[0]


def leer_parametros(query_string):
    parametros = parse_qs(query_string)

    limite_texto = obtener_valor(parametros, "limite", str(LIMITE_POR_DEFECTO))
    pagina_texto = obtener_valor(parametros, "pagina", str(PAGINA_POR_DEFECTO))
    filtro = obtener_valor(parametros, "filtro", "")

    limite_solicitado = convertir_a_entero(limite_texto, "limite")
    pagina = convertir_a_entero(pagina_texto, "pagina")

    limite = limite_solicitado
    if limite > LIMITE_MAXIMO:
        limite = LIMITE_MAXIMO

    return {
        "limite": limite,
        "limite_solicitado": limite_solicitado,
        "pagina": pagina,
        "filtro": filtro.strip().lower(),
    }
