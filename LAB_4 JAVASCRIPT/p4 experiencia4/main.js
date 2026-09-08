// parte 1: el problema (multiplicacion basica)
function calcularVenta(precio, cantidad) {
    return precio * cantidad;
}

console.log("parte 1: el problema - multiplicacion basica");
console.log("calcularVenta(100, 3): " + calcularVenta(100, 3));
console.log("calcularVenta('abc', 3): " + calcularVenta("abc", 3));

// parte 2: conversion y validacion
function calcularVenta2(precio, cantidad) {
    precio = Number(precio);
    cantidad = Number(cantidad);
    if (precio <= 0 || cantidad <= 0) {
        return "Datos no validos";
    }
    return precio * cantidad;
}

console.log("parte 2: conversion con Number() y validacion con <= y ||");
console.log("calcularVenta2('100', '3'): " + calcularVenta2("100", "3"));
console.log("calcularVenta2(-20, 3): " + calcularVenta2(-20, 3));
console.log("calcularVenta2(100, 0): " + calcularVenta2(100, 0));

// parte 3: detectando NaN
function calcularVenta3(precio, cantidad) {
    precio = Number(precio);
    cantidad = Number(cantidad);
    if (Number.isNaN(precio) || Number.isNaN(cantidad)) {
        return "Debe ingresar valores numericos";
    }
    if (precio <= 0 || cantidad <= 0) {
        return "Datos no validos";
    }
    return precio * cantidad;
}

console.log("parte 3: detectando NaN con Number.isNaN()");
console.log("calcularVenta3('abc', 3): " + calcularVenta3("abc", 3));

// parte 4: lanzando una excepcion
function calcularVenta4(precio, cantidad) {
    precio = Number(precio);
    cantidad = Number(cantidad);
    if (Number.isNaN(precio) || Number.isNaN(cantidad)) {
        throw new Error("Precio y cantidad deben ser numericos");
    }
    if (precio <= 0 || cantidad <= 0) {
        throw new Error("Los valores deben ser mayores que cero");
    }
    return precio * cantidad;
}

console.log("parte 4: lanzando excepciones con throw new Error()");

// parte 5: try...catch
console.log("parte 5: capturando errores con try...catch");

try {
    const total = calcularVenta4("abc", 3);
    console.log(total);
} catch (error) {
    console.error("No fue posible calcular la venta:", error.message);
}

console.log("probando con datos validos (100, 3):");
try {
    const total = calcularVenta4(100, 3);
    console.log("resultado: " + total);
} catch (error) {
    console.error("No fue posible calcular la venta:", error.message);
}

// parte 6: finally
console.log("parte 6: finally - se ejecuta siempre");

function probarVenta(precio, cantidad) {
    try {
        const total = calcularVenta4(precio, cantidad);
        console.log("resultado: " + total);
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        console.log("Proceso de venta finalizado");
    }
}

console.log("prueba con datos invalidos ('abc', 3):");
probarVenta("abc", 3);

console.log("prueba con datos validos (100, 3):");
probarVenta(100, 3);

// parte 7: crear tu propia excepcion
console.log("parte 7: creando propia excepcion con throw new Error()");

function registrarProducto(nombre, precio, stock) {
    if (nombre === "" || nombre === undefined) {
        throw new Error("El nombre no puede estar vacio");
    }
    if (typeof precio !== "number" || isNaN(precio) || precio <= 0) {
        throw new Error("El precio debe ser un numero mayor a 0");
    }
    if (typeof stock !== "number" || isNaN(stock) || stock < 0) {
        throw new Error("El stock debe ser un numero no negativo");
    }
    return {
        nombre: nombre,
        precio: precio,
        stock: stock
    };
}

console.log("producto valido:");
try {
    const producto = registrarProducto("Laptop", 1200, 5);
    console.log(producto);
} catch (error) {
    console.error("Error:", error.message);
}

console.log("producto con precio invalido (texto):");
try {
    const producto = registrarProducto("Laptop", "abc", 5);
    console.log(producto);
} catch (error) {
    console.error("Error:", error.message);
}

console.log("producto con stock negativo:");
try {
    const producto = registrarProducto("Laptop", 1200, -3);
    console.log(producto);
} catch (error) {
    console.error("Error:", error.message);
}