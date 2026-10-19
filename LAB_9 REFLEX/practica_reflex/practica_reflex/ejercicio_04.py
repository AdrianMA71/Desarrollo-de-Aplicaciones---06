import httpx
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

URL_API = "https://jsonplaceholder.typicode.com/users"


class EstadoDirectorio(rx.State):
    usuarios: list[dict[str, str]] = []
    busqueda: str = ""
    cargando: bool = False
    error: str = ""

    @rx.var
    def usuarios_filtrados(self) -> list[dict[str, str]]:
        texto = self.busqueda.strip().lower()
        return [
            u for u in self.usuarios
            if u["nombre"].lower().find(texto) != -1
        ]

    @rx.event
    def actualizar_busqueda(self, valor: str):
        self.busqueda = valor

    @rx.event
    async def cargar_usuarios(self):
        self.cargando = True
        self.error = ""
        yield
        try:
            async with httpx.AsyncClient(timeout=10) as cliente:
                respuesta = await cliente.get(URL_API)
                respuesta.raise_for_status()
                datos = respuesta.json()
            self.usuarios = [
                {
                    "nombre": u["name"],
                    "usuario": u["username"],
                    "correo": u["email"],
                    "ciudad": u["address"]["city"],
                    "empresa": u["company"]["name"],
                }
                for u in datos
            ]
        except (httpx.HTTPError, ValueError, KeyError) as e:
            self.usuarios = []
            self.error = f"No fue posible obtener los usuarios: {e}"
        finally:
            self.cargando = False


def tarjeta_usuario(usuario: dict):
    return rx.box(
        rx.text(usuario["nombre"], weight="bold", color="black"),
        rx.text("Usuario: ", usuario["usuario"], color="black"),
        rx.text("Correo: ", usuario["correo"], color="black"),
        rx.text("Ciudad: ", usuario["ciudad"], color="black"),
        rx.text("Empresa: ", usuario["empresa"], color="black"),
        width="100%",
        padding="14px",
        border="1px solid #d1d5db",
        border_radius="4px",
        background_color="white",
    )


def lista_usuarios():
    return rx.cond(
        EstadoDirectorio.usuarios_filtrados.length() > 0,
        rx.vstack(
            rx.foreach(EstadoDirectorio.usuarios_filtrados, tarjeta_usuario),
            width="100%",
            spacing="2",
        ),
        rx.text("No se encontraron usuarios con ese nombre", color="black"),
    )


def contenido():
    return rx.cond(
        EstadoDirectorio.cargando,
        rx.text("Cargando usuarios...", color="black"),
        rx.cond(
            EstadoDirectorio.error != "",
            rx.text(EstadoDirectorio.error, color="black"),
            lista_usuarios(),
        ),
    )


def barra_busqueda():
    return rx.hstack(
        rx.input(
            placeholder="Buscar por nombre",
            value=EstadoDirectorio.busqueda,
            on_change=EstadoDirectorio.actualizar_busqueda,
            width="100%",
        ),
        rx.button(
            "Actualizar",
            on_click=EstadoDirectorio.cargar_usuarios,
            **ESTILO_BOTON,
        ),
        width="100%",
        spacing="2",
    )


def pagina():
    return rx.vstack(
        rx.heading("Directorio de usuarios", color="black"),
        barra_busqueda(),
        contenido(),
        spacing="4",
        padding="20px",
        align="start",
        width="100%",
    )