import httpx
import reflex as rx

ESTILO_BOTON = {
    "background_color": "white",
    "color": "black",
    "border": "1px solid black",
}

URL_API = "https://jsonplaceholder.typicode.com/users"


class EstadoUsuarios(rx.State):
    usuarios: list[dict[str, str]] = []
    cargando: bool = False
    error: str = ""

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
                    "nombre": usuario["name"],
                    "usuario": usuario["username"],
                    "correo": usuario["email"],
                    "empresa": usuario["company"]["name"],
                }
                for usuario in datos
            ]
        except (httpx.HTTPError, ValueError, KeyError) as e:
            self.usuarios = []
            self.error = f"No fue posible obtener los usuarios: {e}"
        finally:
            self.cargando = False


def tarjeta_usuario(usuario: dict):
    return rx.box(
        rx.text(usuario["nombre"], color="black"),
        rx.text("Usuario: ", usuario["usuario"], color="black"),
        rx.text("Correo: ", usuario["correo"], color="black"),
        rx.text("Empresa: ", usuario["empresa"], color="black"),
        width="100%",
        padding="10px",
        border="1px solid black",
        background_color="white",
    )


def pagina():
    return rx.vstack(
        rx.heading("Directorio de usuarios", color="black"),
        rx.button("Cargar usuarios", on_click=EstadoUsuarios.cargar_usuarios, **ESTILO_BOTON),

        rx.cond(
            EstadoUsuarios.cargando,
            rx.text("Cargando usuarios...", color="black"),
            rx.cond(
                EstadoUsuarios.error != "",
                rx.text(EstadoUsuarios.error, color="black"),
                rx.vstack(
                    rx.foreach(EstadoUsuarios.usuarios, tarjeta_usuario),
                    width="100%",
                    spacing="2",
                ),
            ),
        ),

        spacing="2",
        padding="20px",
        align="start",
        width="100%",
    )