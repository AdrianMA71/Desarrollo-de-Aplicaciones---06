from comun.excepciones import ErrorPeticion
from configuracion import CAMPOS_OBLIGATORIOS


def valor_esta_vacio(valor):
    if valor is None:
        return True
    return str(valor).strip() == ""


def validar_esquema(datos):
    for campo in CAMPOS_OBLIGATORIOS:
        if campo not in datos:
            raise ErrorPeticion(400, "Falta el parámetro obligatorio: " + campo)

        if valor_esta_vacio(datos[campo]):
            raise ErrorPeticion(400, "El parámetro obligatorio está vacío: " + campo)
