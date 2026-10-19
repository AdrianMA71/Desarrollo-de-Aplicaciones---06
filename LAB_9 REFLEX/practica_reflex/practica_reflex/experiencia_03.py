import re

import reflex as rx

ESTILO_BOTON = {
    "background_color": "white",
    "color": "black",
    "border": "1px solid black",
}

PATRON_CORREO = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"


class EstadoContacto(rx.State):
    respuesta: str = ""

    @rx.event
    def enviar(self, datos: dict):
        nombre = datos.get("nombre", "").strip()
        correo = datos.get("correo", "").strip()
        mensaje = datos.get("mensaje", "").strip()

        if not nombre:
            self.respuesta = "El nombre no debe estar vacío"
        elif not re.match(PATRON_CORREO, correo):
            self.respuesta = "El correo no tiene un formato válido"
        elif not mensaje:
            self.respuesta = "El mensaje debe contener información"
        elif len(mensaje) < 10:
            self.respuesta = "El mensaje debe tener al menos 10 caracteres"
        else:
            self.respuesta = f"Gracias, {nombre}. Tu mensaje fue enviado"


def pagina():
    return rx.vstack(
        rx.heading("Formulario de contacto", color="black"),

        rx.form(
            rx.vstack(
                rx.input(
                    name="nombre",
                    placeholder="Nombre completo",
                    required=True,
                    width="100%",
                ),
                rx.input(
                    name="correo",
                    type="email",
                    placeholder="Correo electrónico",
                    required=True,
                    width="100%",
                ),
                rx.text_area(
                    name="mensaje",
                    placeholder="Escribe tu mensaje",
                    required=True,
                    width="100%",
                    rows="5",
                ),
                rx.button("Enviar", type="submit", width="100%", **ESTILO_BOTON),
                width="100%",
                spacing="2",
            ),
            on_submit=EstadoContacto.enviar,
            reset_on_submit=True,
            width="100%",
        ),

        rx.text(EstadoContacto.respuesta, color="black"),

        spacing="2",
        padding="20px",
        align="start",
        width="100%",
    )