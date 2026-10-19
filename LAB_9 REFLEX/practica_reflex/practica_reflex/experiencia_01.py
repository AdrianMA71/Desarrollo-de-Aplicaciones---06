import reflex as rx

ESTILO_BOTON = {
    "background_color": "white",
    "color": "black",
    "border": "1px solid black",
}


class EstadoInicio(rx.State):
    saludo: str = ""

    @rx.event
    def comenzar(self):
        self.saludo = "¡Bienvenido a Reflex!"


class EstadoContador(rx.State):
    conteo: int = 0

    @rx.event
    def incrementar(self):
        self.conteo += 1

    @rx.event
    def disminuir(self):
        self.conteo -= 1

    @rx.event
    def reiniciar(self):
        self.conteo = 0


def pagina():
    return rx.vstack(
        rx.heading("Práctica Reflex", color="black"),
        rx.text("Equipo: Equipo 01", color="black"),
        rx.text("Mi primera aplicación interactiva con Reflex y Python", color="black"),

        rx.button("Comenzar", on_click=EstadoInicio.comenzar, **ESTILO_BOTON),
        rx.text(EstadoInicio.saludo, color="black"),

        rx.heading(EstadoContador.conteo, color="black"),
        rx.cond(
            EstadoContador.conteo > 0,
            rx.text("Contador positivo", color="black"),
            rx.cond(
                EstadoContador.conteo < 0,
                rx.text("Contador negativo", color="black"),
                rx.text("Contador en cero", color="black"),
            ),
        ),
        rx.hstack(
            rx.button("Incrementar", on_click=EstadoContador.incrementar, **ESTILO_BOTON),
            rx.button("Disminuir", on_click=EstadoContador.disminuir, **ESTILO_BOTON),
            rx.button("Reiniciar", on_click=EstadoContador.reiniciar, **ESTILO_BOTON),
        ),

        spacing="2",
        padding="20px",
        align="start",
    )
