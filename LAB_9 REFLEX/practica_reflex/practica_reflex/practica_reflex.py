import reflex as rx

from practica_reflex import (
    ejercicio_01,
    ejercicio_02,
    ejercicio_03,
    ejercicio_04,
    experiencia_01,
    experiencia_02,
    experiencia_03,
    experiencia_04,
)

SECCIONES = [
    ("Experiencia 01: Aplicación interactiva", "/experiencia-01"),
    ("Experiencia 02: Componentes y listas", "/experiencia-02"),
    ("Experiencia 03: Formularios y validación", "/experiencia-03"),
    ("Experiencia 04: Consumo de API", "/experiencia-04"),
    ("Ejercicio 01: Tablero Kanban", "/ejercicio-01"),
    ("Ejercicio 02: Panel de indicadores", "/ejercicio-02"),
    ("Ejercicio 03: Registro de solicitudes", "/ejercicio-03"),
    ("Ejercicio 04: Directorio con búsqueda", "/ejercicio-04"),
]


def menu():
    return rx.vstack(
        rx.heading("Práctica Reflex", color="black"),
        rx.text("Laboratorio N° 09", color="black"),
        *[
            rx.link(titulo, href=ruta, color="black", padding="10px 14px", border="1px solid #d1d5db", border_radius="4px", width="100%", _hover={"background_color": "#f5f5f5"})
            for titulo, ruta in SECCIONES
        ],
        spacing="4",
        padding="20px",
        align="start",
        width="100%", max_width="720px",
    )


def con_menu(pagina):
    def contenido():
        return rx.vstack(
            rx.link("← Volver al menú", href="/", color="black"),
            pagina(),
            padding="20px",
            width="100%", max_width="1200px", margin_x="auto",
            align="start",
        )

    return contenido


app = rx.App(theme=rx.theme(appearance="light", accent_color="gray", radius="small"),
    style={"background_color": "white", "color": "black", "font_family": "Arial, sans-serif"})
app.add_page(menu, route="/", title="Práctica Reflex")
app.add_page(con_menu(experiencia_01.pagina), route="/experiencia-01")
app.add_page(con_menu(experiencia_02.pagina), route="/experiencia-02")
app.add_page(con_menu(experiencia_03.pagina), route="/experiencia-03")
app.add_page(con_menu(experiencia_04.pagina), route="/experiencia-04")
app.add_page(con_menu(ejercicio_01.pagina), route="/ejercicio-01")
app.add_page(con_menu(ejercicio_02.pagina), route="/ejercicio-02")
app.add_page(con_menu(ejercicio_03.pagina), route="/ejercicio-03")
app.add_page(
    con_menu(ejercicio_04.pagina),
    route="/ejercicio-04",
    on_load=ejercicio_04.EstadoDirectorio.cargar_usuarios,
)