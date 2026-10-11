from datos.inventario import INVENTARIO


def coincide_con_filtro(producto, filtro):
    if filtro == "":
        return True

    if filtro in producto["nombre"].lower():
        return True

    if filtro in producto["categoria"].lower():
        return True

    return False


def filtrar_inventario(filtro):
    resultados = []

    for producto in INVENTARIO:
        if coincide_con_filtro(producto, filtro):
            resultados.append(producto)

    return resultados


def calcular_total_paginas(total_registros, limite):
    if total_registros == 0:
        return 0

    return (total_registros + limite - 1) // limite


def paginar(registros, pagina, limite):
    desplazamiento = (pagina - 1) * limite
    fin = desplazamiento + limite
    return registros[desplazamiento:fin]


def buscar(parametros):
    limite = parametros["limite"]
    pagina = parametros["pagina"]
    filtro = parametros["filtro"]

    filtrados = filtrar_inventario(filtro)
    total_registros = len(filtrados)
    total_paginas = calcular_total_paginas(total_registros, limite)
    datos = paginar(filtrados, pagina, limite)

    paginacion = {
        "pagina": pagina,
        "limite": limite,
        "limite_solicitado": parametros["limite_solicitado"],
        "total_registros": total_registros,
        "total_paginas": total_paginas,
        "tiene_anterior": pagina > 1,
        "tiene_siguiente": pagina < total_paginas,
    }

    return {"filtro": filtro, "paginacion": paginacion, "datos": datos}
