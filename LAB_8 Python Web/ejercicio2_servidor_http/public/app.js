const formulario = document.getElementById("formulario");
const campoFiltro = document.getElementById("filtro");
const campoLimite = document.getElementById("limite");
const resumen = document.getElementById("resumen");
const mensaje = document.getElementById("mensaje");
const cuerpoTabla = document.getElementById("cuerpo");
const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");
const indicador = document.getElementById("indicador");

let paginaActual = 1;

function construirUrl(pagina) {
    const parametros = new URLSearchParams();
    parametros.set("filtro", campoFiltro.value);
    parametros.set("limite", campoLimite.value);
    parametros.set("pagina", pagina);
    return "/api/inventario?" + parametros.toString();
}

function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

function mostrarFilas(productos) {
    cuerpoTabla.innerHTML = "";

    for (const producto of productos) {
        const fila = document.createElement("tr");
        fila.appendChild(crearCelda(producto.id));
        fila.appendChild(crearCelda(producto.nombre));
        fila.appendChild(crearCelda(producto.categoria));
        fila.appendChild(crearCelda(producto.stock));
        cuerpoTabla.appendChild(fila);
    }
}

function mostrarPaginacion(paginacion) {
    resumen.textContent = paginacion.total_registros + " registros encontrados";
    indicador.textContent = "Página " + paginacion.pagina + " de " + paginacion.total_paginas;
    botonAnterior.disabled = !paginacion.tiene_anterior;
    botonSiguiente.disabled = !paginacion.tiene_siguiente;
}

async function cargarInventario(pagina) {
    mensaje.textContent = "";

    const respuesta = await fetch(construirUrl(pagina));
    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        mensaje.textContent = resultado.error;
        return;
    }

    paginaActual = resultado.paginacion.pagina;
    mostrarFilas(resultado.datos);
    mostrarPaginacion(resultado.paginacion);
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    cargarInventario(1);
});

botonAnterior.addEventListener("click", function () {
    cargarInventario(paginaActual - 1);
});

botonSiguiente.addEventListener("click", function () {
    cargarInventario(paginaActual + 1);
});

cargarInventario(1);
