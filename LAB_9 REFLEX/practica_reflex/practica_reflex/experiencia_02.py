import reflex as rx

ESTILO_BOTON = {
    "background_color": "white",
    "color": "black",
    "border": "1px solid black",
}


class EstadoTareas(rx.State):
    tareas: list[str] = [
        "Diseñar interfaz",
        "Crear componentes",
        "Probar aplicación",
    ]
    mensaje: str = ""

    @rx.event
    def agregar_tarea(self, datos: dict):
        tarea = datos.get("tarea", "").strip()
        if not tarea:
            self.mensaje = "Ingrese una tarea válida"
            return
        if tarea in self.tareas:
            self.mensaje = "La tarea ya está registrada"
            return
        self.tareas.append(tarea)
        self.mensaje = ""

    @rx.event
    def eliminar_tarea(self, tarea: str):
        if tarea in self.tareas:
            self.tareas.remove(tarea)


def tarjeta_tarea(tarea: str):
    return rx.hstack(
        rx.text(tarea, color="black"),
        rx.spacer(),
        rx.button(
            "Eliminar",
            on_click=EstadoTareas.eliminar_tarea(tarea),
            size="1",
            **ESTILO_BOTON,
        ),
        align="center",
        width="100%",
    )


def pagina():
    return rx.vstack(
        rx.heading("Gestor de tareas", color="black"),

        rx.form(
            rx.hstack(
                rx.input(name="tarea", placeholder="Nueva tarea", width="100%"),
                rx.button("Agregar tarea", type="submit", **ESTILO_BOTON),
                width="100%",
            ),
            on_submit=EstadoTareas.agregar_tarea,
            reset_on_submit=True,
            width="100%",
        ),

        rx.text(EstadoTareas.mensaje, color="black"),

        rx.heading("Lista de tareas", size="5", color="black"),
        rx.cond(
            EstadoTareas.tareas.length() > 0,
            rx.vstack(
                rx.foreach(EstadoTareas.tareas, tarjeta_tarea),
                width="100%",
                spacing="2",
            ),
            rx.text("No hay tareas registradas", color="black"),
        ),

        spacing="2",
        padding="20px",
        align="start",
        width="100%",
    )