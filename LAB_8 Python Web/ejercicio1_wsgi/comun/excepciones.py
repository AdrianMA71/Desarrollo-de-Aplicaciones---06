class ErrorPeticion(Exception):
    def __init__(self, codigo, mensaje, cabeceras=None):
        super().__init__(mensaje)
        self.codigo = codigo
        self.mensaje = mensaje
        if cabeceras is None:
            self.cabeceras = []
        else:
            self.cabeceras = cabeceras
