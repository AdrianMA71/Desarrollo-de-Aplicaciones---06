import os

HOST = "127.0.0.1"
PUERTO = 8080

DIRECTORIO_BASE = os.path.dirname(os.path.abspath(__file__))
DIRECTORIO_PUBLICO = os.path.join(DIRECTORIO_BASE, "public")

RUTA_INVENTARIO = "/api/inventario"

LIMITE_POR_DEFECTO = 10
LIMITE_MAXIMO = 100
PAGINA_POR_DEFECTO = 1
