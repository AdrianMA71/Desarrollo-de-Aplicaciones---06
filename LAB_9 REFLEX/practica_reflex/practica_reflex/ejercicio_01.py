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

SIGUIENTE = {
    "Pendiente": "En progreso",
    "En progreso": "Completada",
    "Completada": "Pendiente",
}


class EstadoKanban(rx.State):
    tareas: list[dict[str, str]] = [
        {"id": "1", "titulo": "Diseñar interfaz", "descripcion": "Crear el boceto de las pantallas", "estado": "Pendiente"},
        {"id": "2", "titulo": "Crear componentes", "descripcion": "Programar las tarjetas reutilizables", "estado": "En progreso"},
        {"id": "3", "titulo": "Definir el estado", "descripcion": "Declarar las variables de rx.State", "estado": "Completada"},
        {"id": "4", "titulo": "Probar aplicación", "descripcion": "Verificar los eventos y el filtro", "estado": "Pendiente"},
        {"id": "5", "titulo": "Aplicar estilos", "descripcion": "Personalizar espacios y bordes", "estado": "En progreso"},
        {"id": "6", "titulo": "Redactar informe", "descripcion": "Documentar el trabajo realizado", "estado": "Pendiente"},
    ]
    mostrar_solo_pendientes: bool = False

    @rx.var
    def tareas_visibles(self) -> list[dict[str, str]]:
        if self.mostrar_solo_pendientes:
            return [t for t in self.tareas if t["estado"] == "Pendiente"]
        return self.tareas

    @rx.var
    def total_tareas(self) -> int:
        return len(self.tareas)

    @rx.var
    def total_pendientes(self) -> int:
        return sum(1 for t in self.tareas if t["estado"] == "Pendiente")

    @rx.var
    def total_en_progreso(self) -> int:
        return sum(1 for t in self.tareas if t["estado"] == "En progreso")

    @rx.var
    def total_completadas(self) -> int:
        return sum(1 for t in self.tareas if t["estado"] == "Completada")

    @rx.var
    def porcentaje_completadas(self) -> int:
        total = len(self.tareas)
        if total == 0:
            return 0
        return round(self.total_completadas * 100 / total)

    @rx.event
    def alternar_filtro(self):
        self.mostrar_solo_pendientes = not self.mostrar_solo_pendientes

    @rx.event
    def cambiar_estado(self, id_tarea: str):
        nuevas = []
        for tarea in self.tareas:
            copia = dict(tarea)
            if copia["id"] == id_tarea:
                copia["estado"] = SIGUIENTE[copia["estado"]]
            nuevas.append(copia)
        self.tareas = nuevas


def tarjeta_tarea(tarea: dict):
    return rx.box(
        rx.vstack(
            rx.text(tarea["titulo"], weight="bold", color="black"),
            rx.text(tarea["estado"], color="black"),
            rx.text(tarea["descripcion"], color="black"),
            rx.button(
                "Cambiar estado",
                on_click=EstadoKanban.cambiar_estado(tarea["id"]),
                size="1",
                **ESTILO_BOTON_SECUNDARIO,
            ),
            spacing="3",
            align="start",
        ),
        width="100%",
        padding="14px",
        border="1px solid #d1d5db",
        border_radius="4px",
        background_color="white",
    )


def tarea_en_columna(tarea: dict, estado: str):
    return rx.cond(
        tarea["estado"] == estado,
        tarjeta_tarea(tarea),
        rx.fragment(),
    )

def columna(estado: str):
    return rx.vstack(
        rx.heading(estado, size="4", color="black", width="100%", padding_bottom="8px", border_bottom="1px solid #cccccc"),
        rx.foreach(
            EstadoKanban.tareas_visibles,
            lambda tarea: tarea_en_columna(tarea, estado),
        ),
        width="100%",
        spacing="2",
        align="start",
    )


def tablero():
    return rx.grid(
        columna("Pendiente"),
        columna("En progreso"),
        columna("Completada"),
        columns={"initial": "1", "md": "3"},
        width="100%",
        spacing="3",
        align="start",
    )


def controles():
    return rx.hstack(
        rx.button(
            rx.cond(
                EstadoKanban.mostrar_solo_pendientes,
                "Mostrar todas las tareas",
                "Mostrar solo pendientes",
            ),
            on_click=EstadoKanban.alternar_filtro,
            **ESTILO_BOTON,
        ),
        rx.text(
            rx.cond(
                EstadoKanban.mostrar_solo_pendientes,
                "Filtro activo: solo pendientes",
                "Mostrando todas las tareas",
            ),
            color="black",
        ),
        align="center",
        spacing="3",
    )


def contenido():
    return rx.cond(
        EstadoKanban.mostrar_solo_pendientes,
        rx.cond(
            EstadoKanban.total_pendientes > 0,
            tablero(),
            rx.text("No hay tareas pendientes", color="black"),
        ),
        rx.cond(
            EstadoKanban.total_tareas > 0,
            tablero(),
            rx.text("No hay tareas registradas", color="black"),
        ),
    )


def pagina():
    return rx.vstack(
        rx.heading("Tablero Kanban", color="black"),
        controles(),
        contenido(),
        width="100%",
        spacing="4",
        padding="20px",
        align="start",
    )  