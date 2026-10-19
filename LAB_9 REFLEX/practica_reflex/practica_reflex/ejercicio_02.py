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

# El tablero y el panel usan la misma colección y los mismos eventos.
from .ejercicio_01 import EstadoKanban, controles, contenido


def tarjeta_indicador(titulo: str, valor):
    return rx.box(
        rx.vstack(
            rx.text(titulo, color="black"),
            rx.heading(valor, color="black"),
            align="center",
            spacing="1",
        ),
        padding="14px",
        border="1px solid #d1d5db",
        border_radius="4px",
        background_color="white",
    )


def panel_indicadores():
    return rx.vstack(
        rx.grid(
            tarjeta_indicador("Total de tareas", EstadoKanban.total_tareas),
            tarjeta_indicador("Pendientes", EstadoKanban.total_pendientes),
            tarjeta_indicador("En progreso", EstadoKanban.total_en_progreso),
            tarjeta_indicador("Completadas", EstadoKanban.total_completadas),
            tarjeta_indicador("Avance", f"{EstadoKanban.porcentaje_completadas}%"),
            columns={"initial": "1", "sm": "2", "lg": "5"},
            width="100%",
            spacing="3",
        ),
        rx.progress(value=EstadoKanban.porcentaje_completadas, width="100%", color_scheme="gray"),
        width="100%",
        spacing="2",
    )


def pagina():
    return rx.vstack(
        rx.heading("Panel de indicadores", color="black"),
        panel_indicadores(),
        controles(),
        contenido(),
        width="100%",
        spacing="4",
        padding="20px",
        align="start",
    )