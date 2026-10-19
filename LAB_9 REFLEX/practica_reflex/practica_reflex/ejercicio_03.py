import re

import reflex as rx

ESTILO_BOTON = {
    "background_color": "#dcfce7",
    "color": "#1f2937",
    "border": "1px solid #a7d7b5",
    "border_radius": "4px",
    "cursor": "pointer",
    "_hover": {"background_color": "#c5efd2"},
}

ESTILO_BOTON_SECUNDARIO = {
    "background_color": "#f5f5f5",
    "color": "#222222",
    "border": "1px solid #cccccc",
    "border_radius": "4px",
    "cursor": "pointer",
    "_hover": {"background_color": "#e9e9e9"},
}

PATRON_CORREO = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
TIPOS = ["Consulta", "Incidencia", "Requerimiento"]


class EstadoSolicitudes(rx.State):
    solicitudes: list[dict[str, str]] = []
    respuesta: str = ""
    siguiente_id: int = 1

    @rx.event
    def registrar(self, datos: dict):
        nombre = datos.get("nombre", "").strip()
        correo = datos.get("correo", "").strip()
        tipo = datos.get("tipo", "").strip()
        descripcion = datos.get("descripcion", "").strip()

        if not nombre or not correo or not tipo or not descripcion:
            self.respuesta = "Todos los campos son obligatorios"
        elif not re.match(PATRON_CORREO, correo):
            self.respuesta = "El correo no tiene un formato válido"
        elif tipo not in TIPOS:
            self.respuesta = "Seleccione un tipo de solicitud válido"
        elif len(descripcion) < 10:
            self.respuesta = "La descripción debe tener al menos 10 caracteres"
        else:
            self.solicitudes.append(
                {
                    "id": str(self.siguiente_id),
                    "nombre": nombre,
                    "correo": correo,
                    "tipo": tipo,
                    "descripcion": descripcion,
                }
            )
            self.siguiente_id += 1
            self.respuesta = f"Solicitud registrada correctamente, {nombre}"

    @rx.event
    def eliminar(self, id_solicitud: str):
        self.solicitudes = [
            s for s in self.solicitudes if s["id"] != id_solicitud
        ]


def campos_formulario():
    return rx.vstack(
        rx.input(
            name="nombre",
            placeholder="Nombre del solicitante",
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
        rx.select(TIPOS, name="tipo", default_value="Consulta", width="100%"),
        rx.text_area(
            name="descripcion",
            placeholder="Descripción de la solicitud",
            required=True,
            rows="4",
            width="100%",
        ),
        rx.button("Registrar solicitud", type="submit", width="100%", **ESTILO_BOTON),
        width="100%",
        spacing="2",
    )


def tarjeta_solicitud(solicitud: dict):
    return rx.box(
        rx.vstack(
            rx.text(solicitud["nombre"], weight="bold", color="black"),
            rx.text(solicitud["tipo"], color="black"),
            rx.text(solicitud["correo"], color="black"),
            rx.text(solicitud["descripcion"], color="black"),
            rx.button(
                "Eliminar",
                on_click=EstadoSolicitudes.eliminar(solicitud["id"]),
                size="1",
                **ESTILO_BOTON_SECUNDARIO,
            ),
            align="start",
            spacing="2",
        ),
        width="100%",
        padding="14px",
        border="1px solid #d1d5db",
        border_radius="4px",
        background_color="white",
    )


def pagina():
    return rx.vstack(
        rx.heading("Registro de solicitudes", color="black"),

        rx.form(
            campos_formulario(),
            on_submit=EstadoSolicitudes.registrar,
            reset_on_submit=False,
            width="100%",
        ),

        rx.text(EstadoSolicitudes.respuesta, color="black"),

        rx.heading("Solicitudes registradas", size="5", color="black"),
        rx.cond(
            EstadoSolicitudes.solicitudes.length() > 0,
            rx.vstack(
                rx.foreach(EstadoSolicitudes.solicitudes, tarjeta_solicitud),
                width="100%",
                spacing="2",
            ),
            rx.text("Aún no hay solicitudes registradas", color="black"),
        ),

        spacing="4",
        padding="20px",
        align="start",
        width="100%",
    )