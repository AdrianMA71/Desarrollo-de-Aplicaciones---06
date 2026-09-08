const funciones = [
    { id: 1, pelicula: "Interstellar", sala: 1, precio: 18, disponibles: 12 },
    { id: 2, pelicula: "Dune", sala: 2, precio: 20, disponibles: 5 },
    { id: 3, pelicula: "Avengers", sala: 3, precio: 16, disponibles: 0 },
    { id: 4, pelicula: "Inception", sala: 1, precio: 18, disponibles: 8 }
];

function buscarFuncion(id) {
    const funcion = funciones.find((funcion) => {
        return funcion.id === id;
    });

    if (!funcion) {
        throw new Error("No existe una función con el ID " + id);
    }

    return funcion;
}

function funcionesDisponibles() {
    return funciones.filter((funcion) => {
        return funcion.disponibles > 0;
    });
}

function comprarEntradas(id, cantidad) {
    const funcion = buscarFuncion(id);

    if (cantidad <= 0) {
        throw new Error("La cantidad debe ser mayor que cero");
    }

    if (cantidad > funcion.disponibles) {
        throw new Error("Solo quedan " + funcion.disponibles + " entradas disponibles para " + funcion.pelicula);
    }

    funcion.disponibles = funcion.disponibles - cantidad;

    return {
        pelicula: funcion.pelicula,
        cantidad: cantidad,
        total: funcion.precio * cantidad
    };
}

// 1. 
console.log("1. Funciones disponibles:", funcionesDisponibles());

// 2. 
try {
    const compra = comprarEntradas(2, 3);
    console.log("2. Compra válida:", compra);
} catch (error) {
    console.error("2. Error en la compra:", error.message);
}

// 3. 
try {
    const compra = comprarEntradas(3, 2);
    console.log("3. Compra realizada:", compra);
} catch (error) {
    console.error("3. Error en la compra:", error.message);
}

// 4. 
try {
    const funcion = buscarFuncion(99);
    console.log("4. Función encontrada:", funcion);
} catch (error) {
    console.error("4. Error en la búsqueda:", error.message);
}